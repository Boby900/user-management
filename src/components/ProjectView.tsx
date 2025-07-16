import React, { useState } from 'react';
import { Plus, MoreHorizontal, Users, Calendar, TrendingUp } from 'lucide-react';
import { Project, Task, User } from '../types';

interface ProjectViewProps {
  projects: Project[];
  tasks: Task[];
  users: User[];
  onProjectUpdate: (project: Project) => void;
  onProjectCreate: (project: Omit<Project, 'id'>) => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
  projects,
  tasks,
  users,
  onProjectUpdate,
  onProjectCreate
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getProjectTasks = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getProjectProgress = (projectId: string) => {
    const projectTasks = getProjectTasks(projectId);
    if (projectTasks.length === 0) return 0;
    
    const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const projectTasks = getProjectTasks(project.id);
    const progress = getProjectProgress(project.id);

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className="text-sm text-gray-500">{progress}% complete</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: project.color
            }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{project.teamMembers.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{project.dueDate.toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>{projectTasks.length} tasks</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.teamMembers.slice(0, 3).map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
              />
            ))}
            {project.teamMembers.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-gray-600">+{project.teamMembers.length - 3}</span>
              </div>
            )}
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};