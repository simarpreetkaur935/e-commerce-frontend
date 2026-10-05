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
// =========================
// FORGOT PASSWORD - SEND OTP
// =========================

export const forgotPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const data = await request.formData();

  const payload = Object.fromEntries(data);

  try {
    const response = await api.post(
      "/auth/forgot-password",
      payload
    );

    toast.success(response.data.message);

    return {
      ...response.data,
      action: "sendOtp",
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "Something went wrong!";

    toast.error(message);

    return {
      success: false,
      message,
      action: "sendOtp",
    };
  }
};


// =========================
// VERIFY OTP
// =========================

export const verifyOtpAction = async ({
  request,
}: ActionFunctionArgs) => {
  const data = await request.formData();

  const payload = Object.fromEntries(data);

  try {
    const response = await api.post(
      "/auth/verify-otp",
      payload
    );

    toast.success(response.data.message);

    return {
      ...response.data,
      action: "verifyOtp",
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "Something went wrong!";

    toast.error(message);

    return {
      success: false,
      message,
      action: "verifyOtp",
    };
  }
};
// Forgot Password Page Action
export const forgotPasswordPageAction = async (
  args: ActionFunctionArgs
) => {
  const clonedRequest = args.request.clone();

  const data = await clonedRequest.formData();

  const action = data.get("_action");

  if (action === "sendOtp") {
    return forgotPasswordAction(args);
  }

  if (action === "verifyOtp") {
    return verifyOtpAction(args);
  }
  if(action === "resetPassword"){
    return resetPasswordAction(args);
  }

  return null;
};
//reset password action
// =========================
// RESET PASSWORD ACTION
// =========================

export const resetPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const data = await request.formData();

  const payload = Object.fromEntries(data);

  try {
    const response = await api.post(
      "/auth/reset-password",
      payload
    );

    toast.success(response.data.message);

    return {
      ...response.data,
      action: "resetPassword",
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "Unable to reset password";

    toast.error(message);

    return {
      success: false,
      message,
      action: "resetPassword",
    };
  }
};

// Change Password Action
export const changePasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const data = await request.formData();

  const payload = Object.fromEntries(data);

  try {
    const response = await api.put(
      "/users/change-password",
      payload
    );

    toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "Unable to change password";

    toast.error(message);

    return {
      success: false,
      message,
    };
  }
};
