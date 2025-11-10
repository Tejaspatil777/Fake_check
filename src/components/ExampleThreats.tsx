import { AlertTriangle, Phone, Globe, MessageSquare } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ExampleThreatsProps {
  onTestExample: (type: 'phone' | 'url' | 'message', example: string) => void;
}

export function ExampleThreats({ onTestExample }: ExampleThreatsProps) {
  const examples = {
    phone: [
      { number: '555-0100', label: 'Known Scam', level: 'dangerous' },
      { number: '555-0150', label: 'Suspicious Pattern', level: 'suspicious' },
      { number: '+1-555-1234', label: 'Safe Example', level: 'safe' }
    ],
    url: [
      { url: 'https://urgent-verify-account.com', label: 'Phishing Site', level: 'dangerous' },
      { url: 'https://bit.ly/suspicious', label: 'URL Shortener', level: 'suspicious' },
      { url: 'https://google.com', label: 'Legitimate Site', level: 'safe' }
    ],
    message: [
      { 
        text: 'URGENT: Your account has been suspended. Click here now to verify: bit.ly/verify123', 
        label: 'Phishing Message', 
        level: 'dangerous' 
      },
      { 
        text: 'Congratulations! You won a prize. Limited time offer, act now!', 
        label: 'Suspicious Spam', 
        level: 'suspicious' 
      },
      { 
        text: 'Your package will be delivered tomorrow between 2-4pm. Track: amazon.com/track', 
        label: 'Normal Message', 
        level: 'safe' 
      }
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'dangerous':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'suspicious':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'safe':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        <h3 className="text-slate-900 dark:text-white">Test Examples</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Try these examples to see how the detection system works
      </p>

      <div className="space-y-4">
        {/* Phone Examples */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h4 className="text-slate-900 dark:text-white">Phone Numbers</h4>
          </div>
          <div className="space-y-2">
            {examples.phone.map((example, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <code className="text-slate-900 dark:text-white">{example.number}</code>
                  <Badge className={getLevelColor(example.level)}>{example.label}</Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onTestExample('phone', example.number)}
                  className="ml-2"
                >
                  Test
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* URL Examples */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h4 className="text-slate-900 dark:text-white">Websites</h4>
          </div>
          <div className="space-y-2">
            {examples.url.map((example, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <code className="text-slate-900 dark:text-white truncate text-xs">{example.url}</code>
                  <Badge className={getLevelColor(example.level)}>{example.label}</Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onTestExample('url', example.url)}
                  className="ml-2"
                >
                  Test
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Message Examples */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h4 className="text-slate-900 dark:text-white">Messages</h4>
          </div>
          <div className="space-y-2">
            {examples.message.map((example, index) => (
              <div
                key={index}
                className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getLevelColor(example.level)}>{example.label}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onTestExample('message', example.text)}
                  >
                    Test
                  </Button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic">{example.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
