<script lang="ts">
    import { marked } from "marked";
    
    let { path = "", enableAnchors = false, enableEmotes = false } = $props();
    
    let content = $state("");
    let loading = $state(true);
    let error = $state<string | null>(null);
    
    // Configure marked renderer
    const renderer = new marked.Renderer();
    
    // Custom heading renderer for anchor links
    if (enableAnchors) {
        renderer.heading = (e) => {
            // For each header, adds an `id` field with special chars removed and spaces -> `-`
            const id = e.text
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
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
        if (actualHref.startsWith("https://")) {
            return `<a href="${actualHref}" class="${emoteClass}" target="_blank">${e.text}</a>`;
        }
        return `<a href="${actualHref}" class="${emoteClass}">${e.text}</a>`;
    };
    
    async function fetchContent() {
        if (!path) {
            error = "No markdown file path provided";
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
            content = await marked(markdown, { renderer });
        } catch (err) {
            error = err instanceof Error ? err.message : String(err);
            content = "";
        } finally {
            loading = false;
        }
    }
    
    // Effect to handle initial load and path changes
    $effect(() => {
        if (path) {
            fetchContent();
        }
    });
</script>

{#if loading}
    <div class="markdown-loading">Loading content...</div>
{:else if error}
    <div class="markdown-error">Error: {error}</div>
{:else}
    {@html content}
{/if}

<style>
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
</style>