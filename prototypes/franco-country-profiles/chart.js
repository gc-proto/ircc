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



// let canvas = document.getElementsByTagName("canvas");
// let graph;

// for (let i = 0; i < canvas.length; i++) {
//     let table = document.getElementById(canvas[i].getAttribute('aria-describedby'));
//     let th = table.querySelectorAll('tbody th');
//     let td = table.querySelectorAll('tbody td');
//     let chartLabel = table.querySelector('thead th').innerHTML;

//     let thArray = [];
//     let tdArray = [];

//     for (let j = 0; j < th.length; j++) {        
//        if (th[j].textContent != undefined) {
//         thArray.push(th[j].textContent);
//        }
//     }
//     for (let j = 0; j < td.length; j++) {
//         if (td[j].textContent != undefined) {
//             let datum = td[j].textContent;
//             if (datum.indexOf("%") > 1) {
//                 datum = parseInt(datum.split("%")[0]);
//             };
//             tdArray.push(datum);
//         }
        
//     }

//     let data = {
//         labels: thArray,
//         datasets: [
//             {
//                 label: chartLabel,
//                 data: tdArray,
//                 backgroundColor: ["#00B1B2","#C6EFEF"]
//             }
//         ]
//     }

//     console.log(data);

//     graph = new Chart(
//         canvas[i],
//         {
//             type: 'pie',
//             data: data,
//             options: {
//                 responsive: true,
//                 aspectRatio: 2,
//                 layout: {
//                     autoPadding: true,
//                     padding: 20
//                 },
//                 plugins: {
//                     legend: {
//                         position: "right"
//                     },                    
//                     labels: [
//                         {
//                             display: false
//                         },
//                         {
//                             render: 'percentage',
//                             precision: 0,
//                             showZero: true,
//                             fontSize: 12,
//                             fontColor: '#333',
//                             fontStyle: 'bold',
//                             textShadow: false,
//                             arc: false,
//                             position: 'default',
//                             overlap: false,
//                             showActualPercentages: true,
//                             outsidePadding: 4,
//                             textMargin: 4
//                         },
//                     ]
             
//                 }                
//             }
//         }
//     );

// }


