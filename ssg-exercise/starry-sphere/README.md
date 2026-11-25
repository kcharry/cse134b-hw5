# SSG Exercise

This exercise uses Astro to generate two pages from my personal portfolio: Home and About.

## Project Structure

The Astro project is located in `starry-sphere/` inside this folder.

- `starry-sphere/src/pages/index.astro` - Home page
- `starry-sphere/src/pages/about.astro` - About page
- `starry-sphere/src/components/Footer.astro` - Shared footer component
- `starry-sphere/public/` - Static assets, stylesheets, and scripts

## Shared Component

Both pages use the same `Footer.astro` component. This allows the footer to be maintained in one place and reused across both pages. Changes to the component appear on both pages after rebuilding the project.

## Setup and Commands

Navigate into the Astro project:

    cd starry-sphere

Install dependencies:

    npm install

Build the static pages:

    npm run build

Preview the generated site locally:

    npm run preview

## Preview Pages

After starting the preview server, visit:

- Home: http://localhost:4321/
- About: http://localhost:4321/about/