import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import RoleSelector from './RoleSelector';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import { registerUser } from '../../../services/authServices';
import { toast } from "react-toastify";
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock existing emails for duplicate detection
  const existingEmails = [
    'john@example.com',
    'sarah@example.com',
    'mike@example.com'
  ];

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (existingEmails?.includes(formData?.email?.toLowerCase())) {
      newErrors.email = 'An account with this email already exists';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone validation
    if (!formData?.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Role validation
    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    // Terms validation
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    // Privacy validation
    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }



    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
     
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      console.log('Registration successful:', formData);
      try {
        const res = await registerUser(formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Login success:", res.data);
        toast.success( res.data);
         const dashboardPath = formData?.role === 'landlord' ? '/landlord-dashboard' : '/tenant-dashboard';
      navigate(dashboardPath)
      } catch (err) {
      //    console.log("Error response:", err.response.data);
      // console.log("Status:", err.response.status);
      // console.log("Headers:", err.response.headers);
     toast.error(err.response.data.error || "❌ Registration failed!");
        // console.error("Login failed:", err);
      }
      // Redirect based on role
     ;

    } catch (error) {
       toast.success('error')
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={(e) => handleInputChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
      />
      {/* Email */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        description="We'll use this for account verification and important updates"
        required
      />
      {/* Password */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
        <PasswordStrengthIndicator password={formData?.password} />
      </div>
      {/* Confirm Password */}
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>
      {/* Phone Number */}
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={formData?.phoneNumber}
        onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
        error={errors?.phoneNumber}
        description="We'll use this for important account notifications"
        required
      />
      {/* Role Selection */}
      <RoleSelector
        selectedRole={formData?.role}
        onRoleChange={(role) => handleInputChange('role', role)}
        error={errors?.role}
      />
      {/* Terms and Privacy */}
      <div className="space-y-4">
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => window.open('/terms', '_blank')}
                className="text-primary hover:text-primary/80 underline"
              >
                Terms of Service
              </button>
            </span>
          }
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => window.open('/privacy', '_blank')}
                className="text-primary hover:text-primary/80 underline"
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={formData?.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
          error={errors?.agreeToPrivacy}
          required
        />
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-2" />
            {errors?.submit}
          </p>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign in here
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;