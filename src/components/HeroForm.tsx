import { useState } from "react";

export function HeroForm() {
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
    setTimeout(() => {
      setFormData({ name: "", phone: "", details: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-[20px] w-full lg:max-w-[379px] p-6 md:p-10 shadow-xl mt-auto lg:mt-0">
      <h2 className="font-['Lora'] font-semibold text-[22px] md:text-[28px] text-black text-center mb-5 leading-tight">
        Request Quote Online<br />
        and Get 10% Discount!
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[50px] px-[14px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:border-[#007ec5]"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
    </div>
  );
}
