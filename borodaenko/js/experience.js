"use strict";

import { experiences } from "./data.js";
import { animatePath } from "./animate.js";
import { delay } from "./animate.js";

const container = document.querySelector(".experience-job-container");

experiences.forEach((exp) => {
  container.innerHTML += `
    <div class="work-item">
            <div class="work-item-inner">
              <div class="work-item-first-line">
                <p class="date reenie-beanie-regular-notes">
                  ${exp.date}
                </p>
                <p class="job-title caveat-header">${exp.title}</p>
              </div>
              <div class="work-item-second-line">
                <p class="company kalam-regular-body">${exp.company}</p>
              </div>
              <div class="work-item-text">
                <p class="job-about kalam-regular-body">
                  ${exp.description}
                </p>
              </div>
              <div class="work-item-skills">
                    ${exp.skills.map((s) => `<p class="work-skill reenie-beanie-regular-notes">${s}</p>`).join("")}
              </div>
            </div>
            <div class="work-status" data-status="${exp.status}">
              <p class="work-status-text reenie-beanie-regular-notes">
                ${exp.status}
              </p>
              <svg
                viewBox="0 0 105 26"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
        
              >
                <path
                  d="M7.69859 0.672797C7.50652 1.13708 7.69859 1.70454 8.21079 1.96248C8.72299 2.22042 29.083 2.37518 55.3973 2.272C96.3093 2.16883 101.623 2.272 101.239 2.94264C99.7667 5.98629 97.1416 17.2839 97.1416 20.5339V22.5458H93.8123C91.9556 22.5458 82.0957 22.0815 71.8517 21.4625C57.5741 20.6887 47.4582 20.4307 28.1226 20.4823H2.96073L3.34488 19.399C4.43331 16.6649 6.22601 8.61724 6.22601 6.39899C6.22601 4.38708 6.03394 3.97438 5.07356 3.97438C4.11319 3.97438 3.79306 4.74819 3.08878 8.72042C2.64061 11.3514 1.68023 15.4268 0.911931 17.7482C0.207655 20.0696 -0.176495 22.1847 0.079605 22.3911C0.335705 22.649 11.1559 22.7522 24.025 22.649C47.138 22.4942 50.0832 22.5974 93.044 24.9188C99.7667 25.2799 99.3825 25.5379 100.023 20.1728C100.599 15.0657 102.072 8.97835 103.672 4.59343C104.376 2.52994 104.889 0.724384 104.697 0.569622C104.505 0.41486 82.672 0.208511 56.2296 0.105337C12.8206 -0.101013 8.08274 -0.0494253 7.69859 0.672797Z"
                  class="draw-path status-box"
                 
                  
                />
              </svg>
            </div>
            <svg viewBox="0 0 962 7" fill="none" xmlns="http://www.w3.org/2000/svg" class="dashed-line">
<path d="M690.347 0.562726C670.639 0.782238 658.455 1.33102 658.455 1.98955C658.455 3.74565 725.105 2.8676 726.18 1.11151C726.539 0.45297 725.822 -0.0958109 724.389 0.0139452C723.134 0.123701 707.726 0.45297 690.347 0.562726Z"/>
<path d="M799.997 2.09971C799.997 4.07532 845.505 5.06313 847.297 3.19728C848.193 2.31923 842.997 1.98996 829.918 1.98996C819.526 1.98996 808.597 1.66069 805.551 1.33142C801.43 0.782641 799.997 1.00215 799.997 2.09971Z" />
<path d="M220.93 2.75804C207.672 2.97756 197.997 3.63609 197.997 4.18487C197.997 5.50195 208.926 5.50195 236.876 4.51414C247.984 4.18487 256.584 3.41658 256.047 2.8678C255.509 2.42878 252.464 2.09951 249.418 2.20926C246.193 2.31902 233.472 2.64829 220.93 2.75804Z"/>
<path d="M295.284 3.30696C294.926 3.85574 294.747 4.18501 295.105 4.18501C303.884 4.9533 350.289 4.9533 351.184 4.18501C351.722 3.63623 341.33 3.08745 324.13 2.86794C308.722 2.64843 295.822 2.86794 295.284 3.30696Z"/>
<path d="M540.205 3.0875C540.205 3.74603 549.522 4.18506 564.393 4.18506C579.264 4.18506 588.58 3.74603 588.58 3.0875C588.58 2.42896 579.264 1.98994 564.393 1.98994C549.522 1.98994 540.205 2.42896 540.205 3.0875Z"/>
<path d="M0.0178236 4.18465C-0.519676 4.84319 11.1262 5.17245 31.372 5.0627C49.1095 4.95294 63.622 4.51392 63.622 3.96514C63.622 2.64806 1.27199 2.86758 0.0178236 4.18465Z"/>
<path d="M116.118 3.96537C109.847 4.18489 104.83 4.73367 104.83 5.28245C104.83 6.70928 127.584 6.70928 129.018 5.3922C130.451 3.85562 128.301 3.6361 116.118 3.96537Z"/>
<path d="M411.205 4.18467C411.205 4.8432 421.597 5.28223 438.976 5.28223C456.355 5.28223 466.747 4.8432 466.747 4.18467C466.747 3.52613 456.355 3.0871 438.976 3.0871C421.597 3.0871 411.205 3.52613 411.205 4.18467Z"/>
<path d="M915.56 4.18467C916.276 4.8432 925.951 5.28223 939.03 5.28223C952.647 5.28223 961.247 4.8432 961.247 4.18467C961.247 3.52613 952.289 3.0871 937.776 3.0871C922.726 3.0871 914.843 3.52613 915.56 4.18467Z" />
</svg>



          </div>
    
    `;
});

