import { useState } from 'react';
import { ShieldCheck, AlertTriangle, Search, BookOpen, LogOut, User } from 'lucide-react';
import { CheckForm } from './components/CheckForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { RecentChecks } from './components/RecentChecks';
import { StatsPanel } from './components/StatsPanel';
import { SecurityTips } from './components/SecurityTips';
import { ExampleThreats } from './components/ExampleThreats';
import { ReportThreat } from './components/ReportThreat';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './components/AuthContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Toaster } from './components/ui/sonner';

export interface CheckResult {
  id: string;
  type: 'phone' | 'url' | 'message';
  input: string;
  threatLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  details: string[];
  timestamp: Date;
}

function Dashboard() {
  const [results, setResults] = useState<CheckResult | null>(null);
  const [recentChecks, setRecentChecks] = useState<CheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const { user, logout } = useAuth();

  const handleCheck = async (type: 'phone' | 'url' | 'message', input: string) => {
    setIsChecking(true);
    setResults(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeInput(type, input);
    setResults(result);
    setRecentChecks(prev => [result, ...prev.slice(0, 4)]);
    setIsChecking(false);
  };

  const handleTestExample = (type: 'phone' | 'url' | 'message', example: string) => {
    handleCheck(type, example);
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      resultsElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const analyzeInput = (type: 'phone' | 'url' | 'message', input: string): CheckResult => {
    // Mock analysis logic
    let threatLevel: 'safe' | 'suspicious' | 'dangerous' = 'safe';
    let score = 95;
    let details: string[] = [];

    if (type === 'phone') {
      const dangerousPatterns = ['555-0100', '555-0199', '+1-900'];
      const suspiciousPatterns = ['555-01', '000-000'];
      
      if (dangerousPatterns.some(pattern => input.includes(pattern))) {
        threatLevel = 'dangerous';
        score = 15;
        details = [
          'Number matches known scam database',
          'Multiple reports from users',
          'Associated with phishing attempts',
          'Blocked by carriers'
        ];
      } else if (suspiciousPatterns.some(pattern => input.includes(pattern))) {
        threatLevel = 'suspicious';
        score = 45;
        details = [
          'Unusual number pattern detected',
          'Limited caller ID information',
          'Few verified user reports'
        ];
      } else {
        details = [
          'No matches in scam database',
          'Valid number format',
          'No suspicious patterns detected'
        ];
      }
    } else if (type === 'url') {
      const dangerousKeywords = ['free-prize', 'urgent-verify', 'account-suspended', 'click-here-now'];
      const suspiciousKeywords = ['bit.ly', 'tinyurl', 'suspicious'];
      
      if (dangerousKeywords.some(keyword => input.toLowerCase().includes(keyword))) {
        threatLevel = 'dangerous';
        score = 10;
        details = [
          'Domain flagged as phishing site',
          'Mimics legitimate services',
          'SSL certificate issues detected',
          'Reported by multiple security vendors'
        ];
      } else if (suspiciousKeywords.some(keyword => input.toLowerCase().includes(keyword))) {
        threatLevel = 'suspicious';
        score = 50;
        details = [
          'URL shortener detected',
          'Redirects to unknown domain',
          'Limited domain history'
        ];
      } else {
        details = [
          'Domain has valid SSL certificate',
          'No phishing indicators found',
          'Clean security scan results'
        ];
      }
    } else if (type === 'message') {
      const dangerousKeywords = ['click here now', 'verify your account', 'suspended', 'urgent action required', 'claim your prize'];
      const suspiciousKeywords = ['limited time', 'act now', 'congratulations'];
      
      if (dangerousKeywords.some(keyword => input.toLowerCase().includes(keyword))) {
        threatLevel = 'dangerous';
        score = 20;
        details = [
          'Contains common phishing phrases',
          'Creates false sense of urgency',
          'Requests sensitive information',
          'Similar to known scam messages'
        ];
      } else if (suspiciousKeywords.some(keyword => input.toLowerCase().includes(keyword))) {
        threatLevel = 'suspicious';
        score = 55;
        details = [
          'Marketing language detected',
          'Pressure tactics identified',
          'Verify sender authenticity'
        ];
      } else {
        details = [
          'No suspicious patterns found',
          'Message structure appears normal',
          'No urgency tactics detected'
        ];
      }
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      input,
      threatLevel,
      score,
      details,
      timestamp: new Date()
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 transition-colors">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-xl shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-slate-900 dark:text-white">FakeCheck</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">Advanced Threat Detection Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 dark:text-green-300">Live Protection</span>
              </div>
              <ThemeToggle />
              
              {/* User Info - Desktop */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-600 text-white text-xs">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-900 dark:text-white leading-tight">{user?.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{user?.email}</span>
                </div>
              </div>
              
              {/* Logout Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <StatsPanel />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Check Form */}
          <div className="lg:col-span-2 space-y-6">
            <CheckForm onCheck={handleCheck} isChecking={isChecking} />
            <div id="results-section">
              {results && <ResultsDisplay result={results} />}
            </div>
          </div>

          {/* Right Column - Activity & Examples */}
          <div className="lg:col-span-1 space-y-6">
            <RecentChecks checks={recentChecks} />
            <ExampleThreats onTestExample={handleTestExample} />
          </div>
        </div>

        {/* Bottom Section - Security & Reporting */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <SecurityTips />
          <ReportThreat />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
                <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white mb-2">Real-Time Analysis</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Advanced AI scans against millions of known threats instantly
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-950 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  End-to-end encryption with zero data retention policy
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-950 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white mb-2">Community Powered</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Crowdsourced threat intelligence from verified users
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white mb-2">Education Hub</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Learn to identify threats with expert security tips
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mt-12 border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-slate-900 dark:text-white">FakeCheck</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Protecting users from online threats with advanced detection technology
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer">How It Works</li>
                <li className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer">Security Tips</li>
                <li className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer">Report Threats</li>
                <li className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer">Community Guidelines</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer">Terms of Service</li>
                <li className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer">Disclaimer</li>
                <li className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer">Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <p className="text-xs text-center text-slate-600 dark:text-slate-400">
              <strong>Important:</strong> FakeCheck is a demonstration tool. For production use, always verify threats with multiple trusted sources and official channels.
            </p>
            <p className="text-xs text-center text-slate-500 dark:text-slate-500 mt-2">
              © 2025 FakeCheck. Built with advanced security in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  if (!isAuthenticated) {
    return (
      <>
        {authView === 'login' ? (
          <LoginPage onSwitchToSignup={() => setAuthView('signup')} />
        ) : (
          <SignupPage onSwitchToLogin={() => setAuthView('login')} />
        )}
      </>
    );
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="fakecheck-theme">
      <AuthProvider>
        <Toaster position="top-right" />
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
