import { Globe, Phone, MessageSquare, CheckCircle, XCircle, AlertTriangle, Server, Shield, Calendar, MapPin, Activity, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface ValidationDetailsProps {
  type: 'phone' | 'url' | 'message';
  metadata: any;
}

export function ValidationDetails({ type, metadata }: ValidationDetailsProps) {
  if (!metadata) return null;

  const renderPhoneDetails = () => {
    return (
      <div className="space-y-4">
        {/* Existence Status */}
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          {metadata.exists ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white">Number Exists</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Found in telecommunications database</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white">Number Not Found</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">May be spoofed or disconnected</p>
              </div>
            </>
          )}
        </div>

        {/* Phone Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metadata.country && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Country</span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white">{metadata.country}</p>
              {metadata.countryCode && (
                <p className="text-xs text-slate-600 dark:text-slate-400">{metadata.countryCode}</p>
              )}
            </div>
          )}

          {metadata.region && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Region</span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white">{metadata.region}</p>
            </div>
          )}

          {metadata.carrier && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Carrier</span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white">{metadata.carrier}</p>
            </div>
          )}

          {metadata.lineType && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Line Type</span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white capitalize">{metadata.lineType}</p>
            </div>
          )}

          {metadata.timezone && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Timezone</span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white">{metadata.timezone}</p>
            </div>
          )}

          {metadata.registrationDate && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">First Registered</span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white">{metadata.registrationDate}</p>
            </div>
          )}
        </div>

        {/* Status Badge */}
        {metadata.isActive !== undefined && (
          <div className="flex items-center gap-2">
            <Badge variant={metadata.isActive ? "default" : "outline"} className={metadata.isActive ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300" : ""}>
              {metadata.isActive ? "Active" : "Inactive"}
            </Badge>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {metadata.isActive ? "Number is currently in service" : "Number may be disconnected"}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderURLDetails = () => {
    return (
      <div className="space-y-4">
        {/* Existence Status */}
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          {metadata.exists ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white">Domain Exists</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Domain is registered and reachable</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white">Domain Not Found</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Domain may be fake or suspended</p>
              </div>
            </>
          )}
        </div>

        {/* Security Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg border ${metadata.hasSSL ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Shield className={`w-4 h-4 ${metadata.hasSSL ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
              <span className="text-xs text-slate-600 dark:text-slate-400">SSL/TLS</span>
            </div>
            <p className={`text-sm ${metadata.hasSSL ? 'text-green-900 dark:text-green-200' : 'text-red-900 dark:text-red-200'}`}>
              {metadata.hasSSL ? 'Secured (HTTPS)' : 'Not Secured (HTTP)'}
            </p>
          </div>

          {metadata.reputation_score !== undefined && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Reputation Score</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-sm text-slate-900 dark:text-white">{metadata.reputation_score}/100</p>
                <Badge variant={metadata.reputation_score >= 70 ? "default" : metadata.reputation_score >= 40 ? "outline" : "destructive"} className="text-xs">
                  {metadata.reputation_score >= 70 ? 'Good' : metadata.reputation_score >= 40 ? 'Fair' : 'Poor'}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Accordion for detailed info */}
        <Accordion type="single" collapsible className="w-full">
          {/* Domain Information */}
          {metadata.domain_info && (
            <AccordionItem value="domain-info" className="border-slate-200 dark:border-slate-700">
              <AccordionTrigger className="text-sm text-slate-900 dark:text-white hover:no-underline">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Domain Registration
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Registrar:</span>
                    <span className="text-slate-900 dark:text-white">{metadata.domain_info.registrar}</span>
                  </div>
                  <Separator className="dark:bg-slate-700" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Registered:</span>
                    <span className="text-slate-900 dark:text-white">{metadata.domain_info.registrationDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Expires:</span>
                    <span className="text-slate-900 dark:text-white">{metadata.domain_info.expirationDate}</span>
                  </div>
                  <Separator className="dark:bg-slate-700" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Domain Age:</span>
                    <span className="text-slate-900 dark:text-white">{metadata.domain_info.age_days} days ({Math.floor(metadata.domain_info.age_days / 365)} years)</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Hosting Information */}
          {metadata.hosting && (
            <AccordionItem value="hosting-info" className="border-slate-200 dark:border-slate-700">
              <AccordionTrigger className="text-sm text-slate-900 dark:text-white hover:no-underline">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Hosting Information
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Provider:</span>
                    <span className="text-slate-900 dark:text-white">{metadata.hosting.provider}</span>
                  </div>
                  <Separator className="dark:bg-slate-700" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Location:</span>
                    <span className="text-slate-900 dark:text-white">{metadata.hosting.location}, {metadata.hosting.country}</span>
                  </div>
                  {metadata.ipAddress && (
                    <>
                      <Separator className="dark:bg-slate-700" />
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">IP Address:</span>
                        <span className="text-slate-900 dark:text-white font-mono">{metadata.ipAddress}</span>
                      </div>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Security Scan */}
          {metadata.security && (
            <AccordionItem value="security-scan" className="border-slate-200 dark:border-slate-700">
              <AccordionTrigger className="text-sm text-slate-900 dark:text-white hover:no-underline">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
                  Security Scan Results
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Malware:</span>
                    <Badge variant={metadata.security.malware ? "destructive" : "default"} className={!metadata.security.malware ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}>
                      {metadata.security.malware ? "Detected" : "Clean"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Phishing:</span>
                    <Badge variant={metadata.security.phishing ? "destructive" : "default"} className={!metadata.security.phishing ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}>
                      {metadata.security.phishing ? "Detected" : "Clean"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Spam:</span>
                    <Badge variant={metadata.security.spam ? "destructive" : "default"} className={!metadata.security.spam ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}>
                      {metadata.security.spam ? "Detected" : "Clean"}
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    );
  };

  const renderMessageDetails = () => {
    return (
      <div className="space-y-4">
        {/* Message Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-slate-600 dark:text-slate-400">Length</span>
            </div>
            <p className="text-sm text-slate-900 dark:text-white">{metadata.length} chars</p>
          </div>

          {metadata.language && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Language</span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white">{metadata.language}</p>
            </div>
          )}

          {metadata.sentiment && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Sentiment</span>
              </div>
              <Badge variant={metadata.sentiment === 'urgent' ? "destructive" : "outline"} className="capitalize">
                {metadata.sentiment}
              </Badge>
            </div>
          )}

          {metadata.spam_score !== undefined && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Spam Score</span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white">{metadata.spam_score}/100</p>
            </div>
          )}
        </div>

        {/* Content Analysis */}
        {metadata.contains && (
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm text-slate-900 dark:text-white mb-3">Content Analysis</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">URLs:</span>
                <Badge variant={metadata.contains.urls > 0 ? "outline" : "secondary"}>{metadata.contains.urls}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Emails:</span>
                <Badge variant={metadata.contains.emails > 0 ? "outline" : "secondary"}>{metadata.contains.emails}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Phone Numbers:</span>
                <Badge variant={metadata.contains.phones > 0 ? "outline" : "secondary"}>{metadata.contains.phones}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Financial Terms:</span>
                <Badge variant={metadata.contains.financialTerms > 2 ? "destructive" : metadata.contains.financialTerms > 0 ? "outline" : "secondary"}>
                  {metadata.contains.financialTerms}
                </Badge>
              </div>
              <div className="flex justify-between col-span-2">
                <span className="text-slate-600 dark:text-slate-400">Personal Info Requests:</span>
                <Badge variant={metadata.contains.personalInfoRequests > 0 ? "destructive" : "secondary"}>
                  {metadata.contains.personalInfoRequests}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Data */}
        {metadata.extracted && (metadata.extracted.urls.length > 0 || metadata.extracted.emails.length > 0 || metadata.extracted.phones.length > 0) && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="extracted-data" className="border-slate-200 dark:border-slate-700">
              <AccordionTrigger className="text-sm text-slate-900 dark:text-white hover:no-underline">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Extracted Data ({metadata.extracted.urls.length + metadata.extracted.emails.length + metadata.extracted.phones.length} items)
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {metadata.extracted.urls.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">URLs Found:</p>
                      {metadata.extracted.urls.map((url: string, i: number) => (
                        <div key={i} className="p-2 bg-slate-50 dark:bg-slate-900 rounded text-xs font-mono text-slate-900 dark:text-white break-all mb-1">
                          {url}
                        </div>
                      ))}
                    </div>
                  )}
                  {metadata.extracted.emails.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Email Addresses:</p>
                      {metadata.extracted.emails.map((email: string, i: number) => (
                        <div key={i} className="p-2 bg-slate-50 dark:bg-slate-900 rounded text-xs font-mono text-slate-900 dark:text-white break-all mb-1">
                          {email}
                        </div>
                      ))}
                    </div>
                  )}
                  {metadata.extracted.phones.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Phone Numbers:</p>
                      {metadata.extracted.phones.map((phone: string, i: number) => (
                        <div key={i} className="p-2 bg-slate-50 dark:bg-slate-900 rounded text-xs font-mono text-slate-900 dark:text-white break-all mb-1">
                          {phone}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 mb-6 shadow-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-slate-900 dark:text-white mb-2">Detailed Validation Information</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Comprehensive analysis of the input with metadata extraction
        </p>
      </div>

      {type === 'phone' && renderPhoneDetails()}
      {type === 'url' && renderURLDetails()}
      {type === 'message' && renderMessageDetails()}
    </Card>
  );
}
