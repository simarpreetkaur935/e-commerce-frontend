import api from "../api/axios";

const products = async () => {
  try {
    const response = await api.get("/products");

    if (response.data.success) {
      return response.data.products;
    }

    return {
      status: false,
      message: "Unable to fetch products",
    };
  } catch (error: any) {
    console.error(
      "Get Products Error:",
      error.response?.data?.message || error.message
    );

    return {
      status: false,
      message: error.response?.data?.message || "Unable to fetch products",
    };
  }
};
// category
const categories = async () => {
  try {
    const response = await api.get("/categories");

    if (response.data.success) {
      return response.data.categories;
    }

    return {
      status: false,
      message: "Unable to fetch categories",
    };
  } catch (error: any) {
    console.error(
      "Get Categories Error:",
      error.response?.data?.message || error.message
    );

    return {
      status: false,
      message:
        error.response?.data?.message || "Unable to fetch categories",
    };
  }
};
//home
export const homeLoader = async () => {
  const [productsData, categoriesData] = await Promise.all([
    products(),
    categories(),
  ]);

  return {
    products: productsData,
    categories: categoriesData,
  };
};
// product detail loader
export const productDetailsLoader = async ({
  params,
}: {
  params: { id?: string };
}) => {
  const productId = params.id;

  if (!productId) {
    throw new Error("Product ID is missing");
  }

  try {
    // Get the selected product
    const productResponse = await api.get(
      `/products/${productId}`
    );

    if (!productResponse.data.success) {
      throw new Error(
        productResponse.data.message ||
          "Unable to fetch product"
      );
    }

    const product = productResponse.data.product;

    // Get related products from backend
    const relatedProductsResponse = await api.get(
      `/products/${productId}/related`
    );

    const relatedProducts =
      relatedProductsResponse.data.success
        ? relatedProductsResponse.data.products
        : [];

    return {
      product,
      relatedProducts,
    };
  } catch (error: any) {
    console.error(
      "Product Details Error:",
      error.response?.data?.message ||
        error.message
    );

    throw new Error(
      error.response?.data?.message ||
        "Unable to fetch product details"
    );
  }
};
//category loader
export const categoriesLoader = async () => {
  try {
    const response = await api.get("/categories");

    if (response.data.success) {
      return response.data.categories;
    }

    throw new Error(
      response.data.message || "Unable to fetch categories"
    );
  } catch (error: any) {
    console.error(
      "Get Categories Error:",
      error.response?.data?.message || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        "Unable to fetch categories"
    );
  }
};
//wishlist loader 
export const wishlistLoader = () => {
  const token = localStorage.getItem("accessToken");

  // Guest user
  if (!token) {
    const guestWishlist: string[] = JSON.parse(
      sessionStorage.getItem("guestWishlist") || "[]"
    );

    const wishlist = Promise.all(
      guestWishlist.map((productId) =>
        api
          .get(`/products/${productId}`)
          .then((response) => {
            if (response.data.success) {
              return {
                product: response.data.product,
              };
            }

            return null;
          })
          .catch((error: any) => {
            console.error(
              "Get Guest Wishlist Product Error:",
              error.response?.data?.message ||
                error.message
            );

            return null;
          })
      )
    ).then((products) =>
      products.filter(
        (item) => item !== null
      )
    );

    return {
      wishlist,
    };
  }

  // Logged-in user
  const wishlist = api
    .get("/wishlist")
    .then((response) => {
      if (response.data.success) {
        return response.data.wishlist;
      }

      return [];
    })
    .catch((error: any) => {
      console.error(
        "Get Wishlist Error:",
        error.response?.data?.message ||
          error.message
      );

      return [];
    });

  return {
    wishlist,
  };
};
//get cart loader
export const cartLoader = () => {
  const cart = api
    .get("/cart")
    .then((response) => {
      if (response.data.success) {
        return response.data.cart;
      }

      return [];
    })
    .catch((error: any) => {
      console.error(
        "Get Cart Error:",
        error.response?.data?.message ||
          error.message
      );

      return [];
    });

  return {
    cart,
  };
};