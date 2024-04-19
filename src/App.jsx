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
          path: ":id",
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
    (async () => {
      const res = await fetch(`https://dummyjson.com/products?limit=100`);
      const data = await res.json();

      dispatch({ type: "fetch", payload: data.products });
    })();
  }, [dispatch]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
