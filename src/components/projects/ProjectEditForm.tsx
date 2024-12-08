import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Briefcase, FileText, Package, Plus, X } from 'lucide-react';
import { Project } from '../../types';

interface Props {
  project: Project;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProjectEditForm({ project, onSubmit, onCancel, isLoading }: Props) {
  const [formData, setFormData] = useState<Project>({
    ...project,
    services: project.services || [] // Ensure services is initialized as an array
  });
  const [newService, setNewService] = useState('');

  useEffect(() => {
    setFormData({
      ...project,
      services: project.services || [] // Ensure services is initialized as an array when project changes
    });
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      updatedAt: new Date().toISOString()
    });
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.trim()) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const inputClasses = "w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all outline-none";
  const labelClasses = "flex items-center gap-2 text-gray-700 font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClasses}>
          <Building2 className="w-5 h-5 text-[var(--primary)]" />
          Project Name
        </label>
        <input
          type="text"
          className={inputClasses}
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your project name"
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <Briefcase className="w-5 h-5 text-[var(--primary)]" />
          Industry
        </label>
        <input
          type="text"
          className={inputClasses}
          value={formData.industry}
          onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
          placeholder="e.g., Technology, Healthcare, Retail"
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <MapPin className="w-5 h-5 text-[var(--primary)]" />
          Location
        </label>
        <input
          type="text"
          className={inputClasses}
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="e.g., New York, United States"
          required
        />
      </div>

      <div>
        <label className={labelClasses}>
          <Package className="w-5 h-5 text-[var(--primary)]" />
          Services/Products
        </label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              className={inputClasses}
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="Add a service or product"
            />
            <button
              type="button"
              onClick={handleAddService}
              className="p-3 text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full"
              >
                <span className="text-sm font-medium">{service}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveService(index)}
                  className="text-indigo-400 hover:text-indigo-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className={labelClasses}>
          <FileText className="w-5 h-5 text-[var(--primary)]" />
          Description
        </label>
        <textarea
          className={`${inputClasses} min-h-[100px]`}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of your project"
          required
        />
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
              <span>Saving...</span>
            </div>
          ) : (
            'Save Changes'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}