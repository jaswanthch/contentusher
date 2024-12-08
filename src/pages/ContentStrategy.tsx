import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { ContentStrategy as ContentStrategyType, ContentStrategyFormData } from '../types';
import { generateContentStrategy } from '../services/openai';
import ContentStrategyForm from '../components/ContentStrategyForm';
import ContentStrategyPreview from '../components/ContentStrategyPreview';
import ProjectRequired from '../components/ProjectRequired';
import { useCurrentProject } from '../hooks/useCurrentProject';

export default function ContentStrategy() {
  const { currentProject } = useCurrentProject();
  const [strategy, setStrategy] = useState<ContentStrategyType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');

  const handleGenerate = async (formData: ContentStrategyFormData) => {
    if (!currentProject) return;
    
    setIsLoading(true);
    setError(null);
    setSelectedPlatform(formData.platform);
    
    try {
      const generatedStrategy = await generateContentStrategy({
        ...formData,
        businessName: currentProject.name,
        industry: currentProject.industry
      });
      setStrategy(generatedStrategy);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content strategy');
      console.error('Error generating content strategy:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectRequired>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-10 h-10 text-[var(--primary)]" />
            <h1 className="text-4xl font-bold text-gray-900">Content Strategy</h1>
          </div>
          <p className="text-xl text-gray-600">Create a detailed social media strategy for {currentProject?.name}</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <ContentStrategyForm 
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="animate-spin h-8 w-8 border-4 border-[var(--primary)] border-t-transparent rounded-full"></div>
                <p className="text-gray-600">Generating your content strategy...</p>
              </div>
            ) : strategy ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <ContentStrategyPreview 
                  strategy={strategy}
                  businessInfo={{
                    businessName: currentProject!.name,
                    industry: currentProject!.industry,
                    platform: selectedPlatform
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Your generated content strategy will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProjectRequired>
  );
}