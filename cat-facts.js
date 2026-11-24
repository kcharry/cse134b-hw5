class CatFacts extends HTMLElement {
    static get observedAttributes() {
        return ["compact"];
    }

    connectedCallback() {
        this.container = document.createElement("div");

        this.heading = document.createElement("h3");
        this.heading.textContent = "Did You Know?";

        this.factDisplay = document.createElement("p");
        this.factDisplay.textContent = "Click the button to discover a cat fact!";

        this.status = document.createElement("p");
        this.status.setAttribute("role", "status");

        this.nextButton = document.createElement("button");
        this.nextButton.type = "button";
        this.nextButton.textContent = "Get Cat Fact";

        this.container.appendChild(this.heading);
        this.container.appendChild(this.factDisplay);
        this.container.appendChild(this.status);
        this.container.appendChild(this.nextButton);

        this.appendChild(this.container);

        this.nextButton.addEventListener("click", () => {
            this.loadFact();
        });

        this.updateAppearance();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "compact" && oldValue !== newValue) {
            this.updateAppearance();
        }
    }

    updateAppearance() {
        const isCompact = this.hasAttribute("compact");
        this.heading.hidden = isCompact;
        this.status.hidden = isCompact;

    }

   async loadFact() {
    this.status.textContent = "Loading cat fact...";
    this.nextButton.disabled = true;

    try {
        const response = await fetch("https://catfact.ninja/fact");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        if (typeof data?.fact !== "string") {
            throw new Error("Invalid response");
        }

        this.factDisplay.textContent = data.fact;
        this.status.textContent = "Now you know!";
    } catch (error) {
        this.status.textContent = "Could not load a cat fac, try again!!";
        console.error(error);
    } finally {
        this.nextButton.disabled = false;
    }
}
}

// register  custom element
customElements.define("cat-facts", CatFacts);

// set up the external page button
document.addEventListener("DOMContentLoaded", () => {
    const catFacts = document.getElementById("cat-facts-component");
    const compactToggle = document.getElementById("compact-toggle");

    compactToggle.addEventListener("click", () => {
        catFacts.toggleAttribute("compact");
    });
});
