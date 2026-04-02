import imgStar from "@/assets/fd2b4556742a4d9f3ef6861416c529a4eea6a02c.webp?url";
import imgArrowLeftIcon from "@/assets/28489d8b77c472166b57c0782ccc277f85ccd4b7.webp?url";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ReviewsSection() {
  const reviews = [
    {
      text: "Alex did a phenomenal job on our kitchen remodel!! He works fast and is meticulous. He really cares about the quality of his work and the satisfaction of his clients. We are so pleased with how our cabinets turned out!",
      author: "Jessee Baldwin",
      image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9puAoW__oTiEGY6ZeLDuTYSqAe-gvO8-ftLlqSZg0X04HjX6-EDXDxUTzAFwcWsoZuivzJQi1u73jnPk6LlE9ySlx8VJSJElfXlbJiWEvdPiCT2ETqrIE7yGvvfGevBYS81ROulb33MkjLpI=s800-w800-h400-rw",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjU0OBEXbB-sb4fy3hdc2P9tYhCG5HiiG5h91CTo-ha7McvJLUE=w200-h200-p-rp-mo-ba3-br100"
    },
    {
      text: "Exceptional kitchen remodel and general contractor service !!! I rarely bother myself to leave feedbacks, but this guy deserves it. Highly professional and professionalism is in details- that's what this guy delivers . Alex is very positive personality, he is super punctual, intelligent and a very pleasant guy to work with . I wish him all the best in his business and without any hesitation I can recommend him to anyone who is looking high quality at a fair price.",
      author: "Victor C.",
      image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9pvUFGv08qC8tPPezn03AA4f_Rn_D2TYcOMDa0pqlMIaR524H2sX-YHH2KFiN6a74pfJ1LIQCz-80m1cLcLUfipYYPEPvee3Wit1TqfxYGDGfOFRSREUlAyscaCyBUE2oNa2g7O3nVtQPisg=s800-w800-h400-rw",
      avatar: null
    },
    {
      text: "Alexander Biriuk built our kitchen cabinets. The results were spectacular, stunning and completed with such care. Alexander is a pleasure to work with and no surprises.",
      author: "Jeffrey Lang",
      image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9ptVDYHT5Vr_k5PUZU8HRjIXZpckIl8GskfK46pIvo5AuZhOjGCIGudEyLCA48WG-CmmPFWZ6glWdzO-uoxzZFqdNUcCijZ3T6UM4S6olUi9Eu1iLzxfzCiNjStZBvAq5bN_xfgn=s800-w800-h400-rw",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjW1Q-Qwa8PGarLPIFJL2Ne1iZgdYp5vQoaIBBNRnHpVc8EfjP-d=w72-h72-p-rp-mo-br100"
    },
    {
      text: "We cannot recommend Alex highly enough! From start to finish, he was an absolute pleasure to work with—professional, detail-oriented, and truly passionate about his craft. He installed our kitchen with such precision and care, making sure every detail was perfect. His expertise, problem-solving skills, and friendly attitude made the entire process smooth and stress-free.",
      author: "Xenia V.",
      image: "https://lh3.googleusercontent.com/geougc-cs/ABOP9ptDCeBRqKoavCkcrvltzLyEUQec8WuNrcyERtW54jpiTOiV82uYbDc2hrkMsyMHmPalgyx3zDbIMKFr4sNJLDbxRX8pcnWAYrxLWHzYwTJNIS5Mirbk-1iiCYCH_3Xav1UuR6PXAw=s800-w800-h400-rw",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjX4A-NawzgEDRuXGp02sv7GSlvdLyrAab8GBg44ABpwGDvPSzZq=w72-h72-p-rp-mo-ba3-br100"
    }
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-play reviews every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentReview]);

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[#f1f3f7]">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-11">
          Our Happy Customers Say
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-[119px] items-center">
          {/* Review Image with Fade */}
          <div className="w-full md:w-[374px] h-[280px] md:h-[368px] rounded-[5px] overflow-hidden shrink-0 relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentReview}
                src={reviews[currentReview].image} 
                alt="Customer review" 
                className="w-full h-full object-cover absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
          </div>

          {/* Review Content with Fade */}
          <div className="flex flex-col gap-[28px] w-full md:w-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                className="flex flex-col gap-[28px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
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

                {/* Review Text */}
                <p className="font-['Montserrat'] font-medium text-[16px] md:text-[18px] text-black leading-normal min-h-[140px] md:min-h-[180px]">
                  "{reviews[currentReview].text}"
                </p>

                {/* Author with Avatar */}
                <div className="flex items-center gap-3">
                  {reviews[currentReview].avatar ? (
                    <img 
                      src={reviews[currentReview].avatar}
                      alt={reviews[currentReview].author}
                      className="size-12 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="size-12 rounded-full bg-[#007ec5] flex items-center justify-center text-white font-['Montserrat'] font-bold text-[18px]">
                      {reviews[currentReview].author.charAt(0)}
                    </div>
                  )}
                  <p className="font-['Montserrat'] font-semibold text-[16px] text-black">
                    {reviews[currentReview].author}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-[9px] items-center">
              <button
                onClick={prevReview}
                className="bg-white border border-[#989898] rounded-[5px] size-[55px] flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Previous review"
              >
                <img 
                  src={imgArrowLeftIcon} 
                  alt="" 
                  className="size-[21px] object-cover rotate-180"
                />
              </button>
              <button
                onClick={nextReview}
                className="bg-white border border-[#989898] rounded-[5px] size-[55px] flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Next review"
              >
                <img 
                  src={imgArrowLeftIcon} 
                  alt="" 
                  className="size-[21px] object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}