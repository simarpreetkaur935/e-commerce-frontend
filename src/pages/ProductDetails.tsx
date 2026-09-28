import {
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  Await,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

import { toast } from "react-toastify";

import RelatedProducts from "../components/layout/RelatedProducts";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  brand?: string;
  category: Category;
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
  user: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

const ProductDetails = () => {
  const { product, relatedProducts } =
    useLoaderData() as {
      product: Promise<Product>;
      relatedProducts: Promise<Product[]>;
    };

  return (
    <div className="bg-white min-h-screen">

      {/* =================================================
          PRODUCT LOADING
      ================================================= */}

      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500">
              Loading product...
            </p>
          </div>
        }
      >
        <Await
          resolve={product}
          errorElement={
            <div className="text-center py-20">
              <p className="text-red-500">
                Failed to load product.
              </p>
            </div>
          }
        >
          {(productData) => (
            <ProductContent
              product={productData}
              relatedProducts={relatedProducts}
            />
          )}
        </Await>
      </Suspense>

    </div>
  );
};

interface ProductContentProps {
  product: Product;
  relatedProducts: Promise<Product[]>;
}

const ProductContent = ({
  product,
  relatedProducts,
}: ProductContentProps) => {

  // Navigate to another page
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] =
    useState(
      product.images?.[0] || ""
    );

  const [quantity, setQuantity] =
    useState(1);

  // Wishlist state
  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);

  // =================================================
  // CHECK WISHLIST
  // =================================================

  useEffect(() => {
    const checkWishlist = async () => {
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

        const exists =
          guestWishlist.includes(
            product._id
          );

        setIsWishlisted(exists);

        return;
      }

      // =========================
      // LOGGED-IN USER
      // =========================

      try {
        const response =
          await api.get("/wishlist");

        if (response.data.success) {
          const wishlist =
            response.data.wishlist as WishlistItem[];

          const exists = wishlist.some(
            (item) =>
              item.product._id ===
              product._id
          );

          setIsWishlisted(exists);
        }
      } catch (error: unknown) {
        console.error(
          "Check Wishlist Error:",
          error
        );
      }
    };

    checkWishlist();
  }, [product._id]);

  // =================================================
  // ADD / REMOVE WISHLIST
  // =================================================

  const toggleWishlist = async () => {
    try {
      setWishlistLoading(true);

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

        if (isWishlisted) {
          // Remove product

          const updatedWishlist =
            guestWishlist.filter(
              (id) =>
                id !== product._id
            );

          sessionStorage.setItem(
            "guestWishlist",
            JSON.stringify(
              updatedWishlist
            )
          );

          setIsWishlisted(false);

        } else {
          // Add product

          if (
            !guestWishlist.includes(
              product._id
            )
          ) {
            guestWishlist.push(
              product._id
            );
          }

          sessionStorage.setItem(
            "guestWishlist",
            JSON.stringify(
              guestWishlist
            )
          );

          setIsWishlisted(true);
        }

        return;
      }

      // =========================
      // LOGGED-IN USER
      // =========================

      if (isWishlisted) {
        const response =
          await api.delete(
            `/wishlist/${product._id}`
          );

        if (response.data.success) {
          setIsWishlisted(false);
        }

      } else {
        const response =
          await api.post(
            `/wishlist/${product._id}`
          );

        if (response.data.success) {
          setIsWishlisted(true);
        }
      }

    } catch (error: unknown) {
      console.error(
        "Wishlist Error:",
        error
      );

    } finally {
      setWishlistLoading(false);
    }
  };

  // =================================================
  // ADD TO CART
  // =================================================

  const addToCart = async () => {
    const token =
      localStorage.getItem("accessToken");

    // User is not logged in
    if (!token) {
      toast.info(
        "You need to login to add products to your cart."
      );

      navigate("/login");

      return;
    }

    try {
      const response =
        await api.post(
          `/cart/${product._id}`,
          {
            quantity,
          }
        );

      if (response.data.success) {
        toast.success(
          "Product moved to cart"
        );

        navigate("/cart");
      }

    } catch (error: any) {
      console.error(
        "Add To Cart Error:",
        error.response?.data?.message ||
          error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to add product to cart"
      );
    }
  };

  // =================================================
  // DISCOUNT
  // =================================================

  const discountPercentage =
    product.discountPrice &&
    product.price
      ? Math.round(
          ((product.price -
            product.discountPrice) /
            product.price) *
            100
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">

        <Link
          to="/"
          className="hover:text-black"
        >
          Home
        </Link>

        <span>›</span>

        <Link
          to="/products"
          className="hover:text-black"
        >
          Products
        </Link>

        <span>›</span>

        <span className="text-gray-800 truncate">
          {product.name}
        </span>

      </div>

      {/* =================================================
          MAIN PRODUCT SECTION
      ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* =================================================
            PRODUCT IMAGES
        ================================================= */}

        <div>

          {/* Main Image */}

          <div className="h-[520px] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">

            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">
                No Image
              </span>
            )}

          </div>

          {/* Thumbnail Images */}

          {product.images?.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">

              {product.images.map(
                (image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        image
                      )
                    }
                    className={`w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 ${
                      selectedImage === image
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${
                        index + 1
                      }`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              )}

            </div>
          )}

        </div>

        {/* =================================================
            PRODUCT INFORMATION
        ================================================= */}

        <div>

          {/* Brand */}

          {product.brand && (
            <p className="text-sm text-gray-500 mb-2">
              {product.brand}
            </p>
          )}

          {/* Product Name + Wishlist */}

          <div className="flex items-start justify-between gap-4">

            <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Wishlist Button */}

            <button
              type="button"
              onClick={toggleWishlist}
              disabled={wishlistLoading}
              className="shrink-0 w-11 h-11 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
              aria-label={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              title={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >

              {isWishlisted ? (
                <span className="text-xl">
                  ❤️
                </span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}

            </button>

          </div>

          {/* Rating */}

          <div className="flex items-center gap-3 mt-4">

            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">

              <span>
                {product.averageRating}
              </span>

              <span>★</span>

            </div>

            <span className="text-gray-500 text-sm">
              {product.totalReviews.toLocaleString()}{" "}
              ratings
            </span>

          </div>

          <hr className="my-5" />

          {/* Price */}

          <div>

            {product.discountPrice ? (

              <div className="flex items-center gap-3">

                <span className="text-3xl font-bold">
                  ₹
                  {product.discountPrice.toLocaleString()}
                </span>

                <span className="text-gray-500 line-through">
                  ₹
                  {product.price.toLocaleString()}
                </span>

                <span className="text-green-600 font-semibold">
                  {discountPercentage}% off
                </span>

              </div>

            ) : (

              <span className="text-3xl font-bold">
                ₹
                {product.price.toLocaleString()}
              </span>

            )}

          </div>

          {/* Tax */}

          {product.tax !== undefined && (
            <p className="text-sm text-gray-500 mt-2">
              + applicable taxes
            </p>
          )}

          {/* Description */}

          <div className="mt-7">

            <h2 className="font-semibold text-lg mb-2">
              About this product
            </h2>

            <p className="text-gray-600 leading-7">
              {product.description}
            </p>

          </div>

          {/* Stock */}

          <div className="mt-6">

            {product.stock > 0 ? (

              <p className="text-green-600 font-semibold">
                ✓ In Stock
              </p>

            ) : (

              <p className="text-red-500 font-semibold">
                Out of Stock
              </p>

            )}

          </div>

          {/* Quantity */}

          {product.stock > 0 && (

            <div className="flex items-center gap-4 mt-6">

              <span className="font-medium">
                Quantity:
              </span>

              <div className="flex items-center border border-gray-300 rounded-md">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(1, q - 1)
                    )
                  }
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>

                <span className="px-5 py-2 border-x border-gray-300">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(
                        product.stock,
                        q + 1
                      )
                    )
                  }
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>

              </div>

            </div>

          )}

          {/* Buttons */}

          <div className="flex gap-4 mt-8">

            <button
              type="button"
              onClick={addToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-black py-3 rounded-md font-semibold transition"
            >
              Add to Cart
            </button>

            <button
              type="button"
              disabled={product.stock === 0}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-md font-semibold transition"
            >
              Buy Now
            </button>

          </div>

          {/* Product Information */}

          <div className="mt-8 border border-gray-200 rounded-lg">

            <div className="px-5 py-4 border-b border-gray-200">

              <span className="font-semibold">
                SKU
              </span>

              <span className="ml-4 text-gray-600">
                {product.sku}
              </span>

            </div>

            {product.weight && (

              <div className="px-5 py-4 border-b border-gray-200">

                <span className="font-semibold">
                  Weight
                </span>

                <span className="ml-4 text-gray-600">
                  {product.weight}
                </span>

              </div>

            )}

            <div className="px-5 py-4">

              <span className="font-semibold">
                Category
              </span>

              <span className="ml-4 text-gray-600">
                {product.category?.name}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          PRODUCT SPECIFICATIONS
      ================================================= */}

      <div className="mt-16">

        <h2 className="text-2xl font-bold mb-6">
          Product Details
        </h2>

        <div className="border border-gray-200 rounded-lg">

          {Object.entries(
            product.specifications || {}
          ).map(([key, value]) => (

            <div
              key={key}
              className="grid grid-cols-2 border-b last:border-b-0 border-gray-200"
            >

              <div className="bg-gray-50 px-5 py-4 font-medium capitalize">
                {key}
              </div>

              <div className="px-5 py-4 text-gray-600">
                {value}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =================================================
          TAGS
      ================================================= */}

      {product.tags?.length > 0 && (

        <div className="mt-8">

          <h2 className="text-xl font-bold mb-4">
            Tags
          </h2>

          <div className="flex flex-wrap gap-2">

            {product.tags.map(
              (tag, index) => (

                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600"
                >
                  #{tag}
                </span>

              )
            )}

          </div>

        </div>

      )}

      {/* =================================================
          RELATED PRODUCTS
      ================================================= */}

      <Suspense
        fallback={
          <div className="mt-16 py-10 text-center text-gray-500">
            Loading related products...
          </div>
        }
      >

        <Await
          resolve={relatedProducts}
          errorElement={
            <div className="mt-16 py-10 text-center">

              <p className="text-red-500">
                Failed to load related products.
              </p>

            </div>
          }
        >

          {(products) => (
            <RelatedProducts
              products={products}
            />
          )}

        </Await>

      </Suspense>

    </div>
  );
};

export default ProductDetails;