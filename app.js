"use strict";

const helloButton = document.querySelector("#hello-button");
const result = document.querySelector("#js-result");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const htmlEditor = document.querySelector("#html-editor");
const htmlPreview = document.querySelector("#html-preview");
const defaultHtml = htmlEditor ? htmlEditor.value : "";
const lessonIds = ["html", "javascript", "python"];

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

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem("lily-coding-progress")) || {};
  } catch (error) {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem("lily-coding-progress", JSON.stringify(progress));
  } catch (error) {
    // Progress still works for this visit when storage is unavailable.
  }
}

function updateProgress() {
  const progress = loadProgress();
  const completed = lessonIds.filter((id) => progress[id]).length;

  document.querySelectorAll("[data-mark]").forEach((button) => {
    const lesson = button.closest("[data-lesson]");
    const isComplete = Boolean(progress[button.dataset.mark]);
    button.textContent = isComplete ? "Explored ✓" : "Mark explored";
    if (lesson) lesson.classList.toggle("is-complete", isComplete);
  });

  if (progressLabel) progressLabel.textContent = completed + " of 3 lessons explored";
  if (progressBar) progressBar.style.width = (completed / lessonIds.length) * 100 + "%";
}

document.querySelectorAll("[data-mark]").forEach((button) => {
  button.addEventListener("click", () => {
    const progress = loadProgress();
    const id = button.dataset.mark;
    progress[id] = !progress[id];
    saveProgress(progress);
    updateProgress();
  });
});

function renderHtmlPreview() {
  if (!htmlPreview || !htmlEditor) return;
  htmlPreview.srcdoc = htmlEditor.value;
}

if (htmlEditor) {
  htmlEditor.addEventListener("input", renderHtmlPreview);
}

const resetHtml = document.querySelector("#reset-html");
if (resetHtml) {
  resetHtml.addEventListener("click", () => {
    htmlEditor.value = defaultHtml;
    renderHtmlPreview();
  });
}

updateProgress();
renderHtmlPreview();

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