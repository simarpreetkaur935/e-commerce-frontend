import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import api from "../../api/axios";

const Navbar = () => {
  const [showSearch, setShowSearch] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem("accessToken")
    );

  const navigate = useNavigate();
  const location = useLocation();

  // Check login status
  useEffect(() => {
    setIsLoggedIn(
      !!localStorage.getItem("accessToken")
    );
  }, [location.pathname]);

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error: unknown) {
      console.error(
        "Logout Error:",
        error
      );
    } finally {
      localStorage.removeItem("accessToken");

      setIsLoggedIn(false);

      navigate("/login");
    }
  };

  return (
    <>
      {/* =========================
          MAIN NAVBAR
      ========================= */}

      <nav className="bg-gray-900 text-white px-6 py-3">
        <div className="flex items-center gap-6">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold hover:text-gray-300"
          >
            MyStore
          </Link>

          {/* Home */}

          <Link
            to="/"
            className="hover:text-gray-300"
          >
            Home
          </Link>

          {/* Categories */}

          <Link
            to="/categories"
            className="hover:text-gray-300"
          >
            Categories
          </Link>

          {/* =========================
              SEARCH AREA
          ========================= */}

          <div className="flex flex-1 justify-end items-center gap-2">

            {/* Search input */}

            {showSearch && (
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                className="w-full max-w-md px-4 py-2 text-black bg-white rounded outline-none"
              />
            )}

            {/* Search Button */}

            <button
              type="button"
              onClick={() =>
                setShowSearch(!showSearch)
              }
              className="bg-yellow-400 px-5 py-2 text-black font-semibold rounded hover:bg-yellow-500"
            >
              Search
            </button>

          </div>

          {/* Login / Logout */}

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hover:text-gray-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-300"
            >
              Login
            </Link>
          )}

          {/* Wishlist */}

          <Link
            to="/wishlist"
            className="hover:text-gray-300"
          >
            Wishlist
          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            className="hover:text-gray-300"
          >
            Cart
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
            className="hover:text-gray-300"
          >
            All Products
          </Link>

          <Link
            to="/new-arrivals"
            className="hover:text-gray-300"
          >
            New Arrivals
          </Link>

          <Link
            to="/best-sellers"
            className="hover:text-gray-300"
          >
            Best Sellers
          </Link>

          <Link
            to="/products?offers=true"
            className="hover:text-gray-300"
          >
            Today's Deals
          </Link>

          <Link
            to="/offers"
            className="hover:text-gray-300"
          >
            Offers
          </Link>

        </div>
      </div>
    </>
  );
};

export default Navbar;