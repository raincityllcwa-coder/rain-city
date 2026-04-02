import imgCabinets from "@/assets/527501f2faa6167ff6095e533f6d5997c54352d6.webp?url";
import { useState, useEffect } from "react";

interface ServiceContentSectionProps {
  title: string;
  paragraphs: string[];
}

export function ServiceContentSection({ title, paragraphs }: ServiceContentSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    imgCabinets,
    "https://images.unsplash.com/photo-1668026694348-b73c5eb5e299?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwY2FiaW5ldHMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzUwMjMzMTF8MA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
    "https://images.unsplash.com/photo-1772567732969-c1506edf80a0?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwcmVub3ZhdGlvbiUyMGNhYmluZXRyeXxlbnwxfHx8fDE3NzUwMjMzMTF8MA&ixlib=rb-4.1.0&q=75&w=640&fm=webp",
    "https://images.unsplash.com/photo-1686023858213-9653d3248fdc?crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBraXRjaGVuJTIwY2FiaW5ldHMlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzc1MDIzMzExfDA&ixlib=rb-4.1.0&q=75&w=640&fm=webp"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col">
            <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-6 md:mb-8">
              {title}
            </h2>
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="font-['Montserrat'] text-[16px] md:text-[18px] text-gray-700 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column - Image Slider */}
          <div className="w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-[5px] overflow-hidden relative">
            {images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt="Premium cabinet solutions" 
                className={`w-full h-full object-cover rounded-[5px] absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}