
let slideDeck = document.getElementById('slide-deck');
let slides = document.getElementsByClassName('slide');
let slidesContainer = document.querySelector('.slides');
let btnPrevious = document.getElementById('previous');
let btnNext = document.getElementById('next');
let progressIcons = document.querySelectorAll('.slide-progress a');
let progressBar = document.querySelector('.slide-progress');

let maxSlides = slides.length - 1;
let currentSlide;

function goToNext(x) {    
    currentSlide = document.querySelector(".slide:not(.hidden)");
    if (currentSlide.querySelector('video')) currentSlide.querySelector('video').pause();

    let nextSlideNum = x ? x : (parseInt(currentSlide.getAttribute('id').split("-")[1]) + 1);
    let nextSlide = document.getElementById('slide-' + nextSlideNum);

    if (nextSlide) {

        currentSlide.classList.add('hidden');
        nextSlide.classList.remove('hidden');
        btnPrevious.classList.remove('not-visible');
        if (!x) progressIcons[nextSlideNum - 1].classList.remove('active');
        progressIcons[nextSlideNum].classList.add('active');

    }

    if ((parseInt(currentSlide.getAttribute('id').split("-")[1]) + 1) === maxSlides) {
        btnNext.classList.add('not-visible');
    }
    else {
        btnNext.classList.remove('not-visible');
    }

    let delay;
    switch (nextSlideNum) {
        case 1:
            let nums = nextSlide.querySelectorAll('.number');

            delay = 0;
            nums.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-number'); // Add the class to enlarge the element
                }, delay);

                delay += 500; // Increase the delay for the next element
            });
            break;
        case 3:
        case 4:
            nextSlide.querySelector('video').play();
        case 5:
            const bars = nextSlide.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                const finalHeight = Math.random() * 490 + 50; // Random height (50-200px)
                setTimeout(() => {
                    bar.setAttribute('height', finalHeight);
                    bar.setAttribute('y', 500 - finalHeight); // Adjust y to grow upwards
                }, index * 300); // Stagger animations
            });
        default:
            break;
    }
}

function goToPrevious(x) {
    currentSlide = document.querySelector(".slide:not(.hidden)");

    let previousSlideNum = x ? x : (parseInt(currentSlide.getAttribute('id').split("-")[1]) - 1);
    let previousSlide = document.getElementById('slide-' + previousSlideNum);

    
    if (previousSlide) {
        currentSlide.classList.add('hidden');
        previousSlide.classList.remove('hidden');
        btnNext.classList.remove('not-visible')
        if (!x) progressIcons[previousSlideNum + 1].classList.remove('active');
        progressIcons[previousSlideNum].classList.add('active');

    }

    if (parseInt(currentSlide.getAttribute('id').split("-")[1] - 1) === 0) {
        btnPrevious.classList.add('not-visible');
    }
    else {
        btnPrevious.classList.remove('not-visible');
    }
}

window.addEventListener('keydown', (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    console.log("keypressed")
    const callback = {
        "ArrowLeft": leftHandler,
        "ArrowRight": rightHandler,
        "ArrowUp": upHandler,
        "ArrowDown": downHandler,
    }[event.key]
    callback?.()
});


function leftHandler() {
    if (!btnPrevious.classList.contains('not-visible')) {
        btnPrevious.click();
    }
}
function rightHandler() {
    if (!btnNext.classList.contains('not-visible')) {
        btnNext.click();
    }
}
function upHandler() {
    let currentSlide = document.querySelector(".slide:not(.hidden)");
    let close = currentSlide.querySelector('button.close');
    if (close) {
        close.click();
    }
}
function downHandler() {
    let currentSlide = document.querySelector(".slide:not(.hidden)");
    let open = currentSlide.querySelector('button.open');
    if (open) {
        open.click();
    }
}

$(".open").on("click", function () {
    let slide = document.getElementById($(this).attr('data-slide'));
    let mainSlide = slide.querySelector('.main-slide');
    let subSlide = slide.querySelector('.sub-slide');

    mainSlide.classList.add('hidden');
    subSlide.classList.remove('hidden');
});

$(".close").on("click", function () {
    let slide = document.getElementById($(this).attr('data-slide'));
    let mainSlide = slide.querySelector('.main-slide');
    let subSlide = slide.querySelector('.sub-slide');

    mainSlide.classList.remove('hidden');
    subSlide.classList.add('hidden');
});

$(".slide-progress a").on("click", function () {
    $(".slide-progress a").removeClass('active');
    let goTo = $(this).attr('href').split("-")[1];
    let currentSlide = parseInt(document.querySelector('.slide:not(.hidden)').getAttribute('id').split("-")[1]);

    if (goTo > currentSlide) {
        goToNext(goTo);
    }
    else {
        goToPrevious(goTo);
    }
});
