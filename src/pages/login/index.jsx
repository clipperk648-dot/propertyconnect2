import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import LoginForm from './components/LoginForm';
import AuthLinks from './components/AuthLinks';
import TrustSignals from './components/TrustSignals';
import DemoCredentials from './components/DemoCredentials';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (authStatus === 'true' && userRole) {
      // Redirect to appropriate dashboard
      if (userRole === 'landlord') {
        navigate('/landlord-dashboard');
      } else {
        navigate('/tenant-dashboard');
      }
    }
  }, [navigate]);

  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
  };

  const handleDemoCredentialSelect = (email, password) => {
    // Auto-fill the form with demo credentials
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    
    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = password;
      
      // Trigger change events
      emailInput?.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput?.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">Findmyhome</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                New to PropertyConnect?
              </span>
              <button
                onClick={() => navigate('/register')}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon name="LogIn" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your Findmyhome account to access your dashboard
            </p>
          </div>

          {/* Login Form Card */}
          <div className="bg-card p-8 rounded-lg border border-border elevation-1">
            <LoginForm onLogin={handleLogin} />
            
            <div className="mt-6">
              <AuthLinks />
            </div>

            <DemoCredentials onCredentialSelect={handleDemoCredentialSelect} />
            
            <TrustSignals />
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{' '}
              <button className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} Findmyhome. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Contact Support
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                System Status
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
