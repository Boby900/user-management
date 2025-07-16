import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Calendar } from 'lucide-react';
import { Task, Project, User } from '../types';

interface ReportsViewProps {
  tasks: Task[];
  projects: Project[];
  users: User[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ tasks, projects, users }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  const getTaskStatusData = () => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: Math.round((count / tasks.length) * 100)
    }));
  };

  const getPriorityData = () => {
    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(priorityCounts).map(([priority, count]) => ({
      priority,
      count,
      percentage: Math.round((count / tasks.length) * 100)
    }));
  };

  const getProjectProgress = () => {
    return projects.map(project => ({
      name: project.name,
      progress: project.progress,
      tasksCount: tasks.filter(t => t.projectId === project.id).length,
      completedTasks: tasks.filter(t => t.projectId === project.id && t.status === 'completed').length
    }));
  };

  const getUserProductivity = () => {
    return users.map(user => {
      const userTasks = tasks.filter(t => t.assigneeId === user.id);
      const completedTasks = userTasks.filter(t => t.status === 'completed').length;
      const totalHours = userTasks.reduce((acc, task) => acc + task.actualHours, 0);
      
      return {
        name: user.name,
        totalTasks: userTasks.length,
        completedTasks,
        totalHours,
        completionRate: userTasks.length > 0 ? Math.round((completedTasks / userTasks.length) * 100) : 0
      };
    });
  };

  const statusData = getTaskStatusData();
  const priorityData = getPriorityData();
  const projectProgress = getProjectProgress();
  const userProductivity = getUserProductivity();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'review': return 'bg-purple-500';
      case 'todo': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
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

  const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'quarter')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.reduce((acc, task) => acc + task.actualHours, 0)}h
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Project Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <PieChart className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <ChartCard title="Task Status Distribution">
          <div className="space-y-3">
            {statusData.map(({ status, count, percentage }) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                  <span className="text-sm text-gray-700 capitalize">{status.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{count}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getStatusColor(status)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-10">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Priority Distribution */}
        <ChartCard title="Priority Distribution">
          <div className="space-y-3">
            {priorityData.map(({ priority, count, percentage }) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`} />
                  <span className="text-sm text-gray-700 capitalize">{priority}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{count}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getPriorityColor(priority)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-10">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Project Progress */}
        <ChartCard title="Project Progress">
          <div className="space-y-4">
            {projectProgress.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{project.name}</span>
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{project.completedTasks}/{project.tasksCount} tasks</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* User Productivity */}
        <ChartCard title="Team Productivity">
          <div className="space-y-4">
            {userProductivity.map((user) => (
              <div key={user.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>{user.totalTasks} tasks</span>
                    <span>{user.completedTasks} completed</span>
                    <span>{user.totalHours}h</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{user.completionRate}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${user.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};