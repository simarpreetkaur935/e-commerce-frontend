import { Link, useLoaderData } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
}

const Categories = () => {
  const categories = useLoaderData() as Category[];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/categories/${category._id}`}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">

                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">
                    No Image
                  </span>
                )}

              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {category.name}
                </h2>

                {category.description && (
                  <p className="text-sm text-gray-500 mt-2">
                    {category.description}
                  </p>
                )}
              </div>

            </Link>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Categories;