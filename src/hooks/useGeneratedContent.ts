import { useState, useEffect } from 'react';
import { 
  BlogSuggestion, 
  InstagramPost, 
  ContentStrategy, 
  GooglePost 
} from '../types';

interface GeneratedContent {
  blogSuggestions?: BlogSuggestion[];
  blogContent?: string;
  instagramPosts?: InstagramPost[];
  contentStrategy?: ContentStrategy;
  googlePosts?: GooglePost[];
}

const CONTENT_STORAGE_KEY = 'seo-wizard-generated-content';

export function useGeneratedContent(projectId: string) {
  const [content, setContent] = useState<GeneratedContent>({});

  // Load content from storage when projectId changes
  useEffect(() => {
    const loadContent = () => {
      const savedContent = localStorage.getItem(`${CONTENT_STORAGE_KEY}-${projectId}`);
      if (savedContent) {
        try {
          setContent(JSON.parse(savedContent));
        } catch (error) {
          console.error('Error parsing saved content:', error);
        }
      }
    };

    loadContent();
  }, [projectId]);

  // Save content to storage whenever it changes
  useEffect(() => {
    if (Object.keys(content).length > 0) {
      localStorage.setItem(`${CONTENT_STORAGE_KEY}-${projectId}`, JSON.stringify(content));
    }
  }, [content, projectId]);

  const updateContent = (type: keyof GeneratedContent, newContent: any) => {
    setContent(prev => ({
      ...prev,
      [type]: newContent
    }));
  };

  return {
    content,
    updateContent
  };
}