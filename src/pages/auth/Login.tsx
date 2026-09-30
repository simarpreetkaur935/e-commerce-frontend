import { useState } from "react";
import { useSubmit } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

      submit(data, { method: "POST",   action: "/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex bg-blue-600 text-white p-10 flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>

          <p className="text-blue-100 text-lg mb-8">
            Login to your account and continue shopping.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <p>Discover thousands of products</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <p>Fast and secure checkout</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <p>Track your orders easily</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <p>Get exclusive offers and deals</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>

            <p className="text-gray-500 mt-2">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
