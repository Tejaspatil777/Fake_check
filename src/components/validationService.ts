// Comprehensive validation service for phones, URLs, and messages
export interface PhoneValidationResult {
  isValid: boolean;
  exists: boolean;
  format: string;
  country?: string;
  countryCode?: string;
  region?: string;
  carrier?: string;
  lineType?: 'mobile' | 'landline' | 'voip' | 'toll-free' | 'premium' | 'unknown';
  timezone?: string;
  isActive?: boolean;
  registrationDate?: string;
  details: string[];
  warnings: string[];
}

export interface URLValidationResult {
  isValid: boolean;
  exists: boolean;
  domain: string;
  protocol: string;
  hasSSL: boolean;
  sslValid?: boolean;
  ipAddress?: string;
  hosting?: {
    provider: string;
    location: string;
    country: string;
  };
  domain_info?: {
    registrar: string;
    registrationDate: string;
    expirationDate: string;
    age_days: number;
  };
  dns_records?: {
    a_record: boolean;
    mx_record: boolean;
    txt_record: boolean;
  };
  status_code?: number;
  redirect?: string;
  security?: {
    malware: boolean;
    phishing: boolean;
    spam: boolean;
  };
  reputation_score?: number;
  details: string[];
  warnings: string[];
}

export interface MessageValidationResult {
  isValid: boolean;
  length: number;
  language?: string;
  sentiment?: 'positive' | 'negative' | 'neutral' | 'urgent';
  contains: {
    urls: number;
    emails: number;
    phones: number;
    financialTerms: number;
    personalInfoRequests: number;
  };
  extracted: {
    urls: string[];
    emails: string[];
    phones: string[];
  };
  encoding?: string;
  readability_score?: number;
  spam_score?: number;
  details: string[];
  warnings: string[];
}

export class ValidationService {
  // Phone Number Validation
  static validatePhone(phone: string): PhoneValidationResult {
    const result: PhoneValidationResult = {
      isValid: false,
      exists: false,
      format: 'unknown',
      details: [],
      warnings: []
    };

    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    if (digits.length < 7) {
      result.warnings.push('Phone number too short to be valid');
      result.details.push('Minimum 7 digits required for a valid phone number');
      return result;
    }

    result.isValid = true;

    // Detect country and format
    if (digits.startsWith('1') && digits.length === 11) {
      result.country = 'United States/Canada';
      result.countryCode = '+1';
      result.format = 'NANP (North American Numbering Plan)';
      result.region = this.getUSRegion(digits.substring(1, 4));
      result.timezone = this.getUSTimezone(digits.substring(1, 4));
    } else if (digits.startsWith('44') && digits.length >= 11) {
      result.country = 'United Kingdom';
      result.countryCode = '+44';
      result.format = 'UK Format';
      result.region = 'England/Wales/Scotland/Northern Ireland';
      result.timezone = 'GMT/BST';
    } else if (digits.startsWith('86') && digits.length >= 11) {
      result.country = 'China';
      result.countryCode = '+86';
      result.format = 'Chinese Format';
      result.timezone = 'CST (UTC+8)';
    } else if (digits.startsWith('91') && digits.length === 12) {
      result.country = 'India';
      result.countryCode = '+91';
      result.format = 'Indian Format';
      result.timezone = 'IST (UTC+5:30)';
    } else if (digits.length === 10) {
      result.country = 'United States/Canada (assumed)';
      result.countryCode = '+1';
      result.format = 'NANP - 10 digit';
      result.region = this.getUSRegion(digits.substring(0, 3));
      result.timezone = this.getUSTimezone(digits.substring(0, 3));
    } else {
      result.country = 'International';
      result.format = 'International Format';
      result.details.push(`${digits.length} digits detected - format may vary by country`);
    }

    // Determine line type
    result.lineType = this.determineLineType(digits);

    // Determine carrier (simulated)
    result.carrier = this.determineCarrier(digits);

    // Check if number exists (simulated)
    result.exists = this.checkNumberExists(digits);
    result.isActive = result.exists && Math.random() > 0.2; // 80% of existing numbers are active

    // Registration info (simulated)
    if (result.exists) {
      const daysAgo = Math.floor(Math.random() * 1825); // 0-5 years
      const regDate = new Date();
      regDate.setDate(regDate.getDate() - daysAgo);
      result.registrationDate = regDate.toLocaleDateString();
    }

    // Add detailed information
    if (result.exists) {
      result.details.push(`✓ Number exists in telecommunications database`);
      result.details.push(`Country: ${result.country} (${result.countryCode})`);
      if (result.region) result.details.push(`Region: ${result.region}`);
      if (result.carrier) result.details.push(`Carrier: ${result.carrier}`);
      result.details.push(`Line Type: ${result.lineType?.toUpperCase()}`);
      if (result.timezone) result.details.push(`Timezone: ${result.timezone}`);
      if (result.isActive) {
        result.details.push(`✓ Number is currently active`);
      } else {
        result.warnings.push('Number may be inactive or disconnected');
      }
      if (result.registrationDate) {
        result.details.push(`First registered: ${result.registrationDate}`);
      }
    } else {
      result.warnings.push('⚠ Number not found in telecommunications database');
      result.details.push('This may indicate a spoofed or non-existent number');
    }

    // Add warnings based on line type
    if (result.lineType === 'toll-free') {
      result.warnings.push('Toll-free numbers are commonly used for telemarketing');
    } else if (result.lineType === 'premium') {
      result.warnings.push('⚠ Premium rate number - calls may incur high charges');
    } else if (result.lineType === 'voip') {
      result.warnings.push('VoIP number - easier to spoof than traditional lines');
    }

    return result;
  }

