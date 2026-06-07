"use strict";

import { projects } from "./data.js";
import { animatePath } from "./animate.js";
import { delay } from "./animate.js";

const dynamicText = document.querySelector(".dynamic-text");
const textIntitalHeight = dynamicText.getBoundingClientRect().height;
const textInitialWidth = dynamicText.getBoundingClientRect().width;

const totalLines = Math.ceil(window.innerHeight / textIntitalHeight);
const messagesPerLine = Math.ceil(window.innerWidth / textInitialWidth);

const randomMessage =
  ">>> awakening runtime . . . socketlight // socketlight // socketlight 0 1 0 1 0 1 >>> listening on port ∆ o v e r f l o w // ∆ memory spool_07 traverse the aftercolor fields clockpulse clockpulse clockpulse >>> loading forgotten modules . . .";

const totalScreenHeight = window.innerHeight;

// console.log("initial height", textIntitalHeight);
// console.log("initial width", textInitialWidth);
// console.log("equation", totalLines * messagesPerLine);
// console.log("length", randomMessage.length);

// console.log("dynamic text scroll hegiht", dynamicText.scrollHeight);

// use either screen.height or window.innerHeight
const repeats = Math.ceil(screen.height / dynamicText.scrollHeight) + 2;

// displayDynamicText();

function updateTextContent(currentSlide) {
  let textContent = randomMessage.repeat(repeats);

  // console.log("current slide", currentSlide);

  // const projectTools = projects[currentSlide].length;
  // console.log("projectTools", projectTools);

  // console.log("tools", projects[currentSlide][0]);

  // const splitHeight = Math.ceil(textContent.length / projectTools);
  
  // for (let i = 0; i < projectTools; i++) {
  //   textContent[splitHeight * i] = `<span class="red">>>> ${projects[currentSlide][i]} >>></span>`;
  //   console.log("test text", textContent[splitHeight * i]);
  // }

  return textContent;
}

// function displayDynamicText() {
//   // dynamicText.textContent = randomMessage.repeat(repeats);
//   //const textContent = randomMessage.repeat(repeats);

//   // console.log("textContent", textContent);

//   typewriterEffect(dynamicText, textContent);

//   delay(4000).then(() => {
//     dynamicText.style.maskImage = `url(./images/filledRect.svg), linear-gradient(#000 0 0)`;
//     dynamicText.style.maskRepeat = "no-repeat";
//     dynamicText.style.maskComposite = "exclude";
//     dynamicText.style.maskPosition = "center";
//   });

//   console.log("after height", textIntitalHeight);
//   console.log("after width", textInitialWidth);
// }

function typewriterEffect(element, text, i = 0, chunkSize = 10, currentSlide, totalText = 0, totalTools = 0) {
  if (i === 0) {
    element.textContent = "";
  }

  const projectToolsLen = projects[currentSlide].length;

  const heightDiv = Math.ceil(window.innerHeight / projectToolsLen);
  console.log("heightDiv", heightDiv);

  element.textContent += text.slice(i, i + chunkSize);
  i += chunkSize;

  if (i % heightDiv === 0 && totalTools < projectToolsLen) {
    element.textContent += `<span class="red-text">${projects[currentSlide][totalTools]}</span>`;
  }

  if (i >= text.length - 1) {
    return;
  }

  // delay(0.01).then(() => typewriterEffect(element, text, i + 1));
  setTimeout(() => typewriterEffect(element, text, i, chunkSize, currentSlide, totalText+=chunkSize, totalTools += 1), 10);
}

const projectRow = document.querySelector(".projects-row");
const projectSection = document.querySelector(".projects-content");

window.addEventListener("scroll", () => {
  const rect = projectSection.getBoundingClientRect();

  const scrollAmmount = Math.min(
    Math.max(-rect.top - 180, 0),
    projectSection.offsetHeight - screen.height,
  );

  const progress =
    scrollAmmount / (projectSection.offsetHeight - screen.height);

  console.log("progress", progress);
  updateProjects(progress);
});

const slides = 2;

let activeSlide = -1;

function updateProjects(progress) {
  const currentSlide = Math.round(progress * (slides - 1));
  console.log("currentSlide", currentSlide);

  projectRow.style.transform = `translateX(${-currentSlide * 100}vw)`;
  projectRow.style.transition = "transform 3s ease";

  if (currentSlide != activeSlide) {
    activeSlide = currentSlide;
    let textContent = updateTextContent(currentSlide);
    typewriterEffect(dynamicText, textContent, 0, 10, currentSlide);
  }
}
