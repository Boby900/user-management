import React from 'react';
import { TrendingUp, Clock, CheckCircle, AlertCircle, Users, FolderOpen } from 'lucide-react';
import { DashboardStats, Task, Project } from '../types';

interface DashboardProps {
  stats: DashboardStats;
  recentTasks: Task[];
  projects: Project[];
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, recentTasks, projects }) => {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      change: '+12%',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'blue'
    },
    {
      title: 'In Progress',
      value: stats.inProgressTasks,
      change: '+8%',
      changeType: 'increase',
      icon: Clock,
      color: 'amber'
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      change: '+23%',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      title: 'Overdue',
      value: stats.overdueTasks,
      change: '-5%',
      changeType: 'decrease',
      icon: AlertCircle,
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
      emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      red: 'bg-red-50 text-red-700 border-red-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'review': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            <span>Productivity: {stats.productivity}%</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h2>
          <div className="space-y-4">
            {recentTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Due: {task.dueDate.toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h2>
          <div className="space-y-4">
            {projects.filter(p => p.status === 'active').map((project) => (
              <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: project.color
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{project.teamMembers.length} members</span>
                  </div>
                  <span>Due: {project.dueDate.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};