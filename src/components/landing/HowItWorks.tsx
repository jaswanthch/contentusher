import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Props {
  onGetStarted: () => void;
}

export default function HowItWorks({ onGetStarted }: Props) {
  const steps = [
    {
      number: "01",
      title: "Create a Project",
      description: "Set up your business profile with key information and goals."
    },
    {
      number: "02",
      title: "Choose Your Platform",
      description: "Select where you want to create content - blog, Instagram, or Google Business."
    },
    {
      number: "03",
      title: "Generate Content",
      description: "Get AI-powered content suggestions and full posts tailored to your brand."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Three Steps to Better Content
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              <div className="text-4xl font-bold text-[var(--primary)] opacity-25 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
          >
            Start Creating
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}