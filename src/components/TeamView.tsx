import React, { useState } from 'react';
import { Mail, Phone, MoreHorizontal, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { User, Task, Project } from '../types';

interface TeamViewProps {
  users: User[];
  tasks: Task[];
  projects: Project[];
}

export const TeamView: React.FC<TeamViewProps> = ({ users, tasks, projects }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUserTasks = (userId: string) => {
    return tasks.filter(task => task.assigneeId === userId);
  };

  const getUserStats = (userId: string) => {
    const userTasks = getUserTasks(userId);
    const completedTasks = userTasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = userTasks.filter(task => task.status === 'in-progress').length;
    const totalHours = userTasks.reduce((acc, task) => acc + task.actualHours, 0);
    
    return {
      totalTasks: userTasks.length,
      completedTasks,
      inProgressTasks,
      totalHours,
      completionRate: userTasks.length > 0 ? Math.round((completedTasks / userTasks.length) * 100) : 0
    };
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'developer': return 'bg-green-100 text-green-800 border-green-200';
      case 'designer': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const TeamMemberCard = ({ user }: { user: User }) => {
    const stats = getUserStats(user.id);
    const userTasks = getUserTasks(user.id);

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        <div className="mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{stats.totalTasks}</p>
            <p className="text-xs text-gray-500">Total Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600">{stats.completedTasks}</p>
            <p className="text-xs text-gray-500">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-blue-600">{stats.inProgressTasks}</p>
            <p className="text-xs text-gray-500">In Progress</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Completion Rate</span>
            <span>{stats.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>{stats.totalHours}h worked</span>
          </div>
          <button
            onClick={() => setSelectedUser(user)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Team</h1>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500">
            {users.length} team members
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Tasks</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Completion</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(users.reduce((acc, user) => acc + getUserStats(user.id).completionRate, 0) / users.length)}%
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <TeamMemberCard key={user.id} user={user} />
        ))}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <p className="text-gray-500">{selectedUser.email}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(selectedUser.role)} mt-2`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
              <div className="space-y-3">
                {getUserTasks(selectedUser.id).slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500">{task.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Due: {task.dueDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};