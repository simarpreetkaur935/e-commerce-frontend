
import { Suspense, useEffect, useState } from "react";
import {
  Await,
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  brand?: string;
  category: string;
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
  count: number;
  products: Product[];
  pagination: Pagination;
}

const LIMIT = 8;

const Home = () => {
  const { products } = useLoaderData() as {
    products: Promise<ProductsResponse>;
  };

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.trim() ?? "";

  const [currentPage, setCurrentPage] = useState(1);

  const [pageData, setPageData] = useState<
    Record<number, ProductsResponse>
  >({});

  // Cursor needed to fetch each page.
  const [pageCursors, setPageCursors] = useState<
    Record<number, Cursor | null>
  >({ 1: null });

  const [loadingPage, setLoadingPage] = useState(false);

  // Reset pagination when the search changes.
  useEffect(() => {
    setCurrentPage(1);
    setPageData({});
    setPageCursors({ 1: null });
  }, [location.search]);

  // ADD TO CART
  const addToCart = async (product: Product) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.info("You need to login to add products to your cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.post(`/cart/${product._id}`, {
        quantity: 1,
      });

      if (response.data.success) {
        toast.success("Product moved to cart");
        navigate("/cart");
      }
    } catch (error: any) {
      console.error(
        "Add To Cart Error:",
        error.response?.data?.message || error.message,
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to add product to cart",
      );
    }
  };

  return (
    <div className="px-6 py-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-gray-500">
              Loading products...
            </p>
          </div>
        }
      >
        <Await
          resolve={products}
          errorElement={
            <div className="text-center py-20">
              <p className="text-red-500">
                Failed to load products. Check the backend terminal.
              </p>
            </div>
          }
        >
          {(productsData: ProductsResponse) => {
            const visibleData =
              currentPage === 1
                ? productsData
                : pageData[currentPage];

            const displayedProducts =
              visibleData?.products ?? [];

            const hasNextPage =
              visibleData?.pagination?.hasNextPage ?? false;

            // FETCH A PAGE USING CURSOR PAGINATION
            const changePage = async (targetPage: number) => {
              if (
                targetPage < 1 ||
                targetPage === currentPage ||
                loadingPage
              ) {
                return;
              }

              // Page 1 is already loaded.
              if (targetPage === 1) {
                setCurrentPage(1);
                return;
              }

              // Use cached data if this page was already loaded.
              if (pageData[targetPage]) {
                setCurrentPage(targetPage);
                return;
              }

              /*
               * Page 2 uses page 1's nextCursor.
               * Later pages use the cursor saved from the
               * previous page's response.
               */
              const cursor =
                pageCursors[targetPage] ??
                (targetPage === 2
                  ? productsData.pagination.nextCursor
                  : null);

              if (!cursor) {
                return;
              }

              try {
                setLoadingPage(true);

                const response = await api.get("/products", {
                  params: {
                    limit: LIMIT,
                    ...(searchTerm
                      ? { search: searchTerm }
                      : {}),
                    cursorCreatedAt: cursor.cursorCreatedAt,
                    cursorId: cursor.cursorId,
                  },
                });

                if (!response.data.success) {
                  throw new Error(
                    response.data.message ||
                      "Unable to fetch products",
                  );
                }

                const nextData =
                  response.data as ProductsResponse;

                // Cache this page's products.
                setPageData((previous) => ({
                  ...previous,
                  [targetPage]: nextData,
                }));

                // Store the cursor needed for the next page.
                setPageCursors((previous) => ({
                  ...previous,
                  [targetPage + 1]:
                    nextData.pagination.nextCursor,
                }));

                setCurrentPage(targetPage);
              } catch (error: any) {
                console.error(
                  "Pagination Error:",
                  error.response?.data?.message ||
                    error.message,
                );

                toast.error(
                  error.response?.data?.message ||
                    error.message ||
                    "Unable to load products",
                );
              } finally {
                setLoadingPage(false);
              }
            };

            /*
             * Display 1, 2, 3 initially.
             * As the user moves forward, keep the first page
             * and show the current page and the next page.
             */
          const pageNumbers = [
  ...new Set([
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]),
].filter((page) => page >= 1);

            const canOpenPage = (page: number) => {
              if (page === 1) return true;

              if (pageData[page]) return true;

              if (pageCursors[page]) return true;

              // Page 2 can use page 1's loader cursor.
              if (
                page === 2 &&
                productsData.pagination.nextCursor
              ) {
                return true;
              }

              return false;
            };

            return (
              <section>
                <h2 className="text-2xl font-bold mb-6">
                  {searchTerm
                    ? `Search results for "${searchTerm}"`
                    : "Explore Our Products"}
                </h2>

                {loadingPage && (
                  <p className="text-center text-gray-500 mb-4">
                    Loading products...
                  </p>
                )}

                {/* PRODUCT GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
                    >
                      <div className="h-56 bg-gray-100 flex items-center justify-center">
                        {product.images?.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400">
                            No Image
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        {product.brand && (
                          <p className="text-sm text-gray-500 mb-1">
                            {product.brand}
                          </p>
                        )}

                        <h3 className="text-lg font-semibold truncate">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 mt-2">
                          <span>⭐</span>
                          <span className="text-sm">
                            {product.averageRating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({product.totalReviews})
                          </span>
                        </div>

                        <div className="mt-3">
                          {product.discountPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold">
                                ₹{product.discountPrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold">
                              ₹{product.price}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          {product.stock > 0
                            ? `${product.stock} items available`
                            : "Out of stock"}
                        </p>

                        <div className="flex gap-2 mt-4">
                          <Link
                            to={`/products/${product._id}`}
                            className="flex-1 text-center border border-gray-300 hover:bg-gray-100 py-2 rounded-md font-medium"
                          >
                            View Details
                          </Link>

                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-black py-3 rounded-md font-semibold transition"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {displayedProducts.length === 0 &&
                  !loadingPage && (
                    <p className="text-center text-gray-500 py-10">
                      No products found.
                    </p>
                  )}

                {/* CURSOR PAGINATION */}
                <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                  <button
                    type="button"
                    disabled={currentPage === 1 || loadingPage}
                    onClick={() => changePage(currentPage - 1)}
                    className="px-4 py-2 border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      disabled={
                        !canOpenPage(page) || loadingPage
                      }
                      onClick={() => changePage(page)}
                      className={`px-4 py-2 border rounded-md disabled:opacity-40 disabled:cursor-not-allowed ${
                        currentPage === page
                          ? "bg-yellow-400 border-yellow-400 font-bold"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {hasNextPage && (
                    <span className="px-2 py-2 text-gray-600">
                      ...
                    </span>
                  )}

                  <button
                    type="button"
                    disabled={!hasNextPage || loadingPage}
                    onClick={() => changePage(currentPage + 1)}
                    className="px-4 py-2 border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              </section>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;