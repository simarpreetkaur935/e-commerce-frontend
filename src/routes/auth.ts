import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { loginAction, registerAction } from "../utils/Actions";

const authRoutes = [
  { path: "/register", Component: Register, action: registerAction },
  { path: "/login", Component: Login, action: loginAction },
];

export default authRoutes;
