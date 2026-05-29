import { experiences } from "./data.js";

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
                    ${exp.skills.map((s, i) => `<p class="work-skill reenie-beanie-regular-notes" style="animation-delay: ${(exp.totalSkills - i) * 0.2}s">${s}</p>`).join("")}
              </div>
            </div>
            <div class="work-status">
              <p class="work-status-text reenie-beanie-regular-notes ${exp.status === "Current" ? "green-text" : "blue-text"}">
                ${exp.status}
              </p>
              <svg
                viewBox="0 0 105 26"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                ${exp.status === "Current" ? 'fill="var(--green)" stroke="var(--green)"' : 'fill="var(--blue)" stroke="var(--blue)"'}
              >
                <path
                  d="M7.69859 0.672797C7.50652 1.13708 7.69859 1.70454 8.21079 1.96248C8.72299 2.22042 29.083 2.37518 55.3973 2.272C96.3093 2.16883 101.623 2.272 101.239 2.94264C99.7667 5.98629 97.1416 17.2839 97.1416 20.5339V22.5458H93.8123C91.9556 22.5458 82.0957 22.0815 71.8517 21.4625C57.5741 20.6887 47.4582 20.4307 28.1226 20.4823H2.96073L3.34488 19.399C4.43331 16.6649 6.22601 8.61724 6.22601 6.39899C6.22601 4.38708 6.03394 3.97438 5.07356 3.97438C4.11319 3.97438 3.79306 4.74819 3.08878 8.72042C2.64061 11.3514 1.68023 15.4268 0.911931 17.7482C0.207655 20.0696 -0.176495 22.1847 0.079605 22.3911C0.335705 22.649 11.1559 22.7522 24.025 22.649C47.138 22.4942 50.0832 22.5974 93.044 24.9188C99.7667 25.2799 99.3825 25.5379 100.023 20.1728C100.599 15.0657 102.072 8.97835 103.672 4.59343C104.376 2.52994 104.889 0.724384 104.697 0.569622C104.505 0.41486 82.672 0.208511 56.2296 0.105337C12.8206 -0.101013 8.08274 -0.0494253 7.69859 0.672797Z"
                  class="draw-path"
                  
                />
              </svg>
            </div>
          </div>
    
    `;
});
