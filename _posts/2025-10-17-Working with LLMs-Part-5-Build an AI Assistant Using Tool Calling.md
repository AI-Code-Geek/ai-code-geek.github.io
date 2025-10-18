---
layout: post
title: "🤖 Working with LLMs Part 5 - Build an AI Assistant Using Tool Calling 🚀"
date: 2025-10-17 10:00:00 +0000
categories: [LLM, Gen AI, Ollama, Local AI Models]
tags: [LLM, Gen AI, Ollama, Local AI Models]
author_profile: true
author: "nagul_meera"
reading_time: 5
excerpt: "Imagine asking an AI: What's the weather in Tokyo? The AI doesn't actually know the current weather—it needs to call an external function to fetch real-time data. This is where tool calling (also known as function calling) becomes powerful."
---
## 📺 Tutorial Video

- [**🤖 Working with LLMs Part 5: Build an AI Assistant Using Tool Calling 🚀**](https://youtu.be/jCMPxct7ARc){:target="_blank"}
  [![🤖 Working with LLMs Part 5: Build an AI Assistant Using Tool Calling 🚀](/docs/assets/images/2025/oct/llms/5.png)](https://youtu.be/jCMPxct7ARc){:target="_blank"}
---
## 🎯 Introduction to Tool Calling

Imagine asking an AI: *"What's the weather in Tokyo?"* The AI doesn't actually know the current weather—it needs to call an external function to fetch real-time data. This is where **tool calling** (also known as function calling) becomes powerful.

**Tool calling** enables Large Language Models (LLMs) to:
- 🔧 Execute external functions
- 📊 Access real-time data
- 🗄️ Query databases
- 📁 Read files from your system
- 🌐 Make API calls

Instead of just generating text, LLMs can now **take actions** and **retrieve information** dynamically, making them truly useful assistants.

---

## 💡 Use Case: Building an AI Documentation Assistant

### The Problem
You have dozens of markdown documentation files scattered across directories. Finding specific information requires:
- 🔍 Manually searching through files
- 📂 Remembering which file contains what
- ⏰ Wasting time on repetitive lookups

### The Solution
Build an AI assistant that:
- ✅ Understands your questions in natural language
- ✅ Automatically finds and reads relevant documentation
- ✅ Provides accurate answers from your local files
- ✅ Saves time and improves productivity

### Real-World Scenario

**Imagine you're a developer working on a project with extensive documentation:**

📚 **Your Documentation:**
```
docs/
├── installation-guide.md
├── api-reference.md
├── authentication.md
├── deployment-guide.md
├── troubleshooting.md
└── best-practices.md
```

**Traditional Approach (Without AI Assistant):**
1. 😓 Think "Where did I document the authentication process?"
2. 🔍 Open file explorer, browse through files
3. 📖 Open authentication.md, scan through content
4. ⏰ Spend 5-10 minutes finding the specific section
5. 🔄 Repeat for every question

**With AI Documentation Assistant:**
1. 💬 Ask: "How do I authenticate users in the API?"
2. ⚡ AI instantly reads authentication.md
3. 🎯 Gets precise answer in seconds
4. ✅ Continue coding without context switching

### Use Case Benefits

| Without AI Assistant | With AI Assistant |
|---------------------|-------------------|
| 😫 Manual file searching | 🤖 Automatic file detection |
| ⏰ 5-10 minutes per lookup | ⚡ Instant answers |
| 🧠 Need to remember file structure | 💬 Just ask in plain English |
| 📖 Read entire documents | 🎯 Get specific information |
| 🔄 Context switching disrupts flow | 🚀 Stay in your workflow |

### Who Benefits?

- 👨‍💻 **Developers** - Quick access to API docs and guides
- 📝 **Technical Writers** - Verify documentation content
- 🎓 **New Team Members** - Learn codebase faster
- 🔧 **DevOps Engineers** - Find deployment procedures
- 👥 **Support Teams** - Answer customer questions accurately

---

## 🔄 How It Works: The Flow

```
┌─────────────┐
│    User     │ "What's in the API guide?"
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   Streamlit UI      │ Captures user question
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Ollama LLM        │ Analyzes question + available tools
│   + Tool Defs       │ Decides: "I need to read api-guide.md"
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Tool Function     │ Executes: read_file("api-guide.md")
│   (Python)          │ Returns: File content
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Ollama LLM        │ Processes file content
│   (with context)    │ Generates natural answer
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   User Gets Answer  │ "The API guide covers authentication,
└─────────────────────┘  endpoints, and rate limits..."
```

---

## 🛠️ Implementation: Key Components

### 1️⃣ Define Tools (JSON Schema)

First, define what functions your LLM can call:

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Read the complete content of a markdown file",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_name": {
                        "type": "string",
                        "description": "Name of the markdown file (e.g., 'api-guide.md')"
                    }
                },
                "required": ["file_name"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "list_all_files",
            "description": "List all available markdown files",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    }
]
```

**Key Points:**
- 📝 Each tool has a clear `name` and `description`
- 📋 Parameters are defined using JSON Schema
- 🎯 Descriptions help the LLM decide when to use each tool

---

### 2️⃣ Implement Tool Functions

Create the actual Python functions that do the work:

```python
from pathlib import Path

def read_file(file_name: str) -> str:
    """Read and return markdown file content"""
    docs_dir = Path("./docs")
    file_path = docs_dir / file_name
    
    if not file_path.exists():
        return f"❌ File not found: {file_name}"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    return f"📄 Content of {file_name}:\n\n{content}"

