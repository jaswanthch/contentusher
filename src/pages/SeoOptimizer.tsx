import React from 'react';
import { Target } from 'lucide-react';

export default function SeoOptimizer() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Target className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">SEO Optimizer</h1>
        </div>
        <p className="text-xl text-gray-600">Coming soon...</p>
      </header>
    </div>
  );
}