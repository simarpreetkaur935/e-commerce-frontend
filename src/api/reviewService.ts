export interface ReviewUser {
  _id: string;
  name: string;
  avatar?: string;
}

export interface Review {
  _id: string;
  user: ReviewUser | string;
  product: string | { _id: string };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductReviewsResponse {
  success: boolean;
  count: number;
  averageRating: number;
  reviews: Review[];
}
