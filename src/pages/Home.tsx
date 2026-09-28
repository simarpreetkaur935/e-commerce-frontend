import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

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
}

const Home = () => {
  const { products } = useLoaderData() as {
    products: Promise<Product[]>;
  };

  return (
    <div className="px-6 py-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-gray-500">Loading products...</p>
          </div>
        }
      >
        <Await
          resolve={products}
          errorElement={
            <div className="text-center py-20">
              <p className="text-red-500">Failed to load products.</p>
            </div>
          }
        >
          {(productsData) => {
            // Select 8 random products
            const randomProducts = [...productsData]
              .sort(() => Math.random() - 0.5)
              .slice(0, 8);

            return (
              <section>
                {/* =========================
                    FEATURED PRODUCTS
                ========================= */}

                <h2 className="text-2xl font-bold mb-6">Explore Our Products</h2>

                {/* =========================
                    PRODUCT GRID
                ========================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {randomProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
                    >
                      {/* =========================
                          PRODUCT IMAGE
                      ========================= */}

                      <div className="h-56 bg-gray-100 flex items-center justify-center">
                        {product.images?.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </div>

                      {/* =========================
                          PRODUCT INFORMATION
                      ========================= */}

                      <div className="p-4">
                        {/* Brand */}

                        {product.brand && (
                          <p className="text-sm text-gray-500 mb-1">
                            {product.brand}
                          </p>
                        )}

                        {/* Product Name */}

                        <h3 className="text-lg font-semibold truncate">
                          {product.name}
                        </h3>

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

                        {/* Stock */}

                        <p className="text-sm text-gray-500 mt-2">
                          {product.stock > 0
                            ? `${product.stock} items available`
                            : "Out of stock"}
                        </p>

                        {/* =========================
                            BUTTONS
                        ========================= */}

                        <div className="flex gap-2 mt-4">
                          <Link
                            to={`/products/${product._id}`}
                            className="flex-1 text-center border border-gray-300 hover:bg-gray-100 py-2 rounded-md font-medium"
                          >
                            View Details
                          </Link>

                          <button
                            type="button"
                            disabled={product.stock === 0}
                            className="flex-1 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 py-2 rounded-md font-medium"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
