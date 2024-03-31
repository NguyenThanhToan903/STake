import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import axiosInstance from "../../config";

import { toast } from "react-toastify";

import "./movieForm.scss";

const MovieForm = ({ mode, displayMode, setDisplayMode, id }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState("");
  const [countries, setCountries] = useState("");
  const [status, setStatus] = useState("");
  const [hot, setHot] = useState(false);

  const validate = () => {
    return name === "" ||
      originalName === "" ||
      slug === "" ||
      categories === "" ||
      countries === "" ||
      status == ""
      ? false
      : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const arrayCate = categories.split(", ");
      const arrayCountries = countries.split(", ");

      const newMovie = {
        name,
        origin_name: originalName,
        slug,
        categories: arrayCate,
        country: arrayCountries,
        status,
        hot,
      };

      if (mode === "add") {
        const res = await axiosInstance.post("/movie", newMovie);
        try {
          toast.success("Thêm phim thành công!");
          navigate(0);
          setDisplayMode(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        const res = await axiosInstance.put(`/movie/${id}`, newMovie);
        try {
          toast.success("Sửa phim thành công!");
          navigate(0);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.error("Có trường rỗng hãy kiểm tra lại!");
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      if (mode === "edit") {
        const res = await axiosInstance.get(`/movie/find/${id}`);
        console.log(res);

        setName(res.data.name);
        setOriginalName(res.data.origin_name);

        setSlug(res.data.slug);
        setCategories(res.data.categories.join(", "));
        setCountries(res.data.country.join(", "));
        setStatus(res.data.status);
        setHot(res.data.hot);
      }
    };

    getMovie();
  }, [id]);

  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={displayMode}
        onHide={() => setDisplayMode(false)}
        className="movieForm"
      >
        <Modal.Header>
          {mode === "add" ? <h3>Thêm phim</h3> : <h3>Sửa phim</h3>}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group required className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Original Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setOriginalName(e.target.value)}
                value={originalName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCategories(e.target.value)}
                value={categories}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Quốc gia</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCountries(e.target.value)}
                value={countries}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Hot?</Form.Label>
              <div className="movieFormHot">
                <Form.Check
                  className="movieFormHotRadio"
                  type="radio"
                  value={hot}
                  name="hot"
                  onChange={() => setHot(true)}
                />
                <span>Yes</span>
                <Form.Check
                  className="movieFormHotRadio"
                  type="radio"
                  value={hot}
                  name="hot"
                  onChange={() => setHot(false)}
                />
                <span>No</span>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" size="lg">
              {mode === "add" ? "Thêm" : "Sửa"}
            </Button>
          </Form>
        </Modal.Body>

        <i
          className="fa-regular fa-rectangle-xmark"
          onClick={() => setDisplayMode(false)}
        ></i>
      </Modal>
    </div>
  );
};

export default MovieForm;
