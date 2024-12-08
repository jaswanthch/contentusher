import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import { InstagramPost, InstagramPostFormData } from '../types';
import { generateInstagramPosts } from '../services/openai';
import InstagramForm from '../components/InstagramForm';
import InstagramPreview from '../components/InstagramPreview';
import ProjectRequired from '../components/ProjectRequired';
import { useCurrentProject } from '../hooks/useCurrentProject';

export default function InstagramGenerator() {
  const { currentProject } = useCurrentProject();
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: InstagramPostFormData) => {
    if (!currentProject) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const generatedPosts = await generateInstagramPosts({
        ...formData,
        businessName: currentProject.name,
        industry: currentProject.industry
      });
      setPosts(generatedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate Instagram posts');
      console.error('Error generating Instagram posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectRequired>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-10 h-10 text-[var(--primary)]" />
            <h1 className="text-4xl font-bold text-gray-900">Instagram Post Generator</h1>
          </div>
          <p className="text-xl text-gray-600">Create engaging Instagram content for {currentProject?.name}</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <InstagramForm 
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="animate-spin h-8 w-8 border-4 border-[var(--primary)] border-t-transparent rounded-full"></div>
                <p className="text-gray-600">Generating your Instagram posts...</p>
              </div>
            ) : posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Post {index + 1}</h2>
                  <InstagramPreview post={post} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Your generated Instagram posts will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProjectRequired>
  );
}