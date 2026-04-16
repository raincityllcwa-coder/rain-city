import { X } from "lucide-react";
import imgStar from "@/assets/fd2b4556742a4d9f3ef6861416c529a4eea6a02c.webp?url";

interface ReviewItem {
  text: string;
  author: string;
  image: string;
  avatar: string | null;
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: ReviewItem[];
}

export function ReviewsModal({ isOpen, onClose, reviews: allReviews }: ReviewsModalProps) {

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[10px] w-full max-w-[900px] max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-['Lora'] font-bold text-[24px] md:text-[28px] text-black">
            All Customer Reviews
          </h2>
          <button
            onClick={onClose}
            className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="size-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6">
          <div className="space-y-6">
            {allReviews.map((review, index) => (
              <div 
                key={index} 
                className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between mb-3">
                  {/* Stars */}
                  <div className="flex gap-[7px] items-center">
                    {[...Array(5)].map((_, i) => (
                      <img 
                        key={i}
                        src={imgStar} 
                        alt="" 
                        className="size-[19px] object-cover"
                      />
                    ))}
                  </div>
                  {/* Google Icon */}
                  <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>

                {/* Review Text */}
                <p className="font-['Montserrat'] font-medium text-[15px] md:text-[16px] text-black leading-relaxed mb-4">
                  "{review.text}"
                </p>

                {/* Author with Avatar */}
                <div className="flex items-center gap-3 mb-4">
                  {review.avatar ? (
                    <img 
                      src={review.avatar}
                      alt={review.author}
                      className="size-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="size-10 rounded-full bg-[#007ec5] flex items-center justify-center text-white font-['Montserrat'] font-bold text-[16px]">
                      {review.author.charAt(0)}
                    </div>
                  )}
                  <p className="font-['Montserrat'] font-semibold text-[16px] text-black">
                    {review.author}
                  </p>
                </div>

                {/* Review Image */}
                <div className="w-full max-w-[500px] h-[220px] rounded-[5px] overflow-hidden">
                  <img 
                    src={review.image} 
                    alt="Customer review" 
                    className="w-full h-full object-contain bg-gray-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}