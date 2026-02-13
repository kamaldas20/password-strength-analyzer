function checkPassword() {
    let pwd = document.getElementById("password").value;

    fetch("/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: pwd })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.strength;
        document.getElementById("details").innerHTML =
            "Entropy: " + data.entropy + "<br>Crack Time: " + data.crack_time;

        let bar = document.getElementById("bar");

        if (data.strength === "Weak") {
            bar.style.width = "30%";
            bar.style.background = "red";
        } 
        else if (data.strength === "Medium") {
            bar.style.width = "60%";
            bar.style.background = "orange";
        } 
        else {
            bar.style.width = "100%";
            bar.style.background = "Blue";
        }
    });
}
