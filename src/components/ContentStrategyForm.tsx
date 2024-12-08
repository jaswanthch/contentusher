import React, { useState } from 'react';
import { Target, Users, Calendar, BarChart3 } from 'lucide-react';
import { ContentStrategyFormData } from '../types';

interface Props {
  onSubmit: (data: ContentStrategyFormData) => void;
  isLoading: boolean;
}

const CONTENT_TYPES = [
  'Photos',
  'Videos',
  'Stories',
  'Reels',
  'Carousels',
  'Live Streams',
  'Text Posts',
  'Polls',
  'User-Generated Content'
];

export default function ContentStrategyForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<ContentStrategyFormData>({
    platform: 'instagram',
    contentGoal: '',
    contentCount: 7,
    targetAudience: '',
    contentTypes: [],
    postingFrequency: 'daily'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleContentTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  const inputClasses = "w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all outline-none";
  const labelClasses = "flex items-center gap-2 text-gray-700 font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClasses}>
          <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
          Platform
        </label>
        <select
          className={inputClasses}
          value={formData.platform}
          onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value as ContentStrategyFormData['platform'] }))}
          required
        >
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>
          <Target className="w-5 h-5 text-[var(--primary)]" />
          Content Goal
        </label>
        <select
          className={inputClasses}
          value={formData.contentGoal}
          onChange={(e) => setFormData(prev => ({ ...prev, contentGoal: e.target.value }))}
          required
        >
          <option value="">Select a goal</option>
          <option value="educate">Educate Audience</option>
          <option value="convert">Drive Conversions</option>
          <option value="authority">Build Authority</option>
          <option value="awareness">Increase Brand Awareness</option>
          <option value="promote">Promote Product/Service</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>
          <Users className="w-5 h-5 text-[var(--primary)]" />
          Target Audience Description
        </label>
        <textarea
          className={`${inputClasses} min-h-[100px]`}
          value={formData.targetAudience}
          onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
          placeholder="Describe your target audience (age, interests, behaviors, etc.)"
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          Content Types
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CONTENT_TYPES.map(type => (
            <label key={type} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.contentTypes.includes(type)}
                onChange={() => handleContentTypeChange(type)}
                className="rounded text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClasses}>
          <Calendar className="w-5 h-5 text-[var(--primary)]" />
          Posting Frequency
        </label>
        <select
          className={inputClasses}
          value={formData.postingFrequency}
          onChange={(e) => setFormData(prev => ({ ...prev, postingFrequency: e.target.value }))}
          required
        >
          <option value="daily">Daily</option>
          <option value="multiple_daily">Multiple Times Daily</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="monthly">Monthly</option>
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
            <span>Generating Strategy...</span>
          </div>
        ) : (
          'Generate Content Strategy'
        )}
      </button>
    </form>
  );
}