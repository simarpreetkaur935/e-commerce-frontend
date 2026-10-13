import api from "../api/axios";


const products = async (
  search?: string,
  cursor?: {
    cursorCreatedAt: string;
    cursorId: string;
  }
) => {
  try {
    const response = await api.get("/products", {
      params: {
        limit: 8,
        ...(search ? { search } : {}),
        ...(cursor ?? {}),
      },
    });

    if (response.data.success) {
      return {
        success: true,
        products: response.data.products,
        pagination: response.data.pagination,
      };
    }

    return {
      success: false,
      products: [],
      pagination: null,
      message: "Unable to fetch products",
    };
  } catch (error: any) {
    console.error(
      "Get Products Error:",
      error.response?.data?.message || error.message
    );

    return {
      success: false,
      products: [],
      pagination: null,
      message:
        error.response?.data?.message ||
        "Unable to fetch products",
    };
  }
};

export const homeLoader = async ({
  request,
}: {
  request: Request;
}) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim() || "";

  const [productsData, categoriesData] = await Promise.all([
    products(search),
    categories(),
  ]);

  return {
    products: Promise.resolve(productsData),
    categories: categoriesData,
    search,
  };
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
import { redirect } from "react-router-dom";

// GET CART LOADER
export const cartLoader = () => {
  const token =
    localStorage.getItem("accessToken");

  // =========================
  // GUEST USER
  // =========================

  if (!token) {
    return redirect("/login");
  }

  // =========================
  // LOGGED-IN USER
  // =========================

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
//profile
// =========================
// GET MY PROFILE
// =========================

export const profileLoader = () => {
  return api
    .get("/users/me")
    .then((response) => {
      if (response.data.success) {
        return response.data.user;
      }

      return null;
    })
    .catch((error: any) => {
      console.error(
        "Get Profile Error:",
        error.response?.data?.message ||
          error.message
      );

      return null;
    });
};
//get profile for edit
// =========================
// GET PROFILE FOR EDIT
// =========================

export const editProfileLoader = () => {
  return api
    .get("/users/me")
    .then((response) => {
      if (response.data.success) {
        return response.data.user;
      }

      return null;
    })
    .catch((error: any) => {
      console.error(
        "Get Edit Profile Error:",
        error.response?.data?.message ||
          error.message
      );

      return null;
    });
};
