---
layout: post
title: "🤖 Working with LLMs - Tool Calls Unlock AI's True Power 🚀"
date: 2025-10-12 10:00:00 +0000
categories: [LLM, Gen AI, Ollama, Local AI Models]
tags: [LLM, Gen AI, Ollama, Local AI Models]
author_profile: true
author: "nagul_meera"
reading_time: 5
excerpt: "Tool calls (also known as function calls) are a game-changing capability that allows LLMs to interact with external tools, APIs, and functions beyond their training data."
---
## 📺 Tutorial Video

- [**🤖 Working with LLMs – Part 4: Tool Calls Unlock AI's True Power 🚀**](https://youtu.be/XiVzeJfxGkg){:target="_blank"}
  [![🤖 Working with LLMs – Part 4: Tool Calls Unlock AI's True Power 🚀](/docs/assets/images/2025/oct/llms/4.png)](https://youtu.be/9praXP2u_Zk){:target="_blank"}
---
## 📚 What are Tool/Function Calls in LLMs?

Tool calls (also known as function calls) are a **game-changing capability** that allows LLMs to interact with external tools, APIs, and functions beyond their training data.

### The Core Concept

- **Traditional LLMs:** Can only generate text based on their training data
- **LLMs with Tool Calls:** Can trigger external functions, fetch real-time data, and perform actions
- **The Magic:** LLM decides when and how to use tools based on user intent

**Example:** Instead of guessing the weather, an LLM can call a weather API. Instead of making up math calculations, it can use a calculator function.

### 🧒 Human Analogy: Understanding Tool Calls

**Imagine the adult brain faces a new question—something they haven't learned:**

- 🧑 The adult (LLM) turns to young kids (external tools/APIs) who are up-to-date and specialized
- 💬 The adult asks: *"Hey kid, what's the weather in Tokyo?"*
- 👦 The kid checks and replies: *"It's 22°C and sunny"*
- ✅ The adult passes this answer along to you

**Key Insight:** The LLM delegates tasks to external tools when it doesn't have the answer itself—just like an adult asking a specialist!

---

## ⚡ Why Tool Calls are Critical for LLM Applications

### 🎯 Accuracy
Get real-time, accurate data instead of hallucinated information

### 🔌 Integration
Connect to databases, APIs, and external systems seamlessly

### 🚀 Action
LLMs can perform tasks, not just talk about them

### Real-World Use Cases

- **Customer Support:** Query databases for order status, update tickets, send emails
- **Data Analysis:** Execute SQL queries, generate charts, fetch metrics
- **Automation:** Schedule meetings, book appointments, manage workflows
- **Research:** Search the web, retrieve documents, analyze information

---

## 💻 Tool Call Structure: The Basics

### 1. Define Your Tool

```python
tools = [
  {
    'type': 'function',
    'function': {
      'name': 'get_weather',
      'description': 'Get current weather for a location',
      'parameters': {
        'type': 'object',
        'properties': {
          'location': {
            'type': 'string',
            'description': 'City name'
          },
          'unit': {
            'type': 'string',
            'enum': ['celsius', 'fahrenheit']
          }
        },
        'required': ['location']
      }
    }
  }
]
```

### 2. Implement the Function

```python
import requests

def get_weather(location, unit='celsius'):
    # Call weather API
    response = requests.get(f'https://api.weather.com/{location}')
    
    return {
        'location': location,
        'temperature': 22,
        'unit': unit,
        'condition': 'Sunny'
    }
```

---

## 🏠 Complete Example: Ollama Local Model

**Scenario:** Build a real-time stock price assistant using Ollama running locally 📈

```python
import ollama
import yfinance as yf
import json
from datetime import datetime

# Define stock price tools
tools = [
  {
    'type': 'function',
    'function': {
      'name': 'get_stock_price',
      'description': 'Get real-time stock price and info for a given ticker symbol',
      'parameters': {
        'type': 'object',
        'properties': {
          'ticker': {
            'type': 'string',
            'description': 'Stock ticker symbol (e.g., AAPL, TSLA, GOOGL)'
          }
        },
        'required': ['ticker']
      }
    }
  }
]

# Stock price function using Yahoo Finance
def get_stock_price(ticker):
    try:
        # Create ticker object
        stock = yf.Ticker(ticker)
        
        # Get current price and info
        info = stock.info
        hist = stock.history(period='1d')
        
        if len(hist) > 0:
            current_price = hist['Close'].iloc[-1]
            previous_close = info.get('previousClose', current_price)
            change = current_price - previous_close
            change_percent = (change / previous_close) * 100
            
            return {
                'ticker': ticker.upper(),
                'company_name': info.get('longName', 'N/A'),
                'price': round(current_price, 2),
                'change': round(change, 2),
                'change_percent': round(change_percent, 2),
                'volume': hist['Volume'].iloc[-1],
                'market_cap': info.get('marketCap', 'N/A'),
                'day_high': hist['High'].iloc[-1],
                'day_low': hist['Low'].iloc[-1],
                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
        else:
            return {'error': f'No data available for {ticker}'}
    
    except Exception as e:
        return {'error': str(e)}

# Chat with tool calling
user_query = 'What is the current stock price of Tesla?'

response = ollama.chat(
    model='llama3.1',
    messages=[{'role': 'user', 'content': user_query}],
    tools=tools
)

# Process tool call
if response['message'].get('tool_calls'):
    tool_call = response['message']['tool_calls'][0]
    function_name = tool_call['function']['name']
    arguments = tool_call['function']['arguments']
    
    print(f'🤖 Calling function: {function_name} with {arguments}')
    
    # Execute function
    result = get_stock_price(**arguments)
    
    print(f'📊 Stock data retrieved: {result}')
    
    # Send result back to model for natural response
    final_response = ollama.chat(
        model='llama3.1',
        messages=[
            {'role': 'user', 'content': user_query},
            response['message'],
            {'role': 'tool', 'content': json.dumps(result)}
        ],
        tools=tools
    )
    
    print(f'\n💬 AI Response: {final_response["message"]["content"]}')
else:
    print(response['message']['content'])
```

### Example Output:

**🤖 Calling function:** get_stock_price with {'ticker': 'TSLA'}

**📊 Stock data retrieved:** {'ticker': 'TSLA', 'company_name': 'Tesla, Inc.', 'price': 242.84, 'change': 5.67, 'change_percent': 2.39, 'volume': 89234561, 'market_cap': 771840000000, 'day_high': 245.32, 'day_low': 238.91, 'timestamp': '2025-10-12 14:23:45'}

**💬 AI Response:** "Tesla (TSLA) is currently trading at $242.84, up $5.67 (2.39%) from the previous close. The stock has been trading between $238.91 and $245.32 today, with a strong trading volume of 89.2 million shares. Tesla's market cap stands at approximately $771.84 billion."

### 🔑 Key Points:

- Uses **yfinance** library - no API key required!
- LLM automatically detects when to call the stock price function
- Real-time data fetched directly from Yahoo Finance
- Includes comprehensive data: price, volume, market cap, day high/low
- Result formatted naturally by the LLM for user-friendly response
- Can be extended with multiple tools (news, analysis, portfolio tracking)

---

## 🎯 Key Takeaways

- Tool calls bridge the gap between LLM intelligence and real-world actions
- They enable accurate, real-time information instead of hallucinations
- The LLM decides when to use tools based on context and user intent
- Local models like Ollama support tool calling for privacy-focused applications
- Proper tool definitions are crucial for the LLM to understand and use them correctly

### Next Steps

Experiment with different tools, combine multiple functions, and build intelligent agents that can perform complex tasks autonomously. The possibilities are endless! 🚀

---

**Ready to transform your AI applications?**

🤖 💪 🚀