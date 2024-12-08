import React from 'react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Props {
  benefits: Benefit[];
}

export default function BenefitsSection({ benefits }: Props) {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Results You Can Expect
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="inline-block p-3 bg-indigo-50 rounded-lg text-[var(--primary)] mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <blockquote className="text-xl italic text-gray-600 max-w-3xl mx-auto">
            "I've saved so much time and seen a significant boost in my website traffic. This tool is a game-changer!"
          </blockquote>
        </div>
      </div>
    </div>
  );
}