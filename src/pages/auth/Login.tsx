import { useState } from "react";

import { Link, useSubmit } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const submit = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
      rememberMe: rememberMe.toString(),
    };

    submit(data, {
      method: "POST",
      action: "/login",
    });
  };

  return (
    <div
      className={` " test min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10"`}
    >
      {/* =========================
          OUTER CARD WRAPPER
      ========================= */}

      <div className="w-full max-w-md">
        {/* =========================
            LOGIN CARD
        ========================= */}

        <div
          className="
            relative
            bg-white
            rounded-[28px]
            border border-white
            p-7 sm:p-9

            shadow-[0_10px_25px_rgba(15,23,42,0.06),0_25px_60px_rgba(37,99,235,0.10)]

            ring-1 ring-black/[0.03]

            transition-all
            duration-300
            hover:shadow-[0_15px_35px_rgba(15,23,42,0.08),0_30px_70px_rgba(37,99,235,0.14)]
          "
        >
          {/* =========================
              SUBTLE TOP GLOW
          ========================= */}

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />

          {/* =========================
              MYSTORE BRAND
          ========================= */}

          <div className="flex items-center justify-center mb-9">
            <div className="flex items-center gap-3">
              {/* Logo */}

              <div className="relative">
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-indigo-600
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-xl
                    shadow-[0_8px_18px_rgba(37,99,235,0.28)]
                  "
                >
                  M
                </div>

                {/* Decorative Dot */}

                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full border-2 border-white" />
              </div>

              {/* Brand */}

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  MYSTORE
                </h1>

                <p className="text-xs text-gray-500 tracking-wide">
                  Shop. Discover. Repeat.
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              WELCOME
          ========================= */}

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              WELCOME BACK
            </div>

            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Sign in to your account
            </h2>

            <p className="text-gray-500 mt-2">Continue where you left off.</p>
          </div>

          {/* =========================
              LOGIN FORM
          ========================= */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* =========================
                EMAIL
            ========================= */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                {/* Email Icon */}

                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-5 h-5"
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3.5
                    rounded-xl
                    border
                    border-gray-300
                    bg-gray-50
                    outline-none
                    transition-all
                    duration-200
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                  required
                />
              </div>
            </div>

            {/* =========================
                PASSWORD
            ========================= */}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                {/* Lock Icon */}

                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V7.875a4.5 4.5 0 10-9 0V10.5m-.75 0h10.5A1.5 1.5 0 0118.75 12v6A1.5 1.5 0 0117.25 19.5H6.75A1.5 1.5 0 015.25 18v-6a1.5 1.5 0 011.5-1.5z"
                    />
                  </svg>
                </div>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    pl-12
                    pr-14
                    py-3.5
                    rounded-xl
                    border
                    border-gray-300
                    bg-gray-50
                    outline-none
                    transition-all
                    duration-200
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                  required
                />

                {/* Show / Hide */}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-5 h-5"
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
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-5 h-5"
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
            </div>

            {/* =========================
                REMEMBER + FORGOT
            ========================= */}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm text-gray-600">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* =========================
                LOGIN BUTTON
            ========================= */}

            <button
              type="submit"
              className="
                w-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                hover:from-blue-700
                hover:to-indigo-700
                text-white
                py-3.5
                rounded-xl
                font-semibold
                transition-all
                duration-200
                shadow-[0_8px_20px_rgba(37,99,235,0.25)]
                hover:shadow-[0_10px_25px_rgba(37,99,235,0.35)]
                hover:-translate-y-0.5
                focus:outline-none
                focus:ring-4
                focus:ring-blue-200
              "
            >
              Continue Shopping
              <span className="ml-2">→</span>
            </button>
          </form>

          {/* =========================
              SECURITY
          ========================= */}

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7.5-4.5-7.5-9V7l7.5-4Z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              />
            </svg>

            <span>Secure sign in • Your account is protected</span>
          </div>

          {/* =========================
              REGISTER DIVIDER
          ========================= */}

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-gray-400">
                NEW TO MYSTORE?
              </span>
            </div>
          </div>

          {/* =========================
              REGISTER BUTTON
          ========================= */}

          <Link
            to="/register"
            className="
              w-full
              border
              border-gray-300
              hover:border-blue-500
              hover:bg-blue-50
              text-gray-800
              py-3.5
              rounded-xl
              font-semibold
              text-center
              transition-all
              duration-200
              block
            "
          >
            Create an Account
          </Link>

          {/* =========================
              FOOTER
          ========================= */}

          <p className="text-center text-xs text-gray-400 mt-7">
            © 2026 MYSTORE • Shop. Discover. Repeat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
