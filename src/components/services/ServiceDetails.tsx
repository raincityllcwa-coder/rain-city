import imgServiceImage from "@/assets/c4e93df24993f176102d516e4e5e7a4fd86822b6.webp?url";
import imgServiceImage1 from "@/assets/45b63473772ac5eedb2419a124f3a11b4a82ba56.webp?url";
import imgServiceImage2 from "@/assets/2221dd725ae6402fca45a45bd79869231da67ce7.webp?url";
import { CheckCircle2, ArrowRight } from "lucide-react";

const services = [
  {
    id: "kitchen-cabinets",
    slug: "kitchen-cabinets",
    title: "Kitchen Cabinets",
    image: imgServiceImage,
    bgColor: "#f7f6f1",
    textColor: "#3b350e",
    description: "Transform your kitchen with custom or standard cabinets. Choose from Shaker, Flat, or custom door styles in a variety of colors and finishes.",
    features: [
      "Custom and standard cabinet options",
      "Shaker and Flat door styles",
      "Wide variety of colors and finishes",
      "High-quality craftsmanship",
      "Professional installation",
      "Design consultation included",
    ],
  },
  {
    id: "kitchen-countertops",
    slug: "kitchen-countertops",
    title: "Kitchen Countertops",
    image: imgServiceImage1,
    bgColor: "#f1f3f7",
    textColor: "#021b3c",
    reverse: true,
    description: "Premium countertops in quartz, granite, and marble. Complete service from templating to installation.",
    features: [
      "Quartz, granite, and marble options",
      "Multiple edge profiles available",
      "Professional fabrication",
      "Precise template and measurement",
      "Expert installation",
      "Warranty included",
    ],
  },
  {
    id: "bathroom-remodel",
    slug: "bathroom-remodel",
    title: "Bathroom Remodel",
    image: imgServiceImage2,
    bgColor: "#f7f6f1",
    textColor: "#3b350e",
    description: "Complete bathroom transformations with premium tile, modern fixtures, and expert craftsmanship.",
    features: [
      "Porcelain, natural stone, and glass tile",
      "Custom shower and tub installations",
      "Vanity and cabinet solutions",
      "Modern fixture installation",
      "Complete waterproofing",
      "ADA-compliant options available",
    ],
  }
];

export function ServiceDetails() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-20 md:gap-28">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-20">
              {/* Main Service Block */}
              <div className="relative">
                <div className={`flex flex-col ${service.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-0 items-center`}>
                  {/* Image */}
                  <a 
                    href={`/${service.slug}`}
                    className="w-full md:w-[463px] h-[280px] md:h-[380px] rounded-[5px] overflow-hidden shrink-0 relative z-10 hover:opacity-95 transition-opacity"
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                  </a>
                  
                  {/* Background Card */}
                  <div 
                    className={`hidden md:block absolute ${service.reverse ? 'left-0' : 'right-0'} top-[24px] w-[676px] h-[393px] rounded-[5px]`}
                    style={{ backgroundColor: service.bgColor }}
                  />
                  
                  {/* Text Content */}
                  <div 
                    className={`w-full md:w-[460px] ${service.reverse ? 'md:mr-[90px]' : 'md:ml-[90px]'} relative z-10 md:bg-transparent p-6 md:p-0 rounded-[5px] md:rounded-none`}
                    style={{ backgroundColor: service.bgColor }}
                  >
                    <h2 
                      className="font-['Lora'] font-bold text-[24px] md:text-[32px] mb-[22px]"
                      style={{ color: service.textColor }}
                    >
                      {service.title}
                    </h2>
                    <p 
                      className="font-['Montserrat'] font-normal text-[16px] mb-6"
                      style={{ color: service.textColor }}
                    >
                      {service.description}
                    </p>
                    <a
                      href={`/${service.slug}`}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#007ec5] text-white font-['Montserrat'] font-bold text-[16px] rounded-[5px] hover:bg-[#006aa8] transition-colors shadow-md hover:shadow-lg"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mt-12 md:mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#007ec5] shrink-0 mt-0.5" />
                      <p className="font-['Montserrat'] font-normal text-[15px] md:text-[16px] text-black">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}