# BitAgent 🤖

**AI Agent framework for chaining Bittensor subnet APIs**

Build autonomous agents that orchestrate multiple subnets (SN22 DESEARCH, SN1 APEX, SN8 VANTA) in natural language.

## What it does

```
User: "Find trending crypto narratives and score projects by macro outlook"
  ↓
BitAgent understands intent
  ↓
Chains APIs: SN22 (search) → SN1 (macro) → SN19 (summarize)
  ↓
Returns structured insights + saves agent state
```

## Features

- [ ] Natural language → API calls
- [ ] Multi-subnet orchestration (SN22, SN1, SN8, SN19)
- [ ] Agent state persistence
- [ ] LLM planning + execution
- [ ] Web UI for agent creation
- [ ] Freemium monetization

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

## Architecture

```
src/
├── agents/          # Agent state machines
├── subnets/         # Subnet API wrappers
├── llm/             # LLM orchestration
├── ui/              # Next.js frontend
└── index.ts         # Entry point
```

## Subnet Integrations

- **SN22 (DESEARCH)** — Web search, Twitter search, summaries
- **SN1 (APEX)** — Macro forecasting (crypto, macro events)
- **SN8 (VANTA)** — Prop trading signals
- **SN19 (IOTA)** — ML-powered insights

## Revenue Model

- **Freemium:** 10 agent runs/month free, then $9.99/month
- **Pro:** Unlimited runs, custom agents, API access ($49/month)
- **Enterprise:** White-label, SLA (custom pricing)

## Roadmap

- [x] Project scaffold
- [ ] SN22 API wrapper
- [ ] Basic agent executor
- [ ] Claude integration
- [ ] Next.js UI
- [ ] Stripe payments
- [ ] Documentation

---

Built with 🦞 for Bittensor
