"use strict";

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const heroFrame = document.querySelector(".hero-frame");
const logo = document.querySelector(".contact-github");

window.addEventListener("load", () => {
  const lastPathEnd = animatePath(heroFrame);
  //animatePath(logo);

  //const heroRevealTime = lastPathEnd + 50;

  async function revealHeroContent() {
    const heroNote = document.querySelector(".hero-note");
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");

    heroNote.classList.remove("hidden");
    heroNote.classList.add("reveal--opacity");
    await delay(500);

    heroTitle.classList.remove("hidden");
    heroTitle.classList.add("reveal--opacity");
    await delay(500);

    heroSubtitle.classList.remove("hidden");
    heroSubtitle.classList.add("reveal--opacity");
    await delay(500);
    document.body.style.overflow = "auto";
  }

  setTimeout(revealHeroContent, lastPathEnd);
  //revealHeroContent();
});

export function animatePath(
  parent,
  endStroke = 0,
  drawOrErase = "draw",
  delay = 280,
  duration = 2500,
) {
  const paths = parent.querySelectorAll(".draw-path");
  const dots = parent.querySelectorAll(".draw-dot");

  // animating the rectangle path on hero section
  paths.forEach((path, index) => {
    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    const rectAnimation = [
      {
        strokeDashoffset: `${drawOrErase === "draw" ? length : 0}`,
        fillOpacity: `${drawOrErase === "draw" ? 0 : 1}`,
        strokeOpacity: `${drawOrErase === "draw" ? 1 : 1}`,
      },
      {
        strokeDashoffset: `${drawOrErase === "draw" ? 0 : 1}`,
        fillOpacity: `${drawOrErase === "draw" ? 0 : 0}`,
        strokeOpacity: `${drawOrErase === "draw" ? 1 : 1}`,
        offset: 0.7,
      },
      {
        strokeDashoffset: `${drawOrErase === "draw" ? 0 : length}`,
        fillOpacity: `${drawOrErase === "draw" ? 1 : 0}`,
        strokeOpacity: endStroke,
      },
    ];

    const rectTiming = {
      duration: duration,
      fill: "forwards",
      delay: index * delay,
      easing: "ease",
    };

    path.animate(rectAnimation, rectTiming);
  });

  // animating the dots on hero section after the rectangle is complete
  dots.forEach((dot, index) => {
    dot.animate([{ fillOpacity: 1 }], {
      duration: 1000,
      fill: "forwards",
      delay: paths.length * 280 + index * 300,
      easing: "ease",
    });
  });

  const lastPathEnd = 2500 + (paths.length - 1) * 280;
  return lastPathEnd;
}

// animating the about me text on scroll
function textOpacityScroll() {
  const items = document.querySelectorAll(".about-me-text");

  if (items.length) {
    items.forEach((item) => {
      const itemValue = item.querySelector(".text-section__value");
      const itemMask = document.querySelector(".about-me-section__mask");

      // default values for animation speed and opacity, can be set using data attributes on the html element
      const itemSpeed = +itemValue.dataset.textSpeed || 900;
      const itemOpacity = +itemValue.dataset.textOpacity || 0;

      const words = itemValue.innerHTML.split(/(\s+|<br\s*\/?>)/);

      // wrapping each word in a span with the appropriate transition and opacity styles
      itemValue.innerHTML = words
        .map((word) => {
          if (word === "<br>") {
            return "<br>";
          } else if (word === 'class="scribble">2</span>3rd') {
            return `<span style="transition: opacity ${itemSpeed}ms; opacity: ${itemOpacity};" class="scribble">2</span><span style="transition: opacity ${itemSpeed}ms; opacity: ${itemOpacity};">3rd</span>`;
          } else {
            return `<span style="transition: opacity ${itemSpeed}ms; opacity: ${itemOpacity};">${word}</span>`;
          }
        })
        .join(" ");

      window.addEventListener("scroll", () => {
        const maskPosition =
          itemMask.getBoundingClientRect().top - window.innerHeight;
        const itemWay =
          (Math.abs(maskPosition) /
            (window.innerHeight + itemMask.offsetHeight)) *
          100;
        const itemWords = itemValue.querySelectorAll("span");
        const currentWord =
          maskPosition <= 0
            ? Math.floor((itemWords.length / 100) * itemWay)
            : -1;
        addOpacity(itemWords, currentWord);
      });

      function addOpacity(words, current) {
        words.forEach((word, index) => {
          word.style.opacity = itemOpacity;
          if (index <= current) {
            word.style.opacity = 1;
          }
        });
      }
    });
  }
}

textOpacityScroll();

const experienceSvg = document.querySelector("svg.experience-svg");
const experienceSection = document.querySelector(".experience-content");

//const experienceMask = document.querySelector(".sideline__mask");

const scroll = () => {
  const distance = window.scrollY;
  const totalDistance = experienceSection.clientHeight - window.innerHeight;

  const rect = experienceSection.getBoundingClientRect();
  //console.log("distance", totalDistance);
  //const percentage = Math.min(, 1)
  // ;

  const offset = totalDistance * 0;

  const speed = 1.8;

  const progress = Math.min(
    Math.max(-(rect.top - offset) / ((rect.height - totalDistance) * speed), 0),
    1,
  );
  //console.log("percentage", progress);

  const bottom = 100 - progress * 100;
  experienceSvg.style.clipPath = `inset(0 0 ${bottom}% 0)`;
};

scroll();
window.addEventListener("scroll", scroll);

const contact = document.querySelector(".contact-content");

const handleHover = function (e, op) {
  const [linkedinPadding, githubPadding, mailPadding, drawOrErase, endStroke] =
    this;

  const logo = e.target.closest(".contact-link-logo");

  if (!logo) return;

  const related = e.relatedTarget;
  if (related && logo.contains(related)) return;

  let link;
  let linkParent;

  //if (logo) {
  if (logo.querySelector(".linkedin")) {
    link = "linkedin";
    linkParent = document.querySelector(".linkedin");
    //padding = 0.1;
    shiftRestOfWord(link, "Left", linkedinPadding);
  }
  if (logo.querySelector(".github")) {
    link = "github";
    linkParent = document.querySelector(".github");
    
    //padding = 0.3;
    shiftRestOfWord(link, "Left", githubPadding);
  }
  if (logo.querySelector(".mail")) {
    link = "mail";
    linkParent = document.querySelector(".mail");
    //padding = 1;
    shiftRestOfWord(link, "Left", mailPadding);
  }
  //console.log("testing handler:", link);
  document.querySelector(`.inline-letter-${link}`).style.opacity =
    `${1 - endStroke}`;

  animatePath(linkParent, endStroke, drawOrErase, 280, 500);
  //document.querySelector(`.rest-${link}-shift`).style.paddingRight=`${padding}rem`;
  //}
};

contact.addEventListener("mouseover", handleHover.bind([0.6, 1, 2, "draw", 1]));
contact.addEventListener("mouseout", handleHover.bind([0, 0, 0, "erase", 0]));

function shiftRestOfWord(link, side, padding) {
  document.querySelector(`.rest-${link}-shift`).style[`padding${side}`] =
    `${padding}rem`;
}
