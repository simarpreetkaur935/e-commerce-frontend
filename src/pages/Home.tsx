
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
import RelatedProducts from "../components/layout/RelatedProducts";

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

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

interface Cursor {
  cursorCreatedAt: string;
  cursorId: string;
  cursorPrice?: number;
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
  const {
    products,
    categories,
    newArrivals,
    bestSellers,
    todaysDeals,
    offers,
  } = useLoaderData() as {
    products: Promise<ProductsResponse>;
    categories: Category[];
    newArrivals: Product[];
    bestSellers: Product[];
    todaysDeals: Product[];
    offers: Product[];
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
  const addToCart = async (product: Pick<Product, "_id">) => {
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
            if (!searchTerm) {
              return (
                <main className="mx-auto max-w-7xl">
                  <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-amber-900 px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
                    <div className="relative z-10 max-w-2xl">
                      <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                        The season’s best finds
                      </span>
                      <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        Good things are just a click away.
                      </h1>
                      <p className="mt-4 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
                        Discover new favorites, shop customer-loved picks, and enjoy special prices across the store.
                      </p>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                          to="/products"
                          className="rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-950 transition hover:bg-yellow-300"
                        >
                          Shop all products
                        </Link>
                        <Link
                          to="/products?type=offers"
                          className="rounded-md border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                          Explore offers
                        </Link>
                      </div>
                    </div>
                    <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl sm:right-0 sm:top-0" />
                    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-8 hidden text-[180px] leading-none text-white/10 lg:block">✦</div>
                    <p aria-hidden="true" className="absolute bottom-8 right-12 hidden max-w-48 text-right text-sm font-medium uppercase tracking-[0.2em] text-white/60 lg:block">
                      Find something<br />you’ll love
                    </p>
                  </section>

                  <section className="mt-14">
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Find your kind of thing</p>
                        <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">Shop by Categories</h2>
                      </div>
                      <Link to="/categories" className="shrink-0 font-medium text-gray-700 hover:text-black hover:underline">
                        View All Categories <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                    {categories.length ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {categories.slice(0, 8).map((category) => (
                          <Link
                            key={category._id}
                            to={`/categories/${category._id}`}
                            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                          >
                            <div className="flex h-32 items-center justify-center overflow-hidden bg-gray-100 sm:h-40">
                              {category.image ? (
                                <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                              ) : (
                                <span className="text-4xl font-bold text-gray-300">{category.name.charAt(0).toUpperCase()}</span>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900">{category.name}</h3>
                              {category.description && <p className="mt-1 line-clamp-2 text-sm text-gray-500">{category.description}</p>}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-lg border border-dashed border-gray-300 py-8 text-center text-gray-500">Categories are unavailable right now.</p>
                    )}
                  </section>

                  <div className="mt-4">
                    <RelatedProducts
                      products={newArrivals.slice(0, 4)}
                      title="New Arrivals"
                      viewAllLink="/products?type=new-arrivals"
                      onAddToCart={addToCart}
                    />
                    <RelatedProducts
                      products={bestSellers.slice(0, 4)}
                      title="Best Sellers"
                      viewAllLink="/products?type=best-sellers"
                      onAddToCart={addToCart}
                    />
                    <RelatedProducts
                      products={todaysDeals.slice(0, 4)}
                      title="Today’s Deals"
                      viewAllLink="/products?type=todays-deals"
                      onAddToCart={addToCart}
                    />
                    <RelatedProducts
                      products={offers.slice(0, 4)}
                      title="Offers"
                      viewAllLink="/products?type=offers"
                      onAddToCart={addToCart}
                    />
                  </div>
                </main>
              );
            }

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
                    ...(cursor.cursorPrice !== undefined
                      ? { cursorPrice: cursor.cursorPrice }
                      : {}),
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
