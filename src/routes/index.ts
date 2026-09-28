import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/ MainLayout";
import Home from "../pages/Home";
import { homeLoader } from "../utils/Loaders";
import authRoutes from "./auth";
import ProductDetails from "../pages/ProductDetails";
import {productDetailsLoader}from "../utils/Loaders";
import Categories from "../pages/Categories";
import { categoriesLoader } from "../utils/Loaders";
import Wishlist from "../pages/Wishlist";
import { wishlistLoader } from "../utils/Loaders";
import Cart from "../pages/Cart";
import {cartLoader} from "../utils/Loaders";

const routes = createBrowserRouter([
  {
    path: "/",Component: MainLayout,children: [
      {index: true, Component: Home,loader: homeLoader,},
      
    {
      path: "/products/:id",
      Component: ProductDetails,
      loader: productDetailsLoader,
    },
     {
      path: "/categories",
      Component: Categories,
      loader: categoriesLoader,
    },
    {
        path : "/wishlist",
        Component: Wishlist,
        loader: wishlistLoader,
    },
    {
       path: "/cart",
       Component: Cart,
       loader: cartLoader,
    }
    ],
  },
  ...authRoutes,
]);

export default routes;
