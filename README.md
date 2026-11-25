## Part 4 - Static Site Generator

The Astro SSG exercise is located in `ssg-exercise/starry-sphere/`.

It generates two portfolio pages:
- **Home:** `/`
- **About:** `/about/`

Both pages use a shared footer component located at `ssg-exercise/starry-sphere/src/components/Footer.astro`. Updating this component and rebuilding the project updates the footer on both pages.

See [`ssg-exercise/README.md`](ssg-exercise/README.md) for instructions on installing dependencies, building, and previewing the pages locally.

## Design Note - Cat Facts Component

The goal of the Cat Facts component is to let visitors discover interesting facts about cats.

When a visitor clicks the **Get Cat Fact** button, the component calls `loadFact()`, which sends an asynchronous `fetch()` request to the Cat Facts API at `https://catfact.ninja/fact`. While waiting for the response, the component displays "Loading cat fact..." in its status area.

When the request succeeds, the component checks that the response is successful and that the `fact` field contains a string. It then updates the displayed fact using `textContent` and changes the status message to "Now you know!"

If the request fails, such as when the API is unavailable, the response is unsuccessful, or the returned data is invalid, the component displays "Could not load a cat fact, try again!" The visitor can click **Get Cat Fact** again to retry without reloading the page.