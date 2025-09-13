// Global variables
let currentTemplate = "modern"
let portfolioData = {}

// Navigation functions
function showHome() {
  hideAllSections()
  document.getElementById("home").classList.remove("hidden")
  updateActiveNav("home")
}

function showPortfolioForm() {
  hideAllSections()
  document.getElementById("portfolio-form").classList.remove("hidden")
  updateActiveNav("create")
}

function showTemplates() {
  hideAllSections()
  document.getElementById("templates").classList.remove("hidden")
  updateActiveNav("templates")
}

function showPortfolioDisplay() {
  hideAllSections()
  document.getElementById("portfolio-display").classList.remove("hidden")
  updateActiveNav("create")
}

function hideAllSections() {
  const sections = ["home", "portfolio-form", "portfolio-display", "templates"]
  sections.forEach((section) => {
    document.getElementById(section).classList.add("hidden")
  })
}

function updateActiveNav(activeSection) {
  const navLinks = document.querySelectorAll("nav a")
  navLinks.forEach((link) => link.classList.remove("active"))

  const sectionMap = {
    home: 0,
    create: 1,
    templates: 2,
    gallery: 3,
  }

  if (sectionMap[activeSection] !== undefined) {
    navLinks[sectionMap[activeSection]].classList.add("active")
  }
}

// Form handling functions
function addExperience() {
  const container = document.getElementById("experience-container")
  const experienceItem = document.createElement("div")
  experienceItem.className = "experience-item"
  experienceItem.innerHTML = `
        <div class="input-row">
            <div class="input-group">
                <label>Job Title</label>
                <input type="text" name="jobTitle[]" placeholder="e.g., Frontend Developer">
            </div>
            <div class="input-group">
                <label>Company</label>
                <input type="text" name="company[]" placeholder="e.g., Tech Corp">
            </div>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Start Date</label>
                <input type="month" name="startDate[]">
            </div>
            <div class="input-group">
                <label>End Date</label>
                <input type="month" name="endDate[]">
            </div>
        </div>
        <div class="input-group">
            <label>Description</label>
            <textarea name="jobDescription[]" rows="3" placeholder="Describe your role and achievements..."></textarea>
        </div>
        <button type="button" class="btn btn-small" onclick="removeExperience(this)" style="background: #ff4444;">Remove</button>
    `
  container.appendChild(experienceItem)
}

function addProject() {
  const container = document.getElementById("projects-container")
  const projectItem = document.createElement("div")
  projectItem.className = "project-item"
  projectItem.innerHTML = `
        <div class="input-row">
            <div class="input-group">
                <label>Project Name</label>
                <input type="text" name="projectName[]" placeholder="e.g., E-commerce Website">
            </div>
            <div class="input-group">
                <label>Project URL</label>
                <input type="url" name="projectUrl[]" placeholder="https://...">
            </div>
        </div>
        <div class="input-group">
            <label>Description</label>
            <textarea name="projectDescription[]" rows="3" placeholder="Describe the project and your role..."></textarea>
        </div>
        <div class="input-group">
            <label>Technologies Used</label>
            <input type="text" name="projectTech[]" placeholder="React, Node.js, MongoDB...">
        </div>
        <button type="button" class="btn btn-small" onclick="removeProject(this)" style="background: #ff4444;">Remove</button>
    `
  container.appendChild(projectItem)
}

function removeExperience(button) {
  button.parentElement.remove()
}

function removeProject(button) {
  button.parentElement.remove()
}

// Template selection
function selectTemplate(template) {
  currentTemplate = template
  showPortfolioForm()

  // Visual feedback
  const templateCards = document.querySelectorAll(".template-card")
  templateCards.forEach((card) => card.classList.remove("selected"))
  document.querySelector(`[data-template="${template}"]`).classList.add("selected")
}

// Portfolio generation
function generatePortfolio(data) {
  const container = document.getElementById("generated-portfolio")

  let portfolioHTML = ""

  switch (currentTemplate) {
    case "modern":
      portfolioHTML = generateModernTemplate(data)
      break
    case "creative":
      portfolioHTML = generateCreativeTemplate(data)
      break
    case "minimal":
      portfolioHTML = generateMinimalTemplate(data)
      break
    default:
      portfolioHTML = generateModernTemplate(data)
  }

  container.innerHTML = portfolioHTML
  showPortfolioDisplay()
}

