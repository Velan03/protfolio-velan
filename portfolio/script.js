document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const typewriterElement = document.getElementById('typewriter');
    const speedDialButton = document.querySelector('.speed-dial-button');
    const appsLinks = document.querySelector('.apps-links');

    // 🌙 Theme Toggle
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        let isDark = localStorage.getItem('theme') === 'dark';
    
        function updateTheme() {
            document.body.classList.toggle('dark-mode', isDark);
            themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        }
    
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateTheme();
        });
    
        updateTheme();
    }
    
    // Call the function to set up the theme toggle
    setupThemeToggle();

// 📱 Mobile Menu Toggle
function setupMenuToggle() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    function toggleMenu() {
        if (!sidebar || !overlay || !hamburger) return;
        const isActive = sidebar.classList.toggle('active');
        overlay.classList.toggle('active', isActive);
        body.classList.toggle('menu-open', isActive);
        hamburger.textContent = isActive ? '✕' : '☰';
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar?.classList.contains('active')) toggleMenu();
    });
}

// Ensure only one navigation item is active at a time
function setupActiveNav() {
    const navLinks = document.querySelectorAll('.nav-menu li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to the clicked link
            this.classList.add('active');
        });
    });
}

// Initialize both functions
document.addEventListener('DOMContentLoaded', () => {
    setupMenuToggle();
    setupActiveNav();
});

    // ✍️ TypeWriter Effect
    function setupTypewriter() {
        if (!typewriterElement) return;

        class TypeWriter {
            constructor(element, text, speed = 50) {
                this.element = element;
                this.fullText = text;
                this.speed = speed;
                this.currentText = '';
                this.currentIndex = 0;
            }

            type() {
                if (this.currentIndex < this.fullText.length) {
                    this.currentText += this.fullText.charAt(this.currentIndex);
                    this.element.innerHTML = this.currentText
                        .replace(/\b(const|Array)\b/g, '<span class="blue">$1</span>')
                        .replace(/\b(Ingredient)\b/g, '<span class="green">$1</span>')
                        .replace(/(Designer|Developer|Photographer|Writer|Sugar|Spice|\.\.\.everythingNice)/g,
                            match => `<span class="red">"${match}"</span>`);
                    this.currentIndex++;
                    setTimeout(() => this.type(), this.speed);
                }
            }

            start() {
                this.currentText = '';
                this.currentIndex = 0;
                this.type();
            }
        }

        const typewriter = new TypeWriter(
            typewriterElement,
            `const Velan Sivasankaran: Array<Ingredient> = [
    Designer,
    Developer, 
    ...everythingNice
];`,
            50
        );
        typewriter.start();
    }

    // 🎯 Smooth Scrolling & Active Link Highlight
    function setupSmoothScrolling() {
        function setActiveLink() {
            const scrollPosition = window.scrollY;
            navLinks.forEach(link => {
                const section = document.querySelector(link.getAttribute('href'));
                if (section) {
                    const isActive = scrollPosition >= section.offsetTop - 100 &&
                        scrollPosition < section.offsetTop + section.offsetHeight;
                    link.classList.toggle('active', isActive);
                }
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = document.querySelector(link.getAttribute('href'));
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
            });
        });

        window.addEventListener('scroll', setActiveLink);
        setActiveLink();
    }

    // 📌 Speed Dial Toggle
    function setupSpeedDial() {
        const speedDialButton = document.querySelector('.speed-dial-button');
        const appsLinks = document.querySelector('.apps-links');
    
        if (!speedDialButton || !appsLinks) return;
    
        // Toggle visibility of the appsLinks when the speedDialButton is clicked
        speedDialButton.addEventListener('click', (event) => {
            appsLinks.classList.toggle('active');
            event.stopPropagation(); // Prevents event from propagating to document click listener
        });
    
        // Close the menu when clicking anywhere outside the button or app links
        document.addEventListener('click', (event) => {
            if (!appsLinks.contains(event.target) && !speedDialButton.contains(event.target)) {
                appsLinks.classList.remove('active');
            }
        });
    
        // Close the menu when any link is clicked
        appsLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                appsLinks.classList.remove('active');
            });
        });
    }
    

    // 🚀 Initialize All Features
    setupThemeToggle();
    setupMenuToggle();
    setupTypewriter();
    setupSmoothScrolling();
    setupSpeedDial();
});
// form
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            alert("Form submitted successfully!");
            form.reset();
        } else {
            alert("There was an error submitting the form. Please try again.");
        }
    } catch (error) {
        alert("An error occurred while submitting the form. Please check your network and try again.");
    }
});
//  Skills Data
const skills = [
    { img: "../img/skills-img/spider-web.png", title: "Web Design & Development", tech: "HTML, CSS, JavaScript, TypeScript" },
    { img: "../img/skills-img/angular.png", title: "Frontend JavaScript Frameworks", tech: "Angular, React, Vue.js, Svelte" },
    { img: "../img/skills-img/js.png", title: "Backend JavaScript Frameworks", tech: "Node.js, Express.js, NestJS" },
    { img: "../img/skills-img/flag.png", title: "Cross Platform App Development", tech: "Dart, Flutter, Firebase" },
    { img: "../img/skills-img/python.png", title: "Scripting Frameworks", tech: "Python, Rust, Selenium, Puppeteer" },
    { img: "../img/skills-img/server.png", title: "Database Management System", tech: "Postgres, TypeORM, MongoDB, Mongoose" },
    { img: "../img/skills-img/android.png", title: "Android App Development", tech: "Android Studio, Java, Kotlin, XML" },
    { img: "../img/skills-img/diamond.png", title: "UI/UX Design", tech: "Adobe XD, Figma, Sketch" },
    { img: "../img/skills-img/machine-learning.png", title: "Data Processing & Machine Learning", tech: "R, scikit-learn, TensorFlow, Keras" },
    { img: "../img/skills-img/search-engine.png", title: "Search Engine Optimization", tech: "PageRank, Backlinks, Google Analytics" },
    { img: "../img/skills-img/gallery.png", title: "Photography & Cinematography", tech: "Adobe Photoshop, Adobe Lightroom" },
    { img: "../img/skills-img/video-player.png", title: "Photo & Video Post-Processing", tech: "Adobe After Effects, Final Cut Pro X" }
];

