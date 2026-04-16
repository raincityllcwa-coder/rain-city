import imgStar from "@/assets/fd2b4556742a4d9f3ef6861416c529a4eea6a02c.webp?url";
import { useState } from "react";
import { ReviewsModal } from "./ReviewsModal";

// Hardcoded fallback
const fallbackReviews = [
  {
    text: "Alex did a phenomenal job on our kitchen remodel!! He works fast and is meticulous. He really cares about the quality of his work and the satisfaction of his clients. We are so pleased with how our cabinets turned out!",
    author: "Jessee Baldwin",
    image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9puAoW__oTiEGY6ZeLDuTYSqAe-gvO8-ftLlqSZg0X04HjX6-EDXDxUTzAFwcWsoZuivzJQi1u73jnPk6LlE9ySlx8VJSJElfXlbJiWEvdPiCT2ETqrIE7yGvvfGevBYS81ROulb33MkjLpI=s800-w800-h400-rw",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjU0OBEXbB-sb4fy3hdc2P9tYhCG5HiiG5h91CTo-ha7McvJLUE=w200-h200-p-rp-mo-ba3-br100",
  },
  {
    text: "Exceptional kitchen remodel and general contractor service !!! I rarely bother myself to leave feedbacks, but this guy deserves it. Highly professional and professionalism is in details- that's what this guy delivers . Alex is very positive personality, he is super punctual, intelligent and a very pleasant guy to work with . I wish him all the best in his business and without any hesitation I can recommend him to anyone who is looking high quality at a fair price.",
    author: "Victor C.",
    image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9pvUFGv08qC8tPPezn03AA4f_Rn_D2TYcOMDa0pqlMIaR524H2sX-YHH2KFiN6a74pfJ1LIQCz-80m1cLcLUfipYYPEPvee3Wit1TqfxYGDGfOFRSREUlAyscaCyBUE2oNa2g7O3nVtQPisg=s800-w800-h400-rw",
    avatar: null,
  },
  {
    text: "Alexander Biriuk built our kitchen cabinets. The results were spectacular, stunning and completed with such care. Alexander is a pleasure to work with and no surprises.",
    author: "Jeffrey Lang",
    image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9ptVDYHT5Vr_k5PUZU8HRjIXZpckIl8GskfK46pIvo5AuZhOjGCIGudEyLCA48WG-CmmPFWZ6glWdzO-uoxzZFqdNUcCijZ3T6UM4S6olUi9Eu1iLzxfzCiNjStZBvAq5bN_xfgn=s800-w800-h400-rw",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjW1Q-Qwa8PGarLPIFJL2Ne1iZgdYp5vQoaIBBNRnHpVc8EfjP-d=w72-h72-p-rp-mo-br100",
  },
  {
    text: "We cannot recommend Alex highly enough! From start to finish, he was an absolute pleasure to work with—professional, detail-oriented, and truly passionate about his craft. He installed our kitchen with such precision and care, making sure every detail was perfect. His expertise, problem-solving skills, and friendly attitude made the entire process smooth and stress-free.",
    author: "Xenia V.",
    image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9ptDCeBRqKoavCkcrvltzLyEUQec8WuNrcyERtW54jpiTOiV82uYbDc2hrkMsyMHmPalgyx3zDbIMKFr4sNJLDbxRX8pcnWAYrxLWHzYwTJNIS5Mirbk-1iiCYCH_3Xav1UuR6PXAw=s800-w800-h400-rw",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjX4A-NawzgEDRuXGp02sv7GSlvdLyrAab8GBg44ABpwGDvPSzZq=w72-h72-p-rp-mo-ba3-br100",
  },
  {
    text: "Outstanding work! Alex transformed our dated kitchen into a modern, functional space. His attention to detail and commitment to quality is evident in every aspect of the work. Highly recommend!",
    author: "Michael R.",
    image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9puAoW__oTiEGY6ZeLDuTYSqAe-gvO8-ftLlqSZg0X04HjX6-EDXDxUTzAFwcWsoZuivzJQi1u73jnPk6LlE9ySlx8VJSJElfXlbJiWEvdPiCT2ETqrIE7yGvvfGevBYS81ROulb33MkjLpI=s800-w800-h400-rw",
    avatar: null,
  },
  {
    text: "Professional, reliable, and skilled. Alex completed our bathroom remodel on time and within budget. The quality of workmanship exceeded our expectations. We couldn't be happier with the results!",
    author: "Sarah K.",
    image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9pvUFGv08qC8tPPezn03AA4f_Rn_D2TYcOMDa0pqlMIaR524H2sX-YHH2KFiN6a74pfJ1LIQCz-80m1cLcLUfipYYPEPvee3Wit1TqfxYGDGfOFRSREUlAyscaCyBUE2oNa2g7O3nVtQPisg=s800-w800-h400-rw",
    avatar: null,
  },
];

interface ReviewItem {
  text: string;
  author: string;
  image: string;
  avatar: string | null;
}

interface Props {
  reviews?: ReviewItem[];
}

export function ReviewsGridSection({ reviews: reviewsProp }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = reviewsProp && reviewsProp.length > 0 ? reviewsProp : fallbackReviews;

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[#f1f3f7]">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-3">
          Our Happy Customers Say
        </h2>

        <p className="font-['Montserrat'] font-medium text-[16px] md:text-[18px] text-gray-700 mb-8 md:mb-12">
          Rated 5 stars on Google by 100+ homeowners across Seattle, Bellevue, Kirkland, Redmond and Sammamish
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-[5px] p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-[7px] items-center">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={imgStar} alt="" className="size-[19px] object-cover" />
                  ))}
                </div>
                <svg className="size-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>

              <p className="font-['Montserrat'] font-medium text-[15px] md:text-[16px] text-black leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="size-12 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="size-12 rounded-full bg-[#007ec5] flex items-center justify-center text-white font-['Montserrat'] font-bold text-[18px]">
                    {review.author.charAt(0)}
                  </div>
                )}
                <p className="font-['Montserrat'] font-semibold text-[16px] text-black">
                  {review.author}
                </p>
              </div>

              <div className="w-full h-[180px] rounded-[5px] overflow-hidden">
                <img src={review.image} alt="Customer review" className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#007ec5] hover:bg-[#006aa8] text-white font-['Montserrat'] font-semibold text-[16px] md:text-[18px] px-8 py-3 rounded-[5px] transition-colors"
          >
            Read More Reviews
          </button>
        </div>
      </div>

      <ReviewsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reviews={reviews} />
    </section>
  );
}
