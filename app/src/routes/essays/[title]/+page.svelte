<script>
    import { page } from "$app/stores";
    import MarkdownPage from "$lib/components/MarkdownPage.svelte";
    
    $: markdownPath = `/writing/essays/${$page.params.title}.md`;
</script>

<main>
    <br />
    <nav><a href="/essays">essays</a> ~ {$page.params.title}</nav>
    
    <article>
        <MarkdownPage 
            path={markdownPath} 
            enableAnchors={true}
            enableEmotes={true}
            showToc={true}
        />
    </article>
</main>

