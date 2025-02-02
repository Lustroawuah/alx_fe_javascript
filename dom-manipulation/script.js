// Step 1: Manage an array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The best way to predict the future is to create it.", category: "Inspiration" }
];

// Step 2: Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Use innerHTML to set the quote display
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
}

// Step 3: Function to create the add quote form
function createAddQuoteForm() {
    const formContainer = document.createElement('div');

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.id = 'addQuoteButton';

    // Add event listener to the button
    addButton.addEventListener('click', function() {
        const newQuoteText = quoteInput.value.trim();
        const newQuoteCategory = categoryInput.value.trim();

        // Check if both fields are filled out
        if (newQuoteText === "" || newQuoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        // Create a new quote object
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };

        // Add the new quote to the quotes array
        quotes.push(newQuote);

        // Clear the input fields
        quoteInput.value = '';
        categoryInput.value = '';

        // Optionally, show the newly added quote
        showRandomQuote();
    });

    // Append inputs and button to the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    // Append the form container to the body or a specific section
    document.body.appendChild(formContainer);
}

// Step 4: Attach event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the add quote form when the page loads
createAddQuoteForm();