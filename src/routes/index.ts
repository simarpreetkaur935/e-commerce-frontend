
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/ MainLayout.tsx";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetails from "../pages/ProductDetails";
import Categories from "../pages/Categories";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/changePassword";

import BestSellers from "../pages/BestSellers.tsx";
import TodaysDeals from "../pages/TodayDeal.tsx";

import {
  homeLoader,
  allProductsLoader,
  productDetailsLoader,
  categoriesLoader,
  wishlistLoader,
  cartLoader,
  profileLoader,
  editProfileLoader,
 
} from "../utils/Loaders";

import authRoutes from "./auth";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      // HOME PAGE
      {
        index: true,
        Component: Home,
        loader: homeLoader,
      },

      // ALL PRODUCTS PAGE
      {
        path: "products",
        Component: Product,
        loader: allProductsLoader,
      },

      // SINGLE PRODUCT DETAILS
      {
        path: "products/:id",
        Component: ProductDetails,
        loader: productDetailsLoader,
      },

{
  path: "/best-sellers",
  Component: BestSellers,
},
{
  path: "/todays-deals",
  Component: TodaysDeals,
},

      // CATEGORIES
      {
        path: "categories",
        Component: Categories,
        loader: categoriesLoader,
      },

      // WISHLIST
      {
        path: "wishlist",
        Component: Wishlist,
        loader: wishlistLoader,
      },

      // CART
      {
        path: "cart",
        Component: Cart,
        loader: cartLoader,
      },

      // PROFILE
      {
        path: "profile",
        Component: Profile,
        loader: profileLoader,
      },

      // EDIT PROFILE
      {
        path: "profile/edit",
        Component: EditProfile,
        loader: editProfileLoader,
      },

      // CHANGE PASSWORD
      {
        path: "change-password",
        Component: ChangePassword,
      },
    ],
  },
  ...authRoutes,
]);

export default routes;
