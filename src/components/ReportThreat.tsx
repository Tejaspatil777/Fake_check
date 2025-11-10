import { useState } from 'react';
import { Flag, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

export function ReportThreat() {
  const [type, setType] = useState<string>('');
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!type || !input.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Thank you! Your report has been submitted and will be reviewed.');
    
    // Reset form
    setType('');
    setInput('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Flag className="w-5 h-5 text-red-600 dark:text-red-400" />
        <h3 className="text-slate-900 dark:text-white">Report a Threat</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Help protect the community by reporting suspicious content
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="threat-type">Threat Type *</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="threat-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone Number</SelectItem>
              <SelectItem value="url">Website/URL</SelectItem>
              <SelectItem value="message">Spam Message</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="threat-input">
            {type === 'phone' ? 'Phone Number' : type === 'url' ? 'Website URL' : 'Content'} *
          </Label>
          {type === 'message' ? (
            <Textarea
              id="threat-input"
              placeholder="Paste the suspicious message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          ) : (
            <Input
              id="threat-input"
              type="text"
              placeholder={type === 'phone' ? '+1 (555) 123-4567' : 'https://suspicious-site.com'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Additional Details (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Describe what happened or any additional context..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[80px] resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
          disabled={isSubmitting || !type || !input.trim()}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Submit Report
            </span>
          )}
        </Button>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          All reports are reviewed by our security team
        </p>
      </form>
    </Card>
  );
}
