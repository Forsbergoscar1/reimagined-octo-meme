const database = {
    "KTAAAOEPEEEEA": "KGB är efter mig",
    "k t a a a o e p e e e e a": "KGB är efter mig",
    "211641718197121206291820": "Uppdrag slutfört",
    "21 16 16 4 18 1 7 19 12 21 20 6 29 18 20": "Uppdrag slutfört",
    "42941652051811251912518": "Döda Peter Kessler",
    "4 29 4 1 16 5 20 5 18 11 5 19 19 12 5 18": "Döda Peter Kessler",
    "XN-i7 t-p f3 13:10 - 14:10 a no xch": "Särskild sändebud ankommer Hamburg–Paris natten 13-14 oktober. Säkerställ mottagande och vidare bekräftelse. Ingen extern kommunikation."
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
