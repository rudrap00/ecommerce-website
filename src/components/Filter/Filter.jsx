import { useContext } from "react";
import { productsContext } from "../../context/productsContext/productsContext";

const Filter = () => {
  const { state, dispatch } = useContext(productsContext);
  const { categories } = state;

  const changeHandler = (e) => {
    const checkedItems = localStorage.getItem("checkedItems");
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
      dispatch({ type: "addFilter", payload: e.target.id });
    } else {
      const { checked } = JSON.parse(checkedItems);
      localStorage.setItem(
        "checkedItems",
        JSON.stringify({
          checked: checked.filter((name) => name !== e.target.id),
        })
      );
      dispatch({ type: "removeFilter", payload: e.target.id });
    }
  };

  return (
    <div className="bg-white h-[calc(100%-1rem)] m-2 p-4 rounded-md shadow-md shadow-gray-300">
      <h1 className="font-semibold">Filter</h1>
      <div>Categories</div>
      <div className="flex flex-col">
        {categories &&
          categories.map(({ name, checked }) => (
            <div className="flex gap-4" key={name}>
              <input
                type="checkbox"
                value={name}
                id={name}
                onChange={changeHandler}
                checked={checked}
              />
              <span>{name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
