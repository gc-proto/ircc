

includeHTML();
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

const dates = {};
const parseTime = d3.timeParse("%Y-%m-%d")

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1100 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#feedback-table")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://test.canada.ca/ircc/hub/data/IRCC_Feedback.csv", function(data) {

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
          .attr("x", function(d) {
            return x(d.Date); 
          })
          .attr("y", function(d) { return y(d.count); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.count); })
          .attr("fill", "#69b3a2")

    
    svg.append("g")
      .append("path")
        .attr("id", "rollingWeeklyMean")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5);
    
       
       var line = d3.line()
       .x(function(d){
          return x(d.coordinate); 
        })
        .y(function(d){
          return y(d.mean); 
        });

        d3.select('#rollingWeeklyMean').attr('d', line(rollingMean));
})



