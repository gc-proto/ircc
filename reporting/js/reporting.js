
const progressIndicator = document.querySelectorAll('.progress-component');
progressIndicator.forEach(function callback(value, index) {

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!value.classList.contains('animated')) {
                if (entry.isIntersecting) {
                    let steps = value.querySelectorAll('.step');
                    value.classList.add('animated')
                    for (let i = 0; i < steps.length; i++) {
                        if (!steps[i].classList.contains('step-current')) {
                            animateSteps(i);
                        }
                        else {

                            break;
                        }
                    }

                    function animateSteps(i) {
                        setTimeout(function () {
                            steps[i].classList.remove('step-incomplete', 'step-active');
                            steps[i].classList.add('step-complete', 'step-inactive');
                            if (!steps[i].classList.contains('step-current')) {
                                let sib = steps[i].nextElementSibling;
                                if (sib) {
                                    sib.classList.remove('step-inactive');
                                    sib.classList.add('step-active');
                                }
                            }

                        }, 333 * i)

                    }
                }
            }
        })

    });

    observer.observe(value);
})