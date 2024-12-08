import React from 'react';
import { Project } from '../../types';
import { Building2, Calendar, MapPin, Package, Pencil } from 'lucide-react';

interface Props {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  onEdit: () => void;
}

export default function ProjectCard({ project, isActive, onClick, onEdit }: Props) {
  if (!project) {
    return null;
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-xl transition-all cursor-pointer ${
        isActive
          ? 'bg-indigo-50 border-2 border-indigo-200'
          : 'bg-white border border-gray-200 hover:border-indigo-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{project.name}</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{project.industry}</span>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="p-2 text-gray-500 hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-white"
          title="Edit project"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{project.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Created {formattedDate}</span>
        </div>
      </div>

      {project.services && project.services.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium">Services/Products</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.services.map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.description && (
        <p className="mt-4 text-gray-600 text-sm line-clamp-2">{project.description}</p>
      )}
    </div>
  );
}