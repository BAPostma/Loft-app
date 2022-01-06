# Loft App 🕊
The Loft App is the dashboard app to [Loft](https://github.com/BAPostma/Loft), a tool to receive email via Amazon Simple Email Service (SES) and synchronise it to a designated IMAP mailbox. This app displays email aliases, statistics and enables downloading of received messages.

See the [Loft](https://github.com/BAPostma/Loft) repository for more detail, or install Loft directly into your AWS account:

[![AWS SAR](https://img.shields.io/badge/Serverless%20Application%20Repository-Deploy%20Loft%20%E2%96%B6-orange?style=flat&logo=amazon-aws)](https://serverlessrepo.aws.amazon.com/applications/eu-west-1/386916026209/Loft)

# Contributing
We'd love contributions that help to extend the Loft App web interface or Loft itself.

The project source includes frontend code and supporting resources under `src/`. It's written in Typescript with [Svelte](https://svelte.dev/), [Pure CSS](https://purecss.io/) and uses [Parcel](https://parceljs.org) as the build tool.

## Getting started
Open the repo in your favourite editor, some basic config is already committed for VS Code. Run the following command to initialise dependencies.
```shell
$ npm install
```

To start the local server with hot-reload, run the following command and go to [localhost:1234](https://localhost:1234). Make sure to configure the app with your AWS settings on the corresponding page.
```shell
$ npm start
```


## Credits
- Pigeon icon by [Carlin MacKenzie](https://openmoji.org/library/#author=Carlin%20MacKenzie) on [OpenMoji](https://openmoji.org/library/#emoji=E009).
- Styles by [Pure.css](https://purecss.io/).