import { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  link: string;
  interval?: number;
}

export function ImageCarousel({ images, alt, link, interval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <a 
      href={link}
      className="w-full md:w-[463px] h-[280px] md:h-[380px] rounded-[5px] overflow-hidden shrink-0 relative z-10 hover:opacity-95 transition-opacity block"
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${alt} ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </a>
  );
}
