function checkPassword() {
    const password = document.getElementById("password").value;
    const bar = document.getElementById("bar");
    const result = document.getElementById("result");
    const details = document.getElementById("details");
    const crackTime = document.getElementById("crackTime");

    if (!password) {
        bar.style.width = "0%";
        result.textContent = "";
        details.textContent = "";
        crackTime.textContent = "";
        return;
    }

    // ===== CHARACTER SET DETECTION =====
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charset += 32;

    const length = password.length;

    // ===== ENTROPY CALCULATION =====
    const combinations = Math.pow(charset, length);

    // Assume strong GPU cracking speed
    const guessesPerSecond = 1e9;

    const seconds = combinations / guessesPerSecond;

    crackTime.textContent =
        "⏳ Crack time: " + formatTime(seconds);

    // ===== STRENGTH SCORE =====
    let score = 0;
    if (length >= 6) score++;
    if (length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Cap at 4 levels
    score = Math.min(score, 4);

    bar.style.width = (score * 25) + "%";

    // ===== HACKER STYLE OUTPUT =====
    if (score <= 1) {
        bar.style.background = "#ff2e2e";
        result.textContent = "Weak Password ❌";
        details.textContent = "System breach possible instantly.";
    }
    else if (score === 2) {
        bar.style.background = "#ff9d00";
        result.textContent = "Moderate ⚠️";
        details.textContent = "Dictionary attack vulnerable.";
    }
    else if (score === 3) {
        bar.style.background = "#f1ff00";
        result.textContent = "Strong 🛡";
        details.textContent = "Brute-force resistant.";
    }
    else {
        bar.style.background = "#00ff9c";
        result.textContent = "Elite Security 🔐";
        details.textContent = "Military-grade encryption level.";
    }
}

// ===== TIME FORMATTER =====
function formatTime(seconds) {
    if (!isFinite(seconds) || seconds <= 0)
        return "instant";

    if (seconds < 60)
        return Math.round(seconds) + " seconds";

    if (seconds < 3600)
        return Math.round(seconds / 60) + " minutes";

    if (seconds < 86400)
        return Math.round(seconds / 3600) + " hours";

    if (seconds < 31536000)
        return Math.round(seconds / 86400) + " days";

    if (seconds < 3153600000)
        return Math.round(seconds / 31536000) + " years";

    if (seconds < 3.1536e11)
        return Math.round(seconds / 3.1536e9) + " decades";

    if (seconds < 3.1536e13)
        return Math.round(seconds / 3.1536e11) + " centuries";

    return "Millions of years 💀";
}

