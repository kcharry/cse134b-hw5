const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {
    let currentTheme = "light";

    // restore the saved theme if available.
    try {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light" || savedTheme === "dark") {
            currentTheme = savedTheme;
        }
    } catch (error) {
        // Storage is unavailablem use default light theme.
    }

    // Apply theme and update the button label
    function updateTheme(theme) {
        currentTheme = theme;
        document.documentElement.dataset.theme = theme;

        if (theme === "dark") {
            themeButton.textContent = "Switch to Light Mode";
        } else {
            themeButton.textContent = "Switch to Dark Mode";
        }
    }

    updateTheme(currentTheme);

    themeButton.hidden = false; // Show button only after JavaScript is ready


    // Switch themes when the button is clicked
    themeButton.addEventListener("click", function () {
        const nextTheme = currentTheme === "light" ? "dark" : "light";

        // Check whether the user prefers reduced motion.
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // use view transition API when supported.
        if (
            document.startViewTransition &&
            !prefersReducedMotion
        ) {
            document.startViewTransition(() => {
                updateTheme(nextTheme);
            });
        } else {
            // Fall back to a normal theme change
            updateTheme(nextTheme);
        }

        // save theme.
        try {
            localStorage.setItem("theme", nextTheme);
        } catch (error) {
            // Theme still works for the current page.
        }
    });

}
