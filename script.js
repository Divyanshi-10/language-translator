const languages = {
    en: "English",
    hi: "Hindi",
    fr: "French",
    es: "Spanish",
    de: "German",
    ja: "Japanese"
};
const sourceLang = document.getElementById("sourceLang");

const targetLang = document.getElementById("targetLang");

for (let code in languages) {

    sourceLang.innerHTML +=
        `<option value="${code}">
            ${languages[code]}
        </option>`;

    targetLang.innerHTML +=
        `<option value="${code}">
            ${languages[code]}
        </option>`;
}

sourceLang.value = "en";
targetLang.value = "hi";

const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const swapBtn = document.getElementById("swapBtn");
const themeBtn = document.getElementById("themeBtn");
const speakBtn = document.getElementById("speakBtn");

const history = [];

translateBtn.addEventListener("click", async function () {

    const inputText =
        document.getElementById("inputText").value;

    const sourceLanguage = sourceLang.value;

    const targetLanguage = targetLang.value;

    document.getElementById("outputText").value = "Translating...";

    const response = await fetch(
        "https://language-translator-production-aaf8.up.railway.app",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: inputText,
                source: sourceLanguage,
                target: targetLanguage
            })
        }
    );

    const data = await response.json();

    document.getElementById("outputText").value =
        data.translatedText;

    history.push({
        original: inputText,
        translated: data.translatedText
    });

    console.log(history);

    const historyList =
    document.getElementById("historyList");

historyList.innerHTML = "";

for (let item of history) {

    historyList.innerHTML +=
        `<li>
            ${item.original} → ${item.translated}
        </li>`;
}

});   // ← THIS closes Translate


copyBtn.addEventListener("click", function () {

    const translatedText =
        document.getElementById("outputText").value;

    navigator.clipboard.writeText(translatedText);

    alert("Translation copied!");

});


swapBtn.addEventListener("click", function () {

    const temp = sourceLang.value;

    sourceLang.value = targetLang.value;

    targetLang.value = temp;

});

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.textContent = "☀️ Light Mode";

    } else {

        themeBtn.textContent = "🌙 Dark Mode";

    }

});

speakBtn.addEventListener("click", function () {

    // STEP 1: get text from output box
    const translatedText =
        document.getElementById("outputText").value;

    // STEP 2: stop if empty
    if (!translatedText || translatedText === "Translation appears here") {
        alert("Nothing to speak!");
        return;
    }

    // STEP 3: create speech object
    const speech = new SpeechSynthesisUtterance(translatedText);

    // STEP 4: reset old speech (IMPORTANT FIX) stops any previous speech immediately clears speech queue
    window.speechSynthesis.cancel();

    // STEP 5: set language (optional but good)
    const speechLanguages = {
    en: "en-US",
    hi: "hi-IN",
    fr: "fr-FR",
    es: "es-ES",
    de: "de-DE",
    ja: "ja-JP"
};

speech.lang = speechLanguages[targetLang.value];

    // STEP 6: speak
    window.speechSynthesis.speak(speech);
});