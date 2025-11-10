import { Shield, Lock, Eye, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function SecurityTips() {
  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-indigo-200 dark:border-indigo-800 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-slate-900 dark:text-white">Security Tips</h3>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-3">
          <TipCard
            icon={Lock}
            title="Never Share Sensitive Data"
            description="Legitimate companies won't ask for passwords, SSN, or credit cards via unsolicited messages."
          />
          <TipCard
            icon={Eye}
            title="Verify Before You Trust"
            description="Always verify sender identity through official channels before taking action."
          />
        </TabsContent>

        <TabsContent value="phone" className="space-y-3">
          <TipCard
            icon={AlertCircle}
            title="Unknown Numbers"
            description="Don't answer calls from unknown numbers. Let them go to voicemail first."
          />
          <TipCard
            icon={Shield}
            title="Pressure Tactics"
            description="Scammers create urgency. Legitimate organizations give you time to think."
          />
        </TabsContent>

        <TabsContent value="web" className="space-y-3">
          <TipCard
            icon={Lock}
            title="Check HTTPS"
            description="Secure websites use HTTPS with a padlock icon in the browser address bar."
          />
          <TipCard
            icon={Eye}
            title="Inspect URLs Carefully"
            description="Look for misspellings or unusual domains that mimic legitimate sites."
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function TipCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="p-2 bg-indigo-100 dark:bg-indigo-950 rounded-lg flex-shrink-0">
        <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <h4 className="text-slate-900 dark:text-white mb-1">{title}</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}
