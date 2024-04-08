import Table from "react-bootstrap/Table";
import { Image, Col, Container } from "react-bootstrap";
import { Trash, Edit } from "react-feather";

const TableMain = ({ data }) => {
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
                  {/* {item.name} */}
                </td>
                <td style={{ textAlign: "center", alignContent: "center" }}>
                  {/* <Container
                    style={{ display: "flex", alignContent: "center" }}
                  >
                    {item.imgs.map((item, index) => {
                      return (
                        <Col xs={6} md={4} key={index}>
                          <Image
                            src={item.src}
                            rounded={true}
                            style={{
                              height: "80px",
                              width: "80px",
                              marginRight: "5px",
                              border: "1px solid",
                            }}
                          />
                        </Col>
                      );
                    })}
                  </Container> */}

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
                    onClick={() => {
                      alert(+item.id + 1);
                    }}
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
