import { useState, useEffect } from "react";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: (string | CarouselImage)[];
  alt?: string;
  link: string;
  interval?: number;
}

export function ImageCarousel({ images, alt = "", link, interval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const getImageSrc = (img: string | CarouselImage) =>
    typeof img === "string" ? img : img.src;

  const getImageAlt = (img: string | CarouselImage, index: number) =>
    typeof img === "string" ? `${alt} ${index + 1}` : img.alt;

  return (
    <a
      href={link}
      className="w-full md:w-[463px] h-[280px] md:h-[380px] rounded-[5px] overflow-hidden shrink-0 relative z-10 hover:opacity-95 transition-opacity block"
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={getImageSrc(image)}
          alt={getImageAlt(image, index)}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(min-width: 768px) 463px, 100vw"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </a>
  );
}
