 // Smooth navigation between sections with enhanced animations
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a")
  const sections = document.querySelectorAll("section")

  // Enhanced navigation with smooth transitions
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)

      // Remove active class from all nav links
      navLinks.forEach((nav) => nav.classList.remove("active"))
      // Add active class to clicked nav link
      link.classList.add("active")

      // Hide all sections with fade out
      sections.forEach((sec) => {
        sec.style.opacity = "0"
        sec.style.transform = "translateY(20px)"
        setTimeout(() => {
          sec.style.display = "none"
        }, 300)
      })

      // Show target section with fade in
      setTimeout(() => {
        const targetSection = document.getElementById(targetId)
        targetSection.style.display = "flex"
        setTimeout(() => {
          targetSection.style.opacity = "1"
          targetSection.style.transform = "translateY(0)"
        }, 50)
      }, 300)

      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  })

  // Default view = Home with initial animation
  sections.forEach((sec) => {
    sec.style.display = "none"
    sec.style.transition = "all 0.3s ease"
  })

  const homeSection = document.getElementById("home")
  homeSection.style.display = "flex"
  homeSection.style.opacity = "1"
  homeSection.style.transform = "translateY(0)"

  // Set home nav as active by default
  navLinks[0].classList.add("active")

  // Template selection functionality
  const templateCards = document.querySelectorAll(".template-card")
  const selectedTemplateInput = document.getElementById("selected-template")

  templateCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove selected class from all cards
      templateCards.forEach((c) => c.classList.remove("selected"))
      // Add selected class to clicked card
      card.classList.add("selected")
      // Update hidden input value
      selectedTemplateInput.value = card.dataset.template
    })
  })
})

