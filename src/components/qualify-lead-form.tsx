'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, UserCheck, UserX } from 'lucide-react';
import { QualifyLeadOutput, qualifyLead } from '@/ai/flows/lead-qualification';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';

export function QualifyLeadForm() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QualifyLeadOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const output = await qualifyLead({ message });
      setResult(output);
    } catch (error) {
      console.error('Error qualifying lead:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to qualify lead. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Qualify a Lead</CardTitle>
        <CardDescription>Enter a message from a potential customer to see if they are a qualified lead.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., 'Hi, I have a problem with ants and I need a solution. My name is John and my number is 555-123-4567'"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !message.trim()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Qualify
          </Button>
        </form>

        {result && (
          <div className="mt-6 rounded-lg border p-4">
            <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              {result.isLead ? <UserCheck className="text-green-500" /> : <UserX className="text-red-500" />}
              Qualification Result
            </h4>
            <div className="space-y-2 text-sm">
              <p><strong>Is Lead:</strong> <Badge variant={result.isLead ? 'default' : 'destructive'}>{result.isLead ? 'Yes' : 'No'}</Badge></p>
              {result.name && <p><strong>Name:</strong> {result.name}</p>}
              {result.phone && <p><strong>Phone:</strong> {result.phone}</p>}
              {result.inquiredProducts && result.inquiredProducts.length > 0 && (
                <p><strong>Inquired Products:</strong> {result.inquiredProducts.join(', ')}</p>
              )}
              {result.inquiredPests && result.inquiredPests.length > 0 && (
                <p><strong>Inquired Pests:</strong> {result.inquiredPests.join(', ')}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
