export function feedbackData(){

    

    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 1100 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        legendWidth = width * 0.2,
        legendHeight = legendWidth /2.5,
        legendPadding = 15;

    var svg = d3.select("#feedback-table")
    .append("svg")
        .attr("id", "feedback-chart")
        .attr('class', 'hidden')
        .attr("viewBox", `0 0 1100 500`)
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)    
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .text("Number of comments per day")
        .attr("x", 275)             
        .attr("y", 0 - (margin.top / 2))
        .attr("transform", "translate(" + margin.left + ",0)");

        
    
    svg.append("rect").attr("x", width -legendWidth).attr("y", 0 - (margin.top / 2)).attr("width", legendWidth).attr("height", legendHeight).style("fill", "none").style("stroke", "#000")  
    svg.append("rect").attr("x",(width -legendWidth) + legendPadding).attr("y", 0 - (margin.top / 2) + legendPadding).attr("width", 20).attr("height", 10).attr("class", "bar")
    svg.append("text").attr("x",(width -legendWidth) + legendPadding + 30).attr("y", 0 - (margin.top / 2) + legendPadding+5).text("Daily value").style("font-size", "15px").attr("alignment-baseline","middle")

    svg.append("rect").attr("x",(width -legendWidth) + legendPadding).attr("y",0 - (margin.top / 2) + legendPadding + 40).attr("width", 20).attr("height", 2).style("stroke", "#000")    
    svg.append("text").attr("x", (width -legendWidth) + legendPadding + 30).attr("y", 0 - (margin.top / 2) + legendPadding +40).text("Weekly rolling mean").style("font-size", "15px").attr("alignment-baseline","middle")

// Parse the Data
d3.csv("https://test.canada.ca/ircc/hub/data/IRCC_Feedback.csv", function(data) {
    const dates = {};
    const parseTime = d3.timeParse("%Y-%m-%d");


    // append the svg object to the body of the page
           data = data.slice().sort((a, b) => d3.ascending(a.Date, b.Date))

        data.forEach(function(d,i){        
            const date = d.Date;
            dates[date] = dates[date] === undefined ? 1 : dates[date] + 1;      
            d.count = dates[d.Date];
            d.coord = !(i%7);
        });
    
        let dataAvg = Object.values(dates);
        let dataDates = Object.keys(dates);
        let subArray = [];
        let rollingMean = [];

        for (var i = 0; i < dataAvg.length; i++){
            let obj = {}
            let total = 0;
            let avg = 0;
            subArray.push(dataAvg[i]);
            total = subArray.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            },0);
            avg = total / subArray.length;
            if (subArray.length > 7 ) {
                subArray.shift();
            }
            
            obj.coordinate = dataDates[i];
            obj.mean = +(Math.round(avg));
            rollingMean.push(obj)
        }

        let x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d.Date }))
            .padding(0.2);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickValues(x.domain().filter(function(d,i){return !(i%7)})))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

        let y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d.count; })])
            .range([ height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.Date); })
            .attr("y", function(d) { return y(d.count); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.count); })
            .attr("class", "bar");

        
        svg.append("g")
        .append("path")
            .attr("id", "rollingWeeklyMean")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5);
        
        
        var line = d3.line()
        .x(function(d){return x(d.coordinate); })
        .y(function(d){return y(d.mean); });

        d3.select('#rollingWeeklyMean').attr('d', line(rollingMean));


        // Build WET filterable table;
        // let fDates = data.map(function(d) { return d.Date });
        // let fComments = data.map(function(d) { return d.Comment });
        // let fURL = data.map(function(d) { return d.URL });      
        tabulate(data, ['Date', 'Comment', 'URL']); // 2 column table


        $( ".wb-tables" ).trigger( "wb-init.wb-tables" );
            document.querySelector('.loading').classList.add('hidden');
            document.querySelector('#feedback-chart').classList.remove('hidden');
        

    })

    function tabulate(data, columns) {
        var table = d3.select('#data-table').append('table').attr('class', 'wb-tables table')        
        var thead = table.append('thead')
        var	tbody = table.append('tbody');

        // table.classList.add('wb-tables', 'table');
    
        
        // append the header row
        thead.append('tr')
          .selectAll('th')
          .data(columns).enter()
          .append('th')
            .text(function (column) { return column; });
    
        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
          .data(data)
          .enter()
          .append('tr');

        // create a cell in each row for each column
        var cells = rows.selectAll('td')
          .data(function (row) {
            return columns.map(function (column) {
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
            .attr('class', function (d) { 
                if (d.column === 'Date'){
                    return 'nowrap'; 
                }
            })
            .text(function (d) { 
                if (d.column != 'URL'){
                    return d.value; 
                }
            })
            .append('a')
                .attr('href', function (d) { 
                    if (d.column === 'URL'){
                        return d.value; 
                    }
                })
                .attr('target', '_blank')
                .text(function (d) { 
                    if (d.column === 'URL'){
                        return d.value; 
                    }
                });
       
                
      return table;     
    }
}