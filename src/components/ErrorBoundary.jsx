import React from "react";
import Icon from "./AppIcon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // mark error and expose to any global handler
    error.__ErrorBoundary = true;
    this.setState({ error, errorInfo });
    try {
      window.__COMPONENT_ERROR__?.(error, errorInfo);
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;

      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
          <div className="text-center p-6 max-w-3xl w-full">
            <div className="flex justify-center items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 32 33" fill="none">
                <path d="M16 28.5C22.6274 28.5 28 23.1274 28 16.5C28 9.87258 22.6274 4.5 16 4.5C9.37258 4.5 4 9.87258 4 16.5C4 23.1274 9.37258 28.5 16 28.5Z" stroke="#343330" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M11.5 15.5C12.3284 15.5 13 14.8284 13 14C13 13.1716 12.3284 12.5 11.5 12.5C10.6716 12.5 10 13.1716 10 14C10 14.8284 10.6716 15.5 11.5 15.5Z" fill="#343330" />
                <path d="M20.5 15.5C21.3284 15.5 22 14.8284 22 14C22 13.1716 21.3284 12.5 20.5 12.5C19.6716 12.5 19 13.1716 19 14C19 14.8284 19.6716 15.5 20.5 15.5Z" fill="#343330" />
                <path d="M21 22.5C19.9625 20.7062 18.2213 19.5 16 19.5C13.7787 19.5 12.0375 20.7062 11 22.5" stroke="#343330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="text-2xl font-medium text-neutral-800 mb-2">Something went wrong</h1>
            <p className="text-neutral-600 mb-4">We encountered an unexpected error while processing your request.</p>

            {isDev && (
              <div className="text-left bg-white border border-border rounded p-4 mb-4 overflow-auto text-xs">
                <div className="font-medium mb-2">Error:</div>
                <pre className="whitespace-pre-wrap">{String(this.state.error?.message || this.state.error)}</pre>
                <div className="font-medium mt-3 mb-2">Stack:</div>
                <pre className="whitespace-pre-wrap">{this.state.errorInfo?.componentStack || this.state.error?.stack}</pre>
              </div>
            )}

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200 shadow-sm"
              >
                Back
              </button>

              <button
                onClick={() => window.location.reload()}
                className="bg-card border border-border text-foreground font-medium py-2 px-4 rounded transition-colors duration-200"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;
