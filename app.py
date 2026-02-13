from flask import Flask, render_template, request, jsonify
import re
import math

app = Flask(__name__)

# Function to calculate password entropy
def calculate_entropy(password):
    charset = 0
    if re.search("[a-z]", password):
        charset += 26
    if re.search("[A-Z]", password):
        charset += 26
    if re.search("[0-9]", password):
        charset += 10
    if re.search("[^a-zA-Z0-9]", password):
        charset += 32

    if charset == 0:
        return 0

    entropy = len(password) * math.log2(charset)
    return round(entropy, 2)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/check", methods=["POST"])
def check_password():
    password = request.json["password"]
    entropy = calculate_entropy(password)

    if entropy < 40:
        strength = "Weak"
        color = "red"
        crack_time = "Seconds"
    elif entropy < 60:
        strength = "Medium"
        color = "orange"
        crack_time = "Minutes / Hours"
    else:
        strength = "Strong"
        color = "green"
        crack_time = "Years"

    return jsonify({
        "strength": strength,
        "entropy": entropy,
        "crack_time": crack_time,
        "color": color
    })

if __name__ == "__main__":
    app.run(debug=True)
