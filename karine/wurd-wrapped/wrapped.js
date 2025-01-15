let slides = document.getElementsByClassName('slide');
let btnPrevious = document.getElementById('previous');
let btnNext = document.getElementById('next');

let maxSlides = slides.length - 1;
let currentSlide;

btnNext.onclick = function () {
    currentSlide = document.querySelector(".slide:not(.hidden)");
    let nextSlideNum = (parseInt(currentSlide.getAttribute('id').split("-")[1]) + 1);
    let nextSlide = document.getElementById('slide-' + nextSlideNum);
    if (nextSlide) {

        currentSlide.classList.add('hidden');
        nextSlide.classList.remove('hidden');
        btnPrevious.classList.remove('hidden');

    }
    console.log((parseInt(currentSlide.getAttribute('id').split("-")[1]) + 1), maxSlides)
    if ((parseInt(currentSlide.getAttribute('id').split("-")[1]) + 1) === maxSlides) {
        btnNext.classList.add('hidden');
    }
    else {
        btnNext.classList.remove('hidden');
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

                delay += 1000; // Increase the delay for the next element
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

btnPrevious.onclick = function () {
    currentSlide = document.querySelector(".slide:not(.hidden)");
    let previousSlide = document.getElementById('slide-' + (parseInt(currentSlide.getAttribute('id').split("-")[1]) - 1));
    if (previousSlide) {
        currentSlide.classList.add('hidden');
        previousSlide.classList.remove('hidden');
        btnNext.classList.remove('hidden');
    }

    if (parseInt(currentSlide.getAttribute('id').split("-")[1] - 1) === 0) {
        btnPrevious.classList.add('hidden');
    }
    else {
        btnPrevious.classList.remove('hidden');
    }
}

window.addEventListener('keydown', (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    const callback = {
        "ArrowLeft": leftHandler,
        "ArrowRight": rightHandler,
    }[event.key]
    callback?.()
});


function leftHandler() {
    if (!btnPrevious.classList.contains('hidden')) {
        btnPrevious.click();
    }
}
function rightHandler() {
    if (!btnNext.classList.contains('hidden')) {
        btnNext.click();
    }
}

