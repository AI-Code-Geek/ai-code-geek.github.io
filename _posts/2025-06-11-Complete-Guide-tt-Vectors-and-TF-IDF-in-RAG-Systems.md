---
layout: post
title: "🚀 Complete Guide to Vectors and TF-IDF in RAG Systems"
date: 2025-06-29 11:00:00 +0000
categories: [LLM, Gen AI]
tags: [RAG,Ollama, LLM, AI Models,]
author_profile: true
author: "nagul_meera"
reading_time: 5
excerpt: "In previous blogs, we learned about RAG (Retrieval-Augmented Generation) and discovered that there are two core concepts as part of preparing a knowledge base as a vector store: **embeddings** and **vectors**."
---
### 📚 Introduction

![RAG2](/docs/assets/images/2025/june/rag2/1.png)

In previous blogs, we learned about RAG (Retrieval-Augmented Generation) and discovered that there are two core concepts as part of preparing a knowledge base as a vector store: **embeddings** and **vectors**.

There are many AI embedding models which we can use to generate embeddings and vectors. Before exploring those, we will try to understand how we can create vectors from a knowledge base such as text or content.

I am going to use Python to explain the concept of vectors using the **Term Frequency-Inverse Document Frequency (TF-IDF)** Python library.

[**Mastering RAG: Empowering AI Models with Our Custom Data**][rag-blog]

[rag-blog]: https://aicodegeek.com/2025/06/29/RAG-Empowering-AI-Models-with-Our-Custom-Data
### 🔍 Understanding TF-IDF

**Term Frequency-Inverse Document Frequency** is a statistical measurement used in natural language processing to evaluate the importance of a word relative to a collection of documents.

#### 📖 Basic Concepts

Assume we have a large amount of content such as a file or webpage - we can refer to this whole content as a **mono document**.

Now we will process this large content into an array of small paragraphs called a **collection of documents (Corpus)**.

Next, we will take one word and try to find how many times the word appears in a single document - this is called **Term Frequency (TF)**.

#### 📊 Term Frequency (TF)

```
TF(t,d) = Number of times term t appeared in the document / Total number of terms in the document
```

When you look at this formula, it's representing data for one document (one paragraph). It may not give you any further details on how many times the terms appeared in the collection of documents (Corpus) - the global approach. Sometimes helping verbs and conjunctions are repeated in the document several times, but those words do not have any specific meaning.

#### 🎯 Inverse Document Frequency (IDF)

To address the above limitation, there is another measurement called **Inverse Document Frequency (IDF)**. It finds the uniqueness and rareness of the term in the entire collection of documents (corpus) instead of a single document. If the term appeared in fewer documents, it is more specific and meaningful.

```
IDF(t, D) = log(Total number of documents in the corpus / Number of documents containing the term)
```

#### 🧮 Final TF-IDF Formula

```
TF-IDF(t,d,D) = TF(t,d) × IDF(t,D)
```

### 💻 Calculating TF-IDF: Step-by-Step Example

Let's work through a practical example:

**Document Collection:**
```
Document = "Python is a high-level, interpreted programming language known for its simplicity and readability. Java is a widely used, object-oriented programming language and computing platform first released in 1995. Java and Python are both popular, high-level programming languages, but they have different strengths and weaknesses."
```

**Split into individual documents:**
- **Document 1:** "Python is a high-level, interpreted programming language known for its simplicity and readability"
- **Document 2:** "Java is a widely used, object-oriented programming language and computing platform first released in 1995"
- **Document 3:** "Java and Python are both popular, high-level programming languages, but they have different strengths and weaknesses"

#### 📈 TF Value Calculation for "Python"

##### Document 1
- **Content:** "Python is a high-level, interpreted programming language known for its simplicity and readability"
- **Terms:** ["Python", "is", "a", "high-level,", "interpreted", "programming", "language", "known", "for", "its", "simplicity", "and", "readability"]
- **Total number of terms:** 13
- **Number of times 'Python' appears:** 1
- **TF(Python) = 1/13 = 0.077 (7.69%)**

##### Document 2
- **Content:** "Java is a widely used, object-oriented programming language and computing platform first released in 1995"
- **Term frequency count:** 0 (does not appear)
- **Total words in document:** 15
- **TF(Python) = 0/15 = 0 (0%)**

