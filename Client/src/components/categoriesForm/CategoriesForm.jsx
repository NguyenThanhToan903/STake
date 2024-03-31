import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import axiosInstance from "../../config";
import { toast } from "react-toastify";
import slugify from "slugify";

import "./categoriesForm.scss";

const CategoriesForm = ({ mode, displayMode, setDisplayMode, id }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const validate = () => {
    return name === "" ? false : true;
  };

  const handleChange = (e) => {
    setName(e.target.value);
    setSlug(slugify(e.target.value, { lower: true, locale: "vi" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(slug);

    if (validate()) {
      const newCategories = {
        name,
        slug,
      };

      try {
        if (mode === "add") {
          const res = await axiosInstance.post("/categories", newCategories);
          toast.success("Thêm danh mục thành công!");
          navigate(0);
        } else {
          const res = await axiosInstance.put(
            `/categories/${id}`,
            newCategories
          );
          toast.success("Sửa danh mục thành công!");
          navigate(0);
        }

        setDisplayMode(false);
      } catch (error) {
        if (mode === "add") {
          toast.error("Thêm danh mục thấy bại!");
        } else {
          toast.error("Sửa danh mục thấy bại!");
        }

        console.log(error);
      }
    } else {
      toast.error("Có trường rỗng hãy kiểm tra lại!");
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      if (mode === "edit") {
        const res = await axiosInstance.get(`/categories/find/${id}`);

        setName(res.data.name);
        setSlug(slugify(res.data.name, { lower: true, locale: "vi" }));
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
        className="categoriesForm"
      >
        <Modal.Header>
          {mode === "add" ? <h3>Thêm danh mục</h3> : <h3>Sửa danh mục</h3>}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group required className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange(e)}
                value={name}
              />
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

export default CategoriesForm;
