import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  brand?: string;
  images: string[];

  price: number;
  discountPrice?: number;

  stock: number;

  averageRating: number;
  totalReviews: number;
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({
  products,
}: RelatedProductsProps) => {
  return (
    <section className="mt-16">

      {/* =================================================
          SECTION TITLE
      ================================================= */}

      <h2 className="text-2xl font-bold mb-6">
        Related Products
      </h2>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      {products.length === 0 ? (
        <p className="text-gray-500">
          No related products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

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

              {/* =================================================
                  PRODUCT INFORMATION
              ================================================= */}

              <div className="p-4">

                {/* Brand */}

                {product.brand && (
                  <p className="text-sm text-gray-500 mb-1">
                    {product.brand}
                  </p>
                )}

                {/* Name */}

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

                {/* View Details */}

                <Link
                  to={`/products/${product._id}`}
                  className="block text-center mt-4 border border-gray-300 hover:bg-gray-100 py-2 rounded-md font-medium transition"
                >
                  View Details
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}

    </section>
  );
};

export default RelatedProducts;