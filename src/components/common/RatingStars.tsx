"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md"
  className?: string
}

const MAX_RATING = 5

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  className,
}: RatingStarsProps) {
  const starSize = size === "sm" ? "h-3 w-3" : "h-4 w-4"
  const textSize = size === "sm" ? "text-xs" : "text-sm"

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: MAX_RATING }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted",
            )}
          />
        ))}
      </div>
      <span className={cn(textSize, "text-muted-foreground font-medium")}>
        {rating.toFixed(1)}
        {reviewCount != null && <span className="ml-1">({reviewCount})</span>}
      </span>
    </div>
  )
}
