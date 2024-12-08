import React, { useState } from 'react';
import { Copy, Check, Calendar, Tag, Clock } from 'lucide-react';
import { GooglePost } from '../types';

interface Props {
  post: GooglePost;
}

export default function GoogleBusinessPreview({ post }: Props) {
  const [copiedContent, setCopiedContent] = useState(false);

  const handleCopyContent = async () => {
    try {
      const textToCopy = `${post.title}\n\n${post.content}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative bg-white rounded-xl p-6 border border-gray-200">
        <button
          onClick={handleCopyContent}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-gray-50"
          title="Copy content"
        >
          {copiedContent ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>

        <h3 className="text-xl font-semibold text-gray-900 mb-4">{post.title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap mb-6">{post.content}</p>

        {post.eventDetails && (
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                {post.eventDetails.startDate === post.eventDetails.endDate
                  ? post.eventDetails.startDate
                  : `${post.eventDetails.startDate} - ${post.eventDetails.endDate}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{post.eventDetails.time}</span>
            </div>
          </div>
        )}

        {post.offerDetails && (
          <div className="space-y-2 mb-6">
            {post.offerDetails.couponCode && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[var(--primary)]" />
                <span className="font-medium">{post.offerDetails.couponCode}</span>
              </div>
            )}
            {post.offerDetails.expiryDate && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Expires: {post.offerDetails.expiryDate}</span>
              </div>
            )}
            {post.offerDetails.terms && (
              <p className="text-sm text-gray-500">{post.offerDetails.terms}</p>
            )}
          </div>
        )}

        <button
          className="w-full py-2 px-4 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
        >
          {post.callToAction.label}
        </button>
      </div>
    </div>
  );
}