# BitAgent Quick Start

## Setup (5 minutes)

```bash
cd ~/.openclaw/workspace/bitagent

# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Add API keys to .env
# Get ANTHROPIC_API_KEY from https://console.anthropic.com
# Get DESEARCH_API_KEY from https://console.desearch.ai
```

## Run Dev

```bash
npm run dev
```

Expected output:
```
BitAgent initialized
Version: 0.1.0
```

## Architecture Overview

```
BitAgent
├── Subnets Layer
│   ├── DESEARCH (SN22) — web/twitter search
│   ├── APEX (SN1) — macro forecasting
│   ├── VANTA (SN8) — trading signals
│   └── IOTA (SN19) — ml summaries
│
├── Agent Executor
│   ├── Intent parser (Claude)
│   ├── Plan generator
│   ├── Executor loop
│   └── Result aggregator
│
└── UI Layer (Next.js)
    ├── Agent creator
    ├── Run history
    └── Results dashboard
```

## Next Steps

### Phase 1: Integration (This week)
1. **Complete DESEARCH wrapper**
   - Add error handling
   - Add pagination
   - Test with real queries
   
2. **Build agent intent parser**
   ```typescript
   // src/llm/parser.ts
   const parsed = await parseIntent("Find trending crypto narratives");
   // => { subnets: ['SN22'], action: 'search', query: '...' }
   ```

3. **Build executor loop**
   ```typescript
   // src/agents/executor.ts
   const agent = new AgentExecutor();
   const result = await agent.execute({
     intent: "Find trending crypto narratives",
     subnets: ['SN22'],
     // ...
   });
   ```

### Phase 2: UI (Week 2)
- Scaffold Next.js with Tailwind
- Create agent form
- Display results

### Phase 3: Monetization (Week 3)
- Add Stripe
- Usage tracking
- Freemium tier

## Git Workflow

```bash
# Create branch for feature
git checkout -b feat/desearch-complete

# Make changes
# ...

# Commit with conventional commits
git commit -m "feat: complete DESEARCH integration with error handling"

# Push
git push origin feat/desearch-complete

# Create PR on GitHub
```

## Testing

```bash
npm test
```

(Setup Jest + ts-jest when ready)

## Deployment

When ready for production:

```bash
npm run build
# Deploy dist/ to Vercel or similar
```

---

**Questions?** Check README.md or ask in Discord (#development channel)

Good luck! 🦞
