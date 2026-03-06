<p align="center">
  <img src="https://automationexercise.com/static/images/home/logo.png" alt="QA Automation Exercises Banner" width="500"/>
</p>

<h1 align="center">QA Automation Exercises - Playwright</h1>

## Architecture Overview

This project contains E2E and API tests for the [Automation Exercise](https://automationexercise.com/) website, implemented using Playwright and JavaScript.

The tests cover the following areas:

1. Home Page Validation
2. Product Details Page Validation
3. Products Page Validation
4. Cart Page Validation
5. API Tests (product list, search, price validation)

### Project Structure

```
tests/
├── api/
│   ├── helpers/
│   │   ├── function-helper.js
│   │   └── https-helper.js
│   └── specs/
│       └── automationExercise.spec.js
└── e2e/
    ├── fixtures.js
    ├── helpers/
    │   ├── BasePage.js
    │   └── data.helper.js
    ├── pageObjects/
    │   ├── CartPage.js
    │   ├── HomePage.js
    │   ├── ProductDetailsPage.js
    │   └── ProductsPage.js
    └── specs/
        ├── cartPageValidation.spec.js
        ├── homePageValidation.spec.js
        ├── productDetailsPageValidation.spec.js
        └── productsPageValidation.spec.js
```

## Requirements

- [Node.js](https://nodejs.org/en/download) >= 18
- [npm](https://www.npmjs.com/) package manager

## Installation & Setup

Follow the steps below to set up the project locally:

1. Clone the Repository

```
git clone https://github.com/AnaDjokovic/qa-automation-exercises-task
```

2. Navigate to the project directory

```
cd qa-automation-exercises-task
```

3. Install dependencies

```
npm install
```

4. Install Playwright browsers (for more info go [here](https://playwright.dev/docs/intro))

```
npx playwright install
```

## Test Plan Document

A detailed Test Plan (PDF) is included in the project root:

**Test Plan - Automation Exercise.pdf**

It describes the testing scope, strategy, scenarios, environment setup, test data, and all functional areas covered by both manual and automated tests.

## Usage

This project includes E2E UI tests configured to run on Chrome and Firefox, using Playwright's project-based configuration, and API tests.

### Browsers

E2E tests run on two browsers by default:

- Chromium
- Firefox

You can adjust or extend projects in `playwright.config.js` → projects section.

### E2E Tests

Tests are located in `tests/e2e/specs/`.

- Run tests using Chromium

```
npm run test:e2e:chrome
```

- Run tests using Firefox

```
npm run test:e2e:firefox
```

### API Tests

Tests are located in `tests/api/specs/`.

```
npm run test:api
```

### Running Tests by Tag

Tests are tagged with `@smoke` and `@regression` labels for selective execution:

```
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

Available tags: `@smoke`, `@regression`, `@home`, `@cart`, `@pdp`, `@api`.

## Code Quality Tools

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

- `.eslintrc.json`
- `.prettierrc`

## Notes

- Tests use custom Playwright fixtures (`tests/e2e/fixtures.js`) for page object injection
- All page objects extend `BasePage` for consistent navigation
- Tests are re-runnable on failure (configured via Playwright retries on CI)
- Screenshots are captured only on failure
- You can change browsers or run in headless mode via `playwright.config.js`
- **AI-assisted development:** `.cursor/rules/` contains project context for AI tools (Cursor, etc.) so suggestions stay aligned with this project’s structure and conventions

## Owner

Project implemented by **Ana Markovic**.