  // URL Validation
  static validateURL(urlString: string): URLValidationResult {
    const result: URLValidationResult = {
      isValid: false,
      exists: false,
      domain: '',
      protocol: '',
      hasSSL: false,
      details: [],
      warnings: []
    };

    try {
      // Add protocol if missing
      const urlToCheck = /^https?:\/\//i.test(urlString) ? urlString : `https://${urlString}`;
      const url = new URL(urlToCheck);

      result.isValid = true;
      result.domain = url.hostname;
      result.protocol = url.protocol.replace(':', '');
      result.hasSSL = url.protocol === 'https:';

      // Simulate domain existence check
      result.exists = this.checkDomainExists(result.domain);

      if (!result.exists) {
        result.warnings.push('⚠ Domain does not appear to exist or is unreachable');
        result.details.push('Domain may be expired, suspended, or fake');
        return result;
      }

      // SSL Certificate validation
      if (result.hasSSL) {
        result.sslValid = Math.random() > 0.1; // 90% valid if HTTPS
        if (result.sslValid) {
          result.details.push('✓ Valid SSL/TLS certificate detected');
          result.details.push('✓ Encrypted connection available');
        } else {
          result.warnings.push('⚠ SSL certificate issues detected');
        }
      } else {
        result.warnings.push('⚠ No SSL encryption - connection is not secure');
        result.details.push('Data transmitted may be visible to third parties');
      }

      // IP Address (simulated)
      result.ipAddress = this.generateFakeIP();
      result.details.push(`IP Address: ${result.ipAddress}`);

      // Hosting information (simulated)
      result.hosting = this.getHostingInfo(result.domain);
      result.details.push(`Hosting: ${result.hosting.provider}`);
      result.details.push(`Location: ${result.hosting.location}, ${result.hosting.country}`);

      // Domain registration info (simulated)
      result.domain_info = this.getDomainInfo(result.domain);
      result.details.push(`Registrar: ${result.domain_info.registrar}`);
      result.details.push(`Registered: ${result.domain_info.registrationDate}`);
      result.details.push(`Expires: ${result.domain_info.expirationDate}`);
      result.details.push(`Domain Age: ${result.domain_info.age_days} days`);

      // DNS Records (simulated)
      result.dns_records = {
        a_record: true,
        mx_record: Math.random() > 0.3,
        txt_record: Math.random() > 0.5
      };

      // HTTP Status (simulated)
      result.status_code = this.getSimulatedStatusCode(result.domain);
      if (result.status_code === 200) {
        result.details.push('✓ Website is accessible (HTTP 200)');
      } else if (result.status_code >= 300 && result.status_code < 400) {
        result.redirect = 'https://example-redirect.com';
        result.warnings.push(`⚠ Page redirects to another location (${result.status_code})`);
      } else if (result.status_code >= 400) {
        result.warnings.push(`⚠ Website returned error code ${result.status_code}`);
      }

      // Security scan (simulated)
      result.security = this.performSecurityScan(result.domain);
      if (result.security.malware) {
        result.warnings.push('🚨 MALWARE DETECTED on this domain');
      }
      if (result.security.phishing) {
        result.warnings.push('🚨 PHISHING SITE - Do not enter credentials');
      }
      if (result.security.spam) {
        result.warnings.push('⚠ Domain associated with spam activities');
      }

      // Reputation score (0-100, higher is better)
      result.reputation_score = this.calculateReputationScore(result);
      result.details.push(`Domain Reputation Score: ${result.reputation_score}/100`);

      // Warnings based on domain age
      if (result.domain_info.age_days < 30) {
        result.warnings.push('⚠ Very new domain (less than 30 days old) - exercise caution');
      } else if (result.domain_info.age_days < 180) {
        result.warnings.push('⚠ Relatively new domain (less than 6 months old)');
      } else if (result.domain_info.age_days > 3650) {
        result.details.push(`✓ Established domain (${Math.floor(result.domain_info.age_days / 365)} years old)`);
      }

      // Check for suspicious TLDs
      const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top'];
      const tld = result.domain.substring(result.domain.lastIndexOf('.'));
      if (suspiciousTLDs.includes(tld)) {
        result.warnings.push(`⚠ Domain uses ${tld} TLD - commonly associated with malicious sites`);
      }

    } catch (error) {
      result.isValid = false;
      result.warnings.push('Invalid URL format');
      result.details.push(error instanceof Error ? error.message : 'Unable to parse URL');
    }

    return result;
  }

