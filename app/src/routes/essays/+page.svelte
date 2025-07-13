<script lang="ts">
    let { data } = $props();
    
    // Map of special titles to their display names
    const titleOverrides: Record<string, string> = {
        '2025-7_FancyRugEffect': 'The Fancy Rug Effect',
        '2025-3_TheDao-CoFounderDating': 'The Dao of Co-Founder "Dating"',
        '2024-10_KH-SOP': 'Stanford Knight Hennessy - Connect The Dots (rejected but learned a lot)',
        '2024-8_MS-Design-SOP': 'Stanford MS Design - Statement of Purpose (rejected but glad I tried)',
        '2024-3_DataMappingsAsPoetry': 'Data Mapping is Poetry, not Plumbing',
        '2022-8_MS-BMI-SOP': 'Stanford MS BMI - Statement of Purpose (accepted!)'
    };
    
    // Helper to get display title
    function getDisplayTitle(filename: string, defaultTitle: string): string {
        return titleOverrides[filename] || defaultTitle;
    }
    
    // Check if an essay is new (within last 3 months)
    function isNew(filename: string): boolean {
        // Extract date from filename (e.g., "2025-3_TheDao-CoFounderDating" -> "2025-3")
        const datePart = filename.split('_')[0];
        if (!datePart || !datePart.includes('-')) return false;
        
        const [year, month] = datePart.split('-').map(Number);
        if (!year || !month || month < 1 || month > 12) return false;
        
        // Create date object for the essay
        const essayDate = new Date(year, month - 1, 1); // month is 0-indexed in Date constructor
        
        // Get current date
        const now = new Date();
        
        // Calculate 3 months ago
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        
        // Essay is new if it's after 3 months ago
        return essayDate >= threeMonthsAgo;
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
