import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Create Account - PropertyConnect</title>
        <meta name="description" content="Join PropertyConnect to list properties or find your perfect home. Create your account today." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold">PropertyConnect</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Already have an account?
                </span>
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  iconName="LogIn"
                  iconPosition="left"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Left Side - Hero Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-foreground leading-tight">
                      Join PropertyConnect Today
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      Whether you're looking to list properties or find your perfect home, 
                      PropertyConnect makes real estate simple and efficient.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      Why choose PropertyConnect?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: 'Shield', title: 'Secure & Trusted', desc: 'Your data is protected with enterprise-grade security' },
                        { icon: 'Zap', title: 'Fast & Easy', desc: 'Get started in minutes with our streamlined process' },
                        { icon: 'Users', title: 'Connect Directly', desc: 'Message property owners and tenants directly' },
                        { icon: 'BarChart3', title: 'Smart Analytics', desc: 'Track your listings and applications with insights' }
                      ]?.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon name={benefit?.icon} size={20} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground text-sm">{benefit?.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{benefit?.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="hidden lg:block">
                  <div className="relative rounded-2xl overflow-hidden elevation-2">
                    <Image
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Modern apartment building representing PropertyConnect platform"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="hidden lg:block space-y-4">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} className="text-success" />
                      <span>SSL Secured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span>10,000+ Users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-warning" />
                      <span>4.8/5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Registration Form */}
              <div className="w-full">
                <div className="bg-card border border-border rounded-2xl p-8 elevation-1">
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold text-foreground">Create Your Account</h2>
                      <p className="text-muted-foreground">
                        Get started with PropertyConnect in just a few steps
                      </p>
                    </div>

                    <RegistrationForm />
                  </div>
                </div>

                {/* Mobile Trust Indicators */}
                <div className="lg:hidden mt-6 flex justify-center items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span>10K+ Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Icon name="Building2" size={16} color="white" />
                </div>
                <span className="font-semibold text-foreground">PropertyConnect</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <button
                  onClick={() => window.open('/terms', '_blank')}
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => window.open('/privacy', '_blank')}
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => window.open('/help', '_blank')}
                  className="hover:text-foreground transition-colors"
                >
                  Help Center
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} PropertyConnect. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;