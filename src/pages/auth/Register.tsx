import { useState } from "react";

import {
  Link,
  useSubmit,
} from "react-router-dom";

const Register = () => {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const submit = useSubmit();

  // =========================
  // PASSWORD VALIDATION
  // =========================

  const isPasswordValid =
    password.length >= 8;

  const isPasswordMatched =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const isConfirmPasswordInvalid =
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // Check password length
    if (password.length < 8) {
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      return;
    }

    const data = {
      name,
      email,
      phone,
      password,
      confirmPassword,
    };

    console.log(
      "FORM DATA:",
      data
    );

    submit(data, {
      method: "POST",
      action: "/register",
    });
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#f6f8fc]
        flex
        items-center
        justify-center
        px-4
        py-8
      "
    >
      {/* =========================
          REGISTER CARD
      ========================= */}

      <div
        className="
          relative
          w-full
          max-w-lg
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-[0_18px_50px_rgba(15,23,42,0.09)]
          overflow-hidden
        "
      >

        {/* =========================
            TOP ACCENT
        ========================= */}

        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-1
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-violet-600
          "
        />

        <div
          className="
            px-6
            py-7
            sm:px-8
            sm:py-8
          "
        >

          {/* =========================
              BRAND
          ========================= */}

          <div className="flex items-center justify-between mb-7">

            <Link
              to="/"
              className="flex items-center gap-2.5"
            >

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-lg
                  shadow-[0_6px_15px_rgba(37,99,235,0.25)]
                "
              >
                M
              </div>

              <div>

                <h1
                  className="
                    text-lg
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  MYSTORE
                </h1>

                <p
                  className="
                    text-[10px]
                    text-slate-400
                    -mt-0.5
                  "
                >
                  Shop. Discover. Repeat.
                </p>

              </div>

            </Link>

            <span
              className="
                hidden
                sm:inline-flex
                items-center
                gap-1.5
                px-2.5
                py-1
                rounded-full
                bg-blue-50
                text-[10px]
                font-semibold
                text-blue-600
              "
            >
              <span
                className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-blue-600
                "
              />

              JOIN MYSTORE
            </span>

          </div>


          {/* =========================
              HEADER
          ========================= */}

          <div className="mb-6">

            <h2
              className="
                text-2xl
                sm:text-[27px]
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Create your account
            </h2>

            <p
              className="
                text-sm
                text-slate-500
                mt-1.5
              "
            >
              Join MYSTORE and start shopping.
            </p>

          </div>


          {/* =========================
              FORM
          ========================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* =========================
                NAME + PHONE
            ========================= */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >

              {/* Name */}

              <div>

                <label
                  htmlFor="name"
                  className="
                    block
                    text-xs
                    font-semibold
                    text-slate-700
                    mb-1.5
                  "
                >
                  Full Name
                </label>

                <div className="relative">

                  <div
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0ZM4.5 20.25a7.5 7.5 0 0115 0"
                      />
                    </svg>
                  </div>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      pl-9
                      pr-3
                      py-3
                      rounded-xl
                      border
                      border-slate-300
                      bg-slate-50
                      text-sm
                      text-slate-900
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-50
                    "
                    required
                  />

                </div>

              </div>


              {/* Phone */}

              <div>

                <label
                  htmlFor="phone"
                  className="
                    block
                    text-xs
                    font-semibold
                    text-slate-700
                    mb-1.5
                  "
                >
                  Phone Number
                </label>

                <div className="relative">

                  <div
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.25c.621 0 1.125.504 1.125 1.125 0 1.242.198 2.475.584 3.655.174.532.014 1.116-.408 1.472l-1.508 1.27a15.049 15.049 0 006.47 6.47l1.27-1.508c.356-.422.94-.582 1.472-.408 1.18.386 2.413.584 3.655.584.621 0 1.125.504 1.125 1.125v2.25a2.25 2.25 0 01-2.25 2.25h-.75C9.973 22.5 1.5 14.027 1.5 3.75v-.75h.75Z"
                      />
                    </svg>
                  </div>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Your phone"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      pl-9
                      pr-3
                      py-3
                      rounded-xl
                      border
                      border-slate-300
                      bg-slate-50
                      text-sm
                      text-slate-900
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-50
                    "
                    required
                  />

                </div>

              </div>

            </div>


            {/* =========================
                EMAIL
            ========================= */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-xs
                  font-semibold
                  text-slate-700
                  mb-1.5
                "
              >
                Email Address
              </label>

              <div className="relative">

                <div
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75"
                    />
                  </svg>
                </div>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    pl-9
                    pr-3
                    py-3
                    rounded-xl
                    border
                    border-slate-300
                    bg-slate-50
                    text-sm
                    text-slate-900
                    placeholder:text-slate-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-50
                  "
                  required
                />

              </div>

            </div>


            {/* =========================
                PASSWORDS
            ========================= */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >

              {/* =========================
                  PASSWORD
              ========================= */}

              <div>

                <label
                  htmlFor="password"
                  className="
                    block
                    text-xs
                    font-semibold
                    text-slate-700
                    mb-1.5
                  "
                >
                  Password
                </label>

                <div className="relative">

                  {/* Lock Icon */}

                  <div
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V7.875a4.5 4.5 0 10-9 0V10.5m-.75 0h10.5A1.5 1.5 0 0118.75 12v6A1.5 1.5 0 0117.25 19.5H6.75A1.5 1.5 0 015.25 18v-6a1.5 1.5 0 011.5-1.5z"
                      />
                    </svg>
                  </div>


                  {/* Password Input */}

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className={`
                      w-full
                      pl-9
                      pr-10
                      py-3
                      rounded-xl
                      border
                      bg-slate-50
                      text-sm
                      text-slate-900
                      placeholder:text-slate-400
                      outline-none
                      transition-all

                      ${
                        password.length === 0
                          ? `
                            border-slate-300
                            focus:bg-white
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-50
                          `
                          : isPasswordValid
                          ? `
                            border-green-500
                            bg-green-50/40
                            focus:border-green-500
                            focus:ring-4
                            focus:ring-green-50
                          `
                          : `
                            border-red-500
                            bg-red-50/40
                            focus:border-red-500
                            focus:ring-4
                            focus:ring-red-50
                          `
                      }
                    `}
                    required
                  />


                  {/* Show / Hide Password */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                      transition
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.99 0 1.953-.138 2.862-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.066 7.5a10.523 10.523 0 01-4.293 5.512M6.228 6.228L3 3m3.228 3.228l3.21 3.21m7.334 7.334L21 21m-4.228-4.228l-3.21-3.21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z"
                        />
                      </svg>
                    )}

                  </button>

                </div>


                {/* Password Validation */}

                {password.length > 0 && (
                  <p
                    className={`
                      text-[11px]
                      mt-1.5
                      font-medium
                      ${
                        isPasswordValid
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    `}
                  >
                    {isPasswordValid
                      ? "✓ Password meets the minimum 8 characters"
                      : `✕ Password must be at least 8 characters (${password.length}/8)`}
                  </p>
                )}

              </div>


              {/* =========================
                  CONFIRM PASSWORD
              ========================= */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="
                    block
                    text-xs
                    font-semibold
                    text-slate-700
                    mb-1.5
                  "
                >
                  Confirm Password
                </label>

                <div className="relative">

                  {/* Lock Icon */}

                  <div
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V7.875a4.5 4.5 0 10-9 0V10.5m-.75 0h10.5A1.5 1.5 0 0118.75 12v6A1.5 1.5 0 0117.25 19.5H6.75A1.5 1.5 0 015.25 18v-6a1.5 1.5 0 011.5-1.5z"
                      />
                    </svg>
                  </div>


                  {/* Confirm Password Input */}

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className={`
                      w-full
                      pl-9
                      pr-10
                      py-3
                      rounded-xl
                      border
                      bg-slate-50
                      text-sm
                      text-slate-900
                      placeholder:text-slate-400
                      outline-none
                      transition-all

                      ${
                        confirmPassword.length === 0
                          ? `
                            border-slate-300
                            focus:bg-white
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-50
                          `
                          : isPasswordMatched
                          ? `
                            border-green-500
                            bg-green-50/40
                            focus:border-green-500
                            focus:ring-4
                            focus:ring-green-50
                          `
                          : `
                            border-red-500
                            bg-red-50/40
                            focus:border-red-500
                            focus:ring-4
                            focus:ring-red-50
                          `
                      }
                    `}
                    required
                  />


                  {/* Show / Hide Confirm Password */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                      transition
                    "
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >

                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.99 0 1.953-.138 2.862-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.066 7.5a10.523 10.523 0 01-4.293 5.512M6.228 6.228L3 3m3.228 3.228l3.21 3.21m7.334 7.334L21 21m-4.228-4.228l-3.21-3.21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z"
                        />
                      </svg>
                    )}

                  </button>

                </div>


                {/* Confirm Password Validation */}

                {confirmPassword.length > 0 && (
                  <p
                    className={`
                      text-[11px]
                      mt-1.5
                      font-medium
                      ${
                        isPasswordMatched
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    `}
                  >
                    {isPasswordMatched
                      ? "✓ Passwords match"
                      : "✕ Passwords do not match"}
                  </p>
                )}

              </div>

            </div>


            {/* =========================
                PASSWORD SECURITY HINT
            ========================= */}

            {password.length === 0 && (
              <div className="flex items-center gap-1.5">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className="
                    w-3.5
                    h-3.5
                    text-slate-400
                  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0 3h.007v.008H12v-.008ZM10.5 3.75h3L21 10.5v3l-7.5 6.75h-3L3 13.5v-3l7.5-6.75Z"
                  />
                </svg>

                <p className="text-[11px] text-slate-500">
                  Use at least 8 characters for a stronger password.
                </p>

              </div>
            )}


            {/* =========================
                CREATE ACCOUNT
            ========================= */}

            <button
              type="submit"
              disabled={
                password.length < 8 ||
                password !== confirmPassword
              }
              className="
                w-full
                py-3
                mt-2
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-slate-300
                disabled:cursor-not-allowed
                text-white
                text-sm
                font-semibold
                shadow-[0_8px_18px_rgba(37,99,235,0.20)]
                hover:shadow-[0_10px_22px_rgba(37,99,235,0.28)]
                disabled:shadow-none
                transition-all
                duration-200
                focus:outline-none
                focus:ring-4
                focus:ring-blue-100
              "
            >
              Create Account

              <span className="ml-2">
                →
              </span>
            </button>

          </form>


          {/* =========================
              SECURITY
          ========================= */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-1.5
              mt-4
              text-[11px]
              text-slate-400
            "
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4Z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              />
            </svg>

            Secure registration

          </div>


          {/* =========================
              LOGIN
          ========================= */}

          <div
            className="
              mt-6
              pt-5
              border-t
              border-slate-100
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <p className="text-xs text-slate-500">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="
                text-sm
                font-semibold
                text-blue-600
                hover:text-blue-700
                transition
                whitespace-nowrap
              "
            >
              Sign in →
            </Link>

          </div>


          {/* =========================
              FOOTER
          ========================= */}

          <p
            className="
              text-center
              text-[10px]
              text-slate-400
              mt-6
            "
          >
            © 2026 MYSTORE
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;