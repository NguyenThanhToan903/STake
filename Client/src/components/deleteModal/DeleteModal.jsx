import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./deleteModal.scss";

import axiosInstance from "../../config";

const DeleteModal = ({ id, name, deleteMode, setDeleteMode, type }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      if (type === "phim") {
        const res = await axiosInstance.delete(`/movie/${id}`);
      } else if (type === "danh mục") {
        const res = await axiosInstance.delete(`/categories/${id}`);
      } else {
        const res = await axiosInstance.delete(`/country/${id}`);
      }
      navigate(0);
      toast.success(`Đã xoá ${type} ${name}`);
    } catch (error) {
      toast.error(`Xoá thất bại`);
      setDeleteMode(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        show={deleteMode}
        className="deleteModal"
        onHide={() => setDeleteMode(true)}
      >
        <Modal.Header>
          <Modal.Title>Xoá {type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn muốn xoá {type}
          <b> {name}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteMode(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete()}>
            Xoá
          </Button>
        </Modal.Footer>

        <i
          className="fa-regular fa-rectangle-xmark"
          onClick={() => setDeleteMode(false)}
        ></i>
      </Modal>
    </div>
  );
};

export default DeleteModal;
