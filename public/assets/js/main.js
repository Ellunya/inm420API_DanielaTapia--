const API_KEY = "a5d5d342-1c13-4fa9-a925-9c4645c82919"; 
const BASE_URL = "https://www.dictionaryapi.com/api/v3/references/sd3/json/";

async function getWordDefinition(word) {
    try {
        const response = await fetch(`${BASE_URL}${word}?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching word definition:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("wordForm");
    const resultDiv = document.getElementById("result");
    const wordInput = document.getElementById("wordInput");

    if (!form || !resultDiv || !wordInput) {
        console.error("One or more elements are missing from the DOM.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const word = wordInput.value.trim();
        if (!word) {
            displayResult("Please enter a word.");
            return;
        }

        displayResult("Loading... (˶˃ ᵕ ˂˶) .ᐟ.ᐟ");
        const definition = await getWordDefinition(word);

        if (definition && Array.isArray(definition) && definition.length > 0) {
            if (typeof definition[0] === "object" && definition[0].shortdef) {
                displayResult(word, definition[0].shortdef[0]);
            } else {
                displayResult("No definition found. Did you mean: " + definition.join(", ") + "?");
            }
        } else {
            displayResult("No definition found.");
        }
    });

    function displayResult(word, definition) {
        if (!definition) {
            resultDiv.innerHTML = `<p>${word}</p>`;
        } else {
            resultDiv.innerHTML = `
                <p id="wrdTitle">${word}</p>
                <p id="wrdDef"><span>Definition:<br></span> ${definition}</p>
            `;
        }
    }
});
