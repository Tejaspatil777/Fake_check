import { useEffect, useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, Info, Zap, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AIThreatAnalyzer } from './aiService';
import { motion, AnimatePresence } from 'motion/react';

interface AIAnalysisPanelProps {
  type: 'phone' | 'url' | 'message';
  input: string;
  isActive: boolean;
}

export function AIAnalysisPanel({ type, input, isActive }: AIAnalysisPanelProps) {
  const [insights, setInsights] = useState<{
    warnings: string[];
    suggestions: string[];
    liveIndicators: string[];
  }>({ warnings: [], suggestions: [], liveIndicators: [] });
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (!isActive || !input || input.trim().length < 3) {
      setInsights({ warnings: [], suggestions: [], liveIndicators: [] });
      setConfidence(0);
      return;
    }

    // Simulate AI processing delay
    const timer = setTimeout(() => {
      const analysis = AIThreatAnalyzer.getRealTimeInsights(type, input);
      setInsights(analysis);
      
      // Calculate confidence based on input length and patterns
      const baseConfidence = Math.min(85, (input.length / 20) * 100);
      const warningBonus = analysis.warnings.length * 10;
      setConfidence(Math.min(100, baseConfidence + warningBonus));
    }, 300);

    return () => clearTimeout(timer);
  }, [input, type, isActive]);

  if (!isActive || input.trim().length < 3) {
    return null;
  }

  const hasWarnings = insights.warnings.length > 0;
  const hasSuggestions = insights.suggestions.length > 0;
  const hasIndicators = insights.liveIndicators.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="p-4 mb-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-purple-900 dark:text-purple-200">AI Real-Time Analysis</h3>
                <Badge variant="outline" className="text-xs bg-purple-100 dark:bg-purple-900/50 border-purple-300 dark:border-purple-700">
                  <Zap className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={confidence} className="h-1.5 flex-1" />
                <span className="text-xs text-purple-700 dark:text-purple-300">{Math.round(confidence)}%</span>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {hasWarnings && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2 mb-3"
            >
              {insights.warnings.map((warning, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800"
                >
                  <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-orange-900 dark:text-orange-200">{warning}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Live Indicators */}
          {hasIndicators && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2 mb-3"
            >
              {insights.liveIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800"
                >
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-900 dark:text-blue-200">{indicator}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Suggestions */}
          {hasSuggestions && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              {insights.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-green-900 dark:text-green-200">{suggestion}</p>
                </div>
              ))}
            </motion.div>
          )}

          <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 text-xs text-purple-700 dark:text-purple-300">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>AI is analyzing patterns in real-time as you type</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
