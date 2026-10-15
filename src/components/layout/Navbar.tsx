import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  UserRound,
  Package,
  Heart,
  ShoppingCart,
  Settings,
  LockKeyhole,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react";

import api from "../../api/axios";

type ProductSuggestion = {
  _id: string;
  name: string;
  price?: number;
  image?: string;
  images?: string[];
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken"),
  );

  const [profile, setProfile] = useState<{
    name: string;
    avatar?: string;
  } | null>(null);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // CHECK LOGIN STATUS
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // KEEP SEARCH INPUT IN SYNC WITH URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") ?? "");
  }, [location.search]);

  // GET LOGGED-IN USER
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
      .catch((error: unknown) => {
        console.error("Get Navbar Profile Error:", error);
      });
  }, [isLoggedIn]);

  // LIVE PRODUCT SEARCH
  useEffect(() => {
    const search = searchTerm.trim();

    if (!search) {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoadingSuggestions(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setLoadingSuggestions(true);

        const response = await api.get("/products", {
          params: {
            search,
            limit: 5,
          },
        });

        if (cancelled) return;

        const data = response.data;

        const products: ProductSuggestion[] = Array.isArray(data)
          ? data
          : (data.products ?? data.data?.products ?? []);

        setSuggestions(products.slice(0, 5));
        setShowSuggestions(true);
      } catch (error: unknown) {
        if (!cancelled) {
          console.error("Live Product Search Error:", error);
          setSuggestions([]);
          setShowSuggestions(true);
        }
      } finally {
        if (!cancelled) {
          setLoadingSuggestions(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error: unknown) {
      console.error("Logout Error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      setProfileDropdownOpen(false);
      setIsLoggedIn(false);
      setProfile(null);
      navigate("/login");
    }
  };

  const closeProfileDropdown = () => {
    setProfileDropdownOpen(false);
  };

  // SEARCH ALL MATCHING PRODUCTS
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = searchTerm.trim();
    setShowSuggestions(false);

    if (!search) {
      navigate("/");
      return;
    }

    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  // OPEN SELECTED PRODUCT
  const handleSuggestionClick = (productId: string) => {
    setShowSuggestions(false);
    navigate(`/products/${productId}`);
  };

  // CLEAR SEARCH
  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    navigate("/");
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav className="relative z-50 bg-gray-900 px-6 py-3 text-white">
        <div className="flex items-center gap-6">
          {/* LOGO */}
          <Link
            to="/"
            className="shrink-0 text-2xl font-bold transition hover:text-gray-300"
          >
            MyStore
          </Link>

          {/* HOME */}
          <Link to="/" className="shrink-0 transition hover:text-gray-300">
            Home
          </Link>

          {/* CATEGORIES */}
          <Link
            to="/categories"
            className="shrink-0 transition hover:text-gray-300"
          >
            Categories
          </Link>

          {/* SEARCH WITH LIVE SUGGESTIONS */}
          <div className="flex flex-1 justify-end">
            <form onSubmit={handleSearch} role="search" className="relative">
              <div className="group relative flex items-center">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => {
                    if (searchTerm.trim()) {
                      setShowSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    // Allow a suggestion click before closing.
                    setTimeout(() => setShowSuggestions(false), 150);
                  }}
                  placeholder="Search products..."
                  aria-label="Search products"
                  autoComplete="off"
                  className="h-10 w-10 cursor-pointer rounded-lg border border-gray-700 bg-gray-800 pl-3 pr-10 text-white opacity-80 outline-none transition-all duration-300 placeholder:text-gray-400 group-hover:w-52 group-hover:cursor-text group-hover:opacity-100 group-hover:pl-4 focus:w-52 focus:cursor-text focus:opacity-100 focus:pl-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 md:group-hover:w-64 md:focus:w-64"
                />

                {searchTerm && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClearSearch}
                    className="absolute right-10 flex h-10 w-6 items-center justify-center text-gray-400 hover:text-white"
                  >
                    <X size={15} />
                  </button>
                )}

                <button
                  type="submit"
                  aria-label="Submit product search"
                  title="Search"
                  className="absolute right-0 flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition hover:bg-gray-700 hover:text-white"
                >
                  <Search size={20} />
                </button>
              </div>

              {/* SUGGESTIONS DROPDOWN */}
              {showSuggestions && searchTerm.trim() && (
                <div className="absolute right-0 top-full z-[100] mt-2 max-h-96 w-72 overflow-y-auto rounded-xl border border-gray-200 bg-white text-gray-900 shadow-xl md:w-80">
                  {loadingSuggestions ? (
                    <div className="px-4 py-4 text-sm text-gray-500">
                      Searching products...
                    </div>
                  ) : suggestions.length > 0 ? (
                    <>
                      <p className="border-b border-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Suggested products
                      </p>

                      {suggestions.map((product) => {
                        const image = product.images?.[0] || product.image;

                        return (
                          <button
                            key={product._id}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSuggestionClick(product._id)}
                            className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-100"
                          >
                            {image ? (
                              <img
                                src={image}
                                alt={product.name}
                                className="h-10 w-10 shrink-0 rounded-md object-cover"
                              />
                            ) : (
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-100">
                                <Search size={17} className="text-gray-400" />
                              </span>
                            )}

                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium">
                                {product.name}
                              </span>

                              {typeof product.price === "number" && (
                                <span className="mt-1 block text-xs text-gray-500">
                                  ₹{product.price.toLocaleString("en-IN")}
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          const search = searchTerm.trim();
                          setShowSuggestions(false);

                          if (search) {
                            navigate(`/?search=${encodeURIComponent(search)}`);
                          }
                        }}
                        className="w-full cursor-pointer  bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-blue-600 hover:bg-gray-100"
                      >
                        See all results for "{searchTerm.trim()}"
                      </button>
                    </>
                  ) : (
                    <p className="px-4 py-4 text-sm text-gray-500">
                      No matching products found.
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* PROFILE DROPDOWN */}
          {isLoggedIn ? (
            <div className="relative shrink-0">
              <button
                type="button"
                title="My Account"
                aria-label="Open profile menu"
                aria-expanded={profileDropdownOpen}
                onClick={() => setProfileDropdownOpen((open) => !open)}
                className={`flex h-11 items-center justify-center gap-1 rounded-full transition ${
                  profileDropdownOpen
                    ? "ring-2 ring-white/70"
                    : "hover:scale-105"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-600 bg-gray-100 transition hover:border-white">
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-gray-700">
                      {profile?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>

                <ChevronDown
                  size={14}
                  className={`text-gray-300 transition-transform ${
                    profileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DROPDOWN MENU */}
              {profileDropdownOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    onClick={closeProfileDropdown}
                    className="fixed inset-0 z-40 cursor-default"
                  />

                  <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 text-gray-700 shadow-xl ring-1 ring-black/5">
                    {/* MENU HEADER */}
                    <div className="border-b border-gray-100 bg-gray-50 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
                          {profile?.avatar ? (
                            <img
                              src={profile.avatar}
                              alt={profile.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-semibold text-gray-700">
                              {profile?.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {profile?.name || "My Account"}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            Manage your account
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ACCOUNT LINKS */}
                    <div className="px-2 py-2">
                      <Link
                        to="/profile"
                        onClick={closeProfileDropdown}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-950"
                      >
                        <UserRound
                          size={18}
                          className="shrink-0 text-gray-500"
                        />
                        <span>Personal Information</span>
                      </Link>

                      <Link
                        to="/orders"
                        onClick={closeProfileDropdown}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-950"
                      >
                        <Package size={18} className="shrink-0 text-gray-500" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={closeProfileDropdown}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-950"
                      >
                        <Heart size={18} className="shrink-0 text-gray-500" />
                        <span>My Wishlist</span>
                      </Link>

                      <Link
                        to="/cart"
                        onClick={closeProfileDropdown}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-950"
                      >
                        <ShoppingCart
                          size={18}
                          className="shrink-0 text-gray-500"
                        />
                        <span>My Cart</span>
                      </Link>
                    </div>

                    {/* ACCOUNT SETTINGS */}
                    <div className="border-t border-gray-100 px-2 py-2">
                      <Link
                        to="/profile/edit"
                        onClick={closeProfileDropdown}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-950"
                      >
                        <Settings
                          size={18}
                          className="shrink-0 text-gray-500"
                        />
                        <span>Account Settings</span>
                      </Link>

                      <Link
                        to="/change-password"
                        onClick={closeProfileDropdown}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-950"
                      >
                        <LockKeyhole
                          size={18}
                          className="shrink-0 text-gray-500"
                        />
                        <span>Change Password</span>
                      </Link>
                    </div>

                    {/* SIGN OUT */}
                    <div className="border-t border-gray-100 px-3 py-3">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 rounded-xl border border-transparent bg-gray-50 px-3 py-3 text-left transition-all duration-200 hover:border-gray-200 hover:bg-gray-100 hover:shadow-sm"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 transition-all duration-200 group-hover:bg-gray-800 group-hover:text-white group-hover:ring-gray-800">
                          <LogOut size={18} />
                        </span>

                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-gray-800">
                            Sign out
                          </span>
                          <span className="mt-0.5 block text-xs text-gray-500">
                            Sign out of your account
                          </span>
                        </span>

                        <ChevronDown
                          size={15}
                          className="-rotate-90 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700"
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="shrink-0 transition hover:text-gray-300"
            >
              Login
            </Link>
          )}

          {/* WISHLIST ICON */}
          <Link
            to="/wishlist"
            title="Wishlist"
            className="group flex shrink-0 items-center justify-center transition hover:scale-110"
          >
            <Heart
              size={23}
              strokeWidth={2}
              className="transition group-hover:text-pink-400"
            />
          </Link>

          {/* CART ICON */}
          <Link
            to="/cart"
            title="Cart"
            className="group flex shrink-0 items-center justify-center transition hover:scale-110"
          >
            <ShoppingCart
              size={23}
              strokeWidth={2}
              className="transition group-hover:text-yellow-400"
            />
          </Link>
        </div>
      </nav>

      {/* SECONDARY NAVBAR */}
    {/* SECONDARY NAVBAR */}
<div className="relative z-10 bg-gray-800 px-6 py-2 text-white">
  <div className="flex gap-6 overflow-x-auto whitespace-nowrap text-sm">
    <Link to="/" className="transition hover:text-gray-300">
      Home
    </Link>

    <Link to="/products" className="transition hover:text-gray-300">
      All Products
    </Link>

    <Link
  to="/products?type=new-arrivals"
  className="transition hover:text-gray-300"
>
  New Arrivals
</Link>

    <Link to="/best-sellers" className="transition hover:text-gray-300">
      Best Sellers
    </Link>

    <Link to="/todays-deals"className="transition hover:text-gray-300">
      Today's Deals
    </Link>

    <Link to="/?offersOnly=true" className="transition hover:text-gray-300">
      Offers
    </Link>
  </div>
</div>
    </>
  );
};

export default Navbar;
