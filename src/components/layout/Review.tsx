import { useEffect, useState, type FormEvent } from "react";
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";

export interface ReviewUser {
  _id: string;
  name: string;
  avatar?: string;
}

export interface ReviewData {
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
  reviews: ReviewData[];
}

interface ReviewProps {
  productId: string;
  reviews: ReviewData[];
  averageRating: number;
  myReview: ReviewData | null;
}

const Review = ({
  productId,
  reviews,
  averageRating,
  myReview,
}: ReviewProps) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as
    | { success?: boolean; action?: string }
    | undefined;
  const authenticated = Boolean(localStorage.getItem("accessToken"));
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(myReview?.rating ?? 0);
  const [comment, setComment] = useState(myReview?.comment ?? "");
  const reviewAction = navigation.formData?.get("_action");
  const isSubmitting =
    navigation.state !== "idle" &&
    ["createReview", "updateReview", "deleteReview"].includes(
      String(reviewAction)
    );

  useEffect(() => {
    setRating(myReview?.rating ?? 0);
    setComment(myReview?.comment ?? "");
  }, [myReview?._id, myReview?.rating, myReview?.comment]);

  useEffect(() => {
    if (actionData?.success) setEditing(false);
  }, [actionData?.success]);

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error("Choose a rating from 1 to 5 stars.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    if (!String(formData.get("comment") ?? "").trim()) {
      toast.error("Please enter a comment.");
      return;
    }

    submit(event.currentTarget, { method: "post" });
  };

  const submitDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(event.currentTarget, { method: "post" });
  };

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
            From our customers
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          {reviews.length === 1 ? "1 review" : `${reviews.length} reviews`}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl bg-gray-50 p-6 sm:p-8">
          <p className="text-sm font-medium text-gray-500">Average customer rating</p>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-5xl font-bold tracking-tight text-gray-900">
              {reviews.length ? averageRating.toFixed(1) : "—"}
            </span>
            <span className="pb-1 text-sm text-gray-500">out of 5</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-2xl text-amber-500" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} aria-hidden="true" className={averageRating >= star - 0.5 ? "" : "text-gray-300"}>★</span>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {reviews.length ? "Based on verified customer feedback" : "Be the first to share your experience"}
          </p>
        </div>

        {authenticated ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {myReview && !editing ? "Your review" : editing ? "Update your review" : "Write a review"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {myReview && !editing ? "You can edit or remove your feedback." : "Tell other shoppers what you think."}
                </p>
              </div>
              {myReview && !editing && (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">Your review</span>
              )}
            </div>

            {myReview && !editing ? (
              <div>
                <div className="flex items-center gap-1 text-lg text-amber-500" aria-label={`${myReview.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} aria-hidden="true" className={myReview.rating >= star ? "" : "text-gray-300"}>★</span>
                  ))}
                </div>
                <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-700">{myReview.comment}</p>
                <div className="mt-5 flex gap-3">
                  <button type="button" onClick={() => setEditing(true)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Edit review</button>
                  <form method="post" onSubmit={submitDelete}>
                    <input type="hidden" name="_action" value="deleteReview" />
                    <input type="hidden" name="reviewId" value={myReview._id} />
                    <input type="hidden" name="productId" value={productId} />
                    <button type="submit" disabled={isSubmitting} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50">
                      {isSubmitting ? "Deleting…" : "Delete review"}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <form method="post" onSubmit={submitReview} className="space-y-5">
                <input type="hidden" name="_action" value={myReview ? "updateReview" : "createReview"} />
                <input type="hidden" name="productId" value={productId} />
                {myReview && <input type="hidden" name="reviewId" value={myReview._id} />}
                <input type="hidden" name="rating" value={rating} />
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-gray-700">Your rating</legend>
                  <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating from 1 to 5 stars">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button key={value} type="button" role="radio" aria-checked={rating === value} aria-label={`${value} star${value === 1 ? "" : "s"}`} onClick={() => setRating(value)} className={`text-3xl leading-none transition hover:scale-110 ${rating >= value ? "text-amber-500" : "text-gray-300"}`}>★</button>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">{rating ? `${rating} out of 5` : "Select a rating"}</span>
                  </div>
                </fieldset>
                <label htmlFor={`review-comment-${productId}`} className="block text-sm font-medium text-gray-700">
                  Your comments
                  <textarea id={`review-comment-${productId}`} name="comment" value={comment} onChange={(event) => setComment(event.target.value)} rows={4} required className="mt-2 block w-full resize-y rounded-lg border border-gray-300 bg-gray-50 p-3.5 font-normal text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100" placeholder="What did you like or dislike about this product?" />
                </label>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" disabled={isSubmitting} className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
                    {isSubmitting ? "Saving…" : myReview ? "Save changes" : "Submit review"}
                  </button>
                  {editing && <button type="button" onClick={() => { setEditing(false); setRating(myReview?.rating ?? 0); setComment(myReview?.comment ?? ""); }} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Cancel</button>}
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-semibold text-gray-900">Have you tried this product?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">Sign in to leave a rating and help other shoppers choose.</p>
            <Link to="/login" className="mt-5 inline-flex w-fit rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">Log in to review</Link>
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">What shoppers are saying</h3>
        </div>
        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <p className="text-lg font-medium text-gray-800">No reviews yet</p>
            <p className="mt-1 text-sm text-gray-500">Your feedback could be the first.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => {
              const user = typeof review.user === "string" ? null : review.user;
              return (
                <article key={review._id} className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-sm sm:p-6">
                  <div className="flex items-center gap-3">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-100" />
                    ) : (
                      <div aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 font-semibold text-amber-800">{user?.name?.charAt(0)?.toUpperCase() || "U"}</div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">{user?.name || "Customer"}</p>
                      <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="ml-auto rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700">{review.rating}.0 ★</span>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-700">{review.comment}</p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Review;
