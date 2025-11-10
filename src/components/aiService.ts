export interface AIAnalysis {
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  threats: string[];
  indicators: {
    type: string;
    severity: 'info' | 'warning' | 'danger';
    description: string;
  }[];
  recommendations: string[];
  securityTips: string[];
}

// Advanced pattern matching for threat detection
export class AIThreatAnalyzer {
  // Phone number threat patterns
  private static phonePatterns = {
    spam: [
      /^1?(800|888|877|866|855|844|833)/,  // Toll-free (often spam)
      /(.)\1{5,}/,  // Repeated digits
      /^000|^111|^999/,  // Suspicious patterns
    ],
    scam: [
      /^(234|268|473|809|876)/,  // Known scam country codes
      /^1?900/,  // Premium rate
    ],
    spoofed: [
      /^1?(555|000|111|999)/,  // Fake numbers
    ]
  };

  // URL threat patterns
  private static urlPatterns = {
    phishing: [
      /paypal.*verify/i,
      /amazon.*account.*suspend/i,
      /bank.*secure.*update/i,
      /apple.*id.*locked/i,
      /microsoft.*security.*alert/i,
      /crypto.*wallet.*verify/i,
      /urgent.*action.*required/i,
    ],
    suspicious: [
      /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,  // IP address
      /bit\.ly|tinyurl|goo\.gl/i,  // URL shorteners
      /-/g,  // Many hyphens
      /[^a-z0-9.-]/i,  // Unusual characters
    ],
    dangerous: [
      /\.tk$|\.ml$|\.ga$|\.cf$/i,  // Free domains
      /download.*exe|install.*now/i,
      /click.*here.*prize/i,
      /congratulations.*winner/i,
    ]
  };

  // Message threat patterns
  private static messagePatterns = {
    phishing: [
      /verify.*account|confirm.*identity/i,
      /suspended.*account|locked.*account/i,
      /click.*link.*immediately|urgent.*action/i,
      /claim.*prize|you.*won/i,
      /refund.*pending|tax.*return/i,
    ],
    scam: [
      /send.*money|transfer.*funds|wire.*payment/i,
      /gift.*card|iTunes.*card|prepaid.*card/i,
      /bitcoin|cryptocurrency|crypto.*wallet/i,
      /social.*security.*number|ssn|bank.*account/i,
      /password|pin.*code|verification.*code/i,
    ],
    urgency: [
      /urgent|immediately|right.*now|asap/i,
      /limited.*time|expires.*today|act.*now/i,
      /last.*chance|final.*notice|deadline/i,
    ],
    impersonation: [
      /IRS|FBI|police|government.*agency/i,
      /amazon|paypal|microsoft|apple|google/i,
      /bank|credit.*union|financial.*institution/i,
    ]
  };

