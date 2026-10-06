import { useEffect, useState } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import api from "../../api/axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem("accessToken")
    );

  const [profile, setProfile] = useState<{
    name: string;
    avatar?: string;
  } | null>(null);

  const location = useLocation();

  // =========================
  // CHECK LOGIN STATUS
  // =========================

  useEffect(() => {
    setIsLoggedIn(
      !!localStorage.getItem("accessToken")
    );
  }, [location.pathname]);

  // =========================
  // GET LOGGED-IN USER
  // =========================

  useEffect(() => {
    if (!isLoggedIn) {
      setProfile(null);
      return;
    }

    api
      .get("/users/me")
      .then((response) => {
        if (response.data.success) {
          setProfile(response.data.user);
        }
      })
      .catch((error: any) => {
        console.error(
          "Get Navbar Profile Error:",
          error.response?.data?.message ||
            error.message
        );
      });
  }, [isLoggedIn]);

  return (
    <>
      {/* =========================
          MAIN NAVBAR
      ========================= */}

      <nav className="bg-gray-900 text-white px-6 py-3">
        <div className="flex items-center gap-6">

          {/* =========================
              LOGO
          ========================= */}

          <Link
            to="/"
            className="text-2xl font-bold hover:text-gray-300 transition"
          >
            MyStore
          </Link>

          {/* =========================
              HOME
          ========================= */}

          <Link
            to="/"
            className="hover:text-gray-300 transition"
          >
            Home
          </Link>

          {/* =========================
              CATEGORIES
          ========================= */}

          <Link
            to="/categories"
            className="hover:text-gray-300 transition"
          >
            Categories
          </Link>

          {/* =========================
              SEARCH
          ========================= */}

          <div className="flex-1 flex justify-end">
            <div className="group relative flex items-center">

              <input
                type="text"
                placeholder="Search products..."
                className="h-10 w-10 group-hover:w-52 md:group-hover:w-64 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 border border-gray-700 outline-none opacity-80 group-hover:opacity-100 pl-3 group-hover:pl-4 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 ease-in-out cursor-pointer group-hover:cursor-text"
              />

              <div className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-lg text-gray-300 group-hover:text-white group-hover:bg-gray-700 transition pointer-events-none">

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path
                    d="m20 20-4-4"
                  />
                </svg>

              </div>
            </div>
          </div>

          {/* =========================
              PROFILE
          ========================= */}

          {isLoggedIn ? (
            <Link
              to="/profile"
              title="Profile"
              className="flex items-center justify-center transition hover:scale-110"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-gray-600 hover:border-white transition">

                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold text-gray-700">
                    {profile?.name
                      ?.charAt(0)
                      .toUpperCase() || "U"}
                  </span>
                )}

              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-300 transition"
            >
              Login
            </Link>
          )}

          {/* =========================
              WISHLIST ICON
          ========================= */}

          <Link
            to="/wishlist"
            title="Wishlist"
            className="group flex items-center justify-center transition hover:scale-110"
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition group-hover:text-pink-400"
            >
              <path
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
              />
            </svg>
          </Link>

          {/* =========================
              CART ICON
          ========================= */}

          <Link
            to="/cart"
            title="Cart"
            className="group flex items-center justify-center transition hover:scale-110"
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition group-hover:text-yellow-400"
            >
              <circle
                cx="9"
                cy="20"
                r="1"
              />

              <circle
                cx="18"
                cy="20"
                r="1"
              />

              <path
                d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"
              />
            </svg>
          </Link>

        </div>
      </nav>

      {/* =========================
          SECONDARY NAVBAR
      ========================= */}

      <div className="bg-gray-800 text-white px-6 py-2">

        <div className="flex gap-6 text-sm">

          <Link
            to="/products"
            className="hover:text-gray-300 transition"
          >
            All Products
          </Link>

          <Link
            to="/new-arrivals"
            className="hover:text-gray-300 transition"
          >
            New Arrivals
          </Link>

          <Link
            to="/best-sellers"
            className="hover:text-gray-300 transition"
          >
            Best Sellers
          </Link>

          <Link
            to="/products?offers=true"
            className="hover:text-gray-300 transition"
          >
            Today's Deals
          </Link>

          <Link
            to="/offers"
            className="hover:text-gray-300 transition"
          >
            Offers
          </Link>

        </div>

      </div>
    </>
  );
};

export default Navbar;