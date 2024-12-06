let c1; 
let c2;

let c1data = {
    labels: ["Francophones", "Autres"],
    datasets: [
        {
            label: "Locuteurs francophones et autres",
            data: [33, 66],
            backgroundColor: ["#00B1B2","#C6EFEF"]
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
                autoPadding: true,
                padding: 20
            },
            plugins: {
                legend: {
                    position: "right"
                },                    
                labels: [
                    {
                        display: false
                    },
                    {
                        render: 'percentage',
                        precision: 0,
                        showZero: true,
                        fontSize: 12,
                        fontColor: '#333',
                        fontStyle: 'bold',
                        textShadow: false,
                        arc: false,
                        position: 'default',
                        overlap: false,
                        showActualPercentages: true,
                        outsidePadding: 4,
                        textMargin: 4
                    },
                ]
            
            }                
        }
    }
);

let c2data = {
    labels: ["Primaire: 10,3%", "Secondaire: 31%", "Tertiare: 58,6%"],
    datasets: [
        {
            label: "Répartition des secteurs",
            data: [10.3, 31, 58.6],
            backgroundColor: ["#987B06","#F9EBB4","#EFC519"]
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
                autoPadding: true,
                padding: 20
            },
            plugins: {
                legend: {
                    position: "right"
                },                    
                labels: [
                    {
                        display: false
                    },
                    {
                        render: 'percentage',
                        precision: 0,
                        showZero: true,
                        fontSize: 12,
                        fontColor: ["#fff", "#333", '#333'],
                        fontStyle: 'bold',
                        textShadow: false,
                        arc: false,
                        position: 'default',
                        overlap: false,
                        showActualPercentages: true,
                        outsidePadding: 4,
                        textMargin: 4
                    },
                ]
            
            }                
        }
    }
);

let popActive = document.getElementById('pop-active');
let context = popActive.getContext('2d');

// Function to resize canvas and draw the rectangle
function resizeCanvas() {
    // Set canvas dimensions
    popActive.width = popActive.parentElement.getBoundingClientRect().width; // 100% width
    console.log(popActive.parentElement.getBoundingClientRect().width);
    popActive.height = 65;              // Fixed height

    // Draw background rectangle that fills the canvas
    context.fillStyle = '#D8CDEC'; // Set rectangle color
    context.fillRect(0, 0, popActive.width, popActive.height); // Draw rectangle

    // Draw second rectangle (top bar)
    let percentBar = parseFloat(document.getElementById('pop-active-percent').innerHTML) / 100;
    console.log(percentBar);
    const secondBarWidth = popActive.width * percentBar; // 70% of the full width
    context.fillStyle = '#362950'; // Color for the second bar
    context.fillRect(0, 0, secondBarWidth, 65); // Positioned over the first rectangle

    const text = document.getElementById('pop-active-percent').innerHTML;
      context.fillStyle = 'white'; // Text color
      context.font = 'bold 24px Noto Sans'; // Font size and style
      context.textAlign = 'left'; // left-align text
      context.textBaseline = 'middle'; // Vertically center text
      context.fillText(text, secondBarWidth / 2, 65 / 2); // Position text in the middle of the second bar
  }

  // Initial canvas setup
  resizeCanvas();

  // Redraw the canvas on window resize
  window.addEventListener('resize', resizeCanvas);


