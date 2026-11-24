const form = document.querySelector("form");
form.noValidate = true; // ensure custom submit listener

const fields = [
    document.querySelector("#name"),
    document.querySelector("#email"),
    document.querySelector("#comments")
];

const errorMessages = document.querySelector("#error-messages");
const commentInfo = document.querySelector("#comment-info");

const form_errors = [];
const errorHistory = document.querySelector("#form-errors");

// validate one field and return its error message.
function validateField(field) {
    field.setCustomValidity("");

    const validity = field.validity;
    let message = "";

    if (validity.valueMissing) {
        message = "This field is required.";
    } else if (validity.typeMismatch) {
        message = "Please enter a valid email address.";
    } else if (validity.tooShort) {
        message = `Please enter at least ${field.minLength} characters.`;
    }

    field.setCustomValidity(message);
    return message;
}

// Display errors for fields that have been checked
function showError(field) {
    const message = validateField(field);
    const errorId = field.id + "-error";

    let error = document.getElementById(errorId);

    if (!error) {
        error = document.createElement("p");
        error.id = errorId;

        if (field.id === "comments") {
            field.setAttribute("aria-describedby", errorId + " comment-info");
        } else {
            field.setAttribute("aria-describedby", errorId);
        }

        field.insertAdjacentElement("afterend", error);
    }

    error.textContent = message;
    error.hidden = !message;

    return message;
}

// Update the comments character count
function updateCommentCount() {
    const comments = fields[2];
    const remaining = comments.maxLength - comments.value.length;

    commentInfo.textContent = `${remaining} characters remaining.`;
    commentInfo.className = "";

    if (remaining === 0) {
        commentInfo.textContent = "Character limit reached.";
        commentInfo.classList.add("limit-reached");
    } else if (remaining <= 100) {
        commentInfo.textContent += " You are approaching the character limit.";
        commentInfo.classList.add("near-limit");
    }
}

// show errors when a user leaves a field + recheck errors and update the character count while typing
fields.forEach(function(field) {
    let edited = false;

    field.addEventListener("input", function() {
        edited = true;

        const error = document.getElementById(field.id + "-error");

        if (error) {
            showError(field);
        }

        if (field.id === "comments") {
            updateCommentCount();
        }
    });

    field.addEventListener("blur", function() {
        if (edited) {
            showError(field);
        }
    });
});

// validate every field when submitting
form.addEventListener("submit", function(event) {
    let hasErrors = false;

    fields.forEach(function(field) {
        const message = showError(field);

        if (!field.validity.valid) {
            hasErrors = true;

            form_errors.push({
                field: field.name,
                error: message
            });
        }
    });

    if (hasErrors) {
        event.preventDefault();
    } else {
        errorHistory.value = JSON.stringify(form_errors);
    }
});

// char count
commentInfo.hidden = false; // originally hidden for when no javascript
updateCommentCount();