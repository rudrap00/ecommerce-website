import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { addToCart } from "../../app/cart/cartSlice";

const ProductPage = () => {
  const data = useLoaderData();
  const { title, images, description, price, rating } = data;
  const len = images ? images.length : 0;

  const [counter, setCounter] = useState(0);

  const incrementHandler = () => {
    setCounter((prev) => (prev + 1) % len);
  };

  const decrementHandler = () => {
    setCounter((prev) => (len + prev - 1) % len);
  };

  const dispatch = useDispatch();

  return (
    <div className="w-full h-auto">
      <div className="flex justify-around items-center w-full p-10">
        <div className="rounded-full w-8 h-8 shadow-lg border-[1px] flex justify-center items-center bg-white">
          <button onClick={decrementHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex shadow-lg rounded-xl justify-center w-1/2">
          <img
            className="rounded-xl object-contain h-96 w-full border-[2px]"
            src={images[counter]}
            alt="profile picture"
            loading="lazy"
          />
        </div>

        <div className="rounded-full w-8 h-8 shadow-lg border-[1px] flex justify-center items-center bg-white">
          <button onClick={incrementHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 5.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="shadow-md w-1/3 text-left p-4">
          <h1>{title}</h1>
          <h3>{description}</h3>
        </div>
        <div className="w-1/3 shadow-md">
          <p>Price: {price}</p>
          <p>Rating: {rating}</p>
        </div>
        <div className="w-40 h-10 flex items-center justify-center rounded-md bg-gray-100 border-gray-900-100 border-1 cursor-pointer hover:bg-gray-300 shadow-md">
          <Link to="/cart">
            <button onClick={() => dispatch(addToCart(data))}>
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
