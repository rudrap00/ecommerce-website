import { useState } from "react";

const usePagination = (products) => {
  const [currentPage, setCurrentPage] = useState(1);
  let pages = [];

  if (products) {
    const totalItems = products?.length;
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const firstItem = (currentPage - 1) * itemsPerPage;
    const lastItem = Math.min(currentPage * itemsPerPage, products.length);

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

    if (currentPage > pages.length) setCurrentPage(pages.length);

    return [
      pages,
      currentPage,
      pageChangeHandler,
      nextHandler,
      prevHandler,
      products.slice(firstItem, lastItem),
    ];
  } else {
    return [pages, 1, undefined, undefined, undefined, null];
  }
};

export default usePagination;
