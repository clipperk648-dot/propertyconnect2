import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { loginUser } from '../../../services/authServices';
import { toast } from "react-toastify";
const LoginForm = ({ onLogin, fillCredentials = null, intendedRole = null }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (fillCredentials && (fillCredentials.email || fillCredentials.password)) {
      setFormData(prev => ({
        ...prev,
        email: fillCredentials.email || prev.email,
        password: fillCredentials.password || prev.password
      }));
    }
  }, [fillCredentials]);

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
    } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
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

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));

      // Determine role with explicit selection precedence
      let userRole = intendedRole;
      if (!userRole) {
        if (formData?.email === mockCredentials?.landlord?.email && formData?.password === mockCredentials?.landlord?.password) {
          userRole = 'landlord';
        } else if (formData?.email === mockCredentials?.tenant?.email && formData?.password === mockCredentials?.tenant?.password) {
          userRole = 'tenant';
        } else if (typeof formData?.email === 'string' && formData?.email.toLowerCase().includes('landlord')) {
          userRole = 'landlord';
        } else {
          userRole = 'tenant';
        }
      }

      // Store user session
      try {
        const res = await loginUser(formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Login success:", res.data.user.role);
        toast.success(res.data.user.role);
        if (res.data.user) {
          console.log('lfgnsd');

          // Store user session
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', res.data.user);
          localStorage.setItem('userEmail', formData?.email || '');

          if (typeof onLogin === 'function') onLogin(userRole);

          // Navigate to appropriate dashboard
          if (userRole === 'landlord') {
            navigate('/landlord-dashboard');
          } else {
            navigate('/tenant-dashboard');
          }

        }
        return
      } catch (err) {

        toast.error(err.response.data.error || "❌ Registration failed!");
        // console.error("Login failed:", err);
      }
      if (typeof onLogin === 'function') onLogin(userRole);
      // Navigate to appropriate dashboard

    } catch (error) {
      setErrors({ general: 'Login failed. Please try again later.' });
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

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';
// import Icon from '../../../components/AppIcon';

// const LoginForm = ({ onLogin, fillCredentials = null, intendedRole = null }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (fillCredentials && (fillCredentials.email || fillCredentials.password)) {
//       setFormData(prev => ({
//         ...prev,
//         email: fillCredentials.email || prev.email,
//         password: fillCredentials.password || prev.password
//       }));
//     }
//   }, [fillCredentials]);

//   // Mock credentials for demo
//   const mockCredentials = {
//     landlord: { email: 'landlord@findmyhome.com', password: 'landlord123' },
//     tenant: { email: 'tenant@findmyhome.com', password: 'tenant123' }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e?.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error when user starts typing
//     if (errors?.[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData?.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData?.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData?.password?.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors)?.length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e?.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 700));

//       // Determine role with explicit selection precedence
//       let userRole = intendedRole;
//       if (!userRole) {
//         if (formData?.email === mockCredentials?.landlord?.email && formData?.password === mockCredentials?.landlord?.password) {
//           userRole = 'landlord';
//         } else if (formData?.email === mockCredentials?.tenant?.email && formData?.password === mockCredentials?.tenant?.password) {
//           userRole = 'tenant';
//         } else if (typeof formData?.email === 'string' && formData?.email.toLowerCase().includes('landlord')) {
//           userRole = 'landlord';
//         } else {
//           userRole = 'tenant';
//         }
//       }

//       // Store user session
//       // localStorage.setItem('isAuthenticated', 'true');
//       // localStorage.setItem('userRole', userRole);
//       // localStorage.setItem('userEmail', formData?.email || '');

//       if (typeof onLogin === 'function') onLogin(userRole);

//       // Navigate to appropriate dashboard
//       if (userRole === 'landlord') {
//         navigate('/landlord-dashboard');
//       } else {
//         navigate('/tenant-dashboard');
//       }
//     } catch (error) {
//       setErrors({ general: 'Login failed. Please try again later.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {errors?.general && (
//         <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
//           <div className="flex items-center space-x-2">
//             <Icon name="AlertCircle" size={16} className="text-error" />
//             <p className="text-sm text-error">{errors?.general}</p>
//           </div>
//         </div>
//       )}

//       <Input
//         label="Email Address"
//         type="email"
//         name="email"
//         placeholder="Enter your email"
//         value={formData?.email}
//         onChange={handleInputChange}
//         error={errors?.email}
//         required
//         disabled={isLoading}
//       />

//       <Input
//         label="Password"
//         type="password"
//         name="password"
//         placeholder="Enter your password"
//         value={formData?.password}
//         onChange={handleInputChange}
//         error={errors?.password}
//         required
//         disabled={isLoading}
//       />

//       <Button
//         type="submit"
//         variant="default"
//         fullWidth
//         loading={isLoading}
//         iconName="LogIn"
//         iconPosition="left"
//       >
//         {isLoading ? 'Signing In...' : 'Sign In'}
//       </Button>
//     </form>
//   );
// };

// export default LoginForm;