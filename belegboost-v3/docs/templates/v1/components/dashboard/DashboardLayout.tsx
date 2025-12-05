import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  FileText
} from 'lucide-react';
import ThemeSelector from '../ThemeSelector';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: 'overview' | 'team' | 'settings';
  onNavigate: (page: 'overview' | 'team' | 'settings') => void;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activePage, 
  onNavigate, 
  onLogout 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Übersicht', icon: LayoutDashboard },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Einstellungen', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300 font-sans">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed inset-y-0 z-40">
        
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2 rounded-xl shadow-lg shadow-primary-500/20">
               <FileText size={20} className="fill-current" />
            </div>
            <div>
                <span className="font-bold text-lg text-slate-900 dark:text-white block leading-none">BelegBoost</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Kanzlei Cockpit</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activePage === item.id 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="px-2">
             <ThemeSelector showVariantSwitcher={false} className="w-full !border-slate-200 dark:!border-slate-700 justify-center" />
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-50">
         <div className="flex items-center gap-2">
            <div className="bg-primary-600 text-white p-1.5 rounded-lg">
               <FileText size={16} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">BelegBoost</span>
         </div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 dark:text-slate-300">
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
         <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shadow-xl" onClick={e => e.stopPropagation()}>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <button
                        key={item.id}
                        onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            activePage === item.id 
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                        >
                        <item.icon size={18} />
                        {item.label}
                        </button>
                    ))}
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500">
                        <LogOut size={18} /> Abmelden
                    </button>
                </nav>
            </div>
         </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:pl-64 pt-16 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;