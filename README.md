
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict "Strict TypeScript Checked")](https://www.typescriptlang.org) ![](https://badges.aleen42.com/src/vitejs.svg "Vite Powered")


[![Build](https://github.com/arcanetechnology/arcane-web/actions/workflows/deploy-invest.yml/badge.svg)](https://github.com/arcanetechnology/arcane-web/actions/workflows/deploy-invest.yml)

# Running the project locally

- Add local env variables to connect to firebase, contentful, etc...
```shell
yarn
yarn build
yarn dev
```

Invest application would be available on http://localhost:3000/invest/.

# Deployment

### Deploy to Firebase Hosting

Find `TARGET` and `SITE` for your application.  
Check `firebase.json` and `.firebaserc` configuration.  
For more info, check (Firebase hosting documentation)[https://firebase.google.com/docs/hosting/multisites#define_hosting_config]

Syntax: `firebase deploy --only hosting:[TARGET]`

```shell
firebase deploy --only hosting:arcane-invest-dev
firebase deploy --only hosting:arcane-trade-admin-dev
```

# `@arcane-web`

> If you want to improve the performance of your web application, then use less JavaScript. However, if you must use Javascript, DO NOT USE VIRTUAL DOM!

This philosophy guides arcanes web development, we have kept the framework lean


### pre-requisite

https://yarnpkg.com/getting-started/install


1. TODO: make native html form based request calls.
2. TODO: evaluate arcane-state vs nanostore.
3. TODO: alchemy css only design system hosted on cdn.
4. TODO: alchemy solidjs based design system with inbuilt style provider.

### Quirks

wasn't able to figure out how to build a compiled solid-js component library in vite, so I was forced to use rollup. I really hate it when I have to use multiple build tools.
