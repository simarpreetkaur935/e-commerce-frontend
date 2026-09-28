import { useState } from "react";

import {
  Await,
  useLoaderData,
} from "react-router-dom";

import { Suspense } from "react";

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

        setWishlist((currentWishlist) =>
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
        setWishlist((currentWishlist) =>
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
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          My Wishlist
        </h1>

        <p className="text-gray-500">
          {wishlist.length} items
        </p>
      </div>

      {/* Empty Wishlist */}

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            Your wishlist is empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            const product = item.product;

            return (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                {/* Product Image */}

                <div className="h-56 bg-gray-100 relative">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  {/* Wishlist Button */}

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
                    className="absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-110 transition"
                  >
                    ❤️
                  </button>
                </div>

                {/* Product Details */}

                <div className="p-4">
                  {/* Brand */}

                  {product.brand && (
                    <p className="text-sm text-gray-500 mb-1">
                      {product.brand}
                    </p>
                  )}

                  {/* Name */}

                  <h2 className="text-lg font-semibold truncate">
                    {product.name}
                  </h2>

                  {/* Rating */}

                  <div className="flex items-center gap-1 mt-2">
                    <span>⭐</span>

                    <span className="text-sm">
                      {product.averageRating}
                    </span>

                    <span className="text-sm text-gray-500">
                      ({product.totalReviews})
                    </span>
                  </div>

                  {/* Price */}

                  <div className="mt-3">
                    {product.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">
                          ₹
                          {product.discountPrice.toLocaleString()}
                        </span>

                        <span className="text-sm text-gray-500 line-through">
                          ₹
                          {product.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold">
                        ₹
                        {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Stock */}

                  <p className="text-sm text-gray-500 mt-2">
                    {product.stock > 0
                      ? `${product.stock} items available`
                      : "Out of stock"}
                  </p>

                  {/* Remove Button */}

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
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {loadingProductId ===
                    product._id
                      ? "Removing..."
                      : "Remove from Wishlist"}
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
  const { wishlist } = useLoaderData() as {
    wishlist: Promise<WishlistItem[]>;
  };

  return (
    <Suspense
      fallback={
        <div className="text-center py-20">
          <p className="text-gray-500">
            Loading wishlist...
          </p>
        </div>
      }
    >
      <Await
        resolve={wishlist}
        errorElement={
          <div className="text-center py-20">
            <p className="text-red-500">
              Failed to load wishlist.
            </p>
          </div>
        }
      >
        {(loadedWishlist: WishlistItem[]) => (
          <WishlistContent
            loadedWishlist={loadedWishlist}
          />
        )}
      </Await>
    </Suspense>
  );
};

export default Wishlist;