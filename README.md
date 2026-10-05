# My Portfolio

Check it out here: https://marcelorobert.github.io/personal-website/

## Introduction

This project is a personal portfolio website built with Next.js. It showcases selected projects, skills, and experience through a modern, responsive interface.

### Stack

This project was built with Next.js and Typescript. It uses TailwindCSS for styling and external css style files for specific needs outside of the TailwindCSS framework.

### Architecture

The **/src/app base folder** is used to store the main page, the layout, and the global styles. Apart from that, other pages, components, styles and files should be placed in their respective folders.

The project follows a component-based architecture. Reusable **components** are placed in the `components` folder, while **pages** are placed in the `pages` folder. If a component is only used in a single page, it can be written in the same file as the page.

The `public` folder contains **static assets** such as images and fonts.

**CSS files** are placed alongside the page or component they style, following the convention of co-locating styles with their respective components.

## Development

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

You can enable developer testing components using an environment variable in `.env.local`:

```
NEXT_PUBLIC_SHOW_DEV_TAG=true
```

### Testing

This repository uses Playwright for end-to-end testing to make sure the screen renders as expected. To run the tests, use the following command:

```bash
npm run test:e2e
# or equivalent commands for yarn, pnpm, or bun. Check package.json for the exact command.
```

Playwright is currently using a separate folder from `.next` in order to avoid conflicts with the Next.js build process and therefore be able to run while the dev server is on. The test results will be stored in the `.next-playwright` folder (check [/playwright.config.ts](playwright.config.ts)).

### Linting and Formatting

Use ESLint to check the codebase:

```bash
npm run lint
```

Use Prettier to format the codebase, or check formatting without changing files:

```bash
npm run format
npm run format:check
```

Git hooks run these checks automatically: the pre-commit hook formats and lints staged files, while the pre-push hook checks the full repository. This setup was implemented using Husky and lint-staged.

VSCode users are recommended to install the ESLint and Prettier extensions for automatic linting and formatting.

Generated Next.js output in `.next`, `.next-playwright`, `out`, and `build` is ignored by ESLint.

### CI/CD

This repository uses GitHub Actions for continuous integration and deployment. The workflows are defined in the `.github/workflows` folder. The main workflows run testing, linting and formatting.
