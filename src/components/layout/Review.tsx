import { useEffect, useState, type FormEvent } from "react";
import { Link, useFetcher } from "react-router-dom";
import { toast } from "react-toastify";
import type { Review as ReviewData } from "../../api/reviewService";

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
  const fetcher = useFetcher<{ success: boolean; action?: string }>();
  const authenticated = Boolean(localStorage.getItem("accessToken"));
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(myReview?.rating ?? 0);
  const [comment, setComment] = useState(myReview?.comment ?? "");

  useEffect(() => {
    setRating(myReview?.rating ?? 0);
    setComment(myReview?.comment ?? "");
  }, [myReview?._id, myReview?.rating, myReview?.comment]);

  useEffect(() => {
    if (fetcher.data?.success) setEditing(false);
  }, [fetcher.data?.success]);

  const validateRating = (event: FormEvent<HTMLFormElement>) => {
    if (rating < 1 || rating > 5) {
      event.preventDefault();
      toast.error("Choose a rating from 1 to 5 stars.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    if (!String(formData.get("comment") ?? "").trim()) {
      event.preventDefault();
      toast.error("Please enter a comment.");
    }
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
      <p className="text-sm text-gray-600 mb-6">
        {reviews.length > 0
          ? `${averageRating.toFixed(1)} out of 5 · ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`
          : "No reviews yet"}
      </p>

      {authenticated ? (
        <div className="mb-8 rounded-lg border border-gray-200 p-5">
          <h3 className="text-lg font-semibold mb-4">
            {myReview && !editing ? "Your review" : editing ? "Edit your review" : "Write a review"}
          </h3>
          {myReview && !editing ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-gray-700">
                <span className="text-amber-500">
                  {"★".repeat(myReview.rating)}{"☆".repeat(5 - myReview.rating)}
                </span>{" "}{myReview.comment}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setEditing(true)} className="rounded border px-3 py-2 text-sm hover:bg-gray-50">Edit</button>
                <fetcher.Form method="post">
                  <input type="hidden" name="_action" value="deleteReview" />
                  <input type="hidden" name="reviewId" value={myReview._id} />
                  <input type="hidden" name="productId" value={productId} />
                  <button type="submit" disabled={fetcher.state !== "idle"} className="rounded border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50">
                    {fetcher.state !== "idle" ? "Deleting…" : "Delete"}
                  </button>
                </fetcher.Form>
              </div>
            </div>
          ) : (
            <fetcher.Form method="post" onSubmit={validateRating} className="space-y-4">
              <input type="hidden" name="_action" value={myReview ? "updateReview" : "createReview"} />
              <input type="hidden" name="productId" value={productId} />
              {myReview && <input type="hidden" name="reviewId" value={myReview._id} />}
              <input type="hidden" name="rating" value={rating} />
              <fieldset>
                <legend className="mb-2 text-sm font-medium">Your rating</legend>
                <div className="flex gap-1" role="radiogroup" aria-label="Rating from 1 to 5 stars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} type="button" role="radio" aria-checked={rating === value} aria-label={`${value} star${value === 1 ? "" : "s"}`} onClick={() => setRating(value)} className={`text-3xl leading-none ${rating >= value ? "text-amber-500" : "text-gray-300"}`}>★</button>
                  ))}
                </div>
              </fieldset>
              <label htmlFor={`review-comment-${productId}`} className="block text-sm font-medium">
                Comment
                <textarea id={`review-comment-${productId}`} name="comment" value={comment} onChange={(event) => setComment(event.target.value)} rows={4} required className="mt-2 block w-full rounded-md border border-gray-300 p-3 font-normal focus:border-gray-500 focus:outline-none" placeholder="Share what you think about this product" />
              </label>
              <div className="flex gap-3">
                <button type="submit" disabled={fetcher.state !== "idle"} className="rounded-md bg-black px-5 py-2.5 text-white hover:bg-gray-800 disabled:opacity-50">
                  {fetcher.state !== "idle" ? "Saving…" : myReview ? "Save changes" : "Submit review"}
                </button>
                {editing && <button type="button" onClick={() => { setEditing(false); setRating(myReview?.rating ?? 0); setComment(myReview?.comment ?? ""); }} className="rounded-md border px-5 py-2.5 hover:bg-gray-50">Cancel</button>}
              </div>
            </fetcher.Form>
          )}
        </div>
      ) : (
        <p className="mb-8 rounded-lg bg-gray-50 p-4 text-gray-700">
          <Link to="/login" className="font-medium underline">Log in</Link> to write a review.
        </p>
      )}

      {reviews.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-gray-500">Be the first to review this product.</p>
      ) : (
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
          {reviews.map((review) => {
            const user = typeof review.user === "string" ? null : review.user;
            return (
              <article key={review._id} className="p-5">
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-600">{user?.name?.charAt(0)?.toUpperCase() || "U"}</div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{user?.name || "Customer"}</p>
                    <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="ml-auto text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-gray-700">{review.comment}</p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Review;
