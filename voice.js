
    const hamburger = document.getElementById('hamburger');
    const navItems = document.getElementById('nav-items');

    hamburger.addEventListener('click', () => {
        navItems.classList.toggle('active');
    });



function startVoiceInput(inputId) {
    // Create a new instance every time to avoid reuse issues
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Speech Recognition not supported in your browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const statusElement = document.getElementById("status");
    const inputField = document.getElementById(inputId);

    statusElement.innerText = "🎤 Listening...";

    // Start recognition
    recognition.start();

    recognition.onresult = function (event) {
        let spokenText = event.results[0][0].transcript.trim();

        if (inputId === "Phone") {
            spokenText = spokenText.replace(/\D/g, "");
        }

        if (inputId === "Username") {
            spokenText = spokenText.replace(/\b\w/g, (char) => char.toUpperCase());
        }

        inputField.value = spokenText;
        statusElement.innerText = "✅ Voice input completed!";
    };

    recognition.onerror = function (event) {
        console.error("Recognition error:", event.error);
        statusElement.innerText = "❌ Error: " + event.error;
        recognition.abort(); // Force stop on error
    };

    recognition.onend = function () {
        setTimeout(() => {
            statusElement.innerText = "Ready for voice input";
        }, 1500);
    };
}
