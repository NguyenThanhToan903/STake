import Table from "react-bootstrap/Table";
import { Image, Col, Container, Button } from "react-bootstrap";
import { Trash, Edit } from "react-feather";
import { Link } from "react-router-dom";
import axiosInstance, { axiosJava } from "../../config";
import DeleteModal from "../deleteModal/DeleteModal";

import SampleModal from "../sampleModal/SampleModal";

// import SampleModal from "../sampleDetail/sampleDetail";

import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import "./style.css";

const TableMain = ({ data }) => {
  const [modalShow, setModalShow] = useState(false);
  const [sampleId, setSampleId] = useState("");
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(false);
  const [sampleModalShow, setSampleModalShow] = useState(false);
  const [sample, setSample] = useState({});

  return (
    <div>
      {data?.map((item, index) => (
        <div key={index} className="card" style={{ width: "100%" }}>
          <div className="card-body" style={{ display: "flex" }}>
            <div className="card-item">
              <Image className="card-img" src={item.thumbnail.path} />
            </div>
            <div className="card-discription" style={{ flex: 1 }}>
              <div className="card-main">
                <h2 className="card-title">{item.name}</h2>
                <h4>Author: {item.email}</h4>
                <h5>Size: {item.size}</h5>
                <div>
                  <h6>Description</h6>
                  <p className="card-text">{item.description}</p>
                </div>
                <div className="btn-container" style={{ display: "flex" }}>
                  <Button
                    onClick={() => {
                      setSample(item);
                      setSampleModalShow(true);
                    }}
                    className="btn-discription"
                  >
                    Chi tiết
                  </Button>

                  <Link
                    to={`/form?mode=edit&id=${item.id}`}
                    className="btn-edit"
                    style={{ color: "Green", marginLeft: "10px" }}
                  >
                    Chỉnh sửa
                  </Link>

                  <Button
                    className="btn-trash"
                    style={{ color: "red", marginLeft: "10px" }}
                    onClick={() => {
                      setSampleId(item.id);
                      setModalShow(true);
                      setPublicId(item.thumbnail.publicId);
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <DeleteModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        id={sampleId}
        publicId={publicId}
        setLoading={setLoading}
      />
      {loading && <Loading />}
      <SampleModal
        sampleModalShow={sampleModalShow}
        setSampleModalShow={setSampleModalShow}
        sample={sample}
      />
    </div>
  );
};

export default TableMain;

// <div className="table-home">
//       <Table
//         className="table-sample"
//         striped
//         bordered
//         hover
//         size="sm"
//         // style={{ maxWidth: '95%', marginLeft: 'auto', marginRight: 'auto' }}
//       >
//         <thead>
//           <tr style={{ textAlign: "center" }}>
//             <th>#</th>
//             <th>Thumbnail</th>
//             <th>Sample Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((item, index) => {
//             return (
//               <tr key={index}>
//                 <td style={{ textAlign: "center", alignContent: "center" }}>
//                   {index + 1}
//                 </td>
//                 <td style={{ textAlign: "center", alignContent: "center" }}>
//                   <Image
//                     src={item.thumbnail.path}
//                     rounded={true}
//                     style={{
//                       height: "80px",
//                       width: "80px",
//                       marginRight: "5px",
//                       border: "1px solid",
//                     }}
//                   />
//                 </td>
//                 <td style={{ textAlign: "left", alignContent: "center" }}>
//                   {item.name}
//                 </td>
//                 {/* <td style={{ textAlign: "center", alignContent: "center" }}>
//                   {item.size}
//                 </td> */}
//                 <td style={{ textAlign: "center", alignContent: "center" }}>
//                   {item.email}
//                 </td>
//                 <td
//                   className="action"
//                   style={{ textAlign: "center", alignContent: "center" }}
//                 >
//                   <span
//                     className=""
//                     style={{ color: "red", marginLeft: "10px" }}
//                     onClick={() => {
//                       setSampleId(item.id);
//                       setModalShow(true);
//                       setPublicId(item.thumbnail.publicId);
//                     }}
//                   >
//                     <Trash />
//                   </span>
//                   <Link
//                     to={`/form?mode=edit&id=${item.id}`}
//                     className=""
//                     style={{ color: "Green", marginLeft: "10px" }}
//                   >
//                     <Edit />
//                   </Link>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>

// <DeleteModal
//   modalShow={modalShow}
//   setModalShow={setModalShow}
//   id={sampleId}
//   publicId={publicId}
//   setLoading={setLoading}
// />
// {loading && <Loading />}
//     </div>
