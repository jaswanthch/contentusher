import React, { useState } from 'react';
import { Clock, Tag, BookOpen, Download, Copy, Check } from 'lucide-react';
import { BlogSuggestion } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

interface Props {
  suggestion: BlogSuggestion;
  index: number;
  businessInfo: {
    businessName: string;
    industry: string;
    location: string;
  };
  suggestions: BlogSuggestion[];
}

export default function SuggestionCard({ suggestion, index, businessInfo, suggestions }: Props) {
  const [copied, setCopied] = useState(false);

  const handleExportPDF = () => {
    const doc = generatePDF(suggestions, businessInfo);
    doc.save('seo-blog-suggestions.pdf');
  };

  const handleCopy = async () => {
    const textToCopy = `${suggestion.title}\n\n${suggestion.description}\n\nKeywords: ${suggestion.keywords.join(', ')}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
      style={{
        animationDelay: `${index * 150}ms`,
        opacity: 0,
        animation: `fadeIn 0.5s ease-out ${index * 150}ms forwards`
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{suggestion.title}</h3>
        <button
          onClick={handleCopy}
          className="p-2 text-gray-500 hover:text-[var(--primary-purple)] transition-colors rounded-lg hover:bg-[var(--light-mint)]"
          title="Copy title, description and keywords"
        >
          {copied ? (
            <Check className="w-5 h-5 text-[var(--secondary-mint)]" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <p className="text-gray-600 mb-4">{suggestion.description}</p>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{suggestion.estimatedReadTime} min read</span>
        </div>
        <div className="flex items-center text-gray-500">
          <BookOpen className="w-4 h-4 mr-1" />
          <span className="text-sm">{suggestion.difficulty}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Tag className="w-4 h-4 text-[var(--primary-purple)]" />
        {suggestion.keywords.map((keyword, idx) => (
          <span 
            key={idx}
            className="mint-tag"
          >
            {keyword}
          </span>
        ))}
      </div>

      {index === 0 && (
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 text-[var(--primary-purple)] hover:text-[var(--primary-purple-hover)] transition-colors mt-4"
        >
          <Download className="w-4 h-4" />
          Export All to PDF
        </button>
      )}
    </div>
  );
}