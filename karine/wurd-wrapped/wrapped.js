let slideDeck = document.getElementById('slide-deck');
let slides = document.getElementsByClassName('slide');
let slidesContainer = document.querySelector('.slides');
let btnPrevious = document.getElementById('previous');
let btnNext = document.getElementById('next');
let progressIcons = document.querySelectorAll('.slide-progress a');
let progressBar = document.querySelector('.slide-progress');

let maxSlides = slides.length - 1;
let currentSlide;

btnNext.onclick = goToNext;

function goToNext(x) {
    currentSlide = document.querySelector(".slide:not(.hidden)");
    let nextSlideNum = (parseInt(currentSlide.getAttribute('id').split("-")[1]) + 1);
    let nextSlide = document.getElementById('slide-' + nextSlideNum);
    if (nextSlide) {

        currentSlide.classList.add('hidden');
        nextSlide.classList.remove('hidden');
        btnPrevious.classList.remove('not-visible');
        progressIcons[nextSlideNum - 1].classList.remove('active');
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

btnPrevious.onclick = goToPrev;

function goToPrev(x) {
    currentSlide = document.querySelector(".slide:not(.hidden)");

    // if (x) {

      
    //         currentSlide.classList.add('hidden');
    //         document.getElementById('slide-'+ x).classList.remove('hidden');
    //         btnNext.classList.remove('not-visible')
    //         progressIcons[x].classList.add('active');

        

    //     if (parseInt(currentSlide.getAttribute('id').split("-")[1] - 1) === 0) {
    //         btnPrevious.classList.add('not-visible');
    //     }
    //     else {
    //         btnPrevious.classList.remove('not-visible');
    //     }
    // }
    // else {

        let previousSlide = document.getElementById('slide-' + (parseInt(currentSlide.getAttribute('id').split("-")[1]) - 1));
        let previousSlideNum = (parseInt(currentSlide.getAttribute('id').split("-")[1]) - 1);
        if (previousSlide) {
            currentSlide.classList.add('hidden');
            previousSlide.classList.remove('hidden');
            btnNext.classList.remove('not-visible')
            progressIcons[previousSlideNum + 1].classList.remove('active');
            progressIcons[previousSlideNum].classList.add('active');

        }

        if (parseInt(currentSlide.getAttribute('id').split("-")[1] - 1) === 0) {
            btnPrevious.classList.add('not-visible');
        }
        else {
            btnPrevious.classList.remove('not-visible');
        }
    // }
}

window.addEventListener('keydown', (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

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
    let goTo = parseInt($(this).attr('href').split("-")[1]);
    let currentSlide = parseInt(document.querySelector('.slide:not(.hidden)').getAttribute('id').split("-")[1]);
    console.log(goTo, currentSlide);

    if (goTo > currentSlide) {
        goToNext(goTo);
    }
    else {
        goToPrev(goTo);
    }
    //get current slide
    //if clicked button is less, go to prev pass query, else go to next pass query.
    //in next/prev adjust to take query which takes over next slide?
});