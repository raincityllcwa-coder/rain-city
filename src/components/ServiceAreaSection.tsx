export function ServiceAreaSection() {
  const cities = [
    "Bellevue, WA",
    "Kirkland, WA",
    "Medina, WA",
    "Newcastle, WA",
    "Woodinville, WA",
    "Yarrow Point, WA",
    "Bothell, WA",
    "Mercer Island, WA",
    "Redmond, WA",
    "Seattle, WA"
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        {/* Header */}
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-12">
          Service Area
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Google Map */}
          <div className="w-full h-[400px] md:h-[500px] rounded-[5px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172106.88087427668!2d-122.33938555!3d47.6062095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906c99b7f6fdb9%3A0x8c4e88743c5cf67f!2sRain%20City%20Kitchen%20%26%20Bath!5e0!3m2!1sen!2sus!4v1735027143591!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rain City Kitchen & Bath Location"
            />
          </div>

          {/* Right - Cities List */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-['Lora'] font-bold text-[22px] md:text-[26px] text-black">
                We are proudly serving Seattle & surrounding areas
              </h3>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {cities.map((city, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg 
                    className="w-4 h-4 shrink-0 text-[#007ec5]" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="font-['Montserrat'] text-[15px] md:text-[16px] text-gray-800">
                    {city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}