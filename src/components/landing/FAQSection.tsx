import React from 'react';

export default function FAQSection() {
  const faqs = [
    {
      question: "How accurate are the blog topics?",
      answer: "Our AI ensures the topics are relevant to your industry and SEO-focused."
    },
    {
      question: "Can I edit the generated content?",
      answer: "Absolutely! The content is editable to match your brand's voice and tone."
    },
    {
      question: "Is the content plagiarism-free?",
      answer: "Yes, all content generated is original and plagiarism-free."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Questions, Answered
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-8 last:mb-0"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}