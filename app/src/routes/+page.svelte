<script lang="ts">
    import { onMount } from "svelte";
    import { imageProbabilities, imageAltTextOptions } from "$lib/imageOptions";

    let imageSrc = "";
    let imageAltText = "";
    let folderSelection = "cats";
    let isLoading = true;

    let lastPicked = "";
    const pickRandom = (optionDict: Record<string, number>): string => {
        const options = Object.keys(optionDict).filter(
            (opt) => opt !== lastPicked,
        );
        if (options.length === 0) return lastPicked;

        let result = options[0];
        let sum = options.reduce((acc, opt) => acc + optionDict[opt], 0);
        let rand = Math.random() * sum;

        for (let opt of options) {
            rand -= optionDict[opt];
            if (rand <= 0) {
                result = opt;
                break;
            }
        }

        lastPicked = result;
        return result;
    };

    const setImageVars = () => {
        const options = imageProbabilities[folderSelection];
        const pickedImg = pickRandom(options);
        imageSrc = `/images/${folderSelection}/${pickedImg}`;
        imageAltText = imageAltTextOptions[folderSelection][pickedImg];
        isLoading = false;
    };

    onMount(setImageVars);
</script>

<h1>Welcome!—epan.land</h1>
<ul class="horizontal-list">
    <li>
        <a
            href="#"
            on:click|preventDefault={() => {
                folderSelection = "cats";
                setImageVars();
            }}>cats</a
        >
    </li>
    <li>
        <a
            href="#"
            on:click|preventDefault={() => {
                folderSelection = "dogs";
                setImageVars();
            }}>dogs</a
        >
    </li>
</ul>
{#if isLoading}
    <div>Loading...</div>
{:else}
    <img
        src={imageSrc}
        alt={imageAltText}
        title={imageAltText}
        height="480rem"
        width="320rem"
    />
{/if}

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
