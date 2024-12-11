

Chart.register(ChartDataLabels);

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
            maintainAspectRatio: false,
            aspectRatio: 2,
            layout: {

                padding: {
                    top: 15,
                    bottom: 15,
                    right: 15,
                }
            },
            plugins: {
                legend: {
                    display: false // Disable the default legend        
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const dataIndex = tooltipItem.dataIndex;
                            const label = tooltipItem.chart.data.labels[dataIndex];
                            const value = tooltipItem.raw;
                            const percentage = ((value / tooltipItem.chart._metasets[0].total) * 100).toFixed(1);
                            return ` ${percentage} %`;
                        }
                    }
                },
                datalabels: {
                    anchor: 'center',       // Anchor at the edge of the chart
                    align: 'center',        // Align labels outside the pie chart
                    offset: 5,          // Space between chart and labels
                    font: {
                        size: 20,
                        weight: 'bold'
                    },
                    color: '#333',        // Text color
                    formatter: (value, ctx) => {
                        return `  ${Math.round(value)} %`; // Label and percentage
                    },
                    // Leader line settings
                    lineWidth: 2,          // Line thickness
                    lineColor: '#333',     // Line color
                    borderRadius: 4,       // Optional: Rounded corners for text background
                    padding: 5             // Padding inside label box
                }
            }
        }
    }
);

generateCustomLegend(c1, 'locuteurs-legend');

let c2;
let c2data = {
    labels: ["Primaire", "Secondaire", "Tertiare"],
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
            maintainAspectRatio: false,
            aspectRatio: 2,
            layout: {

                padding: {
                    top: 15,
                    bottom: 15,
                    right: 15,
                }
            },
            plugins: {
                legend: {
                    display: false // Disable the default legend                    
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const dataIndex = tooltipItem.dataIndex;
                            const label = tooltipItem.chart.data.labels[dataIndex];
                            const value = tooltipItem.raw;
                            const percentage = ((value / tooltipItem.chart._metasets[0].total) * 100).toFixed(1);
                            return ` ${percentage} %`;
                        }
                    }
                },
                datalabels: {
                    anchor: 'center',       // Anchor at the edge of the chart
                    align: 'start',        // Align labels outside the pie chart
                    offset: -50,          // Space between chart and labels
                    font: {
                        size: 20,
                        weight: 'bold'
                    },
                    color: ['#fff', '#333', '#333'],        // Text color
                    formatter: (value, ctx) => {
                        return `  ${Math.round(value)} %`; // Label and percentage
                    },
                    listeners: {
                        click: function (context) {
                            console.log('Label clicked:', context);
                        }
                    },
                    // Leader line settings
                    lineWidth: 2,          // Line thickness
                    lineColor: '#333',     // Line color
                    borderRadius: 4,       // Optional: Rounded corners for text background
                    padding: 5             // Padding inside label box
                }
            }
        }
    }
);
generateCustomLegend(c2, 'secteur-legend');

let c3;
let c3data = {
    labels: ["Zone rurale", "Zone urbaine"],
    datasets: [
        {
            data: [25, 75],
            backgroundColor: ["#362950", "#D8CDEC"]
        }
    ]
}

c3 = new Chart(
    document.getElementById('ag-geo'),
    {
        type: 'pie',
        data: c3data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            layout: {
                padding: {
                    top: 15,
                    bottom: 15,
                    right: 15,
                }
            },
            plugins: {
                legend: {
                    display: false // Disable the default legend        
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const dataIndex = tooltipItem.dataIndex;
                            const label = tooltipItem.chart.data.labels[dataIndex];
                            const value = tooltipItem.raw;
                            const percentage = ((value / tooltipItem.chart._metasets[0].total) * 100).toFixed(1);
                            return ` ${percentage} %`;
                        }
                    }
                },
                datalabels: {
                    anchor: 'center',       // Anchor at the edge of the chart
                    align: 'center',        // Align labels outside the pie chart
                    offset: 5,          // Space between chart and labels
                    font: {
                        size: 20,
                        weight: 'bold'
                    },
                    color: ['#fff', '#333'],        // Text color
                    formatter: (value, ctx) => {
                        return `  ${Math.round(value)} %`; // Label and percentage
                    },
                    // Leader line settings
                    lineWidth: 2,          // Line thickness
                    lineColor: '#333',     // Line color
                    borderRadius: 4,       // Optional: Rounded corners for text background
                    padding: 5             // Padding inside label box
                }
            }
        }
    }
);
generateCustomLegend(c3, 'geo-legend');

let resizeTimeout;
function resizeCharts() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {

        let w = window.innerWidth;
        console.log(w);
        let charts = [c1, c2, c3];
        // let paddingLeft = (w > 768) && (w < 991) ? 25 : 0;
        // let paddingRight = (w > 768) && (w < 991) ? 25 : 15;
        // for (let i = 0; i < charts.length; i++) {
        //     if (charts[i]) {
        //         charts[i].options.layout.padding.left = paddingLeft;
        //         charts[i].options.layout.padding.right = paddingRight;
        //         charts[i].update();
        //     }
        // }
        for (let i = 0; i < charts.length; i++) {
            if (charts[i]) {
                charts[i].resize();
            }
        }
    }, 300); // Delay to prevent rapid firing   
}

resizeCharts();
// Redraw the canvas on window resize
window.addEventListener('resize', resizeCharts);

function generateCustomLegend(chart, legend) {
    const legendContainer = document.getElementById(legend);
    const data = chart.data;
    const backgroundColors = data.datasets[0].backgroundColor;
    const legendItems = legendContainer.querySelectorAll('.legend-color-box');

    legendItems.forEach((label, index) => label.style.backgroundColor = backgroundColors[index])
}

$(document).ready(function () {

    let iconCounter = document.querySelector('.icon-counter');
    let activePopPercent = Math.round((parseInt(document.getElementById('pop-active-percent').innerHTML) / 100) * 10);

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