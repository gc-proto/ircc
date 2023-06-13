function loadData(topic) {
    var url = '/data/' + encodeURIComponent(topic);
    console.log('Request URL:', url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display the topic name
            document.getElementById('topic-name').textContent = topic;
            // Create the table
            var table = document.getElementById('feedback-table');
            var noComments = document.getElementById('no-comments');
            if (data.data.length > 0) {
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
            document.getElementById('plot').src = 'data:image/png;base64,' + data.plot;
            document.getElementById('sentiment-plot').src = 'data:image/png;base64,' + data.sentiment_plot;
            document.getElementById('wordcloud-en').src = 'data:image/png;base64,' + data.wordcloud_en;
            document.getElementById('wordcloud-fr').src = 'data:image/png;base64,' + data.wordcloud_fr;
        });
}



function openTab(tabName, elmnt) {
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
    elmnt.style.backgroundColor = "#ccc";
}