const revealExperience = function (entries, observer) {
  entries.forEach((entry) => {
    const item = entry.target;

    const statusSvg = item.querySelector(".work-status");

    const firstLine = item.querySelector(".work-item-first-line");
    const secondLine = item.querySelector(".work-item-second-line");
    const summary = item.querySelector(".work-item-text");
    const skills = item.querySelectorAll(".work-skill");
    const status = item.querySelector(".work-status-text");

    const totalSkills = skills.length;

    if (!entry.isIntersecting) {
      return;
    }

    console.log("testing", entry);
    animatePath(statusSvg);

    animateRevealExperience(status, "revealOpacity", 2, 2);

    animateRevealExperience(firstLine, "revealTextLeftToRight", 4, 2.5);
    animateRevealExperience(secondLine, "revealTextLeftToRight", 4, 2.5);
    animateRevealExperience(summary, "revealTextDown", 3, 3);

    skills.forEach((skill, i) =>
      animateRevealExperience(
        skill,
        "slideIn",
        3,
        0.5 + (totalSkills - i) * 0.2,
      ),
    );

    observer.unobserve(item);
  });
};

const experienceObserver = new IntersectionObserver(revealExperience, {
  root: null,
  threshold: 0.25,
});

const allExperiences = document.querySelectorAll(".work-item");
// const firstLine = document.querySelectorAll(".work-item-first-line");
// const secondLine = document.querySelectorAll(".work-item-second-line");
// const summary = document.querySelectorAll(".work-item-text");
// const skills = document.querySelectorAll(".work-skill");

allExperiences.forEach(function (experience) {
  experienceObserver.observe(experience);
});

const allStatuses = document.querySelectorAll(".work-status");

function updateStatusColors() {
  const center = window.innerHeight / 2;

  allStatuses.forEach((statusBox) => {
    const rect = statusBox.getBoundingClientRect();
    const statusPath = statusBox.querySelector(".status-box");

    const statusCenter = rect.top + rect.height / 2;

    // Has the status box passed the center of the screen and is still in frame
    if (statusCenter < center && statusCenter > 0) {
      if (statusBox.dataset.status === "Current") {
        statusPath.style.setProperty("--status-color", "var(--green)");
        statusBox.style.setProperty("--status-color", "var(--green)");
      } else {
        statusPath.style.setProperty("--status-color", "var(--blue)");
        statusBox.style.setProperty("--status-color", "var(--blue)");
      }
    } else {
      statusPath.style.setProperty("--status-color", "var(--grey)");
      statusBox.style.setProperty("--status-color", "var(--grey)");
    }
  });
}

window.addEventListener("scroll", updateStatusColors);

// const allStatus = document.quesrySelectorAll(".");

function animateRevealExperience(section, animation, timing, delay = 0) {
  section.style.animation = `${animation} ${timing}s ease ${delay}s forwards`;
}
