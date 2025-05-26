const database = {
    "KTAAAOEPEEEEA": "Stasi är efter mig",
    "k t a a a o e p e e e e a": "Stasi är efter mig",
    "21206291820": "Utfört",
    "21 20 6 29 18 20": "Utfört",
    "42941115191912518": "Döda Kessler",
    "4 29 4 1 11 5 19 19 12 5 18": "Döda Kessler",
    "XN-27 T-P F3 A No XCH": "Särskild sändebud ankommer Hamburg–Paris tidig morgon 14 oktober. Säkerställ mottagande och vidare bekräftelse. Ingen extern kommunikation.",
    "X-14-K9T7-2ZP0": "Agent X-14 har ny rekrytering",
    "X-14-K9T7-2ZPo": "Agent X-14 har ny rekrytering",
    "k t a p e l e å": "Stasi är efter mig",
    "ktapeleå": "Stasi är efter mig",
    "Ktapeleå": "Stasi är efter mig",
    "K t a a a o e p e e e e a": "Stasi är efter mig",
};

const searchBox = document.getElementById("searchBox");
const resultBox = document.getElementById("result");
const logBox = document.getElementById("log");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const typeSound = document.getElementById("typeSound");

function getRandomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function simulateProgress(callback) {
    progressBar.style.display = "block";
    let width = 0;

    function updateProgress() {
        if (width >= 100) {
            progressBar.style.display = "none";
            callback();
        } else {
            width += 5;
            progress.style.width = width + "%";
            setTimeout(updateProgress, 50);
        }
    }

    updateProgress();
}

function simulateDecoding(text, element) {
    let i = 0;
    const scrambled = text
        .split("")
        .map(() => getRandomChar())
        .join("");

    element.innerHTML = scrambled;

    function writeCharacter() {
        if (i < text.length) {
            const currentText = scrambled
                .split("")
                .map((char, index) =>
                    index <= i ? text.charAt(index) : getRandomChar()
                )
                .join("");
            element.innerHTML = currentText;
            typeSound.currentTime = 0;
            typeSound.play();
            i++;
            setTimeout(writeCharacter, 50);
        }
    }
    writeCharacter();
}

function updateLog(input, result) {
    const logEntry = document.createElement("p");
    logEntry.textContent = `> ${input}: ${result}`;
    logBox.appendChild(logEntry);
}

searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const input = searchBox.value.toUpperCase().replace(/\s+/g, "").trim();
        let result;
        if (database[input] || database[searchBox.value.trim()]) {
            result = database[input] || database[searchBox.value.trim()];
        } else {
            result = "Inga resultat hittades för angiven kod.";
        }
        searchBox.value = "";
        simulateProgress(() => {
            simulateDecoding(result, resultBox);
            updateLog(input, result);
        });
    }
});
