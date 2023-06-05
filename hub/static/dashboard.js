document.getElementById('url-select').addEventListener('change', function() {
    var url = encodeURIComponent(this.value);
    fetch('/data/' + url)
        .then(response => response.json())
        .then(data => {
            // Create the table
            var table = '<table><tr><th>Date</th><th>Comment</th></tr>';
            for (var i = 0; i < data.length; i++) {
                table += '<tr><td>' + data[i].date + '</td><td>' + data[i].comment + '</td></tr>';
            }
            table += '</table>';

            // Display the table
            document.getElementById('comments').innerHTML = table;
        });
});
