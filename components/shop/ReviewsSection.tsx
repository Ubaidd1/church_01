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
            index < rating ? "fill-faith-gold text-faith-gold" : "fill-transparent text-faith-slate/40"
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
                active ? "fill-faith-gold text-faith-gold" : "fill-transparent text-faith-slate/40"
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
    <section className="rounded-2xl bg-faith-white p-6 shadow-lg md:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-bold text-faith-black">Reviews</h2>
          <div className="mt-2 h-1.5 w-20 rounded-full bg-faith-gold" />
          <p className="mt-3 text-sm text-faith-slate">
            {reviews.length} customer {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm font-medium text-faith-black">{averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-faith-slate/15 bg-faith-gray/40 p-5 md:p-6">
        <h3 className="mb-4 font-serif text-lg font-bold text-faith-black">Write a Review</h3>

        <div className="mb-4 space-y-2">
          <Label htmlFor="review-name" className="text-faith-black">
            Your Name
          </Label>
          <Input
            id="review-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            className="rounded-xl border-faith-slate/20 bg-faith-white focus-visible:ring-faith-blue"
          />
        </div>

        <div className="mb-4 space-y-2">
          <Label className="text-faith-black">Rating</Label>
          <RatingPicker value={rating} onChange={setRating} />
        </div>

        <div className="mb-5 space-y-2">
          <Label htmlFor="review-comment" className="text-faith-black">
            Your Review
          </Label>
          <Textarea
            id="review-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            className="min-h-[120px] rounded-xl border-faith-slate/20 bg-faith-white focus-visible:ring-faith-blue"
          />
        </div>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <Button
          type="submit"
          className="w-full rounded-xl bg-faith-blue text-white hover:bg-faith-blue/90 sm:w-auto"
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
            className="rounded-xl border border-faith-slate/15 bg-faith-gray/30 p-5"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-faith-black">{review.name}</p>
                <p className="text-xs text-faith-slate">{review.date}</p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="leading-relaxed text-faith-slate">{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