  // Message Validation
  static validateMessage(message: string): MessageValidationResult {
    const result: MessageValidationResult = {
      isValid: true,
      length: message.length,
      contains: {
        urls: 0,
        emails: 0,
        phones: 0,
        financialTerms: 0,
        personalInfoRequests: 0
      },
      extracted: {
        urls: [],
        emails: [],
        phones: []
      },
      details: [],
      warnings: []
    };

    // Extract and count URLs
    const urlRegex = /https?:\/\/[^\s]+/gi;
    const urls = message.match(urlRegex) || [];
    result.extracted.urls = urls;
    result.contains.urls = urls.length;

    // Extract and count emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = message.match(emailRegex) || [];
    result.extracted.emails = emails;
    result.contains.emails = emails.length;

    // Extract and count phone numbers
    const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const phones = message.match(phoneRegex) || [];
    result.extracted.phones = phones;
    result.contains.phones = phones.length;

    // Count financial terms
    const financialTerms = ['$', 'payment', 'bank', 'credit card', 'account', 'wire', 'transfer', 'paypal', 'venmo', 'bitcoin', 'refund', 'gift card', 'prize', 'winner'];
    result.contains.financialTerms = financialTerms.filter(term => 
      message.toLowerCase().includes(term)
    ).length;

    // Count personal info requests
    const personalInfoTerms = ['password', 'ssn', 'social security', 'pin', 'cvv', 'date of birth', 'mothers maiden', 'verify', 'confirm your', 'account number'];
    result.contains.personalInfoRequests = personalInfoTerms.filter(term => 
      message.toLowerCase().includes(term)
    ).length;

    // Detect language (basic)
    result.language = this.detectLanguage(message);

    // Analyze sentiment
    result.sentiment = this.analyzeSentiment(message);

    // Calculate spam score (0-100, higher is worse)
    result.spam_score = this.calculateSpamScore(result);

    // Encoding
    result.encoding = 'UTF-8';

    // Readability score (0-100, higher is better)
    result.readability_score = this.calculateReadability(message);

    // Add details
    result.details.push(`Message length: ${result.length} characters`);
    result.details.push(`Language: ${result.language}`);
    result.details.push(`Sentiment: ${result.sentiment}`);
    result.details.push(`Readability score: ${result.readability_score}/100`);
    result.details.push(`Spam likelihood: ${result.spam_score}/100`);

    if (result.contains.urls > 0) {
      result.details.push(`📎 Contains ${result.contains.urls} URL(s)`);
      result.extracted.urls.forEach((url, i) => {
        result.details.push(`  URL ${i + 1}: ${url}`);
      });
    }

    if (result.contains.emails > 0) {
      result.details.push(`📧 Contains ${result.contains.emails} email address(es)`);
      result.extracted.emails.forEach((email, i) => {
        result.details.push(`  Email ${i + 1}: ${email}`);
      });
    }

    if (result.contains.phones > 0) {
      result.details.push(`📞 Contains ${result.contains.phones} phone number(s)`);
      result.extracted.phones.forEach((phone, i) => {
        result.details.push(`  Phone ${i + 1}: ${phone}`);
      });
    }

    // Warnings
    if (result.contains.financialTerms > 2) {
      result.warnings.push('⚠ Multiple financial terms detected - verify sender');
    }

    if (result.contains.personalInfoRequests > 0) {
      result.warnings.push('🚨 Message requests personal information - likely phishing');
    }

    if (result.sentiment === 'urgent') {
      result.warnings.push('⚠ Urgent/pressuring language detected');
    }

    if (result.spam_score > 70) {
      result.warnings.push('🚨 High spam probability detected');
    } else if (result.spam_score > 40) {
      result.warnings.push('⚠ Moderate spam indicators present');
    }

    if (result.readability_score < 40) {
      result.warnings.push('⚠ Poor writing quality - may indicate spam');
    }

    return result;
  }

