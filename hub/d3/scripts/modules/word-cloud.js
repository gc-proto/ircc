export function wordCloud(){
    d3.csv("https://test.canada.ca/ircc/hub/data/IRCC_Feedback.csv", function(data) {

        let comments = [];
        let subArray = [];

        let stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","));


        data.forEach(function(d,i){        
            if ((d.URL).indexOf("/en/") > -1) {
                comments.push(d.Comment)
            }     

        });

        for (let i = 0; i < comments.length; i++){
            comments[i] = comments[i].split(/[\s.]+/g)
            .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
            .map(w => w.replace(/[;:.!#@?()\[\]{},"'’”\-—]+$/g, ""))
            .map(w => w.replace(/['’]s$/g, ""))
            .map(w => w.substring(0, 30))
            .map(w => w.toLowerCase())
            .filter(w => w && !stopwords.has(w))
        }
        comments = comments.flat();
        comments = comments.sort(([, a], [, b]) => d3.descending(a, b))
   

        let filteredWords = [];
        let countedWords = [];

        comments.forEach(function(d){            
            if (!filteredWords.includes(d)){
                filteredWords.push(d);
                countedWords.push([d, getOccurrence(comments, d)]);
            }           
        })
        function getOccurrence(array, value) {
            var count = 0;
            array.forEach((v) => (v === value && count++));
            return count;
        }
        function compare(a, b) {
            if (a[1] < b[1]) return -1;
            if (a[1] > b[1]) return 1;
            return 0;
          }

        let dataWords = [];
        countedWords = countedWords.sort((a, b) => d3.descending(a[1], b[1]));
        countedWords = countedWords.slice(0,50);
        for (let i = 0; i < countedWords.length; i++) {
            let obj = {};
            obj.word = countedWords[i][0];
            obj.size = 50 - (i/2);
            dataWords.push(obj);
        }
        // let words = countedWords.forEach(elm => elm[0])
        
        // var words = ["Hello", "Everybody", "How", "Are", "You", "Today", "It", "Is", "A", "Lovely", "Day", "I", "Love", "Coding", "In", "My", "Van", "Mate"]

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = 1110 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
            
        // append the svg object to the body of the page
        var svg = d3.select("#common-words").append("svg")
            .attr("viewBox", `0 0 1100 500`)
            .append("g")
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
        // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
        // Wordcloud features that are different from one word to the other must be here
        var layout = d3.layout.cloud()
            .size([width, height])
            .words(dataWords.map(function(d) { return {text: d.word, size:d.size}; }))
            .padding(5)        //space between words
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .fontSize(function(d) { return d.size; })      // font size of words
            .on("end", draw);
        layout.start();
        
        // This function takes the output of 'layout' above and draw the words
        // Wordcloud features that are THE SAME from one word to the other can be here
        function draw(words) {
            svg
            .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size; })
                .style("fill", "#69b3a2")
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    })
}