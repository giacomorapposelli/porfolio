const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".nav-bar li");
const sections = document.querySelectorAll(".section");
const modal = document.querySelector(".modals");
const x = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const cards = document.querySelectorAll(".card");
const slider = document.querySelector(".modal-slider");
const projects = document.querySelectorAll(".modal");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const work = document.querySelectorAll(".work-content");
const images = document.querySelectorAll(".card img");
const size = projects[0].clientWidth;
const inputs = document.getElementsByTagName("input");
const text = document.querySelector("textarea");
const button = document.querySelector("button");
const message = document.querySelector(".confirm");
let counter = 0;

navLinks.forEach((link, index) => {
    link.addEventListener(
        "click",
        function (index) {
            sections[index].scrollIntoView();
        }.bind(null, index)
    );
});

const openModal = (id) => {
    !id
        ? (prevBtn.style.visibility = "hidden")
        : (prevBtn.style.visibility = "visible");
    id == projects.length - 1
        ? (nextBtn.style.visibility = "hidden")
        : (nextBtn.style.visibility = "visible");
    modal.style.visibility = "visible";
    overlay.style.visibility = "visible";
    document.body.style.overflow = "hidden";
    x.style.visibility = "visible";
    counter = id;
    slider.style.transform = "translateX(" + -size * counter + "px)";
};

const closeModal = () => {
    nextBtn.style.visibility = "hidden";
    prevBtn.style.visibility = "hidden";
    modal.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
    x.style.visibility = "hidden";
    document.body.style.overflow = "";
};

cards.forEach((card, index) => {
    card.addEventListener(
        "click",
        function (index) {
            openModal(index);
        }.bind(null, index)
    );
});

x.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

nextBtn.addEventListener("click", () => {
    prevBtn.style.visibility = "visible";
    if (counter == projects.length - 1) {
        return;
    }
    slider.style.transition = "transform 0.4s ease-in-out";
    counter++;
    slider.style.transform = "translateX(" + -size * counter + "px)";
});

prevBtn.addEventListener("click", () => {
    nextBtn.style.visibility = "visible";
    if (counter <= 0) {
        return;
    }
    slider.style.transition = "transform 0.4s ease-in-out";
    counter--;
    slider.style.transform = "translateX(" + -size * counter + "px)";
});

slider.addEventListener("transitionend", () => {
    if (projects[counter].id === "project-5-modal") {
        nextBtn.style.visibility = "hidden";
    }

    if (projects[counter].id === "project-0-modal") {
        prevBtn.style.visibility = "hidden";
    }
});

const navSlide = () => {
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".nav-bar");
    hamburger.onclick = () => {
        navbar.classList.toggle("nav-active");
        navLinks.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${
                      index / 7 + 1
                  }s`);
        });
        hamburger.classList.toggle("toggle");
    };
};

button.addEventListener("click", () => {
    for (let input of inputs) {
        if (input.value != "" && text.value != "") {
            message.style.visibility = "visible";
            setTimeout(() => (message.style.visibility = "hidden"), 4000);
        }
        setTimeout(() => {
            input.value = "";
            text.value = "";
        }, 100);
    }
});

const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1600,
    reset: true,
});

sr.reveal(".card", { interval: 300 });
sr.reveal(".name", {});
sr.reveal(".portfolio", { delay: 200 });
sr.reveal(".mainbar", { delay: 400 });
sr.reveal(".mainlogo", { interval: 200 });
sr.reveal(".contact__input", { interval: 200 });
sr.reveal(".button", { delay: 200 });

window.onload = () => navSlide();

const checkScrollSpeed = (function (settings) {
    settings = settings || {};
    let lastPos,
        newPos,
        timer,
        delta,
        delay = settings.delay || 50;

    const clear = () => {
        lastPos = null;
        delta = 0;
    };

    clear();

    return () => {
        newPos = window.scrollY;
        if (lastPos != null) {
            delta = newPos - lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
    };
})();

window.addEventListener("scroll", function () {
    let speed = checkScrollSpeed();
    if (speed > 60) {
        sr.reveal(".card", { interval: 0 }, { duration: 0 });
        sr.reveal(".portfolio", { delay: 0 }, { duration: 0 });
        sr.reveal(".mainbar", { delay: 0 }, { duration: 0 });
        sr.reveal(".mainlogo", { interval: 0 }, { duration: 0 });
        sr.reveal(".contact__input", { interval: 0 }, { duration: 0 });
        sr.reveal(".button", { interval: 0 }, { duration: 0 });
    }
});
