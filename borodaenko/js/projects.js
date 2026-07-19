"use strict";

import { projects, projectsSvgs } from "./data.js";
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

const projectImagesVideos = document.querySelectorAll(".project-images");
let projectBorderRect;

const randomMessage =
  ">>> awakening runtime . . . socketlight // socketlight // socketlight 0 1 0 1 0 1 listening on port ∆ o v e r f l o w // ∆ memory spool_07 traverse the aftercolor fields clockpulse clockpulse clockpulse >>> loading forgotten modules . . .";

let currentAnimations = [];

// use window.innerHeight (visible viewport), not screen.height (physical
// device screen) — screen.height is often taller than the visible viewport
// on mobile, which threw off repeat count and the scroll-progress math below
// const repeats = Math.ceil(window.innerHeight / dynamicText.scrollHeight) + 2;

// displayDynamicText();

let repeats = calculateRepeats();

window.addEventListener("resize", () => {
  repeats = calculateRepeats();
  drawMask();
});

function calculateRepeats() {
  let repeat = 1;

  while (true) {
    dynamicText.textContent = randomMessage.repeat(repeat);

    if (dynamicText.scrollHeight >= window.innerHeight * 1.2) return repeat;

    repeat++;
  }
}

let currentSlide;

let activeAnimation;

const slides = projects.length;

let activeSlide = -1;

let playTimeout = null;

let squares;

function populateProjectsRow(projects) {
  projectRow.innerHTML = "";
  projects.forEach((project, index) => {
    projectRow.innerHTML += ` 
              <div class="project-square">
              <a class="project-images" href="${project[2]}" target="_blank">
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

                ${projectsSvgs[project[0]]}

                ${
                  project[1] === "true"
                    ? `
    <video autoplay muted loop playsinline class="project-video">
      <source
        src="./images/projects/demoVideos/${project[0]}Demo.mp4"
        type="video/mp4"
      />
    </video>
  `
                    : ""
                }
                
              </a>

              <p class="reenie-beanie-regular-notes ">${project[0]}</p>
            </div>`;
  });
}

function updateTextContent(currentSlide) {
  let textContent = randomMessage.repeat(repeats);
  const current = currentSlide.toString();

  const projectTools = projects[current].length - 3;

  const words = textContent.split(" ");

  dynamicText.innerHTML = words
    .map((word, i) => `<span class="bg-word" data-index="${i}">${word}</span>`)
    .join(" ");

  const safeIndices = getSafeWordIndices(currentSlide);
  console.log("safeword ind", safeIndices);

  const spacing = safeIndices.length / projectTools;

  console.log("spacing", spacing);

  for (let i = 0; i < projectTools; i++) {
    let safeIndex = safeIndices[Math.floor(i * spacing)];

    const targetWord = dynamicText.querySelector(`[data-index="${safeIndex}"]`);

    targetWord.outerHTML = createToolKeyword(projects[current][i + 3], i);
  }

  typewriterSpans();
}

function typewriterSpans() {
  const splitWords = [...dynamicText.querySelectorAll(".bg-word")];

  const semiCleanWords = [];

  // keeps either the text or the entire element <- for the typewriter spans
  splitWords.forEach((word) => {
    if (word.classList.contains("tool-letter")) {
      semiCleanWords.push(`${word.outerHTML}`);
    } else {
      semiCleanWords.push(word.innerHTML);
    }
  });

  console.log(semiCleanWords);

  if (projects[currentSlide][1] === "true") {
    semiCleanWords[0] = `<span class="">>> Demo Video Loading... </span>`;
    // wordIndex = 15;
  } else {
    semiCleanWords[0] = `<span class="">>> Click To Learn More... </span>`;
    // wordIndex = 15;
  }

  const chunkSize = 10; // TODO: need to increase if size of computer is large

  const result = [];

  for (let i = 0; i < semiCleanWords.length; i += chunkSize) {
    const chunk = semiCleanWords.slice(i, i + chunkSize).join(" ");

    result.push(`<span class="invisible-typewriter">${chunk}</span>`);
  }

  dynamicText.innerHTML = result.join(" ");
}

function createToolKeyword(tool, projIndex) {
  const color = Math.floor(Math.random() * 2) === 0 ? "red" : "blue";

  const letters = tool
    .split("")
    .map(
      (letter, index) => `
      <div class="tool-letter bg-word" style="--i:${index}; --w:${projIndex}">
        <div class="tool-letter-inner">
          <div class="letter-top">${letter}</div>
          <div class="letter-bottom ${color === "red" ? "blue" : "red"}-text">${letter}</div>
        </div>
      </div>
    `,
    )
    .join("");

  return letters;
}

function getSafeWordIndices(current) {
  const forbidden = getForbiddenRect(current);

  console.log("forbidden", forbidden);
  const words = [...dynamicText.querySelectorAll(".bg-word")];

  return words
    .map((word, index) => {
      // if (word.innerHTML === "socketlight") {
      const rect = word.getBoundingClientRect();

      const localTop = rect.top - dynamicText.getBoundingClientRect().top;

      const localBottom = rect.bottom - dynamicText.getBoundingClientRect().top;

      const localLeft = rect.left - dynamicText.getBoundingClientRect().left;

      const localRight = rect.right - dynamicText.getBoundingClientRect().left;

      const overlaps =
        localBottom > forbidden.top &&
        localTop < forbidden.bottom &&
        localRight > forbidden.left &&
        localLeft < forbidden.right;

      return word.innerHTML === "socketlight" && !overlaps ? index : null; // only keeps the longest word in the text and if it doesnt overlap
      // }
    })
    .filter((index) => index !== null);
}

