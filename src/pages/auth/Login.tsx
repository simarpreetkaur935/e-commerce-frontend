
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

    submit(
      {
        email,
        password,
        rememberMe: rememberMe.toString(),
      },
      {
        method: "POST",
        action: "/login",
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">

        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
            M
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              MYSTORE
            </h1>
            <p className="text-xs text-slate-500">
              Shop. Discover. Repeat.
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue shopping.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-16 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Sign In
          </button>
        </form>

        {/* Registration */}
        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">
            NEW TO MYSTORE?
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="space-y-3">
          <Link
            to="/register"
            className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 px-4 py-3 transition hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">Create an Account</p>
              <p className="mt-1 text-xs text-slate-500">For customers</p>
            </div>
            <span className="text-blue-600" aria-hidden="true">→</span>
          </Link>

          <Link
            to="/register-seller"
            className="flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/50 px-4 py-3 transition hover:border-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Register as a Seller
              </p>
              <p className="mt-1 text-xs text-slate-500">
                For sellers
              </p>
            </div>
            <span className="text-indigo-600" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-xs text-slate-400">
          © 2026 MYSTORE. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
