import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing session to require login on initial app open
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
    } catch {}
    const t = setTimeout(() => {
      navigate('/login');
    }, 5000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Icon name="Building2" size={40} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Findmyhome</h1>
        <p className="text-sm text-muted-foreground mt-2">Loading…</p>
      </div>
    </div>
  );
};

export default Splash;
