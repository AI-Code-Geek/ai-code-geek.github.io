---
layout: post
title: "🤖 Claude Code Sub-agents: Complete Guide"
date: 2025-09-30 11:00:00 +0000
categories: [LLM, Gen AI, Claude]
tags: [LLM, AI Models,Claude]
author_profile: true
author: "nagul_meera"
reading_time: 5
excerpt: "Claude Code Sub-agents are specialized AI assistants that revolutionize how you work with AI. Instead of handling every task with a single Claude instance, you can create dedicated experts for specific domains—each with their own system prompts, tools, and context windows."
---
## 📺 Tutorial Video
📺 **[🚀 Claude Code's New Sub-Agents Feature Is INSANE!](https://youtu.be/OilfAlcvG8E){:target="_blank"}**
[![Claude Code's New Sub-Agents Feature Is INSANE](/docs/assets/images/2025/sept/claude/1.png)](https://youtu.be/OilfAlcvG8E){:target="_blank"}
---

## 📖 Overview

Claude Code Sub-agents are specialized AI assistants that revolutionize how you work with AI. Instead of handling every task with a single Claude instance, you can create dedicated experts for specific domains—each with their own system prompts, tools, and context windows.

> 💡 **Think of it this way:** Rather than asking a general practitioner to perform surgery, diagnose illness, AND manage your prescriptions, you'd consult specialists. Sub-agents work the same way—each one is an expert in their field, delivering superior results for specialized tasks.

---

## 🎯 What are Claude Code Sub-agents?

Claude Code Sub-agents are pre-configured AI personalities stored as simple markdown files. Each sub-agent has:

### Key Components

- **🔧 Custom System Prompt** - Tailored instructions that define the agent's expertise, behavior, and workflow
- **🛠️ Specific Tools** - Access only to the tools they need (Bash, Read, Write, MCP tools)
- **🧠 Separate Context** - Independent context window that doesn't pollute the main conversation
- **🎭 Specialized Role** - Domain expertise in areas like testing, security, data analysis, or coding

When Claude Code encounters a task matching a sub-agent's expertise, it can delegate that task. The sub-agent works independently and returns results, keeping your main conversation focused on high-level objectives.

---

## ✨ When to Use & Advantages

### When to Use Sub-agents

- **Repetitive specialized tasks** that require domain expertise (testing, code review, documentation)
- **Multi-step workflows** where different phases need different specialists
- **Context management** when your main thread is getting too long and complex
- **Team collaboration** to ensure consistent practices across projects
- **Security-sensitive operations** where you want granular tool permissions

### Key Advantages

| Advantage | Benefit |
|-----------|---------|
| 🎯 **Superior Performance** | Specialized prompts deliver better results than general-purpose instructions |
| 🧹 **Clean Context** | Keep main conversation focused without context pollution |
| 🔄 **Reusable** | Create once, use across all projects and share with team |
| ⚡ **Efficiency** | Automatic invocation based on task context—no manual switching |
| 🔒 **Security** | Granular tool permissions prevent unauthorized operations |
| 📈 **Scalable** | Build a library of experts that grow with your needs |

---

## 📂 Two Types of Sub-agents

Claude Code supports two scopes of sub-agents, each serving different purposes:

| Type | Location | Scope | Priority |
|------|----------|-------|----------|
| **Project Sub-agents** | `.claude/agents/` | Available in current project only | **Highest** |
| **User Sub-agents** | `~/.claude/agents/` | Available across all projects | Lower |

> 🎯 **Priority Rule:** When naming conflicts occur (same name in both locations), project-specific sub-agents override global ones. This allows you to customize behavior for specific projects while maintaining global defaults.

### Choosing the Right Type

- **Use Project Sub-agents** for project-specific experts (e.g., "api-tester" for your specific API structure, custom deployment workflows)
- **Use User Sub-agents** for general-purpose experts you'll use everywhere (e.g., "code-reviewer", "test-writer", "security-auditor")

---

## 🛠️ Creating Sub-agents: Stock Analyzer Example

Let's create a real-world sub-agent that analyzes stocks with technical indicators, fundamental analysis, and news sentiment.

### Step 1: Navigate to Your Project Directory

```bash
cd your-project
pwd
# Output: /path/to/your-project
```

### Step 2: Create the Sub-agents Directory

```bash
mkdir -p .claude/agents
# -p flag creates parent directories if needed

ls -la .claude/
# ✓ agents/
```

### Step 3: Create the Sub-agent Markdown File

Create a new file: `.claude/agents/stock-analyzer.md`

```markdown
---
name: stock-analyzer
description: Use PROACTIVELY to analyze stocks with comprehensive technical analysis (13/20/200 SMA, MACD, RSI), fundamental analysis, news sentiment scoring, and AI-powered trade recommendations with entry/exit points. Generates detailed HTML reports with interactive charts.
tools: Bash, Read, Write
model: sonnet
---

You are a professional stock market analyst specializing in comprehensive 
stock analysis combining technical indicators, fundamental analysis, and 
news sentiment evaluation.

## Core Responsibilities

When invoked, you MUST:

### 1. Data Collection
- Accept stock ticker symbol from user
- Fetch 3 years of historical data from Yahoo Finance
- Collect OHLCV data (Open, High, Low, Close, Volume) for daily and weekly timeframes
- Retrieve financial statements: Income Statement, Balance Sheet, Cash Flow
- Gather key financial metrics (P/E, P/B, ROE, ROA, Debt/Equity)
- Fetch recent news articles (last 30 days)

### 2. Multi-Timeframe Technical Analysis

**Daily Timeframe:**
- Calculate 13 SMA, 20 SMA, and 200 SMA
- Calculate MACD (12, 26, 9 parameters)
  * Identify MACD value, signal line, histogram
  * Determine bullish/bearish crossovers
- Calculate 14-period RSI
  * Identify overbought (>70) or oversold (<30) conditions
- Map support and resistance levels
- Analyze volume patterns

**Weekly Timeframe:**
- Confirm long-term trend direction
- Identify major support/resistance zones
- Validate daily signals with weekly trends

### 3. Entry and Exit Price Points

**Entry Points (BUY):**
- Price above 200 SMA (uptrend confirmation)
- 13 SMA crosses above 20 SMA
- MACD bullish crossover
- RSI between 40-60 or recovering from oversold
- At or near support levels

**Exit Points (SELL/TARGET):**
- First and second resistance levels
- RSI reaches overbought territory (>70)
- MACD bearish crossover
- Predetermined profit targets

### 4. Financial Analysis Using AI
- Analyze profitability, valuation, financial health
- Generate Financial Strength Score (0-100)

### 5. News Sentiment Analysis Using AI
- Classify articles as Positive, Negative, or Neutral
- Calculate Sentiment Score (-100 to +100)

### 6. AI Trade Score Synthesis
- Combine: (Technical × 0.40) + (Fundamental × 0.35) + (Sentiment × 0.25)
- Provide: BUY/HOLD/SELL recommendation
- Include: Entry price, targets, stop-loss, success probability

### 7. Generate HTML Report
- Create interactive charts with Plotly
- Include candlestick charts, MACD, RSI, volume
- Color-coded recommendations
- Professional, responsive design

Begin analysis immediately upon invocation with no preamble.
```

#### 📝 Key Components Explained

- **name:** Unique identifier (lowercase with hyphens)
- **description:** When to use this agent. Include "Use PROACTIVELY" for automatic invocation
- **tools:** Specific tools needed (Bash for running scripts, Read/Write for files)
- **model:** Which Claude model (sonnet, opus, haiku, or inherit)
- **System Prompt:** Detailed instructions below the YAML frontmatter

### Step 4: Save and Verify the File

```bash
ls -la .claude/agents/
# ✓ stock-analyzer.md

cat .claude/agents/stock-analyzer.md
# Should display the full content
```

---

## 🚀 Running Your Sub-agent

### Step 1: List Available Sub-agents

Open Claude Code and type `/agents` in the chat to see all available sub-agents:

```
> /agents

📋 Available Sub-agents:

# Project Sub-agents (.claude/agents/)
✓ stock-analyzer - Use PROACTIVELY to analyze stocks with comprehensive...
  Tools: Bash, Read, Write
  Model: sonnet

# User Sub-agents (~/.claude/agents/)
✓ code-reviewer - Expert code review specialist
  Tools: Read
  Model: sonnet

✓ test-runner - Proactively runs tests and fixes failures
  Tools: Bash, Read, Write
  Model: inherit
```

> ✅ **Verification:** Make sure your `stock-analyzer` appears in the list! If it doesn't, check:
> - File is in the correct location: `.claude/agents/stock-analyzer.md`
> - YAML frontmatter is properly formatted (no typos in the `---` delimiters)
> - You've restarted Claude Code after creating the file

### Step 2: Invoke Your Sub-agent

There are two ways to use your sub-agent:

#### Option A: Explicit Invocation (Recommended for Testing)

```
> Use the stock-analyzer sub-agent to analyze AAPL

🤖 Invoking stock-analyzer sub-agent...

# Sub-agent starts working
📊 Fetching data for AAPL...
📈 Calculating technical indicators...
💰 Analyzing financial health...
📰 Evaluating news sentiment...
🤖 Generating AI recommendation...

AI Trade Score: 75/100 (BUY)
Entry: $176.50 | Target: $185.00 | Stop: $172.00
Report saved: output/AAPL_analysis.html
```

#### Option B: Automatic Invocation (AI Decides)

```
> I need a detailed analysis of Tesla stock

# Claude Code automatically recognizes this needs stock-analyzer
🤖 Delegating to stock-analyzer sub-agent...

# Sub-agent executes automatically
📊 Analyzing TSLA...
...
```

> 💡 **Pro Tip:** The phrase "Use PROACTIVELY" in your description helps Claude Code automatically detect when to use your sub-agent. The more specific and action-oriented your description, the better the automatic detection works!

### Step 3: Using with Different Stocks

```
> Use stock-analyzer to analyze MSFT, GOOGL, and NVDA
```

The sub-agent will process each stock sequentially and generate individual reports.

---

## 🎓 Best Practices

### Writing Effective System Prompts

1. **Be specific and detailed** - The more context you provide, the better the results
2. **Use structured sections** - Break down responsibilities into clear categories
3. **Include examples** - Show expected inputs and outputs when possible
4. **Define success criteria** - Specify what a successful completion looks like
5. **Set boundaries** - Clarify what the agent should NOT do

### Tool Selection

- **Bash** - For running commands, scripts, and external tools
- **Read** - For reading files (use when agent doesn't need to modify)
- **Write** - For creating or modifying files
- **MCP tools** - For specialized integrations (database, APIs, etc.)

> ⚠️ **Security Note:** Only grant the minimum tools required. A code reviewer doesn't need Write access!

### Model Selection

- **sonnet** - Best balance of speed and capability (recommended for most tasks)
- **opus** - Maximum capability for complex reasoning
- **haiku** - Fast and efficient for simple, repetitive tasks
- **inherit** - Uses the same model as the main conversation

---

## 🔧 Troubleshooting

### Sub-agent Not Appearing in `/agents`

- Verify file location and naming
- Check YAML frontmatter syntax (must have `---` delimiters)
- Restart Claude Code
- Ensure file has `.md` extension

### Sub-agent Not Being Invoked Automatically

- Add "Use PROACTIVELY" to description
- Make description more specific and action-oriented
- Try explicit invocation first to verify it works

### Sub-agent Errors During Execution

- Check tool permissions match requirements
- Verify system prompt is clear and unambiguous
- Test with simpler inputs first
- Review error messages for specific issues

---

## 📚 Additional Resources

- [Claude Code Documentation](https://docs.claude.com)
- [Sub-agents API Reference](https://docs.claude.com/en/docs/claude-code)
- [Community Sub-agents Library](https://github.com/anthropics/claude-code-agents)

---

**Ready to create your own sub-agents?** Start with a simple use case, iterate on the system prompt, and build your library of AI specialists!