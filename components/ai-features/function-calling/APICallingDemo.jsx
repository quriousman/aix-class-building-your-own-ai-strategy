'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Calculator, Lightbulb } from 'lucide-react';

const creditScoreSchema = {
  name: "calculate_credit_score",
  description: "Calculate credit scoring based on user info as provided",
  parameters: {
    type: "object",
    required: [
      "income",
      "credit_history_length",
      "debt_to_income_ratio",
      "age",
      "previous_defaults"
    ],
    properties: {
      income: {
        type: "number",
        description: "Annual income of the user"
      },
      credit_history_length: {
        type: "number",
        description: "Length of credit history in years"
      },
      debt_to_income_ratio: {
        type: "number",
        description: "Debt-to-income ratio as a percentage"
      },
      age: {
        type: "number",
        description: "Age of the user"
      },
      previous_defaults: {
        type: "number",
        description: "Number of previous defaults, if any"
      }
    }
  }
};

const parseNaturalLanguage = (prompt) => {
  // Extract numbers and associated keywords
  const params = {};
  
  // Split the input by commas to handle each parameter separately
  const parts = prompt.split(',').map(part => part.trim().toLowerCase());
  
  parts.forEach(part => {
    const numbers = part.match(/\d+(\.\d+)?/g)?.map(Number) || [];
    
    if (part.includes('income') && numbers.length > 0) {
      params.income = numbers[0];
    }
    else if ((part.includes('history') || part.includes('years')) && numbers.length > 0) {
      params.credit_history_length = numbers[0];
    }
    else if (part.includes('ratio') && numbers.length > 0) {
      params.debt_to_income_ratio = numbers[0];
    }
    else if (part.includes('age') && numbers.length > 0) {
      params.age = numbers[0];
    }
    else if (part.includes('default') && numbers.length > 0) {
      params.previous_defaults = numbers[0];
    }
  });

  // Validate all required parameters are present
  const missingParams = creditScoreSchema.parameters.required.filter(
    param => params[param] === undefined
  );

  if (missingParams.length > 0) {
    throw new Error(`Missing required parameters: ${missingParams.join(', ')}`);
  }

  return params;
};

// Mock credit score calculation
const calculateCreditScore = (params) => {
  const baseScore = 500;
  let score = baseScore;

  // Income factor (0-100 points)
  score += Math.min(params.income / 1000, 100);

  // Credit history length (0-100 points)
  score += Math.min(params.credit_history_length * 10, 100);

  // Debt to income ratio (-100-0 points)
  score -= Math.min(params.debt_to_income_ratio, 100);

  // Age factor (0-50 points)
  score += Math.min((params.age - 18) * 2, 50);

  // Previous defaults (-50 points each)
  score -= params.previous_defaults * 50;

  return Math.max(300, Math.min(850, Math.round(score)));
};

const examplePrompts = [
  {
    text: "Income: 75000, History: 5 years, Ratio: 30, Age: 35, Defaults: 0",
    description: "Good Credit Profile"
  },
  {
    text: "Income: 45000, History: 2 years, Ratio: 45, Age: 25, Defaults: 1",
    description: "Fair Credit Profile"
  },
  {
    text: "Income: 150000, History: 10 years, Ratio: 10, Age: 40, Defaults: 0",
    description: "Excellent Credit Profile"
  }
];

const guidelines = [
  "Format: 'Income: X, History: Y years, Ratio: Z, Age: A, Defaults: D'",
  "Income: Annual income in dollars (e.g., 75000)",
  "History: Credit history length in years (e.g., 5)",
  "Ratio: Debt-to-income ratio as percentage (e.g., 30)",
  "Age: Must be 18 or older",
  "Defaults: Number of previous defaults (0 or more)"
];

export function APICallingDemo() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAPIRequest = async () => {
    setLoading(true);
    try {
      const params = parseNaturalLanguage(prompt);
      const creditScore = calculateCreditScore(params);

      setResult({
        function_called: creditScoreSchema.name,
        parameters: params,
        credit_score: creditScore,
        interpretation: `Based on the provided information:
          • Annual Income: $${params.income.toLocaleString()}
          • Credit History: ${params.credit_history_length} years
          • Debt-to-Income Ratio: ${params.debt_to_income_ratio}%
          • Age: ${params.age} years
          • Previous Defaults: ${params.previous_defaults}
          
          Calculated Credit Score: ${creditScore}
          
          ${creditScore >= 650 ? '🟢 Excellent' : 
            creditScore >= 570 ? '🟡 Good' :
            creditScore >= 480 ? '🟠 Fair' : '🔴 Poor'} Credit Score`
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
          <Calculator className="w-5 h-5" />
          Natural Language Credit Score Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter credit score parameters..."
              className="flex-1"
            />
            <Button 
              onClick={handleAPIRequest}
              disabled={loading || !prompt}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Calculate'
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Lightbulb className="w-4 h-4" />
              Try these examples:
            </div>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(example.text)}
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
              Input Guidelines:
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
                    <div className="font-medium">Function Called:</div>
                    <div className="text-muted-foreground font-mono">
                      {result.function_called}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium">Parameters Extracted:</div>
                    <pre className="bg-muted-foreground/10 p-2 rounded font-mono text-sm whitespace-pre-wrap">
                      {JSON.stringify(result.parameters, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <div className="font-medium">Result:</div>
                    <div className="whitespace-pre-line text-muted-foreground">
                      {result.interpretation}
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