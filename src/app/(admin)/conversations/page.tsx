'use client';

import { ChatInterface } from '@/components/chat-interface';
import { aiConversationEngine } from '@/ai/flows/ai-conversation-engine';

export default function ConversationsPage() {

  const transformInput = (message: string, history: {role: 'user' | 'assistant', content: string}[]) => {
    // Filter out initial greeting message from history
    const conversationHistory = history.filter(m => m.content !== 'Welcome to PestAssist AI! How can I help you with your pest problems today?');
    
    return {
      message: message,
      userId: 'user-123', // Mock user ID
      platform: 'webapp', // Mock platform
      sessionData: {
        isReturningCustomer: true
      },
      conversationHistory: conversationHistory.map(m => ({
          role: m.role,
          content: m.content
      })),
    };
  };

  const extractResponse = (result: any) => {
    return result.response;
  };

  return (
    <div className="flex flex-col gap-8">
       <div>
            <h1 className="text-3xl font-bold">Conversations</h1>
            <p className="text-muted-foreground">Engage with the AI conversation engine.</p>
        </div>
      <ChatInterface
        action={aiConversationEngine}
        transformToActionInput={transformInput}
        extractResponse={extractResponse}
        greeting="Welcome to PestAssist AI! How can I help you with your pest problems today?"
        placeholder="Ask about products, pests, or place an order..."
      />
    </div>
  );
}
