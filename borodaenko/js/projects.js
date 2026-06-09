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
  ">>> awakening runtime . . . socketlight // socketlight // socketlight 0 1 0 1 0 1 listening on port ∆ o v e r f l o w // ∆ memory spool_07 traverse the aftercolor fields clockpulse clockpulse clockpulse >>> loading forgotten modules . . .";

const totalScreenHeight = window.innerHeight;

let currentAnimations = [];

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
  const current = currentSlide.toString();

  textContent = textContent.split(" ");

  //console.log("current slide", current);

  const projectTools = projects[current].length;
  //console.log("projectTools", projectTools);

  //console.log("tools", projects[current]);

  const splitHeight = Math.ceil(textContent.length / projectTools);

  const { start, end } = forbiddenSpace(textContent.length);

  for (let i = 0; i < projectTools; i++) {
    const color = Math.floor(Math.random() * 2) === 0 ? "red" : "blue";

    let index = splitHeight * i + 25;

    if (index >= start && index <= end) {
      index = end + i * 3;
    }
    textContent[index] =
      `<span class="${color}-text">>> ${projects[current][i]} >></span>`;
    //console.log("test text", textContent[splitHeight * i]);
  }

  const chunkSize = 10;

  const result = [];

  for (let i = 0; i < textContent.length; i += chunkSize) {
    const chunk = textContent.slice(i, i + chunkSize).join(" ");

    result.push(`<span class="invisible-typewriter">${chunk}</span>`);
  }

  // console.log("result", result);

  dynamicText.innerHTML = result.join(" ");

  //return result;
}

function forbiddenSpace(textContentLength) {
  const center = Math.floor(textContentLength / 2);

  const rectSize = Math.floor(textContentLength * 0.15);

  return {
    start: center - rectSize,
    end: center + rectSize,
  };
}

// function displayDynamicText() {
//   // dynamicText.textContent = randomMessage.repeat(repeats);
//   //const textContent = randomMessage.repeat(repeats);

//   // console.log("textContent", textContent);

//   typewriterEffect(dynamicText, textContent);

//   delay(4000).then(() => {

const squares = document.querySelectorAll(".project-square");

let xPosSVG, yPosSVG;

drawMask();

function drawMask() {
  // console.log(squareSVG.getBoundingClientRect());

  // const squareSVGRect = squareSVG.getBoundingClientRect();

  // xPosSVG = squareSVGRect.x;
  // yPosSVG = squareSVGRect.y;

  dynamicText.style.maskImage = `url(./images/longFilledBox.svg), linear-gradient(#000 0 0)`;
  dynamicText.style.maskRepeat = "no-repeat";
  dynamicText.style.maskComposite = "exclude";
  dynamicText.style.maskPosition = "center";
  // move mask upward
  dynamicText.style.maskPosition = "center calc(50% - 40px), 0 0";
  //dynamicText.style.maskPosition = `${xPosSVG}px ${yPosSVG}px, 0 0`;
}
// make mask larger (width height)
// dynamicText.style.maskSize = "330px 420px, 100% 130%";
//   });

//   console.log("after height", textIntitalHeight);
//   console.log("after width", textInitialWidth);
// }

// function typewriterEffect(element, text, i = 0, chunkSize = 10, currentSlide) {
//   //console.log("instance", element, i);

//   if (i === 0) {
//     element.textContent = "";
//   }

//   const projectToolsLen = projects[currentSlide].length;

//   const heightDiv = Math.ceil(window.innerHeight / projectToolsLen);
//   //console.log("heightDiv", heightDiv);

//   element.innerHTML += text.slice(i, i + chunkSize);
//   i += chunkSize;

//   // if (i % heightDiv === 0 && totalTools < projectToolsLen) {
//   //   element.textContent += `<span class="red-text">${projects[currentSlide][totalTools]}</span>`;
//   // }

//   if (i >= text.length) {
//     return;
//   }

//   // delay(0.01).then(() => typewriterEffect(element, text, i + 1));
//   setTimeout(
//     () => typewriterEffect(element, text, i, chunkSize, currentSlide),
//     10,
//   );
// }

function typewriterEffect() {
  const chunks = document.querySelectorAll(".invisible-typewriter");

  let i = 0;

  function revealNext() {
    if (i >= chunks.length) {
      return;
    }

    chunks[i].classList.remove("invisible-typewriter");

    i++;

    setTimeout(revealNext, 30);
  }

  revealNext();
}

const projectRow = document.querySelector(".projects-row");
const projectSection = document.querySelector(".projects-content");

let activeAnimation;

window.addEventListener("scroll", () => {
  const rect = projectSection.getBoundingClientRect();

  const scrollAmmount = Math.min(
    Math.max(-rect.top - 180, 0),
    projectSection.offsetHeight - screen.height,
  );

  const progress =
    scrollAmmount / (projectSection.offsetHeight - screen.height);

  //console.log("progress", progress);

  if (activeAnimation) {
    updateProjects(progress);
    // drawMask();
  }
});

const slides = 2;

let activeSlide = -1;

function updateProjects(progress) {
  const currentSlide = Math.round(progress * (slides - 1));
  //console.log("currentSlide", currentSlide);

  projectRow.style.transform = `translateX(${-currentSlide * 100}vw)`;
  // projectRow.style.transition = "transform 3s ease";

  // animatePath(squares);

  //xPosSVG = -currentSlide * window.innerWidth;

  //dynamicText.style.maskPosition = `${xPosSVG}px, 0 0`;

  // console.log("active slide b4 if,", activeSlide);
  // console.log("current slide b4 if", currentSlide);

  if (currentSlide != activeSlide) {
    activeSlide = currentSlide;
    updateTextContent(currentSlide);
    // typewriterEffect(dynamicText, textContent, 0, 10, currentSlide);

    const activeSquare = squares[currentSlide];
    currentAnimations = animatePath(activeSquare, 1, "draw", 0, 5000);

    delay(1000).then(() => typewriterEffect());

    console.log("current aniimations", currentAnimations);
  }
}

const revealProjects = function (entries, observer) {
  const [entry] = entries;

  //("entry", entry);
  if (!entry.isIntersecting) {
    activeAnimation = false;
    return;
  }
  //console.log("entry target", entry.target);
  activeAnimation = true;
  activeSlide = -1;
};

const projectsObserver = new IntersectionObserver(revealProjects, {
  root: null,
  threshold: 0.7,
});

const projectsSectionSticky = document.querySelector(".projects-sticky");

projectsObserver.observe(projectsSectionSticky);