function getForbiddenRect(current) {
  const textRect = dynamicText.getBoundingClientRect();
  const projectRect = squares[current]
    .querySelector(".project-border")
    .getBoundingClientRect();

  const padding = 100;

  console.log("forbidden rect rect", projectRect);

  return {
    top: projectRect.top - textRect.top - padding,
    bottom: projectRect.bottom - textRect.top + padding,
    left: projectRect.left - textRect.left - padding,
    right: projectRect.right - textRect.left + padding,
  };
}

function forbiddenSpace(textContentLength) {
  const center = Math.floor(textContentLength / 2);

  const rectSize = Math.floor(textContentLength * 0.25);

  return {
    start: center - rectSize,
    end: center + rectSize,
  };
}

function resetProjectSection() {
  clearTimeout(playTimeout);
  removeAllVideos();
  dynamicText.innerHTML = "";
  activeSlide = -1;
  projectsSectionSticky.classList.add("hidden");
  console.log(projectRow);
  // projectImagesVideos.forEach((square) => {
  //   square.style.pointerEvents = "none";
  // });
  deactivateProject(squares[currentSlide]);
}

function drawMask() {
  const textRect = dynamicText.getBoundingClientRect();
  const projectRect = projectBorderRect.getBoundingClientRect();

  const x = projectRect.left - textRect.left;
  const y = projectRect.top - textRect.top;

  dynamicText.style.maskImage = `url(./images/longFilledBox.svg), linear-gradient(#000 0 0)`;

  dynamicText.style.maskRepeat = "no-repeat";
  dynamicText.style.maskComposite = "exclude";

  dynamicText.style.maskPosition = `${x - 12}px ${y - 5}px, 0 0`;
}

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

function removeAllVideos() {
  projectImagesVideos.forEach((images) => {
    images.classList.remove("playing");

    const video = images.querySelector(".project-video");

    if (video !== null) {
      video.pause();
      video.currentTime = 0;
    }
  });
}

async function updateProjects(progress) {
  currentSlide = Math.round(progress * (slides - 1));
  //console.log("currentSlide", currentSlide);

  projectRow.style.transform = `translateX(${-currentSlide * 100}vw)`;
  // deactivateProject(squares[currentSlide]);

  if (currentSlide != activeSlide) {
    if (activeSlide !== -1) {
      await deactivateProject(squares[activeSlide]);
    }

    activeSlide = currentSlide;

    updateTextContent(activeSlide);
    // typewriterEffect(dynamicText, textContent, 0, 10, currentSlide);

    await activateProject(squares[activeSlide]);

    delay(1000).then(() => typewriterEffect());
  }
}

async function activateProject(activeSquare) {
  const images = activeSquare.querySelector(".project-images");
  const video = activeSquare.querySelector(".project-video");
  const illustration = activeSquare.querySelector(".project-illustration");

  animatePath(activeSquare, 1, "draw", 0, 5000);

  if (video && video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
    clearTimeout(playTimeout);

    playTimeout = setTimeout(() => {
      images.classList.add("playing");
      video.currentTime = 0;
      video.play();
    }, 3000);
  }
}

async function deactivateProject(activeSquare) {
  if (activeSquare) {
    const images = activeSquare.querySelector(".project-images");
    const illustration = activeSquare.querySelector(".project-illustration");
    const video = activeSquare.querySelector(".project-video");

    images.classList.remove("playing");

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    animatePath(images, 1, "erase", 0, 3000);
  }
}

const revealProjects = function (entries, observer) {
  const [entry] = entries;

  //("entry", entry);
  if (!entry.isIntersecting) {
    activeAnimation = false;
    resetProjectSection();
    return;
  }
  //console.log("entry target", entry.target);
  activeAnimation = true;
  activeSlide = -1;
  projectsSectionSticky.classList.remove("hidden");
  // projectRow.style.pointerEvents = "pointer";

  console.log("sqyares", squares);
};

const projectsObserver = new IntersectionObserver(revealProjects, {
  root: null,
  threshold: 0.7,
});

projectsObserver.observe(projectsSectionSticky);

window.addEventListener(
  "scroll",
  () => {
    const rect = projectSection.getBoundingClientRect();

    const scrollAmmount = Math.min(
      Math.max(-rect.top - 180, 0),
      projectSection.offsetHeight - window.innerHeight,
    );

    const progress =
      scrollAmmount / (projectSection.offsetHeight - window.innerHeight);

    //console.log("progress", progress);

    if (activeAnimation) {
      updateProjects(progress);
      // drawMask();
    }
  },
  { passive: true },
);

function initProjects() {
  populateProjectsRow(projects);
  projectBorderRect = document.querySelector(".project-border");
  squares = document.querySelectorAll(".project-square");
  drawMask();
}

initProjects();
