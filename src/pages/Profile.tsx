import {
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

interface Profile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: {
    country?: string;
    deletedAt?: string | null;
  };
}

const Profile = () => {
  const profile = useLoaderData() as Profile;

  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error: unknown) {
      console.error("Logout Error:", error);
    } finally {
      // Remove access token from browser
      localStorage.removeItem("accessToken");

      // Go to login page
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-7xl mx-auto">

        {/* =========================
            PROFILE HEADER
        ========================= */}

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">

          <div className="flex items-center gap-6">

            {/* Profile Image */}

            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">

              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-semibold text-gray-500">
                  {profile.name
                    ?.charAt(0)
                    .toUpperCase()}
                </span>
              )}

            </div>

            {/* User Name */}

            <div>
              <h1 className="text-3xl font-bold">
                {profile.name}
              </h1>

              <p className="text-gray-500 mt-1">
                {profile.email}
              </p>
            </div>

          </div>

        </div>


        {/* =========================
            PERSONAL INFORMATION
        ========================= */}

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">

          <h2 className="text-xl font-semibold mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}

            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="mt-1 font-medium">
                {profile.name}
              </p>
            </div>


            {/* Email */}

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 font-medium">
                {profile.email}
              </p>
            </div>


            {/* Phone */}

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="mt-1 font-medium">
                {profile.phone || "Not provided"}
              </p>
            </div>


            {/* Address */}

            <div>
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="mt-1 font-medium">
                {profile.address?.country ||
                  "Not provided"}
              </p>
            </div>

          </div>

        </div>


        {/* =========================
            ACCOUNT OPTIONS
        ========================= */}

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">

          <h2 className="text-xl font-semibold mb-6">
            My Account
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {/* Orders */}

            <Link
              to="/orders"
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold">
                My Orders
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                View and track your orders.
              </p>
            </Link>


            {/* Wishlist */}

            <Link
              to="/wishlist"
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold">
                My Wishlist
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                View your saved products.
              </p>
            </Link>


            {/* Cart */}

            <Link
              to="/cart"
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold">
                My Cart
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                View products in your cart.
              </p>
            </Link>

          </div>

        </div>


        {/* =========================
            ACCOUNT SETTINGS
        ========================= */}

        <div className="bg-white rounded-lg border border-gray-200 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Account Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {/* Edit Profile */}

            <Link
              to="/profile/edit"
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold">
                Edit Profile
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Update your personal information.
              </p>
            </Link>


            {/* Change Password */}

            <Link
              to="/change-password"
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold">
                Change Password
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Update your account password.
              </p>
            </Link>


            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              className="border border-red-200 rounded-lg p-5 text-left hover:bg-red-50 transition"
            >
              <h3 className="font-semibold text-red-600">
                Logout
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Sign out from your account.
              </p>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;