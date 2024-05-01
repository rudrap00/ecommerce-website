import { useContext, useEffect } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import ProductPage from "./components/Products/ProductPage";
import Search from "./components/Search/Search";
import CartProvider from "./context/cartContext/CartProvider";
import { productsContext } from "./context/productsContext/productsContext";

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

  const { dispatch } = useContext(productsContext);

  useEffect(() => {
    const { checked } = JSON.parse(localStorage.getItem("checkedItems")) || {
      checked: [],
    };

    if (checked.length > 0) {
      setTimeout(() => {
        dispatch({ type: "setFilter", payload: checked });
      }, 500);
    }

    (async () => {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();

      await dispatch({ type: "fetch", payload: data.products });
    })();

    (async () => {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();

      await dispatch({ type: "cat", payload: data });
    })();
  }, [dispatch]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
