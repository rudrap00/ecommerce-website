import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { useSelector } from "react-redux";
import usePagination from "../../hooks/use-Pagination";
import Filter from "../Filter/Filter";
import Product from "../Products/Product";

const Home = () => {
  const { filteredProducts } = useSelector((state) => state.products);

  const [
    pages,
    currentPage,
    pageChangeHandler,
    nextHandler,
    prevHandler,
    productsData,
  ] = usePagination(filteredProducts);

  return (
    <div className="w-full h-full flex">
      <div className="w-1/5 min-w-[15rem] h-full p-2 pr-0 overflow-auto">
        <Filter />
      </div>
      <div className="w-4/5 flex flex-col">
        <div className="w-full h-full grid gap-4 p-4 pb-2 pl-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 overflow-auto">
          {productsData &&
            productsData.map((item) => (
              <Product key={item.id} product={item} />
            ))}
        </div>
        <div className="w-full h-[4rem] flex gap-2 items-center justify-center mt-auto ">
          {pages.length > 0 && (
            <>
              <div
                onClick={prevHandler}
                className={
                  "h-[2rem] w-[3rem] flex items-center justify-center border border-black rounded-md " +
                  (currentPage === 1
                    ? " bg-black text-gray-200 cursor-default"
                    : " cursor-pointer")
                }
              >
                <GrCaretPrevious />
              </div>
              {pages.map((item) => (
                <div
                  onClick={pageChangeHandler}
                  className={
                    "h-[2rem] w-[3rem] flex items-center justify-center border border-black rounded-md " +
                    (currentPage === item
                      ? " cursor-default bg-black text-gray-200"
                      : "cursor-pointer")
                  }
                  key={item}
                >
                  {item}
                </div>
              ))}
              <div
                onClick={nextHandler}
                className={
                  "h-[2rem] w-[3rem] flex items-center justify-center border border-black rounded-md " +
                  (currentPage === pages.length
                    ? " cursor-default text-gray-200 bg-black"
                    : " cursor-pointer")
                }
              >
                <GrCaretNext />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
