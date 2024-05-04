import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../app/products/productsSlice";

const Filter = () => {
  const { categories } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const checkedItems = localStorage.getItem("checkedItems");
    const { id } = e.target;
    if (e.target.checked) {
      if (!checkedItems) {
        localStorage.setItem(
          "checkedItems",
          JSON.stringify({ checked: [e.target.id] })
        );
      } else {
        const { checked } = JSON.parse(checkedItems);
        checked.push(e.target.id);

        localStorage.setItem("checkedItems", JSON.stringify({ checked }));
      }
      dispatch(addFilter(id));
    } else {
      const { checked } = JSON.parse(checkedItems);
      localStorage.setItem(
        "checkedItems",
        JSON.stringify({
          checked: checked.filter((name) => name !== e.target.id),
        })
      );
      dispatch(removeFilter(id));
    }
  };

  return (
    <div className="bg-white h-[88%] m-2 p-4 rounded-md shadow-md shadow-gray-300 overflow-scroll">
      <h1 className="font-semibold">Filter</h1>
      <div>Categories</div>
      <div className="flex flex-col">
        {categories &&
          categories.map(({ name, checked }) => (
            <div className="h-6 flex gap-4 items-center" key={name}>
              <input
                type="checkbox"
                value={name}
                id={name}
                onChange={changeHandler}
                checked={checked}
                className="cursor-pointer"
              />
              <div className="cursor-default">{name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
