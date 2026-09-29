import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import api from "../../api/axios";

const Navbar = () => {
  const [showSearch, setShowSearch] =
    useState(false);

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

            {showSearch && (
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                className="w-full max-w-md px-4 py-2 text-black bg-white rounded outline-none"
              />
            )}

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

          {/* =========================
              PROFILE / LOGIN
          ========================= */}

          {isLoggedIn ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              {/* Profile Circle */}

              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">

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

              {/* Profile Name */}

              <span className="hidden md:block">
                {profile?.name || "Profile"}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-300"
            >
              Login
            </Link>
          )}

          {/* =========================
              WISHLIST
          ========================= */}

          <Link
            to="/wishlist"
            className="hover:text-gray-300"
          >
            Wishlist
          </Link>

          {/* =========================
              CART
          ========================= */}

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