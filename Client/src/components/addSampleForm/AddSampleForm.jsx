import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "../../css/style.css"

import "./addSampleForm.css";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import axiosInstance, { axiosJava } from "../../config";
import Loading from "../loading/Loading";
import { useSelector } from "react-redux";
function AddSampleForm() {
  const user = useSelector((state) => state.user.currentUser);
  let [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState(user.email);
  const [occupation, setOccupation] = useState("");
  const [occupationIs, setOccupationIs] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  useEffect(() => {
    const getSample = async () => {
      try {
        const res = await axiosJava.get(`/sample/${id}`);
        console.log(res.data);
        setName(res.data.name);
        setSize(res.data.size);
        setColor(res.data.color);
        setCategory(res.data.category);
        setDescription(res.data.description);
        setOccupation(res.data.occupation);
        setThumbnail(res.data.thumbnail);
      } catch (error) {
        console.log(error);
      }
    };

    if (mode === "edit") getSample();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageData = {};

      if (mode === "add") {
        if (file) {
          const uploadData = new FormData();
          uploadData.append("file", file, "file");

          const resImg = await axiosInstance.post(
            "/create-sample/upload",
            uploadData
          );

          imageData = {
            path: await resImg.data.file.path,
            publicId: await resImg.data.file.filename,
          };
        }

        const newSample = {
          thumbnail: imageData,
          name,
          email,
          category,
          occupation,
          occupationIs,
          size,
          color,
          description,
        };

        const res = await axiosJava.post("/sample", newSample);
        if (res.data) {
          setLoading(false);
        }
      } else {
        if (file && thumbnail) {
          await axiosInstance.delete(
            `/create-sample/remove/${thumbnail.publicId}`
          );

          const uploadData = new FormData();
          uploadData.append("file", file, "file");

          const resImg = await axiosInstance.post(
            "/create-sample/upload",
            uploadData
          );

          imageData = {
            path: await resImg.data.file.path,
            publicId: await resImg.data.file.filename,
          };

          const newSample = {
            thumbnail: imageData,
            name,
            email,
            categorycate,
            occupation,
            occupationIs,
            size,
            color,
            description,
          };

          // if(newSample.name == "" || newSample.categorycate == "" || newSample.occupation == "" ){
          //   navigate("/");
          // }else{
          const res = await axiosJava.put(`/sample/${id}`, newSample);
          if (res.data) {
            setLoading(false);
          }
          // }
        } else {
          const newSample = {
            thumbnail,
            name,
            email,
            category,
            occupation,
            occupationIs,
            size,
            color,
            description,
          };

          const res = await axiosJava.put(`/sample/${id}`, newSample);
          if (res.data) {
            setLoading(false);
          }
        }
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    // if (file) {
    //   const uploadData = new FormData();
    //   uploadData.append("file", file, "file");

    //   try {
    //     const res = await axiosInstance.post(
    //       "/create-sample/upload",
    //       uploadData
    //     );

    //     console.log(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    try {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your create has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          {/* <img src="your-image-url-here.jpg" alt="Form Image" /> */}

          {mode === "add" ? (
            <h1 className="form-title">CREATE SAMPLE</h1>
          ) : (
            <h1 className="form-title">EDIT SAMPLE</h1>
          )}

          <form onSubmit={handleSubmit}>
            <div className="formbold-input-group">
              <label htmlFor="thumbnail" className="formbold-form-label">
                {" "}
                Thumbnails{" "}
              </label>{" "}
              {/* Pluralize label for multiple images */}
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                onChange={(e) => setFile(e.target.files[0])}
                multiple
                placeholder="Select multiple images..."
                className="formbold-form-file"
                accept="image/*"
              />
              {file ? (
                <img
                  src={file && URL.createObjectURL(file)}
                  className="file__img"
                />
              ) : (
                <img src={thumbnail && thumbnail.path} className="file__img" />
              )}
            </div>

            <div className="formbold-input-group">
              <label htmlFor="name" className="formbold-form-label">
                {" "}
                Sample Name{" "}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter sample name"
                className="formbold-form-input"
              />
            </div>

            <div className="formbold-input-group">
              <label htmlFor="category" className="formbold-form-label">
                {" "}
                Category{" "}
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter sample category"
                className="formbold-form-input"
              />
            </div>

            <div className="formbold-input-group">
              <label htmlFor="size" className="formbold-form-label">
                {" "}
                Size{" "}
              </label>
              <input
                type="text"
                name="size"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Enter sample size"
                className="formbold-form-input"
              />
            </div>

            <div className="formbold-input-group">
              <label htmlFor="color" className="formbold-form-label">
                {" "}
                Color{" "}
              </label>
              <input
                type="text"
                name="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter sample color"
                className="formbold-form-input"
              />
            </div>

            <div>
              <label htmlFor="description" className="formbold-form-label">
                Description
              </label>
              <textarea
                rows="6"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type here..."
                className="formbold-form-input"
              ></textarea>
            </div>
            <div className="formbold-input-group">
              <label htmlFor="email" className="formbold-form-label">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="formbold-form-input"
              />
            </div>

            <div className="formbold-input-group">
              <label className="formbold-form-label">
                Which option best describes you?
              </label>
              <select
                className="formbold-form-select"
                name="occupation"
                id="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Researcher">Researcher</option>
                <option value="Teacher">Teacher</option>
                <option value="Professor">Professor</option>
                <option className="other" value="Other">
                  Other
                </option>
              </select>
            </div>
            {occupation === "Other" && (
              <div className="formbold-input-group">
                <input
                  type="text"
                  name="occupationIs"
                  id="occupationIs"
                  value={occupationIs}
                  onChange={(e) => setOccupationIs(e.target.value)}
                  placeholder="Enter other option"
                  className="formbold-form-input"
                />
              </div>
            )}

            <button type="submit" className="formbold-btn">
              Submit
            </button>
          </form>
        </div>
      </div>

      {loading && <Loading />}
    </>
  );
}

export default AddSampleForm;
