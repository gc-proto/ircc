

let c1;
let c2;

let c1data = {
    labels: ["Francophones", "Autres"],
    datasets: [
        {
            label: "Locuteurs francophones et autres",
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




$(document).ready(function () {
    
    let iconCounter = document.querySelector('.icon-counter');
    let activePopPercent = Math.round((parseInt(document.getElementById('pop-active-percent').innerHTML)/100)*10);
    
    console.log(activePopPercent)

    for (let i = 0; i < 10; i++) {
        let icon = document.createElement('span');
        icon.classList.add('fas', 'fa-user', 'mrgn-lft-sm');
        if (i <= (activePopPercent-1) ){
            icon.classList.add('active');
        }
        iconCounter.appendChild(icon);
    }

});
