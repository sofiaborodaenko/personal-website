"use strict";

const dynamicText = document.querySelector(".dynamic-text");
const textIntitalHeight = dynamicText.getBoundingClientRect().height;
const textInitialWidth = dynamicText.getBoundingClientRect().width;

const totalLines = Math.ceil(screen.height / textIntitalHeight);
const messagesPerLine = Math.ceil(screen.width / textInitialWidth);

const randomMessage =
  ">>> awakening runtime . . . socketlight // socketlight // socketlight 0 1 0 1 0 1 >>> listening on port ∆ o v e r f l o w // ∆ memory spool_07 traverse the aftercolor fields clockpulse clockpulse clockpulse >>> loading forgotten modules . . .";

const totalScreenHeight = screen.height;

console.log("equation", totalLines * messagesPerLine);
console.log("length", randomMessage.length);

displayDynamicText();

function displayDynamicText() {
  dynamicText.textContent = randomMessage.repeat(totalLines * messagesPerLine);
}
