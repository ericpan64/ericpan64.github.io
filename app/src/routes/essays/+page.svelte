<script>
    import { onMount } from "svelte";
    import { marked } from "marked";

    let content = "";

    onMount(async () => {
        const response = await fetch("/writing/essays/_.md");
        const markdown = await response.text();
        content = marked(markdown);
    });
</script>

<div>{@html content}</div>
