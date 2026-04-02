import { useState } from "react";
import { Plus, X } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const kitchenFAQs: FAQItem[] = [
  {
    question: "How long does a kitchen remodel take?",
    answer: "A typical kitchen remodel takes 6-12 weeks, depending on the scope of work. Minor updates like cabinet refacing or countertop replacement can be completed in 2-4 weeks, while full-scale renovations with layout changes, new plumbing, and electrical work may take 3-4 months. We provide a detailed timeline during the consultation phase."
  },
  {
    question: "Do I need permits for a kitchen remodel?",
    answer: "Yes, most kitchen remodels require permits, especially if you're making structural changes, moving plumbing or electrical, or changing the layout. We handle all permit applications and ensure your project meets local building codes in Bellevue and surrounding areas."
  },
  {
    question: "What is the most expensive part of a kitchen remodel?",
    answer: "Cabinetry typically accounts for 30-40% of your kitchen remodel budget, making it the most expensive component. High-quality custom or semi-custom cabinets can significantly impact the overall cost. Other major expenses include countertops, appliances, and labor for installation."
  },
  {
    question: "Can I live in my home during a kitchen remodel?",
    answer: "Yes, many homeowners stay in their homes during a kitchen remodel. We set up a temporary kitchen space with essentials like a microwave, coffee maker, and mini-fridge. We also maintain a clean work environment and establish clear work hours to minimize disruption to your daily routine."
  },
  {
    question: "What is the best countertop material for kitchens?",
    answer: "Quartz is our most popular recommendation due to its durability, low maintenance, and wide variety of colors and patterns. It's non-porous, resistant to stains and scratches, and doesn't require sealing. Granite and quartzite are excellent natural stone alternatives, while marble offers timeless elegance for those willing to maintain it."
  },
  {
    question: "Should I reface or replace my kitchen cabinets?",
    answer: "Cabinet refacing is a cost-effective option if your existing cabinet boxes are structurally sound and you like your current layout. It costs 30-50% less than full replacement. However, if you want to change the layout, add storage, or your cabinets are damaged or outdated, full replacement is the better long-term investment."
  },
  {
    question: "Do you offer financing options for kitchen remodeling?",
    answer: "Yes, we partner with trusted financing providers to offer flexible payment plans for your kitchen remodel. We can help you find options that fit your budget, including low-interest loans and special promotional financing. Contact us to discuss the best financing solution for your project."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#f0f0f0] py-12 md:py-16 lg:py-20">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        {/* Title */}
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-12">
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4 md:gap-5">
          {kitchenFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-[20px] shadow-sm overflow-hidden transition-all"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-['Montserrat'] font-bold text-[16px] md:text-[18px] lg:text-[20px] text-black pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center">
                  {openIndex === index ? (
                    <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  ) : (
                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  )}
                </div>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <p className="font-['Montserrat'] text-[14px] md:text-[16px] text-[#404040] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}