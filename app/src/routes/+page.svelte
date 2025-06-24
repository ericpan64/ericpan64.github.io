<script lang="ts">
    import { imageData } from "$lib/imageOptions";

    let imageSrc = $state("");
    let imageAltText = $state("");
    let folderSelection = $state<keyof typeof imageData>("cats");
    let isLoading = $state(true);

    let lastPicked = "";

    const pickRandom = (
        optionDict: Record<string, { weight: number; alt: string }>,
    ): string => {
        const options = Object.keys(optionDict).filter(
            (opt) => opt !== lastPicked,
        );
        if (options.length === 0) return lastPicked;

        const sum = options.reduce(
            (acc, opt) => acc + (optionDict[opt]?.weight || 0),
            0,
        );
        const rand = Math.random() * sum;

        let cumulative = 0;
        for (let opt of options) {
            cumulative += optionDict[opt]?.weight || 0;
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
        imageAltText = (imageData[folderSelection] as any)[pickedImg]?.alt || '';
        isLoading = false;
    };

    $effect(() => {
        setImageVars();
    });

    const imageDirectories = ["cats", "dogs", "moments"];
</script>

<main>
    <h1>Welcome! — epan.land</h1>
    <nav>
        <ul class="horizontal-list pikachu-question">
            {#each imageDirectories as category}
                <li>
                    <button class="pokemon-button"
                        onclick={(e) => {
                            e.preventDefault();
                            folderSelection = category as keyof typeof imageData;
                            setImageVars();
                        }}>
                        <span class="pikachu-surprise">{category}</span></button
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

    .pokemon-button {
        /* Basic shape and border */
        border: 2px dashed #222;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 6px 4px;
        font-family: 'Pokemon GB'; /* Retro pixel font */
        font-size: 8px;
        color: #222;
        cursor: pointer;
        /* No rounded corners */
        border-radius: 0;
        /* Shadow/bevel effect */
        box-shadow: 4px 4px 0 #666;
        /* Transition for interactive feedback */
        transition: all 0.1s;
        /* Outline for accessibility, but keep it subtle */
        outline: none;
    }

    .pokemon-button:hover {
        border: 2px solid #222;
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 2px 2px 0 #666;
        transform: translate(2px, 2px);
    }

    .pokemon-button:active {
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 1px 1px 0 #666;
        transform: translate(3px, 3px);
    }

</style>
