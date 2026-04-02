import { Wrench, Layers, Droplet } from "lucide-react";

const services = [
  {
    id: "kitchen-cabinets",
    title: "Kitchen Cabinets",
    icon: Wrench,
    tagline: "Custom & Standard Options",
  },
  {
    id: "kitchen-countertops",
    title: "Kitchen Countertops",
    icon: Layers,
    tagline: "Quartz, Granite & Marble",
  },
  {
    id: "bathroom-remodel",
    title: "Bathroom Remodel",
    icon: Droplet,
    tagline: "Complete Transformations",
  },
];

export function ServicesQuickNav() {
  const scrollToService = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services-navigation" className="w-full py-12 md:py-16 bg-white border-b border-gray-200">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 text-center">
          What We Do
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => scrollToService(service.id)}
                className="bg-gray-50 p-6 rounded-[5px] text-left cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-[5px]">
                    <Icon className="w-6 h-6 text-[#007ec5]" />
                  </div>
                  <div>
                    <h3 className="font-['Lora'] font-bold text-[20px] text-black mb-1">
                      {service.title}
                    </h3>
                    <p className="font-['Montserrat'] text-[14px] text-gray-600">
                      {service.tagline}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}