# Personal Website

A personal website to host different ideas and keep a history of how they evolve (in Git!)

This static website is generated using SvelteKit. The steps to build are:
```bash
cd epan-land-svelte
npm i
npm run build
cp -r build/* ..
```

If needed, use the latest node version with something like `nvm use node`

To do dev work: `npm run dev`

The content of the website is stored in `epan-land-svelte/static/content` as Markdown files. The following conversions are made (roughly):
```json
{
    "#": "<h1>",
    "##": "<h2>",
    "###": "<h3>",
    "####": "<h4>",
    "[some_text](some_link)": "<a href='some_link'>some_text</a>",
    "Text until next newline": "<p>Text until next newline</p>"
}
```

Semantic HTML is used whenever reasonable.
