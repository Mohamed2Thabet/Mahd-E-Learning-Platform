import { useState, useEffect } from 'react';
import { HeartIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import paymentService from '../components/services/paymentService';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';


const HealthCheck = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await paymentService.checkHealth();
      setHealth(response);
      setLastChecked(new Date());
    } catch (error) {
      setHealth({
        success: false,
        status: 0,
        message: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getStatusColor = (success) => success ? 'text-green-400' : 'text-red-400';
  const getStatusBg = (success) => success ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500';

  return (
    <div className="min-h-screen bg-background-dark p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Health Check</h1>
            <p className="text-text-secondary">Monitor payment service status</p>
          </div>
          <button
            onClick={checkHealth}
            disabled={loading}
            className="btn-primary px-4 py-2 rounded-lg flex items-center gap-2"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <ArrowPathIcon className="w-5 h-5" />
            )}
            Refresh
          </button>
        </div>

        <Card icon={HeartIcon} title="Service Status">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`p-4 border rounded-lg ${getStatusBg(health?.success)}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">API Connection</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(health?.success)}`}>
                    {health?.success ? 'Healthy' : 'Unhealthy'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-text-secondary">Status Code</p>
                    <p className="text-white font-medium">{health?.status || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Service</p>
                    <p className="text-white font-medium">{health?.service || 'payment-service'}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Last Checked</p>
                    <p className="text-white font-medium">
                      {lastChecked ? lastChecked.toLocaleTimeString() : 'Never'}
                    </p>
                  </div>
                </div>

                {health?.message && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <p className="text-text-secondary text-sm">Message:</p>
                    <p className="text-white">{health.message}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-card-background border border-border-color rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Environment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">API URL:</span>
                      <span className="text-white font-mono text-xs">{import.meta.env.VITE_PAYMENT_API_URL}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Stripe Key:</span>
                      <span className="text-white font-mono text-xs">
                        {import.meta.env.VITE_STRIPE_PUBLIC_KEY ? '✅ Configured' : '❌ Missing'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card-background border border-border-color rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Connection Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Response Time:</span>
                      <span className="text-white"> 1s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Timestamp:</span>
                      <span className="text-white font-mono text-xs">
                        {health?.timestamp ? new Date(health.timestamp).toLocaleString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HealthCheck;