// ===== ENHANCED PORTFOLIO MAKER =====
function handlePortfolioSubmit(e) {
  e.preventDefault()

  // Get all form values
  const formData = {
    name: document.getElementById("p-name").value,
    email: document.getElementById("p-email").value,
    phone: document.getElementById("p-phone").value,
    linkedin: document.getElementById("p-linkedin").value,
    branch: document.getElementById("p-branch").value,
    year: document.getElementById("p-year").value,
    cgpa: document.getElementById("p-cgpa").value,
    percentage: document.getElementById("p-percentage").value,
    technicalSkills: document.getElementById("p-technical-skills").value,
    softSkills: document.getElementById("p-soft-skills").value,
    languages: document.getElementById("p-languages").value,
    tools: document.getElementById("p-tools").value,
    projects: document.getElementById("p-projects").value,
    github: document.getElementById("p-github").value,
    achievements: document.getElementById("p-achievements").value,
    certifications: document.getElementById("p-certifications").value,
    experience: document.getElementById("p-experience").value,
    activities: document.getElementById("p-activities").value,
    template: document.getElementById("selected-template").value,
  }

  // Show loading state
  const outputDiv = document.getElementById("portfolio-output")
  outputDiv.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #ffd700;">
      <div style="width: 20px; height: 20px; border: 2px solid #ffd700; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      Generating your portfolio...
    </div>
  `

  // Add spinning animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)

  // Simulate processing time
  setTimeout(() => {
    const portfolioHTML = generatePortfolioTemplate(formData)
    outputDiv.innerHTML = portfolioHTML

    // Add enhanced export functionality
    addEnhancedExportFunctionality(formData)

    // Scroll to output
    outputDiv.scrollIntoView({ behavior: "smooth", block: "start" })
  }, 2000)
}

function generatePortfolioTemplate(data) {
  const templateHTML = getTemplateHTML(data)

  return `
    <div style="margin-bottom: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; background: rgba(40, 40, 40, 0.6); border-radius: 0.5rem;">
        <h3 style="color: #ffd700; margin: 0;">Portfolio Preview - ${data.template.charAt(0).toUpperCase() + data.template.slice(1)} Template</h3>
        <div style="display: flex; gap: 0.5rem;">
          <button onclick="previewFullscreen('${data.name}')" class="btn" style="background: rgba(255, 215, 0, 0.2); color: #ffd700; padding: 0.5rem 1rem; font-size: 0.875rem;">
            🔍 Full Preview
          </button>
          <button onclick="switchTemplate('${data.template === "modern" ? "professional" : "modern"}')" class="btn" style="background: rgba(255, 215, 0, 0.2); color: #ffd700; padding: 0.5rem 1rem; font-size: 0.875rem;">
            🔄 Switch Template
          </button>
        </div>
      </div>
      <div id="portfolio-preview">
        ${templateHTML}
      </div>
    </div>
  `
}

function getTemplateHTML(data) {
  switch (data.template) {
    case "professional":
      return generateProfessionalTemplate(data)
    case "modern":
      return generateModernTemplate(data)
    case "creative":
      return generateCreativeTemplate(data)
    case "minimal":
      return generateMinimalTemplate(data)
    default:
      return generateModernTemplate(data)
  }
}

function generateProfessionalTemplate(data) {
  return `
    <div class="portfolio-template" style="background: rgba(30, 30, 30, 0.9); border: 1px solid rgba(200, 200, 200, 0.2);">
      <div class="portfolio-header">
        <h1 class="portfolio-name" style="color: #ffffff;">${data.name}</h1>
        <p class="portfolio-title" style="color: #cccccc;">${data.branch} • ${data.year}</p>
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
          ${data.email ? `<span style="color: #999;">📧 ${data.email}</span>` : ""}
          ${data.phone ? `<span style="color: #999;">📱 ${data.phone}</span>` : ""}
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <div class="portfolio-section">
            <h4 style="color: #ffffff; border-bottom: 2px solid #666;">Academic Performance</h4>
            <p><strong>CGPA:</strong> ${data.cgpa}/10</p>
            ${data.percentage ? `<p><strong>Percentage:</strong> ${data.percentage}%</p>` : ""}
          </div>
          
          <div class="portfolio-section">
            <h4 style="color: #ffffff; border-bottom: 2px solid #666;">Technical Skills</h4>
            <p>${data.technicalSkills}</p>
            ${data.languages ? `<p><strong>Languages:</strong> ${data.languages}</p>` : ""}
            ${data.tools ? `<p><strong>Tools:</strong> ${data.tools}</p>` : ""}
          </div>
          
          ${
            data.certifications
              ? `
          <div class="portfolio-section">
            <h4 style="color: #ffffff; border-bottom: 2px solid #666;">Certifications</h4>
            <div style="white-space: pre-line;">${data.certifications}</div>
          </div>
          `
              : ""
          }
        </div>
        
        <div>
          <div class="portfolio-section">
            <h4 style="color: #ffffff; border-bottom: 2px solid #666;">Projects</h4>
            <div style="white-space: pre-line;">${data.projects}</div>
            ${data.github ? `<p><strong>GitHub:</strong> <a href="${data.github}" style="color: #4a9eff;">${data.github}</a></p>` : ""}
          </div>
          
          ${
            data.achievements
              ? `
          <div class="portfolio-section">
            <h4 style="color: #ffffff; border-bottom: 2px solid #666;">Achievements</h4>
            <div style="white-space: pre-line;">${data.achievements}</div>
          </div>
          `
              : ""
          }
          
          ${
            data.experience
              ? `
          <div class="portfolio-section">
            <h4 style="color: #ffffff; border-bottom: 2px solid #666;">Experience</h4>
            <div style="white-space: pre-line;">${data.experience}</div>
          </div>
          `
              : ""
          }
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #666;">
        <button onclick="exportPortfolio('${data.name}', 'professional')" class="btn btn-primary" style="background: linear-gradient(135deg, #4a9eff, #0066cc);">
          Export Portfolio
        </button>
      </div>
    </div>
  `
}

function generateModernTemplate(data) {
  return `
    <div class="portfolio-template">
      <div class="portfolio-header">
        <h1 class="portfolio-name">${data.name}</h1>
        <p class="portfolio-title">${data.branch} Student • ${data.year}</p>
        <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; flex-wrap: wrap;">
          ${data.email ? `<span style="color: #b0b0b0;">✉️ ${data.email}</span>` : ""}
          ${data.phone ? `<span style="color: #b0b0b0;">📞 ${data.phone}</span>` : ""}
          ${data.linkedin ? `<span style="color: #b0b0b0;">🔗 LinkedIn</span>` : ""}
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <div style="background: rgba(40, 40, 40, 0.6); padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #ffd700;">
          <h4 style="color: #ffd700; margin-bottom: 1rem;">🎓 Academic Excellence</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>CGPA:</span>
            <strong style="color: #ffd700;">${data.cgpa}/10</strong>
          </div>
          ${
            data.percentage
              ? `
          <div style="display: flex; justify-content: space-between;">
            <span>Percentage:</span>
            <strong style="color: #ffd700;">${data.percentage}%</strong>
          </div>
          `
              : ""
          }
        </div>
        
        <div style="background: rgba(40, 40, 40, 0.6); padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #ffd700;">
          <h4 style="color: #ffd700; margin-bottom: 1rem;">💼 Quick Stats</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>Branch:</span>
            <strong>${data.branch}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Year:</span>
            <strong>${data.year}</strong>
          </div>
        </div>
      </div>
      
      <div class="portfolio-section">
        <h4>🚀 Technical Skills</h4>
        <div style="background: rgba(40, 40, 40, 0.4); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
          <p style="margin-bottom: 0.5rem;"><strong>Core Skills:</strong> ${data.technicalSkills}</p>
          ${data.languages ? `<p style="margin-bottom: 0.5rem;"><strong>Languages:</strong> ${data.languages}</p>` : ""}
          ${data.tools ? `<p><strong>Tools & Frameworks:</strong> ${data.tools}</p>` : ""}
        </div>
        ${data.softSkills ? `<p><strong>Soft Skills:</strong> ${data.softSkills}</p>` : ""}
      </div>
      
      <div class="portfolio-section">
        <h4>💡 Featured Projects</h4>
        <div style="background: rgba(40, 40, 40, 0.4); padding: 1rem; border-radius: 0.5rem; white-space: pre-line;">
          ${data.projects}
        </div>
        ${data.github ? `<p style="margin-top: 1rem;"><strong>GitHub:</strong> <a href="${data.github}" style="color: #ffd700;">${data.github}</a></p>` : ""}
      </div>
      
      ${
        data.achievements
          ? `
      <div class="portfolio-section">
        <h4>🏆 Achievements</h4>
        <div style="background: rgba(40, 40, 40, 0.4); padding: 1rem; border-radius: 0.5rem; white-space: pre-line;">
          ${data.achievements}
        </div>
      </div>
      `
          : ""
      }
      
      ${
        data.experience
          ? `
      <div class="portfolio-section">
        <h4>💼 Experience</h4>
        <div style="background: rgba(40, 40, 40, 0.4); padding: 1rem; border-radius: 0.5rem; white-space: pre-line;">
          ${data.experience}
        </div>
      </div>
      `
          : ""
      }
      
      <div style="text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 2px solid rgba(255, 215, 0, 0.2);">
        <button onclick="exportPortfolio('${data.name}', 'modern')" class="btn btn-primary">
          📄 Export Portfolio
        </button>
      </div>
    </div>
  `
}

function generateCreativeTemplate(data) {
  return `
    <div class="portfolio-template" style="background: linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(40, 20, 40, 0.9)); border: 2px solid rgba(255, 100, 200, 0.3);">
      <div class="portfolio-header" style="background: rgba(255, 100, 200, 0.1); border-radius: 1rem; margin-bottom: 2rem;">
        <h1 class="portfolio-name" style="background: linear-gradient(135deg, #ff64c8, #ffd700); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${data.name}</h1>
        <p class="portfolio-title" style="color: #ff64c8;">${data.branch} • Creative Portfolio</p>
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
          ${data.email ? `<span style="color: #b0b0b0;">💌 ${data.email}</span>` : ""}
          ${data.phone ? `<span style="color: #b0b0b0;">📱 ${data.phone}</span>` : ""}
        </div>
      </div>
      
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div style="flex: 1; min-width: 250px; background: rgba(255, 100, 200, 0.1); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(255, 100, 200, 0.2);">
          <h4 style="color: #ff64c8; margin-bottom: 1rem;">🎨 Creative Skills</h4>
          <p>${data.technicalSkills}</p>
          ${data.softSkills ? `<p style="margin-top: 0.5rem; font-style: italic;">${data.softSkills}</p>` : ""}
        </div>
        
        <div style="flex: 1; min-width: 250px; background: rgba(255, 215, 0, 0.1); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(255, 215, 0, 0.2);">
          <h4 style="color: #ffd700; margin-bottom: 1rem;">📊 Academic Journey</h4>
          <p><strong>CGPA:</strong> ${data.cgpa}/10</p>
          <p><strong>Branch:</strong> ${data.branch}</p>
          <p><strong>Year:</strong> ${data.year}</p>
        </div>
      </div>
      
      <div class="portfolio-section" style="background: rgba(20, 20, 20, 0.6); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255, 100, 200, 0.2);">
        <h4 style="color: #ff64c8;">🚀 Creative Projects</h4>
        <div style="white-space: pre-line; line-height: 1.8;">${data.projects}</div>
        ${data.github ? `<p style="margin-top: 1rem;"><strong>Portfolio:</strong> <a href="${data.github}" style="color: #ffd700;">${data.github}</a></p>` : ""}
      </div>
      
      ${
        data.achievements
          ? `
      <div class="portfolio-section" style="background: rgba(255, 215, 0, 0.1); border-radius: 1rem; padding: 2rem; border: 1px solid rgba(255, 215, 0, 0.2); margin-top: 1rem;">
        <h4 style="color: #ffd700;">🌟 Creative Achievements</h4>
        <div style="white-space: pre-line; line-height: 1.8;">${data.achievements}</div>
      </div>
      `
          : ""
      }
      
      <div style="text-align: center; margin-top: 2rem;">
        <button onclick="exportPortfolio('${data.name}', 'creative')" class="btn btn-primary" style="background: linear-gradient(135deg, #ff64c8, #ffd700);">
          🎨 Export Creative Portfolio
        </button>
      </div>
    </div>
  `
}

function generateMinimalTemplate(data) {
  return `
    <div class="portfolio-template" style="background: rgba(250, 250, 250, 0.05); border: 1px solid rgba(200, 200, 200, 0.1); color: #f0f0f0;">
      <div class="portfolio-header" style="border-bottom: 1px solid rgba(200, 200, 200, 0.2); margin-bottom: 2rem;">
        <h1 class="portfolio-name" style="color: #ffffff; font-weight: 300; font-size: 2.5rem;">${data.name}</h1>
        <p class="portfolio-title" style="color: #cccccc; font-weight: 300;">${data.branch} • ${data.year}</p>
        <div style="margin-top: 1rem; font-size: 0.9rem; color: #999;">
          ${data.email ? `${data.email}` : ""} ${data.phone ? ` • ${data.phone}` : ""}
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 3rem;">
        <div>
          <div style="margin-bottom: 2rem;">
            <h4 style="color: #ffffff; font-weight: 400; margin-bottom: 1rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Education</h4>
            <p style="margin-bottom: 0.5rem;">${data.branch}</p>
            <p style="margin-bottom: 0.5rem;">CGPA: ${data.cgpa}/10</p>
            <p>${data.year}</p>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4 style="color: #ffffff; font-weight: 400; margin-bottom: 1rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Skills</h4>
            <p style="line-height: 1.8;">${data.technicalSkills}</p>
            ${data.languages ? `<p style="margin-top: 1rem; line-height: 1.8;"><strong>Languages:</strong> ${data.languages}</p>` : ""}
          </div>
          
          ${
            data.certifications
              ? `
          <div>
            <h4 style="color: #ffffff; font-weight: 400; margin-bottom: 1rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Certifications</h4>
            <div style="white-space: pre-line; line-height: 1.8;">${data.certifications}</div>
          </div>
          `
              : ""
          }
        </div>
        
        <div>
          <div style="margin-bottom: 2rem;">
            <h4 style="color: #ffffff; font-weight: 400; margin-bottom: 1rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Projects</h4>
            <div style="white-space: pre-line; line-height: 1.8;">${data.projects}</div>
            ${data.github ? `<p style="margin-top: 1rem;"><a href="${data.github}" style="color: #cccccc; text-decoration: underline;">${data.github}</a></p>` : ""}
          </div>
          
          ${
            data.achievements
              ? `
          <div style="margin-bottom: 2rem;">
            <h4 style="color: #ffffff; font-weight: 400; margin-bottom: 1rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Achievements</h4>
            <div style="white-space: pre-line; line-height: 1.8;">${data.achievements}</div>
          </div>
          `
              : ""
          }
          
          ${
            data.experience
              ? `
          <div>
            <h4 style="color: #ffffff; font-weight: 400; margin-bottom: 1rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Experience</h4>
            <div style="white-space: pre-line; line-height: 1.8;">${data.experience}</div>
          </div>
          `
              : ""
          }
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(200, 200, 200, 0.2);">
        <button onclick="exportPortfolio('${data.name}', 'minimal')" class="btn btn-primary" style="background: #ffffff; color: #000; border: 1px solid #ccc;">
          Export Portfolio
        </button>
      </div>
    </div>
  `
}

function addEnhancedExportFunctionality(data) {
  // Store current portfolio data globally for export functions
  window.currentPortfolioData = data
  console.log("[v0] Portfolio generated successfully for:", data.name)
}

function exportPortfolio(name, template) {
  const data = window.currentPortfolioData

  // Create comprehensive export options
  const exportModal = document.createElement("div")
  exportModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `

  exportModal.innerHTML = `
    <div style="background: rgba(20, 20, 20, 0.95); padding: 2rem; border-radius: 1rem; border: 1px solid rgba(255, 215, 0, 0.3); max-width: 500px; width: 90%;">
      <h3 style="color: #ffd700; margin-bottom: 1.5rem; text-align: center;">Export Portfolio</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <button onclick="exportAsHTML('${name}', '${template}')" class="btn btn-primary" style="width: 100%;">
          📄 Export as HTML
        </button>
        <button onclick="exportAsText('${name}', '${template}')" class="btn" style="background: rgba(255, 215, 0, 0.2); color: #ffd700; width: 100%;">
          📝 Export as Text
        </button>
        <button onclick="exportAsJSON('${name}', '${template}')" class="btn" style="background: rgba(255, 215, 0, 0.2); color: #ffd700; width: 100%;">
          🔧 Export as JSON
        </button>
        <button onclick="printPortfolio()" class="btn" style="background: rgba(255, 215, 0, 0.2); color: #ffd700; width: 100%;">
          🖨️ Print Portfolio
        </button>
      </div>
      <button onclick="closeExportModal()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #ffd700; font-size: 1.5rem; cursor: pointer;">×</button>
    </div>
  `

  document.body.appendChild(exportModal)
  window.currentExportModal = exportModal
}

