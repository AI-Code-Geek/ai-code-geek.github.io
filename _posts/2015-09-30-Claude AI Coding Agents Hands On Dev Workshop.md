---
layout: post
title: "🚀 AI Powered Coding Agents - Hands On Session"
date: 2025-09-30 10:00:00 +0000
categories: [LLM, Gen AI, Claude]
tags: [LLM, AI Models,Claude]
author_profile: true
author: "nagul_meera"
reading_time: 5
excerpt: "A practical workshop demonstrating how to leverage Claude Code and AI-powered coding agents for modern software development. Learn to install and configure Claude Code CLI and IntelliJ plugin, create comprehensive development plans using AI assistance, and build a complete stock portfolio scanner application with technical indicators (Magic Formula, SMA, RSI, MACD) using Python, Streamlit, and Ollama. This hands-on session covers the entire workflow from requirements gathering to code implementation, showcasing how AI coding agents can accelerate development and enhance productivity."
---
## 📺 Reference Videos

- [**Part 1: Claude + AI Coding Agents: Hands-On Dev Workshop (Part 1) 🚀**](https://youtu.be/Cky7ITTlhCQ){:target="_blank"}
- [**Part 2: Claude + AI Coding Agents: Hands-On Dev Workshop (Part 2) 🚀**](https://youtu.be/9praXP2u_Zk){:target="_blank"}

---

## Prerequisites
* IntelliJ
* IntelliJ Claude Plugin
* Claude Code
* Claude Desktop subscription or claude code subscription

---

## 1) Install Claude Code

### Installation Steps

#### Step 1: Install Claude Code

**NPM Install**

If you have Node.js 18 or newer installed:

```bash
npm install -g @anthropic-ai/claude-code
```

#### Step 2: Log in to your account

Claude Code requires an account to use. When you start an interactive session with the `claude` command, you'll need to log in:

```bash
claude
# You'll be prompted to log in on first use
```

```bash
/login
# Follow the prompts to log in with your account
```

#### Step 3: Start your first session

Open your terminal in any project directory and start Claude Code:

```bash
cd /path/to/your/project
claude
```

You'll see the Claude Code prompt inside a new interactive session:

```
✻ Welcome to Claude Code!

...

> Try "create a util logging.py that..."
```

After logging in (Step 2), your credentials are stored on your system.

#### Step 4: Ask your first question

Let's start with understanding your codebase. Try one of these commands:

```bash
> what does this project do?
```

---

## 2) Install Claude Code Plugin In IntelliJ

### Plugin Installation Steps

#### Via IntelliJ Plugin Marketplace

1. **Open IntelliJ IDEA**
   * Launch IntelliJ IDEA
   * Go to `File` → `Settings` (Windows/Linux) or `IntelliJ IDEA` → `Preferences` (macOS)

2. **Navigate to Plugins**
   * In the Settings/Preferences dialog
   * Click on `Plugins` in the left sidebar

3. **Search for Claude Plugin**
   * Click on the `Marketplace` tab
   * Search for "Claude Code" or "Claude AI"
   * Look for the official Claude plugin by Anthropic

4. **Install the Plugin**
   * Click `Install` button next to the Claude plugin
   * Wait for download and installation to complete
   * Click `Restart IDE` when prompted

### Plugin Configuration

1. **Configure Claude Integration**
   * After restart, go to `File` → `Settings` → `Tools` → `Claude`
   * Enter your Claude API credentials
   * Test the connection

2. **Verify Plugin Installation**
   * Look for Claude-related options in the context menu
   * Check for Claude toolbar buttons
   * Test AI assistance features

---

## 3) Prepare your use case requirements

### Development Use Case Requirements

Build or Create complete development plan for claude code with below requirements. I just need development plan in md file and dont add any code implementation. I will use this development plan for Claude Code

### Application Requirements:

**File: requirements.md**

```
* Application should be stock portfolio which has AI assistant
* I want build stocks scanner which uses the magic formula the little book which can beat the market and stocks minimum capital 100 billions
* Once it scanned using magic formula then apply SMA 100, 20 and 13 weekly and daily basis
* Figure it out when 13 signal line cross the 20 and give me signals to buy such stocks also use other indicator rsa should not exceed over selling zone
* Also combine the MACD indicator
* I should be able select above indicators by alone or combine so that scanner should able to filter
* Stocks will be purchased on Monday morning based on scanner signals and will be selling on Friday
* Use python is primary language
* Streamlit for UI
* Ollama for AI model
* Yahoo finance for stock data
* Use lightweight persistence storage database
* This strategy will be apply on Monday and exist on Friday
```

---

## 4) Generate development plan using Claude code plan mode or claude code

### Using Claude Code Plan Mode to Create Development Plan

#### Plan Mode Commands:

```bash
# Switch to plan mode
claude --permission-mode plan

# Generate development plan from requirements (one-liner)
claude --permission-mode plan --project stock-portfolio --requirements requirements.md --output dev-plan.md
```

#### Development Mode Commands:

```bash
# Switch to development mode
claude --permission-mode dev

# Start development from existing plan
claude --permission-mode dev --from-plan dev-plan.md

# Initialize development environment
claude --permission-mode dev --init --project stock-portfolio

# Check current mode status
claude --status
```

### Process:
* I am using Claude Code plan mode to create the comprehensive development plan
* The plan will be generated based on the requirements specified above
* This development plan will serve as the blueprint for Claude Code implementation
* The plan will be saved as an MD file for reference during development

**Note:** The actual development plan creation will be demonstrated using Claude Code plan mode interface

---

## 5) Use claude code to develop code from development plan

### Code Development Process

#### Implementation Phase:
* Using Claude Code CLI to implement the development plan
* Converting the markdown development plan into working Python code
* Iterative development with Claude Code assistance
* Testing and debugging with AI guidance

**Note:** I will demonstrate the code development process during the session

---

## 6) Work with claude code from CLI to achieve the goals

### CLI Workflow Demonstration

#### Command Line Operations:
* Initializing the project with Claude Code
* Implementing individual components using CLI commands
* Debugging and optimization through CLI interface
* Testing and validation using Claude Code assistance

**Note:** I will demonstrate the CLI workflow during the session