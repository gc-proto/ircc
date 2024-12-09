

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
            aspectRatio: 2,
            layout: {
                padding: 15,
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 16
                        },
                    }
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
            aspectRatio: 1,
            layout: {
                padding: 15,
            },
            plugins: {
                legend: {
                    display: false // Disable the default legend                    
                },
                // legend: {
                //     position: 'right',
                //     labels: {
                //         generateLabels: function(chart) {
                //             const data = chart.data;
                //             return data.labels.map((label, index) => {
                //                 const value = data.datasets[0].data[index];
                //                 const percentage = ((value / data.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                //                 return {
                //                     text: `${label}`,
                //                     fillStyle: data.datasets[0].backgroundColor[index], // Match legend color with dataset
                //                     hidden: chart.getDatasetMeta(0).data[index].hidden, // Handle hidden items
                //                     index: index
                //                 };
                //             });
                //         }
                //     }
                // },
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

function generateCustomLegend(chart, legend) {
    const legendContainer = document.getElementById(legend);
    const data = chart.data;
    const backgroundColors = data.datasets[0].backgroundColor;

    // Create legend items dynamically
    data.labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        // Create color box
        const colorBox = document.createElement('span');
        colorBox.classList.add('legend-color-box');
        colorBox.style.backgroundColor = backgroundColors[index];

        // Create label text with icon
        const labelText = document.createElement('span');
        labelText.innerHTML = `
            ${label}
            <a class="wb-lbx lbx-modal" href="#secteur-sup-info_modal">
                <i class="fas fa-info-circle"></i>
            </a>
        `;

        // Append color box and label to legend item
        legendItem.appendChild(colorBox);
        legendItem.appendChild(labelText);

        // Add to the legend container
        legendContainer.appendChild(legendItem);
    });
}
generateCustomLegend(c2, 'secteur-legend');

let c3;
let c3data = {
    labels: ["Zone urbaine", "Zone rurale"],
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
            aspectRatio: 2,
            layout: {
                padding: 15,
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 16
                        },
                        generateLabels: function (chart) {
                            const data = chart.data;
                            return data.labels.map((label, index) => {
                                const value = data.datasets[0].data[index];
                                const percentage = ((value / data.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(0);
                                return {
                                    text: `${label} : ${percentage} %`,
                                    fillStyle: data.datasets[0].backgroundColor[index], // Match legend color with dataset
                                    hidden: chart.getDatasetMeta(0).data[index].hidden, // Handle hidden items
                                    index: index
                                };
                            });
                        }
                    }
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