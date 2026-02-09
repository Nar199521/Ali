import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Review } from '@/lib/types';
import { Star } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p>No reviews yet. Be the first to review this product!</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-4">
          <Avatar>
            <AvatarImage src={review.reviewerImage} alt={review.reviewerName} />
            <AvatarFallback>{review.reviewerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{review.reviewerName}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            <p className="mt-2">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
