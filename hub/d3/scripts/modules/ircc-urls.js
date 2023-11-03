export function mapURLs(){
    const topics = ['All', 'Campaign', 'My application', 'Passport', 'Visit', 'Immigrate', 'Work', 'Study', 'Citizenship', 'New immigrants', 'Canadians', 'Refugees and asylum', 'Enforcement and violations', 'Help Centre'];


    d3.csv("https://test.canada.ca/ircc/hub/data/URL_list.csv", function(data){

        let lobs = {};
        
        data.forEach(function(d){
            const lob = d.Topic;
            lobs[lob] = lobs[lob] === undefined ? 1 : lobs[lob] + 1;
        })
        console.log(lobs);
    })
}

export function getTopic(topic){
    var topicHeading = document.getElementById('topicHeading');
    topicHeading.innerHTML = topic;
    topicHeading.classList.add("text-capitalize");    
}