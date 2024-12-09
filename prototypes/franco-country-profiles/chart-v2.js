

Chart.register(ChartDataLabels);
console.log(Chart.version);
let c1;

let c1data = {
    labels: ["Francophones", "Autres"],
    datasets: [
        {
            data: [33, 66],
            backgroundColor: ["#00B1B2", "#C6EFEF"]
        }
    ]
}

c1 = new Chart(
    document.getElementById('ag-locuteurs'),
    {
        type: 'pie',
        data: c1data,
        options: {
            responsive: true,
            aspectRatio: 2,
            layout: {
                padding:15,
            },
            plugins: {
                legend: {
                    position: 'right'
                },
                datalabels: {
                    anchor: 'end',       // Anchor at the edge of the chart
                    align: 'center',        // Align labels outside the pie chart
                    offset: 5,          // Space between chart and labels
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#333',        // Text color
                    formatter: (value, ctx) => {
                        return `${value.toFixed(1)} %`; // Label and percentage
                    },
                    listeners: {
                        click: function(context) {
                            console.log('Label clicked:', context);
                        }
                    },
                    // Leader line settings
                    lineWidth: 2,          // Line thickness
                    lineColor: '#333',     // Line color
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a background
                    borderRadius: 4,       // Optional: Rounded corners for text background
                    padding: 5             // Padding inside label box
                }
            }
        }
    }
);

let c2;
let c2data = {
    labels: ["Primaire: 10,3 %", "Secondaire: 31 %", "Tertiare: 58,6 %"],
    datasets: [
        {
            label: "Répartition des secteurs",
            data: [10.3, 31, 58.6],
            backgroundColor: ["#987B06", "#F9EBB4", "#EFC519"]
        }
    ]
}
c2 = new Chart(
    document.getElementById('ag-secteurs'),
    {
        type: 'pie',
        data: c2data,
        options: {
            responsive: true,
            aspectRatio: 2,
            layout: {
                padding:15,
            },
            plugins: {
                legend: {
                    position: 'right'
                },
                datalabels: {
                    anchor: 'end',       // Anchor at the edge of the chart
                    align: 'center',        // Align labels outside the pie chart
                    offset: 5,          // Space between chart and labels
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#333',        // Text color
                    formatter: (value, ctx) => {
                        return `${value.toFixed(1)} %`; // Label and percentage
                    },
                    listeners: {
                        click: function(context) {
                            console.log('Label clicked:', context);
                        }
                    },
                    // Leader line settings
                    lineWidth: 2,          // Line thickness
                    lineColor: '#333',     // Line color
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a background
                    borderRadius: 4,       // Optional: Rounded corners for text background
                    padding: 5             // Padding inside label box
                }
            }
        }
    }
);



$(document).ready(function () {

    let iconCounter = document.querySelector('.icon-counter');
    let activePopPercent = Math.round((parseInt(document.getElementById('pop-active-percent').innerHTML) / 100) * 10);

    console.log(activePopPercent)
    for (let i = 0; i < 10; i++) {

        let icon = document.createElement('span');
        icon.classList.add('fas', 'fa-user', 'mrgn-lft-sm');
        iconCounter.appendChild(icon);
    }

    let icons = document.querySelectorAll('.icon-counter .fa-user');
    let currentIndex = 0;

    // Function to animate each icon in sequence
    function animateIcon(index) {
        if (index >= activePopPercent) {
            // No need for reset since the color remains the same
            return;
        }

        const currentIcon = icons[index];

        // Add a delay before adding the animation class

        currentIcon.classList.add('icon-animate');

        currentIcon.addEventListener('animationend', () => {
            animateIcon(index + 1); // Animate the next icon
        }, { once: true });
    }


    // Intersection Observer callback
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the animation only when the element is visible
                animateIcon(currentIndex);

                // Stop observing after triggering the animation
                observer.unobserve(entry.target);
            }
        });
    }

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersection, {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when at least 10% of the element is visible
    });

    // Observe the parent container of the icons
    document.querySelectorAll('.icon-counter').forEach(container => observer.observe(container));




});