##### Document 3
- **Content:** "Java and Python are both popular, high-level programming languages, but they have different strengths and weaknesses"
- **Term frequency count:** 1 (appears once)
- **Total words in document:** 16
- **TF(Python) = 1/16 = 0.0625 (6.25%)**

#### 🔢 IDF Value Calculation for "Python"

```
IDF(t,D) = log(Total number of documents in the corpus / Number of documents containing the term)

Total number of documents in the corpus = 3
Number of documents containing the term "Python" = 2

IDF(Python) = log(3/2) = log(1.5) = 0.405
```

#### 🎯 Final TF-IDF Calculation

Using the formula: **TF-IDF(t,d,D) = TF(t,d) × IDF(t,D)**

Given: **IDF(Python) = 0.405465**

| Document | TF Value | IDF Value | TF-IDF Value |
|----------|----------|-----------|--------------|
| Document 1 | 0.076923 (1/13) | 0.405465 | **0.031190** |
| Document 2 | 0.000000 (0/15) | 0.405465 | **0.000000** |
| Document 3 | 0.062500 (1/16) | 0.405465 | **0.025342** |

#### 📊 Analysis

1. **Document 1** has the highest TF-IDF value (0.031190) because "Python" appears once in a shorter document (13 words), giving it higher term frequency.

2. **Document 2** has a TF-IDF value of 0.000000 because "Python" doesn't appear in this document at all.

3. **Document 3** has a moderate TF-IDF value (0.025342) because "Python" appears once but in a longer document (16 words), resulting in lower term frequency.

The TF-IDF values help identify which documents are most relevant to the term "Python" - Document 1 being the most relevant, followed by Document 3, while Document 2 is not relevant at all for this term.

### 🐍 Python Implementation for TF-IDF

Here's a complete Python implementation of the TF-IDF calculator:
### 📁 Source Code Repository

