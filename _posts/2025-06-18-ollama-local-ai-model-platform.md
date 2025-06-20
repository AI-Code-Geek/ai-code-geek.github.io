---
layout: post
title: "🦙 Ollama: Local AI Model Platform"
date: 2025-06-18 10:00:00 +0000
categories: [LLM, Gen AI]
tags: [Ollama, LLM, AI Models]
author: "nagul_meera"
author_profile: true
reading_time: 4
excerpt: "Ollama is an application platform that allows you to run AI models locally on your machine. This provides a convenient way for AI developers and enthusiasts to start exploring and building LLM applications without relying on external services."
---
### Key Benefits

- **Local Execution**: Run AI models completely on your local machine
- **Cost-Effective**: No subscription fees or API usage costs
- **Independence**: No internet dependency once models are downloaded
- **Developer-Friendly**: Perfect for development and experimentation

### Why Choose Ollama?

Many AI models available online are paid enterprise solutions hosted on external platforms. As developers, using these typically requires:
- Consuming paid APIs
- Taking expensive subscriptions
- Dealing with usage restrictions

While free models exist, they often come with API access limitations. Ollama provides a completely independent platform that you can install locally and run models entirely on your machine.

## Getting Started

### Prerequisites
- Windows OS
- Sufficient disk space for AI models
- Adequate RAM (8GB+ recommended)

## Installation Steps

### Step 1: Download Ollama
Download the Windows version from the official source:
```
https://ollama.com/download/OllamaSetup.exe
```

### Step 2: List Available Models
After installation, check what models you have using powershell/command prompt:
```bash
ollama list
```

### Step 3: Download a Model
Pull your desired model (e.g., Llama 3.2):
```bash
ollama pull llama3.2
```

### Step 4: Run and Interact with Models
Open Windows PowerShell and run:
```bash
ollama run <model>
```

**Example:**
```bash
ollama run llama3.2
```

This starts an interactive session where you can chat with the model directly in the command line.

### Step 5: Start Ollama Server
To run Ollama as a background service:
```bash
ollama serve
```

> **Note:** Use `ollama serve` when you want to start Ollama without running the desktop application.

## REST API Usage

Ollama provides a REST API for programmatic access to models.

### Generate a Response
```bash
curl --location 'http://localhost:11434/api/generate' \
--header 'Content-Type: application/json' \
--data '{
    "model": "llama3.2",
    "prompt": "What is AI Model?"
}'
```

### Chat with a Model
```bash
curl --location 'http://localhost:11434/api/chat' \
--header 'Content-Type: application/json' \
--data '{
    "model": "llama3.2",
    "messages": [
        {
            "role": "user",
            "content": "What is AI Model?"
        }
    ]
}'
```

## Model Management

### Stop a Running Model
```bash
ollama stop llama3.2
```

### Available Models
Browse the complete model library at:
```
https://github.com/ollama/ollama?tab=readme-ov-file#model-library
```

## Resources

- **GitHub Repository**: [https://github.com/ollama/ollama](https://github.com/ollama/ollama)
- **Model Library**: [Available Models](https://github.com/ollama/ollama?tab=readme-ov-file#model-library)

## Next Steps

1. Install Ollama using the steps above
2. Choose and download models based on your requirements
3. Start experimenting with local AI development
4. Explore the REST API for integration into your applications

---
## CLI Chat Interaction

![1.png](/docs/assets/images/2025/june/ollama_local_ai_model_platform/1.png)

## API Access from postman

![2.png](/docs/assets/images/2025/june/ollama_local_ai_model_platform/2.png)

*Happy coding with local AI models!*