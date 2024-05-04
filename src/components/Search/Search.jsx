import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { nullifySearch, search } from "../../app/products/productsSlice";
import Product from "../Products/Product";

const content = (
  <div className="h-full w-full flex items-center justify-center overflow-hidden">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-500 h-12 w-12"></div>
  </div>
);

const Search = () => {
  const query = useLoaderData();
  const [fall, setFall] = useState(content);

  const dispatch = useDispatch();

  const { searchProducts: productsData } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(search(query));
      setFall(() => (
        <div className="text-center">
          Loading Failed. Your internet connection is slow or dead.
        </div>
      ));
    }, 500);
    return () => {
      dispatch(nullifySearch());
      setFall(content);
    };
  }, [dispatch, query]);
  return (
    <>
      {productsData && productsData.length > 0 && (
        <div className="w-full h-full p-2 flex flex-col">
          <div className="w-full h-full grid gap-4 p-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-auto">
            {productsData.map((item) => (
              <Product key={item.id} product={item} />
            ))}
          </div>
          <div className="w-full h-[4rem] mt-auto "></div>
        </div>
      )}
      {productsData && productsData.length === 0 && (
        <div className="text-center">No data found.</div>
      )}
      {!productsData && fall}
    </>
  );
};

export default Search;
