import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for demo
  const mockCredentials = {
    landlord: { email: 'landlord@findmyhome.com', password: 'landlord123' },
    tenant: { email: 'tenant@findmyhome.com', password: 'tenant123' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      let userRole = null;
      if (formData?.email === mockCredentials?.landlord?.email && 
          formData?.password === mockCredentials?.landlord?.password) {
        userRole = 'landlord';
      } else if (formData?.email === mockCredentials?.tenant?.email && 
                 formData?.password === mockCredentials?.tenant?.password) {
        userRole = 'tenant';
      }

      if (userRole) {
        // If there is an existing authenticated session with a different role, require sign-out first
        const existingRole = localStorage.getItem('userRole');
        const existingAuth = localStorage.getItem('isAuthenticated') === 'true';

        if (existingAuth && existingRole && existingRole !== userRole) {
          // Prompt user to sign out before switching roles
          setErrors({
            general: `You're currently signed in as ${existingRole}. Please sign out before signing in as a ${userRole}.`,
          });

          // store pending desired role so user can choose to sign out and continue
          setPendingRole({ role: userRole, email: formData?.email });
          setIsLoading(false);
          return;
        }

        // Store user session
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userEmail', formData?.email);

        onLogin(userRole);

        // Navigate to appropriate dashboard
        if (userRole === 'landlord') {
          navigate('/landlord-dashboard');
        } else {
          navigate('/tenant-dashboard');
        }
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
