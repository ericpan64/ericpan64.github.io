<script>
    // import { onMount } from "svelte";
    // import { marked } from "marked";

    // // import { entries } from "./+page.server";

    // // NOTE: The markdown parsing gets handled in `+page.server.ts`
    // // ... doing this so static build works
    // const content = entries();
    // const parsed_content = marked(content);

    // onMount(async () => {
    //     const response = await fetch("/writing/essays/_.md");
    //     const markdown = await response.text();
    //     content = marked(markdown);
    // });
</script>

<!-- <div>{@html parsed_content}</div> -->
<!-- Ok. This is manual for now. TODO to switch this to "automagically" build 
 And for context -- the issue is converting from markdown links -> <a> tags dynamically in the code
 means that the static renderer can't pre-render it / discover it. 
 The data is still just from the markdown file though and we have that at compile time, so can do something there
-->

<main>
    <h1>Essays on various things</h1>
    <p>
        Some longer-form writing that I've thought deeply about. Opinions are my
        own (though inspired by many). Enjoy!
    </p>

    <ul>
        <li>
            [March 2025] <a href="/essays/2025-3_TheDao-CoFounderDating">
                The Dao of Co-Founder "Dating"
            </a>
        </li>
        <li>
            [October 2024] <a href="/essays/2024-10_KH-SOP"
                >Stanford Knight Hennessy - Connect The Dots (rejected but
                learned a lot)
            </a>
        </li>
        <li>
            [August 2024] <a href="/essays/2024-8_MS-Design-SOP"
                >Stanford MS Design - Statement of Purpose (rejected but glad I
                tried)</a
            >
        </li>
        <li>
            [March 2024] <a href="/essays/2024-3_DataMappingsAsPoetry"
                >Data Mapping is Poetry (not plumbing)</a
            >
        </li>
        <li>
            [August 2022] <a href="/essays/2022-8_MS-BMI-SOP"
                >Stanford MS BMI - Statement of Purpose (accepted!)</a
            >
        </li>
    </ul>
</main>
