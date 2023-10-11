const radialProgressBars = document.querySelectorAll('.progressbar-component');
radialProgressBars.forEach(function callback(value, index) {
    let percent = +(value.querySelector('.progressbar-percentage').innerHTML);
    $.keyframe.define([{
        name: `animate-progress-bar-${index}`,
        to: {
            'stroke-dashoffset': 440 - (440 * percent) / 100
        }
    }]);


    let circle = value.querySelector('circle');
    circle.style.animation = 'none';

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!circle.classList.contains('animated')) {
                if (entry.isIntersecting) {
                    circle.style.animation = `animate-progress-bar-${index} 1s ease-in-out forwards`;
                    circle.classList.add('animated');
                    return;
                }

                circle.style.animation = 'none';
            }
        });
    });

    observer.observe(value);


})


