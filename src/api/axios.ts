import axios from "axios";
import type {
  InternalAxiosRequestConfig,
} from "axios";

interface RetryConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },

  // Allows the refresh-token cookie
  // to be sent to the backend
  withCredentials: true,
});

// =========================
// REQUEST INTERCEPTOR
// =========================

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

// =========================
// RESPONSE INTERCEPTOR
// =========================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest =
      error.config as RetryConfig;

    // Access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(
        "/auth/refresh-token"
      )
    ) {
      originalRequest._retry = true;

      try {
        // Ask backend for a new access token
        const response = await api.post(
          "/auth/refresh-token"
        );

        const newAccessToken =
          response.data.accessToken;

        // Save new access token
        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        // Add new token to original request
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError: any) {
        // Refresh token expired/invalid
        localStorage.removeItem(
          "accessToken"
        );

        const message =
          refreshError.response?.data?.message ||
          "Session expired. Please login again.";

        sessionStorage.setItem(
          "sessionExpiredMessage",
          message
        );

        window.location.href = "/login";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;