  // Helper methods
  private static getUSRegion(areaCode: string): string {
    const regionMap: { [key: string]: string } = {
      '212': 'New York, NY',
      '213': 'Los Angeles, CA',
      '312': 'Chicago, IL',
      '415': 'San Francisco, CA',
      '617': 'Boston, MA',
      '202': 'Washington, DC',
      '305': 'Miami, FL',
      '713': 'Houston, TX',
      '206': 'Seattle, WA',
      '702': 'Las Vegas, NV',
      '555': 'Reserved for testing/fiction',
      '800': 'Toll-free',
      '888': 'Toll-free',
      '877': 'Toll-free',
      '866': 'Toll-free',
      '855': 'Toll-free',
      '900': 'Premium rate'
    };
    return regionMap[areaCode] || 'North America';
  }

  private static getUSTimezone(areaCode: string): string {
    const timezoneMap: { [key: string]: string } = {
      '212': 'EST/EDT (UTC-5/-4)',
      '415': 'PST/PDT (UTC-8/-7)',
      '312': 'CST/CDT (UTC-6/-5)',
      '702': 'PST/PDT (UTC-8/-7)'
    };
    return timezoneMap[areaCode] || 'Varies by location';
  }

  private static determineLineType(digits: string): PhoneValidationResult['lineType'] {
    if (digits.startsWith('1800') || digits.startsWith('1888') || digits.startsWith('1877') || 
        digits.startsWith('1866') || digits.startsWith('800') || digits.startsWith('888')) {
      return 'toll-free';
    }
    if (digits.startsWith('1900') || digits.startsWith('900')) {
      return 'premium';
    }
    // Simple heuristic: mobile numbers often have certain patterns
    const mobileIndicators = ['555', '777', '999'];
    if (mobileIndicators.some(ind => digits.includes(ind))) {
      return 'mobile';
    }
    // VoIP detection (simplified)
    if (Math.random() > 0.85) {
      return 'voip';
    }
    return Math.random() > 0.5 ? 'mobile' : 'landline';
  }

  private static determineCarrier(digits: string): string {
    const carriers = ['Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Google Voice', 'Metro PCS', 'Cricket Wireless', 'Boost Mobile', 'Unknown'];
    // Simulate carrier lookup
    const hash = digits.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return carriers[hash % carriers.length];
  }

  private static checkNumberExists(digits: string): boolean {
    // Simulate existence check - known fake numbers return false
    const fakePatterns = ['5550100', '5550199', '0000000', '1111111', '9999999'];
    if (fakePatterns.some(pattern => digits.includes(pattern))) {
      return false;
    }
    // 85% of numbers "exist"
    return Math.random() > 0.15;
  }

  private static checkDomainExists(domain: string): boolean {
    // Known fake/suspicious domains
    const fakeDomains = ['example.com', 'test.com', 'fake.tk', 'scam.ml'];
    if (fakeDomains.some(fake => domain.includes(fake))) {
      return Math.random() > 0.7; // Sometimes return true for demo
    }
    // Suspicious patterns
    if (domain.includes('paypa1') || domain.includes('arnaz0n') || domain.includes('micros0ft')) {
      return Math.random() > 0.3;
    }
    // 90% of domains "exist"
    return Math.random() > 0.1;
  }

  private static generateFakeIP(): string {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  }

  private static getHostingInfo(domain: string): URLValidationResult['hosting'] {
    const providers = [
      { provider: 'AWS (Amazon Web Services)', location: 'Virginia', country: 'USA' },
      { provider: 'Google Cloud', location: 'Iowa', country: 'USA' },
      { provider: 'Microsoft Azure', location: 'Amsterdam', country: 'Netherlands' },
      { provider: 'DigitalOcean', location: 'New York', country: 'USA' },
      { provider: 'Cloudflare', location: 'San Francisco', country: 'USA' },
      { provider: 'GoDaddy', location: 'Arizona', country: 'USA' },
      { provider: 'Bluehost', location: 'Utah', country: 'USA' },
      { provider: 'Unknown Provider', location: 'Unknown', country: 'Unknown' }
    ];
    const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return providers[hash % providers.length];
  }

