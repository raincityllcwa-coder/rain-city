import { useState, useEffect } from "react";
import { ArrowUp, Phone } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isVisible && (
        <>
          {/* Mobile: Call Button */}
          <a
            href="tel:2534668709"
            className="md:hidden fixed bottom-8 right-8 bg-[#007ec5] text-white size-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
            aria-label="Call us"
          >
            <Phone className="w-6 h-6" />
          </a>

          {/* Desktop: Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="hidden md:flex fixed bottom-8 right-8 bg-[#007ec5] text-white size-12 rounded-full shadow-lg items-center justify-center hover:bg-[#006ba8] transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </>
      )}
    </>
  );
}