import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TaskBoard } from './components/TaskBoard';
import { ProjectView } from './components/ProjectView';
import { TeamView } from './components/TeamView';
import { ReportsView } from './components/ReportsView';
import { Task, Project, User, ViewMode } from './types';
import { mockUsers, mockProjects, mockTasks, mockDashboardStats } from './data/mockData';
import { useLocalStorage } from './hooks/useLocalStorage';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  // Get the current path and extract the view name, defaulting to 'dashboard' if invalid
  const pathView = location.pathname.split('/')[1] || 'dashboard';
  const activeView: ViewMode = ['dashboard', 'tasks', 'projects', 'team', 'reports'].includes(pathView) 
    ? pathView as ViewMode 
    : 'dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeView={activeView}
        onViewChange={(view) => {
          // The view is already validated as ViewMode
          navigate(`/${view}`);
        }}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentUser={currentUser}
        />
        
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard
                  stats={mockDashboardStats}
                  recentTasks={tasks}
                  projects={projects}
                />
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <TaskBoard
                  tasks={tasks}
                  projects={projects}
                  users={users}
                  onTaskUpdate={handleTaskUpdate}
                  onTaskCreate={handleTaskCreate}
                />
              } 
            />
            <Route 
              path="/projects" 
              element={
                <ProjectView
                  projects={projects}
                  tasks={tasks}
                  users={users}
                  onProjectUpdate={handleProjectUpdate}
                  onProjectCreate={handleProjectCreate}
                />
              } 
            />
            <Route 
              path="/team" 
              element={
                <TeamView
                  users={users}
                  tasks={tasks}
                  projects={projects}
                />
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ReportsView
                  tasks={tasks}
                  projects={projects}
                  users={users}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;