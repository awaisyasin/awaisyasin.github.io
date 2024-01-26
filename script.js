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
let initiallyShowing = 3

arrowLeft.addEventListener("click", () => {
    activeCardIndex--
    if (activeCardIndex < 0) {
        activeCardIndex = projectCards.length - initiallyShowing
    }
    changeCard("left")
})

arrowRight.addEventListener("click", () => {
    activeCardIndex++
    if (activeCardIndex > projectCards.length - initiallyShowing) {
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
