import { Clock, Phone, Globe, MessageSquare } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import type { CheckResult } from '../App';

interface RecentChecksProps {
  checks: CheckResult[];
}

export function RecentChecks({ checks }: RecentChecksProps) {
  const getIcon = (type: 'phone' | 'url' | 'message') => {
    switch (type) {
      case 'phone':
        return Phone;
      case 'url':
        return Globe;
      case 'message':
        return MessageSquare;
    }
  };

  const getThreatBadge = (level: 'safe' | 'suspicious' | 'dangerous') => {
    switch (level) {
      case 'safe':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'suspicious':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'dangerous':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  if (checks.length === 0) {
    return (
      <Card className="p-6 shadow-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h3 className="text-slate-900 dark:text-white">Recent Checks</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 dark:text-slate-400">No recent checks</p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            Your scan history will appear here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <h3 className="text-slate-900 dark:text-white">Recent Checks</h3>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-3">
          {checks.map((check) => {
            const Icon = getIcon(check.type);
            return (
              <div
                key={check.id}
                className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <Icon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-slate-900 dark:text-white truncate flex-1">
                        {check.input.length > 30
                          ? check.input.substring(0, 30) + '...'
                          : check.input}
                      </p>
                      <Badge className={getThreatBadge(check.threatLevel)}>
                        {check.threatLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Score: {check.score}/100
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {formatTimeAgo(check.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
