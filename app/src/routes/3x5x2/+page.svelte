<script lang="ts">
    interface TopItem {
        rank: number;
        title: string;
        creator?: string;
        note?: string;
    }

    interface Category {
        name: string;
        allTime: TopItem[];
        thisYear: TopItem[];
    }

    const categories: Category[] = [
        {
            name: "Books",
            allTime: [
                { rank: 1, title: "TBD", creator: "Author" },
                { rank: 2, title: "TBD", creator: "Author" },
                { rank: 3, title: "TBD", creator: "Author" }
            ],
            thisYear: [
                { rank: 1, title: "TBD", creator: "Author" },
                { rank: 2, title: "TBD", creator: "Author" },
                { rank: 3, title: "TBD", creator: "Author" }
            ]
        },
        {
            name: "Movies",
            allTime: [
                { rank: 1, title: "TBD", creator: "Director" },
                { rank: 2, title: "TBD", creator: "Director" },
                { rank: 3, title: "TBD", creator: "Director" }
            ],
            thisYear: [
                { rank: 1, title: "TBD", creator: "Director" },
                { rank: 2, title: "TBD", creator: "Director" },
                { rank: 3, title: "TBD", creator: "Director" }
            ]
        },
        {
            name: "Videos",
            allTime: [
                { rank: 1, title: "TBD", creator: "Creator" },
                { rank: 2, title: "TBD", creator: "Creator" },
                { rank: 3, title: "TBD", creator: "Creator" }
            ],
            thisYear: [
                { rank: 1, title: "TBD", creator: "Creator" },
                { rank: 2, title: "TBD", creator: "Creator" },
                { rank: 3, title: "TBD", creator: "Creator" }
            ]
        },
        {
            name: "Essays",
            allTime: [
                { rank: 1, title: "TBD", creator: "Author" },
                { rank: 2, title: "TBD", creator: "Author" },
                { rank: 3, title: "TBD", creator: "Author" }
            ],
            thisYear: [
                { rank: 1, title: "TBD", creator: "Author" },
                { rank: 2, title: "TBD", creator: "Author" },
                { rank: 3, title: "TBD", creator: "Author" }
            ]
        },
        {
            name: "Shows",
            allTime: [
                { rank: 1, title: "TBD", creator: "Creator" },
                { rank: 2, title: "TBD", creator: "Creator" },
                { rank: 3, title: "TBD", creator: "Creator" }
            ],
            thisYear: [
                { rank: 1, title: "TBD", creator: "Creator" },
                { rank: 2, title: "TBD", creator: "Creator" },
                { rank: 3, title: "TBD", creator: "Creator" }
            ]
        }
    ];
</script>

<main>
    <h1>3×5×2</h1>
    <p>
        My top 3 favorites across 5 categories, for all-time and this year (2025).
    </p>

    {#each categories as category}
        <section>
            <h2>{category.name}</h2>
            <div class="tables-container">
                <div class="table-wrapper">
                    <h3>All-Time</h3>
                    <table>
                        <tbody>
                            {#each category.allTime as item}
                                <tr>
                                    <td class="rank">{item.rank}.</td>
                                    <td>
                                        <strong>{item.title}</strong>
                                        {#if item.creator}
                                            <span class="creator">— {item.creator}</span>
                                        {/if}
                                        {#if item.note}
                                            <span class="note">({item.note})</span>
                                        {/if}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="table-wrapper">
                    <h3>2025</h3>
                    <table>
                        <tbody>
                            {#each category.thisYear as item}
                                <tr>
                                    <td class="rank">{item.rank}.</td>
                                    <td>
                                        <strong>{item.title}</strong>
                                        {#if item.creator}
                                            <span class="creator">— {item.creator}</span>
                                        {/if}
                                        {#if item.note}
                                            <span class="note">({item.note})</span>
                                        {/if}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    {/each}
</main>

<style>
    main {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        margin-bottom: 1rem;
    }

    h2 {
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #ddd;
        padding-bottom: 0.5rem;
    }

    h3 {
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }

    .tables-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .table-wrapper {
        min-width: 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr {
        border-bottom: 1px solid #eee;
    }

    tr:last-child {
        border-bottom: none;
    }

    td {
        padding: 0.75rem 0.5rem;
        vertical-align: top;
    }

    .rank {
        width: 2rem;
        text-align: right;
        padding-right: 1rem;
        font-weight: bold;
        color: #666;
    }

    .creator {
        color: #666;
        font-style: italic;
    }

    .note {
        color: #888;
        font-size: 0.9em;
        margin-left: 0.5rem;
    }

    @media (max-width: 640px) {
        .tables-container {
            grid-template-columns: 1fr;
        }
        
        main {
            padding: 1rem;
        }
    }
</style>