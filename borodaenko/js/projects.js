"use strict";

import { projects } from "./data.js";
import { animatePath } from "./animate.js";
import { delay } from "./animate.js";

const dynamicText = document.querySelector(".dynamic-text");
const textIntitalHeight = dynamicText.getBoundingClientRect().height;
const textInitialWidth = dynamicText.getBoundingClientRect().width;

const totalLines = Math.ceil(window.innerHeight / textIntitalHeight);
const messagesPerLine = Math.ceil(window.innerWidth / textInitialWidth);

const projectsSectionSticky = document.querySelector(".projects-sticky");
const projectRow = document.querySelector(".projects-row");
const projectSection = document.querySelector(".projects-content");

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

  const projectTools = projects[current].length - 2;
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
      `<span class="${color}-text">>> ${projects[current][i + 2]} >></span>`;
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

function populateProjectsRow(projects) {
  // projectRow.innerHTML = "";
  projects.forEach((project, index) => {
    projectRow.innerHTML += ` 
              <div class="project-square">
              <div class="project-images">
                <svg
                  width="283"
                  height="244"
                  viewBox="0 0 283 244"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="project-border"
                >
                  <path
                    d="M261.175 5.66267C259.009 4.32934 252.475 1.76267 243.675 2.16267C234.875 2.56267 181.675 1.66261 156.175 1.16258H72.1752C50.6752 0.662582 8.87525 -0.037418 13.6753 1.16258C10.8419 1.49592 5.17524 3.8626 5.17524 10.6626L4.17524 53.1626L3.17524 110.163C2.00858 119.996 -0.124757 140.863 0.675243 145.663L2.17523 190.663L4.17523 211.163C4.50857 215.996 8.27523 226.063 20.6752 227.663L55.1752 238.163L103.175 239.663L158.175 241.663C173.509 242.329 208.675 243.463 226.675 242.663L249.675 241.663C254.009 239.996 263.875 234.863 268.675 227.663C273.475 220.463 276.342 216.329 277.175 215.163C279.009 210.829 282.475 198.963 281.675 186.163L282.175 157.663L281.675 127.663C280.675 110.829 278.875 74.9626 279.675 66.1626L277.675 20.1626C277.175 14.9959 274.575 5.1626 268.175 7.1626"
                    stroke="black"
                    stroke-width="4.5"
                    stroke-linecap="round"
                    class="draw-path"
                  />
                </svg>

                <svg
                  width="254"
                  height="312"
                  viewBox="0 0 254 312"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="project-illustration"
                >
                  <path
                    d="M222.825 24.0322V2.03223L66.3252 4.53223C57.9918 8.69889 38.7252 21.6322 28.3252 40.0322C24.6585 43.5322 14.5252 53.1322 3.32515 63.5322V171.032C2.32516 191.199 0.925172 241.032 3.32515 279.032L26.3251 279.386M66.3252 4.53223V63.5322H3.32515M197.325 279.032C190.925 281.032 173.658 281.532 165.825 281.532L26.3251 279.386M215.825 270.032V213.532C210.625 205.932 213.658 175.366 215.825 161.032C217.025 153.032 220.992 89.3656 222.825 58.5322V24.0322M26.3251 279.386V307.032L36.3251 299.532H55M55 299.532L98.3251 295.532H134.825H148.825C180.825 291.699 242.825 286.332 234.825 295.532V202.532L234.979 96.0322C235.733 87.4397 238.48 52.3385 239.098 40.0322M55 299.532V309.032L249.212 301.098C249.873 251.914 250.243 233.839 250.903 184.656C253.338 173.197 248.987 142.713 249.212 129.378L250.59 42.1475C243.391 42.1475 246.297 40.0322 239.098 40.0322M222.825 24.0322C222.825 24.0322 229.726 24.0322 239.098 24.0322V40.0322M32.3251 128.032C81.3251 125.699 178.825 121.732 176.825 124.532C178.492 124.532 181.325 125.232 179.325 128.032M28.3252 161.032L179.325 158.032M32.3251 213.532C83.9918 209.199 186.825 203.532 184.825 215.532"
                    stroke="black"
                    stroke-width="4.5"
                    stroke-linecap="round"
                    class="draw-path"
                  />
                </svg>

                <video autoplay muted loop playsinline class="project-video">
                  <source
                    src="./images/projects//demoVideos/File SorterDemo.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              <p class="reenie-beanie-regular-notes ">${project[0]}</p>
            </div>`;
  });
}

populateProjectsRow(projects);

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

const slides = projects.length;

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

  document.querySelectorAll(".project-images").forEach((images) => {
    images.classList.remove("playing");

    const video = images.querySelector(".project-video");

    video.pause();
    video.currentTime = 0;
  });


  console.log("active slide curr", currentSlide);
  console.log("active slide activ ", activeSlide);

  if (currentSlide != activeSlide) {
    activeSlide = currentSlide;
    updateTextContent(currentSlide);
    // typewriterEffect(dynamicText, textContent, 0, 10, currentSlide);

    const activeSquare = squares[currentSlide];
    // currentAnimations = animatePath(activeSquare, 1, "draw", 0, 5000);

    // const images = activeSquare.querySelector(".project-images");
    // const video = activeSquare.querySelector(".project-video");
    // const illustration = activeSquare.querySelector(".project-illustration");

    activateProject(activeSquare);

    delay(1000).then(() => typewriterEffect());

    // setTimeout(() => {
    //   animatePath(illustration, 1, "erase", 0, 5000);

    //   images.classList.add("playing");

    //   video.currentTime = 0;
    //   video.play();
    // }, 4000);
  }
}

async function activateProject(activeSquare) {
  const images = activeSquare.querySelector(".project-images");
  const video = activeSquare.querySelector(".project-video");
  const illustration = activeSquare.querySelector(".project-illustration");

  await animatePath(activeSquare, 1, "draw", 0, 5000);

  await delay(1000);

  images.classList.add("playing");

  video.currentTime = 0;
  video.play();
}

async function deactivateProject(activeSquare) {
  const images = square.querySelector(".project-images");
  const illustration = square.querySelector(".project-illustration");
  const video = square.querySelector(".project-video");

  images.classList.remove("playing");

  video.pause();
  video.currentTime = 0;

  await animatePath(illustration, 1, "erase", 0, 5000);
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

projectsObserver.observe(projectsSectionSticky);
