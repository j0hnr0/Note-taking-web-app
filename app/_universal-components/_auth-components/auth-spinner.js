const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Color classes
  const colorClasses = {
    primary: 'border-custom-blue-500',
    secondary: 'border-gray-500',
    success: 'border-green-500',
    danger: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-indigo-500'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  const spinnerColor = colorClasses[color] || colorClasses.primary;

  return (
    <div className="flex items-center justify-center">
      <div className={`${spinnerSize} border-4 border-t-transparent ${spinnerColor} rounded-full animate-spin`}></div>
    </div>
  );
};

// Loading container with text for authentication specifically
const AuthSpinner = ({ message = "Authenticating..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <LoadingSpinner size="lg" color="primary" />
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export { LoadingSpinner, AuthSpinner };
export default AuthSpinner;