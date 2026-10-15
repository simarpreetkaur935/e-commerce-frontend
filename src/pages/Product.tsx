
import { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import api from "../api/axios";

interface ProductType {
  _id: string;
  name: string;
  description: string;
  brand?: string;
  images: string[];
  price: number;
  discountPrice?: number;
  stock: number;
  averageRating: number;
  totalReviews: number;
  category?: {
    _id?: string;
    name: string;
  };
  createdAt: string;
}

interface Cursor {
  cursorCreatedAt: string;
  cursorId: string;
}

interface Pagination {
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  nextCursor: Cursor | null;
}

interface ProductsResponse {
  success: boolean;
  products: ProductType[];
  pagination: Pagination | null;
  message?: string;
}

interface LoaderData {
  products: ProductsResponse;
  search?: string;
}

const Product = () => {
  const loaderData = useLoaderData() as LoaderData;
  const location = useLocation();

  const initialData = loaderData.products;

  const search =
    new URLSearchParams(location.search).get("search")?.trim() || "";

  const isNewArrivals = location.pathname === "/new-arrivals";

  const [products, setProducts] = useState<ProductType[]>(
    initialData.products || []
  );

  const [pagination, setPagination] = useState<Pagination | null>(
    initialData.pagination
  );

  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  // Reset products when loader data changes
  useEffect(() => {
    setProducts(initialData.products || []);
    setPagination(initialData.pagination);
    setError("");
  }, [initialData]);

  // Load the next page using cursor pagination
  const handleLoadMore = async () => {
    const cursor = pagination?.nextCursor;

    if (loadingMore || !pagination?.hasNextPage || !cursor) {
      return;
    }

    try {
      setLoadingMore(true);
      setError("");

      const response = await api.get("/products", {
        params: {
          limit: 8,
          ...(search ? { search } : {}),
          ...(isNewArrivals ? { type: "new-arrivals" } : {}),
          cursorCreatedAt: cursor.cursorCreatedAt,
          cursorId: cursor.cursorId,
        },
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Unable to load more products"
        );
      }

      const newProducts: ProductType[] = response.data.products || [];

      setProducts((currentProducts) => {
        const existingIds = new Set(
          currentProducts.map((product) => product._id)
        );

        return [
          ...currentProducts,
          ...newProducts.filter(
            (product) => !existingIds.has(product._id)
          ),
        ];
      });

      setPagination(response.data.pagination);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load more products"
      );
    } finally {
      setLoadingMore(false);
    }
  };

  // Error state
  if (!initialData?.success && products.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to load products
          </h1>

          <p className="mt-2 text-gray-600">
            {initialData?.message || "Please try again later."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-gray-900 px-5 py-2 text-white hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            MyStore Collection
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {search
              ? `Search results for "${search}"`
              : isNewArrivals
                ? "New Arrivals"
                : "Explore Our Products"}
          </h1>

          <p className="mt-2 text-gray-600">
            {isNewArrivals
              ? "Discover our latest products."
              : "Discover products selected for you."}
          </p>
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              {isNewArrivals
                ? "There are no new arrivals to display right now."
                : "Try another search or explore all our products."}
            </p>

            <Link
              to="/products"
              className="mt-5 inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-white transition hover:bg-gray-700"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <>
            {/* PRODUCT COUNT */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {products.length} products
              </p>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => {
                const image = product.images?.[0];

                const hasDiscount =
                  product.discountPrice != null &&
                  product.discountPrice < product.price;

                return (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="relative flex h-60 items-center justify-center overflow-hidden bg-white">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <span className="text-sm text-gray-400">
                            No image available
                          </span>
                        </div>
                      )}

                      {hasDiscount && (
                        <span className="absolute left-3 top-3 rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
                          Sale
                        </span>
                      )}

                      {product.stock === 0 && (
                        <span className="absolute bottom-3 left-3 rounded-md bg-gray-900/90 px-2.5 py-1 text-xs font-medium text-white">
                          Out of stock
                        </span>
                      )}
                    </div>

                    {/* PRODUCT INFORMATION */}
                    <div className="p-4">
                      {product.brand && (
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          {product.brand}
                        </p>
                      )}

                      {product.category?.name && (
                        <p className="mt-1 text-xs text-gray-500">
                          {product.category.name}
                        </p>
                      )}

                      <h2 className="mt-2 line-clamp-2 min-h-12 font-semibold text-gray-900 transition group-hover:text-blue-700">
                        {product.name}
                      </h2>

                      {/* RATINGS */}
                      {product.totalReviews > 0 && (
                        <div className="mt-2 flex items-center gap-1.5 text-sm">
                          <span className="text-amber-500">★</span>

                          <span className="font-medium text-gray-700">
                            {product.averageRating.toFixed(1)}
                          </span>

                          <span className="text-gray-400">
                            ({product.totalReviews} reviews)
                          </span>
                        </div>
                      )}

                      {/* PRICING */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹
                          {(hasDiscount
                            ? product.discountPrice!
                            : product.price
                          ).toLocaleString("en-IN")}
                        </span>

                        {hasDiscount && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="mt-6 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            {/* CURSOR PAGINATION */}
            {pagination?.hasNextPage && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-lg bg-gray-900 px-8 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingMore
                    ? "Loading products..."
                    : "Load More Products"}
                </button>
              </div>
            )}

            {!pagination?.hasNextPage && products.length > 0 && (
              <p className="mt-10 text-center text-sm text-gray-500">
                You've reached the end of the products.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Product;
