import { useState } from "react";

export function WideLeadFormSection() {
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
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[#f7f6f1]">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <div className="bg-white rounded-[20px] p-8 md:p-12 shadow-lg">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-['Lora'] font-bold text-[28px] md:text-[36px] text-black text-center mb-3">
              Request Quote Online and Get 10% Discount!
            </h2>
            
            <p className="font-['Montserrat'] text-[16px] md:text-[18px] text-gray-700 text-center mb-8">
              Fill out the form below and our team will contact you shortly with a free estimate.
            </p>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-['Montserrat'] text-[20px] text-[#007ec5] font-semibold">
                  Thank you! We'll contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[56px] px-[18px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:border-[#007ec5] transition-colors"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[56px] px-[18px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:border-[#007ec5] transition-colors"
                  />
                </div>
                
                <textarea
                  placeholder="A Few Words About Your Project"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="bg-[#f5f5f5] border border-[#e6e6e6] rounded-[5px] h-[120px] px-[18px] py-[16px] font-['Montserrat'] text-[16px] text-black placeholder:text-[#898989] resize-none focus:outline-none focus:border-[#007ec5] transition-colors"
                />
                
                <p className="font-['Montserrat'] font-normal text-[14px] text-[#404040] text-center">
                  We respect your time—no spam or ads, just a free quote and discount for your project if you're interested.
                </p>
                
                <button
                  type="submit"
                  className="bg-[#007ec5] border border-[#007ec5] rounded-[5px] h-[56px] font-['Montserrat'] font-bold text-[18px] text-white hover:bg-[#006ba8] transition-colors"
                >
                  Get Your Free Quote
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
