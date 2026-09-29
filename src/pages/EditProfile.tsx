import { useState } from "react";
import type { FormEvent } from "react";

import {
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

const EditProfile = () => {
  const profile = useLoaderData() as Profile;

  const navigate = useNavigate();

  // =========================
  // FORM STATES
  // =========================

  const [name, setName] = useState(
    profile.name || ""
  );

  const [phone, setPhone] = useState(
    profile.phone || ""
  );

  const [country, setCountry] = useState(
    profile.address?.country || ""
  );

  const [avatar, setAvatar] = useState(
    profile.avatar || ""
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // =========================
  // UPDATE PROFILE
  // =========================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.put(
        "/users/me",
        {
          name,
          phone,
          avatar,
          address: {
            country,
          },
        }
      );

      if (response.data.success) {
        navigate("/profile");
      }
    } catch (error: any) {
      console.error(
        "Update Profile Error:",
        error.response?.data?.message ||
          error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">

      <div className="max-w-3xl mx-auto">

        {/* =========================
            HEADER
        ========================= */}

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">

          <h1 className="text-2xl font-bold">
            Edit Profile
          </h1>

          <p className="text-gray-500 mt-1">
            Update your personal information.
          </p>

        </div>


        {/* =========================
            FORM
        ========================= */}

        <div className="bg-white rounded-lg border border-gray-200 p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}

            <div>

              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />

            </div>


            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
              />

              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed.
              </p>

            </div>


            {/* PHONE */}

            <div>

              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone
              </label>

              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />

            </div>


            {/* COUNTRY */}

            <div>

              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Country
              </label>

              <input
                id="country"
                type="text"
                value={country}
                onChange={(event) =>
                  setCountry(event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your country"
              />

            </div>


            {/* AVATAR */}

            <div>

              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Profile Image URL
              </label>

              <input
                id="avatar"
                type="text"
                value={avatar}
                onChange={(event) =>
                  setAvatar(event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
              />

            </div>


            {/* ERROR */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3">
                {error}
              </div>
            )}


            {/* BUTTONS */}

            <div className="flex gap-4 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : "Save Changes"}
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

export default EditProfile;