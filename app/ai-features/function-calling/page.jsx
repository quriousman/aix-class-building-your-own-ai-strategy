'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { Database, Globe } from 'lucide-react';

const useCases = [
  {
    title: 'SQL Generation',
    description: 'Convert natural language into SQL queries for database operations',
    icon: <Database className="w-6 h-6 text-primary" />,
    href: '/ai-features/function-calling/sql-demo',
    features: [
      'Natural language to SQL conversion',
      'Support for basic CRUD operations',
      'Real-time query preview'
    ]
  },
  {
    title: 'API Integration',
    description: 'Transform natural commands into structured API calls',
    icon: <Globe className="w-6 h-6 text-primary" />,
    href: '/ai-features/function-calling/api-demo',
    features: [
      'REST API endpoint selection',
      'Parameter extraction from text',
      'Method and payload generation'
    ]
  }
];

export default function FunctionCallingPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <PageHeader 
        title="Function Calling Demos"
        description="Explore different ways to convert natural language into structured operations"
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        {useCases.map((useCase) => (
          <Link href={useCase.href} key={useCase.title}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {useCase.icon}
                  <CardTitle>{useCase.title}</CardTitle>
                </div>
                <CardDescription>{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  {useCase.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 