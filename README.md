<p align="center">
  <img src="https://automationexercise.com/static/images/home/logo.png" alt="QA Automation Exercises Banner" width="500"/>
</p>

<h1 align="center">QA Automation Exercises - Playwright</h1>

## 🏗️ Architecture Overview

This project contains E2E tests for the [Automation Exercise](https://automationexercise.com/) website, implemented using Playwright and JavaScript.

The tests cover the following areas:

1. Home Page Validation

2. Product Details Page Validation

3. Products Page Validation

4. Cart Page Validation


## 📋 Requirements

- [Node.js](https://nodejs.org/en/download) >= 18
- [npm](https://www.npmjs.com/) package manager

## 🔧 Installation & Setup

Follow the steps below to set up the project locally:

1️⃣ Clone the Repository

You can clone the project using HTTPS, SSH, or GitHub CLI:

```
git clone https://github.com/AnaDjokovic/qa-automation-exercises-task
```
2️⃣ Navigate to the project directory
```
cd qa-automation-exercises-task
```
3️⃣ Install dependencies
```
npm install
```

4️⃣ Install Playwright browsers (for more info go [here](https://playwright.dev/docs/intro).)
```
npx playwright install
```

## 📄 Test Plan Document

A detailed Test Plan (PDF) is included in the project root:

**Test Plan - Automation Exercise.pdf**

It describes the testing scope, strategy, scenarios, environment setup, test data, and all functional areas covered by both manual and automated tests.

## 🔧 Usage

This project includes E2E UI tests configured to run on Chrome and Firefox, using Playwright’s project-based configuration and API tests.

## 🌐 Browsers

E2E tests run on two browsers by default:

- Chromium

- Firefox

You can adjust or extend projects in
playwright.config.js → projects section.

## 🧪 E2E tests

🔍 Where to find API tests

    📂 tests/

     └── 📁 e2e/

### Tests Execution

- ▶️ Run tests using Chromium

```
npm run test:e2e:chrome
```

- ▶️ Run tests using Firefox

```
npm run test:e2e:firefox
```

### 🔌 API Tests

🔍 Where to find API tests

    📂 tests/

     └── 📁 api/

### Run All API tests

```
npm run test:api
```


## 🛠 Code Quality Tools

The project uses ESLint and Prettier to maintain clean and consistent code style.

### Run ESLint

```
npm run lint
```
### Run Prettier formatting

```
npm run format
```

You can customize rules in:

- .eslintrc.json

- .prettierrc


## 📌 Notes

- Tests are re-runnable on failure (configured in Playwright retries property)

- Screenshots are captured only on failure and saved to the default Playwright folder

- You can change browsers or run in headless mode via *playwright.config.js*

- API endpoints tested are listed in **/tests/api/** and can be extended as needed

## 👤 Owner
Project implemented by **Ana Marković**.

