import { useState } from "react";

export function LeadFormSection() {
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
    <section id="contact" className="w-full py-12 md:py-16 lg:py-20 bg-[#f7f6f1]">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <div className="max-w-[767px]">
          <h2 className="font-['Lora'] font-semibold text-[24px] md:text-[28px] text-black mb-8 md:mb-[50px]">
            Request Quote Online and Get 10% Discount!
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] mb-[50px] max-w-[456px]">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[50px] px-[13px] py-[14px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:border-[#007ec5]"
            />
            
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[50px] px-[14px] py-[15px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:border-[#007ec5]"
            />
            
            <textarea
              placeholder="A Few Words About Your Project"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[106px] px-[14px] py-[15px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] resize-none focus:outline-none focus:border-[#007ec5]"
            />
          </form>

          <p className="font-['Montserrat'] font-normal text-[14px] text-[#404040] mb-[50px] max-w-[449px]">
            We respect your time—no spam or ads, just a free quote and discount for your project if you're interested.
          </p>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#007ec5] border border-[#007ec5] rounded-[5px] h-[50px] w-full md:w-auto md:px-[105px] py-[15px] font-['Montserrat'] font-bold text-[16px] text-white hover:bg-[#006ba8] transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}