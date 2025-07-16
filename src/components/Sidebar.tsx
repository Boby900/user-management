import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Settings,
  X
} from 'lucide-react';
import { ViewMode } from '../types';
interface SidebarProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'projects', icon: FolderOpen, label: 'Projects' },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
  { id: 'team', icon: Users, label: 'Team' },
  { id: 'reports', icon: BarChart3, label: 'Reports' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  isCollapsed,
  onToggle
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TaskFlow</span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewMode)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors
                  ${activeView === item.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};