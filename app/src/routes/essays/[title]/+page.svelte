<script>
    import MarkdownPage from "$lib/components/MarkdownPage.svelte";
    
    let { data } = $props();
    
    let markdownPath = $derived(`/writing/essays/${data.title}.md`);
</script>

<main>
    <br />
    <nav><a href="/essays">essays</a> ~ {data.title}</nav>
    
    <article>
        <MarkdownPage 
            path={markdownPath} 
            enableAnchors={true}
            enableEmotes={true}
        />
    </article>
</main>

<style>
    main {
        max-width: 42rem;
    }

</style>