function generateModernTemplate(data) {
  const skills = data.skills ? data.skills.split(",").map((skill) => skill.trim()) : []
  const experience = data.experience || []
  const projects = data.projects || []

  return `
        <div class="portfolio-modern">
            <header class="portfolio-header">
                <div class="header-content">
                    <h1>${data.fullName || "Your Name"}</h1>
                    <h2>${data.profession || "Your Profession"}</h2>
                    <p class="bio">${data.bio || "Your professional bio will appear here."}</p>
                    <div class="contact-info">
                        ${data.email ? `<span>📧 ${data.email}</span>` : ""}
                        ${data.phone ? `<span>📱 ${data.phone}</span>` : ""}
                    </div>
                    <div class="social-links">
                        ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">LinkedIn</a>` : ""}
                        ${data.github ? `<a href="${data.github}" target="_blank">GitHub</a>` : ""}
                        ${data.portfolio ? `<a href="${data.portfolio}" target="_blank">Website</a>` : ""}
                        ${data.twitter ? `<a href="${data.twitter}" target="_blank">Twitter</a>` : ""}
                    </div>
                </div>
            </header>
            
            <main class="portfolio-main">
                ${
                  skills.length > 0
                    ? `
                <section class="skills-section">
                    <h3>Skills & Expertise</h3>
                    <div class="skills-grid">
                        ${skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
                    </div>
                </section>
                `
                    : ""
                }
                
                ${
                  experience.length > 0
                    ? `
                <section class="experience-section">
                    <h3>Work Experience</h3>
                    <div class="experience-list">
                        ${experience
                          .map(
                            (exp) => `
                            <div class="experience-item">
                                <div class="exp-header">
                                    <h4>${exp.jobTitle}</h4>
                                    <span class="company">${exp.company}</span>
                                    <span class="duration">${exp.startDate} - ${exp.endDate || "Present"}</span>
                                </div>
                                <p class="exp-description">${exp.description}</p>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </section>
                `
                    : ""
                }
                
                ${
                  projects.length > 0
                    ? `
                <section class="projects-section">
                    <h3>Projects</h3>
                    <div class="projects-grid">
                        ${projects
                          .map(
                            (project) => `
                            <div class="project-card">
                                <h4>${project.name}</h4>
                                <p class="project-description">${project.description}</p>
                                <div class="project-tech">
                                    ${
                                      project.technologies
                                        ? project.technologies
                                            .split(",")
                                            .map((tech) => `<span class="tech-tag">${tech.trim()}</span>`)
                                            .join("")
                                        : ""
                                    }
                                </div>
                                ${project.url ? `<a href="${project.url}" target="_blank" class="project-link">View Project</a>` : ""}
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </section>
                `
                    : ""
                }
                
                ${
                  data.degree
                    ? `
                <section class="education-section">
                    <h3>Education</h3>
                    <div class="education-item">
                        <h4>${data.degree}</h4>
                        <span class="institution">${data.institution}</span>
                        <span class="graduation">${data.graduationYear}${data.gpa ? ` • ${data.gpa}` : ""}</span>
                    </div>
                </section>
                `
                    : ""
                }
            </main>
        </div>
        
        <style>
            .portfolio-modern {
                font-family: 'Open Sans', sans-serif;
                line-height: 1.6;
                color: #fff;
            }
            
            .portfolio-header {
                background: linear-gradient(135deg, rgba(0, 188, 212, 0.2), rgba(0, 188, 212, 0.1));
                padding: 40px;
                border-radius: 12px;
                margin-bottom: 30px;
                text-align: center;
            }
            
            .portfolio-header h1 {
                font-family: 'Work Sans', sans-serif;
                font-size: 3rem;
                color: cyan;
                margin-bottom: 10px;
            }
            
            .portfolio-header h2 {
                font-size: 1.5rem;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 20px;
            }
            
            .bio {
                font-size: 1.1rem;
                margin-bottom: 20px;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .contact-info {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            
            .social-links {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
            }
            
            .social-links a {
                color: cyan;
                text-decoration: none;
                padding: 8px 16px;
                border: 1px solid cyan;
                border-radius: 20px;
                transition: all 0.3s ease;
            }
            
            .social-links a:hover {
                background: cyan;
                color: #0a192f;
            }
            
            .portfolio-main section {
                margin-bottom: 40px;
                padding: 30px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 12px;
                border: 1px solid rgba(0, 255, 255, 0.3);
            }
            
            .portfolio-main h3 {
                font-family: 'Work Sans', sans-serif;
                color: cyan;
                font-size: 1.8rem;
                margin-bottom: 20px;
                border-bottom: 2px solid rgba(0, 255, 255, 0.3);
                padding-bottom: 10px;
            }
            
            .skills-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .skill-tag {
                background: rgba(0, 255, 255, 0.2);
                color: cyan;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.9rem;
                border: 1px solid rgba(0, 255, 255, 0.3);
            }
            
            .experience-item {
                margin-bottom: 30px;
                padding: 20px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            
            .exp-header {
                margin-bottom: 15px;
            }
            
            .exp-header h4 {
                color: cyan;
                font-size: 1.3rem;
                margin-bottom: 5px;
            }
            
            .company {
                color: rgba(255, 255, 255, 0.9);
                font-weight: 600;
                margin-right: 20px;
            }
            
            .duration {
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.9rem;
            }
            
            .projects-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }
            
            .project-card {
                background: rgba(0, 0, 0, 0.1);
                padding: 20px;
                border-radius: 8px;
                border: 1px solid rgba(0, 255, 255, 0.2);
            }
            
            .project-card h4 {
                color: cyan;
                margin-bottom: 10px;
            }
            
            .project-tech {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin: 15px 0;
            }
            
            .tech-tag {
                background: rgba(255, 64, 129, 0.2);
                color: #ff4081;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
            }
            
            .project-link {
                color: cyan;
                text-decoration: none;
                font-weight: 600;
            }
            
            .project-link:hover {
                text-decoration: underline;
            }
            
            .education-item h4 {
                color: cyan;
                margin-bottom: 5px;
            }
            
            .institution {
                color: rgba(255, 255, 255, 0.9);
                font-weight: 600;
                margin-right: 20px;
            }
            
            .graduation {
                color: rgba(255, 255, 255, 0.7);
            }
            
            @media (max-width: 768px) {
                .portfolio-header h1 {
                    font-size: 2rem;
                }
                
                .contact-info {
                    flex-direction: column;
                    gap: 10px;
                }
                
                .projects-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    `
}

function generateCreativeTemplate(data) {
  const skills = data.skills ? data.skills.split(",").map((skill) => skill.trim()) : []
  const experience = data.experience || []
  const projects = data.projects || []

  return `
      <div class="portfolio-creative">
          <header class="portfolio-header">
              <div class="header-content">
                  <div class="name-section">
                      <h1>${data.fullName || "Your Name"}</h1>
                      <div class="profession-badge">
                          <h2>${data.profession || "Your Profession"}</h2>
                      </div>
                  </div>
                  <p class="bio">${data.bio || "Your professional bio will appear here."}</p>
                  <div class="contact-grid">
                      ${data.email ? `<div class="contact-item">📧 ${data.email}</div>` : ""}
                      ${data.phone ? `<div class="contact-item">📱 ${data.phone}</div>` : ""}
                  </div>
                  <div class="social-links">
                      ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">LinkedIn</a>` : ""}
                      ${data.github ? `<a href="${data.github}" target="_blank">GitHub</a>` : ""}
                      ${data.portfolio ? `<a href="${data.portfolio}" target="_blank">Website</a>` : ""}
                      ${data.twitter ? `<a href="${data.twitter}" target="_blank">Twitter</a>` : ""}
                  </div>
              </div>
          </header>
          
          <main class="portfolio-main">
              ${
                skills.length > 0
                  ? `
              <section class="skills-section">
                  <h3>Skills & Expertise</h3>
                  <div class="skills-creative">
                      ${skills.map((skill, index) => `<span class="skill-bubble skill-${index % 3}">${skill}</span>`).join("")}
                  </div>
              </section>
              `
                  : ""
              }
              
              ${
                experience.length > 0
                  ? `
              <section class="experience-section">
                  <h3>Work Experience</h3>
                  <div class="experience-timeline">
                      ${experience
                        .map(
                          (exp, index) => `
                          <div class="timeline-item ${index % 2 === 0 ? "left" : "right"}">
                              <div class="timeline-content">
                                  <h4>${exp.jobTitle}</h4>
                                  <span class="company">${exp.company}</span>
                                  <span class="duration">${exp.startDate} - ${exp.endDate || "Present"}</span>
                                  <p class="exp-description">${exp.description}</p>
                              </div>
                              <div class="timeline-dot"></div>
                          </div>
                      `,
                        )
                        .join("")}
                  </div>
              </section>
              `
                  : ""
              }
              
              ${
                projects.length > 0
                  ? `
              <section class="projects-section">
                  <h3>Featured Projects</h3>
                  <div class="projects-masonry">
                      ${projects
                        .map(
                          (project, index) => `
                          <div class="project-card creative-card-${index % 3}">
                              <div class="project-header">
                                  <h4>${project.name}</h4>
                                  ${project.url ? `<a href="${project.url}" target="_blank" class="project-link">↗</a>` : ""}
                              </div>
                              <p class="project-description">${project.description}</p>
                              <div class="project-tech">
                                  ${
                                    project.technologies
                                      ? project.technologies
                                          .split(",")
                                          .map((tech) => `<span class="tech-pill">${tech.trim()}</span>`)
                                          .join("")
                                      : ""
                                  }
                              </div>
                          </div>
                      `,
                        )
                        .join("")}
                  </div>
              </section>
              `
                  : ""
              }
              
              ${
                data.degree
                  ? `
              <section class="education-section">
                  <h3>Education</h3>
                  <div class="education-card">
                      <div class="education-icon">🎓</div>
                      <div class="education-details">
                          <h4>${data.degree}</h4>
                          <span class="institution">${data.institution}</span>
                          <span class="graduation">${data.graduationYear}${data.gpa ? ` • ${data.gpa}` : ""}</span>
                      </div>
                  </div>
              </section>
              `
                  : ""
              }
          </main>
      </div>
      
      <style>
          .portfolio-creative {
              font-family: 'Open Sans', sans-serif;
              line-height: 1.6;
              color: #fff;
              background: linear-gradient(45deg, #0a192f, #112240);
          }
          
          .portfolio-creative .portfolio-header {
              background: linear-gradient(135deg, rgba(240, 147, 251, 0.3), rgba(245, 87, 108, 0.3));
              padding: 50px;
              border-radius: 20px;
              margin-bottom: 40px;
              text-align: center;
              position: relative;
              overflow: hidden;
          }
          
          .portfolio-creative .portfolio-header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255, 64, 129, 0.1) 0%, transparent 70%);
              animation: rotate 20s linear infinite;
          }
          
          @keyframes rotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }
          
          .name-section {
              position: relative;
              z-index: 2;
              margin-bottom: 30px;
          }
          
          .portfolio-creative .portfolio-header h1 {
              font-family: 'Work Sans', sans-serif;
              font-size: 3.5rem;
              background: linear-gradient(45deg, #ff4081, #f093fb);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin-bottom: 15px;
              text-shadow: 0 0 30px rgba(255, 64, 129, 0.5);
          }
          
          .profession-badge {
              display: inline-block;
              background: rgba(255, 64, 129, 0.2);
              border: 2px solid #ff4081;
              border-radius: 25px;
              padding: 10px 25px;
              transform: rotate(-2deg);
          }
          
          .profession-badge h2 {
              color: #ff4081;
              font-size: 1.3rem;
              margin: 0;
          }
          
          .contact-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 20px;
              margin: 30px 0;
              position: relative;
              z-index: 2;
          }
          
          .contact-item {
              background: rgba(0, 0, 0, 0.3);
              padding: 15px;
              border-radius: 15px;
              border: 1px solid rgba(255, 64, 129, 0.3);
          }
          
          .portfolio-creative .social-links a {
              background: linear-gradient(45deg, #ff4081, #f093fb);
              color: white;
              text-decoration: none;
              padding: 12px 20px;
              border-radius: 25px;
              margin: 0 10px;
              transition: all 0.3s ease;
              position: relative;
              z-index: 2;
          }
          
          .portfolio-creative .social-links a:hover {
              transform: translateY(-3px) scale(1.05);
              box-shadow: 0 10px 25px rgba(255, 64, 129, 0.4);
          }
          
          .portfolio-creative .portfolio-main {
              padding: 40px;
          }
          
          .portfolio-creative .portfolio-main section {
              margin-bottom: 50px;
              padding-bottom: 30px;
              border-bottom: 1px solid rgba(255, 64, 129, 0.2);
          }
          
          .portfolio-creative .portfolio-main section:last-child {
              border-bottom: none;
          }
          
          .portfolio-creative .portfolio-main h3 {
              font-family: 'Work Sans', sans-serif;
              background: linear-gradient(45deg, #ff4081, #f093fb);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              font-size: 2.2rem;
              margin-bottom: 30px;
              text-align: center;
          }
          
          .skills-creative {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              justify-content: center;
          }
          
          .skill-bubble {
              padding: 12px 20px;
              border-radius: 25px;
              font-weight: 600;
              transition: all 0.3s ease;
              cursor: pointer;
          }
          
          .skill-0 {
              background: linear-gradient(45deg, #ff4081, #f093fb);
              color: white;
          }
          
          .skill-1 {
              background: linear-gradient(45deg, #00bcd4, #4facfe);
              color: white;
          }
          
          .skill-2 {
              background: linear-gradient(45deg, #ffc107, #ff9800);
              color: white;
          }
          
          .skill-bubble:hover {
              transform: translateY(-5px) scale(1.1);
              box-shadow: 0 10px 25px rgba(255, 64, 129, 0.3);
          }
          
          .experience-timeline {
              position: relative;
              padding: 20px 0;
          }
          
          .experience-timeline::before {
              content: '';
              position: absolute;
              left: 50%;
              top: 0;
              bottom: 0;
              width: 3px;
              background: linear-gradient(to bottom, #ff4081, #f093fb);
              transform: translateX(-50%);
          }
          
          .timeline-item {
              position: relative;
              margin-bottom: 40px;
              width: 45%;
          }
          
          .timeline-item.left {
              left: 0;
              text-align: right;
          }
          
          .timeline-item.right {
              left: 55%;
              text-align: left;
          }
          
          .timeline-content {
              background: rgba(0, 0, 0, 0.3);
              padding: 25px;
              border-radius: 15px;
              border: 1px solid rgba(255, 64, 129, 0.3);
          }
          
          .timeline-dot {
              position: absolute;
              top: 20px;
              width: 15px;
              height: 15px;
              background: #ff4081;
              border-radius: 50%;
              border: 3px solid #0a192f;
          }
          
          .timeline-item.left .timeline-dot {
              right: -57px;
          }
          
          .timeline-item.right .timeline-dot {
              left: -57px;
          }
          
          .projects-masonry {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
              gap: 25px;
          }
          
          .creative-card-0 {
              background: linear-gradient(135deg, rgba(255, 64, 129, 0.1), rgba(240, 147, 251, 0.1));
              border: 2px solid rgba(255, 64, 129, 0.3);
          }
          
          .creative-card-1 {
              background: linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(79, 172, 254, 0.1));
              border: 2px solid rgba(0, 188, 212, 0.3);
          }
          
          .creative-card-2 {
              background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1));
              border: 2px solid rgba(255, 193, 7, 0.3);
          }
          
          .portfolio-creative .project-card {
              padding: 30px;
              border-radius: 20px;
              transition: all 0.3s ease;
          }
          
          .portfolio-creative .project-card:hover {
              transform: translateY(-10px) rotate(1deg);
              box-shadow: 0 20px 40px rgba(255, 64, 129, 0.2);
          }
          
          .project-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
          }
          
          .project-header h4 {
              color: #ff4081;
              font-size: 1.4rem;
              margin: 0;
          }
          
          .project-link {
              background: #ff4081;
              color: white;
              width: 35px;
              height: 35px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
              font-size: 1.2rem;
              transition: all 0.3s ease;
          }
          
          .project-link:hover {
              transform: scale(1.2);
              box-shadow: 0 5px 15px rgba(255, 64, 129, 0.4);
          }
          
          .tech-pill {
              background: rgba(255, 255, 255, 0.1);
              color: #ff4081;
              padding: 6px 12px;
              border-radius: 15px;
              font-size: 0.8rem;
              margin: 5px 5px 5px 0;
              display: inline-block;
              border: 1px solid rgba(255, 64, 129, 0.3);
          }
          
          .education-card {
              display: flex;
              align-items: center;
              background: rgba(0, 0, 0, 0.3);
              padding: 30px;
              border-radius: 20px;
              border: 2px solid rgba(255, 64, 129, 0.3);
          }
          
          .education-icon {
              font-size: 3rem;
              margin-right: 25px;
          }
          
          .education-details h4 {
              color: #ff4081;
              font-size: 1.5rem;
              margin-bottom: 10px;
          }
          
          @media (max-width: 768px) {
              .portfolio-creative .portfolio-header h1 {
                  font-size: 2.5rem;
              }
              
              .experience-timeline::before {
                  left: 20px;
              }
              
              .timeline-item {
                  width: calc(100% - 60px);
                  left: 60px !important;
                  text-align: left !important;
              }
              
              .timeline-item .timeline-dot {
                  left: -57px !important;
              }
              
              .projects-masonry {
                  grid-template-columns: 1fr;
              }
          }
      </style>
  `
}

function generateMinimalTemplate(data) {
  const skills = data.skills ? data.skills.split(",").map((skill) => skill.trim()) : []
  const experience = data.experience || []
  const projects = data.projects || []

  return `
      <div class="portfolio-minimal">
          <header class="portfolio-header">
              <div class="header-content">
                  <h1>${data.fullName || "Your Name"}</h1>
                  <h2>${data.profession || "Your Profession"}</h2>
                  <p class="bio">${data.bio || "Your professional bio will appear here."}</p>
                  
                  <div class="contact-minimal">
                      ${data.email ? `<span>${data.email}</span>` : ""}
                      ${data.phone ? `<span>${data.phone}</span>` : ""}
                  </div>
                  
                  <div class="social-minimal">
                      ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">LinkedIn</a>` : ""}
                      ${data.github ? `<a href="${data.github}" target="_blank">GitHub</a>` : ""}
                      ${data.portfolio ? `<a href="${data.portfolio}" target="_blank">Website</a>` : ""}
                      ${data.twitter ? `<a href="${data.twitter}" target="_blank">Twitter</a>` : ""}
                  </div>
              </div>
          </header>
          
          <main class="portfolio-main">
              ${
                skills.length > 0
                  ? `
              <section class="skills-section">
                  <h3>Skills</h3>
                  <div class="skills-list">
                      ${skills.map((skill) => `<span class="skill-item">${skill}</span>`).join("")}
                  </div>
              </section>
              `
                  : ""
              }
              
              ${
                experience.length > 0
                  ? `
              <section class="experience-section">
                  <h3>Experience</h3>
                  <div class="experience-list">
                      ${experience
                        .map(
                          (exp) => `
                          <div class="experience-item">
                              <div class="exp-header">
                                  <h4>${exp.jobTitle}</h4>
                                  <span class="duration">${exp.startDate} - ${exp.endDate || "Present"}</span>
                              </div>
                              <p class="company">${exp.company}</p>
                              <p class="exp-description">${exp.description}</p>
                          </div>
                      `,
                        )
                        .join("")}
                  </div>
              </section>
              `
                  : ""
              }
              
              ${
                projects.length > 0
                  ? `
              <section class="projects-section">
                  <h3>Projects</h3>
                  <div class="projects-list">
                      ${projects
                        .map(
                          (project) => `
                          <div class="project-item">
                              <div class="project-header">
                                  <h4>${project.name}</h4>
                                  ${project.url ? `<a href="${project.url}" target="_blank" class="project-link">View</a>` : ""}
                              </div>
                              <p class="project-description">${project.description}</p>
                              ${project.technologies ? `<p class="project-tech">${project.technologies}</p>` : ""}
                          </div>
                      `,
                        )
                        .join("")}
                  </div>
              </section>
              `
                  : ""
              }
              
              ${
                data.degree
                  ? `
              <section class="education-section">
                  <h3>Education</h3>
                  <div class="education-item">
                      <h4>${data.degree}</h4>
                      <p>${data.institution} • ${data.graduationYear}${data.gpa ? ` • ${data.gpa}` : ""}</p>
                  </div>
              </section>
              `
                  : ""
              }
          </main>
      </div>
      
      <style>
          .portfolio-minimal {
              font-family: 'Open Sans', sans-serif;
              line-height: 1.8;
              color: #fff;
              max-width: 800px;
              margin: 0 auto;
              background: rgba(0, 0, 0, 0.1);
              border-radius: 10px;
              overflow: hidden;
          }
          
          .portfolio-minimal .portfolio-header {
              background: rgba(0, 188, 212, 0.1);
              padding: 60px 40px;
              text-align: center;
              border-bottom: 1px solid rgba(0, 188, 212, 0.3);
          }
          
          .portfolio-minimal .portfolio-header h1 {
              font-family: 'Work Sans', sans-serif;
              font-size: 2.8rem;
              color: #00bcd4;
              margin-bottom: 10px;
              font-weight: 300;
              letter-spacing: 2px;
          }
          
          .portfolio-minimal .portfolio-header h2 {
              font-size: 1.2rem;
              color: rgba(255, 255, 255, 0.8);
              margin-bottom: 30px;
              font-weight: 300;
              text-transform: uppercase;
              letter-spacing: 1px;
          }
          
          .bio {
              font-size: 1rem;
              margin-bottom: 30px;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
              color: rgba(255, 255, 255, 0.9);
          }
          
          .contact-minimal {
              display: flex;
              justify-content: center;
              gap: 40px;
              margin-bottom: 30px;
              flex-wrap: wrap;
          }
          
          .contact-minimal span {
              color: rgba(255, 255, 255, 0.8);
              font-size: 0.9rem;
          }
          
          .social-minimal {
              display: flex;
              justify-content: center;
              gap: 30px;
              flex-wrap: wrap;
          }
          
          .social-minimal a {
              color: #00bcd4;
              text-decoration: none;
              font-size: 0.9rem;
              text-transform: uppercase;
              letter-spacing: 1px;
              transition: all 0.3s ease;
              border-bottom: 1px solid transparent;
          }
          
          .social-minimal a:hover {
              border-bottom-color: #00bcd4;
              color: #fff;
          }
          
          .portfolio-minimal .portfolio-main {
              padding: 40px;
          }
          
          .portfolio-minimal .portfolio-main section {
              margin-bottom: 50px;
              padding-bottom: 30px;
              border-bottom: 1px solid rgba(0, 188, 212, 0.2);
          }
          
          .portfolio-minimal .portfolio-main section:last-child {
              border-bottom: none;
          }
          
          .portfolio-minimal .portfolio-main h3 {
              font-family: 'Work Sans', sans-serif;
              color: #00bcd4;
              font-size: 1.5rem;
              margin-bottom: 25px;
              font-weight: 300;
              text-transform: uppercase;
              letter-spacing: 2px;
          }
          
          .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
          }
          
          .skill-item {
              color: rgba(255, 255, 255, 0.9);
              font-size: 0.9rem;
              padding: 8px 0;
              border-bottom: 1px solid rgba(0, 188, 212, 0.3);
              min-width: 120px;
              text-align: center;
          }
          
          .experience-item {
              margin-bottom: 35px;
          }
          
          .exp-header {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              margin-bottom: 8px;
              flex-wrap: wrap;
              gap: 10px;
          }
          
          .exp-header h4 {
              color: #00bcd4;
              font-size: 1.2rem;
              margin: 0;
              font-weight: 400;
          }
          
          .duration {
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.9rem;
              font-style: italic;
          }
          
          .company {
              color: rgba(255, 255, 255, 0.8);
              font-weight: 500;
              margin-bottom: 10px;
          }
          
          .exp-description {
              color: rgba(255, 255, 255, 0.9);
              line-height: 1.6;
          }
          
          .project-item {
              margin-bottom: 30px;
          }
          
          .project-header {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              margin-bottom: 10px;
              flex-wrap: wrap;
              gap: 10px;
          }
          
          .project-header h4 {
              color: #00bcd4;
              font-size: 1.1rem;
              margin: 0;
              font-weight: 400;
          }
          
          .project-link {
              color: rgba(255, 255, 255, 0.8);
              text-decoration: none;
              font-size: 0.9rem;
              border-bottom: 1px solid rgba(255, 255, 255, 0.3);
              transition: all 0.3s ease;
          }
          
          .project-link:hover {
              color: #00bcd4;
              border-bottom-color: #00bcd4;
          }
          
          .project-description {
              color: rgba(255, 255, 255, 0.9);
              margin-bottom: 10px;
              line-height: 1.6;
          }
          
          .project-tech {
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.9rem;
              font-style: italic;
          }
          
          .education-item h4 {
              color: #00bcd4;
              font-size: 1.2rem;
              margin-bottom: 8px;
              font-weight: 400;
          }
          
          .education-item p {
              color: rgba(255, 255, 255, 0.8);
              margin: 0;
          }
          
          @media (max-width: 768px) {
              .portfolio-minimal .portfolio-header {
                  padding: 40px 20px;
              }
              
              .portfolio-minimal .portfolio-main {
                  padding: 30px 20px;
              }
              
              .contact-minimal {
                  flex-direction: column;
                  gap: 15px;
              }
              
              .exp-header,
              .project-header {
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 5px;
              }
              
              .skills-list {
                  justify-content: center;
              }
          }
      </style>
  `
}

// Form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("portfolioForm")
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(form)
      const data = {}

      // Process single values
      for (const [key, value] of formData.entries()) {
        if (!key.includes("[]")) {
          data[key] = value
        }
      }

      // Process arrays (experience and projects)
      const jobTitles = formData.getAll("jobTitle[]")
      const companies = formData.getAll("company[]")
      const startDates = formData.getAll("startDate[]")
      const endDates = formData.getAll("endDate[]")
      const jobDescriptions = formData.getAll("jobDescription[]")

      data.experience = jobTitles
        .map((title, index) => ({
          jobTitle: title,
          company: companies[index],
          startDate: startDates[index],
          endDate: endDates[index],
          description: jobDescriptions[index],
        }))
        .filter((exp) => exp.jobTitle || exp.company)

      const projectNames = formData.getAll("projectName[]")
      const projectUrls = formData.getAll("projectUrl[]")
      const projectDescriptions = formData.getAll("projectDescription[]")
      const projectTech = formData.getAll("projectTech[]")

      data.projects = projectNames
        .map((name, index) => ({
          name: name,
          url: projectUrls[index],
          description: projectDescriptions[index],
          technologies: projectTech[index],
        }))
        .filter((project) => project.name)

      portfolioData = data
      generatePortfolio(data)
    })
  }
})

// Additional functions
function editPortfolio() {
  showPortfolioForm()
  // Populate form with existing data
  if (portfolioData) {
    Object.keys(portfolioData).forEach((key) => {
      const element = document.getElementById(key)
      if (element && typeof portfolioData[key] === "string") {
        element.value = portfolioData[key]
      }
    })
  }
}

function downloadPortfolio() {
  const portfolioContent = document.getElementById("generated-portfolio").innerHTML
  const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${portfolioData.fullName || "Portfolio"}</title>
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; background: #0a192f; padding: 20px;">
            ${portfolioContent}
        </body>
        </html>
    `

  const blob = new Blob([fullHTML], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${portfolioData.fullName || "portfolio"}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Network animation (simplified version)
function initNetworkAnimation() {
  const canvas = document.getElementById("network")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 255, 255, 0.3)"
      ctx.fill()
    })

    // Draw connections
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach((otherParticle) => {
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2),
        )

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 100)})`
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initNetworkAnimation()
  showHome()
})
