import { LeadCaptureForm } from "../ui/LeadCaptureForm";

export function ServiceCTA() {
  return (
    <section className="w-full py-16 md:py-20 bg-gray-50">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="font-['Lora'] font-bold text-[32px] md:text-[40px] lg:text-[44px] text-black mb-4">
              Ready to Get Started?
            </h2>
            <p className="font-['Montserrat'] text-[16px] md:text-[18px] text-gray-700 mb-6">
              Transform your kitchen or bathroom with Rain City Kitchen & Bath. Fill out the form and we'll contact you for a free consultation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#007ec5] rounded-full"></div>
                <p className="font-['Montserrat'] text-[15px] text-gray-700">Free consultation & quote</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#007ec5] rounded-full"></div>
                <p className="font-['Montserrat'] text-[15px] text-gray-700">Expert design advice</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#007ec5] rounded-full"></div>
                <p className="font-['Montserrat'] text-[15px] text-gray-700">Professional installation</p>
              </div>
            </div>
          </div>

          {/* Right Side - Lead Capture Form */}
          <div>
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </section>
  );
}