document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("taxForm");
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modalContent");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const incomeInput = document.getElementById("income");
        const extraIncomeInput = document.getElementById("extraIncome");
        const deductionsInput = document.getElementById("deductions");
        const ageSelect = document.getElementById("age");

        // Remove any existing error messages
        clearErrors();

        // Validate inputs
        const errors = validateInputs(incomeInput, extraIncomeInput, deductionsInput, ageSelect);
        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }

        // Calculate tax
        const income = parseFloat(incomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value) || 0;
        const deductions = parseFloat(deductionsInput.value) || 0;
        const age = ageSelect.value;

        let tax = 0;
        if (income + extraIncome - deductions > 8) {
            if (age === "Under 40") {
                tax = 0.3 * (income + extraIncome - deductions - 8);
            } else if (age === "40 to 59") {
                tax = 0.4 * (income + extraIncome - deductions - 8);
            } else if (age === "Above 60") {
                tax = 0.1 * (income + extraIncome - deductions - 8);
            }
        }

        // Display tax amount in modal
        modalContent.innerHTML = `Tax Amount: ${tax.toFixed(2)} Lakhs`;
        modal.style.display = "block";
    });

    // Close the modal when the user clicks anywhere outside of it
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Close the modal when the user clicks the close button
    document.querySelector(".close").addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Function to validate inputs
    function validateInputs(incomeInput, extraIncomeInput, deductionsInput, ageSelect) {
        const errors = [];

        if (incomeInput.value.trim() === "") {
            errors.push({ input: incomeInput, message: "Gross Annual Income is required" });
        }

        if (extraIncomeInput.value.trim() === "") {
            errors.push({ input: extraIncomeInput, message: "Extra Income is required" });
        }

        if (deductionsInput.value.trim() === "") {
            errors.push({ input: deductionsInput, message: "Deductions is required" });
        }

        if (ageSelect.value === "") {
            errors.push({ input: ageSelect, message: "Age is required" });
        }

        return errors;
    }

    // Function to display error messages
    function displayErrors(errors) {
        errors.forEach(error => {
            const input = error.input;
            const errorMessage = document.createElement("div");
            errorMessage.className = "error-message";
            errorMessage.textContent = error.message;
            input.classList.add("error");
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
        });
    }

    // Function to clear error messages and reset input styles
    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(errorMessage => errorMessage.remove());
        const errorInputs = document.querySelectorAll(".error");
        errorInputs.forEach(input => input.classList.remove("error"));
    }
});



   