def list_all_files() -> str:
    """List all markdown files in directory"""
    docs_dir = Path("./docs")
    md_files = list(docs_dir.glob('**/*.md'))
    
    result = f"📚 Found {len(md_files)} file(s):\n\n"
    for file in md_files:
        result += f"  • {file.name}\n"
    
    return result

# Map function names to implementations
available_functions = {
    'read_file': read_file,
    'list_all_files': list_all_files
}
```

---

### 3️⃣ Call LLM with Tools

Send user message and tool definitions to the LLM:

```python
import ollama

# User asks a question
user_message = "What's in the installation guide?"

# Call LLM with tools available
response = ollama.chat(
    model='llama3.2',
    messages=[{'role': 'user', 'content': user_message}],
    tools=tools
)

print(response['message'])
```

**What happens:**
- 🧠 LLM analyzes the question
- 🎯 Decides it needs to call `read_file("installation.md")`
- 📤 Returns a tool call request

---

### 4️⃣ Execute Tool Calls

When the LLM requests a tool, execute it:

```python
# Check if LLM wants to call a tool
if response['message'].get('tool_calls'):
    # Prepare messages list
    messages = [{'role': 'user', 'content': user_message}]
    messages.append(response['message'])
    
    # Execute each tool call
    for tool in response['message']['tool_calls']:
        function_name = tool['function']['name']
        arguments = tool['function']['arguments']
        
        # Call the actual function
        function_to_call = available_functions[function_name]
        function_result = function_to_call(**arguments)
        
        # Add result to conversation
        messages.append({
            'role': 'tool',
            'content': function_result
        })
    
    # Get final response from LLM with tool results
    final_response = ollama.chat(
        model='llama3.2',
        messages=messages
    )
    
    print(final_response['message']['content'])
```

---

### 5️⃣ Build the UI with Streamlit

Create an interactive chat interface:

```python
import streamlit as st

st.title("💬 Documentation Assistant")

# Chat input
if prompt := st.chat_input("Ask about your documentation..."):
    # Add user message
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    # Get response with tool calling logic
    response = get_llm_response(prompt)
    
    # Display response
    st.session_state.messages.append({"role": "assistant", "content": response})
```

---

## 🎨 Real-World Example

**User Input:**
```
"How do I authenticate with the API?"
```

**Behind the Scenes:**

1. **LLM Decision:**
   ```json
   {
     "tool_call": "read_file",
     "arguments": {"file_name": "api-guide.md"}
   }
   ```

2. **Tool Execution:**
   ```python
   # Reads api-guide.md from disk
   content = """
   # API Authentication
   
   Use Bearer token authentication:
   
   Headers:
     Authorization: Bearer YOUR_API_KEY
   """
   ```

3. **LLM Response:**
   ```
   To authenticate with the API, you need to use Bearer token 
   authentication. Include your API key in the Authorization 
   header as follows:
   
   Authorization: Bearer YOUR_API_KEY
   
   This is documented in the API guide's authentication section.
   ```

---

## ✨ Key Benefits

| Feature | Benefit |
|---------|---------|
| 🎯 **Natural Language** | Ask questions in plain English |
| 🚀 **Automated Search** | No manual file hunting |
| 📚 **Context-Aware** | Understands entire documentation |
| 🔄 **Real-Time** | Always reads latest file content |
| 🎨 **User-Friendly** | Chat interface anyone can use |

---

## 🚦 When to Use Tool Calling

✅ **Good Use Cases:**
- 📁 Reading files/documents
- 🌐 Fetching real-time data (weather, stocks, news)
- 🗄️ Querying databases
- 📊 Running calculations
- 🔍 Searching external APIs

❌ **Not Needed For:**
- 💭 General knowledge questions
- 🤔 Creative writing
- 📖 Explaining concepts
- 💡 Brainstorming ideas

---

## 🎯 Quick Start Guide

```bash
# 1. Install dependencies
pip install streamlit ollama

# 2. Pull an Ollama model
ollama pull llama3.2

# 3. Create your tool definitions and functions

# 4. Run your app
streamlit run app.py
```

---

## 🔑 Key Takeaways

1. **Tool calling bridges the gap** between LLM intelligence and real-world data
2. **Define clear tool schemas** so the LLM knows when and how to use them
3. **Implement reliable functions** that return structured, useful data
4. **Combine multiple tools** to create powerful AI assistants
5. **The LLM decides** which tools to use based on user questions

---

## 🚀 What's Next?

Now that you understand tool calling, you can:
- 🌐 Add API integrations (weather, news, databases)
- 📊 Create data analysis assistants
- 🤖 Build autonomous agents
- 🔗 Chain multiple tool calls together
- 📈 Scale to production applications

**Tool calling transforms LLMs from text generators into intelligent agents that can take action!**

---

## 📚 Resources
- [GitHub Repository - AI Documentation Assistant](https://github.com/AI-Code-Geek/llms-tool-calling-ai-assistant)
- [Ollama Documentation](https://ollama.ai/docs)
- [Anthropic Tool Use Guide](https://docs.anthropic.com/claude/docs/tool-use)
- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [Streamlit Documentation](https://docs.streamlit.io)

---

*Ready to build your own AI assistant? Start with a simple use case and expand from there. The possibilities are endless! 🚀*