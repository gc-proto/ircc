export function tssCharts(){
    
    const parseTime = d3.timeParse("%m/%d/%Y");

    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1100 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    legendWidth = width * 0.2,
    legendHeight = legendWidth /2.5,
    legendPadding = 15;

    var taskEaseSatisfaction = d3.select("#taskEaseSatisfaction")
        .append("svg")
            .attr("id", "taskEaseSatisfaction-chart")            
            .attr("viewBox", `0 0 1100 500`)  
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var taskCompletionRate = d3.select("#taskCompletionRate")
        .append("svg")
            .attr("id", "taskCompletionRate-chart")
            .attr("viewBox", `0 0 1100 500`)  
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://test.canada.ca/ircc/hub/data/GCTSS.csv", 
    function(d){
      return { dateTime : d3.timeParse("%m/%d/%Y")(d.dateTime), taskEase : d.taskEase, taskSatisfaction: d.taskSatisfaction, taskCompletion: d.taskCompletion, dept: d.dept }
    },
    function(data){
        // append the svg object to the body of the page
        data = data.slice().sort((a, b) => d3.ascending(a.dateTime, b.dateTime))
        var cleanedData = data;
        
        cleanedData.forEach(function(d) {

            d.dateTime = new Date(d.dateTime);
            if (d.dept === "IRCC / IRCC") {
                switch (d.taskSatisfaction) {
                    case 'Very satisfied / TrÃ¨s satisfait':
                    case 'Very satisfied / Très satisfait':
                        d.taskSatisfaction =  5;
                        break;
                    case 'Satisfied / Satisfait':
                        d.taskSatisfaction =  4;
                        break;
                    case 'Neutral / Neutre':
                        d.taskSatisfaction =  3;
                        break;
                    case 'Dissatisfied / Insatisfait':
                        d.taskSatisfaction =  2;
                        break;
                    case 'Very dissatisfied / TrÃ¨s insatisfait':
                    case 'Very dissatisfied / Très insatisfait':
                        d.taskSatisfaction =  1;
                        break;
                    default:                        
                        d.taskSatisfaction =  0;
                        break;
                }
                
                switch (d.taskEase.toString()) {
                    case 'Very easy / TrÃ¨s facile':
                    case 'Very easy / Très facile':
                        d.taskEase =  5;
                        break;
                    case 'Easy / Facile':
                        d.taskEase =  4;
                        break;
                    case 'Neutral / Neutre':
                        d.taskEase =  3;
                        break;
                    case 'Neither difficult nor easy / Ni difficile ni facile':
                        d.taskEase =  2;
                        break;
                    case 'Difficult / Difficile':
                        d.taskEase =  1;
                        break;
                    case 'Very difficult / TrÃ¨s difficile':
                    case 'Very difficult / Très difficile':
                        d.taskEase =  1;
                        break;
                    default:                        
                        d.taskEase =  0;
                        break;
                }

                switch (d.taskCompletion.toString()) {
                    case 'Yes / Oui':
                        d.taskCompletion =  1;
                        break;
                    case 'No / Non':
                        d.taskCompletion =  0;
                        break;
                    case 'I started this survey before I finished my visit / J\'ai commencé ce sondage avant d\'avoir terminé ma visite':
                        d.taskCompletion =  null;
                        break;
                    default:                        
                        d.taskCompletion =  null;
                        break;
                }
            }
        });
        console.log(cleanedData);
        
        const x = d3.scaleTime([d3.extent(data, function(d) { return d.dateTime })], [0, width]);
        // const x = d3.scaleBand()
        //     .range([ 0, width ])
        //     .domain(data.map(function(d) { return d.dateTime }))
        //     .padding(0.2);
        x.ticks(d3.utcMonth.every(1));

        const yEaseSatisfaction = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.taskEase; })])
        .range([ height, 0]);

        const yCompletion = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.taskCompletion; })])
        .range([ height, 0]);

        taskEaseSatisfaction.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
            
        taskEaseSatisfaction.append("g")
        .call(d3.axisLeft(yEaseSatisfaction));

   

        taskEaseSatisfaction.append("g")
        .append("path")
            .attr("id", "taskEase")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5);

        taskEaseSatisfaction.append("g")
        .append("path")
            .attr("id", "taskSatisfaction")
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("stroke-width", 1.5);

        var line1 = d3.line()
        .x(function(d){return x(d.dateTime); })
        .y(function(d){return yEaseSatisfaction(d.taskEase); });
        var line2 = d3.line()
        .x(function(d){return x(d.dateTime); })
        .y(function(d){return yEaseSatisfaction(d.taskSatisfaction); });

        d3.select('#taskEase').attr('d', line1(data));
        d3.select('#taskSatisfaction').attr('d', line2(data));

    
    });
}