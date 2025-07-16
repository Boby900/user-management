import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar, User, Tag } from 'lucide-react';
import { Task, Project, User as UserType } from '../types';

interface TaskBoardProps {
  tasks: Task[];
  projects: Project[];
  users: UserType[];
  onTaskUpdate: (task: Task) => void;
  onTaskCreate: (task: Omit<Task, 'id'>) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  projects,
  users,
  onTaskUpdate,
  onTaskCreate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-purple-100' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject === 'all' || task.projectId === selectedProject;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    
    return matchesSearch && matchesProject && matchesStatus;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getProject = (projectId: string) => {
    return projects.find(p => p.id === projectId);
  };

  const getUser = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const project = getProject(task.projectId);
    const assignee = getUser(task.assigneeId);

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
            <span className="text-xs font-medium text-gray-500 uppercase">{task.priority}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              {task.dueDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: project?.color }}
            />
            <span className="text-xs text-gray-500">{project?.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">{task.estimatedHours}h</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={assignee?.avatar}
              alt={assignee?.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-gray-600">{assignee?.name}</span>
          </div>
          <div className="flex space-x-1">
            {task.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="all">All Projects</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className={`${column.color} rounded-lg p-4 min-h-[600px]`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">{column.title}</h2>
              <span className="bg-white px-2 py-1 text-sm font-medium text-gray-700 rounded-full">
                {getTasksByStatus(column.id).length}
              </span>
            </div>
            
            <div className="space-y-3">
              {getTasksByStatus(column.id).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};