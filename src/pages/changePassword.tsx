import { useState } from "react";
import type { FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    // Check password confirmation
    if (newPassword !== confirmPassword) {
      setError(
        "New passwords do not match"
      );

      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        "/users/change-password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        }
      );

      if (response.data.success) {
        // Remove old access token
        localStorage.removeItem(
          "accessToken"
        );

        // Go to login
        navigate("/login");
      }
    } catch (error: any) {
      console.error(
        "Change Password Error:",
        error.response?.data?.message ||
          error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold">
            Change Password
          </h1>

          <p className="text-gray-500 mt-1">
            Update your account password.
          </p>
        </div>

        {/* Form */}

        <div className="bg-white rounded-lg border border-gray-200 p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Current Password */}

            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Current Password
              </label>

              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) =>
                  setCurrentPassword(
                    event.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
            </div>

            {/* New Password */}

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>

              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(
                    event.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />

              {/* Password Match Message */}

              {confirmPassword && (
                <p
                  className={
                    newPassword ===
                    confirmPassword
                      ? "text-green-600 text-sm mt-2"
                      : "text-red-600 text-sm mt-2"
                  }
                >
                  {newPassword ===
                  confirmPassword
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Error */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Buttons */}

            <div className="flex gap-4 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Changing..."
                  : "Change Password"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/profile")
                }
                className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ChangePassword;