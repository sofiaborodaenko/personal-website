const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

window.addEventListener("load", () => {
  const paths = document.querySelectorAll(".draw-path");
  const dots = document.querySelectorAll(".draw-dot");

  // animating the rectangle path on hero section
  paths.forEach((path, index) => {
    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    const rectAnimation = [
      { strokeDashoffset: length, fillOpacity: 0, strokeOpacity: 1 },
      { strokeDashoffset: 0, fillOpacity: 0, strokeOpacity: 1, offset: 0.7 },
      {
        strokeDashoffset: 0,
        fillOpacity: 1,
        strokeOpacity: 0,
      },
    ];

    const rectTiming = {
      duration: 2500,
      fill: "forwards",
      delay: index * 280,
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

  //const heroRevealTime = lastPathEnd + 50;

  async function revealHeroContent() {
    const heroNote = document.querySelector(".hero-note");
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");

    heroNote.classList.remove("hiden");
    heroNote.classList.add("reveal--opacity");
    await delay(500);

    heroTitle.classList.remove("hiden");
    heroTitle.classList.add("reveal--opacity");
    await delay(500);

    heroSubtitle.classList.remove("hiden");
    heroSubtitle.classList.add("reveal--opacity");
    await delay(500);
    document.body.style.overflow = "auto";
  }

  setTimeout(revealHeroContent, lastPathEnd);
  //revealHeroContent();
});
