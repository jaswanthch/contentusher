import React from 'react';
import { FileText, Volume2, Target, Hash, Calendar } from 'lucide-react';
import { GooglePostFormData } from '../types';

interface Props {
  onSubmit: (data: GooglePostFormData) => void;
  isLoading: boolean;
}

export default function GoogleBusinessForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = React.useState<GooglePostFormData>({
    postType: 'update',
    topic: '',
    tone: 'professional',
    callToAction: '',
    postCount: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all outline-none";
  const labelClasses = "flex items-center gap-2 text-gray-700 font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClasses}>
          <Calendar className="w-5 h-5 text-[var(--primary)]" />
          Post Type
        </label>
        <select
          className={inputClasses}
          value={formData.postType}
          onChange={(e) => setFormData(prev => ({ ...prev, postType: e.target.value as GooglePostFormData['postType'] }))}
          required
        >
          <option value="update">Business Update</option>
          <option value="event">Event</option>
          <option value="offer">Special Offer</option>
          <option value="product">Product Highlight</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>
          <FileText className="w-5 h-5 text-[var(--primary)]" />
          Post Topic
        </label>
        <textarea
          className={`${inputClasses} min-h-[100px]`}
          value={formData.topic}
          onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
          placeholder="What would you like to post about?"
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <Volume2 className="w-5 h-5 text-[var(--primary)]" />
          Tone
        </label>
        <select
          className={inputClasses}
          value={formData.tone}
          onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
          required
        >
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="enthusiastic">Enthusiastic</option>
          <option value="informative">Informative</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>
          <Target className="w-5 h-5 text-[var(--primary)]" />
          Call to Action
        </label>
        <input
          type="text"
          className={inputClasses}
          value={formData.callToAction}
          onChange={(e) => setFormData(prev => ({ ...prev, callToAction: e.target.value }))}
          placeholder="e.g., Book now, Learn more, Get offer"
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <Hash className="w-5 h-5 text-[var(--primary)]" />
          Number of Posts
        </label>
        <select
          className={inputClasses}
          value={formData.postCount}
          onChange={(e) => setFormData(prev => ({ ...prev, postCount: Number(e.target.value) }))}
        >
          {[1, 2, 3, 4, 5].map(count => (
            <option key={count} value={count}>
              {count} {count === 1 ? 'Post' : 'Posts'}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full primary-button"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>Generating...</span>
          </div>
        ) : (
          'Generate Google Business Posts'
        )}
      </button>
    </form>
  );
}