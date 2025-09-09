import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const AuthLinks = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    // For demo purposes, show alert with mock instructions
    alert('Password reset instructions would be sent to your email address.');
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="space-y-4">
      {/* Forgot Password Link */}
      <div className="text-center">
        <button
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Forgot your password?
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Create Account Button */}
      <Button
        variant="outline"
        fullWidth
        onClick={handleCreateAccount}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create New Account
      </Button>
    </div>
  );
};

export default AuthLinks;