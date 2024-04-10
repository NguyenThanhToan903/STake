import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosInstance, { axiosJava } from "../../config";

const DeleteModal = ({ modalShow, setModalShow, id, publicId, setLoading }) => {
  const handleDelete = async () => {
    try {
      setModalShow(false);
      setLoading(true);
      await axiosJava.delete(`/sample/${id}`);
      await axiosInstance.delete(`/create-sample/remove/${publicId}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn tin chắc rằng mình muốn xoá</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