// Dynamically Insert Skills
const skillsContainer = document.getElementById("skills-container");

skills.forEach(skill => {
    const box = document.createElement("div");
    box.classList.add("box");

    box.innerHTML = `
        <img src="${skill.img}" alt="${skill.title}">
        <div class="box-content">
            <h5>${skill.title}</h5>
            <span>(${skill.tech})</span>
        </div>
    `;

    skillsContainer.appendChild(box);
});
// project
const projects = [
    { title: "E-commerce", description: "An e-commerce platform project that includes various features such as product listings, user authentication, and payment integration.", link: "https://e-commerce-lm5d.vercel.app/", github: "https://github.com/Velan03/E-commerce", image: "../img/project-img/e-commers.png" },
    { title: "E-commerce Electronic WebSite", description: "An electronics e-commerce website that allows users to browse, compare, and purchase electronic items with ease.", link: "https://electronics-web-site.vercel.app/", github: "#", image: "../img/project-img/electroinc-site.png" },
    { title: "Project 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum elit at diam vehicula, et cursus lacus malesuada.", link: "#", github: "#", image: "../img/project-img/e-commers.png" },
    { title: "Project 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", link: "#", github: "#", image: "../img/project-img/e-commers.png" },
    { title: "Project 5", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non felis ligula. Curabitur vel elit vel lorem efficitur ultricies.", link: "#", github: "#", image: "../img/project-img/e-commers.png" },
    { title: "Project 6", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", link: "#", github: "#", image: "../img/project-img/e-commers.png" }
];

const container = document.getElementById("project-container");

projects.forEach(project => {
    const card = document.createElement("div");
    card.style.background = "var(--bg-color)";
    card.style.borderRadius = "8px";
    card.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    card.style.overflow = "hidden";
    card.style.position = "relative";

    // Truncate description after 10 words
    const words = project.description.split(" ");
    const shortDesc = words.length > 10 ? words.slice(0, 10).join(" ") + "..." : project.description;

    card.innerHTML = `
        <div style="height: 160px; background: url('${project.image}') center/cover no-repeat; display: flex; align-items: center; justify-content: center; position: relative;">
            <a href="${project.link}" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); opacity: 0; transition: opacity 0.3s;" 
               onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'">
                <i class="fa-solid fa-arrow-up-right-from-square" style="color: white; font-size: 24px;"></i>
            </a>
        </div>
        <div style="padding: 16px;">
            <h4 style="font-size: 18px; font-weight: bold; color: var(--primary-color);">${project.title}</h4>
            <p class="description" style="color: var(--primary-color); margin-top: 8px;">
                <span class="desc-text">${shortDesc}</span>
                <span class="expand-btn" style="color: var(--primary-color); cursor: pointer;"> ${words.length > 10 ? "Read more" : ""}</span>
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
                <a href="${project.link}" style="color: var(--primary-color); text-decoration: none;"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                <a href="${project.github}" style="color: var(--primary-color); text-decoration: none;"><i class="fa-brands fa-github" style="font-size: 20px;"></i></a>
            </div>
        </div>
    `;

    // Get elements for toggling
    const descText = card.querySelector(".desc-text");
    const expandBtn = card.querySelector(".expand-btn");

    if (expandBtn) {
        expandBtn.addEventListener("click", () => {
            if (expandBtn.innerText === "Read more") {
                descText.innerText = project.description;
                expandBtn.innerText = "Show less";
            } else {
                descText.innerText = shortDesc;
                expandBtn.innerText = "Read more";
            }
        });
    }

    container.appendChild(card);
});

// Blog Data
const blogs = [
    {
        title: "Getting Started with JavaScript",
        description: "Learn the basics of JavaScript and how to use it in your projects.",
        image: "../img/blog-img/Best-Blogging-image.png",
        link: "#"
    },
    {
        title: "Mastering CSS Grid",
        description: "A comprehensive guide to mastering CSS Grid for modern web layouts.",
        image: "../img/blog-img/images2.jpg",
        link: "#"
    },
    {
        title: "Introduction to React",
        description: "Discover the power of React and how to build dynamic user interfaces.",
        image: "../img/blog-img/img3.png",
        link: "#"
    },
    
    {
        title: "Getting Started with JavaScript",
        description: "Learn the basics of JavaScript and how to use it in your projects.",
        image: "../img/blog-img/Best-Blogging-image.png",
        link: "#"
    },
    {
        title: "Mastering CSS Grid",
        description: "A comprehensive guide to mastering CSS Grid for modern web layouts.",
        image: "../img/blog-img/images2.jpg",
        link: "#"
    },
    {
        title: "Introduction to React",
        description: "Discover the power of React and how to build dynamic user interfaces.",
        image: "../img/blog-img/img3.png",
        link: "#"
    },
    
];

// Dynamically Insert Blog Cards
const blogContainer = document.getElementById("blog-container");

blogs.forEach(blog => {
    const card = document.createElement("div");
    card.classList.add("blog-card");

    card.innerHTML = ` 
         <div style="height: 160px; background: url('${blog.image}') center/cover no-repeat; display: flex; align-items: center; justify-content: center; position: relative;">
            <a href="${blog.link}" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); opacity: 0; transition: opacity 0.3s;margin: 0;" 
               onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'">
                <i class="fa-solid fa-arrow-up-right-from-square" style="color: white; font-size: 24px;"></i>
            </a>
        </div>
        <div class="blog-card-content">
            <h4>${blog.title}</h4>
            <p>${blog.description}</p>
            <a href="${blog.link}">Read More →</a>
        </div>
    `;

    blogContainer.appendChild(card);
});


// language  
const texts = ["தமிழ் என் தாய்மொழி ", "English I Speak Fluently ", "मैं हिंदी भी बोल सकता हूं "]

let index = 0
let charIndex = 0
let isDeleting = false
const typeSpeed = 100
const deleteSpeed = 50
const pauseDuration = 1500

const textElement = document.getElementById("text")
const languageCountElement = document.getElementById("languageCount")
const fluencyScoreElement = document.getElementById("fluencyScore")

function typeEffect() {
  const currentText = texts[index]

  if (isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex--)
  } else {
    textElement.textContent = currentText.substring(0, charIndex++)
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true
    setTimeout(typeEffect, pauseDuration)
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    index = (index + 1) % texts.length
    setTimeout(typeEffect, typeSpeed)
  } else {
    setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed)
  }
}

