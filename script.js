document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
  })

  const body = document.body
  const sidebar = document.querySelector(".sidebar")
  const themeToggle = document.getElementById("theme-toggle")
  const themeToggleMobile = document.getElementById("theme-toggle-mobile")
  const hamburger = document.querySelector(".hamburger")
  const overlay = document.querySelector(".overlay")
  const navLinks = document.querySelectorAll(".nav-menu a")
  const typewriterElement = document.getElementById("typewriter")
  const speedDialButton = document.querySelector(".speed-dial-button")
  const appsLinks = document.querySelector(".apps-links")
  const backToTopButton = document.getElementById("back-to-top")
  const sections = document.querySelectorAll("section")

  // Activate sections on scroll for fade-in effect
  function activateSections() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("active")
      }
    })
  }

  // Call once on load
  activateSections()
  window.addEventListener("scroll", activateSections)

  // 🌙 Theme Toggle
  function setupThemeToggle() {
    let isDark = localStorage.getItem("theme") === "dark"

    function updateTheme() {
      document.body.classList.toggle("dark-mode", isDark)
      const iconHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>'
      if (themeToggle) themeToggle.innerHTML = iconHTML
      if (themeToggleMobile) themeToggleMobile.innerHTML = iconHTML
    }

    // Desktop theme toggle
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        isDark = !isDark
        localStorage.setItem("theme", isDark ? "dark" : "light")
        updateTheme()
      })
    }

    // Mobile theme toggle
    if (themeToggleMobile) {
      themeToggleMobile.addEventListener("click", () => {
        isDark = !isDark
        localStorage.setItem("theme", isDark ? "dark" : "light")
        updateTheme()
      })
    }

    // Check if user prefers dark mode
    if (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      isDark = true
      localStorage.setItem("theme", "dark")
    }

    updateTheme()
  }

  // 📱 Mobile Menu Toggle
  function setupMenuToggle() {
    function toggleMenu() {
      if (!sidebar || !overlay || !hamburger) return
      const isActive = sidebar.classList.toggle("active")
      overlay.classList.toggle("active", isActive)
      body.classList.toggle("menu-open", isActive)
      hamburger.textContent = isActive ? "✕" : "☰"
    }

    if (hamburger) hamburger.addEventListener("click", toggleMenu)
    if (overlay) overlay.addEventListener("click", toggleMenu)

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar?.classList.contains("active")) toggleMenu()
    })

    // Close menu when clicking a nav link on mobile
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 780 && sidebar.classList.contains("active")) {
          toggleMenu()
        }
      })
    })
  }

  // Ensure only one navigation item is active at a time
  function setupActiveNav() {
    function setActiveLink() {
      const scrollPosition = window.scrollY

      // Find the current section
      let currentSection = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id")
        }
      })

      // Set active class on nav link
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active")
        }
      })
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth",
          })
        }
      })
    })

    window.addEventListener("scroll", setActiveLink)
    setActiveLink() // Call once on load
  }

  // ✍️ TypeWriter Effect
  function setupTypewriter() {
    if (!typewriterElement) return

    class TypeWriter {
      constructor(element, text, speed = 50) {
        this.element = element
        this.fullText = text
        this.speed = speed
        this.currentText = ""
        this.currentIndex = 0
      }

      type() {
        if (this.currentIndex < this.fullText.length) {
          this.currentText += this.fullText.charAt(this.currentIndex)
          this.element.innerHTML = this.currentText
            .replace(/\b(const|Array)\b/g, '<span class="blue">$1</span>')
            .replace(/\b(Ingredient)\b/g, '<span class="green">$1</span>')
            .replace(
              /(Designer|Developer|Photographer|Writer|Sugar|Spice|\.\.\.everythingNice)/g,
              (match) => `<span class="red">"${match}"</span>`,
            )
          this.currentIndex++
          setTimeout(() => this.type(), this.speed)
        } else {
          // Add a blinking cursor at the end
          setTimeout(() => {
            // Start over after a pause
            this.currentText = ""
            this.currentIndex = 0
            setTimeout(() => this.type(), 2000)
          }, 3000)
        }
      }

      start() {
        this.currentText = ""
        this.currentIndex = 0
        this.type()
      }
    }

    const typewriter = new TypeWriter(
      typewriterElement,
      `const Velan Sivasankaran: Array<Ingredient> = [
    Designer,
    Developer,
    
    ...everythingNice
];`,
      50,
    )
    typewriter.start()
  }

  // 📌 Speed Dial Toggle
  function setupSpeedDial() {
    if (!speedDialButton || !appsLinks) return

    speedDialButton.addEventListener("click", (event) => {
      appsLinks.classList.toggle("active")
      event.stopPropagation() // Prevents event from propagating to document click listener
    })

    // Close the menu when clicking anywhere outside the button or app links
    document.addEventListener("click", (event) => {
      if (!appsLinks.contains(event.target) && !speedDialButton.contains(event.target)) {
        appsLinks.classList.remove("active")
      }
    })

    // Close the menu when any link is clicked
    appsLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        appsLinks.classList.remove("active")
      })
    })
  }

  // Back to Top Button
  function setupBackToTop() {
    if (!backToTopButton) return

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // About Section Typewriter
  function setupAboutTypewriter() {
    const typewriterElement = document.querySelector(".typewriter")
    if (!typewriterElement) return

    const phrases = ["Front-End Developer", "UI Enthusiast", "Problem Solver", "Continuous Learner"]
    let phraseIndex = 0
    let letterIndex = 0
    let currentPhrase = ""
    let isDeleting = false
    let typewriterSpeed = 100

    function typeEffect() {
      const currentWord = phrases[phraseIndex]

      if (isDeleting) {
        currentPhrase = currentWord.substring(0, letterIndex - 1)
        typewriterSpeed = 50
      } else {
        currentPhrase = currentWord.substring(0, letterIndex + 1)
        typewriterSpeed = 150
      }

      typewriterElement.textContent = currentPhrase

      if (!isDeleting && letterIndex === currentWord.length) {
        isDeleting = true
        typewriterSpeed = 2000 // Pause at the end of the word
      } else if (isDeleting && letterIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
      }

      letterIndex += isDeleting ? -1 : 1

      setTimeout(typeEffect, typewriterSpeed)
    }

    typeEffect()
  }

  // Language Section Animation
  function setupLanguageSection() {
    const texts = ["தமிழ் என் தாய்மொழி ", "English I Speak Fluently ", "मैं हिंदी भी बोल सकता हूं "]
    const proficiencyBars = document.querySelectorAll(".proficiency-level")
    const proficiencyValues = [100, 75, 55] // Percentages for each language

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

    // Animate proficiency bars when section is in view
    function animateProficiencyBars() {
      const langSection = document.getElementById("lang")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              proficiencyBars.forEach((bar, index) => {
                setTimeout(() => {
                  bar.style.width = `${proficiencyValues[index]}%`
                }, index * 300)
              })
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.3 },
      )

      observer.observe(langSection)
    }

    typeEffect()
    animateStats()
    animateProficiencyBars()
  }

  // Skills Data
  const skills = [
    {
      img: "../img/skills-img/spider-web.png",
      title: "Web Design & Development",
      tech: "HTML, CSS, JavaScript, TypeScript",
    },
    {
      img: "../img/skills-img/angular.png",
      title: "Frontend JavaScript Frameworks",
      tech: "Angular, React, Vue.js, Svelte",
    },
    { img: "../img/skills-img/js.png", title: "Backend JavaScript Frameworks", tech: "Node.js, Express.js, NestJS" },
    { img: "../img/skills-img/flag.png", title: "Cross Platform App Development", tech: "Dart, Flutter, Firebase" },
    { img: "../img/skills-img/python.png", title: "Scripting Frameworks", tech: "Python, Rust, Selenium, Puppeteer" },
    {
      img: "../img/skills-img/server.png",
      title: "Database Management System",
      tech: "Postgres, TypeORM, MongoDB, Mongoose",
    },
    {
      img: "../img/skills-img/android.png",
      title: "Android App Development",
      tech: "Android Studio, Java, Kotlin, XML",
    },
    { img: "../img/skills-img/diamond.png", title: "UI/UX Design", tech: "Adobe XD, Figma, Sketch" },
    {
      img: "../img/skills-img/machine-learning.png",
      title: "Data Processing & Machine Learning",
      tech: "R, scikit-learn, TensorFlow, Keras",
    },
    {
      img: "../img/skills-img/search-engine.png",
      title: "Search Engine Optimization",
      tech: "PageRank, Backlinks, Google Analytics",
    },
    {
      img: "../img/skills-img/gallery.png",
      title: "Photography & Cinematography",
      tech: "Adobe Photoshop, Adobe Lightroom",
    },
    {
      img: "../img/skills-img/video-player.png",
      title: "Photo & Video Post-Processing",
      tech: "Adobe After Effects, Final Cut Pro X",
    },
  ]

  // Dynamically Insert Skills with Animation
  function populateSkills() {
    const skillsContainer = document.getElementById("skills-container")
    if (!skillsContainer) return

    skillsContainer.innerHTML = ""

    skills.forEach((skill, index) => {
      const col = document.createElement("div")
      col.className = "col-md-6 col-lg-4 mb-2"
      col.setAttribute("data-aos", "fade-up")
      col.setAttribute("data-aos-duration", "800")
      col.setAttribute("data-aos-delay", `${index * 100}`)

      const box = document.createElement("div")
      box.classList.add("box")

      box.innerHTML = `
        <img src="${skill.img}" alt="${skill.title}">
        <div class="box-content">
            <h5>${skill.title}</h5>
            <span>(${skill.tech})</span>
        </div>
      `

      col.appendChild(box)
      skillsContainer.appendChild(col)
    })
  }

  // Project Data
  const projects = [
    {
      title: "E-commerce",
      description:
        "An e-commerce platform project that includes various features such as product listings, user authentication, and payment integration.",
      link: "https://e-commerce-lm5d.vercel.app/",
      github: "https://github.com/Velan03/E-commerce",
      image: "../img/project-img/e-commers.png",
    },
    {
      title: "E-commerce Electronic WebSite",
      description:
        "An electronics e-commerce website that allows users to browse, compare, and purchase electronic items with ease.",
      link: "https://like-n-pick.vercel.app",
      github: "https://github.com/Velan03/like-n-pick",
      image: "../img/project-img/e-COMMERS.jpg",
    },
    {
      title: "Movie Download Website",
      description: "🎬 A responsive and user-friendly movie download website built using HTML, CSS, and JavaScript. Features a clean UI, intuitive navigation, and a lightweight design for easy movie browsing and downloading.",
      link: "https://tamilrockers-muv.vercel.app", 
      github: "https://github.com/Velan03/tamilrockers-muv/tree/main",  
      image: "./img/project-img/Movie-Download-Websites.jpg"   
    },
    {
      title: "youtube_video_downloader",
      description: "🎥 YouTube Video Downloader This is a simple and user-friendly web application that allows users to download YouTube videos in various formats. Built using HTML, CSS, JavaScript, and Python (Flask) for the backend.",
      link: "#",
      github: "https://github.com/Velan03/youtube_video_downloader",
      image: "./img/project-img/youtube-video-downloader.png",
    },
    {
      title: "Event-Management",
      description: "🎉 Event Management Website This is a fully responsive Event Management Website built using HTML, CSS, and JavaScript. The website allows users to explore event services, view upcoming events, and contact organizers.", 
       link: "https://event-management-v2.vercel.app",
      github: "https://github.com/Velan03/Event-Management.v2",
      image: "./img/project-img/event_management.jpg",
    },
    {
      title: "AI-HUMAN-FACE-EMOTION-DETECTION",
      description: "An advanced AI project that detects and analyzes human facial emotions in real-time using machine learning algorithms and computer vision techniques.",
      link: "#",
      github: "https://github.com/Velan03/AI-HUMAN-FACE-EMOTION-DETECTION",
      image: "./img/project-img/AI-HUMAN-FACE-EMOTION-DETECTION.jpg",
    },
  ]

  // Dynamically Insert Projects with Animation
  function populateProjects() {
    const container = document.getElementById("project-container")
    if (!container) return

    container.innerHTML = ""

    projects.forEach((project, index) => {
      // Truncate description after 10 words
      const words = project.description.split(" ")
      const shortDesc = words.length > 10 ? words.slice(0, 10).join(" ") + "..." : project.description

      const col = document.createElement("div")
      col.className = "col-md-6 col-lg-4"
      col.setAttribute("data-aos", "fade-up")
      col.setAttribute("data-aos-duration", "800")
      col.setAttribute("data-aos-delay", `${index * 100}`)

      const card = document.createElement("div")
      card.classList.add("project-card")

      card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
                <a href="${project.link}" target="_blank" aria-label="View project">
                    <i class="fa-solid fa-arrow-up-right-from-square" style="color: white; font-size: 24px;"></i>
                </a>
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">
                <span class="desc-text">${shortDesc}</span>
                <span class="expand-btn" style="color: var(--accent-color); cursor: pointer; display: ${words.length > 10 ? "inline" : "none"}"> Read more</span>
            </p>
            <div class="project-links">
                <a href="${project.link}" target="_blank" aria-label="View live project"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                <a href="${project.github}" target="_blank" aria-label="View source code"><i class="fa-brands fa-github" style="font-size: 20px;"></i></a>
            </div>
        </div>
      `

      col.appendChild(card)
      container.appendChild(col)

      // Get elements for toggling
      const descText = card.querySelector(".desc-text")
      const expandBtn = card.querySelector(".expand-btn")

      if (expandBtn) {
        expandBtn.addEventListener("click", () => {
          if (expandBtn.innerText.includes("Read more")) {
            descText.innerText = project.description
            expandBtn.innerText = " Show less"
          } else {
            descText.innerText = shortDesc
            expandBtn.innerText = " Read more"
          }
        })
      }
    })
  }

  // Blog Data
  const blogs = [
    {
      title: "Getting Started with JavaScript",
      description: "Learn the basics of JavaScript and how to use it in your projects.",
      image: "../img/blog-img/Best-Blogging-image.png",
      link: "https://medium.com/@velansivasankaran15/getting-started-with-javascript-your-gateway-to-the-web-65cd82d325b6",
    },
    {
      title: "Mastering CSS Grid",
      description: "A comprehensive guide to mastering CSS Grid for modern web layouts.",
      image: "../img/blog-img/images2.jpg",
      link: "https://medium.com/@velansivasankaran15/mastering-css-grid-the-future-of-modern-web-layouts-f974d3f1f1d7",
    },
    {
      title: "Introduction to React",
      description: "Discover the power of React and how to build dynamic user interfaces.",
      image: "../img/blog-img/img3.png",
      link: "https://medium.com/@velansivasankaran15/%EF%B8%8F-introduction-to-react-build-dynamic-uis-like-a-pro-a61d74dab3fc",
    }, 
  ]

  // Dynamically Insert Blog Cards with Animation
  function populateBlogs() {
    const blogContainer = document.getElementById("blog-container")
    if (!blogContainer) return

    blogContainer.innerHTML = ""

    blogs.forEach((blog, index) => {
      const col = document.createElement("div")
      col.className = "col-md-6 col-lg-4"
      col.setAttribute("data-aos", "fade-up")
      col.setAttribute("data-aos-duration", "800")
      col.setAttribute("data-aos-delay", `${index * 100}`)

      const card = document.createElement("div")
      card.classList.add("blog-card")

      card.innerHTML = ` 
        <div class="blog-image">
            <img src="${blog.image}" alt="${blog.title}">
            <div class="blog-overlay">
                <a href="${blog.link}" aria-label="Read blog post">
                    <i class="fa-solid fa-arrow-up-right-from-square" style="color: white; font-size: 24px;"></i>
                </a>
            </div>
        </div>
        <div class="blog-card-content">
            <h4>${blog.title}</h4>
            <p>${blog.description}</p>
            <a href="${blog.link}">Read More →</a>
        </div>
      `

      col.appendChild(card)
      blogContainer.appendChild(col)
    })
  }

  // Work Experience Data
  const currentYear = new Date().getFullYear()
  const workExperienceData = [
    {
      startYear: 2024,
      endYear: currentYear,
      title: "Software Engineer",
      description: "Tarkiz Infotech Private Limited, Chennai-116, India",
    },
    { startYear: 2022, endYear: 2023, title: "Front-end Trainee", description: "Intrainz (Online), India" },
  ]

  // Convert work experience data to a format with "date" field
  const formattedWorkExperienceData = workExperienceData.map((job) => ({
    date: `${job.startYear} - ${job.endYear}`,
    title: job.title,
    description: job.description,
  }))

  // Education Data
  const educationData = [
    { date: "2023 - 2024", title: "Fullstack Course", description: "Qspider, Vadapalani, Chennai-69, India" },
    {
      date: "2019 - 2023",
      title: "Bachelor's in Computer Science",
      description: "Sri Muthukumaran Institute of Technology, Chennai-69, India",
    },
    {
      date: "2018 - 2019",
      title: "Higher Secondary Education",
      description: "Sekkizhar Boys' Government Higher Secondary School, Chennai-69, India",
    },
    {
      date: "2016 - 2017",
      title: "Secondary Education",
      description: "Madha Matriculation Higher Secondary School, Chennai-69, India",
    },
  ]

  // Function to create a timeline item
  function createTimelineItem(item) {
    const timelineItem = document.createElement("div")
    timelineItem.classList.add("timeline-item")

    timelineItem.innerHTML = `
      <div class="timeline-date">${item.date}</div>
      <div class="timeline-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
      </div>
    `

    return timelineItem
  }

  // Function to populate the timeline in the container
  function populateTimeline(containerId, data) {
    const container = document.getElementById(containerId)
    if (!container) return

    // Clear any existing content in the container to prevent repeats
    container.innerHTML = ""

    // Add new timeline items to the container
    data.forEach((item) => {
      container.appendChild(createTimelineItem(item))
    })
  }

function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  // Create success message element (add this to your HTML or create dynamically)
  const successMessage = document.createElement('div');
  successMessage.className = 'alert alert-success mt-3 d-none';
  successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Message sent successfully!';
  contactForm.appendChild(successMessage);

  contactForm.addEventListener("submit", async function(event) {
    event.preventDefault(); 
    
    // Get form elements
    const submitButton = this.querySelector('button[type="submit"]');
    const submitButtonSpan = submitButton.querySelector('span');
    const originalButtonText = submitButtonSpan.textContent;
    const icon = submitButton.querySelector('i');
    
    // Set loading state
    submitButton.disabled = true;
    submitButtonSpan.textContent = 'Sending...';
    icon.className = 'fas fa-spinner fa-spin';
    
    // Hide any previous messages
    successMessage.classList.add('d-none');

    try { 
      // Add custom subject to form data
      const formData = new FormData(contactForm);
      const name = formData.get('name') || 'Visitor';
      formData.set('subject', `Form Portfolio - Message from ${name}`);
      
      // Submit to Web3Forms
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) { 
        // Success - reset form and show message
        contactForm.reset(); 
        successMessage.classList.remove('d-none');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.add('d-none');
        }, 5000);
      } else { 
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) { 
      console.error('Form submission error:', error);
      alert(`Error: ${error.message}`);
    } finally { 
      // Reset button state
      submitButton.disabled = false;
      submitButtonSpan.textContent = originalButtonText;
      icon.className = 'fa-regular fa-paper-plane';
    }
  });
}

  // 🚀 Initialize All Features
  setupThemeToggle()
  setupMenuToggle()
  setupActiveNav()
  setupTypewriter()
  setupSpeedDial()
  setupBackToTop()
  setupAboutTypewriter()
  setupLanguageSection()
  populateSkills()
  populateProjects()
  populateBlogs()
  populateTimeline("work-experience-timeline", formattedWorkExperienceData)
  populateTimeline("education-timeline", educationData)
  setupContactForm()
})
