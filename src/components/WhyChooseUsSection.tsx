import { Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function WhyChooseUsSection() {
  const features = [
    {
      title: "Licensed & Experienced",
      description: "Fully licensed general contractors with expertise in projects of any scale and complexity"
    },
    {
      title: "Full-Service Solution",
      description: "From design to installation—we handle cabinets, painting, flooring, tiling, and more"
    },
    {
      title: "Quality & Deadlines",
      description: "Exceptional workmanship delivered on time, every time—not just promised, but proven"
    },
    {
      title: "Customer-Focused",
      description: "Your satisfaction is our priority—building friendly relationships from day one"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[#f8f8f8]">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-10">
            Why Us
          </h2>
          <div className="flex flex-col md:flex-row-reverse items-center gap-4 md:gap-6">
            <div className="flex-shrink-0 md:w-[50%]">
              <ImageWithFallback
                src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/470179791_567650836005115_840389285031575646_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=2a1932&_nc_ohc=ZWHobMmqhmIQ7kNvwGiuuCP&_nc_oc=AdrSPcvJyTgetEdcu_khuWJvr8OG6BPozm3LCDwOYOdQD3x-fHcW_Y67JeHWvXN3ohb5vB1HEuryfJt4liOIAMF2&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=VsXA9M69T98m26Dakc_7Fg&_nc_ss=7a389&oh=00_Af1-zaH6oaQxAMPCmmy8PSrMBnwqxLG1A2jhC1GNDZOj4A&oe=69D298D6"
                alt="Alex - Owner and General Manager"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="md:w-[50%] flex flex-col gap-4">
              <p className="font-['Montserrat'] text-[18px] md:text-[20px] text-black text-center md:text-left">
                Rain City Kitchen & Bath is led by Alex, owner and general manager, with a mission to create the kitchen or bathroom of your dreams with top-notch quality and optimal timeframes.
              </p>
              <p className="font-['Montserrat'] text-[18px] md:text-[20px] text-black text-center md:text-left">
                With years of experience in home remodeling, we combine exceptional craftsmanship with personalized service to transform your space into something truly special.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {features.map((feature, index) => {
            return (
              <div 
                key={index}
                className="bg-white rounded-[10px] p-6 md:p-8 flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <Check className="w-12 h-12 text-[#007ec5]" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Lora'] font-bold text-[20px] md:text-[22px] text-black mb-3">
                  {feature.title}
                </h3>
                <p className="font-['Montserrat'] text-[14px] md:text-[15px] text-black leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}