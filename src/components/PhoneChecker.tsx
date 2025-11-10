import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Phone, Search, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Progress } from './ui/progress';

interface AnalysisResult {
  status: 'safe' | 'suspicious' | 'dangerous';
  riskScore: number;
  reports: number;
  details: string[];
  recommendations: string[];
}

export function PhoneChecker() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzePhoneNumber = async () => {
    if (!phoneNumber.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis - in production, this would call a real API
    const mockResults: AnalysisResult[] = [
      {
        status: 'safe',
        riskScore: 15,
        reports: 2,
        details: [
          'Number verified as legitimate business',
          'No recent fraud reports',
          'Associated with known company',
          'Low call volume pattern'
        ],
        recommendations: [
          'Number appears safe to interact with',
          'Still exercise caution with sensitive information'
        ]
      },
      {
        status: 'suspicious',
        riskScore: 65,
        reports: 147,
        details: [
          'Multiple spam reports in last 30 days',
          'Number recently activated',
          'Unusual calling patterns detected',
          'Associated with telemarketing'
        ],
        recommendations: [
          'Avoid sharing personal information',
          'Block if calls persist',
          'Report if you receive suspicious messages'
        ]
      },
      {
        status: 'dangerous',
        riskScore: 92,
        reports: 532,
        details: [
          'High volume of fraud reports',
          'Associated with known scam operations',
          'Impersonating official organizations',
          'Multiple user complaints'
        ],
        recommendations: [
          'DO NOT share any personal or financial information',
          'Block this number immediately',
          'Report to authorities if contacted'
        ]
      }
    ];

    // Random result for demo
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setResult(randomResult);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'suspicious': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'dangerous': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle2 className="w-6 h-6" />;
      case 'suspicious': return <AlertTriangle className="w-6 h-6" />;
      case 'dangerous': return <XCircle className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8 bg-white shadow-lg border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Phone Number Checker</h3>
            <p className="text-sm text-slate-600">Verify if a phone number is safe or spam</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-700 mb-2 block">Enter Phone Number</label>
            <div className="flex gap-2">
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
                disabled={isAnalyzing}
              />
              <Button 
                onClick={analyzePhoneNumber}
                disabled={isAnalyzing || !phoneNumber.trim()}
                className="px-6"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analyzing
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Check
                  </>
                )}
              </Button>
            </div>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Analyzing number...</span>
                <span className="text-slate-500">Please wait</span>
              </div>
              <Progress value={66} className="h-2" />
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
                  <h3 className="text-slate-900 capitalize">{result.status} Number</h3>
                  <p className="text-sm text-slate-600">{result.reports} community reports</p>
                </div>
              </div>
              <Badge variant={result.status === 'safe' ? 'default' : 'destructive'}>
                Risk: {result.riskScore}%
              </Badge>
            </div>

            {/* Risk Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700">Risk Level</span>
                <span className="text-slate-900">{result.riskScore}%</span>
              </div>
              <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`absolute h-full transition-all duration-1000 ${
                    result.status === 'safe' ? 'bg-green-500' :
                    result.status === 'suspicious' ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.riskScore}%` }}
                ></div>
              </div>
            </div>

            {/* Analysis Details */}
            <div>
              <h4 className="text-sm text-slate-900 mb-3">Analysis Details</h4>
              <ul className="space-y-2">
                {result.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      result.status === 'safe' ? 'bg-green-500' :
                      result.status === 'suspicious' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <Alert className={getStatusColor(result.status)}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <p className="mb-2">Recommendations:</p>
                <ul className="space-y-1 text-sm">
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </Card>
      )}
    </div>
  );
}
