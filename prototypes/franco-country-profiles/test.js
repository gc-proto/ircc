// Ensure the plugin is registered before using it
Chart.register(ChartDataLabels);
    
// MutationObserver for detecting changes in the DOM (new content added)
const observer = new MutationObserver((mutationsList, observer) => {
    // Check for added nodes in the DOM
    mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {
            // Trigger chart initialization when new elements are added
            initializeCharts();
            initializeIcons();
        }
    });
});

// Observe a specific container where new content will be inserted
const container = document.getElementById('content-container'); // Replace with the appropriate container ID
observer.observe(container, { childList: true, subtree: true });  // Watch for new child elements


// Function to initialize and update charts dynamically when new content is loaded
function initializeCharts() {
    let canvas = document.getElementsByTagName("canvas");
    let chart;

    for (let i = 0; i < canvas.length; i++) {
        let chartOptions = JSON.parse(canvas[i].getAttribute('data-chart-options'));
        let table = document.getElementById(chartOptions.table);
        let th = table.querySelectorAll('tbody th');
        let td = table.querySelectorAll('tbody td');
        let chartLabel = table.querySelector('thead th').innerHTML;

        let thArray = [];
        let tdArray = [];
        
        if (!chartOptions.backgroundColor) { chartOptions.backgroundColor = "" }
        chartOptions.backgroundColor = chartOptions.backgroundColor.trim();
        chartOptions.backgroundColor = chartOptions.backgroundColor.split(",");
        
        if (!chartOptions.color) { chartOptions.color = "" }
        chartOptions.color = chartOptions.color.trim();
        chartOptions.color = chartOptions.color.split(",");

        if (!chartOptions.datalabels) {
            chartOptions.datalabels = {"anchor": "center", "align": "center", "offset": 5};
        }
        if (!chartOptions.datalabels.anchor) { chartOptions.datalabels.anchor = "center" }
        if (!chartOptions.datalabels.align) { chartOptions.datalabels.align = "center" }
        if (!chartOptions.datalabels.offset) { chartOptions.datalabels.offset = 5 }

        for (let j = 0; j < th.length; j++) {        
            if (th[j].textContent != undefined) {
                thArray.push(th[j].textContent);
            }
        }
        for (let j = 0; j < td.length; j++) {
            if (td[j].textContent != undefined) {
                let datum = td[j].textContent;
                if (datum.indexOf("%") > 1) {
                    datum = parseInt(datum.split("%")[0]);
                };
                tdArray.push(datum);
            }
        }

        let data = {
            labels: thArray,
            datasets: [
                {
                    label: chartLabel,
                    data: tdArray,
                    backgroundColor: chartOptions.backgroundColor,
                    color: chartOptions.color
                }
            ]
        }

        chart = new Chart(
            canvas[i],
            {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 2,
                    layout: {    
                        padding: {
                            top: 5,
                            bottom: 5,
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
                                    if (chartOptions.tooltip == "percentage") return ` ${percentage} %`;
                                    else return ` ${value}`;
                                }
                            }
                        },
                        datalabels: {
                            anchor: chartOptions.datalabels.anchor,       // Anchor at the edge of the chart
                            align: chartOptions.datalabels.align,        // Align labels outside the pie chart
                            offset: chartOptions.datalabels.offset,      // Space between chart and labels
                            font: {
                                size: 20,
                                weight: 'bold'
                            },
                            color: chartOptions.color,        // Text color
                            formatter: (value, ctx) => {
                                return `  ${Math.round(value)} %`; // Label and percentage
                            },
                            // Leader line settings
                            lineWidth: 2,          // Line thickness
                            lineColor: chartOptions.color,     // Line color
                            borderRadius: 4,       // Optional: Rounded corners for text background
                            padding: 5             // Padding inside label box
                        }
                    }
                }
            }
        );
        generateCustomLegend(chart, chartOptions.legend);
    }
}

// Resize function to adjust charts on window resize
let resizeTimeout;
function resizeCharts() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        let w = window.innerWidth;

        let canvas = document.getElementsByTagName("canvas");
        for (let i = 0; i < canvas.length; i++) {
            chart = Chart.getChart(canvas[i]);
            if (chart) {
                chart.resize();
            }
        }
    }, 300); // Delay to prevent rapid firing
}

resizeCharts();
// Redraw the canvas on window resize
window.addEventListener('resize', resizeCharts);

// Generate a custom legend
function generateCustomLegend(chart, legend) {
    const legendContainer = document.getElementById(legend);
    const data = chart.data;
    const backgroundColors = data.datasets[0].backgroundColor;
    const legendItems = legendContainer.querySelectorAll('.legend-color-box');

    legendItems.forEach((label, index) => label.style.backgroundColor = backgroundColors[index])
}


//Initialize charts when the document is ready or if already loaded
document.addEventListener('DOMContentLoaded', initializeCharts);

// Icon animation
function initializeIcons() {
    let iconCounter = document.querySelector('.icon-counter');
    let activePopPercent = Math.round((parseInt(document.getElementById('pop-active-percent').innerHTML) / 100) * 10);


    
    for (let i = 0; i < 10; i++) {
        let icon = document.createElement('span');
        icon.classList.add('fas', 'fa-user', 'mrgn-lft-sm');
        iconCounter.appendChild(icon);
    }

    let icons = document.querySelectorAll('.icon-counter .fa-user');
    let currentIndex = 0;

    function animateIcon(index) {
        if (index >= activePopPercent) {
            return;
        }

        const currentIcon = icons[index];
        currentIcon.classList.add('icon-animate');

        currentIcon.addEventListener('animationend', () => {
            animateIcon(index + 1); // Animate the next icon
        }, { once: true });
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateIcon(currentIndex);
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.1,
    });

    document.querySelectorAll('.icon-counter').forEach(container => observer.observe(container));
}


    
//Initialize icons when the document is ready or if already loaded
document.addEventListener('DOMContentLoaded', initializeIcons);