import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Alert = ({ type = 'info', message, onClose, className = "" }) => {
  if (!message) return null;

  const alertStyles = {
    success: 'bg-green-900/20 border-green-500 text-green-400',
    error: 'bg-red-900/20 border-red-500 text-red-400',
    warning: 'bg-yellow-900/20 border-yellow-500 text-yellow-400',
    info: 'bg-blue-900/20 border-blue-500 text-blue-400'
  };

  const icons = {
    success: CheckCircleIcon,
    error: ExclamationTriangleIcon,
    warning: ExclamationTriangleIcon,
    info: ExclamationTriangleIcon
  };

  const Icon = icons[type];

  return (
    <div className={`border rounded-lg px-4 py-3 mb-4 flex justify-between items-center ${alertStyles[type]} ${className}`}>
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-2" />
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="hover:opacity-70">
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
