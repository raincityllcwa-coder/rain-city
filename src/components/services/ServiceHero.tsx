import imgHeroBg from "@/assets/c4e93df24993f176102d516e4e5e7a4fd86822b6.webp?url";

export function ServiceHero() {
  return (
    <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={imgHeroBg} 
          alt="Our Services" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="max-w-[1150px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-['Lora'] font-bold text-[40px] md:text-[56px] lg:text-[64px] text-white mb-4 md:mb-6">
            Kitchen & Bathroom Experts
          </h1>
          <p className="font-['Montserrat'] font-normal text-[18px] md:text-[20px] lg:text-[22px] text-white max-w-[700px] mx-auto">
            Cabinets • Countertops • Complete Remodels
          </p>
        </div>
      </div>
    </section>
  );
}