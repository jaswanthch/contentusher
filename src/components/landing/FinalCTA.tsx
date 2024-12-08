import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Props {
  onGetStarted: () => void;
}

export default function FinalCTA({ onGetStarted }: Props) {
  return (
    <div className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Transform Your Blogging Game Today
        </h2>
        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Discover the easiest way to generate engaging, SEO-friendly content with AI.
        </p>
        <button
          onClick={onGetStarted}
          className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 transition-colors"
        >
          Get Started Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}