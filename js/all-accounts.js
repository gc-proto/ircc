$(".account-chooser a").click(function (e) {
    if (this.getAttribute('href').charAt(0) === "#") {
        e.preventDefault();
        document.getElementById('account-chooser').scrollIntoView('alignToTop');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button[data-scroll-target]').forEach(function(button) {
        button.addEventListener('click', function() {
            var targetId = button.getAttribute('data-scroll-target');
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                var offset = 20; // Adjust this value as needed to create space above the buttons
                var elementPosition = targetElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


                              

