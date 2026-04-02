import imgAboutUsImage1 from "@/assets/86d35c22f3ab9a5ba8037f70adb83b514b63ae59.webp?url";
import imgAboutUsImage2 from "@/assets/5b0e63419375cdde3628b20312ffa5c436161724.webp?url";
import imgAboutUsImage3 from "@/assets/e5d831ab1e3b9339b9d178cf62be97ce415879aa.webp?url";
import imgPlayIcon from "@/assets/7cd184714e63d3e219a376ebd63d6f5096b78d98.webp?url";
import { useState } from "react";

export function AboutSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="about" className="w-full py-12 md:py-16 lg:py-20 bg-[#f7f6f1] rounded-[5px]">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-11">
          About Us
        </h2>
        
        <div className="flex flex-col gap-16 md:gap-[99px]">
          {/* Block One */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-[90px] items-center">
            <div className="w-full md:w-[518px] h-[280px] md:h-[350px] rounded-[5px] overflow-hidden shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/geougc/AF1QipOYbfMXZXKe8jbigDTHpaYOtPyna80bbeyNz6PN=h400" 
                alt="About us" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-['Montserrat'] font-normal text-[16px] text-black w-full md:w-[482px]">
              <p className="mb-4">
                Welcome to Rain City Kitchen & Bath! I'm Alex, the owner and general manager. Here at our company, we know how essential kitchens and bathrooms are to any home — they're spaces where you spend a lot of your time, and they deserve to be perfect. My mission is to create the kitchen or bathroom of your dreams, delivering top-notch quality within an optimal timeframe.
              </p>
              <p>
                From the very first day, I aim to build a friendly and positive relationship with each customer. I want you to feel confident and at ease throughout the entire process. My core values include responsibility, meeting deadlines, and delivering exceptional quality. I don't just talk about speed and quality — I make sure to demonstrate them in every project. Your satisfaction and happiness are my top priorities.
              </p>
            </div>
          </div>

          {/* Block Two */}
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-[82px] items-center">
            <div className="w-full md:w-[425px] h-[260px] md:h-[319px] rounded-[5px] overflow-hidden shrink-0">
              <img 
                src={imgAboutUsImage2} 
                alt="General Contractors" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-8 md:gap-[48px] w-full md:w-[562px]">
              <h3 className="font-['Lora'] font-bold text-[22px] md:text-[24px] text-[#3b350e]">
                We are General Contractors
              </h3>
              <div className="font-['Montserrat'] font-normal text-[16px] text-black">
                <p className="mb-4">
                  My team and I are experienced general contractors equipped with all the necessary licenses and documentation to undertake projects of any scale and complexity. Our expertise spans the entire range of home improvement and renovation services. From the design phase to the assembly and installation of kitchen cabinets, we handle every aspect with precision and care.
                </p>
                <p>
                  Our capabilities extend to complex renovation projects, including painting, flooring, tiling, and various related tasks. Whether you need a simple upgrade or a comprehensive transformation, we are committed to delivering high-quality workmanship and exceptional results tailored to your needs.
                </p>
              </div>
            </div>
          </div>

          {/* Block Three */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-[45px] items-center">
            <div className="w-full md:w-[531px] h-[300px] md:h-[398px] rounded-[5px] overflow-hidden shrink-0">
              <img 
                src={imgAboutUsImage3} 
                alt="Unforgettable Emotions" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-8 md:gap-[46px] w-full md:w-[544px]">
              <h3 className="font-['Lora'] font-bold text-[22px] md:text-[24px] text-[#3b350e]">
                We Give Unforgettable Emotions
              </h3>
              <p className="font-['Montserrat'] font-normal text-[16px] text-black">
                I am passionate about delivering not only exceptional results but also a memorable experience. As a positive and open person, I love bringing joy and a good mood to my clients. That's why, at the end of each project, I celebrate with you by playing a special trombone tune, making your day truly unforgettable!
              </p>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="bg-white border border-[#989898] rounded-[5px] h-[55px] px-[18px] flex items-center gap-[14px] self-start hover:bg-gray-50 transition-colors"
              >
                <img 
                  src={imgPlayIcon} 
                  alt="" 
                  className="size-[21px] object-cover"
                />
                <span className="font-['Montserrat'] font-normal text-[16px] text-black">
                  Watch Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-bold"
            >
              ×
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/sptaH6Gtews?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}