'use client';

import { SQLCallingDemo } from '@/components/ai-features/function-calling/SQLCallingDemo';
import { PageHeader } from '@/components/shared/PageHeader';

export default function SQLDemoPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <PageHeader 
        title="Natural Language to SQL"
        description="Convert natural language commands into SQL queries for database operations"
      />
      <SQLCallingDemo />
    </div>
  );
} 