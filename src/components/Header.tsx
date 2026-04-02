import imgTelephoneIcon from "@/assets/a7886c55528f6e197789a4b7d647dd63cdc250d2.webp?url";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <>
      {/* Top Navigation - Desktop Only */}
      <div className="bg-[#f3f3f3] w-full hidden md:block">
        <div className="max-w-[1150px] mx-auto px-4 md:px-8 h-[50px] flex items-center justify-end">
          <div className="flex items-center gap-[15px]">
            <img
              src={imgTelephoneIcon}
              alt=""
              className="size-[22px] object-cover"
            />
            <p className="font-['Montserrat'] font-medium text-[14px] md:text-[16px] text-black whitespace-nowrap">
              Call Us: (253) 466-8709
            </p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white w-full z-50">
        <div className="max-w-[1150px] mx-auto px-4 md:px-8 py-3 md:py-[25px] md:pb-[28px]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex flex-col gap-[2px] md:gap-[7px] shrink-0">
              <p className="font-['Lora'] font-bold text-[24px] md:text-[30px] text-[#051e2a] uppercase leading-[30px] md:leading-tight whitespace-nowrap">
                Rain City
              </p>
              <div className="h-[1px] bg-[#051e2a] opacity-40 min-w-[120px] md:w-full" />
              <p className="font-['Montserrat'] font-normal text-[16px] md:text-[20px] text-[#051e2a] leading-[20px] md:leading-tight whitespace-nowrap">
                Kitchen & Bath
              </p>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-[29px] items-center text-[18px] text-black">
              <a href="/" className="font-['Montserrat'] font-medium hover:text-[#007ec5] transition-colors">
                Home
              </a>
              <a href="/our-services" className="font-['Montserrat'] font-normal hover:text-[#007ec5] transition-colors">
                Our Services
              </a>
              <a href="/about" className="font-['Montserrat'] font-normal hover:text-[#007ec5] transition-colors">
                About Us
              </a>
              <a href="/contact" className="font-['Montserrat'] font-normal hover:text-[#007ec5] transition-colors">
                Contact
              </a>
            </nav>

            {/* Mobile Phone & Menu Buttons */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Phone Icon */}
              <a href="tel:2534668709" className="flex items-center">
                <img
                  src={imgTelephoneIcon}
                  alt="Call us"
                  className="w-[22px] h-[22px] object-cover"
                />
              </a>

              {/* Mobile Menu Button */}
              <button
                className="flex flex-col gap-[5px] w-6 h-6 justify-center items-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`w-6 h-[2px] bg-black transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`w-6 h-[2px] bg-black transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-[2px] bg-black transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-6 flex flex-col gap-4 pb-4 border-t pt-4">
              <a
                href="/"
                className="font-['Montserrat'] font-medium text-[16px] text-black hover:text-[#007ec5] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/our-services"
                className="font-['Montserrat'] font-normal text-[16px] text-black hover:text-[#007ec5] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Services
              </a>
              <a
                href="/about"
                className="font-['Montserrat'] font-normal text-[16px] text-black hover:text-[#007ec5] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="/contact"
                className="font-['Montserrat'] font-normal text-[16px] text-black hover:text-[#007ec5] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}