function animateStats() {
  let count = 0
  let score = 0
  const targetCount = 3
  const targetScore = 90
  const duration = 2000
  const steps = 60

  const intervalCount = setInterval(() => {
    count++
    languageCountElement.textContent = count
    if (count === targetCount) clearInterval(intervalCount)
  }, duration / steps)

  const intervalScore = setInterval(() => {
    score++
    fluencyScoreElement.textContent = score
    if (score === targetScore) clearInterval(intervalScore)
  }, duration / targetScore)
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect()
  animateStats()
})
 
// Get the current year dynamically
const currentYear = new Date().getFullYear();

// Work Experience Data (Sorted Automatically)
let workExperienceData = [
    { startYear: 2024, endYear: currentYear, title: "Software Engineer Trainee", description: "Tarkiz Infotech Private Limited, Chennai-116, India" },
    { startYear: 2022, endYear: 2023, title: "Front-end Trainee", description: "Intrainz (Online), India" }
];

// Sort work experience data based on startYear to ensure proper chronological order
workExperienceData.sort((a, b) => a.startYear - b.startYear);

// Automatically update previous job’s end year based on the next job's start year
workExperienceData = workExperienceData.map((job, index, arr) => {
    if (index < arr.length - 1) {
        job.endYear = arr[index + 1].startYear;
    }
    return job;
});

