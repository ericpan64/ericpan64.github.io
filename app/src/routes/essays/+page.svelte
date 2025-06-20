<script lang="ts">
    export let data;
    
    // Map of special titles to their display names
    const titleOverrides: Record<string, string> = {
        '2025-3_TheDao-CoFounderDating': 'The Dao of Co-Founder "Dating"',
        '2024-10_KH-SOP': 'Stanford Knight Hennessy - Connect The Dots (rejected but learned a lot)',
        '2024-8_MS-Design-SOP': 'Stanford MS Design - Statement of Purpose (rejected but glad I tried)',
        '2024-3_DataMappingsAsPoetry': 'Data Mapping is Poetry (not plumbing)',
        '2022-8_MS-BMI-SOP': 'Stanford MS BMI - Statement of Purpose (accepted!)'
    };
    
    // Helper to get display title
    function getDisplayTitle(filename: string, defaultTitle: string): string {
        return titleOverrides[filename] || defaultTitle;
    }
    
    // Check if an essay is new (March 2025)
    function isNew(filename: string): boolean {
        return filename === '2025-3_TheDao-CoFounderDating';
    }
</script>

<main>
    <h1>Essays on various things</h1>
    <p>
        Some longer-form writing that I've thought deeply about. Opinions are my
        own (though inspired by many). Enjoy!
    </p>

    <ul>
        {#each data.essays as essay}
            <li>
                [{essay.displayDate}]
                {#if isNew(essay.filename)}
                    <img
                        src="/images/ebay-new-2000s.png"
                        alt="The eBay 'new' icon from the 2000's, a classic!"
                        width="24rem"
                        height="auto"
                    />
                {/if}
                <a href={essay.href}>
                    {getDisplayTitle(essay.filename, essay.title)}
                </a>
            </li>
        {/each}
    </ul>
</main>
