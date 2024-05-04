import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { fetchData, setFilter } from "./app/products/productsSlice";
import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import ProductPage from "./components/Products/ProductPage";
import Search from "./components/Search/Search";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "product/:id",
          element: <ProductPage />,
          loader: async ({ params: { id } }) => {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await res.json();

            return data;
          },
        },
        {
          path: "search",
          element: <Search />,
          loader: async ({ request: { url } }) => url.split("=")[1],
        },
      ],
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    const { checked } = JSON.parse(localStorage.getItem("checkedItems")) || {
      checked: [],
    };

    if (checked.length > 0) {
      setTimeout(() => {
        dispatch(setFilter(checked));
      }, 500);
    }

    Promise.all([
      fetch("https://dummyjson.com/products?limit=100"),
      fetch("https://dummyjson.com/products/categories"),
    ])
      .then((resp) => Promise.all(resp.map((res) => res.json())))
      .then((data) => dispatch(fetchData(data)));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