  static analyzePhone(phone: string): AIAnalysis {
    const threats: string[] = [];
    const indicators: AIAnalysis['indicators'] = [];
    const recommendations: string[] = [];
    const securityTips: string[] = [];
    
    let riskScore = 0;

    // Remove formatting
    const digits = phone.replace(/\D/g, '');

    // Check for spam patterns
    this.phonePatterns.spam.forEach((pattern) => {
      if (pattern.test(phone)) {
        riskScore += 25;
        threats.push('Matches known spam number patterns');
        indicators.push({
          type: 'Spam Pattern Detected',
          severity: 'warning',
          description: 'This number structure is commonly used by telemarketers'
        });
      }
    });

    // Check for scam patterns
    this.phonePatterns.scam.forEach((pattern) => {
      if (pattern.test(phone)) {
        riskScore += 40;
        threats.push('Associated with scam operations');
        indicators.push({
          type: 'Scam Risk',
          severity: 'danger',
          description: 'Number format linked to fraudulent activities'
        });
      }
    });

    // Check for spoofed patterns
    this.phonePatterns.spoofed.forEach((pattern) => {
      if (pattern.test(phone)) {
        riskScore += 50;
        threats.push('Likely spoofed or fake number');
        indicators.push({
          type: 'Spoofing Detected',
          severity: 'danger',
          description: 'Number appears to be falsified or manipulated'
        });
      }
    });

    // Check for sequential patterns
    if (/012|123|234|345|456|567|678|789|890/.test(digits)) {
      riskScore += 15;
      indicators.push({
        type: 'Sequential Pattern',
        severity: 'info',
        description: 'Contains sequential number pattern'
      });
    }

    // Check length
    if (digits.length < 10) {
      riskScore += 10;
      indicators.push({
        type: 'Incomplete Number',
        severity: 'warning',
        description: 'Number length is unusually short'
      });
    }

    // Generate recommendations
    if (riskScore > 30) {
      recommendations.push('Do not answer calls from this number');
      recommendations.push('Block this number in your phone settings');
      recommendations.push('Report to your carrier if you receive calls');
    } else {
      recommendations.push('Exercise caution when answering');
      recommendations.push('Verify caller identity before sharing information');
    }

    // Security tips
    securityTips.push('Never share personal information over unexpected calls');
    securityTips.push('Legitimate organizations won\'t ask for passwords via phone');
    securityTips.push('Use call blocking features to filter spam calls');

    return {
      riskLevel: this.calculateRiskLevel(riskScore),
      confidence: Math.min(95, 70 + (threats.length * 8)),
      threats,
      indicators,
      recommendations,
      securityTips
    };
  }

  static analyzeURL(url: string): AIAnalysis {
    const threats: string[] = [];
    const indicators: AIAnalysis['indicators'] = [];
    const recommendations: string[] = [];
    const securityTips: string[] = [];
    
    let riskScore = 0;

    // Check for phishing patterns
    this.urlPatterns.phishing.forEach((pattern) => {
      if (pattern.test(url)) {
        riskScore += 45;
        threats.push('Phishing attempt detected');
        indicators.push({
          type: 'Phishing Indicators',
          severity: 'danger',
          description: 'URL contains common phishing keywords'
        });
      }
    });

    // Check for suspicious patterns
    this.urlPatterns.suspicious.forEach((pattern) => {
      if (pattern.test(url)) {
        riskScore += 15;
        indicators.push({
          type: 'Suspicious Structure',
          severity: 'warning',
          description: 'URL has unusual formatting or characters'
        });
      }
    });

    // Check for dangerous patterns
    this.urlPatterns.dangerous.forEach((pattern) => {
      if (pattern.test(url)) {
        riskScore += 35;
        threats.push('Dangerous website indicators');
        indicators.push({
          type: 'High Risk Domain',
          severity: 'danger',
          description: 'Domain associated with malicious activity'
        });
      }
    });

    // Check for HTTPS
    if (!url.startsWith('https://')) {
      riskScore += 20;
      indicators.push({
        type: 'No Secure Connection',
        severity: 'warning',
        description: 'Website does not use HTTPS encryption'
      });
    }

    // Check for typosquatting
    const commonBrands = ['google', 'amazon', 'paypal', 'microsoft', 'apple', 'facebook', 'netflix'];
    const urlLower = url.toLowerCase();
    commonBrands.forEach((brand) => {
      if (urlLower.includes(brand) && !urlLower.includes(`${brand}.com`)) {
        riskScore += 30;
        threats.push('Possible brand impersonation');
        indicators.push({
          type: 'Typosquatting',
          severity: 'danger',
          description: `URL mimics "${brand}" but is not the official domain`
        });
      }
    });

    // Check for excessive subdomain levels
    const subdomains = url.split('://')[1]?.split('/')[0]?.split('.');
    if (subdomains && subdomains.length > 4) {
      riskScore += 20;
      indicators.push({
        type: 'Complex Domain',
        severity: 'warning',
        description: 'Unusually deep subdomain structure'
      });
    }

    // Generate recommendations
    if (riskScore > 40) {
      recommendations.push('DO NOT visit this website');
      recommendations.push('DO NOT enter any personal information');
      recommendations.push('Report this URL to security authorities');
      recommendations.push('Delete any messages containing this link');
    } else if (riskScore > 20) {
      recommendations.push('Proceed with extreme caution');
      recommendations.push('Verify the website is legitimate before visiting');
      recommendations.push('Never enter sensitive information');
    } else {
      recommendations.push('Verify URL matches the expected website');
      recommendations.push('Check for HTTPS and valid certificate');
    }

    // Security tips
    securityTips.push('Always verify URLs before clicking links');
    securityTips.push('Look for HTTPS and a padlock icon in your browser');
    securityTips.push('Hover over links to see the actual destination');
    securityTips.push('Bookmark important websites instead of clicking links');

    return {
      riskLevel: this.calculateRiskLevel(riskScore),
      confidence: Math.min(98, 75 + (threats.length * 6)),
      threats,
      indicators,
      recommendations,
      securityTips
    };
  }

