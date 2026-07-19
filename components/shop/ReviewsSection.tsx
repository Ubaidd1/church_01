"use client"

import { useEffect, useState } from "react"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Product } from "@/data/products"

type Review = Product["reviews"][number]

type ReviewsSectionProps = {
  productId: string
  initialReviews: Review[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? "fill-amber-300 text-amber-300" : "fill-transparent text-slate-500"
          }`}
        />
      ))}
    </div>
  )
}

function RatingPicker({
  value,
  onChange,
}: {
  value: number
  onChange: (rating: number) => void
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const rating = index + 1
        const active = rating <= value
        return (
          <button
            key={rating}
            type="button"
            aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
            onClick={() => onChange(rating)}
            className="rounded-md p-0.5 transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                active ? "fill-amber-300 text-amber-300" : "fill-transparent text-slate-400"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

export default function ReviewsSection({ productId, initialReviews }: ReviewsSectionProps) {
  const storageKey = `hoo-product-reviews-${productId}`
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as Review[]
        if (Array.isArray(parsed)) {
          setReviews([...initialReviews, ...parsed])
        }
      }
    } catch {
      setReviews(initialReviews)
    }
  }, [initialReviews, storageKey])

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    const trimmedName = name.trim()
    const trimmedComment = comment.trim()

    if (!trimmedName || !trimmedComment) {
      setError("Please enter your name and review.")
      return
    }

    if (rating < 1) {
      setError("Please select a rating.")
      return
    }

    const newReview: Review = {
      id: `local-${Date.now()}`,
      name: trimmedName,
      rating,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      comment: trimmedComment,
    }

    const existingUserReviews = (() => {
      try {
        const stored = localStorage.getItem(storageKey)
        return stored ? (JSON.parse(stored) as Review[]) : []
      } catch {
        return []
      }
    })()

    const nextUserReviews = [newReview, ...existingUserReviews]
    localStorage.setItem(storageKey, JSON.stringify(nextUserReviews))
    setReviews([newReview, ...reviews])
    setName("")
    setComment("")
    setRating(5)
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 2500)
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#5B6778]/70 p-6 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] md:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Reviews</h2>
          <p className="mt-1 text-sm text-slate-300">
            {reviews.length} customer {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm font-medium text-white">{averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-2xl border border-white/10 bg-[#465263]/45 p-5 md:p-6"
      >
        <h3 className="mb-4 text-lg font-semibold text-white">Write a Review</h3>

        <div className="mb-4 space-y-2">
          <Label htmlFor="review-name" className="text-slate-200">
            Your Name
          </Label>
          <Input
            id="review-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            className="rounded-xl border-white/15 bg-[#3F4A5A]/80 text-white placeholder:text-slate-400 focus-visible:ring-slate-300"
          />
        </div>

        <div className="mb-4 space-y-2">
          <Label className="text-slate-200">Rating</Label>
          <RatingPicker value={rating} onChange={setRating} />
        </div>

        <div className="mb-5 space-y-2">
          <Label htmlFor="review-comment" className="text-slate-200">
            Your Review
          </Label>
          <Textarea
            id="review-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            className="min-h-[120px] rounded-xl border-white/15 bg-[#3F4A5A]/80 text-white placeholder:text-slate-400 focus-visible:ring-slate-300"
          />
        </div>

        {error && <p className="mb-3 text-sm text-red-300">{error}</p>}

        <Button
          type="submit"
          className="w-full rounded-xl bg-slate-200 text-slate-800 hover:bg-white sm:w-auto"
        >
          {submitted ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Review Submitted
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>

      <div className="space-y-4">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-white/10 bg-[#465263]/45 p-5"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-white">{review.name}</p>
                <p className="text-xs text-slate-400">{review.date}</p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="leading-relaxed text-slate-300">{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
