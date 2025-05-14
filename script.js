document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const body = document.body
  const menuToggle = document.getElementById("menu-toggle")
  const mainNav = document.getElementById("main-nav")
  const themeToggle = document.getElementById("theme-toggle")
  const bgToggle = document.getElementById("bg-toggle")
  const backgroundOptions = document.querySelectorAll(".background-option")
  const contactForm = document.getElementById("contact-form")

  // Theme Toggle
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    // Save theme preference
    const isDarkMode = body.classList.contains("dark-mode")
    localStorage.setItem("darkMode", isDarkMode)
  })

  // Check for saved theme preference
  const savedDarkMode = localStorage.getItem("darkMode") === "true"
  if (savedDarkMode) {
    body.classList.add("dark-mode")
  }

// Menu Toggle
menuToggle.addEventListener("click", () => {
  const isVisible = mainNav.classList.contains("visible")

  if (isVisible) {
    mainNav.classList.remove("visible")
    mainNav.classList.add("hidden")
  } else {
    mainNav.classList.remove("hidden")
    mainNav.classList.add("visible")
  }
})

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      mainNav.classList.remove("visible")
      mainNav.classList.add("hidden")
    }
  })

  // Background Toggle
  let currentBgIndex = 0

  bgToggle.addEventListener("click", () => {
    // Hide current background
    backgroundOptions[currentBgIndex].classList.remove("active")

    // Move to next background
    currentBgIndex = (currentBgIndex + 1) % backgroundOptions.length

    // Show new background
    backgroundOptions[currentBgIndex].classList.add("active")

    // Save background preference
    localStorage.setItem("backgroundIndex", currentBgIndex)
  })

  // Check for saved background preference
  const savedBgIndex = localStorage.getItem("backgroundIndex")
  if (savedBgIndex !== null) {
    // Hide default background
    backgroundOptions[currentBgIndex].classList.remove("active")

    // Set to saved background
    currentBgIndex = Number.parseInt(savedBgIndex)
    backgroundOptions[currentBgIndex].classList.add("active")
  }

  // Form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      console.log("Form submitted:", { name, email, message })

      // Show success message (in a real app, you'd wait for server response)
      alert("Thanks for your message! I'll get back to you soon.")

      // Reset form
      contactForm.reset()
    })
  }

  // Page transition effect
  document.querySelectorAll("a").forEach((link) => {
    // Only apply to internal links
    if (link.hostname === window.location.hostname) {
      link.addEventListener("click", function (e) {
        // Don't apply to navigation menu toggle
        if (this.getAttribute("href").startsWith("#")) return

        e.preventDefault()
        const targetHref = this.getAttribute("href")

        // Fade out
        document.body.style.opacity = 0

        // Navigate after transition
        setTimeout(() => {
          window.location.href = targetHref
        }, 300)
      })
    }
  })
})