function closeExportModal() {
  if (window.currentExportModal) {
    document.body.removeChild(window.currentExportModal)
    window.currentExportModal = null
  }
}

function exportAsHTML(name, template) {
  const data = window.currentPortfolioData
  const templateHTML = getTemplateHTML(data)

  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Portfolio</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d1810 50%, #1a1a1a 75%, #0a0a0a 100%);
            color: #f8fafc;
            margin: 0;
            padding: 2rem;
            min-height: 100vh;
        }
        .portfolio-template {
            background: rgba(20, 20, 20, 0.9);
            border: 1px solid rgba(255, 215, 0, 0.2);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 1000px;
            margin: 0 auto;
        }
        .portfolio-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(255, 215, 0, 0.2);
        }
        .portfolio-name {
            font-size: 2rem;
            font-weight: 700;
            color: #ffd700;
            margin-bottom: 0.5rem;
        }
        .portfolio-section {
            margin-bottom: 1.5rem;
        }
        .portfolio-section h4 {
            color: #ffd700;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        a { color: #ffd700; }
        strong { color: #ffd700; }
    </style>
</head>
<body>
    ${templateHTML}
</body>
</html>
  `

  downloadFile(fullHTML, `${name}_Portfolio_${template}.html`, "text/html")
  closeExportModal()
}

function exportAsText(name, template) {
  const data = window.currentPortfolioData

  const textContent = `
${name.toUpperCase()} - PORTFOLIO
${"=".repeat(name.length + 12)}

PERSONAL INFORMATION
${"-".repeat(20)}
Name: ${data.name}
Email: ${data.email || "Not provided"}
Phone: ${data.phone || "Not provided"}
LinkedIn: ${data.linkedin || "Not provided"}

ACADEMIC DETAILS
${"-".repeat(16)}
Branch: ${data.branch}
Year: ${data.year}
CGPA: ${data.cgpa}/10
${data.percentage ? `Percentage: ${data.percentage}%` : ""}

TECHNICAL SKILLS
${"-".repeat(16)}
${data.technicalSkills}

${data.languages ? `Programming Languages: ${data.languages}` : ""}
${data.tools ? `Tools & Frameworks: ${data.tools}` : ""}
${data.softSkills ? `Soft Skills: ${data.softSkills}` : ""}

PROJECTS
${"-".repeat(8)}
${data.projects}

${data.github ? `GitHub: ${data.github}` : ""}

${data.achievements ? `ACHIEVEMENTS\n${"-".repeat(12)}\n${data.achievements}\n` : ""}

${data.certifications ? `CERTIFICATIONS\n${"-".repeat(14)}\n${data.certifications}\n` : ""}

${data.experience ? `EXPERIENCE\n${"-".repeat(10)}\n${data.experience}\n` : ""}

${data.activities ? `ACTIVITIES\n${"-".repeat(10)}\n${data.activities}\n` : ""}

Generated using Nexus Portfolio Maker - AIT Pune
Template: ${template.charAt(0).toUpperCase() + template.slice(1)}
Date: ${new Date().toLocaleDateString()}
  `

  downloadFile(textContent, `${name}_Portfolio_${template}.txt`, "text/plain")
  closeExportModal()
}

function exportAsJSON(name, template) {
  const data = window.currentPortfolioData
  const jsonData = {
    ...data,
    exportDate: new Date().toISOString(),
    generatedBy: "Nexus Portfolio Maker - AIT Pune",
  }

  downloadFile(JSON.stringify(jsonData, null, 2), `${name}_Portfolio_${template}.json`, "application/json")
  closeExportModal()
}

function printPortfolio() {
  const portfolioContent = document.getElementById("portfolio-preview").innerHTML
  const printWindow = window.open("", "_blank")

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Portfolio - Print</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #000; background: #fff; }
            .portfolio-template { background: #fff !important; border: 1px solid #ccc !important; }
            .portfolio-name { color: #000 !important; }
            .portfolio-section h4 { color: #333 !important; }
            strong { color: #000 !important; }
            button { display: none !important; }
        </style>
    </head>
    <body>
        ${portfolioContent}
    </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.print()
  closeExportModal()
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

function previewFullscreen(name) {
  const portfolioContent = document.getElementById("portfolio-preview").innerHTML
  const previewWindow = window.open("", "_blank", "width=1200,height=800")

  previewWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name} - Portfolio Preview</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d1810 50%, #1a1a1a 75%, #0a0a0a 100%);
                color: #f8fafc;
                margin: 0;
                padding: 2rem;
                min-height: 100vh;
            }
            .portfolio-template {
                max-width: 1000px;
                margin: 0 auto;
            }
        </style>
    </head>
    <body>
        ${portfolioContent}
    </body>
    </html>
  `)

  previewWindow.document.close()
}

