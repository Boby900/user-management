export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'developer' | 'designer';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
  dueDate: Date;
  status: 'active' | 'completed' | 'on-hold';
  teamMembers: User[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  estimatedHours: number;
  actualHours: number;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  totalProjects: number;
  activeProjects: number;
  teamMembers: number;
  productivity: number;
}

export type ViewMode = 'dashboard' | 'projects' | 'tasks' | 'team' | 'reports';
export type FilterType = 'all' | 'assigned' | 'priority' | 'status' | 'project';