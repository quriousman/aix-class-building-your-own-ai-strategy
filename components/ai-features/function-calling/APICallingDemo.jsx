'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Calculator } from 'lucide-react';

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
  // Extract numbers using regex
  const numbers = prompt.match(/\d+(\.\d+)?/g)?.map(Number) || [];
  const words = prompt.toLowerCase().split(' ');

  // Map extracted information to schema parameters
  const params = {};
  
  if (words.includes('income') && numbers.length > 0) {
    params.income = numbers.shift();
  }
  
  if (words.includes('history') && numbers.length > 0) {
    params.credit_history_length = numbers.shift();
  }
  
  if (words.includes('ratio') && numbers.length > 0) {
    params.debt_to_income_ratio = numbers.shift();
  }
  
  if (words.includes('age') && numbers.length > 0) {
    params.age = numbers.shift();
  }
  
  if (words.includes('defaults') && numbers.length > 0) {
    params.previous_defaults = numbers.shift();
  }

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
          
          ${creditScore >= 750 ? '🟢 Excellent' : 
            creditScore >= 670 ? '🟡 Good' :
            creditScore >= 580 ? '🟠 Fair' : '🔴 Poor'} Credit Score`
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
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Try: 'Calculate credit score for someone with income 75000, 5 years history, 30% ratio, age 35, 0 defaults'"
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