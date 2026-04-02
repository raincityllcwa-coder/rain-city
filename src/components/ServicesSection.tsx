import imgServiceImage from "@/assets/c4e93df24993f176102d516e4e5e7a4fd86822b6.webp?url";
import imgServiceImage1 from "@/assets/45b63473772ac5eedb2419a124f3a11b4a82ba56.webp?url";
import imgServiceImage2 from "@/assets/2221dd725ae6402fca45a45bd79869231da67ce7.webp?url";
import { ImageCarousel } from "./ui/ImageCarousel";

const kitchenCabinetsImages = [
  imgServiceImage,
  "https://images.unsplash.com/photo-1729850697938-2ecbec622dc4?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNoYWtlciUyMGtpdGNoZW4lMjBjYWJpbmV0c3xlbnwxfHx8fDE3NzQ0MTgyMTR8MA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
  "https://images.unsplash.com/photo-1668026694348-b73c5eb5e299?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwY2FiaW5ldHMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQ0MTgyMTR8MA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
  "https://images.unsplash.com/photo-1758548157243-f4ef3e614684?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwY2FiaW5ldHMlMjBkZXNpZ258ZW58MXx8fHwxNzc0NDE4MjE1fDA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
];

const kitchenCountertopsImages = [
  imgServiceImage1,
  "https://images.unsplash.com/photo-1616596612351-5a7ae04e2840?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFydHolMjBraXRjaGVuJTIwY291bnRlcnRvcHxlbnwxfHx8fDE3NzQ0MTgyMTV8MA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
  "https://images.unsplash.com/photo-1637271325753-123cd629f148?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuaXRlJTIwY291bnRlcnRvcCUyMGtpdGNoZW58ZW58MXx8fHwxNzc0NDE4MjE1fDA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
  "https://images.unsplash.com/photo-1760072513457-651955c7074d?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBraXRjaGVuJTIwaXNsYW5kfGVufDF8fHx8MTc3NDQxODIxNnww&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
];

const bathroomRemodelImages = [
  imgServiceImage2,
  "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMHRpbGV8ZW58MXx8fHwxNzc0NDE4MjE2fDA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
  "https://images.unsplash.com/photo-1762418362644-a4daad168fb9?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMHJlbW9kZWx8ZW58MXx8fHwxNzc0MzY0MTkwfDA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
  "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmF0aHJvb20lMjBzaG93ZXJ8ZW58MXx8fHwxNzc0NDE4MjE3fDA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
];

export function ServicesSection() {
  return (
    <section id="services" className="w-full py-12 md:py-16 lg:py-20">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-11">
          Our Services
        </h2>
        
        <div className="flex flex-col gap-12 md:gap-[68px]">
          {/* Kitchen Cabinets */}
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-center">
              {/* Image */}
              <ImageCarousel 
                images={kitchenCabinetsImages}
                alt="Kitchen Cabinets"
                link="/kitchen-cabinets"
              />
              
              {/* Background Card */}
              <div className="hidden md:block absolute right-0 top-[24px] w-[676px] h-[393px] bg-[#f7f6f1] rounded-[5px]" />
              
              {/* Text Content */}
              <div className="w-full md:w-[460px] md:ml-[90px] relative z-10 bg-[#f7f6f1] md:bg-transparent p-6 md:p-0 rounded-[5px] md:rounded-none">
                <h3 className="font-['Lora'] font-bold text-[20px] md:text-[24px] text-[#3b350e] mb-[22px]">
                  Kitchen Cabinets
                </h3>
                <p className="font-['Montserrat'] font-normal text-[16px] text-black">
                  At Rain City Kitchen & Bath, we specialize in both standard and custom cabinets to meet your unique needs. Our clients can choose from a variety of styles and color schemes, with Shaker and Flat door styles being the most popular. We're committed to delivering high-quality craftsmanship that complements your home's aesthetic.
                </p>
                <a 
                  href="/kitchen-cabinets"
                  className="inline-block mt-4 font-['Montserrat'] font-semibold text-[15px] text-[#007ec5] hover:underline"
                >
                  Learn More →
                </a>
              </div>
            </div>
          </div>

          {/* Kitchen Countertops */}
          <div className="relative">
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-0 items-center">
              {/* Image */}
              <ImageCarousel 
                images={kitchenCountertopsImages}
                alt="Kitchen Countertops"
                link="/kitchen-countertops"
              />
              
              {/* Background Card */}
              <div className="hidden md:block absolute left-0 top-[24px] w-[676px] h-[393px] bg-[#f1f3f7] rounded-[5px]" />
              
              {/* Text Content */}
              <div className="w-full md:w-[460px] md:mr-[90px] relative z-10 bg-[#f1f3f7] md:bg-transparent p-6 md:p-0 rounded-[5px] md:rounded-none">
                <h3 className="font-['Lora'] font-bold text-[22px] md:text-[24px] text-[#021b3c] mb-[22px]">
                  Kitchen Countertops
                </h3>
                <p className="font-['Montserrat'] font-normal text-[16px] text-[#021b3c]">
                  We offer a wide variety of countertop materials, including quartz, granite, and marble, available in different styles, colors, and thicknesses to suit your needs. Our comprehensive services include delivery, precise fabrication (processing and cutting), and professional installation to ensure a perfect fit for your space.
                </p>
                <a 
                  href="/kitchen-countertops"
                  className="inline-block mt-4 font-['Montserrat'] font-semibold text-[15px] text-[#007ec5] hover:underline"
                >
                  Learn More →
                </a>
              </div>
            </div>
          </div>

          {/* Bathroom Remodel */}
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-center">
              {/* Image */}
              <ImageCarousel 
                images={bathroomRemodelImages}
                alt="Bathroom Remodel"
                link="/bathroom-remodel"
              />
              
              {/* Background Card */}
              <div className="hidden md:block absolute right-0 top-[24px] w-[676px] h-[393px] bg-[#f7f6f1] rounded-[5px]" />
              
              {/* Text Content */}
              <div className="w-full md:w-[460px] md:ml-[90px] relative z-10 bg-[#f7f6f1] md:bg-transparent p-6 md:p-0 rounded-[5px] md:rounded-none">
                <h3 className="font-['Lora'] font-bold text-[22px] md:text-[24px] text-[#3b350e] mb-[22px]">
                  Bathroom Remodel
                </h3>
                <p className="font-['Montserrat'] font-normal text-[16px] text-black">
                  Transform your bathroom with our high-quality materials, including porcelain tile, natural stone, or glass tile. We offer a wide range of styles and finishes to create the perfect look for your space. Our services include professional design consultation, material selection, and expert installation to ensure a flawless finish.
                </p>
                <a 
                  href="/bathroom-remodel"
                  className="inline-block mt-4 font-['Montserrat'] font-semibold text-[15px] text-[#007ec5] hover:underline"
                >
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}