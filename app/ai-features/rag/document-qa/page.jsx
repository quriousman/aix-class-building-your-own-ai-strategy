'use client';

import { DocumentQADemo } from '@/components/ai-features/rag/DocumentQADemo';
import { PageHeader } from '@/components/shared/PageHeader';

export default function DocumentQAPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <PageHeader 
        title="Document Q&A"
        description="Ask questions about documents using RAG (Retrieval Augmented Generation)"
      />
      <DocumentQADemo />
    </div>
  );
} 