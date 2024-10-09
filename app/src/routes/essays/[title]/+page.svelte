<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
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
        if (e.href.startsWith("https://")) {
            return `<a href="${e.href}" target="_blank"}>${e.text}</a>`;
        }
        return `<a href="${e.href}">${e.text}</a>`;
    };

    onMount(async () => {
        const response = await fetch(
            `/writing/essays/${$page.params.title}.md`,
        );
        const markdown = await response.text();
        content = marked(markdown, { renderer });
    });
</script>

<br />
<nav><a href="/essays">essays</a> ~ {$page.params.title}</nav>

<div>{@html content}</div>
