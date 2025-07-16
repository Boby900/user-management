import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TaskBoard } from './components/TaskBoard';
import { ProjectView } from './components/ProjectView';
import { TeamView } from './components/TeamView';
import { ReportsView } from './components/ReportsView';
import { ViewMode, Task, Project, User } from './types';
import { mockUsers, mockProjects, mockTasks, mockDashboardStats } from './data/mockData';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [activeView, setActiveView] = useState<ViewMode>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', mockTasks);
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', mockProjects);
  const [users] = useLocalStorage<User[]>('users', mockUsers);
  const [currentUser] = useState(mockUsers[0]);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskCreate = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project));
  };

  const handleProjectCreate = (newProject: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
    };
    setProjects([...projects, project]);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard
            stats={mockDashboardStats}
            recentTasks={tasks}
            projects={projects}
          />
        );
      case 'tasks':
        return (
          <TaskBoard
            tasks={tasks}
            projects={projects}
            users={users}
            onTaskUpdate={handleTaskUpdate}
            onTaskCreate={handleTaskCreate}
          />
        );
      case 'projects':
        return (
          <ProjectView
            projects={projects}
            tasks={tasks}
            users={users}
            onProjectUpdate={handleProjectUpdate}
            onProjectCreate={handleProjectCreate}
          />
        );
      case 'team':
        return (
          <TeamView
            users={users}
            tasks={tasks}
            projects={projects}
          />
        );
      case 'reports':
        return (
          <ReportsView
            tasks={tasks}
            projects={projects}
            users={users}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentUser={currentUser}
        />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;