# Personal Website

A personal website to host different ideas and keep a history of how they evolve (in Git!)

This static website is generated using SvelteKit. The steps to build are in [`build.sh`](./build.sh)

If needed, use the latest node version with something like `nvm use node`

To do dev work: `npm run dev`

The content of the website is stored in `app/static/writingt` as Markdown files and converted to HTML dynamically using the [marked](https://github.com/markedjs/marked) library.

Semantic HTML is used whenever reasonable (it's hard!).
