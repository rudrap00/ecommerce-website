import { useRef } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetFilter } from "../../app/products/productsSlice";

const Header = () => {
  const naviagte = useNavigate();
  const inputRef = useRef("");

  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();

    if (query) {
      naviagte(`/search?query=${query}`);
    }
  };

  const resetHandler = () => {
    const checkedItems = localStorage.getItem("checkedItems");
    if (checkedItems)
      localStorage.setItem("checkedItems", JSON.stringify({ checked: [] }));
    dispatch(resetFilter());
  };

  return (
    <div className="w-full h-14 px-28 flex-shrink-0 bg-blue-500 flex justify-between items-center">
      <div>
        <Link onClick={resetHandler} to="/">
          <AiOutlineHome size={28} />
        </Link>
      </div>
      <div className="h-8 w-auto flex items-center rounded-sm bg-white">
        <form
          onSubmit={searchHandler}
          className="w-auto mx-1 flex gap-2 items-center"
        >
          <input
            type="text"
            placeholder="Search products, etc..."
            className="w-60 h-full outline-none"
            ref={inputRef}
          />
          <button type="submit">
            <BsSearch size={20} color="gray" />
          </button>
        </form>
      </div>
      <div>
        <Link to="cart">
          <AiOutlineShoppingCart size={28} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
