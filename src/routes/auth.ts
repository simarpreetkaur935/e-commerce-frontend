import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { loginAction, registerAction, forgotPasswordPageAction } from "../utils/Actions";
import forgetPassword from "../pages/auth/forgetPassword";
import SellerDashboard from "../pages/SellerDashboard";

const authRoutes = [
  { path: "/register", Component: Register, action: registerAction },
  { path: "/register-seller", Component: Register, action: registerAction },
  { path: "/seller-dashboard", Component: SellerDashboard },
  { path: "/login", Component: Login, action: loginAction },
  {path: "/forgot-password",Component: forgetPassword, action:   forgotPasswordPageAction,},

];

export default authRoutes;
