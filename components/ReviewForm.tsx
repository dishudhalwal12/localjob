"use client";

import { useState } from "react";
import { addReview } from "@/lib/reviews";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

interface ReviewFormProps {
  workerId: string;
  onSuccess: () => void;
}

export function ReviewForm({ workerId, onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to leave a review.");
      return;
    }

    setSubmitting(true);
    try {
      await addReview({
        workerId,
        customerId: user.uid,
        customerName: (user.email || "Anonymous").split("@")[0],
        rating,
        comment,
      });
      toast.success("Review submitted!");
      setComment("");
      onSuccess();
    } catch (error) {
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-black/10 p-6 bg-white shadow-sm">
      <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
      
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase text-black/50 mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-200"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold uppercase text-black/50 mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What was your experience?"
          className="w-full rounded-xl border border-black/10 p-4 text-sm outline-none focus:border-crimson"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="pill-button-primary w-full justify-center"
      >
        {submitting ? "Submitting..." : "Post Review"}
      </button>
    </form>
  );
}
