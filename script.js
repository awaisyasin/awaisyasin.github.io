// LAPTOP, TABLET, AND MOBILE CLASS TOGGLING

window.addEventListener("resize", () => updateBodyClasses())

function updateBodyClasses() {
    const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    const body = document.body

    if (screenWidth >= 1024 && !body.classList.contains("lg")) {
        body.classList.remove("md", "sm")
        body.classList.add("lg")
    } else if (screenWidth >= 768 && !body.classList.contains("md")) {
        body.classList.remove("lg", "sm")
        body.classList.add("md")
    } else if (screenWidth < 768 && !body.classList.contains("sm")) {
        body.classList.remove("lg", "md")
        body.classList.add("sm")
    }
}

updateBodyClasses()

// NAV OPEN AND CLOSE BUTTON FUNCTIONALITY
const open_btn = document.getElementById("open-btn")
const close_btn = document.getElementById("close-btn")
const nav_purple = document.getElementById("nav-purple")
const nav_black = document.getElementById("nav-black")

open_btn.addEventListener("click", () => showNav())
close_btn.addEventListener("click", () => hideNav())

function showNav() {
    nav_purple.classList.add("visible")
    nav_black.classList.add("visible")
}

function hideNav() {
    nav_purple.classList.remove("visible")
    nav_black.classList.remove("visible")
}

// CONTACT ME ICONS ANIMATION

const message_me = document.getElementById("message-me")
const show = message_me.querySelector(".show")
const hide = message_me.querySelector(".hide")

message_me.addEventListener("mouseenter", () => {
    message_me.classList.add("shown")
})

show.addEventListener("click", () => {
    message_me.classList.add("shown")
})
hide.addEventListener("click", () => {
    message_me.classList.remove("shown")
    message_me.classList.remove("active")
})

message_me.addEventListener("mouseleave", () => {
    if (message_me.classList.contains("shown")) {
        message_me.classList.add("active")
    }
})

// BLUR DESIGN COLOR CHANGING
const blur_design_els = document.querySelectorAll(".blur-design")
const colors = [
    "rgba(113, 242, 1, 0.2)",
    "rgba(0, 198, 255, 0.2)",
    "rgba(130, 1, 242, 0.2)",
]

function blur_design_bg_change() {
    blur_design_els.forEach(blur_design_el => {
        blur_design_el.style.backgroundImage = ""
    })

    const blur_design_el =
        blur_design_els[Math.floor(Math.random() * blur_design_els.length)]
    const random_color = colors[Math.floor(Math.random() * colors.length)]

    blur_design_el.style.backgroundImage = `linear-gradient(to bottom, ${random_color} 10%, rgba(255, 255, 255, 0) 50%)`
}

// setInterval(blur_design_bg_change, 3000)

// SCROLLLIN TO SECTION

const labels = document.querySelectorAll("#form label")

labels.forEach(label => {
    const labelText = label.innerHTML
    label.innerHTML = ""

    labelText
        .split("")
        .map((letter, idx) => {
            label.innerHTML += `<span style="transition-delay:${
                idx * 50
            }ms;">${letter}</span>`
        })
        .join(" ")
})

function scrollToSection(sectionID) {
    var target = document.getElementById(sectionID)

    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        })
    }
}

// PROGRESS BAR ANIMATION

const progressBars = document.querySelectorAll(".progress-bar")
const duration = 5000 // Desired duration in milliseconds

progressBars.forEach(progressBar => {
    const targetProgress = +progressBar.getAttribute("data-value")
    const increment = (targetProgress / duration) * 50 // Adjust the divisor (50) to control the speed

    let currentProgress = 0
    const progressInterval = setInterval(() => {
        currentProgress += increment
        progressBar.style.backgroundImage = `conic-gradient(#8201f2 ${
            currentProgress * 3.6
        }deg, #eee ${currentProgress * 3.6}deg)`
        progressBar.nextElementSibling.querySelector(
            "h4"
        ).innerHTML = `${Math.floor(
            currentProgress
        )}<span class="percentage">%</span>`

        if (currentProgress >= targetProgress) {
            clearInterval(progressInterval)
        }
    }, 50)
})

// ARROW TO SLIDE THE PROJECTS

const arrowLeft = document.querySelector(".fa-angle-left")
const arrowRight = document.querySelector(".fa-angle-right")
const projectsEl = document.querySelector(".projects")
const projectCards = document.querySelectorAll(".project-card")

let activeCardIndex = 0

window.addEventListener("resize", () => findActiveCards())

function findActiveCards() {
    const screen_width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

    if (screen_width >= 1024) {
        active_cards = 3
    } else if (screen_width >= 768) {
        active_cards = 2
    } else if (screen_width < 768) {
        active_cards = 1
    }
}

findActiveCards()

arrowLeft.addEventListener("click", () => {
    activeCardIndex--
    if (activeCardIndex < 0) {
        activeCardIndex = projectCards.length - active_cards
    }
    changeCard("left")
})

arrowRight.addEventListener("click", () => {
    activeCardIndex++
    if (activeCardIndex > projectCards.length - active_cards) {
        activeCardIndex = 0
    }
    changeCard("right")
})

function changeCard(direction = "right") {
    if (direction === "left") {
        projectCards.forEach(projectCard => {
            projectCard.style.transform = `translateX(${
                activeCardIndex * -320
            }px)`
        })
    }
    if (direction === "right") {
        projectCards.forEach(projectCard => {
            projectCard.style.transform = `translateX(${
                activeCardIndex * -320
            }px)`
        })
    }
}
