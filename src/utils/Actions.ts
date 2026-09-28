import type { ActionFunctionArgs } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();

  const payload = Object.fromEntries(data);

  try {
    const response = await api.post("/auth/register", payload);

    toast.success(response.data.message);
     return redirect("/login");

    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Something went wrong!"
    );

    return null;
  }
};

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();

  const payload = Object.fromEntries(data);

  try {
    const response = await api.post("/auth/login", payload);

    localStorage.setItem(
      "accessToken",
      response.data.accessToken
    );

    toast.success(response.data.message);
    console.log("login successful");
     return redirect("/");

   
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Something went wrong!"
    );

    return null;
  }
};
