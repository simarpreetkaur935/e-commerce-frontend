
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout.tsx";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetails from "../pages/ProductDetails";
import Categories from "../pages/Categories";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/changePassword";
import ShippingInformation from "../pages/support/ShippingInformation";
import ReturnsRefunds from "../pages/support/ReturnsRefunds";
import TrackOrder from "../pages/support/TrackOrder";
import AboutUs from "../pages/company/AboutUs";
import OurStory from "../pages/company/OurStory";
import Careers from "../pages/company/Careers.tsx";
import ContactUs from "../pages/company/ContactUs";
import PrivacyPolicy from "../pages/company/PrivacyPolicy";


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



      // CATEGORIES
      {
        path: "categories",
        Component: Categories,
        loader: categoriesLoader,
      },
      {
        path: "categories/:categoryId",
        Component: Product,
        loader: allProductsLoader,
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
  
{
  path: "shipping-information",
  Component: ShippingInformation,
},
{
  path: "returns-refunds",
  Component: ReturnsRefunds,
},
{
  path: "track-order",
  Component: TrackOrder,
},
// Company routes
{
  path: "about-us",
  Component: AboutUs,
},
{
  path: "our-story",
  Component: OurStory,
},
{
  path: "careers",
  Component: Careers,
},
{
  path: "contact-us",
  Component: ContactUs,
},
{
  path: "privacy-policy",
  Component: PrivacyPolicy,
},


    ],
  },
  ...authRoutes,
]);

export default routes;
