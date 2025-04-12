<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { afterNavigate } from "$app/navigation";
    import { marked } from "marked";

    let content = "";

    // Allow for `#some-markdown-title` links to work in HTML
    const renderer = new marked.Renderer();
    renderer.heading = (e) => {
        // For each header, adds an `id` field with special chars removed and spaces -> `-`
        const id = e.text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        return `<h${e.depth} id="${id}">${e.text}</h${e.depth}>`;
    };
    // Add a `target="_blank"` for web links (so they open in new tab)
    renderer.link = (e) => {
        // Check for Pikachu emote syntax: [text](url|{emote-name})
        const parts = e.href.split('|{');
        let actualHref = e.href;
        let emoteClass = '';
        
        if (parts.length === 2) {
            actualHref = parts[0];
            const emoteName = parts[1].replace('}', '');
            emoteClass = `pikachu-${emoteName}`;
            console.log('Found emote:', emoteClass); // Debug log
        }

        if (actualHref.startsWith("https://")) {
            return `<a href="${actualHref}" class="${emoteClass}" target="_blank">${e.text}</a>`;
        }
        return `<a href="${actualHref}" class="${emoteClass}">${e.text}</a>`;
    };

    async function fetchContent(title) {
        const response = await fetch(`/writing/essays/${title}.md`);
        const markdown = await response.text();
        content = marked(markdown, { renderer });
    }

    onMount(() => {
        fetchContent($page.params.title);
    });

    afterNavigate(({ to }) => {
        if (to?.url.pathname.startsWith("/essays/")) {
            fetchContent($page.params.title);
        }
    });
</script>

<main>
    <br />
    <nav><a href="/essays">essays</a> ~ {$page.params.title}</nav>
    
    <article>{@html content}</article>
</main>

