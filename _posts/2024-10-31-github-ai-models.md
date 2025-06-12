---
layout: splash
title: "GitHub AI Models usage in Java"
author: nagul_meera
author_profile: true
---

# GitHub AI Models

### Example of GitHub AI Models Usage
#### Model : gpt-4o-mini

#### java
```java
package com.ai.java.geek.github.models;

import com.azure.ai.inference.ChatCompletionsClient;
import com.azure.ai.inference.ChatCompletionsClientBuilder;
import com.azure.ai.inference.models.ChatCompletions;
import com.azure.ai.inference.models.ChatCompletionsOptions;
import com.azure.ai.inference.models.ChatRequestMessage;
import com.azure.ai.inference.models.ChatRequestSystemMessage;
import com.azure.core.credential.AzureKeyCredential;

import java.util.Arrays;
import java.util.List;

public final class GitHubAIModelsExample {
    public static void main(String[] args) {
        // To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings.
        // Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
        String key = "GitHubAccessTokenHere";
        String endpoint = "https://models.inference.ai.azure.com";
        String model = "gpt-4o-mini";

        ChatCompletionsClient client = new ChatCompletionsClientBuilder()
                .credential(new AzureKeyCredential(key))
                .endpoint(endpoint)
                .buildClient();

        List<ChatRequestMessage> chatMessages = Arrays.asList(
                new ChatRequestSystemMessage("What is java?")
        );

        ChatCompletionsOptions chatCompletionsOptions = new ChatCompletionsOptions(chatMessages);
        chatCompletionsOptions.setModel(model);

        ChatCompletions completions = client.complete(chatCompletionsOptions);

        System.out.printf("%s.%n", completions.getChoice().getMessage().getContent());
    }
}
```
#### pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ai.java.geek.github.models</groupId>
    <artifactId>TestGenAIMaven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-ai-inference</artifactId>
            <version>1.0.0-beta.2</version>
        </dependency>
    </dependencies>
</project>
```

{% include author.html %}

<img src="/docs/assets/images/2024-10-31-github-ai-models/1.png" style="display: block; margin: auto;"/>