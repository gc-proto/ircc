

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

function NMoveAvg(context, N) {
    this._context = context;
    this._points = {
      x: [],
      y: []
    };
    this._N = N;
  }

  NMoveAvg.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._point = 0;
    },
    lineEnd: function() {
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x, y) {
      x = +x, y = +y;

      this._points.x.push(x);
      this._points.y.push(y);

      if (this._points.x.length < this._N) return;

      var aX = this._points.x.reduce(function(a, b) {
          return a + b;
        }, 0) / this._N,
        aY = this._points.y.reduce(function(a, b) {
          return a + b;
        }, 0) / this._N;

      this._points.x.shift();
      this._points.y.shift();

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(aX, aY) : this._context.moveTo(aX, aY);
          break;
        case 1:
          this._point = 2; // proceed
        default:
          this._context.lineTo(aX, aY);
          break;
      }
    }
  };

  var curveNMoveAge = (function custom(N) {

    function nMoveAge(context) {
      return new NMoveAvg(context, N);
    }

    nMoveAge.N = function(N) {
      return custom(+N);
    };

    return nMoveAge;
  })(0);



const dates = {};
const tParser = d3.timeParse("%Y-%m-%d")

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
var svg2 = d3.select("#feedback-table")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('id', 'abc')
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// Parse the Data
d3.csv("https://test.canada.ca/ircc/hub/data/IRCC_Feedback.csv", function(data) {



    data = data.slice().sort((a, b) => d3.ascending(a.Date, b.Date))
    const formatTime = d3.utcFormat("%Y-%m-%d");
   
    data.forEach(function(d){
        
        
        const date = d.Date;

        if(dates[date] === undefined) {
            dates[date] = 1;
        } else {
            dates[date] = dates[date] + 1;
        }

        d.count = dates[d.Date];
    });

    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { 
            return d.Date
        }))
        .padding(0.2);


    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickValues(x.domain().filter(function(d,i){ 
                return !(i%7)

                // if (i === 99)
                //     return i;
                // else {            
                //     return !(i%7)
                // }
            })))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
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
        .attr("fill", "#69b3a2")

        
        
       
        let weekBreakdown = d3.timeWeeks(d3.min(data, function(d) { return tParser(d.Date) }), d3.max(data, function(d) { return tParser(d.Date)  }))                
        let totalWeeks = Object.keys(weekBreakdown).length;
        weekBreakdown = Object.keys(weekBreakdown).map((key) => [weekBreakdown[key]]);
        let totalDataCount = [];
        let weeklyRollingAvg = [];
        let totalWeeklyCount = 0;

        for (let i = 0; i < totalWeeks; i++) {
            let obj = {};
            let d = new Date(weekBreakdown[i][0]);
            let previousWeek = new Date(d.setDate(d.getDate() - 7));
            let numDays = 1;
            for (let j = 0; j < Object.keys(dates).length; j++) { 
                if ((new Date(tParser(Object.keys(dates)[j])) > previousWeek ) && (new Date(tParser(Object.keys(dates)[j])) <= new Date(weekBreakdown[i][0]))){
                    totalWeeklyCount +=  Object.values(dates)[j];
                    numDays++
                }                   
            }
            totalDataCount.push(totalWeeklyCount); 
            
            // obj = {time:formatTime(new Date(weekBreakdown[i][0])), avg: Math.round(totalWeeklyCount/7)}
            obj = {time:+(i+1), avg: +(Math.round(totalWeeklyCount/numDays))}

            weeklyRollingAvg.push(obj);
            totalWeeklyCount = 0;  
            numDays = 0;                    
        }
        
        var data2 = weeklyRollingAvg;
        
        let xScale = d3.scaleLinear()
            .domain([0, d3.max(weeklyRollingAvg, (function(d) {return d.time}))])
            .range([0, width])

            
            
        let yScale = d3.scaleLinear()
            .domain([d3.min(weeklyRollingAvg, (function(d) {return d.avg}), d3.max(weeklyRollingAvg, (function(d) {return d.avg})))])
            .range([0, height ])
        
        let line = d3.line() 
        .x(function(p) {
            console.log(p.time + "----" + p.avg)
            xScale(p.time)
        })
        .y(function(p) {
            yScale(p.avg)
        })
        .curve(d3.curveLinear); 


        console.log(line(weeklyRollingAvg));
    
        svg.selectAll("abc")
        .append("path")
            .attr("d", line(weeklyRollingAvg))
            .style("fill", "none")
            .style("stroke", "red");



            
            
  });

