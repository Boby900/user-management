import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TaskBoard } from './components/TaskBoard';
import { ProjectView } from './components/ProjectView';
import { TeamView } from './components/TeamView';
import { ReportsView } from './components/ReportsView';
import { Task, Project, User, ViewMode } from './types';
// Remove mockData import
// import { mockUsers, mockProjects, mockTasks, mockDashboardStats } from './data/mockData';
// import { useLocalStorage } from './hooks/useLocalStorage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Fetch all data on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setCurrentUser(data[0] || null);
      });
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.map((project: any) => ({
          ...project,
          dueDate: new Date(project.dueDate),
          // If you have nested teamMembers, you may not need to convert anything else
        })));
      });
    fetch(`${API_BASE_URL}/api/tasks`)
      .then(res => res.json())
      .then(data => {
        setTasks(data.map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        })));
      });
    fetch(`${API_BASE_URL}/api/dashboard/stats`)
      .then(res => res.json())
      .then(setDashboardStats);
  }, []);

  // Update handlers (should POST/PUT to API in real app, here just update state)
  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    // Optionally: fetch(`${API_BASE_URL}/api/tasks/${updatedTask.id}`, { method: 'PUT', ... })
  };

  const handleTaskCreate = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
    // Optionally: fetch(`${API_BASE_URL}/api/tasks`, { method: 'POST', ... })
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project));
    // Optionally: fetch(`${API_BASE_URL}/api/projects/${updatedProject.id}`, { method: 'PUT', ... })
  };

  const handleProjectCreate = (newProject: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
    };
    setProjects([...projects, project]);
    // Optionally: fetch(`${API_BASE_URL}/api/projects`, { method: 'POST', ... })
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
        {/* Only render Header if currentUser is loaded */}
        {currentUser && (
          <Header
            onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            currentUser={currentUser}
          />
        )}
        
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* Only render Dashboard if dashboardStats is loaded */}
            <Route 
              path="/dashboard" 
              element={
                dashboardStats ? (
                  <Dashboard
                    stats={dashboardStats}
                    recentTasks={tasks}
                    projects={projects}
                  />
                ) : null
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