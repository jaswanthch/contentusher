import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderPlus } from 'lucide-react';
import { Project, PROJECTS_STORAGE_KEY, CURRENT_PROJECT_KEY } from '../types';
import ProjectForm from '../components/projects/ProjectForm';
import ProjectEditForm from '../components/projects/ProjectEditForm';
import ProjectCard from '../components/projects/ProjectCard';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    const currentProject = localStorage.getItem(CURRENT_PROJECT_KEY);
    if (currentProject) {
      setCurrentProjectId(currentProject);
    }
  }, []);

  const handleCreateProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newProject: Project = {
        ...projectData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
      
      setCurrentProjectId(newProject.id);
      localStorage.setItem(CURRENT_PROJECT_KEY, newProject.id);
      
      setShowForm(false);
      navigate('/blog-suggestions');
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    setIsLoading(true);
    try {
      const updatedProjects = projects.map(p => 
        p.id === updatedProject.id ? updatedProject : p
      );
      setProjects(updatedProjects);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
      setEditingProject(null);
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProject = (projectId: string) => {
    setCurrentProjectId(projectId);
    localStorage.setItem(CURRENT_PROJECT_KEY, projectId);
    navigate('/blog-suggestions');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FolderPlus className="w-10 h-10 text-[var(--primary)]" />
          <h1 className="text-4xl font-bold text-gray-900">Projects</h1>
        </div>
        <p className="text-xl text-gray-600">Manage your SEO content projects</p>
      </header>

      {!showForm && !editingProject && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-8 flex items-center gap-2 primary-button mx-auto"
        >
          <Plus className="w-5 h-5" />
          Create New Project
        </button>
      )}

      {showForm ? (
        <div className="max-w-md mx-auto">
          <ProjectForm onSubmit={handleCreateProject} isLoading={isLoading} />
          <button
            onClick={() => setShowForm(false)}
            className="mt-4 w-full px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : editingProject ? (
        <div className="max-w-md mx-auto">
          <ProjectEditForm
            project={editingProject}
            onSubmit={handleUpdateProject}
            onCancel={() => setEditingProject(null)}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={project.id === currentProjectId}
              onClick={() => handleSelectProject(project.id)}
              onEdit={() => setEditingProject(project)}
            />
          ))}
        </div>
      )}

      {!showForm && !editingProject && projects.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p>No projects yet. Create your first project to get started!</p>
        </div>
      )}
    </div>
  );
}