import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";
const SampleModal = ({ sampleModalShow, setSampleModalShow, sample }) => {
  return (
    <Modal
      show={sampleModalShow}
      size="lg"
      onHide={() => setSampleModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {sample.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body--wrap">
        <div className="modal__body--item">
          <Image
            className="modal__image"
            src={sample?.thumbnail?.path}
            rounded={true}
          />
        </div>

        <div className="modal__body--item">
          <p>
            <span>Size: </span> <span>{sample?.size}</span>
          </p>
          <p>
            {" "}
            <span>Color: </span> <span>{sample?.color}</span>
          </p>
          <p>
            <span>Author: </span> <span>{sample?.email}</span>
          </p>
          <p>
            {" "}
            <span>Category: </span> <span>{sample?.category}</span>
          </p>
          <p>
            {" "}
            <span>Occupation: </span> <span>{sample?.occupation}</span>
          </p>
          {sample?.occupation === "other" && (
            <p>
              <span>occupationIs: </span> <span>{sample?.occupationIs}</span>
            </p>
          )}
          <p>
            {" "}
            <span>Description: </span> <span>{sample?.description}</span>
          </p>
          <p>
            {" "}
            <span>createdAt: </span> <span>{sample?.createdAt}</span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SampleModal;
