import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import DOMPurify from 'dompurify';

interface Props {
  content: string | { content: string };
  brief: string;
}

export default function BlogPreview({ content, brief }: Props) {
  const [copiedContent, setCopiedContent] = useState(false);
  const [copiedDescription, setCopiedDescription] = useState(false);

  const handleCopyContent = async () => {
    try {
      const textContent = typeof content === 'string' ? content : content.content;
      await navigator.clipboard.writeText(textContent);
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const handleCopyDescription = async () => {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopiedDescription(true);
      setTimeout(() => setCopiedDescription(false), 2000);
    } catch (err) {
      console.error('Failed to copy description:', err);
    }
  };

  const formatMarkdown = (text: string) => {
    const htmlTags: { [key: string]: string } = {};
    let tagCount = 0;
    
    text = text.replace(/<[^>]+>/g, (match) => {
      const placeholder = `__HTML_TAG_${tagCount}__`;
      htmlTags[placeholder] = match;
      tagCount++;
      return placeholder;
    });

    text = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');

    Object.entries(htmlTags).forEach(([placeholder, tag]) => {
      text = text.replace(placeholder, tag);
    });

    return DOMPurify.sanitize(text);
  };

  const renderContent = () => {
    const textContent = typeof content === 'string' ? content : content.content;
    if (!textContent) return null;

    const paragraphs = textContent.split('\n').filter(p => p.trim() !== '');
    let title = paragraphs[0];
    const body = paragraphs.slice(1);

    const cleanTitle = title.replace(/[#*`]/g, '').replace(/<[^>]+>/g, '').trim();
    const isOverLimit = cleanTitle.length > 50;

    if (isOverLimit) {
      const truncated = cleanTitle.substring(0, 47) + '...';
      title = title.replace(cleanTitle, truncated);
    }

    return (
      <>
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isOverLimit ? 'text-red-600' : 'text-gray-900'}`}
              dangerouslySetInnerHTML={{ __html: formatMarkdown(title) }} />
          <div className="flex justify-end mt-2">
            <span className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
              {cleanTitle.length}/50 characters
            </span>
          </div>
        </div>
        {body.map((paragraph, index) => {
          if (paragraph.startsWith('###')) {
            return (
              <h3 key={index} className="text-xl font-semibold text-gray-800 mt-8 mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMarkdown(paragraph.replace('###', '').trim()) 
                  }} />
            );
          }
          if (paragraph.startsWith('##')) {
            return (
              <h2 key={index} className="text-2xl font-semibold text-gray-800 mt-8 mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMarkdown(paragraph.replace('##', '').trim()) 
                  }} />
            );
          }
          if (paragraph.startsWith('#')) {
            return (
              <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMarkdown(paragraph.replace('#', '').trim()) 
                  }} />
            );
          }

          if (paragraph.startsWith('- ')) {
            return (
              <ul key={index} className="list-disc list-inside mb-4 ml-4">
                <li className="text-gray-700"
                    dangerouslySetInnerHTML={{ 
                      __html: formatMarkdown(paragraph.replace('- ', '')) 
                    }} />
              </ul>
            );
          }

          if (paragraph.startsWith('```')) {
            const code = paragraph.replace(/```/g, '').trim();
            return (
              <pre key={index} className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
                <code className="text-sm text-gray-800">{code}</code>
              </pre>
            );
          }

          return (
            <p key={index} 
               className="text-gray-700 mb-4 leading-relaxed" 
               dangerouslySetInnerHTML={{ __html: formatMarkdown(paragraph) }} />
          );
        })}
      </>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCopyContent}
          className="p-2 text-gray-500 hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-[var(--light-mint)]"
          title="Copy content"
        >
          {copiedContent ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={handleCopyDescription}
          className="p-2 text-gray-500 hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-[var(--light-mint)]"
          title="Copy description"
        >
          {copiedDescription ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Download className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <div className="prose prose-lg max-w-none">
        {renderContent()}
      </div>
    </div>
  );
}