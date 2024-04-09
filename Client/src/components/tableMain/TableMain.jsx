import Table from "react-bootstrap/Table";
import { Image, Col, Container } from "react-bootstrap";
import { Trash, Edit } from "react-feather";
import { axiosJava } from "../../config";

const TableMain = ({ data }) => {
  const handleDelete = async (id) => {
    try {
      const res = await axiosJava.delete(`/sample/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                <td style={{ textAlign: "center", alignContent: "center" }}>
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
                <td style={{ textAlign: "center", alignContent: "center" }}>
                  {item.description}
                </td>
                <td
                  className="action"
                  style={{ textAlign: "center", alignContent: "center" }}
                >
                  <span
                    className=""
                    style={{ color: "red", marginLeft: "10px" }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash />
                  </span>
                  <span
                    className=""
                    style={{ color: "Green", marginLeft: "10px" }}
                    onClick={() => {
                      alert(item.id + 1);
                    }}
                  >
                    <Edit />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableMain;
