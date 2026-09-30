import {
  Suspense,
  useState,
} from "react";

import {
  Await,
  useLoaderData,

} from "react-router-dom";
import { Link } from "react-router-dom";

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

interface CartItem {
  _id: string;
  user: string;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

// =================================================
// CART PAGE
// =================================================

const Cart = () => {
  const { cart } = useLoaderData() as {
    cart: Promise<CartItem[]>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* PAGE TITLE */}

        <div className="mb-6">

          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-1">
            Review your items before checkout
          </p>

        </div>

        {/* SUSPENSE */}

        <Suspense
          fallback={
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">

              <div className="flex flex-col items-center gap-3">

                <div className="w-8 h-8 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin" />

                <p className="text-gray-500">
                  Loading your cart...
                </p>

              </div>

            </div>
          }
        >

          {/* AWAIT */}

          <Await resolve={cart}>

            {(cartItems: CartItem[]) => (
              <CartContent
                cartItems={cartItems}
              />
            )}

          </Await>

        </Suspense>

      </div>

    </div>
  );
};

// =================================================
// CART CONTENT
// =================================================

const CartContent = ({
  cartItems,
}: {
  cartItems: CartItem[];
}) => {

  // =================================================
  // CART STATE
  // =================================================

  const [items, setItems] =
    useState<CartItem[]>(cartItems);

  // =================================================
  // LOADING STATE
  // =================================================

  const [loadingProductId, setLoadingProductId] =
    useState<string | null>(null);

  const [clearing, setClearing] =
    useState(false);

  // =================================================
  // UPDATE QUANTITY
  // =================================================

  const updateQuantity = async (
    productId: string,
    quantity: number
  ) => {

    if (quantity < 1) {
      return;
    }

    const product = items.find(
      (item) =>
        item.product._id === productId
    )?.product;

    if (!product) {
      return;
    }

    // Don't allow quantity above stock

    if (quantity > product.stock) {
      return;
    }

    try {

      setLoadingProductId(productId);

      const response = await api.patch(
        `/cart/${productId}`,
        {
          quantity,
        }
      );

      if (response.data.success) {

        // UPDATE UI WITHOUT RELOADING

        setItems((previousItems) =>
          previousItems.map((item) =>
            item.product._id ===
            productId
              ? {
                  ...item,
                  quantity,
                }
              : item
          )
        );
      }

    } catch (error: any) {

      console.error(
        "Update Cart Quantity Error:",
        error.response?.data?.message ||
          error.message
      );

    } finally {

      setLoadingProductId(null);

    }
  };

  // =================================================
  // REMOVE FROM CART
  // =================================================

  const removeFromCart = async (
    productId: string
  ) => {

    try {

      setLoadingProductId(productId);

      const response = await api.delete(
        `/cart/${productId}`
      );

      if (response.data.success) {

        // REMOVE FROM UI WITHOUT RELOADING

        setItems((previousItems) =>
          previousItems.filter(
            (item) =>
              item.product._id !==
              productId
          )
        );
      }

    } catch (error: any) {

      console.error(
        "Remove From Cart Error:",
        error.response?.data?.message ||
          error.message
      );

    } finally {

      setLoadingProductId(null);

    }
  };

  // =================================================
  // CLEAR CART
  // =================================================

  const clearCart = async () => {

    try {

      setClearing(true);

      const response =
        await api.delete("/cart");

      if (response.data.success) {

        // EMPTY UI WITHOUT RELOADING

        setItems([]);

      }

    } catch (error: any) {

      console.error(
        "Clear Cart Error:",
        error.response?.data?.message ||
          error.message
      );

    } finally {

      setClearing(false);

    }
  };

  // =================================================
  // EMPTY CART
  // =================================================

  if (items.length === 0) {

    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm py-16 px-6 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0a3 3 0 0 0-3 3h15.75m-12.75-3h9.75m0 0 1.5-5.25H5.106m12.144 5.25L18.75 6.75H4.723m12.527 7.5a3 3 0 1 0 5.996 0m-5.996 0a3 3 0 1 0-5.996 0"
            />
          </svg>

        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-6">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mt-2">
          Add some products to your
          cart to see them here.
        </p>

        <a
          href="/"
          className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition"
        >
          Continue Shopping
        </a>

      </div>
    );
  }

  // =================================================
  // TOTAL AMOUNT
  // =================================================

  const totalAmount =
    items.reduce(
      (total, item) => {

        const price =
          item.product.discountPrice ??
          item.product.price;

        return (
          total +
          price * item.quantity
        );
      },
      0
    );

  // =================================================
  // TOTAL ITEMS
  // =================================================

  const totalItems =
    items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  // =================================================
  // RETURN CART
  // =================================================

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* =================================================
          CART ITEMS
      ================================================= */}

      <div className="lg:col-span-2">

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          {/* CART HEADER */}

          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

            <div>

              <h2 className="text-xl font-semibold text-gray-900">
                Your Cart
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}
              </p>

            </div>

            <button
              type="button"
              onClick={clearCart}
              disabled={clearing}
              className="text-sm text-red-500 hover:text-red-600 font-medium disabled:opacity-50"
            >
              {clearing
                ? "Clearing..."
                : "Clear Cart"}
            </button>

          </div>

          {/* CART ITEMS */}

          {items.map(
            (item, index) => {

              const product =
                item.product;

              const price =
                product.discountPrice ??
                product.price;

              const isUpdating =
                loadingProductId ===
                product._id;

              return (
                <div
                  key={item._id}
                  className={`p-6 ${
                    index !==
                    items.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >

                  <div className="flex flex-col sm:flex-row gap-5">

                    {/* IMAGE */}

                    <div className="w-full sm:w-36 h-36 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                     <Link to={`/products/${item.product._id}`}>
                      <img
                        src={
                          product
                            .images?.[0]
                        }
                        alt={
                          product.name
                        }
                        className="w-full h-full object-contain"
                      />
                      </Link>

                    </div>

                    {/* PRODUCT DETAILS */}

                    <div className="flex-1">

                      {product.brand && (
                        <p className="text-sm text-gray-500 mb-1">
                          {
                            product.brand
                          }
                        </p>
                      )}

                      <h3 className="text-lg font-semibold text-gray-900">
                        {
                          product.name
                        }
                      </h3>

                      <p className="text-sm text-green-600 font-medium mt-2">
                        ✓ In Stock
                      </p>

                      {/* PRICE */}

                      <div className="flex items-center gap-3 mt-3">

                        <span className="text-xl font-bold text-gray-900">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        {product.discountPrice && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              ₹
                              {product.price.toLocaleString(
                                "en-IN"
                              )}
                            </span>

                            <span className="text-sm font-semibold text-green-600">
                              {Math.round(
                                ((product.price -
                                  product.discountPrice) /
                                  product.price) *
                                  100
                              )}
                              % off
                            </span>
                          </>
                        )}

                      </div>

                      {/* QUANTITY */}

                      <div className="flex items-center gap-4 mt-5">

                        <span className="text-sm font-medium text-gray-700">
                          Quantity
                        </span>

                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                          {/* MINUS */}

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                item.quantity -
                                  1
                              )
                            }
                            disabled={
                              isUpdating ||
                              item.quantity <=
                                1
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            −
                          </button>

                          {/* QUANTITY */}

                          <span className="w-10 h-9 flex items-center justify-center border-x border-gray-300 text-sm font-semibold">
                            {isUpdating
                              ? "..."
                              : item.quantity}
                          </span>

                          {/* PLUS */}

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                item.quantity +
                                  1
                              )
                            }
                            disabled={
                              isUpdating ||
                              item.quantity >=
                                product.stock
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            +
                          </button>

                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              product._id
                            )
                          }
                          disabled={
                            isUpdating
                          }
                          className="text-sm text-red-500 hover:text-red-600 font-medium disabled:opacity-50"
                        >
                          {isUpdating
                            ? "Removing..."
                            : "Remove"}
                        </button>

                      </div>

                    </div>

                    {/* ITEM TOTAL */}

                    <div className="sm:text-right">

                      <p className="text-sm text-gray-500">
                        Item Total
                      </p>

                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ₹
                        {(
                          price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

      {/* =================================================
          PRICE DETAILS
      ================================================= */}

      <div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-6 overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-900">
              Price Details
            </h2>

          </div>

          <div className="p-6">

            {/* PRICE */}

            <div className="flex justify-between text-sm mb-5">

              <span className="text-gray-600">
                Price (
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}
                )
              </span>

              <span className="font-medium text-gray-900">
                ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* DELIVERY */}

            <div className="flex justify-between text-sm mb-5">

              <span className="text-gray-600">
                Delivery
              </span>

              <span className="text-green-600 font-semibold">
                FREE
              </span>

            </div>

            <div className="border-t border-dashed border-gray-300 my-5" />

            {/* TOTAL */}

            <div className="flex justify-between items-center">

              <span className="text-lg font-semibold text-gray-900">
                Total Amount
              </span>

              <span className="text-xl font-bold text-gray-900">
                ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* BUY BUTTON */}

            <button
              type="button"
              className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition"
            >
              Proceed to Buy
            </button>

            {/* SECURE CHECKOUT */}

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-5">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 0h10.5a2.25 2.25 0 0 1 2.25 2.25v6.75a2.25 2.25 0 0 1 2.25 2.25v6.75a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25v-6.75a2.25 2.25 0 0 1 2.25-2.25Z"
                />
              </svg>

              Secure checkout

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;