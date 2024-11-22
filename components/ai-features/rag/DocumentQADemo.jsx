'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, FileText, Lightbulb } from 'lucide-react';

const sampleDocument = `
Sales Strategy and Business Development Guide

1. Customer Segmentation
Our target market is divided into three key segments:
- Enterprise (Revenue > $100M): Focus on comprehensive solutions
- Mid-Market ($10M-$100M): Balanced feature set with competitive pricing
- Small Business (<$10M): Streamlined solutions with essential features

2. Sales Approach
The sales process follows these key steps:
• Discovery: Understand customer pain points and needs
• Solution Design: Customize offerings to match requirements
• Proposal: Present value proposition and ROI analysis
• Negotiation: Address concerns and finalize terms
• Closing: Secure commitment and establish next steps

3. Value Proposition
Our competitive advantages include:
- Industry-leading customer support (24/7 availability)
- Flexible integration capabilities
- Scalable pricing model
- Regular feature updates and improvements

4. Account Management
Key account strategies:
• Quarterly business reviews
• Regular check-ins and updates
• Proactive problem resolution
• Growth opportunity identification

5. Sales Best Practices
- Always lead with customer benefits
- Focus on value over price
- Use case studies and testimonials
- Follow up within 24 hours
- Document all customer interactions

6. Revenue Targets
Annual growth objectives:
• New business: 40% of revenue
• Existing account expansion: 30%
• Renewal rate target: 90%
• Average deal size: $50,000
`;

const exampleQuestions = [
  {
    text: "What are the different customer segments and their characteristics?",
    description: "Customer Segments"
  },
  {
    text: "What are the key steps in the sales process?",
    description: "Sales Process"
  },
  {
    text: "What are our value propositions?",
    description: "Value Proposition"
  },
  {
    text: "What are the revenue targets and objectives?",
    description: "Revenue Goals"
  }
];

const guidelines = [
  "Ask about specific business strategies",
  "Questions about sales processes and approaches",
  "Inquire about customer segments and targeting",
  "Ask about revenue goals and metrics"
];

// Improved keyword-based retrieval function
const findRelevantContext = (question, document) => {
  // Split document into numbered sections
  const sections = document.split(/\d+\./).filter(Boolean);
  const questionLower = question.toLowerCase();
  
  // Define section titles and their keywords
  const sectionKeywords = {
    'customer segment': ['customer', 'segment', 'market', 'enterprise', 'mid-market', 'small business'],
    'sales process': ['sales', 'process', 'discovery', 'solution', 'proposal', 'negotiation', 'closing'],
    'value proposition': ['value', 'competitive', 'advantage', 'support', 'integration', 'pricing'],
    'account management': ['account', 'management', 'review', 'check-in', 'problem', 'growth'],
    'best practices': ['practice', 'benefit', 'value', 'case study', 'follow up'],
    'revenue': ['revenue', 'growth', 'target', 'business', 'expansion', 'renewal', 'deal']
  };

  // Find the most relevant section based on keyword matches
  let bestMatch = {
    section: '',
    score: 0
  };

  sections.forEach((section, index) => {
    const sectionLower = section.toLowerCase();
    let score = 0;

    // Check for direct keyword matches from the question
    question.toLowerCase().split(' ').forEach(word => {
      if (sectionLower.includes(word)) score += 2;
    });

    // Check for semantic relevance using predefined keywords
    Object.entries(sectionKeywords).forEach(([topic, keywords]) => {
      if (questionLower.includes(topic)) {
        keywords.forEach(keyword => {
          if (sectionLower.includes(keyword)) score += 1;
        });
      }
    });

    if (score > bestMatch.score) {
      bestMatch = {
        section: section.trim(),
        score
      };
    }
  });

  // If no good match is found, try to find any section with at least one matching keyword
  if (bestMatch.score === 0) {
    const keywords = question.toLowerCase().split(' ');
    sections.forEach(section => {
      if (keywords.some(keyword => section.toLowerCase().includes(keyword))) {
        bestMatch.section = section.trim();
        bestMatch.score = 1;
      }
    });
  }

  return bestMatch.section;
};

// Improved answer generation function
const generateAnswer = (question, context) => {
  if (!context || context.length === 0) {
    return "I couldn't find relevant information to answer your question.";
  }

  // Clean up the context
  const cleanedContext = context
    .replace(/\n+/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();

  // Format bullet points and lists
  const formattedContext = cleanedContext
    .split('\n')
    .map(line => {
      if (line.trim().startsWith('•')) {
        return '\n• ' + line.trim().substring(1).trim();
      }
      if (line.trim().startsWith('-')) {
        return '\n- ' + line.trim().substring(1).trim();
      }
      return line;
    })
    .join('\n');

  return formattedContext;
};

export function DocumentQADemo() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleQuestion = async () => {
    setLoading(true);
    try {
      // 1. Retrieve relevant context
      const relevantContext = findRelevantContext(question, sampleDocument);
      
      // 2. Generate answer
      const answer = generateAnswer(question, relevantContext);

      setResult({
        question,
        context: relevantContext,
        answer,
        process: [
          "1. Analyzed business document content",
          "2. Retrieved relevant sections",
          "3. Generated structured response"
        ]
      });
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Business Strategy Document Q&A
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="font-medium mb-2">Sales Strategy Document:</div>
            <div className="whitespace-pre-line text-sm text-muted-foreground">
              {sampleDocument}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the sales strategy..."
              className="flex-1"
            />
            <Button 
              onClick={handleQuestion}
              disabled={loading || !question}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Ask'
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Lightbulb className="w-4 h-4" />
              Sample Questions:
            </div>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuestion(example.text)}
                  className="text-xs"
                >
                  {example.description}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Lightbulb className="w-4 h-4" />
              Guidelines:
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              {guidelines.map((guideline, index) => (
                <li key={index}>{guideline}</li>
              ))}
            </ul>
          </div>
        </div>

        {result && (
          <Card className="bg-muted">
            <CardContent className="pt-6 space-y-4">
              {result.error ? (
                <div className="text-destructive">{result.error}</div>
              ) : (
                <>
                  <div>
                    <div className="font-medium">Your Question:</div>
                    <div className="text-muted-foreground">
                      {result.question}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium">Relevant Context Found:</div>
                    <div className="bg-muted-foreground/10 p-3 rounded-md border border-border/50">
                      <div className="text-xs text-muted-foreground mb-2">
                        The AI found these relevant sections:
                      </div>
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {result.context}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium">Generated Answer:</div>
                    <div className="bg-primary/5 p-3 rounded-md border border-primary/10">
                      <div className="whitespace-pre-line text-muted-foreground">
                        {result.answer}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-medium">Process:</div>
                    <div className="bg-muted-foreground/5 p-3 rounded-md">
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {result.process.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
} 