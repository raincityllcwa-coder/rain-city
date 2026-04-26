import { useState, useEffect } from "react";
import imgAboutUsImage1 from "@/assets/86d35c22f3ab9a5ba8037f70adb83b514b63ae59.webp?url";
import imgAboutUsImage2 from "@/assets/5b0e63419375cdde3628b20312ffa5c436161724.webp?url";
import imgAboutUsImage3 from "@/assets/e5d831ab1e3b9339b9d178cf62be97ce415879aa.webp?url";
import imgPlayIcon from "@/assets/7cd184714e63d3e219a376ebd63d6f5096b78d98.webp?url";

export default function AboutPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  return (
    <>
      
      <main className="w-full bg-[#f7f6f1]">
        <div className="max-w-[1150px] mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-16">
          {/* Page Title */}
          <h1 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-12 lg:mb-16">
            About Us
          </h1>

          {/* Block One - Image Left, Text Right */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-16 md:mb-24">
            <div className="w-full lg:w-1/2">
              <img 
                src={imgAboutUsImage1} 
                alt="Rain City Kitchen & Bath Team" 
                className="w-full h-auto rounded-[5px] object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="font-['Montserrat'] text-[16px] text-black space-y-4">
                <p>
                  Welcome to Rain City Kitchen & Bath! I'm Alex, the owner and general manager. Here at our company, we know how essential kitchens and bathrooms are to any home — they're spaces where you spend a lot of your time, and they deserve to be perfect. My mission is to create the kitchen or bathroom of your dreams, delivering top-notch quality within an optimal timeframe.
                </p>
                <p>
                  From the very first day, I aim to build a friendly and positive relationship with each customer. I want you to feel confident and at ease throughout the entire process. My core values include responsibility, meeting deadlines, and delivering exceptional quality. I don't just talk about speed and quality — I make sure to demonstrate them in every project. Your satisfaction and happiness are my top priorities.
                </p>
              </div>
            </div>
          </div>

          {/* Block Two - Text Left, Image Right */}
          <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center mb-16 md:mb-24">
            <div className="w-full lg:w-1/2">
              <img 
                src={imgAboutUsImage2} 
                alt="General Contractors at Work" 
                className="w-full h-auto rounded-[5px] object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="font-['Lora'] font-bold text-[22px] md:text-[24px] text-[#3b350e] mb-6 md:mb-8">
                We are General Contractors
              </h2>
              <div className="font-['Montserrat'] text-[16px] text-black space-y-4">
                <p>
                  My team and I are experienced general contractors equipped with all the necessary licenses and documentation to undertake projects of any scale and complexity. Our expertise spans the entire range of home improvement and renovation services. From the design phase to the assembly and installation of kitchen cabinets, we handle every aspect with precision and care.
                </p>
                <p>
                  Our capabilities extend to complex renovation projects, including painting, flooring, tiling, and various related tasks. Whether you need a simple upgrade or a comprehensive transformation, we are committed to delivering high-quality workmanship and exceptional results tailored to your needs.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="font-['Montserrat'] text-[14px] text-gray-600">
                  Washington State Contractor License: <span className="font-semibold text-black">BIRIUCL808C6</span>
                </p>
              </div>
            </div>
          </div>

          {/* Block Three - Image Left, Text Right */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <img 
                src={imgAboutUsImage3} 
                alt="Celebrating with Clients" 
                className="w-full h-auto rounded-[5px] object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="font-['Lora'] font-bold text-[22px] md:text-[24px] text-[#3b350e] mb-6 md:mb-8">
                We Give Unforgettable Emotions
              </h2>
              <p className="font-['Montserrat'] text-[16px] text-black mb-6 md:mb-8">
                I am passionate about delivering not only exceptional results but also a memorable experience. As a positive and open person, I love bringing joy and a good mood to my clients. That's why, at the end of each project, I celebrate with you by playing a special trombone tune, making your day truly unforgettable!
              </p>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-white border border-[#989898] rounded-[5px] px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <img src={imgPlayIcon} alt="" className="w-5 h-5" />
                <span className="font-['Montserrat'] text-[16px] text-black">
                  Watch Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-10 w-10 h-10 flex items-center justify-center hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              aria-label="Close video"
            >
              ×
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Rain City Kitchen & Bath - Trombone Celebration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
