# AIX Class: Building Your Own AI Strategy

A Next.js application demonstrating practical AI implementations for business solutions.

## Features

### 1. RAG (Retrieval Augmented Generation)
- Document Q&A: Ask questions about business documents
- Knowledge Base Integration
- Real-time context retrieval
- Natural language query processing

### 2. Function Calling
- SQL Generation: Convert natural language to SQL queries
- API Integration: Transform text commands into API calls
- Credit Score Calculator: Example of structured function calling

### 3. AI Agents (Coming Soon)
- Task Planning
- Multi-Agent Collaboration
- Autonomous Problem Solving

## Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd aix-class-building-your-own-ai-strategy
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Troubleshooting Installation

If `npm install` fails, try these steps:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete existing modules and lock files:
```bash
rm -rf node_modules
rm package-lock.json
```

3. Install with legacy peer deps:
```bash
npm install --legacy-peer-deps
```

4. If still having issues, try:
```bash
npm install --force
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. If `npm run dev` fails:
   - Check Node.js version (should be 16.x or later)
   - Try clearing Next.js cache:
     ```bash
     rm -rf .next
     npm run dev
     ```
   - Run with debugging:
     ```bash
     npm run dev -- --debug
     ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── ai-features/
│   │   ├── rag/
│   │   │   └── document-qa/
│   │   └── function-calling/
│   │       ├── api-demo/
│   │       └── sql-demo/
│   ├── page.js
│   └── layout.js
├── components/
│   ├── ai-features/
│   │   ├── rag/
│   │   │   └── DocumentQADemo.jsx
│   │   └── function-calling/
│   │       ├── APICallingDemo.jsx
│   │       └── SQLCallingDemo.jsx
│   ├── shared/
│   │   └── PageHeader.jsx
│   ├── sidebar/
│   │   └── SidebarNav.jsx
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       └── input.jsx
```

## Usage Examples

### Document Q&A
Navigate to the RAG section to ask questions about business documents:
- "What are our customer segments?"
- "Explain the sales process"
- "What are our competitive advantages?"

### Function Calling
Try the credit score calculator:
- Format: "Income: X, History: Y years, Ratio: Z, Age: A, Defaults: D"
- Example: "Income: 75000, History: 5 years, Ratio: 30, Age: 35, Defaults: 0"

## Development

The project uses:
- Next.js 13+ with App Router
- Tailwind CSS for styling
- Shadcn UI components
- Lucide React for icons

## Common Issues & Solutions

1. **Module not found errors**
   ```bash
   npm install @radix-ui/react-slot class-variance-authority clsx lucide-react tailwind-merge
   ```

2. **Tailwind CSS not working**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **TypeScript errors**
   ```bash
   npm install -D typescript @types/react @types/node
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
