import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { productsContext } from "../../context/productsContext/productsContext";
import Product from "../Products/Product";

const content = (
  <div className="h-full w-full flex items-center justify-center overflow-hidden">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
  </div>
);

const Search = () => {
  const query = useLoaderData();
  const [time, setTime] = useState(400);
  const [fall, setFall] = useState(content);

  const {
    state: { searchProducts: productsData },
    dispatch,
  } = useContext(productsContext);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "search", payload: query });
      setFall(() => (
        <div className="text-center">
          Loading Failed. Your internet connection is slow or dead.
        </div>
      ));
    }, time);
    return () => {
      dispatch({ type: "nullify-search" });
      setFall(content);
    };
  }, [dispatch, query, time]);
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
