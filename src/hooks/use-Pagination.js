import { useState } from "react";

const usePagination = (products) => {
  const totalItems = products?.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = Math.min(currentPage * itemsPerPage, products?.length);

  let pages = [];

  if (totalPages > 0) pages = [...Array(totalPages + 1).keys()];
  pages.shift();

  const pageChangeHandler = (e) => {
    const pageNum = +e.target.innerHTML;

    if (pageNum != currentPage) setCurrentPage(pageNum);
  };

  const nextHandler = () => {
    if (currentPage < pages.length) setCurrentPage((prev) => prev + 1);
  };

  const prevHandler = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return [
    pages,
    currentPage,
    pageChangeHandler,
    nextHandler,
    prevHandler,
    products?.slice(firstItem, lastItem),
  ];
};

export default usePagination;
