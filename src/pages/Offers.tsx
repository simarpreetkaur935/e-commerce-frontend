import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products as getProducts } from "../utils/Loaders";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images?: string[];
}

function Offers() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const result = await getProducts();

        if (result.success) {
          const discountedProducts = result.products.filter(
            (product: Product) =>
              product.discountPrice != null &&
              product.discountPrice < product.price
          );

          setProductList(discountedProducts);
        } else {
          setError("Unable to load offers.");
        }
      } catch {
        setError("Something went wrong while loading offers.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <p className="py-10 text-center">Loading offers...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Special Offers</h1>
      <p className="mb-8 text-gray-500">
        Explore products at discounted prices.
      </p>

      {productList.length === 0 ? (
        <p className="py-10 text-center">
          No offers available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productList.map((product) => {
            const discountPercentage = Math.round(
              ((product.price - product.discountPrice!) /
                product.price) *
                100
            );

            return (
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
                  <span className="mb-2 inline-block rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">
                    {discountPercentage}% OFF
                  </span>

                  <h2 className="mb-2 font-semibold">{product.name}</h2>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-700">
                      ₹{product.discountPrice}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Offers;