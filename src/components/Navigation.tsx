import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FolderPlus, Menu, X } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative
    ${isActive 
      ? 'text-[var(--primary)] font-medium bg-indigo-50' 
      : 'text-gray-600 hover:text-[var(--primary)] hover:bg-gray-50'}`;

  const mobileButtonClasses = (isActive: boolean) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300
    ${isActive 
      ? 'text-[var(--primary)] font-medium bg-indigo-50' 
      : 'text-gray-600 hover:text-[var(--primary)] hover:bg-gray-50'}`;

  return (
    <nav className={`nav-glass sticky top-0 z-50 shadow-sm ${isLandingPage ? 'bg-white' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavigate('/')}
          >
            <span className="text-2xl font-bold text-[var(--primary)]">
              Content Usher
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/projects" className={navLinkClasses}>
              <FolderPlus className="w-5 h-5" />
              <span>Projects</span>
            </NavLink>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="menu-button md:hidden p-2 text-gray-600 hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-gray-50"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div 
          className={`mobile-menu md:hidden fixed inset-0 top-16 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className={`bg-white border-t border-gray-100 transition-transform duration-300 ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="flex flex-col p-4 space-y-2">
              <NavLink
                to="/projects"
                className={({ isActive }) => mobileButtonClasses(isActive)}
              >
                <FolderPlus className="w-5 h-5" />
                <span>Projects</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}