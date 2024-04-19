const usePagination = (totalItems, itemsPerPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [...Array(totalPages + 1).keys()];
  pages.shift();

  return pages;
};

export default usePagination;
