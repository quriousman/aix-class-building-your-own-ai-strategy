'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const features = [
  {
    title: 'RAG (Retrieval Augmented Generation)',
    description: 'Enhance AI responses with real-time document retrieval and knowledge base integration.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 text-primary"
      >
        <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18l-4-2-4 2-4-2-4 2Z" />
        <path d="M14 2v10l-3-1.5L8 12V2" />
      </svg>
    ),
    href: '/ai-features/rag/document-qa',
    items: [
      'Document Q&A - Ask questions about your documents',
      'Knowledge Base - Build and query your custom knowledge base'
    ]
  },
  {
    title: 'Function Calling',
    description: 'Convert natural language into structured function calls and database operations.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 text-primary"
      >
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <path d="M7 7h.01" />
      </svg>
    ),
    href: '/ai-features/function-calling',
    items: [
      'Natural Language to SQL',
      'API Integration',
      'Database Operations'
    ]
  },
  {
    title: 'AI Agents',
    description: 'Autonomous AI agents that can plan and execute complex tasks.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 text-primary"
      >
        <rect width="18" height="10" x="3" y="11" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" x2="8" y1="16" y2="16" />
        <line x1="16" x2="16" y1="16" y2="16" />
      </svg>
    ),
    href: '/ai-features/agents',
    items: [
      'Task Planning and Execution',
      'Multi-Agent Collaboration',
      'Autonomous Problem Solving'
    ]
  }
];

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            AI Feature Demonstrations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore different AI capabilities through interactive demonstrations and examples
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    {feature.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
