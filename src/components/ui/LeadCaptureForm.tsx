import { useState } from "react";

export function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#007ec5] p-6 rounded-[5px] text-center">
        <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-['Lora'] font-bold text-[22px] text-white mb-2">
          Thank You!
        </h3>
        <p className="font-['Montserrat'] text-[15px] text-white/90">
          We'll contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#007ec5] p-6 rounded-[5px]">
      <h3 className="font-['Lora'] font-bold text-[22px] text-white mb-3 text-center">
        Get Started Today
      </h3>
      <p className="font-['Montserrat'] text-[15px] text-white/90 mb-6 text-center">
        Contact us for a free consultation and quote.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-[5px] font-['Montserrat'] text-[15px] text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15"
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-[5px] font-['Montserrat'] text-[15px] text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15"
          />
        </div>
        
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-[5px] font-['Montserrat'] text-[15px] text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15"
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 bg-white text-[#007ec5] font-['Montserrat'] font-semibold text-[16px] rounded-[5px] hover:bg-gray-100 transition-colors"
        >
          Request a Quote
        </button>
      </form>
    </div>
  );
}