

async function loadPage(pageName) {
  const response = await fetch("pages.json");
  const data = await response.json();
  const pageData = data[pageName];

  const main = document.querySelector("#main-content");
  main.innerHTML = ""; // Clear old content

  if (pageName === "home") {
    // 1. Hero Section
    const hero = document.createElement("section");
    hero.className = "hero-section";
    hero.innerHTML = `
      <video class="hero-bg" autoplay muted loop playsinline>
        <source src="${pageData.heroSection.videoSrc}" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">${pageData.heroSection.title}</h1>
        <p class="hero-subtitle">${pageData.heroSection.subtitle}</p>
        <a href="${pageData.heroSection.buttonLink}" class="hero-btn">${pageData.heroSection.buttonText}</a>
      </div>
    `;
    main.appendChild(hero);

    // 2. Course Section
    renderCoursesSection(pageData.coursesSection, main);

  } else if (pageName === "courses") {
    const section = document.createElement("section");
    section.className = "courses-section";

    section.innerHTML = `
      <div class="container">
        <h2 class="section-title">${pageData.title}</h2>
        <div class="courses-grid"></div>
      </div>
    `;

    const grid = section.querySelector(".courses-grid");

    pageData.courses.forEach(course => {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";
      courseCard.innerHTML = `
        <img src="${course.img}" alt="${course.title}" class="course-img" />
        <div class="course-content">
          <h3 class="course-title">${course.title}</h3>
          <p class="course-description">${course.description}</p>
          <button class="enroll-btn">Enroll Now</button>
        </div>
      `;
      grid.appendChild(courseCard);
    });

    main.appendChild(section);
  } else {
    main.innerHTML = `<p style="padding:2rem">Page not found</p>`;
  }
}

function renderCoursesSection(coursesData, parentElement) {
  const section = document.createElement("section");
  section.className = "courses-section";

  let coursesHTML = `
    <div class="container">
      <h2 class="section-title">${coursesData.title}</h2>
      <div class="courses-grid">
  `;

  coursesData.courses.forEach(course => {
    coursesHTML += `
      <div class="course-card">
        <img src="${course.img}" alt="${course.title}" class="course-img" />
        <div class="course-content">
          <h3 class="course-title">${course.title}</h3>
          <p class="course-description">${course.description}</p>
          <button class="enroll-btn">Enroll Now</button>
        </div>
      </div>
    `;
  });

  coursesHTML += `</div></div>`;
  section.innerHTML = coursesHTML;
  parentElement.appendChild(section);
}

// Router function
function handleRouting() {
  const hash = window.location.hash.replace("#", "") || "home";
  loadPage(hash);
}

// Listen for hash change
window.addEventListener("hashchange", handleRouting);

// Initial load
window.addEventListener("DOMContentLoaded", handleRouting);




