import Table from "react-bootstrap/Table";
import { Image, Col, Container } from "react-bootstrap";
import { Trash, Edit } from "react-feather";
import { Link } from "react-router-dom";
import axiosInstance, { axiosJava } from "../../config";
import DeleteModal from "../deleteModal/DeleteModal";
import { useState } from "react";
import Loading from "../loading/Loading";

const TableMain = ({ data }) => {
  const [modalShow, setModalShow] = useState(false);
  const [sampleId, setSampleId] = useState("");
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Table
        striped
        bordered
        hover
        size="sm"
        // style={{ maxWidth: '95%', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Sample Name</th>
            <th>Size</th>
            <th>Color</th>
            <th>Category</th>
            <th>Description</th>
            <th>Occupation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={index}>
                <td style={{ textAlign: "center", alignContent: "center" }}>
                  {index + 1}
                </td>
                <td style={{ textAlign: "center", alignContent: "center" }}>
                  <Image
                    src={item.thumbnail.path}
                    rounded={true}
                    style={{
                      height: "80px",
                      width: "80px",
                      marginRight: "5px",
                      border: "1px solid",
                    }}
                  />
                </td>
                <td style={{ textAlign: "left", alignContent: "center" }}>
                  {item.name}
                </td>
                <td style={{ textAlign: "center", alignContent: "center" }}>
                  {item.size}
                </td>
                <td style={{ textAlign: "center", alignContent: "center" }}>
                  {item.color}
                </td>
                <td style={{ textAlign: "left", alignContent: "center" }}>
                  {item.category}
                </td>
                <td style={{ textAlign: "left", alignContent: "center" }}>
                  {item.description}
                </td>
                <td style={{ textAlign: "center", alignContent: "center" }}>
                  {item.occupation === "other"
                    ? item.occupationIs
                    : item.occupation}
                </td>
                <td
                  className="action"
                  style={{ textAlign: "center", alignContent: "center" }}
                >
                  <span
                    className=""
                    style={{ color: "red", marginLeft: "10px" }}
                    onClick={() => {
                      setSampleId(item.id);
                      setModalShow(true);
                      setPublicId(item.thumbnail.publicId);
                    }}
                  >
                    <Trash />
                  </span>
                  <Link
                    to={`/form?mode=edit&id=${item.id}`}
                    className=""
                    style={{ color: "Green", marginLeft: "10px" }}
                  >
                    <Edit />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <DeleteModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        id={sampleId}
        publicId={publicId}
        setLoading={setLoading}
      />
      {loading && <Loading />}
    </div>
  );
};

export default TableMain;
