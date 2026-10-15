import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products as getProducts } from "../utils/Loaders";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images?: string[];
  totalSold?: number;
  soldCount?: number;
}

function BestSellers() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const result = await getProducts();

        if (result.success) {
          const bestSellingProducts = [...result.products]
            .sort(
              (a: Product, b: Product) =>
                (b.totalSold ?? b.soldCount ?? 0) -
                (a.totalSold ?? a.soldCount ?? 0)
            );

          setProductList(bestSellingProducts);
        } else {
          setError("Unable to load best-selling products.");
        }
      } catch {
        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) {
    return <p className="py-10 text-center">Loading best sellers...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Best Sellers</h1>
      <p className="mb-8 text-gray-500">
        Discover our most popular products.
      </p>

      {productList.length === 0 ? (
        <p className="py-10 text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productList.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="overflow-hidden rounded-lg border border-gray-200 transition hover:shadow-lg"
            >
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="mb-2 font-semibold">{product.name}</h2>

                <div className="flex items-center gap-2">
                  {product.discountPrice != null ? (
                    <>
                      <span className="font-bold text-red-600">
                        ₹{product.discountPrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.price}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold">₹{product.price}</span>
                  )}
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Best Seller
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BestSellers;