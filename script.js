const database = {
    "KTAAAOEPEEEEA": "KGB är efter mig",
    "k t a a a o e p e e e e a": "KGB är efter mig"
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
        if (database[input]) {
            result = database[input];
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

