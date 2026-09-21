# My Portfolio

## Introduction

This project is a personal portfolio website built with Next.js. It showcases selected projects, skills, and experience through a modern, responsive interface.

### Stack

This project was built with Next.js and Typescript. It uses TailwindCSS for styling and external css style files for specific needs outside of the TailwindCSS framework.

### Architecture

The **/src/app base folder** is used to store the main page, the layout, and the global styles. Apart from that, other pages, components, styles and files should be placed in their respective folders.

The project follows a component-based architecture. Reusable **components** are placed in the `components` folder, while **pages** are placed in the `pages` folder. If a component is only used in a single page, it can be written in the same file as the page.

The `public` folder contains **static assets** such as images and fonts.

**CSS files** are placed alongside the page or component they style, following the convention of co-locating styles with their respective components.

## Getting Started

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

## Development controls

You can enable developer testing components using an environment variable in `.env.local`:

```
NEXT_PUBLIC_SHOW_DEV_TAG=true
```
