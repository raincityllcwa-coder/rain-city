import { useState } from "react";

interface ServiceLandingHeroProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

export function ServiceLandingHero({ backgroundImage, title, subtitle }: ServiceLandingHeroProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    details: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", phone: "", details: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[630px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1150px] mx-auto px-4 md:px-8 py-8 md:py-[37px] w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[100px] items-center justify-between">
          {/* Hero Text */}
          <div className="flex flex-col gap-[12px] md:gap-[15px] w-full lg:w-[441px] text-center lg:text-left">
            <h1 className="font-['Lora'] font-bold text-[28px] md:text-[36px] lg:text-[42px] text-white leading-tight">
              {title}
            </h1>
            <p className="font-['Montserrat'] font-normal text-[16px] md:text-[18px] text-white">
              {subtitle}
            </p>
            
            {/* Google Review Stars */}
            <div className="flex gap-[7px] items-center justify-start">
              <img 
                src="https://cdn.shopify.com/s/files/1/0653/0800/0327/files/Google__G__logo.svg_1.png?v=1775025649" 
                alt="" 
                className="w-[19px] h-[19px]"
              />
              <img 
                src="https://cdn.shopify.com/s/files/1/0653/0800/0327/files/star_10_6.png?v=1775025700" 
                alt="" 
                className="w-[19px] h-[19px]"
              />
              <img 
                src="https://cdn.shopify.com/s/files/1/0653/0800/0327/files/star_10_6.png?v=1775025700" 
                alt="" 
                className="w-[19px] h-[19px]"
              />
              <img 
                src="https://cdn.shopify.com/s/files/1/0653/0800/0327/files/star_10_6.png?v=1775025700" 
                alt="" 
                className="w-[19px] h-[19px]"
              />
              <img 
                src="https://cdn.shopify.com/s/files/1/0653/0800/0327/files/star_10_6.png?v=1775025700" 
                alt="" 
                className="w-[19px] h-[19px]"
              />
              <img 
                src="https://cdn.shopify.com/s/files/1/0653/0800/0327/files/star_10_6.png?v=1775025700" 
                alt="" 
                className="w-[19px] h-[19px]"
              />
              <span className="font-['Montserrat'] font-medium text-[16px] text-white/90 ml-2">
                5.0 (114 reviews)
              </span>
            </div>
            
            {/* Badge Image and Text */}
            <div className="flex gap-3 items-center justify-start mt-1">
              <img 
                src="https://cdn.shopify.com/s/files/1/0653/0800/0327/files/image_1.png?v=1775025861" 
                alt="" 
                className="w-[90px] h-auto"
              />
              <p className="font-['Montserrat'] font-bold text-[16px] md:text-[18px] text-white">
                Bellevue's Top Kitchen & Bath Contractor
              </p>
            </div>
          </div>

          {/* Hero Form */}
          <div className="bg-white rounded-[20px] w-full max-w-[379px] p-6 md:p-10 shadow-xl">
            <h2 className="font-['Lora'] font-semibold text-[24px] md:text-[28px] text-black text-center mb-5">
              Request Quote Online<br />
              and Get 10% Discount!
            </h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <p className="font-['Montserrat'] text-[18px] text-[#007ec5] font-semibold">
                  Thank you! We'll contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[50px] px-[14px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:border-[#007ec5]"
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[50px] px-[14px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:border-[#007ec5]"
                />
                
                <textarea
                  placeholder="A Few Words About Your Project"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[106px] px-[14px] py-[15px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] resize-none focus:outline-none focus:border-[#007ec5]"
                />
                
                <p className="font-['Montserrat'] font-normal text-[14px] text-[#404040] text-center">
                  We respect your time—no spam or ads, just a free quote and discount for your project if you're interested.
                </p>
                
                <button
                  type="submit"
                  className="bg-[#007ec5] border border-[#007ec5] rounded-[5px] h-[50px] font-['Montserrat'] font-bold text-[16px] text-white hover:bg-[#006ba8] transition-colors"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}