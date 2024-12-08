import React, { useState } from 'react';
import { Store } from 'lucide-react';
import { GooglePost, GooglePostFormData } from '../types';
import { generateGooglePosts } from '../services/openai';
import GoogleBusinessForm from '../components/GoogleBusinessForm';
import GoogleBusinessPreview from '../components/GoogleBusinessPreview';
import ProjectRequired from '../components/ProjectRequired';
import { useCurrentProject } from '../hooks/useCurrentProject';

export default function GoogleBusinessGenerator() {
  const { currentProject } = useCurrentProject();
  const [posts, setPosts] = useState<GooglePost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: GooglePostFormData) => {
    if (!currentProject) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const generatedPosts = await generateGooglePosts({
        ...formData,
        businessName: currentProject.name,
        industry: currentProject.industry,
        location: currentProject.location
      });
      setPosts(generatedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate Google Business posts');
      console.error('Error generating Google Business posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectRequired>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Store className="w-10 h-10 text-[var(--primary)]" />
            <h1 className="text-4xl font-bold text-gray-900">Google Business Posts</h1>
          </div>
          <p className="text-xl text-gray-600">Create engaging Google Business posts for {currentProject?.name}</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <GoogleBusinessForm 
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
                <p className="text-gray-600">Generating your Google Business posts...</p>
              </div>
            ) : posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Post {index + 1}</h2>
                  <GoogleBusinessPreview post={post} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Your generated Google Business posts will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProjectRequired>
  );
}