  static analyzeMessage(message: string): AIAnalysis {
    const threats: string[] = [];
    const indicators: AIAnalysis['indicators'] = [];
    const recommendations: string[] = [];
    const securityTips: string[] = [];
    
    let riskScore = 0;

    // Check for phishing patterns
    this.messagePatterns.phishing.forEach((pattern) => {
      if (pattern.test(message)) {
        riskScore += 35;
        threats.push('Phishing attempt detected');
        indicators.push({
          type: 'Phishing Language',
          severity: 'danger',
          description: 'Message uses common phishing tactics'
        });
      }
    });

    // Check for scam patterns
    this.messagePatterns.scam.forEach((pattern) => {
      if (pattern.test(message)) {
        riskScore += 40;
        threats.push('Financial scam indicators');
        indicators.push({
          type: 'Scam Content',
          severity: 'danger',
          description: 'Message contains financial scam keywords'
        });
      }
    });

    // Check for urgency tactics
    this.messagePatterns.urgency.forEach((pattern) => {
      if (pattern.test(message)) {
        riskScore += 25;
        indicators.push({
          type: 'Urgency Pressure',
          severity: 'warning',
          description: 'Message uses pressure tactics to force quick action'
        });
      }
    });

    // Check for impersonation
    this.messagePatterns.impersonation.forEach((pattern) => {
      if (pattern.test(message)) {
        riskScore += 30;
        threats.push('Entity impersonation detected');
        indicators.push({
          type: 'Impersonation',
          severity: 'danger',
          description: 'Message claims to be from trusted organization'
        });
      }
    });

    // Check for URLs in message
    const urlMatches = message.match(/https?:\/\/[^\s]+/gi);
    if (urlMatches && urlMatches.length > 0) {
      riskScore += 15;
      indicators.push({
        type: 'Contains Links',
        severity: 'warning',
        description: `Message contains ${urlMatches.length} link(s)`
      });

      // Analyze each URL
      urlMatches.forEach((url) => {
        const urlAnalysis = this.analyzeURL(url);
        if (urlAnalysis.riskLevel === 'high' || urlAnalysis.riskLevel === 'critical') {
          riskScore += 25;
          threats.push('Message contains dangerous links');
        }
      });
    }

    // Check for excessive caps
    const capsRatio = (message.match(/[A-Z]/g) || []).length / message.length;
    if (capsRatio > 0.5) {
      riskScore += 15;
      indicators.push({
        type: 'Excessive Capitalization',
        severity: 'info',
        description: 'Unusual use of capital letters (attention-grabbing tactic)'
      });
    }

    // Check for poor grammar/spelling
    const grammarIssues = message.match(/\b(ur|u|thru|plz|asap)\b/gi);
    if (grammarIssues && grammarIssues.length > 2) {
      riskScore += 10;
      indicators.push({
        type: 'Poor Writing Quality',
        severity: 'info',
        description: 'Unprofessional language may indicate spam'
      });
    }

    // Generate recommendations
    if (riskScore > 50) {
      recommendations.push('Delete this message immediately');
      recommendations.push('DO NOT click any links in the message');
      recommendations.push('DO NOT respond or provide any information');
      recommendations.push('Report as spam/phishing to your provider');
      recommendations.push('Block the sender');
    } else if (riskScore > 25) {
      recommendations.push('Treat with extreme caution');
      recommendations.push('Verify sender through official channels');
      recommendations.push('Do not click links or download attachments');
    } else {
      recommendations.push('Verify sender identity before taking action');
      recommendations.push('Contact the organization directly if unsure');
    }

    // Security tips
    securityTips.push('Legitimate organizations rarely request sensitive info via text/email');
    securityTips.push('When in doubt, contact the company directly using official contact info');
    securityTips.push('Never click links from unknown or suspicious senders');
    securityTips.push('Enable two-factor authentication on all important accounts');

    return {
      riskLevel: this.calculateRiskLevel(riskScore),
      confidence: Math.min(96, 72 + (threats.length * 7)),
      threats,
      indicators,
      recommendations,
      securityTips
    };
  }

