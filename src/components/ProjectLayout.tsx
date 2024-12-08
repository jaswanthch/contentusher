import React from 'react';
import ProjectSidebar from './ProjectSidebar';
import ProjectRequired from './ProjectRequired';

interface Props {
  children: React.ReactNode;
}

export default function ProjectLayout({ children }: Props) {
  return (
    <ProjectRequired>
      <div className="flex">
        <ProjectSidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </ProjectRequired>
  );
}