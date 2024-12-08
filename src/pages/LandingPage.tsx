import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FolderPlus, BarChart3, Store, Instagram } from 'lucide-react';
import HeroSection from '../components/landing/HeroSection';
import FeatureSection from '../components/landing/FeatureSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import HowItWorks from '../components/landing/HowItWorks';
import FAQSection from '../components/landing/FAQSection';
import FinalCTA from '../components/landing/FinalCTA';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FolderPlus className="w-6 h-6" />,
      title: "Project Management",
      description: "Organize your content creation by projects. Keep all your business information and content in one place."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Content Generation",
      description: "Generate SEO-optimized blog posts, Instagram content, and Google Business posts tailored to your brand."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Content Strategy",
      description: "Get detailed content strategies for your social media channels with actionable insights and plans."
    }
  ];

  const benefits = [
    {
      icon: <Store className="w-6 h-6" />,
      title: "Multi-Platform Content",
      description: "Create content for blogs, Instagram, and Google Business from one dashboard."
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Social Media Ready",
      description: "Generate platform-specific content that engages your audience and drives results."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Strategic Approach",
      description: "Get data-driven content strategies that align with your business goals."
    }
  ];

  const handleGetStarted = () => {
    navigate('/projects');
  };

  return (
    <div className="w-full">
      <HeroSection onGetStarted={handleGetStarted} />
      
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Complete Content Creation Hub
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Struggling to create impactful content for your business? Our platform helps you generate
              engaging content across multiple channels while maintaining brand consistency.
            </p>
          </div>
        </div>
      </div>

      <FeatureSection features={features} onGetStarted={handleGetStarted} />
      <BenefitsSection benefits={benefits} />
      <HowItWorks onGetStarted={handleGetStarted} />
      <FAQSection />
      <FinalCTA onGetStarted={handleGetStarted} />
    </div>
  );
}