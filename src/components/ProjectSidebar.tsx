import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Pencil, Instagram, BarChart3, Store } from 'lucide-react';
import { useCurrentProject } from '../hooks/useCurrentProject';

export default function ProjectSidebar() {
  const { currentProject } = useCurrentProject();

  if (!currentProject) return null;

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300
    ${isActive 
      ? 'text-[var(--primary)] font-medium bg-indigo-50' 
      : 'text-gray-600 hover:text-[var(--primary)] hover:bg-gray-50'}`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{currentProject.name}</h2>
        <p className="text-sm text-gray-500 mb-6">{currentProject.industry}</p>

        <div className="space-y-2">
          <NavLink to="/blog-suggestions" className={navLinkClasses}>
            <Sparkles className="w-5 h-5" />
            <span>Blog Ideas</span>
          </NavLink>
          
          <NavLink to="/blog-writer" className={navLinkClasses}>
            <Pencil className="w-5 h-5" />
            <span>Blog Writer</span>
          </NavLink>

          <NavLink to="/instagram" className={navLinkClasses}>
            <Instagram className="w-5 h-5" />
            <span>Instagram</span>
          </NavLink>

          <NavLink to="/google-my-business" className={navLinkClasses}>
            <Store className="w-5 h-5" />
            <span>Google Business</span>
          </NavLink>

          <NavLink to="/content-strategy" className={navLinkClasses}>
            <BarChart3 className="w-5 h-5" />
            <span>Content Strategy</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}