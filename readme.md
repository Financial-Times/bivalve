<img align="right" src="/logo.png" width="256" alt="Line drawing of a clam">

# Bivalve [![CircleCI](https://circleci.com/gh/Financial-Times/bivalve.svg?style=svg)](https://circleci.com/gh/Financial-Times/bivalve)

Clamo API shim for the App. Takes content from Elastic Search and outputs it in clamo-engine format.

## Getting it running

Create a `.env` file in this directory with `AWS_ACCESS_KEY=...` and `AWS_SECRET_ACCESS_KEY=...` entries with next-es access. Then:

```sh
npm install
npm start
```

## Deployment

Create a Pull Request, get it reviewed, merge to master, Heroku deploys automatically.

## Development

Bivalve is type-checked with [Flow](https://flow.org). It's installed with the rest of the development dependencies, and won't let you commit unless the type checks pass. For more immediate feedback, it's best to install a Flow plugin for the editor of your choice. Follow the guide in [`n-flow-ft-content`](https://github.com/Financial-Times/n-flow-ft-content#editor-integration).
