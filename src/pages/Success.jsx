import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Card from '../components/common/Card';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transaction, course } = location.state || {};

  if (!transaction || !course) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background-dark p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <Card className="text-center">
          <div className="mb-6">
            <CheckCircleIcon className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-text-secondary">
              Thank you for your purchase. You can now access your course.
            </p>
          </div>

          <div className="bg-card-background border border-border-color rounded-lg p-6 mb-6 text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Transaction Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Transaction ID:</span>
                <span className="text-white font-mono text-sm">
                  {transaction.id || transaction.transactionId || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Course:</span>
                <span className="text-white">{course.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Amount:</span>
                <span className="text-primary font-bold">
                  ${transaction.amount || course.discountPrice} {transaction.currency || 'USD'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Status:</span>
                <span className="text-green-400 font-medium">
                  {transaction.status || 'Succeeded'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Date:</span>
                <span className="text-white">
                  {new Date(transaction.created || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={() => window.open(`/courses/${course.id}`, '_blank')}
              className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2"
            >
              Access Course
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Success;
