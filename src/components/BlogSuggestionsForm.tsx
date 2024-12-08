import React from 'react';
import { Target, Hash } from 'lucide-react';
import { BlogSuggestionsFormData } from '../types';

interface Props {
  onSubmit: (data: BlogSuggestionsFormData) => void;
  isLoading: boolean;
}

export default function BlogSuggestionsForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = React.useState<BlogSuggestionsFormData>({
    contentGoal: '',
    suggestionCount: 3
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
        </select>
      </div>

      <div>
        <label className={labelClasses}>
          <Hash className="w-5 h-5 text-[var(--primary)]" />
          Number of Suggestions
        </label>
        <select
          className={inputClasses}
          value={formData.suggestionCount}
          onChange={(e) => setFormData(prev => ({ ...prev, suggestionCount: Number(e.target.value) }))}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(count => (
            <option key={count} value={count}>
              {count} {count === 1 ? 'Suggestion' : 'Suggestions'}
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
          'Generate Blog Topics'
        )}
      </button>
    </form>
  );
}