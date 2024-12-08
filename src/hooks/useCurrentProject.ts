import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, PROJECTS_STORAGE_KEY, CURRENT_PROJECT_KEY } from '../types';

export function useCurrentProject() {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrentProject = () => {
      const currentProjectId = localStorage.getItem(CURRENT_PROJECT_KEY);
      if (!currentProjectId) {
        setLoading(false);
        navigate('/projects');
        return;
      }

      const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (!savedProjects) {
        setLoading(false);
        navigate('/projects');
        return;
      }

      const projects: Project[] = JSON.parse(savedProjects);
      const project = projects.find(p => p.id === currentProjectId);
      
      if (!project) {
        setLoading(false);
        navigate('/projects');
        return;
      }

      setCurrentProject(project);
      setLoading(false);
    };

    loadCurrentProject();
  }, [navigate]);

  return { currentProject, loading };
}