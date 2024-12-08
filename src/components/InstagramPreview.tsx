import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { InstagramPost } from '../types';

interface Props {
  post: InstagramPost;
}

export default function InstagramPreview({ post }: Props) {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(post.caption);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } catch (err) {
      console.error('Failed to copy caption:', err);
    }
  };

  const handleCopyHashtags = async () => {
    try {
      await navigator.clipboard.writeText(post.hashtags.join(' '));
      setCopiedHashtags(true);
      setTimeout(() => setCopiedHashtags(false), 2000);
    } catch (err) {
      console.error('Failed to copy hashtags:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative bg-white rounded-xl p-6 border border-gray-200">
        <button
          onClick={handleCopyCaption}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-gray-50"
          title="Copy caption"
        >
          {copiedCaption ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
        <h3 className="font-semibold text-gray-900 mb-4">Caption</h3>
        <div className="whitespace-pre-wrap text-gray-700">{post.caption}</div>
      </div>

      <div className="relative bg-white rounded-xl p-6 border border-gray-200">
        <button
          onClick={handleCopyHashtags}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-gray-50"
          title="Copy hashtags"
        >
          {copiedHashtags ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
        <h3 className="font-semibold text-gray-900 mb-4">Hashtags</h3>
        <div className="flex flex-wrap gap-2">
          {post.hashtags.map((hashtag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
            >
              {hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}