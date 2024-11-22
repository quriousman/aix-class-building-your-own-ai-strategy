'use client';

import { APICallingDemo } from '@/components/ai-features/function-calling/APICallingDemo';
import { PageHeader } from '@/components/shared/PageHeader';

export default function APIDemoPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <PageHeader 
        title="Natural Language to API"
        description="Convert natural language commands into structured API calls"
      />
      <APICallingDemo />
    </div>
  );
} 