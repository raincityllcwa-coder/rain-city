import { Award, Users, Clock, Shield } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description: "Quality work on every project"
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Years of remodeling expertise"
  },
  {
    icon: Clock,
    title: "On-Time Completion",
    description: "We respect your schedule"
  },
  {
    icon: Shield,
    title: "Full Warranty",
    description: "Materials & workmanship covered"
  }
];

export function ServiceBenefits() {
  return (
    <section className="w-full py-16 md:py-20 bg-[#f8f8f8]">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-['Lora'] font-bold text-[28px] md:text-[36px] text-black mb-4">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="bg-white p-6 rounded-[5px] text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#007ec5]/10 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-[#007ec5]" />
                </div>
                <h3 className="font-['Lora'] font-bold text-[18px] md:text-[20px] text-black mb-2">
                  {benefit.title}
                </h3>
                <p className="font-['Montserrat'] text-[15px] text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}