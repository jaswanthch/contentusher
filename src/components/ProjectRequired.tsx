import React from 'react';
import { useCurrentProject } from '../hooks/useCurrentProject';

interface Props {
  children: React.ReactNode;
}

export default function ProjectRequired({ children }: Props) {
  const { currentProject, loading } = useCurrentProject();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentProject) {
    return null; // Navigation is handled by the hook
  }

  return <>{children}</>;
}