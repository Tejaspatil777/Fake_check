import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface QuickValidationStatusProps {
  isValidating: boolean;
  isValid?: boolean;
  exists?: boolean;
  message?: string;
}

export function QuickValidationStatus({ isValidating, isValid, exists, message }: QuickValidationStatusProps) {
  if (isValidating) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Validating...</span>
      </motion.div>
    );
  }

  if (isValid === undefined) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-sm"
    >
      {isValid && exists ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-300">
            {message || 'Valid and exists'}
          </span>
        </>
      ) : isValid && !exists ? (
        <>
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-amber-700 dark:text-amber-300">
            {message || 'Valid format but not found'}
          </span>
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-red-700 dark:text-red-300">
            {message || 'Invalid format'}
          </span>
        </>
      )}
    </motion.div>
  );
}
