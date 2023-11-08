export function tssCharts(){
    
    const parseTime = d3.timeParse("%m/%d/%Y");
    const formatTime = d3.timeFormat("%m");

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
      return { dateTime : d.dateTime, taskEase : d.taskEase, taskSatisfaction: d.taskSatisfaction, taskCompletion: d.taskCompletion, dept: d.dept }
    },
    function(data){
        // append the svg object to the body of the page
        data = data.slice().sort((a, b) => d3.ascending(a.dateTime, b.dateTime))
        var totalEase = 0;
        var totalSatisfaction = 0;
        var totalCompletion = 0;
        data.forEach(function(d) {
            d.dateTime = parseTime(d.dateTime);
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
        const dates = {};
        totalEase = {};
        totalSatisfaction = {};
        totalCompletion = {};

        data.forEach(function(d){        
            const date = d.dateTime;
            const ease = d.taskEase;
            const satisfaction = d.taskSatisfaction;
            const completion = d.taskCompletion;
            if (dates[date] === undefined) {
                dates[date] = 1;
                totalEase[date] = 1;
                totalSatisfaction[date] = 1;
                totalCompletion[date] = 1;
            }
            else {
                dates[date] = dates[date] + 1;
                
                totalEase[date] += ease;
                totalSatisfaction[date] += satisfaction;
                totalCompletion[date] += completion;
            }   
            
        });

        let dataAvg = Object.values(dates);
        let dataDates = Object.keys(dates);     
        let averages = [];
        for (var i = 0; i < dataAvg.length; i++){
            let obj = {}
            obj.date = new Date(dataDates[i]);            
            obj.avgEase = +(totalEase[dataDates[i]] / (dataAvg[i]-1));
            obj.avgSatisfaction = +(totalSatisfaction[dataDates[i]] / (dataAvg[i]-1));
            obj.avgCompletion = +(totalCompletion[dataDates[i]] / (dataAvg[i]-1));
            averages.push(obj);
        }
        console.log(averages);
        console.log(data);

        
        averages = averages.slice().sort((a, b) => d3.ascending(a.date, b.date))


        const x = d3.scaleTime()
        .domain(d3.extent(averages, function(d){return d.date }))
        .range([0, width]);
        x.ticks(d3.timeWeek);
        
        const yEaseSatisfaction = d3.scaleLinear()
        .domain([0, 5])
        .range([ height, 0]);

        const yCompletion = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);

       

        taskEaseSatisfaction.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)            
            .tickFormat(d3.timeFormat("%B"))
            
        )
        .selectAll("text")
            .style("text-anchor", "middle");
            
        taskEaseSatisfaction.append("g")
        .call(d3.axisLeft(yEaseSatisfaction).ticks(5));

   
   
        const yAxisGridES = d3.axisLeft(yEaseSatisfaction).tickSize(-width).tickFormat('').ticks(5);

        taskEaseSatisfaction.append("g")
        .attr('class', 'axis-grid')
        .call(yAxisGridES);

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
        .x(function(d){ return x(d.date); })
        .y(function(d){return yEaseSatisfaction(+d.avgEase); });

        var line2 = d3.line()
        .x(function(d){return x(d.date); })
        .y(function(d){return yEaseSatisfaction(d.avgSatisfaction); });

        d3.select('#taskEase').attr('d', line1(averages));
        d3.select('#taskSatisfaction').attr('d', line2(averages));


        taskCompletionRate.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)            
            .tickFormat(d3.timeFormat("%B"))
        )
        .selectAll("text")
            .style("text-anchor", "middle");
            
        taskCompletionRate.append("g")
        .call(d3.axisLeft(yCompletion).ticks(2));

   
   
        const yAxisGridComp = d3.axisLeft(yCompletion).tickSize(-width).tickFormat('').ticks(2);

        taskCompletionRate.append("g")
        .attr('class', 'axis-grid')
        .call(yAxisGridComp);

        taskCompletionRate.append("g")
        .append("path")
            .attr("id", "taskCompletion")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5);

        var line3 = d3.line()
        .x(function(d){ return x(d.date); })
        .y(function(d){return yCompletion(+d.avgCompletion); });


        d3.select('#taskCompletion').attr('d', line3(averages));

    });
}