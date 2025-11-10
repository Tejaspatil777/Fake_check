import { AlertTriangle, Shield, XCircle, CheckCircle2, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { ValidationDetails } from './ValidationDetails';
import type { CheckResult } from '../App';

interface ResultsDisplayProps {
  result: CheckResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  // Validate result data
  if (!result) {
    return (
      <Card className="p-6 shadow-lg border-2 border-red-200 bg-red-50 dark:bg-slate-900 dark:border-slate-700">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Error: No result data available. Please try checking again.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  const getThreatConfig = () => {
    try {
      switch (result.threatLevel) {
        case 'safe':
          return {
            icon: Shield,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-950',
            borderColor: 'border-green-200 dark:border-green-800',
            badge: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700',
            title: 'Safe',
            description: 'No immediate threats detected',
            progressColor: 'bg-green-600'
          };
        case 'suspicious':
          return {
            icon: AlertTriangle,
            color: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-50 dark:bg-amber-950',
            borderColor: 'border-amber-200 dark:border-amber-800',
            badge: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700',
            title: 'Suspicious',
            description: 'Exercise caution and verify before proceeding',
            progressColor: 'bg-amber-600'
          };
        case 'dangerous':
          return {
            icon: XCircle,
            color: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-50 dark:bg-red-950',
            borderColor: 'border-red-200 dark:border-red-800',
            badge: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-700',
            title: 'Dangerous',
            description: 'Strong indicators of malicious activity',
            progressColor: 'bg-red-600'
          };
        default:
          // Fallback for unexpected threat levels
          return {
            icon: AlertTriangle,
            color: 'text-slate-600 dark:text-slate-400',
            bgColor: 'bg-slate-50 dark:bg-slate-800',
            borderColor: 'border-slate-200 dark:border-slate-700',
            badge: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600',
            title: 'Unknown',
            description: 'Unable to determine threat level',
            progressColor: 'bg-slate-600'
          };
      }
    } catch (error) {
      console.error('Error in getThreatConfig:', error);
      return {
        icon: AlertTriangle,
        color: 'text-slate-600 dark:text-slate-400',
        bgColor: 'bg-slate-50 dark:bg-slate-800',
        borderColor: 'border-slate-200 dark:border-slate-700',
        badge: 'bg-slate-100 text-slate-700 border-slate-300',
        title: 'Error',
        description: 'Error processing threat assessment',
        progressColor: 'bg-slate-600'
      };
    }
  };

  const config = getThreatConfig();
  const Icon = config.icon;

  const getTypeLabel = () => {
    try {
      switch (result.type) {
        case 'phone':
          return 'Phone Number';
        case 'url':
          return 'Website URL';
        case 'message':
          return 'Message';
        default:
          return 'Unknown Type';
      }
    } catch (error) {
      console.error('Error in getTypeLabel:', error);
      return 'Unknown';
    }
  };

  return (
    <Card className={`p-6 shadow-lg border-2 ${config.borderColor} ${config.bgColor} dark:bg-slate-900 dark:border-slate-700`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className={`p-3 ${config.bgColor} dark:bg-slate-800 rounded-xl border ${config.borderColor} dark:border-slate-700`}>
            <Icon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-slate-900 dark:text-white">Threat Assessment Complete</h3>
              <Badge className={config.badge}>{config.title}</Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-400">{config.description}</p>
          </div>
        </div>
      </div>

      {/* Security Score */}
      <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-700 dark:text-slate-300">Security Score</span>
          <span className={`${config.color}`}>
            {result.score !== undefined && result.score !== null 
              ? Math.max(0, Math.min(100, result.score)) 
              : 0}/100
          </span>
        </div>
        <Progress 
          value={result.score !== undefined && result.score !== null 
            ? Math.max(0, Math.min(100, result.score)) 
            : 0} 
          className="h-2" 
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {result.score >= 80
            ? 'High confidence in safety assessment'
            : result.score >= 50
            ? 'Moderate risk detected'
            : 'High risk - proceed with extreme caution'}
        </p>
      </div>

      {/* Checked Item */}
      <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">{getTypeLabel()}</span>
          </div>
          {result.validation && (
            <div className="flex items-center gap-2">
              {result.validation.exists ? (
                <Badge className="bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Exists
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="w-3 h-3 mr-1" />
                  Not Found
                </Badge>
              )}
            </div>
          )}
        </div>
        <p className="text-slate-900 dark:text-white break-all font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-700">
          {result.input || 'No input provided'}
        </p>
      </div>

      {/* Findings */}
      <div className="space-y-2">
        <h4 className="text-slate-900 dark:text-white mb-3">Analysis Details</h4>
        {result.details && result.details.length > 0 ? (
          result.details.map((detail, index) => (
            <Alert key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CheckCircle2 className={`w-4 h-4 ${
                result.threatLevel === 'safe' 
                  ? 'text-green-600 dark:text-green-400' 
                  : result.threatLevel === 'suspicious' 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-red-600 dark:text-red-400'
              }`} />
              <AlertDescription className="text-slate-700 dark:text-slate-300">
                {detail || 'No details available'}
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <Alert className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <Info className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <AlertDescription className="text-slate-700 dark:text-slate-300">
              No detailed analysis available
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Recommendation */}
      <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-blue-200 dark:border-blue-800">
        <h4 className="text-slate-900 dark:text-white mb-2">Recommendation</h4>
        <p className="text-slate-700 dark:text-slate-300">
          {result.threatLevel === 'safe'
            ? 'This appears to be legitimate. However, always remain vigilant and verify sender identity through official channels.'
            : result.threatLevel === 'suspicious'
            ? 'Do not share personal information. Verify the sender through official channels before taking any action.'
            : 'Do not interact with this content. Block the sender and report to appropriate authorities. Never click links or share information.'}
        </p>
      </div>

      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Checked at: {result.timestamp ? new Date(result.timestamp).toLocaleString() : 'Unknown time'}
      </div>

      {/* Validation Details - shown below main results */}
      {result.validation && result.validation.metadata && (
        <div className="mt-6">
          <ValidationDetails 
            type={result.type}
            metadata={result.validation.metadata}
          />
        </div>
      )}
    </Card>
  );
}