// Convert work experience data to a format with "date" field
const formattedWorkExperienceData = workExperienceData.map(job => ({
    date: `${job.startYear} - ${job.endYear}`,
    title: job.title,
    description: job.description
}));

// Education Data
const educationData = [
    { date: "2023 - 2024", title: "Fullstack Course", description: "Qspider, Vadapalani, Chennai-69, India" },
    { date: "2019 - 2023", title: "Bachelor's in Computer Science", description: "Sri Muthukumaran Institute of Technology, Chennai-69, India" },
    { date: "2018 - 2019", title: "Higher Secondary Education", description: "Sekkizhar Boys' Government Higher Secondary School, Chennai-69, India" },
    { date: "2016 - 2017", title: "Secondary Education", description: "Madha Matriculation Higher Secondary School, Chennai-69, India" }
];

// Function to create a timeline item
function createTimelineItem(item) {
    const timelineItem = document.createElement("div");
    timelineItem.classList.add("timeline-item");

    timelineItem.innerHTML = `
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;

    return timelineItem;
}

// Function to populate the timeline in the container
function populateTimeline(containerId, data) {
    const container = document.getElementById(containerId);
    
    // Clear any existing content in the container to prevent repeats
    container.innerHTML = "";

    // Add new timeline items to the container
    data.forEach(item => {
        container.appendChild(createTimelineItem(item));
    });
}

// Render the timelines after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Ensure the timeline only gets populated once
    populateTimeline("work-experience-timeline", formattedWorkExperienceData);
    populateTimeline("education-timeline", educationData);
});