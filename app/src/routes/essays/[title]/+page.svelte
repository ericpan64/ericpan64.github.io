<script>
    import MarkdownPage from "$lib/components/MarkdownPage.svelte";
    
    export let data;
    
    $: markdownPath = `/writing/essays/${data.title}.md`;
</script>

<main>
    <br />
    <nav><a href="/essays">essays</a> ~ {data.title}</nav>
    
    <article>
        <MarkdownPage 
            path={markdownPath} 
            enableAnchors={true}
            enableEmotes={true}
            showToc={true}
        />
    </article>
</main>

