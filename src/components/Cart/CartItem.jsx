import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext/cartContext";

const CartItem = ({ data }) => {
  const { id, thumbnail, title, price, count } = data;
  const { dispatch } = useContext(cartContext);

  const changeHandler = (e) => {
    const type = e.target.id;

    const action = { type, payload: 1, data };
    dispatch(action);
  };

  return (
    <div className="w-full flex justify-between">
      <Link className="w-[60%]" to={`/${id}`}>
        <div className="w-full flex justify-between h-40 m-4 rounded-md shadow-md border-r-20 bg-white">
          <div className="w-80 h-40">
            <img
              className="rounded-l-md h-full w-full"
              src={thumbnail}
              alt="product-image"
            />
          </div>
          <div className="flex items-start gap-8 mr-auto">
            <span className="font-bold">{title}</span>
            <span className="font-semibold text-gray-800"> ${price}</span>
          </div>
        </div>
      </Link>
      <div className="w-[20%] flex items-center space-x-2">
        <button
          id="decrement"
          className="text-gray-500"
          onClick={changeHandler}
        >
          -
        </button>
        <span>{count}</span>
        <button
          id="increment"
          className="text-gray-500"
          onClick={changeHandler}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
