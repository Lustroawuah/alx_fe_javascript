let quotes = [];

// Load quotes from local storage when the application initializes
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    populateCategories(); // Populate categories after loading quotes
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').textContent = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Use innerHTML to set the quote display
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

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
    saveQuotes(); // Save quotes to local storage
    populateCategories(); // Update categories in the dropdown

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Optionally, show the newly added quote
    showRandomQuote();
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to export quotes to a JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2); // Format JSON with indentation
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        populateCategories(); // Update categories after import
        showRandomQuote(); // Optionally show a random quote after import
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category)); // Extract unique categories

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add unique categories to the dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastSelectedCategory', selectedCategory); // Save last selected category

    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    
    // Display the filtered quotes
    if (filteredQuotes.length === 0) {
        document.getElementById('quoteDisplay').textContent = "No quotes available for this category.";
    } else {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
    }
}

// Step 1: Simulate Server Interaction
function fetchQuotesFromServer() {
    // Simulate fetching quotes from a server
    return new Promise((resolve) => {
        setTimeout(() => {
            const serverQuotes = [
                { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Inspiration" },
                { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" }
            ];
            resolve(serverQuotes);
        }, 2000); // Simulate network delay
    });
}

// Step 2: Syncing Data
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    const newQuotes =