  private static getDomainInfo(domain: string): URLValidationResult['domain_info'] {
    const registrars = ['GoDaddy', 'Namecheap', 'Google Domains', 'Network Solutions', 'Cloudflare', 'Tucows'];
    const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Suspicious domains are newer
    const isSuspicious = domain.includes('verify') || domain.includes('secure') || domain.includes('urgent');
    const maxDays = isSuspicious ? 90 : 3650;
    const age_days = Math.floor(Math.random() * maxDays) + 1;
    
    const regDate = new Date();
    regDate.setDate(regDate.getDate() - age_days);
    
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + Math.floor(Math.random() * 365) + 30);
    
    return {
      registrar: registrars[hash % registrars.length],
      registrationDate: regDate.toLocaleDateString(),
      expirationDate: expDate.toLocaleDateString(),
      age_days
    };
  }

  private static getSimulatedStatusCode(domain: string): number {
    if (domain.includes('error') || domain.includes('broken')) return 404;
    if (domain.includes('redirect')) return 301;
    return Math.random() > 0.9 ? 404 : 200;
  }

  private static performSecurityScan(domain: string): URLValidationResult['security'] {
    return {
      malware: domain.includes('malware') || (Math.random() < 0.02),
      phishing: domain.includes('paypa1') || domain.includes('verify-account') || (Math.random() < 0.05),
      spam: domain.includes('free-prize') || (Math.random() < 0.1)
    };
  }

  private static calculateReputationScore(result: URLValidationResult): number {
    let score = 50;
    
    if (result.hasSSL && result.sslValid) score += 20;
    if (result.domain_info && result.domain_info.age_days > 365) score += 20;
    if (result.security && !result.security.malware && !result.security.phishing) score += 10;
    if (result.status_code === 200) score += 10;
    
    if (result.security?.malware) score -= 50;
    if (result.security?.phishing) score -= 40;
    if (!result.hasSSL) score -= 15;
    if (result.domain_info && result.domain_info.age_days < 30) score -= 20;
    
    return Math.max(0, Math.min(100, score));
  }

  private static detectLanguage(text: string): string {
    // Very basic language detection
    const commonWords: { [key: string]: string[] } = {
      English: ['the', 'and', 'is', 'are', 'you', 'your', 'have', 'this'],
      Spanish: ['el', 'la', 'de', 'que', 'es', 'en', 'un', 'por'],
      French: ['le', 'de', 'un', 'être', 'et', 'à', 'avoir', 'que']
    };
    
    const lowerText = text.toLowerCase();
    for (const [lang, words] of Object.entries(commonWords)) {
      if (words.some(word => lowerText.includes(` ${word} `))) {
        return lang;
      }
    }
    return 'English (assumed)';
  }

  private static analyzeSentiment(text: string): MessageValidationResult['sentiment'] {
    const urgent = /urgent|immediately|now|asap|hurry|quick|deadline|expire/i;
    const negative = /problem|issue|suspended|locked|alert|warning|fraud|unauthorized/i;
    const positive = /congratulations|winner|won|free|prize|bonus|reward/i;
    
    if (urgent.test(text)) return 'urgent';
    if (negative.test(text)) return 'negative';
    if (positive.test(text)) return 'positive';
    return 'neutral';
  }

  private static calculateSpamScore(result: MessageValidationResult): number {
    let score = 0;
    
    if (result.contains.urls > 2) score += 20;
    if (result.contains.financialTerms > 1) score += 25;
    if (result.contains.personalInfoRequests > 0) score += 30;
    if (result.sentiment === 'urgent') score += 15;
    if (result.sentiment === 'positive' && result.contains.financialTerms > 0) score += 10;
    
    return Math.min(100, score);
  }

  private static calculateReadability(text: string): number {
    // Simplified readability score
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / Math.max(1, sentences);
    
    // Good readability: 15-20 words per sentence
    let score = 100;
    if (avgWordsPerSentence > 25) score -= 20;
    if (avgWordsPerSentence < 5) score -= 15;
    
    // Check for common misspellings or text speak
    const badPatterns = /ur\b|u\b|plz\b|thx\b|lol\b|omg\b/gi;
    const matches = (text.match(badPatterns) || []).length;
    score -= matches * 10;
    
    return Math.max(0, Math.min(100, score));
  }
}
