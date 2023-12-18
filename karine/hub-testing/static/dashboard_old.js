// This function is called when a new tab is clicked
function loadData(tabName, topic) {
    console.log("Tab Name: " + tabName);
    tabName = tabName.replace(/_/g, ' ');
    var url = '/data/' + encodeURIComponent(topic) + '/' + encodeURIComponent(tabName);
    console.log('Request URL:', url);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            console.log(topic, tabName); 
            // Display the topic name
            document.getElementById('topic-name').textContent = topic;
            // Create the table
            var table = document.getElementById('feedback-table');
            var noComments = document.getElementById('no-comments');
            if (data.data && data.data.length > 0) {
                table.innerHTML = '<tr><th>Date</th><th>Comment</th><th>URL</th></tr>';
                for (var i = 0; i < data.data.length; i++) {
                    var row = table.insertRow(-1);
                    var dateCell = row.insertCell(0);
                    dateCell.innerHTML = data.data[i].Date;
                    dateCell.classList.add("date-cell"); // Add class to 'Date' cells
                    row.insertCell(1).innerHTML = data.data[i].Comment;
                    row.insertCell(2).innerHTML = data.data[i].URL;
                }
                noComments.style.display = 'none';
            } else {
                table.innerHTML = '';
                noComments.style.display = 'block';
            }
            // Update the plots and word clouds
            document.getElementById('plot').src = 'data:image/png;base64,' + (data.plot || '');
            document.getElementById('sentiment-plot').src = 'data:image/png;base64,' + (data.sentiment_plot || '');
            document.getElementById('wordcloud-en').src = 'data:image/png;base64,' + (data.wordcloud_en || '');
            document.getElementById('wordcloud-fr').src = 'data:image/png;base64,' + (data.wordcloud_fr || '');
            document.getElementById('topics-en').textContent = JSON.stringify(data.topics_en || '', null, 2);
            document.getElementById('topics-fr').textContent = JSON.stringify(data.topics_fr || '', null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function openTab(tabName, topic, element) {
    tabName = tabName.replace(/_/g, ' ');
    console.log('openTab called with:', tabName, topic);
    if (typeof tabName === 'undefined') {
        console.log('Error: tabName is undefined');
        return;
    }
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(tabName).style.display = "block";

    // Load the data for the selected tab
    loadData(tabName, topic); // Pass the topic to the loadData function
}


function updateTopic(topic) {
    var tabName = document.getElementById('topic-selector').value;
    openTab('Comments', topic, document.querySelector('.tablink[data-topic="' + topic + '"]')); // Pass the tab button element with the matching topic
}

// Event for when a new topic is selected from the dropdown
document.getElementById('topic-selector').addEventListener('change', function() {
    var topic = this.value;
    updateTopic(topic);
});

// Set default topic and tab
document.addEventListener('DOMContentLoaded', function() {
    updateTopic('all');
    openTab('Comments', 'all', document.getElementsByClassName('tablink')[0]);
    });


