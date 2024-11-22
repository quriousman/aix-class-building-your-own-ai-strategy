import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  {
    title: 'RAG',
    href: '/ai-features/rag',
    items: [
      { title: 'Document Q&A', href: '/ai-features/rag/document-qa' },
      { title: 'Knowledge Base', href: '/ai-features/rag/knowledge-base' },
    ],
  },
  {
    title: 'Function Calling',
    href: '/ai-features/function-calling',
    items: [
      { title: 'SQL Generation', href: '/ai-features/function-calling/sql-demo' },
      { title: 'API Integration', href: '/ai-features/function-calling/api-demo' },
    ],
  },
  {
    title: 'AI Agents',
    href: '/ai-features/agents',
    items: [
      { title: 'Task Planning', href: '/ai-features/agents/task-planning' },
      { title: 'Multi-Agent Chat', href: '/ai-features/agents/multi-agent' },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {navItems.map((section) => (
        <div key={section.title} className="space-y-3">
          <h3 className="font-semibold">{section.title}</h3>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm hover:bg-muted",
                  pathname === item.href ? "bg-muted font-medium" : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
} 