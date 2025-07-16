import { User, Project, Task, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@company.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@company.com',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'manager'
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    email: 'michael@company.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'developer'
  },
  {
    id: '4',
    name: 'Emma Williams',
    email: 'emma@company.com',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'designer'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Building a modern e-commerce platform with React and Node.js',
    color: '#3B82F6',
    progress: 75,
    dueDate: new Date('2024-02-15'),
    status: 'active',
    teamMembers: [mockUsers[0], mockUsers[1], mockUsers[2]]
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application using React Native',
    color: '#10B981',
    progress: 40,
    dueDate: new Date('2024-03-01'),
    status: 'active',
    teamMembers: [mockUsers[1], mockUsers[3]]
  },
  {
    id: '3',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard with advanced visualizations',
    color: '#F59E0B',
    progress: 90,
    dueDate: new Date('2024-01-30'),
    status: 'active',
    teamMembers: [mockUsers[0], mockUsers[2]]
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Set up JWT authentication with login/logout functionality',
    projectId: '1',
    assigneeId: '3',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date('2024-01-25'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    tags: ['backend', 'security'],
    estimatedHours: 8,
    actualHours: 6
  },
  {
    id: '2',
    title: 'Design checkout flow',
    description: 'Create wireframes and mockups for the checkout process',
    projectId: '1',
    assigneeId: '4',
    priority: 'medium',
    status: 'review',
    dueDate: new Date('2024-01-22'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-21'),
    tags: ['design', 'ui/ux'],
    estimatedHours: 12,
    actualHours: 10
  },
  {
    id: '3',
    title: 'API integration testing',
    description: 'Test all API endpoints and handle edge cases',
    projectId: '2',
    assigneeId: '1',
    priority: 'high',
    status: 'todo',
    dueDate: new Date('2024-01-28'),
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    tags: ['testing', 'backend'],
    estimatedHours: 6,
    actualHours: 0
  },
  {
    id: '4',
    title: 'Dashboard data visualization',
    description: 'Implement charts and graphs for analytics dashboard',
    projectId: '3',
    assigneeId: '2',
    priority: 'medium',
    status: 'completed',
    dueDate: new Date('2024-01-20'),
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
    tags: ['frontend', 'charts'],
    estimatedHours: 16,
    actualHours: 14
  },
  {
    id: '5',
    title: 'Performance optimization',
    description: 'Optimize application performance and loading times',
    projectId: '1',
    assigneeId: '3',
    priority: 'urgent',
    status: 'in-progress',
    dueDate: new Date('2024-01-24'),
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-22'),
    tags: ['optimization', 'performance'],
    estimatedHours: 10,
    actualHours: 8
  }
];

export const mockDashboardStats: DashboardStats = {
  totalTasks: 5,
  completedTasks: 1,
  inProgressTasks: 2,
  overdueTasks: 0,
  totalProjects: 3,
  activeProjects: 3,
  teamMembers: 4,
  productivity: 85
};