  private static calculateRiskLevel(score: number): AIAnalysis['riskLevel'] {
    if (score >= 70) return 'critical';
    if (score >= 50) return 'high';
    if (score >= 30) return 'medium';
    if (score >= 15) return 'low';
    return 'safe';
  }

  // Real-time analysis as user types
  static getRealTimeInsights(type: 'phone' | 'url' | 'message', input: string): {
    warnings: string[];
    suggestions: string[];
    liveIndicators: string[];
  } {
    const warnings: string[] = [];
    const suggestions: string[] = [];
    const liveIndicators: string[] = [];

    if (!input || input.length < 3) {
      return { warnings, suggestions, liveIndicators };
    }

    if (type === 'phone') {
      const digits = input.replace(/\D/g, '');
      if (digits.length > 0) {
        liveIndicators.push(`${digits.length} digits detected`);
      }
      if (/(.)\1{3,}/.test(input)) {
        warnings.push('Repeated digits detected - common in spam numbers');
      }
      if (digits.length >= 10) {
        suggestions.push('Ready for analysis');
      } else if (digits.length > 0) {
        suggestions.push(`Need ${10 - digits.length} more digits for full analysis`);
      }
    }

    if (type === 'url') {
      if (!input.startsWith('http')) {
        warnings.push('Missing protocol - will add https:// automatically');
      }
      if (input.includes('..')) {
        warnings.push('Suspicious URL pattern detected');
      }
      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(input)) {
        warnings.push('IP address detected - unusual for legitimate sites');
      }
      const urlLower = input.toLowerCase();
      ['paypal', 'amazon', 'bank', 'secure', 'verify'].forEach((keyword) => {
        if (urlLower.includes(keyword)) {
          liveIndicators.push(`Contains "${keyword}" - verify authenticity`);
        }
      });
    }

    if (type === 'message') {
      liveIndicators.push(`${input.length} characters`);
      
      if (/urgent|immediately|act now/i.test(input)) {
        warnings.push('Urgency language detected - common scam tactic');
      }
      if (/click|verify|confirm|suspended/i.test(input)) {
        warnings.push('Phishing keywords detected');
      }
      if (/\$\d+|money|prize|won/i.test(input)) {
        warnings.push('Financial content - verify sender carefully');
      }
      
      const urlCount = (input.match(/https?:\/\//g) || []).length;
      if (urlCount > 0) {
        liveIndicators.push(`${urlCount} link(s) found`);
      }
      
      if (input.length >= 20) {
        suggestions.push('Sufficient content for detailed analysis');
      }
    }

    return { warnings, suggestions, liveIndicators };
  }
}
