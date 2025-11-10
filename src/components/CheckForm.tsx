import { useState } from 'react';
import { Phone, Globe, MessageSquare, Search, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { AIAnalysisPanel } from './AIAnalysisPanel';

interface CheckFormProps {
  onCheck: (type: 'phone' | 'url' | 'message', input: string) => void;
  isChecking: boolean;
}

export function CheckForm({ onCheck, isChecking }: CheckFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'phone' | 'url' | 'message'>('phone');
  const [errors, setErrors] = useState<{
    phone?: string;
    url?: string;
    message?: string;
  }>({});

  // Phone number validation
  const validatePhoneNumber = (phone: string): string | null => {
    try {
      const trimmed = phone.trim();
      
      if (!trimmed) {
        return 'Phone number is required';
      }

      if (trimmed.length < 7) {
        return 'Phone number is too short (minimum 7 digits)';
      }

      if (trimmed.length > 20) {
        return 'Phone number is too long (maximum 20 characters)';
      }

      // Check if contains at least some digits
      const digitCount = (trimmed.match(/\d/g) || []).length;
      if (digitCount < 7) {
        return 'Phone number must contain at least 7 digits';
      }

      // Check for invalid characters (only allow digits, spaces, +, -, (, ))
      const validPattern = /^[\d\s+\-()]+$/;
      if (!validPattern.test(trimmed)) {
        return 'Phone number contains invalid characters';
      }

      return null;
    } catch (error) {
      console.error('Phone validation error:', error);
      return 'Unable to validate phone number';
    }
  };

  // URL validation
  const validateUrl = (urlInput: string): string | null => {
    try {
      const trimmed = urlInput.trim();
      
      if (!trimmed) {
        return 'URL is required';
      }

      if (trimmed.length < 4) {
        return 'URL is too short';
      }

      if (trimmed.length > 2048) {
        return 'URL is too long (maximum 2048 characters)';
      }

      // Check for common URL patterns
      const hasProtocol = /^https?:\/\//i.test(trimmed);
      const hasDomain = /\w+\.\w+/.test(trimmed);
      
      if (!hasProtocol && !hasDomain) {
        return 'Please enter a valid URL (e.g., https://example.com)';
      }

      // Try to create URL object for additional validation
      try {
        const urlToCheck = hasProtocol ? trimmed : `https://${trimmed}`;
        const urlObj = new URL(urlToCheck);
        
        // Check for valid hostname
        if (!urlObj.hostname || urlObj.hostname.length < 3) {
          return 'Invalid domain name';
        }
      } catch (urlError) {
        return 'Invalid URL format';
      }

      return null;
    } catch (error) {
      console.error('URL validation error:', error);
      return 'Unable to validate URL';
    }
  };

  // Message validation
  const validateMessage = (msg: string): string | null => {
    try {
      const trimmed = msg.trim();
      
      if (!trimmed) {
        return 'Message is required';
      }

      if (trimmed.length < 5) {
        return 'Message is too short (minimum 5 characters)';
      }

      if (trimmed.length > 5000) {
        return 'Message is too long (maximum 5000 characters)';
      }

      // Check for excessive special characters (possible encoding issue)
      const specialCharCount = (trimmed.match(/[^\w\s.,!?@#$%&*()]/g) || []).length;
      if (specialCharCount > trimmed.length * 0.5) {
        return 'Message contains too many unusual characters';
      }

      return null;
    } catch (error) {
      console.error('Message validation error:', error);
      return 'Unable to validate message';
    }
  };

  const handlePhoneCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const error = validatePhoneNumber(phoneNumber);
      
      if (error) {
        setErrors({ ...errors, phone: error });
        return;
      }

      setErrors({ ...errors, phone: undefined });
      onCheck('phone', phoneNumber.trim());
    } catch (error) {
      console.error('Phone check error:', error);
      setErrors({ ...errors, phone: 'An unexpected error occurred. Please try again.' });
    }
  };

  const handleUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const error = validateUrl(url);
      
      if (error) {
        setErrors({ ...errors, url: error });
        return;
      }

      setErrors({ ...errors, url: undefined });
      
      // Add protocol if missing
      const urlToCheck = /^https?:\/\//i.test(url.trim()) 
        ? url.trim() 
        : `https://${url.trim()}`;
      
      onCheck('url', urlToCheck);
    } catch (error) {
      console.error('URL check error:', error);
      setErrors({ ...errors, url: 'An unexpected error occurred. Please try again.' });
    }
  };

  const handleMessageCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const error = validateMessage(message);
      
      if (error) {
        setErrors({ ...errors, message: error });
        return;
      }

      setErrors({ ...errors, message: undefined });
      onCheck('message', message.trim());
    } catch (error) {
      console.error('Message check error:', error);
      setErrors({ ...errors, message: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <Card className="p-6 mb-6 shadow-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-slate-900 dark:text-white mb-2">Check for Threats</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Enter a phone number, URL, or message to scan for potential scams and threats
        </p>
      </div>

      <Tabs defaultValue="phone" className="w-full" onValueChange={(value) => setActiveTab(value as 'phone' | 'url' | 'message')}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Phone</span>
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Website</span>
          </TabsTrigger>
          <TabsTrigger value="message" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Message</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Real-Time Analysis Panel */}
        <AIAnalysisPanel 
          type={activeTab}
          input={activeTab === 'phone' ? phoneNumber : activeTab === 'url' ? url : message}
          isActive={!isChecking}
        />

        <TabsContent value="phone">
          <form onSubmit={handlePhoneCheck} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phone) {
                    setErrors({ ...errors, phone: undefined });
                  }
                }}
                className={`h-12 ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                disabled={isChecking}
              />
              {errors.phone ? (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.phone}</AlertDescription>
                </Alert>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter the phone number exactly as received (7-20 characters)
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              disabled={isChecking || !phoneNumber.trim()}
            >
              {isChecking ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Check Phone Number
                </span>
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="url">
          <form onSubmit={handleUrlCheck} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (errors.url) {
                    setErrors({ ...errors, url: undefined });
                  }
                }}
                className={`h-12 ${errors.url ? 'border-red-500 dark:border-red-500' : ''}`}
                disabled={isChecking}
              />
              {errors.url ? (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.url}</AlertDescription>
                </Alert>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Paste the suspicious link or website address
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              disabled={isChecking || !url.trim()}
            >
              {isChecking ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Check Website
                </span>
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="message">
          <form onSubmit={handleMessageCheck} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message Content</Label>
              <Textarea
                id="message"
                placeholder="Paste the suspicious message here..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors({ ...errors, message: undefined });
                  }
                }}
                className={`min-h-[120px] resize-none ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                disabled={isChecking}
                maxLength={5000}
              />
              {errors.message ? (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.message}</AlertDescription>
                </Alert>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Copy and paste the entire message (5-5000 characters)
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              disabled={isChecking || !message.trim()}
            >
              {isChecking ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Analyze Message
                </span>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
