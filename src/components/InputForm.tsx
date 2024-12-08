import React, { useEffect } from 'react';
import { FormData, BUSINESS_INFO_KEY } from '../types';
import { Briefcase, MapPin, Package, Target, Hash, Building2 } from 'lucide-react';

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  initialData: FormData | null;
}

const DEFAULT_FORM_STATE: FormData = {
  businessName: '',
  industry: '',
  location: '',
  services: '',
  contentGoal: '',
  suggestionCount: 3
};

export default function InputForm({ onSubmit, isLoading, initialData }: Props) {
  const [formData, setFormData] = React.useState<FormData>(DEFAULT_FORM_STATE);

  useEffect(() => {
    // Load business name from shared storage
    const savedBusinessInfo = localStorage.getItem(BUSINESS_INFO_KEY);
    if (savedBusinessInfo) {
      try {
        const { businessName } = JSON.parse(savedBusinessInfo);
        setFormData(prev => ({
          ...prev,
          businessName
        }));
      } catch (error) {
        console.error('Error parsing saved business info:', error);
      }
    }

    // Override with initialData if available
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update shared business info
    const businessInfo = {
      businessName: formData.businessName
    };
    localStorage.setItem(BUSINESS_INFO_KEY, JSON.stringify(businessInfo));
    onSubmit(formData);
  };

  const clearSavedData = () => {
    setFormData(prev => ({
      ...DEFAULT_FORM_STATE,
      businessName: prev.businessName // Preserve business name
    }));
  };

  const inputClasses = "w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all outline-none";
  const labelClasses = "flex items-center gap-2 text-gray-700 font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClasses}>
          <Building2 className="w-5 h-5 text-[var(--primary-purple)]" />
          Business Name
        </label>
        <input
          type="text"
          placeholder="e.g., Acme Corporation"
          className={inputClasses}
          value={formData.businessName}
          onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <Briefcase className="w-5 h-5 text-[var(--primary-purple)]" />
          Business Industry
        </label>
        <input
          type="text"
          placeholder="e.g., Healthcare, Technology"
          className={inputClasses}
          value={formData.industry}
          onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <MapPin className="w-5 h-5 text-[var(--primary-purple)]" />
          Location
        </label>
        <input
          type="text"
          placeholder="e.g., New York City, United Kingdom"
          className={inputClasses}
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <Package className="w-5 h-5 text-[var(--primary-purple)]" />
          Services Offered
        </label>
        <textarea
          placeholder="List your key products or services"
          className={`${inputClasses} min-h-[100px]`}
          value={formData.services}
          onChange={(e) => setFormData(prev => ({ ...prev, services: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <Target className="w-5 h-5 text-[var(--primary-purple)]" />
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
          <Hash className="w-5 h-5 text-[var(--primary-purple)]" />
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

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 primary-button"
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
        
        {Object.values(formData).some(value => value !== '') && (
          <button
            type="button"
            onClick={clearSavedData}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}