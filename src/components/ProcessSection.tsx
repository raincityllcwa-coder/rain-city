import imgEstimateIcon from "@/assets/08c1caf6d9c8451a5c95441d4948ff5e26e0e604.webp?url";
import imgStep2Icon from "@/assets/6f6eb3ad4a3535b5ed60d144637537fc32372215.webp?url";
import imgStep3Icon from "@/assets/0909620456d5f363791371d9f70bca9287bbdc2f.webp?url";
import imgStep4Icon from "@/assets/80944d9fb7978f052d1b645c3165386db175027a.webp?url";
import imgImageTruck from "@/assets/fbbb6409e9a1a828350fc9b7aa50fd0fa7c0bd82.webp?url";
import imgCheckIcon from "@/assets/526d83751c3000a713464257d29eae63c3fbe410.webp?url";
import svgPaths from "@/imports/svg-wsv765tdfn";

export function ProcessSection() {
  const steps = [
    {
      icon: imgEstimateIcon,
      title: "Request a Free Estimate",
      description: "Get a free estimate for your project and get 10% discount."
    },
    {
      icon: imgStep2Icon,
      title: "Measurements",
      description: "Our team takes precise measurements of your walls and rooms to ensure accuracy."
    },
    {
      icon: imgStep3Icon,
      title: "Design and Visualization",
      description: "We create a detailed project plan and a 3D visualization to help you envision the final result."
    },
    {
      icon: imgStep4Icon,
      title: "Approval and Execution",
      description: "Once you approve the project, we handle the purchase and delivery of all materials and begin the work."
    }
  ];

  const additionalServices = [
    "Purchase and Delivery of Materials: Let us handle the sourcing and delivery of materials, so you can focus on the bigger picture.",
    "Dismantling Works: We can efficiently dismantle existing structures or fixtures as part of your renovation or remodeling project.",
    "Garbage Removal: Our team ensures that all waste and debris are properly disposed of, leaving your space clean and ready for the next steps."
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-[71px]">
          Our Proсess
        </h2>
        
        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[26px] mb-12 md:mb-[71px]">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col gap-[27px]">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-[16px]">
                <img 
                  src={step.icon} 
                  alt="" 
                  className="size-[60px] object-cover shrink-0"
                />
                <h3 className="font-['Lora'] font-bold text-[20px] lg:text-[22px] text-[#3b350e] flex-1">
                  {step.title}
                </h3>
              </div>
              <p className="font-['Montserrat'] font-normal text-[16px] text-black">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full mb-12 md:mb-[71px]">
          <svg className="w-full h-[17px]" viewBox="0 0 1123 17.3205" fill="none" preserveAspectRatio="none">
            <path d={svgPaths.p11a88e00} fill="#A1A1A1" />
          </svg>
        </div>

        {/* Additional Services */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-[61px] items-center">
          <div className="w-full md:w-[440px] h-[320px] md:h-[424px] rounded-[5px] overflow-hidden shrink-0">
            <img 
              src={imgImageTruck} 
              alt="Delivery truck" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 md:gap-[25px] w-full md:w-[613px]">
            <h3 className="font-['Lora'] font-bold text-[22px] md:text-[24px] text-[#3b350e]">
              Additional Services
            </h3>
            
            <div className="font-['Montserrat'] font-normal text-[16px] text-black">
              <p className="mb-2">Additional Services for Your Convenience</p>
              <p className="mb-4">
                To make your project as seamless as possible, we offer a range of additional services:
              </p>
            </div>

            <div className="flex flex-col gap-[21px]">
              {additionalServices.map((service, index) => (
                <div key={index} className="flex gap-[11px] items-start">
                  <img 
                    src={imgCheckIcon} 
                    alt="" 
                    className="size-[18px] object-cover shrink-0 mt-0.5"
                  />
                  <p className="font-['Montserrat'] font-normal text-[16px] text-black flex-1">
                    {service}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-['Montserrat'] font-normal text-[16px] text-black">
              Contact us to learn more about how these services can benefit your project!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}