import React from 'react';
import { BlogFormData } from '../types';
import { FileText, Volume2, Trash2 } from 'lucide-react';

interface Props {
  formData: BlogFormData;
  onSubmit: (data: BlogFormData) => void;
  onClear: () => void;
  isLoading: boolean;
}

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'technical', label: 'Technical' }
];

export default function BlogForm({ formData, onSubmit, onClear, isLoading }: Props) {
  const [form, setForm] = React.useState<BlogFormData>(formData);

  React.useEffect(() => {
    setForm(formData);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClasses = "w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all outline-none";
  const labelClasses = "flex items-center gap-2 text-gray-700 font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClasses}>
          <FileText className="w-5 h-5 text-[var(--primary)]" />
          Blog Brief
        </label>
        <textarea
          className={`${inputClasses} min-h-[100px]`}
          value={form.brief}
          onChange={(e) => setForm(prev => ({ ...prev, brief: e.target.value }))}
          required
          placeholder="Describe what you want your blog post to be about, including target keywords..."
        />
      </div>

      <div>
        <label className={labelClasses}>
          Word Count: {form.length}
        </label>
        <input
          type="range"
          min="800"
          max="2000"
          step="100"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
          value={form.length}
          onChange={(e) => setForm(prev => ({ ...prev, length: parseInt(e.target.value) }))}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>800</span>
          <span>2000</span>
        </div>
      </div>

      <div>
        <label className={labelClasses}>
          <Volume2 className="w-5 h-5 text-[var(--primary)]" />
          Tone
        </label>
        <select
          className={inputClasses}
          value={form.tone}
          onChange={(e) => setForm(prev => ({ ...prev, tone: e.target.value }))}
          required
        >
          {TONE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 primary-button"
        >
          {isLoading ? 'Generating...' : 'Generate Blog Post'}
        </button>

        {(form.brief || form.length !== 800 || form.tone !== 'professional') && (
          <button
            type="button"
            onClick={onClear}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
            title="Clear form"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}