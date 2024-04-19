import { useContext } from "react";
import { productsContext } from "../../context/productsContext/productsContext";
import Filter from "../Filter/Filter";
import Product from "../Products/Product";

const Home = () => {
  const { state } = useContext(productsContext);

  const { filteredProducts: productsData } = state;

  return (
    <div className="w-full h-full flex">
      <div className="w-1/4 h-full p-2 pr-0 overflow-auto">
        <Filter />
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="w-full h-full grid gap-4 p-4 pb-2 pl-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 overflow-auto">
          {productsData &&
            productsData.map((item) => (
              <Product key={item.id} product={item} />
            ))}
        </div>
        <div className="w-full h-[4rem] mt-auto "></div>
      </div>
    </div>
  );
};

export default Home;
