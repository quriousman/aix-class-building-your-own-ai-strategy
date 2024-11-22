'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, BrainCircuit } from 'lucide-react';

const parseAIPrompt = (prompt) => {
  const keywords = {
    'find': 'READ',
    'get': 'READ',
    'search': 'READ',
    'add': 'CREATE',
    'create': 'CREATE',
    'insert': 'CREATE',
    'remove': 'DELETE',
    'delete': 'DELETE'
  };
  
  const operation = Object.entries(keywords).find(([key]) => 
    prompt.toLowerCase().includes(key)
  )?.[1] || 'UNKNOWN';
  
  const params = prompt.split(' ').slice(1).join(' ');
  
  return { operation, params };
};

const dbOperations = {
  READ: async (params) => ({ 
    result: `Found data for: ${params}`,
    rawQuery: `SELECT * FROM users WHERE name LIKE '%${params}%'`
  }),
  CREATE: async (params) => ({
    result: `Created new record: ${params}`,
    rawQuery: `INSERT INTO users (name) VALUES ('${params}')`
  }),
  DELETE: async (params) => ({
    result: `Deleted record: ${params}`,
    rawQuery: `DELETE FROM users WHERE name = '${params}'`
  })
};

export function SQLCallingDemo() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAIRequest = async () => {
    setLoading(true);
    try {
      const { operation, params } = parseAIPrompt(prompt);
      
      if (operation !== 'UNKNOWN' && dbOperations[operation]) {
        const response = await dbOperations[operation](params);
        setResult({ 
          operation,
          ...response,
          aiInterpretation: `AI interpreted this as a ${operation} operation with parameters: ${params}`
        });
      } else {
        setResult({ 
          error: 'Could not determine database operation from prompt'
        });
      }
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
          <BrainCircuit className="w-5 h-5" />
          Natural Language to SQL Demo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Try: 'find user John' or 'add user Mary' or 'delete user Bob'"
            className="flex-1"
          />
          <Button 
            onClick={handleAIRequest}
            disabled={loading || !prompt}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Process'
            )}
          </Button>
        </div>

        {result && (
          <Card className="bg-muted">
            <CardContent className="pt-6 space-y-2">
              {result.error ? (
                <div className="text-destructive">{result.error}</div>
              ) : (
                <>
                  <div className="font-medium">AI Interpretation:</div>
                  <div className="text-muted-foreground">{result.aiInterpretation}</div>
                  <div className="font-medium">Generated SQL:</div>
                  <div className="bg-muted-foreground/10 p-2 rounded font-mono text-sm">
                    {result.rawQuery}
                  </div>
                  <div className="font-medium">Result:</div>
                  <div>{result.result}</div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
} 