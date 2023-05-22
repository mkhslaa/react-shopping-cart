## 🛍️ Simple ecommerce cart application [![CircleCI](https://circleci.com/gh/jeffersonRibeiro/react-shopping-cart.svg?style=svg)](https://circleci.com/gh/jeffersonRibeiro/react-shopping-cart)

<p align="center">

  <img src="./readme-banner.png">
</p>

## Basic Overview - [Live Demo](https://react-shopping-cart-67954.firebaseapp.com/)

<p align="left">

  <img src="./work-in-the-netherlands.png" width="380" height="90">
</p>

✈️ [Follow Jeremy Akeze](https://www.linkedin.com/in/jeremy-akeze-9542b396/)

This simple shopping cart prototype shows how React with Typescript, React hooks, react Context and Styled Components can be used to build a friendly user experience with instant visual updates and scaleable code in ecommerce applications.

#### Features

- Add and remove products from the floating cart using Context Api
- Filter products by available sizes using Context Api
- Responsive design

<!--
## Getting started

Try playing with the code on CodeSandbox :)

[![Edit app](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/74rykw70qq)
 -->

## Build/Run

#### Requirements

- Node.js
- NPM

```javascript

/* First, Install the needed packages */
npm install

/* Then start the React app */
npm start

/* To run the tests */
npm run test

```

### Copyright and license

The MIT License (MIT). Please see License File for more information.

<br/>
<br/>

<p align="center"><img src="http://www.jeffersonribeiro.com/assets/img/apple-icon-180x180.png" width="35" height="35"/></p>
<p align="center">
<sub>A little project by <a href="http://www.jeffersonribeiro.com/">Jefferson Ribeiro</a></sub>
</p>

## How to run API and UI Tests

Both API and UI tests are in the Cypress folder.
- npm ci (root folder)
- cd Tests
- npm ci
- npm run start (run server in first bash terminal on VS code)
- npx cypress open (using Cypress GUI) in the second bash terminal on VS Code, npx cypressstay in Tests folder, Choose E2E Testing, Electron, and then spec to run
- npx cypress run (run both API and UI tests on CLI)
- npm run cy:api (just to run API)

## How to run docker command

Make sure Docker Desktop is up-running if you have a Windows machine
In the root folder, enter below command:
docker-compose -f Tests/docker-compose.yml up

## How to run GitHub Action

There is a workflow file for API in .github folder
Go to Repo, click Actions, click "Cypress Api Testing Regression", select Run workflow on right, keep Main branch, Click Run workflow.