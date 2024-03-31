import "./pagination.scss";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const Pagination = ({ page, totalPage, currentPage }) => {
  const navigate = useNavigate();

  const handlePageClick = (data) => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
    navigate(`/${page}?page=${data.selected + 1}`);
  };

  return (
    <div>
      <div className="pagination">
        <ReactPaginate
          onPageChange={handlePageClick}
          className="paginationPage"
          previousLabel="<"
          nextLabel=">"
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          forcePage={parseInt(currentPage) - 1}
          previousClassName="prev"
          nextClassName="next"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Pagination;
