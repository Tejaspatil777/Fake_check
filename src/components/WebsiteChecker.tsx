import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Globe, Search, AlertTriangle, CheckCircle2, XCircle, Shield, Lock, Calendar } from 'lucide-react';
import { Progress } from './ui/progress';

interface WebsiteAnalysis {
  status: 'secure' | 'suspicious' | 'dangerous';
  riskScore: number;
  indicators: {
    ssl: boolean;
    domainAge: string;
    reputation: string;
    phishing: boolean;
  };
  findings: string[];
  warnings: string[];
}

export function WebsiteChecker() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<WebsiteAnalysis | null>(null);

  const analyzeWebsite = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock analysis
    const mockResults: WebsiteAnalysis[] = [
      {
        status: 'secure',
        riskScore: 8,
        indicators: {
          ssl: true,
          domainAge: '5 years',
          reputation: 'Excellent',
          phishing: false
        },
        findings: [
          'Valid SSL certificate detected',
          'Domain registered with verified registrar',
          'No phishing patterns detected',
          'Good reputation score',
          'Regular security updates'
        ],
        warnings: []
      },
      {
        status: 'suspicious',
        riskScore: 72,
        indicators: {
          ssl: false,
          domainAge: '2 months',
          reputation: 'Poor',
          phishing: true
        },
        findings: [
          'No SSL certificate (not HTTPS)',
          'Recently registered domain',
          'Suspicious URL structure',
          'Similar to known legitimate sites',
          'Limited web presence'
        ],
        warnings: [
          'This website may be attempting to impersonate a legitimate service',
          'Avoid entering personal or financial information',
          'Domain was created very recently'
        ]
      },
      {
        status: 'dangerous',
        riskScore: 95,
        indicators: {
          ssl: false,
          domainAge: '3 days',
          reputation: 'Blacklisted',
          phishing: true
        },
        findings: [
          'Domain on multiple blacklists',
          'Confirmed phishing attempts',
          'Impersonating major brand',
          'Hosting malicious content',
          'Extremely new domain'
        ],
        warnings: [
          'DO NOT visit or interact with this website',
          'This is a confirmed malicious website',
          'May steal credentials and personal data',
          'Could install malware on your device'
        ]
      }
    ];

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setResult(randomResult);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-600 bg-green-50 border-green-200';
      case 'suspicious': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'dangerous': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure': return <CheckCircle2 className="w-6 h-6" />;
      case 'suspicious': return <AlertTriangle className="w-6 h-6" />;
      case 'dangerous': return <XCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8 bg-white shadow-lg border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Website Security Checker</h3>
            <p className="text-sm text-slate-600">Detect fake websites and phishing attempts</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-700 mb-2 block">Enter Website URL</label>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                disabled={isAnalyzing}
              />
              <Button 
                onClick={analyzeWebsite}
                disabled={isAnalyzing || !url.trim()}
                className="px-6"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Scanning
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Scan
                  </>
                )}
              </Button>
            </div>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Performing security scan...</span>
                <span className="text-slate-500">Checking SSL, domain, reputation</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          )}
        </div>
      </Card>

      {result && (
        <Card className={`p-6 sm:p-8 border-2 ${getStatusColor(result.status)}`}>
          <div className="space-y-6">
            {/* Status Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`${getStatusColor(result.status)} p-3 rounded-full border`}>
                  {getStatusIcon(result.status)}
                </div>
                <div>
                  <h3 className="text-slate-900 capitalize">{result.status} Website</h3>
                  <p className="text-sm text-slate-600">Security analysis complete</p>
                </div>
              </div>
              <Badge variant={result.status === 'secure' ? 'default' : 'destructive'}>
                Risk: {result.riskScore}%
              </Badge>
            </div>

            {/* Security Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className={`w-4 h-4 ${result.indicators.ssl ? 'text-green-600' : 'text-red-600'}`} />
                  <span className="text-sm text-slate-700">SSL Certificate</span>
                </div>
                <p className={`text-xs ${result.indicators.ssl ? 'text-green-600' : 'text-red-600'}`}>
                  {result.indicators.ssl ? 'Valid' : 'Missing'}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700">Domain Age</span>
                </div>
                <p className="text-xs text-slate-600">{result.indicators.domainAge}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700">Reputation</span>
                </div>
                <p className="text-xs text-slate-600">{result.indicators.reputation}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className={`w-4 h-4 ${result.indicators.phishing ? 'text-red-600' : 'text-green-600'}`} />
                  <span className="text-sm text-slate-700">Phishing</span>
                </div>
                <p className={`text-xs ${result.indicators.phishing ? 'text-red-600' : 'text-green-600'}`}>
                  {result.indicators.phishing ? 'Detected' : 'Not Detected'}
                </p>
              </div>
            </div>

            {/* Risk Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700">Threat Level</span>
                <span className="text-slate-900">{result.riskScore}%</span>
              </div>
              <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`absolute h-full transition-all duration-1000 ${
                    result.status === 'secure' ? 'bg-green-500' :
                    result.status === 'suspicious' ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.riskScore}%` }}
                ></div>
              </div>
            </div>

            {/* Findings */}
            <div>
              <h4 className="text-sm text-slate-900 mb-3">Security Findings</h4>
              <ul className="space-y-2">
                {result.findings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      result.status === 'secure' ? 'bg-green-500' :
                      result.status === 'suspicious' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                    {finding}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <Alert className={getStatusColor(result.status)}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <p className="mb-2">Security Warnings:</p>
                  <ul className="space-y-1 text-sm">
                    {result.warnings.map((warning, index) => (
                      <li key={index}>⚠️ {warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
