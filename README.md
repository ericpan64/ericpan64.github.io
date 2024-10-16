# Personal Website

A personal website to host different ideas and keep a history of how they evolve (in Git!)

This static website is generated using SvelteKit. To build: `cd app && npm run build`

If needed, use the latest node version with something like `nvm use node`

To do dev work: `cd app && npm run dev`

The content of the website is stored in `app/static/writing` as Markdown files and converted to HTML dynamically using the [marked](https://github.com/markedjs/marked) library.

[Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) is used whenever reasonable (it's hard!).
