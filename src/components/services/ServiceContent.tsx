interface ServiceContentProps {
  title: string;
  paragraphs: string[];
}

export function ServiceContent({ title, paragraphs }: ServiceContentProps) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-['Lora'] font-bold text-[28px] md:text-[36px] lg:text-[42px] text-black mb-6 md:mb-8 text-center">
            {title}
          </h2>
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className="font-['Montserrat'] text-[16px] md:text-[18px] text-gray-700 leading-relaxed text-center"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
