import {
  useEffect,
  useState,
} from "react";

import type { FormEvent } from "react";

import {
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

interface ActionData {
  success: boolean;
  message?: string;
  action?: string;
}

const ForgotPassword = () => {
  const submit = useSubmit();

  const actionData =
    useActionData() as ActionData | undefined;

  const navigation = useNavigation();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [step, setStep] =
    useState(1);

  const [error, setError] =
    useState("");

  const loading =
    navigation.state === "submitting";

  // Handle response from Actions.ts
  useEffect(() => {
    if (!actionData) {
      return;
    }

    if (actionData.success) {
      setError("");

      // Step 1 → Step 2
      if (
        actionData.action === "sendOtp"
      ) {
        setStep(2);
      }

      // Step 2 → Step 3
      if (
        actionData.action === "verifyOtp"
      ) {
        setStep(3);
      }

      // Step 3 → Login
      if (
        actionData.action ===
        "resetPassword"
      ) {
        window.location.href =
          "/login";
      }
    } else {
      setError(
        actionData.message ||
          "Something went wrong!"
      );
    }
  }, [actionData]);

  // Send OTP
  const handleSendOtp = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const formData =
      new FormData(
        event.currentTarget
      );

    formData.append(
      "_action",
      "sendOtp"
    );

    submit(formData, {
      method: "post",
    });
  };

  // Verify OTP
  const handleVerifyOtp = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const formData =
      new FormData(
        event.currentTarget
      );

    formData.append(
      "_action",
      "verifyOtp"
    );

    submit(formData, {
      method: "post",
    });
  };

  // Reset Password
  const handleResetPassword = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    // Check password confirmation
    if (
      newPassword !==
      confirmPassword
    ) {
      setError(
        "New passwords do not match"
      );

      return;
    }

    const formData =
      new FormData(
        event.currentTarget
      );

    formData.append(
      "_action",
      "resetPassword"
    );

    submit(formData, {
      method: "post",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-lg border border-gray-200 p-6">

        {/* STEP 1 - EMAIL */}

        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-center">
              Forgot Password
            </h1>

            <p className="text-gray-500 text-center mt-2">
              Enter your email to receive an OTP.
            </p>

            <form
              onSubmit={
                handleSendOtp
              }
              className="mt-6"
            >

              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-5 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Sending..."
                  : "Send OTP"}
              </button>

            </form>
          </>
        )}

        {/* STEP 2 - OTP */}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold text-center">
              Verify OTP
            </h1>

            <p className="text-gray-500 text-center mt-2">
              Enter the OTP sent to your email.
            </p>

            <form
              onSubmit={
                handleVerifyOtp
              }
              className="mt-6"
            >

              <input
                type="hidden"
                name="email"
                value={email}
              />

              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                OTP
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value
                  )
                }
                placeholder="Enter 6-digit OTP"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-5 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

            </form>
          </>
        )}

        {/* STEP 3 - RESET PASSWORD */}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold text-center">
              Reset Password
            </h1>

            <p className="text-gray-500 text-center mt-2">
              Enter your new password.
            </p>

            <form
              onSubmit={
                handleResetPassword
              }
              className="mt-6"
            >

              <input
                type="hidden"
                name="email"
                value={email}
              />

              <input
                type="hidden"
                name="otp"
                value={otp}
              />

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
                  name="password"
                  type="password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Confirm Password */}

              <div className="mt-5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-5 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>

            </form>
          </>
        )}

        {/* ERROR */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mt-4">
            {error}
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;