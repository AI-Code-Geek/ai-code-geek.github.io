---
layout: post
title: "🤖📈 Building an AI Trading System with Claude Code — A Weekend Experiment That Taught Me a Lot"
date: 2026-07-13 10:00:00 +0000
categories: [Agentic AI, Claude, Claude Code, AI Agents, LLM, Gen AI, Trading, Machine Learning]
tags: [Agentic AI, Claude, Claude Code, AI Agents, LLM, Gen AI, Trading, Alpaca, Cloudflare Pages, Python]
author_profile: true
author: "nagul_meera"
reading_time: 8
excerpt: "A personal story about what's possible when curiosity meets today's AI tools — building **TradeAIQ**, an experimental AI trading system, on weekends with Claude Code, free market data, and open-source Python libraries. And an invitation for anyone with an idea to give it a try."
---
*A personal story about what's possible when curiosity meets today's AI tools — and an invitation for anyone with an idea to give it a try.*

| Investment | Value |
|------|-------|
| Time | **Weekends only** |
| Hosting Cost | **$0** |
| Out-of-Pocket | **1 domain name** |

---

## Table of Contents

1. [Why I'm Sharing This](#1-why-im-sharing-this)
2. [The First Real Hurdle: Token Limits](#2-the-first-real-hurdle-token-limits)
3. [The System: TradeAIQ](#3-the-system-tradeaiq)
4. [How the Intelligence Flows](#4-how-the-intelligence-flows)
5. [Working with Claude Like a Team](#5-working-with-claude-like-a-team)
6. [What It Cost](#6-what-it-cost)
7. [A Peek at the Result](#7-a-peek-at-the-result)
8. [What I Took Away](#8-what-i-took-away)

---

## 1. Why I'm Sharing This

Like many of us, I've carried product ideas around for years. In the past, turning an idea into working software usually meant needing a team, a budget, and a lot of time — things most of us with day jobs and families simply don't have.

What's changed recently isn't me. **It's the tools.**

Agentic AI tools like Claude Code have lowered the barrier so much that small teams — and even individuals working on weekends — can now explore ideas that once felt out of reach. I wanted to test that for myself with an honest experiment, and I'm sharing the journey in case it encourages someone else sitting on an idea to take the first step.

> 💡 **Why a trading system?** Not because I'm an expert — precisely because it's a genuinely complex problem: live market data, mathematical rigor, machine learning, an AI reasoning layer, and a public-facing UI. If the approach worked here, it could work for many kinds of ideas.

---

## 2. The First Real Hurdle: Token Limits

If you use a personal AI tool on a basic subscription, you know this pain: **token limits**. Long, sprawling sessions burn through your quota quickly, and a complex system simply can't be built in one giant conversation.

The workaround that saved me was nothing revolutionary — just good old software engineering discipline: **modular, contract-driven development**.

1. **🧭 Design first** — I sketched the overall system myself (my thought process, the ideas, the structure), then shared it with Claude Code to refine and improve together.
2. **🔁 Iterate on the architecture** — until the design felt right.
3. **🧩 Break the system into small, independent modules** — each buildable within a single session, each with a clean, stable contract to its neighbors.

This solved the token problem, and it turned out to be a great fit for working with AI agents in general: **give them well-bounded modules with clear interfaces, and they do remarkably well.** Nothing here is my invention — it's a pattern anyone can apply.

---

## 3. The System: TradeAIQ

An experimental AI trading system with predictors for **Swing**, **Day**, and **Intraday** trading — live at [TradeAIQ.app](https://tradeaiq.app/app){:target="_blank"}.

### Architecture at a Glance

![TradeAIQ Architecture](/docs/assets/images/2026/jul/tradeaiq/tradeaiq_architecure.png)

### 📡 1. Market Data Server

The foundation — and my first lesson in patience. I started with Yahoo Finance, hit data quality issues, and after more searching landed on **Alpaca's free market data**, designing carefully around its rate limits.

One design decision I'm glad I made early: **the API always returns the same output shape regardless of the backend source** — Alpaca, Yahoo, Robinhood, or anything else. With a consistent contract, every downstream module is insulated from data-source changes. If the backend needs to change tomorrow, nothing else breaks.

### 📐 2. Mathematical Engine

Built on the excellent open-source Python trading and ML libraries the community has created over the years. This module pulls data from the Market Data Server and computes the technical indicators the system needs. I stood on the shoulders of a lot of generous open-source contributors here.

### 🧠 3. AI Brain

A Claude Code plugin that handles what pure math can't: **edge cases** like sentiment analysis and contextual judgment calls that don't reduce to a formula.

### 🖥️ 4. UI Layer

A public-facing interface deployed on **Cloudflare Pages** — chosen because this is an experiment, and free hosting made it possible to share openly without worrying about costs.

---

## 4. How the Intelligence Flows

The screener output is a **layered pipeline** rather than a single model's guess:

> **Mathematical Engine** (pure technical computation)
> → **ML Model** (trained on actual outcomes)
> → **AI Brain** (covers edge cases like sentiment analysis)
> → **Published publicly** on the hosted system

Reports run periodically and publish automatically.

![TradeAIQ Report Schedulers](/docs/assets/images/2026/jul/tradeaiq/reports.png)

*The internal portal's Report Schedulers — persona-scoped watchlist decision reports running on their own cadence, each writing a versioned JSON report that the public site then picks up and publishes.*

---

## 5. Working with Claude Like a Team

One of the most enjoyable parts of this experiment was learning to collaborate with Claude Code in **different roles**:

- **📋 Business Analyst** — helping clarify requirements and priorities
- **🏛️ Architect** — keeping the modular design and contracts honest
- **🛠️ Specialist Engineers** — backend, frontend, and everything in between

It never felt like replacing anyone. It felt like getting to *learn from* the collective knowledge of many disciplines at once — and I came out of each session understanding my own system better. If anything, this experience deepened my respect for the engineers, analysts, and architects whose expertise these tools are built on.

---

## 6. What It Cost

| Investment | Cost |
|---|---|
| My weekends and personal time | **The real investment** |
| Claude Pro subscription | Already had it |
| Cloudflare Pages hosting | **$0** |
| Domain (TradeAIQ.app) | The one small purchase |

Essentially free, apart from time and a domain name — which is exactly what made it possible to try at all.

---

## 7. A Peek at the Result

> 🔗 **See it live:** [https://tradeaiq.app/app](https://tradeaiq.app/app){:target="_blank"}

Here's the live system — the layered pipeline in action. Every row you see is the output of the Mathematical Engine, ML model, and AI Brain working together: fused-decision ranking, conviction scores, risk/reward ratios, trend sparklines, entry prices, market regime detection, and grades.

### 🏠 The Public Home

![TradeAIQ public home page](/docs/assets/images/2026/jul/tradeaiq/aiq_public_facing_home.png)

*The public face of the experiment — Swing, Day, and Intraday predictors, all published automatically.*

### 📊 The Dashboard

![TradeAIQ public dashboard](/docs/assets/images/2026/jul/tradeaiq/aiq_public_facing_dashbaord.png)

*The dashboard rolls up the latest published run: market regime, top-ranked setups, and how the pipeline is currently reading the market.*

### 🎯 The Candidates Screener

![TradeAIQ Swing Trader Candidates screener](/docs/assets/images/2026/jul/tradeaiq/aiq_portal_ranked_candidates.png)

*The Swing Trader Candidates view: S&P 500 symbols ranked by fused decision, each with strategy setup (S/R Breakout, RSI Divergence, EMA Crossover, and more), conviction, R:R, trend, and regime — with rich filtering across side, grade, market cap, EPS trends, and forecast direction. Refreshed automatically and published publicly.*

### 🔍 The Symbol Detail View

![TradeAIQ symbol analysis view](/docs/assets/images/2026/jul/tradeaiq/aiq_public_facing_symbol_analysis.png)

*The Symbol Detail view: a full candlestick chart with support/resistance levels, entry/stop/target overlays, RSI/MACD/volume panels — and on the right, the decision panel showing the setup with its conviction score, the checks behind it (HTF alignment, confluence, quality, R:R), the AI scoring layers, price-action confirmation criteria, and a complete trade setup with risk sizing.*

---

## 8. What I Took Away

This experiment wasn't about proving I could do something special. It was about discovering that **the gap between *having an idea* and *building it* has quietly become much smaller — for all of us.**

I made plenty of mistakes along the way. I hit walls, backtracked, and redesigned things more than once. But every hurdle had a workaround, and the process itself was deeply satisfying.

If you're someone with an idea you've been putting off because you thought you'd need a team, a budget, or more expertise — I hope this story nudges you to just start:

- 🧭 **Design first** — think it through before you type
- 🧩 **Break things into small modules** — one session, one module
- 🔌 **Keep your interfaces clean** — contracts protect you from change
- 🎁 **Lean on free tools and open-source libraries** — the community has done a lot of the hard work already
- 🤝 **Let AI agents share the load** — treat them as teammates, not magic

> The best part of this new era isn't what any one person can build. **It's how many more of us get to build at all.**

---

⚠️ *TradeAIQ is an experimental project shared for educational purposes. Nothing here is financial advice — do your own research before making any investment decision.*

*Built on weekends with Claude Code, Alpaca free market data, open-source Python libraries, and Cloudflare Pages. Live at [TradeAIQ.app](https://tradeaiq.app/app){:target="_blank"}. If you're working on something similar, I'd love to hear about it.*
