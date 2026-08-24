const button = document.querySelector("#test-button");
const message = document.querySelector("#test-message");

button.addEventListener("click", function () {
  message.textContent = "JavaScript działa.";
});