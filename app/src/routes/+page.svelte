<script lang="ts">
    import { onMount } from "svelte";
    import { imageData } from "$lib/imageOptions";

    let imageSrc = "";
    let imageAltText = "";
    let folderSelection = "cats";
    let isLoading = true;

    let lastPicked = "";

    const pickRandom = (
        optionDict: Record<string, Record<string, number>>,
    ): string => {
        const options = Object.keys(optionDict).filter(
            (opt) => opt !== lastPicked,
        );
        if (options.length === 0) return lastPicked;

        const sum = options.reduce(
            (acc, opt) => acc + optionDict[opt].weight,
            0,
        );
        const rand = Math.random() * sum;

        let cumulative = 0;
        for (let opt of options) {
            cumulative += optionDict[opt].weight;
            if (rand <= cumulative) {
                lastPicked = opt;
                return opt;
            }
        }

        return options[options.length - 1]; // Fallback
    };

    const setImageVars = () => {
        const options = imageData[folderSelection];
        const pickedImg = pickRandom(options);
        imageSrc = `/images/${folderSelection}/${pickedImg}`;
        imageAltText = imageData[folderSelection][pickedImg].alt;
        isLoading = false;
    };

    onMount(setImageVars);

    const imageDirectories = ["cats", "dogs", "moments"];

    // // Cursor stuff!
    // // TODO: Add way to disable the cursor
    // import { cursorEnabled } from "$lib/stores";

    // onMount(() => {
    //     cursorEnabled.subscribe((enabled) => {
    //         document.documentElement.dataset.cursor = enabled
    //             ? "enabled"
    //             : "disabled";
    //     });
    // });
</script>

<main>
    <h1>Welcome! — epan.land</h1>
    <nav>
        <ul class="horizontal-list pikachu-question">
            {#each imageDirectories as category}
                <li>
                    <a class="pikachu-surprise"
                        href=""
                        on:click={() => {
                            folderSelection = category;
                            setImageVars();
                        }}>{category}</a
                    >
                </li>
            {/each}
        </ul>
    </nav>
    {#if isLoading}
        <article>Loading...</article>
    {:else}
    <img
        src={imageSrc}
        alt={imageAltText}
        title={imageAltText}
        height="480rem"
        width="320rem"
    />

    {/if}
</main>

<style>
    .horizontal-list {
        padding: 0;
        list-style-type: none;
    }

    .horizontal-list li {
        display: inline-block;
        margin-right: 10px;
    }
</style>
