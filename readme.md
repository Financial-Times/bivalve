<img align="right" src="/logo.png" width="256" alt="Line drawing of a clam">

*Note that bivalve is deprecated and the intention is to remove Clamo-like functionality.*

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

## Key rotation

Heroku is configured with `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY` environment variables, which are unmanaged! To rotate the keys, generate [a new Security credential in IAM][1] in the AWS InfraProd account for the "arn:aws:iam::027104099916:user/aws-composer-custom-bivalve-BivalveFastFTProxyUser-CW784PJSFZ2X" user, and update the environment variables in Heroku.

## Development

Bivalve is type-checked with [Flow](https://flow.org). It's installed with the rest of the development dependencies, and won't let you commit unless the type checks pass. For more immediate feedback, it's best to install a Flow plugin for the editor of your choice. Follow the guide in [`n-flow-ft-content`](https://github.com/Financial-Times/n-flow-ft-content#editor-integration).

[1]: https://console.aws.amazon.com/iam/home?#/users/aws-composer-custom-bivalve-BivalveFastFTProxyUser-CW784PJSFZ2X?section=security_credentials
