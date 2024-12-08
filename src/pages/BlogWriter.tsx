import React, { useState, useEffect } from 'react';
import { Pencil, Loader2 } from 'lucide-react';
import { BlogFormData } from '../types';
import { generateBlogContent } from '../services/openai';
import BlogForm from '../components/BlogForm';
import BlogPreview from '../components/BlogPreview';
import ProjectRequired from '../components/ProjectRequired';
import { useCurrentProject } from '../hooks/useCurrentProject';
import { useGeneratedContent } from '../hooks/useGeneratedContent';

export default function BlogWriter() {
  const { currentProject } = useCurrentProject();
  const { content, updateContent } = useGeneratedContent(currentProject?.id || '');
  const [formData, setFormData] = useState<BlogFormData>({
    brief: '',
    length: 800,
    tone: 'professional'
  });
  const [blogContent, setBlogContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved content when component mounts
  useEffect(() => {
    if (content.blogContent) {
      setBlogContent(content.blogContent);
    }
  }, [content.blogContent]);

  const handleGenerate = async (data: BlogFormData) => {
    if (!currentProject) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const generatedContent = await generateBlogContent({
        ...data,
        businessName: currentProject.name
      });
      setBlogContent(generatedContent);
      updateContent('blogContent', generatedContent);
      setFormData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate blog content');
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({ 
      brief: '',
      length: 800,
      tone: 'professional'
    });
  };

  return (
    <ProjectRequired>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Pencil className="w-10 h-10 text-[var(--primary)]" />
            <h1 className="text-4xl font-bold text-gray-900">Blog Writer</h1>
          </div>
          <p className="text-xl text-gray-600">Generate SEO-optimized blog content for {currentProject?.name}</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <BlogForm 
              formData={formData}
              onSubmit={handleGenerate}
              isLoading={isLoading}
              onClear={clearForm}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
                <p className="text-gray-600">Generating your blog content...</p>
              </div>
            ) : blogContent ? (
              <BlogPreview content={blogContent} brief={formData.brief} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Your generated content will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProjectRequired>
  );
}