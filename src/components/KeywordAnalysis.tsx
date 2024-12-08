import React, { useState, useEffect } from 'react';
import { Hash, FileText, Copy, Check, Loader2 } from 'lucide-react';
import { generateSeoAnalysis } from '../services/openai';

interface Props {
  content: string;
  brief: string;
}

interface KeywordSuggestion {
  keyword: string;
  type: 'primary' | 'question';
  searchIntent: 'informational' | 'commercial' | 'navigational' | 'transactional';
}

interface SeoAnalysis {
  focusKeywords: KeywordSuggestion[];
  seoDescription: string;
}

export default function KeywordAnalysis({ content, brief }: Props) {
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [copiedDescription, setCopiedDescription] = useState(false);
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeSeo = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await generateSeoAnalysis(brief);
        setAnalysis(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate SEO analysis');
        console.error('Error generating SEO analysis:', err);
      } finally {
        setLoading(false);
      }
    };

    if (brief) {
      analyzeSeo();
    }
  }, [brief]);

  const handleCopyKeyword = async (keyword: string) => {
    try {
      await navigator.clipboard.writeText(keyword);
      setCopiedKeyword(keyword);
      setTimeout(() => setCopiedKeyword(null), 2000);
    } catch (err) {
      console.error('Failed to copy keyword:', err);
    }
  };

  const handleCopyDescription = async () => {
    if (!analysis?.seoDescription) return;
    try {
      await navigator.clipboard.writeText(analysis.seoDescription);
      setCopiedDescription(true);
      setTimeout(() => setCopiedDescription(false), 2000);
    } catch (err) {
      console.error('Failed to copy description:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2 p-8">
        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        <span className="text-gray-600">Analyzing content...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6 bg-indigo-50 rounded-lg p-4 mt-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Hash className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Focus Keywords</h3>
        </div>
        <div className="space-y-2">
          {analysis.focusKeywords.map((kw, index) => (
            <div 
              key={index}
              className="flex items-center justify-between bg-white rounded-lg p-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-700">{kw.keyword}</span>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    kw.type === 'question' 
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {kw.type}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                    {kw.searchIntent}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleCopyKeyword(kw.keyword)}
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50"
                title="Copy keyword"
              >
                {copiedKeyword === kw.keyword ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">SEO Description</h3>
          </div>
          <button
            onClick={handleCopyDescription}
            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-white"
            title="Copy description"
          >
            {copiedDescription ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-gray-700 text-sm">{analysis.seoDescription}</p>
          <div className="flex justify-end mt-2">
            <span className={`text-xs ${
              analysis.seoDescription.length === 150 ? 'text-green-500' : 'text-red-500'
            }`}>
              {analysis.seoDescription.length}/150 characters
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}