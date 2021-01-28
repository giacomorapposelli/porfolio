const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-bar li');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.nav-bar');
const sections = document.querySelectorAll('.section');
const modal = document.querySelector('.modals');
const videos = document.querySelectorAll('.modal-video');
const x = document.querySelector('.close-modal');
const overlay = document.querySelector('.bg');
const cards = document.querySelectorAll('.card');
const cardImg = document.querySelectorAll('.card img');
const slider = document.querySelector('.modal-slider');
const projects = document.querySelectorAll('.modal');
const workContent = document.querySelectorAll('.work-content');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const work = document.querySelectorAll('.work-content');
const images = document.querySelectorAll('.card img');
const size = projects[0].clientWidth;
const inputs = document.getElementsByTagName('input');
const text = document.querySelector('textarea');
const button = document.querySelector('button');
const message = document.querySelector('.confirm');
const summary = document.querySelectorAll('.summary')[0].innerText;
let counter = 0;
let isModalOpen = false;

navLinks.forEach((link, index) => {
    link.addEventListener(
        'click',
        function (index) {
            sections[index].scrollIntoView();
        }.bind(null, index)
    );
});

const openModal = (id) => {
    counter = id;
    isModalOpen = true;
    !id
        ? (prevBtn.style.visibility = 'hidden')
        : (prevBtn.style.visibility = 'visible');
    id == projects.length - 1
        ? (nextBtn.style.visibility = 'hidden')
        : (nextBtn.style.visibility = 'visible');
    modal.style.visibility = 'visible';
    overlay.classList.add('overlay');
    document.body.style.overflow = 'hidden';
    x.style.visibility = 'visible';
    counter = id;
    slider.style.transform = 'translateX(' + -size * counter + 'px)';
    videos[id].play();
    hamburger.style.visibility = 'hidden';
};

const closeModal = () => {
    isModalOpen = false;
    nextBtn.style.visibility = 'hidden';
    prevBtn.style.visibility = 'hidden';
    modal.style.visibility = 'hidden';
    hamburger.style.visibility = 'visible';
    overlay.classList.remove('overlay');
    x.style.visibility = 'hidden';
    document.body.style.overflow = '';
    resetVideos();
};

const resetVideos = () => {
    for (let video of videos) {
        video.pause();
        video.currentTime = 0;
    }
};

cards.forEach((card, index) => {
    card.addEventListener(
        'click',
        function (index) {
            openModal(index);
        }.bind(null, index)
    );
});

x.addEventListener('click', closeModal);

nextBtn.addEventListener('click', () => {
    prevBtn.style.visibility = 'visible';
    if (counter == projects.length - 1) {
        return;
    }
    slider.style.transition = 'transform 0.4s ease-in-out';
    counter++;
    slider.style.transform = 'translateX(' + -size * counter + 'px)';
    resetVideos();
    videos[counter].play();
});

prevBtn.addEventListener('click', () => {
    nextBtn.style.visibility = 'visible';
    if (counter <= 0) {
        return;
    }
    slider.style.transition = 'transform 0.4s ease-in-out';
    counter--;
    slider.style.transform = 'translateX(' + -size * counter + 'px)';
    resetVideos();
    videos[counter].play();
});

slider.addEventListener('transitionend', () => {
    if (projects[counter].id === 'project-5-modal') {
        nextBtn.style.visibility = 'hidden';
    }

    if (projects[counter].id === 'project-0-modal') {
        prevBtn.style.visibility = 'hidden';
    }
});

const navSlide = () => {
    if (!isModalOpen) {
        hamburger.onclick = () => {
            overlay.classList.toggle('overlay');
            navbar.classList.toggle('nav-active');
            navLinks.forEach((link, index) => {
                link.style.animation
                    ? (link.style.animation = '')
                    : (link.style.animation = `navLinkFade 0.5s ease forwards ${
                          index / 7 + 1
                      }s`);
            });
            hamburger.classList.toggle('toggle');
        };
    }
};

window.onload = () => navSlide();

button.addEventListener('click', () => {
    for (let input of inputs) {
        if (input.value != '' && text.value != '') {
            message.style.visibility = 'visible';
            setTimeout(() => (message.style.visibility = 'hidden'), 4000);
        }
        setTimeout(() => {
            input.value = '';
            text.value = '';
        }, 100);
    }
});

const sr = ScrollReveal({
    origin: 'top',
    distance: '100px',
    duration: 1800,
    reset: true
});

sr.reveal('.card', { interval: 400 });
sr.reveal('.name', {});
sr.reveal('.mainbar', { delay: 800 });
sr.reveal('.mainlogo', { delay: 1600, interval: 400 });
sr.reveal('.portfolio', { interval: 400, delay: 200 });
sr.reveal('.contact__input', { interval: 400 });
sr.reveal('.button', { delay: 1800 });

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

window.addEventListener('scroll', function () {
    let speed = checkScrollSpeed();
    if (speed > 60) {
        sr.reveal('.card', { interval: 0 }, { duration: 0 });
        sr.reveal('.portfolio', { delay: 0 }, { duration: 0 });
        sr.reveal('.mainbar', { delay: 0 }, { duration: 0 });
        sr.reveal('.mainlogo', { interval: 0 }, { duration: 0 });
        sr.reveal('.contact__input', { interval: 0 }, { duration: 0 });
        sr.reveal('.button', { interval: 0 }, { duration: 0 });
    }
});
