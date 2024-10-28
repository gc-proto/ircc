let canvas = document.getElementsByTagName("canvas");
let graph;

// let options = {
//     backgroundColor: "",
//     labelFontColor: ""
// }

for (let i = 0; i < canvas.length; i++) {
    let table = document.getElementById(canvas[i].getAttribute('aria-describedby'));
    let th = table.querySelectorAll('tbody th');
    let td = table.querySelectorAll('tbody td');
    let chartLabel = table.querySelector('thead th').innerHTML;

    let thArray = [];
    let tdArray = [];
    let options = JSON.parse(canvas[i].getAttribute('data-chart-options'));
    
    if (!options.backgroundColor) { options.backgroundColor = ""}
    if (!options.labelFontColor) { options.labelFontColor = ""}



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
                backgroundColor: options.backgroundColor
            }
        ]
    }


    graph = new Chart(
        canvas[i],
        {
            type: 'pie',
            data: data,
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
                            fontColor: options.labelFontColor,
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

}


