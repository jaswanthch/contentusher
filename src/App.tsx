import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import ProjectLayout from './components/ProjectLayout';
import BlogSuggestions from './pages/BlogSuggestions';
import BlogWriter from './pages/BlogWriter';
import InstagramGenerator from './pages/InstagramGenerator';
import GoogleBusinessGenerator from './pages/GoogleBusinessGenerator';
import ContentStrategy from './pages/ContentStrategy';
import LandingPage from './pages/LandingPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog-suggestions" element={<ProjectLayout><BlogSuggestions /></ProjectLayout>} />
            <Route path="/blog-writer" element={<ProjectLayout><BlogWriter /></ProjectLayout>} />
            <Route path="/instagram" element={<ProjectLayout><InstagramGenerator /></ProjectLayout>} />
            <Route path="/google-my-business" element={<ProjectLayout><GoogleBusinessGenerator /></ProjectLayout>} />
            <Route path="/content-strategy" element={<ProjectLayout><ContentStrategy /></ProjectLayout>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;