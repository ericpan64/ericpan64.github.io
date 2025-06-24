<script lang="ts">
  import { marked } from 'marked';
  import { collectHeadings, headingToId, type Heading } from '$lib/utils/markdown';
  
  // Props
  let { path = '', enableAnchors = false, enableEmotes = false, showToc = false } = $props();
  
  // State
  let content = $state('');
  let loading = $state(true);
  let error = $state<string | null>(null);
  
  // Derived state
  let headings = $derived(showToc ? collectHeadings(content) : []);
  
  // Configure marked renderer
  const createRenderer = () => {
    const renderer = new marked.Renderer();
    
    // Custom heading renderer for anchor links
    if (enableAnchors) {
      renderer.heading = (e) => {
        const id = headingToId(e.text);
        return `<h${e.depth} id="${id}">${e.text}</h${e.depth}>`;
      };
    }
    
    // Custom link renderer
    renderer.link = (e) => {
      let actualHref = e.href;
      let emoteClass = '';
      
      // Check for Pikachu emote syntax if enabled: [text](url|{emote-name})
      if (enableEmotes) {
        const parts = e.href.split('|{');
        if (parts.length === 2) {
          actualHref = parts[0];
          const emoteName = parts[1].replace('}', '');
          emoteClass = `pikachu-${emoteName}`;
        }
      }
      
      // Add target="_blank" for external links
      if (actualHref.startsWith('https://')) {
        return `<a href="${actualHref}" class="${emoteClass}" target="_blank">${e.text}</a>`;
      }
      return `<a href="${actualHref}" class="${emoteClass}">${e.text}</a>`;
    };
    
    return renderer;
  };
  
  async function fetchAndRenderContent() {
    if (!path) {
      error = 'No markdown file path provided';
      loading = false;
      return;
    }
    
    loading = true;
    error = null;
    
    try {
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
      }
      
      const markdown = await response.text();
      const renderer = createRenderer();
      content = await marked(markdown, { renderer });
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
      content = '';
    } finally {
      loading = false;
    }
  }
  
  // Effect to handle initial load and path changes
  $effect(() => {
    if (path) {
      fetchAndRenderContent();
    }
  });
</script>

<div class="markdown-page">
  {#if showToc && headings.length > 0}
    <nav class="table-of-contents">
      <h2>Table of Contents</h2>
      <ul>
        {#each headings as heading}
          <li class="toc-level-{heading.level}">
            <a href="#{heading.id}">{heading.text}</a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
  
  <div class="markdown-content">
    {#if loading}
      <div class="markdown-loading">Loading content...</div>
    {:else if error}
      <div class="markdown-error">Error: {error}</div>
    {:else}
      <article>
        {@html content}
      </article>
    {/if}
  </div>
</div>

<style>
  .markdown-page {
    display: flex;
    gap: 2rem;
    max-width: 100%;
  }
  
  .markdown-content {
    flex: 1;
    min-width: 0;
  }
  
  .table-of-contents {
    position: sticky;
    top: 2rem;
    width: 250px;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.02);
    border-radius: 8px;
  }
  
  .table-of-contents h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .table-of-contents ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .table-of-contents li {
    margin: 0.5rem 0;
  }
  
  .table-of-contents a {
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  
  .table-of-contents a:hover {
    opacity: 1;
    text-decoration: underline;
  }
  
  /* Indent nested headings */
  .toc-level-2 { padding-left: 1rem; }
  .toc-level-3 { padding-left: 2rem; }
  .toc-level-4 { padding-left: 3rem; }
  .toc-level-5 { padding-left: 4rem; }
  .toc-level-6 { padding-left: 5rem; }
  
  .markdown-loading {
    color: #666;
    font-style: italic;
    padding: 1rem 0;
  }
  
  .markdown-error {
    color: #d32f2f;
    padding: 1rem 0;
    font-weight: 500;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .markdown-page {
      flex-direction: column;
    }
    
    .table-of-contents {
      position: static;
      width: 100%;
      max-height: none;
      margin-bottom: 2rem;
    }
  }
</style>