function switchTemplate(newTemplate) {
  const data = window.currentPortfolioData
  data.template = newTemplate

  const portfolioHTML = generatePortfolioTemplate(data)
  document.getElementById("portfolio-output").innerHTML = portfolioHTML
}

// ====== ENHANCED BACKGROUND CANVAS ======
const canvas = document.getElementById("network")
if (canvas) {
  const ctx = canvas.getContext("2d")

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  const dots = []
  const maxDots = 60 // Reduced for better performance

  for (let i = 0; i < maxDots; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i]
      d.x += d.dx
      d.y += d.dy

      // Bounce off edges
      if (d.x < 0 || d.x > canvas.width) d.dx *= -1
      if (d.y < 0 || d.y > canvas.height) d.dy *= -1

      // Draw dot with glow effect
      ctx.beginPath()
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
      ctx.fillStyle = "#ffd700"
      ctx.shadowColor = "#ffd700"
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0

      // Draw connections
      for (let j = i + 1; j < dots.length; j++) {
        const d2 = dots[j]
        const dist = Math.hypot(d.x - d2.x, d.y - d2.y)
        if (dist < 150) {
          const opacity = ((150 - dist) / 150) * 0.3
          ctx.beginPath()
          ctx.moveTo(d.x, d.y)
          ctx.lineTo(d2.x, d2.y)
          ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }
    requestAnimationFrame(animate)
  }
  animate()

  // Add some interactive effects
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    dots.forEach((dot) => {
      const dist = Math.hypot(mouseX - dot.x, mouseY - dot.y)
      if (dist < 100) {
        const force = ((100 - dist) / 100) * 0.5
        dot.dx += ((dot.x - mouseX) / dist) * force * 0.1
        dot.dy += ((dot.y - mouseY) / dist) * force * 0.1
      }
    })
  })
}
