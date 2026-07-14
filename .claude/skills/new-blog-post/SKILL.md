---
name: new-blog-post
description: Turn a raw article (a .md draft plus a folder of screenshots) into a published-ready Jekyll post for the aicodegeek.com GitHub Pages site — correct front matter, image placement, house writing style, and a local preview. Use whenever the user points at a raw article/draft/images folder and asks to "create a post", "add this article", "publish this", or to preview/serve the blog locally.
---

# New Blog Post (aicodegeek.com)

Converts a raw draft into a post that matches this site's existing conventions. The user supplies a folder containing a `.md` draft and image files; you produce `_posts/<date>-<slug>.md` plus images under `docs/assets/images/`.

## Workflow

### 1. Read the inputs

- List the source folder. Read the `.md` draft in full.
- Look at the image filenames. Raw drafts often reference image names that **do not exist** (the author renamed or re-took the screenshots). Never trust the draft's image paths — map the actual files to the sections they belong to, and if a file's purpose is ambiguous, open it with Read (it renders visually) or ask the user.
- Ignore non-article files in the folder (JSON dumps, exports, etc.) unless the draft references them.

### 2. Match the house style

Read the two most recent files in `_posts/` before writing. They are the style reference — follow them over anything remembered. The established pattern:

- **Front matter** (all fields, in this order):
  ```yaml
  ---
  layout: post
  title: "🤖 Emoji-Prefixed Title — Subtitle"
  date: YYYY-MM-DD 10:00:00 +0000
  categories: [Agentic AI, Claude, Claude Code, AI Agents, LLM, Gen AI]
  tags: [Agentic AI, Claude, Claude Code, ...]
  author_profile: true
  author: "nagul_meera"
  reading_time: 8
  excerpt: "One or two sentences, **bold** allowed. Shown on the index page."
  ---
  ```
  `author: "nagul_meera"` is the only author defined in `_data/authors.yml` — always use it unless told otherwise.
- **A small stat table right under the front matter** (3 rows, `| Label | Value |` with bold values) — a quick-facts hook before the body starts.
- **A numbered Table of Contents** with anchor links, then `## 1. Section`, `## 2. Section` … so the anchors resolve. Anchors are kramdown-generated: lowercase, spaces → hyphens, punctuation dropped (`## 2. The First Real Hurdle: Token Limits` → `#2-the-first-real-hurdle-token-limits`).
- `---` horizontal rules between top-level sections.
- Emoji-prefixed `###` sub-headings (`### 📡 1. Market Data Server`).
- `> 💡 **Callout:**` blockquotes for asides and key takeaways.
- Bullet lists with a bold lead-in term, and tables for anything enumerable.
- An italic closing note, plus a `⚠️` disclaimer if the topic warrants one (finance, security, health).

### 3. Place the images

- Destination: `docs/assets/images/<year>/<3-letter-lowercase-month>/<topic-slug>/` — e.g. `docs/assets/images/2026/jul/tradeaiq/`.
- Copy the files in; keep their original names.
- Reference them from the post with a **site-absolute path including the `/docs` prefix** — this is the site's convention and it is easy to get wrong:
  ```markdown
  ![Alt text](/docs/assets/images/2026/jul/tradeaiq/dashboard.png)

  *An italic caption directly under the image explaining what the reader is looking at.*
  ```
- Every image gets a caption. Delete any copied image the final post does not use.
- For a linked thumbnail (e.g. a YouTube card): `[![Alt](/docs/assets/images/...)](https://youtu.be/ID){:target="_blank"}`.
- External links open in a new tab: `[Text](https://example.com){:target="_blank"}`.

### 4. Name the file

`_posts/YYYY-MM-DD-Title-Words-Separated-By-Dashes.md`. Use the date the user is publishing (today unless they say otherwise) — it drives the permalink `/:year/:month/:day/:title/`.

### 5. Preview locally

Only when the user asks to see it (or after a large post, offer):

```bash
bundle exec jekyll serve
```

Then browse to <http://localhost:4000>. Run it with `run_in_background: true` so it doesn't block. If gems are missing, `bundle install` first (one-time: `gem install jekyll bundler`).

## Rules

- **Preserve the author's voice.** This is a personal blog — the drafts are first-person stories. Restructure, add headings, tables, emoji, and TOC; do not rewrite the prose into corporate copy or invent claims/numbers that aren't in the draft.
- Fix the draft's broken image references rather than copying them through.
- Don't commit or push unless the user asks.