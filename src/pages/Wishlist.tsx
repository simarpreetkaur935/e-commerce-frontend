import { useState, Suspense } from "react";

import {
  Await,
  useLoaderData,
  Link,
} from "react-router-dom";

import api from "../api/axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  brand?: string;
  images: string[];
  price: number;
  discountPrice?: number;
  tax?: number;
  stock: number;
  sku: string;
  lowStockThreshold: number;
  specifications: Record<string, string>;
  tags: string[];
  weight?: number;
  averageRating: number;
  totalReviews: number;
  isActive: boolean;
  isFeatured: boolean;
}

interface WishlistItem {
  _id: string;
  user?: string;
  product: Product;
  createdAt?: string;
  updatedAt?: string;
}

const WishlistContent = ({
  loadedWishlist,
}: {
  loadedWishlist: WishlistItem[];
}) => {
  const [wishlist, setWishlist] =
    useState<WishlistItem[]>(loadedWishlist);

  const [loadingProductId, setLoadingProductId] =
    useState<string | null>(null);

  const removeFromWishlist = async (
    productId: string
  ) => {
    try {
      setLoadingProductId(productId);

      const token =
        localStorage.getItem("accessToken");

      // =========================
      // GUEST USER
      // =========================

      if (!token) {
        const guestWishlist: string[] =
          JSON.parse(
            sessionStorage.getItem(
              "guestWishlist"
            ) || "[]"
          );

        const updatedWishlist =
          guestWishlist.filter(
            (id) => id !== productId
          );

        sessionStorage.setItem(
          "guestWishlist",
          JSON.stringify(updatedWishlist)
        );

        setWishlist(
          (currentWishlist) =>
            currentWishlist.filter(
              (item) =>
                item.product._id !== productId
            )
        );

        return;
      }

      // =========================
      // LOGGED-IN USER
      // =========================

      const response = await api.delete(
        `/wishlist/${productId}`
      );

      if (response.data.success) {
        setWishlist(
          (currentWishlist) =>
            currentWishlist.filter(
              (item) =>
                item.product._id !== productId
            )
        );
      }
    } catch (error: unknown) {
      console.error(
        "Remove Wishlist Error:",
        error
      );
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div className="px-6 py-8">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            My Wishlist
          </h1>

          <p className="text-gray-500 mt-1">
            Products you saved for later.
          </p>
        </div>

        <p className="text-gray-500">
          {wishlist.length} items
        </p>

      </div>

      {/* =========================
          EMPTY WISHLIST
      ========================= */}

      {wishlist.length === 0 ? (

        <div className="text-center py-20">

          <div className="
            mx-auto
            w-16
            h-16
            rounded-full
            bg-pink-50
            flex
            items-center
            justify-center
            mb-4
          ">

            {/* Heart SVG */}

            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-pink-500"
            >
              <path
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
              />
            </svg>

          </div>

          <p className="text-gray-500 text-lg">
            Your wishlist is empty.
          </p>

        </div>

      ) : (

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        ">

          {wishlist.map((item) => {

            const product = item.product;

            const discount =
              product.discountPrice &&
              product.discountPrice <
                product.price;

            const discountPercentage =
              discount
                ? Math.round(
                    ((product.price -
                      product.discountPrice!) /
                      product.price) *
                      100
                  )
                : 0;

            return (

              <div
                key={item._id}
                className="
                  group
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  overflow-hidden
                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                {/* =========================
                    PRODUCT IMAGE
                ========================= */}

                <div className="
                  h-56
                  bg-gray-100
                  relative
                  overflow-hidden
                ">

                  <Link
                    to={`/products/${product._id}`}
                  >

                    {product.images.length > 0 ? (

                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          cursor-pointer

                          transition-transform
                          duration-500

                          group-hover:scale-105
                        "
                      />

                    ) : (

                      <div className="
                        h-full
                        flex
                        items-center
                        justify-center
                        text-gray-400
                      ">
                        No Image
                      </div>

                    )}

                  </Link>

                  {/* =========================
                      DISCOUNT BADGE
                  ========================= */}

                  {discount && (

                    <span className="
                      absolute
                      top-3
                      left-3

                      bg-black
                      text-white

                      text-xs
                      font-semibold

                      px-3
                      py-1

                      rounded-full
                    ">
                      {discountPercentage}% OFF
                    </span>

                  )}

                  {/* =========================
                      DELETE ICON
                  ========================= */}

                  <div className="
                    absolute
                    top-3
                    right-3
                  ">

                    <button
                      type="button"
                      disabled={
                        loadingProductId ===
                        product._id
                      }
                      onClick={() =>
                        removeFromWishlist(
                          product._id
                        )
                      }
                      className="
                        group/delete

                        relative

                        bg-white
                        w-10
                        h-10

                        rounded-full

                        flex
                        items-center
                        justify-center

                        shadow-md

                        text-gray-500

                        transition-all
                        duration-300

                        hover:bg-red-500
                        hover:text-white
                        hover:scale-110
                      "
                    >

                      {loadingProductId ===
                      product._id ? (

                        <span className="
                          w-4
                          h-4
                          border-2
                          border-gray-300
                          border-t-red-500
                          rounded-full
                          animate-spin
                        " />

                      ) : (

                        /* Trash SVG */

                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v5" />
                          <path d="M14 11v5" />
                        </svg>

                      )}

                      {/* Tooltip */}

                      {!loadingProductId && (

                        <span className="
                          absolute
                          right-0
                          top-11

                          bg-gray-900
                          text-white

                          text-xs

                          px-2
                          py-1

                          rounded

                          whitespace-nowrap

                          opacity-0
                          invisible

                          translate-y-1

                          group-hover/delete:opacity-100
                          group-hover/delete:visible
                          group-hover/delete:translate-y-0

                          transition-all
                          duration-200

                          pointer-events-none
                        ">
                          Remove
                        </span>

                      )}

                    </button>

                  </div>

                  {/* =========================
                      HEART
                  ========================= */}

                  <div className="
                    absolute
                    bottom-3
                    left-3

                    bg-white

                    w-9
                    h-9

                    rounded-full

                    flex
                    items-center
                    justify-center

                    shadow-md

                    transition-transform
                    duration-300

                    group-hover:scale-110
                  ">

                    {/* Heart SVG */}

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#ec4899"
                      stroke="#ec4899"
                      strokeWidth="2"
                    >
                      <path
                        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
                      />
                    </svg>

                  </div>

                </div>

                {/* =========================
                    PRODUCT DETAILS
                ========================= */}

                <div className="p-4">

                  {/* Brand */}

                  {product.brand && (

                    <p className="
                      text-sm
                      text-gray-500
                      mb-1
                    ">
                      {product.brand}
                    </p>

                  )}

                  {/* Name */}

                  <h2 className="
                    text-lg
                    font-semibold
                    truncate
                  ">
                    {product.name}
                  </h2>

                  {/* Rating */}

                  <div className="
                    flex
                    items-center
                    gap-1
                    mt-2
                  ">

                    <span className="text-yellow-500">
                      ⭐
                    </span>

                    <span className="text-sm">
                      {product.averageRating}
                    </span>

                    <span className="
                      text-sm
                      text-gray-500
                    ">
                      ({product.totalReviews})
                    </span>

                  </div>

                  {/* Price */}

                  <div className="mt-3">

                    {discount ? (

                      <div className="
                        flex
                        items-center
                        gap-2
                      ">

                        <span className="
                          text-xl
                          font-bold
                        ">
                          ₹
                          {product.discountPrice!.toLocaleString()}
                        </span>

                        <span className="
                          text-sm
                          text-gray-500
                          line-through
                        ">
                          ₹
                          {product.price.toLocaleString()}
                        </span>

                      </div>

                    ) : (

                      <span className="
                        text-xl
                        font-bold
                      ">
                        ₹
                        {product.price.toLocaleString()}
                      </span>

                    )}

                  </div>

                  {/* Stock */}

                  <p className="
                    text-sm
                    mt-2

                    text-gray-500
                  ">
                    {product.stock > 0
                      ? `${product.stock} items available`
                      : "Out of stock"}
                  </p>

                  {/* =========================
                      ADD TO CART
                  ========================= */}

                  <button
                    type="button"
                    disabled={
                      product.stock === 0
                    }
                    className="
                      w-full
                      mt-4

                      bg-black
                      text-white

                      py-2.5

                      rounded-lg

                      font-medium

                      flex
                      items-center
                      justify-center
                      gap-2

                      transition-all
                      duration-300

                      hover:bg-gray-800
                      hover:-translate-y-0.5
                      hover:shadow-lg

                      disabled:bg-gray-300
                      disabled:cursor-not-allowed
                    "
                  >

                    {/* Shopping bag SVG */}

                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8h12l1 13H5L6 8Z" />
                      <path d="M9 8a3 3 0 0 1 6 0" />
                    </svg>

                    Add to Cart

                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

const Wishlist = () => {

  const { wishlist } =
    useLoaderData() as {
      wishlist: Promise<WishlistItem[]>;
    };

  return (

    <Suspense
      fallback={
        <div className="
          text-center
          py-20
        ">
          <p className="text-gray-500">
            Loading wishlist...
          </p>
        </div>
      }
    >

      <Await
        resolve={wishlist}
        errorElement={
          <div className="
            text-center
            py-20
          ">
            <p className="text-red-500">
              Failed to load wishlist.
            </p>
          </div>
        }
      >

        {(loadedWishlist: WishlistItem[]) => (

          <WishlistContent
            loadedWishlist={
              loadedWishlist
            }
          />

        )}

      </Await>

    </Suspense>
  );
};

export default Wishlist;