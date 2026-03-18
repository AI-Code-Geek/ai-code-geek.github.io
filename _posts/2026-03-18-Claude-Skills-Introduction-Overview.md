---
layout: post
title: "🤖 Claude Skills - Introduction & Overview 🚀"
date: 2026-03-18 10:00:00 +0000
categories: [LLM, Gen AI, Ollama, Local AI Models, Skills, Agentic AI, Claude, Claude Code,AI Agents]
tags: [LLM, Gen AI, Ollama, Local AI Models, Skills, Agentic AI, Claude, Claude Code, AI Agents]
author_profile: true
author: "nagul_meera"
reading_time: 5
excerpt: "A **Skill** is an organized package of instructions, scripts, and resources that gives a Claude agent the ability to perform a specific task with expertise."
---
# Claude Skills - Introduction & Overview

## Table of Contents

1. [What is a Skill?](#1-what-is-a-skill)
2. [Why Skills? Key Advantages](#2-why-skills-key-advantages)
3. [Two Types of Skills](#3-two-types-of-skills)
4. [Skill Structure](#4-skill-structure)
5. [Progressive Loading](#5-progressive-loading)
6. [Using Skills in Claude Code](#6-using-skills-in-claude-code)
7. [Skill Composability](#7-skill-composability)

---

## 1. What is a Skill?

A **Skill** is an organized package of instructions, scripts, and resources that gives a Claude agent the ability to perform a specific task with expertise.

Think of it like a playbook — when you want Claude to achieve a particular goal, you define a Skill so that Claude follows the precise instructions within it and delivers accurate, deterministic results.

> 💡 **Simple Analogy:** A **generalist** (base Claude) can do many things reasonably well. A **Skill** turns Claude into a specialist — it knows exactly what tools to use, what format to follow, and how to validate its output for that one job.

Skills are currently popular across **AI Agent** and **LLM** ecosystems because they bridge the gap between raw model capability and reliable, production-grade task execution. They are *predefined executable patterns* — and that predictability is their power.

---

## 2. Why Skills? Key Advantages

| Advantage | Description |
|-----------|-------------|
| ⚡ **Token Optimization** | Skills are loaded only when relevant, reducing unnecessary token consumption |
| 📚 **Easy to Learn** | High-level abstractions — describe *what* to do, not how Claude reasons through it |
| 🧩 **Composability** | Multiple Skills can be combined to achieve complex, multi-step goals |
| 🚀 **More Efficient** | Pre-structured instructions mean less back-and-forth, fewer clarification loops |
| 🎯 **Deterministic & Accurate** | Predefined executable scripts produce consistent, predictable results |
| 🔒 **Guardrails Built-In** | Embed validation steps, output format rules, and error handling |

---

## 3. Two Types of Skills

### 🏛 Anthropic Built-In Skills

Ready-to-use skills maintained and versioned by Anthropic:

| Skill | Purpose |
|-------|---------|
| `xlsx` | Excel / spreadsheet generation |
| `docx` | Word document creation & editing |
| `pdf` | PDF generation, merging, OCR |
| `pptx` | PowerPoint deck creation |
| `frontend-design` | Production-grade UI components |
| `product-self-knowledge` | Accurate Anthropic product facts |

### 🛠 User-Defined Custom Skills

Build anything your workflow needs:

| Skill | Purpose |
|-------|---------|
| `stock-analyzer` | Technical + fundamental analysis |
| `security-monitor` | Threat detection & alerting |
| `agent-orchestrator` | Multi-agent task coordination |
| `email-processor` | Custom inbox workflows |
| `code-reviewer` | Opinionated code quality checks |
| `your-skill-here` | Anything your workflow needs! |

> **Key difference:** Anthropic-loaded Skills are maintained by Anthropic. Custom Skills are *yours* — you define them, own them, and they can be as domain-specific as needed.

---

## 4. Skill Structure

Every Skill lives in its own directory and revolves around a single key file: `SKILL.md`.

```
stock-analyzer/
├── SKILL.md              ← The brain · metadata + instructions (required)
├── helper-script.py      ← Shared utility functions
├── templates/            ← Output blueprints
│   ├── report.html       ← HTML report layout with {{placeholders}}
│   └── email.txt         ← Email message template
└── resources/            ← Static reference data
    └── reference-data.json  ← Lookup tables, configs, benchmarks
```

### What each file does

#### 🐍 `helper-script.py` — Utility Script
Reusable Python functions that every other file in the skill depends on. Written once, called everywhere. No code generation at runtime.

```python
# helper-script.py — shared utilities
def format_currency(value):
    return f"${value:,.2f}"

def pct_change(old, new):
    return f"{((new-old)/old)*100:+.1f}%"
```

#### 📁 `templates/` — Output Blueprints
Pre-built output layouts with `{{placeholder}}` tokens. Claude populates them at runtime — guaranteeing consistent formatting every time.

**`templates/report.html`**
```html
<h1>{{company_name}} — Stock Report</h1>
<p>Price: {{current_price}}  ·  RSI: {{rsi_value}}</p>
<div id="chart">{{chart_data}}</div>
```

**`templates/email.txt`**
```
Subject: {{symbol}} Analysis — {{date}}

Hi {{user_name}},
{{company_name}} closed at {{price}} ({{change}}).
RSI: {{rsi}} · Signal: {{signal}}
```

#### 📁 `resources/reference-data.json` — Static Reference Data
Static facts Claude looks up on-demand instead of reasoning from scratch. Results are always consistent.

```json
{
  "sector_pe_benchmarks": {
    "Technology": 28.5,
    "Healthcare": 22.1,
    "Financials": 14.3
  },
  "rsi_thresholds": { "overbought": 70, "oversold": 30 }
}
```

### `SKILL.md` — The Core File

The `SKILL.md` file has two parts:

1. **YAML frontmatter** — lightweight metadata Claude reads first (always in memory)
2. **Full instruction body** — loaded only when the skill triggers

```yaml
---
name: stock-analyzer               # max 64 characters
description: |                     # max 1024 characters
  Analyze stocks using technical indicators (RSI, MACD,
  Bollinger Bands) and generate reports with price
  projections. Use for swing trading and portfolio review.
  Triggers: "analyze AAPL", "stock report for MSFT",
  any ticker + time period combination.
---

# Full instructions below — loaded only when skill triggers
# Up to ~5,000 tokens of detailed guidance
```

| Field | Limit | Purpose |
|-------|-------|---------|
| `name` | 64 chars | Unique identifier seen by Claude |
| `description` | 1,024 chars | Determines when Claude triggers this skill |
| Full instructions | < 5k tokens | The detailed playbook |
| Linked files | On-demand | Scripts, templates, data |

---

## 5. Progressive Loading

Claude never loads everything at once. Only what's needed, when it's needed.

```
Level 1: Metadata (name + description)
         → Always in memory · Zero cost

              ↓  skill triggers

Level 2: SKILL.md body
         → Full instructions load into context
         → User says "analyze AAPL" → description matches

              ↓  Claude needs detailed info

Level 3: Resources (indicators.md, reference-data.json)
         → Loaded only if required
         → e.g. Claude needs the RSI formula to explain output
```

> 💡 This keeps Claude's context **lean** while providing deep expertise exactly when needed.

---

## 6. Using Skills in Claude Code

Claude Code is the CLI that lets you run Claude directly from your terminal — with **native Skills support**.

### Step 1 — Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
claude --version
# Claude Code 1.x.x — ready
```

### Step 2 — Place Your Skill Package

Drop your skill folder inside `.claude/skills/` in your working directory:

```
claude-workspace/              ← open terminal from here
└── .claude/                   ← Claude Code config folder
    └── skills/                ← all skill packages live here
        └── stock-analyzer/    ← your skill package
            ├── SKILL.md       ← required
            ├── helper-script.py
            ├── templates/
            └── resources/
```

> 💡 `.claude/` is to Claude Code what `.git/` is to Git — the project-level config home.

### Step 3 — Launch Claude Code & Run `/skills`

```
~/claude-workspace $ claude
✓ Claude Code started · project: claude-workspace

claude> /skills

📦 Available Skills (1 found in .claude/skills/)

  01  stock-analyzer   Comprehensive stock analysis using Yahoo Finance data

Type a query to trigger a skill automatically, or use /skill <name> to invoke directly

claude> Analyze the stock AAPL for last 6 months

⚡ Skill matched: stock-analyzer  (triggered by: "analyze the stock")
📥 Loading SKILL.md instructions...
🐍 Running helper-script.py → analyze_stock.py --symbol AAPL --period 6mo
📊 Generating report from templates/report.html...

✅ Analysis Complete — AAPL (6 months)
   Current Price: $195.71  |  6mo Return: +31.4%
   RSI: 58.4 (Neutral)     |  P/E: 32.4x
   Report saved: aapl_report_6mo.html
```

### Bonus — Direct Skill Invocation

```
claude> /skill stock-analyzer
📦 Skill loaded. What would you like to analyze?

claude> Compare NVDA and AVGO over 1 year
⚡ Running analysis for 2 symbols: NVDA, AVGO...
```

### Quick Reference

| Command | What it does |
|---------|-------------|
| `/skills` | List all skills in `.claude/skills/` |
| `/skill <name>` | Directly invoke a skill by name |
| Natural query | Claude auto-matches to the right skill |
| `.claude/skills/` | Place skill folder here to activate it |

---

## 7. Skill Composability

One of the most powerful features — multiple Skills working **together** in a single request.

```
📊 xlsx  +  📄 docx  +  📈 stock-analyzer  =  🚀 Full Research Report
```

A single request — *"Analyze NVDA and give me a Word report with an Excel data appendix"* — triggers three Skills simultaneously. Each contributes its specialty, Claude orchestrates them seamlessly.

---

## Key Takeaways

- **Skills = organized packages** of instructions, scripts, and resources for specific tasks
- **Two types:** Anthropic built-in (xlsx, docx, pdf, pptx) and user-defined custom Skills
- **`SKILL.md`** is the core — YAML frontmatter for discovery, full instructions for execution
- **Progressive loading** keeps token usage efficient — only load what you need
- **`.claude/skills/`** is where Claude Code discovers your skill packages
- Skills are **composable** — combine multiple Skills for complex, multi-step workflows
- Results are **more deterministic** because the execution path is pre-defined

---

> 🚀 **Up Next:** Hands-On Session — Build your own Skill from scratch

---
