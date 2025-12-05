'use client';

import React, { useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  FileText
} from 'lucide-react';
import ThemeSelector from '../ui/ThemeSelector';
import { useAuth } from '../../lib/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItemsDef = [
  { id: 'overview', segment: 'overview', label: 'Übersicht', icon: LayoutDashboard },
  { id: 'team', segment: 'team', label: 'Team', icon: Users },
  { id: 'settings', segment: 'settings', label: 'Einstellungen', icon: Settings },
] as const;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Determine base path: /demo/dashboard or /[slug]/dashboard
  const getBasePath = useCallback(() => {
    if (pathname.startsWith('/demo/dashboard')) {
      return '/demo/dashboard';
    }
    // Extract org slug from pathname like /mustermann/dashboard/...
    const match = pathname.match(/^\/([^/]+)\/dashboard/);
    if (match) {
      return `/${match[1]}/dashboard`;
    }
    return '/demo/dashboard'; // fallback
  }, [pathname]);

  const basePath = getBasePath();
  const navItems = navItemsDef.map(item => ({
    ...item,
    path: `${basePath}/${item.segment}`,
  }));

  const handleLogout = useCallback(() => {
    logout();
    router.push('/');
  }, [logout, router]);

  const isPathActive = useCallback((path: string) => {
    return pathname.startsWith(path);
  }, [pathname]);

  const handleMobileNavClick = useCallback((path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300 font-sans">

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed inset-y-0 z-40">

        {/* Logo Area */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2 rounded-xl shadow-lg shadow-primary-500/20">
               <FileText size={20} className="fill-current" />
            </div>
            <div>
                <span className="font-bold text-lg text-slate-900 dark:text-white block leading-none">BelegBoost</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Kanzlei Cockpit</span>
            </div>
          </Link>
        </div>

        {/* User Profile Snippet */}
        {user && (
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs font-bold text-primary-700 dark:text-primary-400">
                        {user.avatar || user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
                    </div>
                </div>
            </div>
        )}

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isPathActive(item.path)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="px-2">
             <ThemeSelector className="w-full !border-slate-200 dark:!border-slate-700 justify-center" />
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-50">
         <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary-600 text-white p-1.5 rounded-lg">
               <FileText size={16} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">BelegBoost</span>
         </Link>
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
                        onClick={() => handleMobileNavClick(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            isPathActive(item.path)
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                        >
                        <item.icon size={18} />
                        {item.label}
                        </button>
                    ))}
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500">
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
