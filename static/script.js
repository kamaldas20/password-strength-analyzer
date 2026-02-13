function checkPassword() {
    const password = document.getElementById("password").value;
    const bar = document.getElementById("bar");
    const result = document.getElementById("result");
    const details = document.getElementById("details");

    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[@$!%*?&]/)) strength++;

    // Update bar width
    bar.style.width = (strength * 25) + "%";

    // Strength text
    if (strength <= 1) {
        bar.style.background = "red";
        result.innerText = "Weak Password";
        details.innerText = "Add uppercase, number, and symbol.";
    } 
    else if (strength === 2) {
        bar.style.background = "orange";
        result.innerText = "Medium Password";
        details.innerText = "Try adding symbols.";
    } 
    else if (strength === 3) {
        bar.style.background = "yellow";
        result.innerText = "Strong Password";
        details.innerText = "Almost perfect!";
    } 
    else {
        bar.style.background = "lime";
        result.innerText = "Very Strong Password 🔥";
        details.innerText = "Excellent security!";
    }
}