🔗 **[GitHub Repository - TF-IDF Implementation for RAG Systems](https://github.com/AI-Code-Geek/vectors-tf-idf-rag-examples)**
```python
import math
from collections import Counter

class TFIDFCalculator:
    def __init__(self, documents):
        """
        Initialize the TF-IDF calculator with a list of documents
        
        Args:
            documents (list): List of document strings
        """
        self.documents = documents
        self.num_documents = len(documents)
        self.processed_docs = [doc.lower().split() for doc in documents]
    
    def calculate_tf(self, term, document_words):
        """
        Calculate Term Frequency (TF) for a term in a document
        TF(t,d) = Number of times term appears in document / Total number of terms in document
        
        Args:
            term (str): The term to calculate TF for
            document_words (list): List of words in the document
        
        Returns:
            float: TF value
        """
        term_count = document_words.count(term.lower())
        total_words = len(document_words)
        return term_count / total_words if total_words > 0 else 0
    
    def calculate_idf(self, term):
        """
        Calculate Inverse Document Frequency (IDF) for a term across all documents
        IDF(t,D) = log(Total number of documents / Number of documents containing the term)
        
        Args:
            term (str): The term to calculate IDF for
        
        Returns:
            float: IDF value
        """
        documents_containing_term = sum(1 for doc_words in self.processed_docs 
                                      if term.lower() in doc_words)
        if documents_containing_term == 0:
            return 0
        return math.log(self.num_documents / documents_containing_term)
    
    def calculate_tfidf(self, term, document_index):
        """
        Calculate TF-IDF for a term in a specific document
        TF-IDF(t,d,D) = TF(t,d) * IDF(t,D)
        
        Args:
            term (str): The term to calculate TF-IDF for
            document_index (int): Index of the document
        
        Returns:
            float: TF-IDF value
        """
        if document_index >= self.num_documents:
            raise IndexError("Document index out of range")
        
        tf = self.calculate_tf(term, self.processed_docs[document_index])
        idf = self.calculate_idf(term)
        return tf * idf
    
    def analyze_term(self, term):
        """
        Analyze a term across all documents and return comprehensive results
        
        Args:
            term (str): The term to analyze
        
        Returns:
            dict: Dictionary containing analysis results
        """
        results = {
            'term': term,
            'idf': self.calculate_idf(term),
            'documents': []
        }
        
        for i, (doc, doc_words) in enumerate(zip(self.documents, self.processed_docs)):
            tf = self.calculate_tf(term, doc_words)
            tfidf = self.calculate_tfidf(term, i)
            
            doc_result = {
                'index': i + 1,
                'content': doc,
                'word_count': len(doc_words),
                'term_frequency': doc_words.count(term.lower()),
                'tf': tf,
                'tfidf': tfidf
            }
            results['documents'].append(doc_result)
        
        return results
    
    def print_analysis(self, term):
        """
        Print detailed analysis of a term across all documents
        
        Args:
            term (str): The term to analyze
        """
        results = self.analyze_term(term)
        
        print(f"=== TF-IDF Analysis for '{term}' ===\n")
        print(f"IDF({term}) = {results['idf']:.6f}\n")
        
        for doc_data in results['documents']:
            print(f"Document {doc_data['index']}:")
            print(f"  Content: \"{doc_data['content']}\"")
            print(f"  Total words: {doc_data['word_count']}")
            print(f"  Term '{term}' appears: {doc_data['term_frequency']} times")
            print(f"  TF({term}) = {doc_data['term_frequency']}/{doc_data['word_count']} = {doc_data['tf']:.6f}")
            print(f"  TF-IDF({term}) = {doc_data['tf']:.6f} × {results['idf']:.6f} = {doc_data['tfidf']:.6f}")
            print()
        
        # Summary
        print("Summary of TF-IDF values:")
        for doc_data in results['documents']:
            print(f"Document {doc_data['index']}: {doc_data['tfidf']:.6f}")

def main():
    # Define the documents
    documents = [
        "Python is a high-level, interpreted programming language known for its simplicity and readability",
        "Java is a widely used, object-oriented programming language and computing platform first released in 1995",
        "Java and Python are both popular, high-level programming languages, but they have different strengths and weaknesses."
    ]
    
    # Create TF-IDF calculator
    calculator = TFIDFCalculator(documents)
    
    # Analyze the term "Python"
    calculator.print_analysis("Python")
    
    print("\n" + "="*60 + "\n")
    
    # You can also analyze other terms
    calculator.print_analysis("Java")
    
    print("\n" + "="*60 + "\n")
    
    # Example of getting raw results for further processing
    python_results = calculator.analyze_term("Python")
    print("Raw results for 'Python':")
    for doc in python_results['documents']:
        print(f"Doc {doc['index']}: TF-IDF = {doc['tfidf']:.6f}")

if __name__ == "__main__":
    main()
```

#### 📤 Sample Output

The program will output the same results we calculated manually:
- **Document 1:** TF-IDF = 0.031190
- **Document 2:** TF-IDF = 0.000000  
- **Document 3:** TF-IDF = 0.025342

### 🔧 Using TfidfVectorizer to Generate Vectors

**TfidfVectorizer** is a powerful class from scikit-learn that converts a collection of text documents into TF-IDF feature vectors. It's essentially a professional, optimized implementation of the TF-IDF algorithm we've been working with manually.

```python
import math
import numpy as np
from collections import Counter, defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
import matplotlib.pyplot as plt

class TextToVectorConverter:
    def __init__(self, documents):
        """
        Initialize the converter with documents
        
        Args:
            documents (list): List of document strings
        """
        self.documents = documents
        self.processed_docs = [doc.lower().split() for doc in documents]
        self.vocabulary = self._build_vocabulary()
        self.vocab_size = len(self.vocabulary)
    
    def _build_vocabulary(self):
        """Build vocabulary from all documents"""
        all_words = set()
        for doc_words in self.processed_docs:
            all_words.update(doc_words)
        return sorted(list(all_words))
    
    def create_tfidf_vectors_manual(self):
        """
        Create TF-IDF vectors manually using our own implementation
        
        Returns:
            numpy.ndarray: TF-IDF matrix where each row is a document vector
        """
        vectors = []
        
        # Calculate IDF for each term in vocabulary
        idf_values = {}
        for term in self.vocabulary:
            docs_containing_term = sum(1 for doc_words in self.processed_docs 
                                     if term in doc_words)
            if docs_containing_term > 0:
                idf_values[term] = math.log(len(self.documents) / docs_containing_term)
            else:
                idf_values[term] = 0
        
        # Create vector for each document
        for doc_words in self.processed_docs:
            vector = []
            total_words = len(doc_words)
            
            for term in self.vocabulary:
                # Calculate TF
                term_count = doc_words.count(term)
                tf = term_count / total_words if total_words > 0 else 0
                
                # Calculate TF-IDF
                tfidf = tf * idf_values[term]
                vector.append(tfidf)
            
            vectors.append(vector)
        
        return np.array(vectors)
    
    def create_tfidf_vectors_sklearn(self):
        """
        Create TF-IDF vectors using scikit-learn
        
        Returns:
            tuple: (TF-IDF matrix, feature names)
        """
        vectorizer = TfidfVectorizer(lowercase=True, token_pattern=r'\b\w+\b')
        tfidf_matrix = vectorizer.fit_transform(self.documents)
        feature_names = vectorizer.get_feature_names_out()
        
        return tfidf_matrix.toarray(), feature_names
    
    def create_binary_vectors(self):
        """
        Create binary vectors (1 if term exists, 0 if not)
        
        Returns:
            numpy.ndarray: Binary matrix
        """
        vectors = []
        for doc_words in self.processed_docs:
            vector = []
            for term in self.vocabulary:
                vector.append(1 if term in doc_words else 0)
            vectors.append(vector)
        
        return np.array(vectors)
    
    def create_count_vectors(self):
        """
        Create count vectors (frequency of each term)
        
        Returns:
            numpy.ndarray: Count matrix
        """
        vectors = []
        for doc_words in self.processed_docs:
            vector = []
            for term in self.vocabulary:
                vector.append(doc_words.count(term))
            vectors.append(vector)
        
        return np.array(vectors)
    
    def calculate_cosine_similarity(self, vector1, vector2):
        """
        Calculate cosine similarity between two vectors
        
        Args:
            vector1, vector2: numpy arrays
        
        Returns:
            float: Cosine similarity score
        """
        dot_product = np.dot(vector1, vector2)
        norm1 = np.linalg.norm(vector1)
        norm2 = np.linalg.norm(vector2)
        
        if norm1 == 0 or norm2 == 0:
            return 0
        
        return dot_product / (norm1 * norm2)
    
    def print_vectors(self, vectors, vector_type="TF-IDF", top_n=10):
        """
        Print vectors in a readable format
        
        Args:
            vectors: numpy array of vectors
            vector_type: string describing the vector type
            top_n: number of top features to show
        """
        print(f"=== {vector_type} Vectors ===\n")
        
        for i, vector in enumerate(vectors):
            print(f"Document {i+1}: {self.documents[i][:50]}...")
            print(f"Vector shape: {vector.shape}")
            
            # Show top N non-zero features
            non_zero_indices = np.nonzero(vector)[0]
            if len(non_zero_indices) > 0:
                # Get top N values
                top_indices = np.argsort(vector)[-top_n:][::-1]
                top_indices = [idx for idx in top_indices if vector[idx] > 0]
                
                print("Top features:")
                for idx in top_indices:
                    if idx < len(self.vocabulary):
                        print(f"  {self.vocabulary[idx]}: {vector[idx]:.6f}")
            else:
                print("  All zeros")
            print()
    
    def analyze_document_similarity(self, vectors):
        """
        Analyze similarity between documents using cosine similarity
        
        Args:
            vectors: numpy array of document vectors
        """
        print("=== Document Similarity Analysis ===\n")
        
        n_docs = len(vectors)
        for i in range(n_docs):
            for j in range(i+1, n_docs):
                similarity = self.calculate_cosine_similarity(vectors[i], vectors[j])
                print(f"Document {i+1} vs Document {j+1}: {similarity:.4f}")
        print()

def create_simple_word_embeddings(documents, embedding_dim=5):
    """
    Create simple word embeddings using random initialization
    (In practice, you'd use pre-trained embeddings like Word2Vec, GloVe, etc.)
    
    Args:
        documents: list of document strings
        embedding_dim: dimension of embedding vectors
    
    Returns:
        dict: word to vector mapping
    """
    # Build vocabulary
    all_words = set()
    for doc in documents:
        all_words.update(doc.lower().split())
    
    # Create random embeddings (normally you'd use pre-trained)
    np.random.seed(42)  # For reproducibility
    embeddings = {}
    for word in all_words:
        embeddings[word] = np.random.randn(embedding_dim)
    
    return embeddings

def document_to_embedding_vector(document, word_embeddings):
    """
    Convert document to vector by averaging word embeddings
    
    Args:
        document: string document
        word_embeddings: dict of word to vector mappings
    
    Returns:
        numpy.ndarray: document embedding vector
    """
    words = document.lower().split()
    valid_embeddings = [word_embeddings[word] for word in words if word in word_embeddings]
    
    if valid_embeddings:
        return np.mean(valid_embeddings, axis=0)
    else:
        return np.zeros(len(next(iter(word_embeddings.values()))))

def main():
    # Define documents
    documents = [
        "Python is a high-level, interpreted programming language known for its simplicity and readability",
        "Java is a widely used, object-oriented programming language and computing platform first released in 1995",
        "Java and Python are both popular, high-level programming languages, but they have different strengths and weaknesses."
    ]
    
    # Initialize converter
    converter = TextToVectorConverter(documents)
    
    print("Vocabulary:", converter.vocabulary[:15], "...")  # Show first 15 words
    print(f"Vocabulary size: {converter.vocab_size}\n")
    
    # 1. Manual TF-IDF Vectors
    print("1. Creating TF-IDF vectors (manual implementation)")
    tfidf_vectors_manual = converter.create_tfidf_vectors_manual()
    converter.print_vectors(tfidf_vectors_manual, "Manual TF-IDF", top_n=5)
    
    # 2. Scikit-learn TF-IDF Vectors
    print("2. Creating TF-IDF vectors (scikit-learn)")
    tfidf_vectors_sklearn, feature_names = converter.create_tfidf_vectors_sklearn()
    print(f"Sklearn TF-IDF shape: {tfidf_vectors_sklearn.shape}")
    print(f"Sample features: {feature_names[:10]}")
    print()
    
    # 3. Binary Vectors
    print("3. Creating Binary vectors")
    binary_vectors = converter.create_binary_vectors()
    converter.print_vectors(binary_vectors, "Binary", top_n=8)
    
    # 4. Count Vectors
    print("4. Creating Count vectors")
    count_vectors = converter.create_count_vectors()
    converter.print_vectors(count_vectors, "Count", top_n=5)
    
    # 5. Document Similarity Analysis
    converter.analyze_document_similarity(tfidf_vectors_manual)
    
    # 6. Simple Word Embeddings Example
    print("5. Word Embeddings Example")
    word_embeddings = create_simple_word_embeddings(documents, embedding_dim=5)
    
    print("Sample word embeddings:")
    for word in ["python", "java", "programming"]:
        if word in word_embeddings:
            print(f"{word}: {word_embeddings[word]}")
    print()
    
    # Convert documents to embedding vectors
    embedding_vectors = []
    for doc in documents:
        doc_vector = document_to_embedding_vector(doc, word_embeddings)
        embedding_vectors.append(doc_vector)
    
    embedding_vectors = np.array(embedding_vectors)
    print("Document embedding vectors shape:", embedding_vectors.shape)
    
    # Analyze similarity using embeddings
    print("\n=== Embedding-based Document Similarity ===")
    converter.analyze_document_similarity(embedding_vectors)

if __name__ == "__main__":
    main()
```

### 📊 Expected Output

The implementation will produce output similar to:

```
Document 1 TF-IDF Vector: [0.031190, 0.000000, 0.025342, ...]
Document Similarity: Doc 1 vs Doc 3: 0.7245
```

### 🎯 Key Takeaways

1. **TF-IDF** is a fundamental technique for converting text into numerical vectors
2. **Term Frequency** measures how often a word appears in a document
3. **Inverse Document Frequency** measures how unique a word is across all documents
4. **Vector representation** enables mathematical operations on text data
5. **Cosine similarity** helps measure document similarity
6. **Scikit-learn's TfidfVectorizer** provides a production-ready implementation

This foundation is crucial for understanding more advanced embedding techniques used in modern RAG systems!