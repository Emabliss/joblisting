import { useState } from "react";

const Pagination = ({ jobsPerPage, totalJobs, paginate }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePaginate = (index) => {
    setCurrentPage(index);
    paginate(index);
  };

  return (
    <nav className="block mb-3">
      <ul className="flex pl-0 list-none flex-wrap items-center justify-center space-x-3">
        <li
          className="bg-darkblue text-white h-8 px-2 flex items-center justify-center"
          style={{
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            background: currentPage === 1 && "lightgray",
          }}
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            paginate(currentPage - 1);
          }}
        >
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => handlePaginate(number)}
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-1 items-center  justify-center leading-tight relative  bg-darkblue text-white cursor-pointer"
              style={{ background: currentPage === number && "green" }}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className="bg-darkblue text-white h-8 px-2 flex items-center justify-center"
          style={{
            cursor:
              currentPage === totalJobs / jobsPerPage
                ? "not-allowed"
                : "pointer",
            background: currentPage === totalJobs / jobsPerPage && "lightgray",
          }}
          disabled={currentPage === totalJobs / jobsPerPage}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            paginate(currentPage + 1);
          }}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
