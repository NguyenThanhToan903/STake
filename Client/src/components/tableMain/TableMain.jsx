import Table from "react-bootstrap/Table";
import { Image, Col, Container } from "react-bootstrap";
import { Trash, Edit } from "react-feather";
import { Link } from "react-router-dom";
import axiosInstance, { axiosJava } from "../../config";
import DeleteModal from "../deleteModal/DeleteModal";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import "./style.css";
import SampleModal from "../sampleModal/SampleModal";

const TableMain = ({ data }) => {
  const [modalShow, setModalShow] = useState(false);
  const [sampleId, setSampleId] = useState("");
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(false);
  const [sampleModalShow, setSampleModalShow] = useState(false);
  const [sample, setSample] = useState({});

  return (
    <div className="table-home">
      <Table
        className="table-sample"
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
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  setSampleModalShow(true);
                  setSampleId(item.id);
                  setSample(item);
                }}
              >
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
                {/* <td style={{ textAlign: "center", alignContent: "center" }}>
                  {item.size}
                </td> */}
                <td style={{ textAlign: "center", alignContent: "center" }}>
                  {item.email}
                </td>
                <td
                  className="action"
                  style={{ textAlign: "center", alignContent: "center" }}
                >
                  <span
                    className=""
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
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
      <SampleModal
        sampleModalShow={sampleModalShow}
        setSampleModalShow={setSampleModalShow}
        sample={sample}
      />
      {loading && <Loading />}
    </div>
  );
};

export default TableMain;
