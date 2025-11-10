import { Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

export function StatsPanel() {
  const stats = [
    {
      icon: Shield,
      label: 'Threats Blocked Today',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    {
      icon: AlertTriangle,
      label: 'Active Investigations',
      value: '89',
      change: '-5.2%',
      trend: 'down',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      borderColor: 'border-amber-200'
    },
    {
      icon: TrendingUp,
      label: 'Database Entries',
      value: '2.4M',
      change: '+8.3%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={`p-6 shadow-lg border ${stat.borderColor} dark:border-slate-800 dark:bg-slate-900 hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-slate-600 dark:text-slate-400 mb-2">{stat.label}</p>
                <p className="text-slate-900 dark:text-white mb-2">{stat.value}</p>
                <div className="flex items-center gap-1">
                  <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">from yesterday</span>
                </div>
              </div>
              <div className={`p-3 ${stat.bgColor} dark:bg-slate-800 rounded-xl border ${stat.borderColor} dark:border-slate-700`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
}
