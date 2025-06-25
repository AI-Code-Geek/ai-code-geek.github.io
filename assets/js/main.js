// Modern Blog Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize color scheme
    initializeColorScheme();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize search if available
    initializeSearch();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    applyTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme-mode') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    body.setAttribute('data-theme-mode', theme);
    
    if (theme === 'light') {
        body.style.filter = 'invert(1) hue-rotate(180deg)';
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        body.style.filter = '';
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

// Color Scheme Management
function initializeColorScheme() {
    const savedScheme = localStorage.getItem('colorScheme') || 'orange';
    const body = document.body;
    
    body.setAttribute('data-theme', savedScheme);
    updateActiveColorOption(savedScheme);
}

function setColorScheme(scheme) {
    const body = document.body;
    body.setAttribute('data-theme', scheme);
    
    updateActiveColorOption(scheme);
    localStorage.setItem('colorScheme', scheme);
}

function updateActiveColorOption(scheme) {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach((option, index) => {
        option.classList.remove('active');
        const schemes = ['purple', 'cyan', 'orange', 'green'];
        if (schemes[index] === scheme) {
            option.classList.add('active');
        }
    });
}

// Animation Management
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe post cards and widgets
    document.querySelectorAll('.post-card, .widget').forEach(element => {
        observer.observe(element);
    });
    
    // Add stagger animation to post cards
    document.querySelectorAll('.post-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput) return;
    
    let searchData = [];
    
    // Load search data
    fetch('/search.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
        })
        .catch(error => {
            console.log('Search data not available');
        });
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            hideSearchResults();
            return;
        }
        
        const results = searchData.filter(post => 
            post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        ).slice(0, 5);
        
        displaySearchResults(results);
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSearchResults();
        }
    });
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(post => `
            <a href="${post.url}" class="search-result-item">
                <h4>${post.title}</h4>
                <p>${post.excerpt}</p>
                <div class="search-result-meta">
                    <span>${post.date}</span>
                    ${post.category ? `<span class="category">${post.category}</span>` : ''}
                </div>
            </a>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function hideSearchResults() {
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Reading Progress Bar
function initializeReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const article = document.querySelector('.post-content');
        if (!article) return;
        
        const rect = article.getBoundingClientRect();
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const articleTop = article.offsetTop;
        
        const progress = Math.max(0, Math.min(100, 
            ((scrolled - articleTop + windowHeight) / articleHeight) * 100
        ));
        
        progressBar.style.width = `${progress}%`;
    });
}

// Copy Code Blocks
function initializeCodeCopy() {
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code');
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
        
        const pre = block.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

// Table of Contents
function generateTableOfContents() {
    const toc = document.querySelector('.table-of-contents');
    const content = document.querySelector('.post-body');
    
    if (!toc || !content) return;
    
    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) {
        toc.style.display = 'none';
        return;
    }
    
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const listItem = document.createElement('li');
        listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.className = 'toc-link';
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    toc.appendChild(tocList);
    
    // Highlight current section
    initializeTocHighlighting(headings);
}

function initializeTocHighlighting(headings) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                document.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (tocLink) {
                    tocLink.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-20% 0px -80% 0px' });
    
    headings.forEach(heading => {
        observer.observe(heading);
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.display = 'none';
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeReadingProgress();
    initializeCodeCopy();
    generateTableOfContents();
    initializeBackToTop();
});

// Color scheme event listeners
window.setColorScheme = setColorScheme;
window.toggleTheme = toggleTheme;

// Lazy loading images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);