
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import type { Profile as ProfileType } from "../interfaces/profile.type";


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
  const [location, setLocation] = useState("Detecting location...");

  // =========================
  // CURRENT LOCATION
  // =========================

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Location is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );

          if (!response.ok) {
            throw new Error("Unable to get location");
          }

          const data = await response.json();

          const city = data.city || data.locality || "";
          const state = data.principalSubdivision || "";
          const country = data.countryName || "";

          const locationText = [city, state, country]
            .filter(Boolean)
            .join(", ");

          setLocation(locationText || "Location not available");
        } catch (error) {
          console.error("Location Error:", error);
          setLocation("Unable to detect location");
        }
      },
      (error) => {
        console.error("Geolocation Error:", error);

        if (error.code === error.PERMISSION_DENIED) {
          setLocation("Location permission denied");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocation("Location unavailable");
        } else if (error.code === error.TIMEOUT) {
          setLocation("Location request timed out");
        } else {
          setLocation("Unable to detect location");
        }
      },
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* PROFILE HEADER */}

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-semibold text-gray-500">
                  {profile.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {profile.name}
              </h1>
              <p className="mt-1 text-gray-500">
                {profile.email}
              </p>
            </div>
          </div>
        </div>

        {/* PERSONAL INFORMATION */}

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View your personal details.
              </p>
            </div>

            <Link
              to="/profile/edit"
              className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-gray-900 transition hover:bg-yellow-500"
            >
              Edit Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="mt-1 font-medium">{profile.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 font-medium">{profile.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="mt-1 font-medium">
                {profile.phone || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="mt-1 font-medium">
                {profile.address?.country || "Not provided"}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Current Location</p>
              <p className="mt-1 font-medium">📍 {location}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
