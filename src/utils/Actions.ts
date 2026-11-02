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
//order action

export const createOrderAction = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const formData = await request.formData();

    // Get selected address ID
    const addressId = formData.get("addressId");

    if (!addressId || typeof addressId !== "string") {
      return {
        success: false,
        message: "Please select a delivery address",
      };
    }

    // Create order using selected address ID
    const response = await api.post("/orders", {
      addressId,
    });

    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    const orderId = response.data.order._id;

    return redirect(
      `/payment-method?orderId=${orderId}`
    );

  } catch (error: any) {
    console.error("Create Order Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to create order",
    };
  }
};
//address action



// Address Action
export const addressAction = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const formData = await request.formData();

    const intent = formData.get("intent");
    const addressId = formData.get("addressId");

    // Add Address
    if (intent === "add") {
      const address = {
        street: formData.get("street") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        country: formData.get("country") as string,
        pincode: formData.get("pincode") as string,
        isDefault: formData.get("isDefault") === "true",
      };

      const response = await api.post(
        "/addresses/add",
        address
      );

      return {
        success: response.data.success,
        message: response.data.message,
      };
    }

    // Update Address
    if (intent === "update") {
      if (typeof addressId !== "string" || !addressId) {
        return {
          success: false,
          message: "Address ID is required",
        };
      }

      const address = {
        street: formData.get("street") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        country: formData.get("country") as string,
        pincode: formData.get("pincode") as string,
        isDefault: formData.get("isDefault") === "true",
      };

      const response = await api.put(
        `/addresses/${addressId}`,
        address
      );

      return {
        success: response.data.success,
        message: response.data.message,
      };
    }

    // Delete Address
    if (intent === "delete") {
      if (typeof addressId !== "string" || !addressId) {
        return {
          success: false,
          message: "Address ID is required",
        };
      }

      const response = await api.delete(
        `/addresses/${addressId}`
      );

      return {
        success: response.data.success,
        message: response.data.message,
      };
    }

    // Set Default Address
    if (intent === "default") {
      if (typeof addressId !== "string" || !addressId) {
        return {
          success: false,
          message: "Address ID is required",
        };
      }

      const response = await api.patch(
        `/addresses/${addressId}/default`
      );

      return {
        success: response.data.success,
        message: response.data.message,
      };
    }

    return {
      success: false,
      message: "Invalid address action",
    };

  } catch (error: any) {
    console.error("Address Action Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to process address request",
    };
  }
};

