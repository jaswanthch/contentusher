import React, { useState, useEffect } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { BlogSuggestion, BlogSuggestionsFormData } from '../types';
import { generateBlogSuggestions } from '../services/openai';
import BlogSuggestionsForm from '../components/BlogSuggestionsForm';
import SuggestionCard from '../components/SuggestionCard';
import ProjectRequired from '../components/ProjectRequired';
import { useCurrentProject } from '../hooks/useCurrentProject';
import { useGeneratedContent } from '../hooks/useGeneratedContent';

export default function BlogSuggestions() {
  const { currentProject } = useCurrentProject();
  const { content, updateContent } = useGeneratedContent(currentProject?.id || '');
  const [suggestions, setSuggestions] = useState<BlogSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved suggestions when component mounts
  useEffect(() => {
    if (content.blogSuggestions) {
      setSuggestions(content.blogSuggestions);
    }
  }, [content.blogSuggestions]);

  const handleGenerateSuggestions = async (formData: BlogSuggestionsFormData) => {
    if (!currentProject) return;
    
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    
    try {
      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured');
      }
      
      const newSuggestions = await generateBlogSuggestions({
        ...formData,
        businessName: currentProject.name,
        industry: currentProject.industry,
        location: currentProject.location
      });
      setSuggestions(newSuggestions);
      updateContent('blogSuggestions', newSuggestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate suggestions');
      console.error('Error generating suggestions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectRequired>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-10 h-10 text-[var(--primary)]" />
            <h1 className="text-4xl font-bold text-gray-900">Blog Idea Generator</h1>
          </div>
          <p className="text-xl text-gray-600">Generate SEO-optimized blog topics for {currentProject?.name}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <BlogSuggestionsForm 
              onSubmit={handleGenerateSuggestions} 
              isLoading={isLoading}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg animate-fadeIn">
                {error}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {(suggestions.length > 0 || isLoading) && (
              <div className="flex items-center gap-2 mb-6 animate-fadeIn">
                <Sparkles className="w-5 h-5 text-[var(--primary)]" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {isLoading ? 'Generating Ideas...' : 'Generated Suggestions'}
                </h2>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--primary)]"></div>
              </div>
            )}
            {suggestions.map((suggestion, index) => (
              <SuggestionCard 
                key={index} 
                suggestion={suggestion} 
                index={index}
                businessInfo={{
                  businessName: currentProject!.name,
                  industry: currentProject!.industry,
                  location: currentProject!.location
                }}
                suggestions={suggestions}
              />
            ))}
          </div>
        </div>
      </div>
    </ProjectRequired>
  );
}