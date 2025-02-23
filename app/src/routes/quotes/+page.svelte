<script>
    import { onMount } from "svelte";
    import { marked } from "marked";

    let content = "";

    onMount(async () => {
        const response = await fetch("/writing/quotes/_.md");
        const markdown = await response.text();
        content = marked(markdown);
    });
</script>

<main>{@html content}</main>
