import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.value);

  const totalPrice = cartData.reduce(
    (acc, { count, price }) => acc + count * price,
    0
  );

  return (
    <>
      <div className="w-auto h-[80%] m-4 p-2 flex flex-col overflow-hidden shadow-md rounded-md bg-slate-200">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <div className="w-full overflow-auto">
          {cartData.length > 0 &&
            cartData.map((item) => <CartItem key={item.id} data={item} />)}
        </div>
        {cartData.length > 0 && (
          <div className="flex items-center mt-auto mb-4">
            <div className="w-[40%]">
              <span className="font-bold">Total:</span>
              <span>${totalPrice}</span>
            </div>
            <button className="w-auto bg-blue-500 text-white px-4 py-2 rounded-md mt-4 cursor-default ">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
