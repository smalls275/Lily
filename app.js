"use strict";

const helloButton = document.querySelector("#hello-button");
const result = document.querySelector("#js-result");

function sayHello(name) {
  return "Hello, " + name + "! You just ran JavaScript.";
}

function showResult(message) {
  if (result) {
    result.textContent = message;
  }
}

if (helloButton) {
  helloButton.addEventListener("click", () => showResult(sayHello("Lily")));
}

async function checkPythonServer() {
  const status = document.querySelector("#server-status");
  if (!status) return;

  try {
    const response = await fetch("/api/health");
    if (!response.ok) throw new Error("Server returned " + response.status);
    const data = await response.json();
    status.textContent = data.message;
  } catch (error) {
    status.textContent = "Open with Python for the server lesson";
  }
}

checkPythonServer();