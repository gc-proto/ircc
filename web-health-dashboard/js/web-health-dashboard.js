$(document).on("wb-ready.wb", function (event) {

    let today = new Date();

    let devicesChart,
        topReferrerChart,
        topSocialChart,
        topPagesChart,
        topTopicENChart,
        topTopicFRChart,
        topVisitENChart,
        topVisitFRChart,
        topImmigrationENChart,
        topImmigrationFRChart,
        topWorkENChart,
        topWorkFRChart,
        topStudyENChart,
        topStudyFRChart,
        tssMonthsChart,
        crisisChart,
        campaignChart,
        utmChart;

    let toptasktable =  document.getElementById("tss-top-tasks-table").outerHTML;
    let mobiletable =  document.getElementById("top-mobile-table").outerHTML;
    let monthstable =  document.getElementById("tss-over-12-months-table").outerHTML;

    


    today = String(today).replace(" ", "-");
    const s = d3.formatSpecifier("s");
    s.precision = d3.precisionFixed(1);

    let p;
    let f;

    function formatNumber(num) {
        if (num >= 1000000) {
            p = d3.precisionPrefix(1e5, 1.3e6);
            f = d3.formatPrefix("." + p, 1.3e6);
        }
        else if (num >= 1000) {
            p = d3.precisionPrefix(1e5, 1.3e6);
            f = d3.formatPrefix("." + p, 1.3e5);
        }
        else { f = d3.format(".2f"); }
        return f(num);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateModified = ((document.lastModified).split(" ")[0]).split("/");
    let month = dateModified[0];
    let day = dateModified[1];
    let year = dateModified[2];

    dateModified = monthNames[month - 1] + " " + day + ", " + year

    document.getElementById("dateModified").innerHTML = dateModified;

    d3.csv("csv/previous-data.txt?" + today, function (data) {

        let previousData = data.map(function (d) { return d["Previous"] })


        parseTime = d3.utcParse("%Y-%m");
        formatTime = d3.utcFormat("%B %Y");

        let thisMonth =  new Date();
        let thisMonthOption = document.createElement('option');
        thisMonthOption.setAttribute('value', "-1");
        thisMonthOption.innerHTML = "Latest data";
        document.getElementById('previous-data-select').appendChild(thisMonthOption)

        for (var i = 0; i < previousData.length; i++) {
            let previousOption = document.createElement('option');
            previousOption.setAttribute('value', previousData[i]);
            previousOption.innerHTML = formatTime(parseTime(previousData[i]));
            document.getElementById('previous-data-select').appendChild(previousOption)
        }
    });

    function tabulate(div, data, caption, columns) {
       
        document.getElementById(div).innerHTML = "";
        let tempTable = document.getElementById(div).outerHTML;
        document.getElementById(div).closest('.table-responsive').innerHTML = tempTable;
        var table = d3.select("#" + div);        
        table.append('caption')
            .text(caption)

        var thead = table.append('thead')
        var tbody = table.append('tbody');



        // append the header row
        thead.append('tr')
            .selectAll('th')
            .data(columns).enter()
            .append('th')
            .attr('scope', 'col')
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
                    return { column: column, value: row[column] };
                });
            })
            .enter()
            .append('td')
            .text(function (d) { return d.value; });

        return table;
    }

    runData();

    function runData(previousData) {
        let path = previousData ? "csv/export/previous/" + previousData : "csv/export/";

        if (previousData) {
            devicesChart.destroy();
            topReferrerChart.destroy();
            topSocialChart.destroy();
            topPagesChart.destroy();
            topTopicENChart.destroy();
            topTopicFRChart.destroy();
            topVisitENChart.destroy();
            topVisitFRChart.destroy();
            topImmigrationENChart.destroy();
            topImmigrationFRChart.destroy();
            topWorkENChart.destroy();
            topWorkFRChart.destroy();
            topStudyENChart.destroy();
            topStudyFRChart.destroy();
            tssMonthsChart.destroy();
            crisisChart.destroy();
            campaignChart.destroy();
            utmChart.destroy();
        }

        d3.csv(path + "/traffic-volumes.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Day"].length == 0) {
                    return false;
                }
                return true;
            });

            // Daily average visits & Daily average visits - Month before
            let daily_average = (data.map(function (d) { return d["Daily average visits"]; }))[0]
            let daily_average_lastMonth = (data.map(function (d) { return d["Daily average visits - Month before"]; }))[0]
            document.getElementById('daily-average-visits').innerHTML = formatNumber(daily_average);
            difference(daily_average, daily_average_lastMonth, "daily-average-visits-change", "month");

            // Visits & Visits - Month before
            let total_visits = (data.map(function (d) { return d["Visits"]; }))[0]
            let total_visits_lastMonth = (data.map(function (d) { return d["Visits - Month before"]; }))[0]
            document.getElementById('total-visits').innerHTML = formatNumber(total_visits);
            difference(total_visits, total_visits_lastMonth, "total-visits-change", "month");

            // Page Views per Visit & Page Views per Visit
            let page_views_visit = (data.map(function (d) { return d["Page Views per Visit"]; }))[0]
            let page_views_visits_lastMonth = (data.map(function (d) { return d["Page Views per Visit - Month before"]; }))[0]
            document.getElementById('page-views-visits').innerHTML = formatNumber(page_views_visit);
            difference(page_views_visit, page_views_visits_lastMonth, "page-views-visits-change", "month");

            //Daily average page views,Daily average page views - Month before,
            let page_views = (data.map(function (d) { return d["Daily average page views"]; }))[0]
            let page_views_lastMonth = (data.map(function (d) { return d["Daily average page views - Month before"]; }))[0]
            document.getElementById('daily-average-page-views').innerHTML = formatNumber(page_views);
            difference(page_views, page_views_lastMonth, "daily-average-page-views-change", "month");

            // Page Views,Page Views - Month before
            let total_page_views = d3.sum(data, function (d, i) {
                if (i > 0) { return d["Page Views"]; }
            });
            let total_page_views_lastMonth = d3.sum(data, function (d, i) {
                if (i > 0) { return d["Page Views - Month before"]; }
            });

            document.getElementById('total-page-views').innerHTML = formatNumber(total_page_views);
            difference(total_page_views, total_page_views_lastMonth, "total-page-views-change");



            d3.csv(path + "/traffic.txt?" + today, function (data) {
                data.forEach(function (d, i) {
                    document.getElementById('traffic-insights').innerHTML = d["Insights"];
                    document.getElementById('traffic-dates').innerHTML = d["Date"].replace(/_/g, ",");
                })
            });


        });

        d3.csv(path + "/referrer-type.csv?" + today, function (data) {


            let label = "Top referrer types";

            let x = data.map(function (d) { return d["Referrer Type"] })
            let y = data.map(function (d) { return d["Entries"] });
            let sum = d3.sum(data.map(function (d) { return d["Entries"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topReferrerChart = new Chart(
                document.getElementById('top-referrer-chart'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Referrer Type"] = d["Referrer Type"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Entries"]) / sum);
                d["Entries"] = d3.format(",")(d["Entries"]);
            });
            tabulate("top-referrer-table", data, label, ['Referrer Type', 'Entries', 'Percentage']);
        });

        d3.csv(path + "/social-networks.csv?" + today, function (data) {


            let label = "Top social networks referring traffic";

            let x = data.map(function (d) { return d["Referring Domain"] })
            let y = data.map(function (d) { return d["Entries"] });
            let sum = d3.sum(data.map(function (d) { return d["Entries"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topSocialChart = new Chart(
                document.getElementById('top-social-chart'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Referring Domain"] = d["Referring Domain"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Entries"]) / sum);
                d["Entries"] = d3.format(",")(d["Entries"]);
            });
            tabulate("top-social-table", data, label, ['Referring Domain', 'Entries', 'Percentage']);

            d3.csv(path + "/trafficSources.txt?" + today, function (data) {
                data.forEach(function (d, i) {

                    document.getElementById('referrer-date').innerHTML = d["Date"].replace(/_/g, ",");
                })
            });
        });

        d3.csv(path + "/top-pages.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Page title"].length == 0) {
                    return false;
                }
                return true;
            });
            let label = "Visits";
            let x = data.map(function (d) { return d["Page title"] })
            let y = data.map(function (d) { return d3.format("f")(d["Visits"]) })
            let sum = d3.sum(data.map(function (d) { return d["Visits"] }));


            // let percentage = [];
            // for (var i = 0; i < y.length; i++) {
            //     percentage.push((y[i] / sum) * 100);
            // }


            topPagesChart = new Chart(
                document.getElementById('top-pages-chart'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: y,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Page title"] = d["Page title"];
                d["Visits"] = d3.format(",")(d["Visits"]);
            });
            tabulate("top-pages-table", data, label, ['Page title', 'Visits']);

            d3.csv(path + "/topContent.txt?" + today, function (data) {
                data.forEach(function (d, i) {

                    document.getElementById('top-content-date').innerHTML = d["Date"].replace(/_/g, ",");
                })
            });
        });

        d3.csv(path + "/top-theme-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "Most clicked links on English theme page";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topTopicENChart = new Chart(
                document.getElementById('top-topic-chart-en'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-topic-table-en", data, label, ['Link', 'Clicks', 'Percentage']);
        });

        d3.csv(path + "/top-theme-fr.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "Most clicked links on French theme page";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topTopicFRChart = new Chart(
                document.getElementById('top-topic-chart-fr'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-topic-table-fr", data, label, ['Link', 'Clicks', 'Percentage']);
        });

        d3.csv(path + "/top-visit-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "Most clicked links in Visit (English)";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topVisitENChart = new Chart(
                document.getElementById('top-visit-chart-en'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];

                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-visit-table-en", data, label, ['Link', 'Clicks', 'Percentage']);
        });

        d3.csv(path + "/top-visit-fr.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });
            let label = "Most clicked links in Visit (French)";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topVisitFRChart = new Chart(
                document.getElementById('top-visit-chart-fr'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Program"] = d["Program"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-visit-table-fr", data, label, ['Program', 'Clicks', 'Percentage']);
        });

        d3.csv(path + "/top-immigration-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "Most clicked links in Immigration (English)";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topImmigrationENChart = new Chart(
                document.getElementById('top-immigration-chart-en'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-immigration-table-en", data, label, ['Link', 'Clicks', 'Percentage']);
        });

        d3.csv(path + "/top-immigration-fr.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "Most clicked links in Immigration (French)";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topImmigrationFRChart = new Chart(
                document.getElementById('top-immigration-chart-fr'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-immigration-table-fr", data, label, ['Link', 'Clicks']);
        });

        d3.csv(path + "/top-work-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });
            let label = "Most clicked links in Work (English)";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topWorkENChart = new Chart(
                document.getElementById('top-work-chart-en'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-work-table-en", data, label, ['Link', 'Clicks']);
        });

        d3.csv(path + "/top-work-fr.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "Most clicked links in Work (French)";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topWorkFRChart = new Chart(
                document.getElementById('top-work-chart-fr'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-work-table-fr", data, label, ['Link', 'Clicks', 'Percentage']);
        });

        d3.csv(path + "/top-study-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });
            let label = "Most clicked links in Study (English)";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topStudyENChart = new Chart(
                document.getElementById('top-study-chart-en'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-study-table-en", data, label, ['Link', 'Clicks']);
        });

        d3.csv(path + "/top-study-fr.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "Most clicked links in Study (French)";

            let x = data.map(function (d) { return d["Link"] })
            let y = data.map(function (d) { return d["Clicks"] });
            let sum = d3.sum(data.map(function (d) { return d["Clicks"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            topStudyFRChart = new Chart(
                document.getElementById('top-study-chart-fr'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Link"] = d["Link"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d3.format(",")(d["Clicks"]);
            });
            tabulate("top-study-table-fr", data, label, ['Link', 'Clicks', 'Percentage']);
        });

        d3.csv(path + "/tss-data.csv?" + today, function (data) {

            let surveyResponses = data.map(function (d) { return d["TSS surveys responded"]; })
            let surveyResponsesPrior = (data.map(function (d) { return d["TSS surveys responded - Last quarter"] }));
            let satisfaction = (data.map(function (d) { return d["TSS satisfaction"] }));
            let satisfactionPrior = (data.map(function (d) { return d["TSS satisfaction - Last quarter"] }));
            let ease = (data.map(function (d) { return d["TSS ease"] }));
            let easePrior = (data.map(function (d) { return d["TSS ease - Last quarter"] }));
            let completion = (data.map(function (d) { return d["TSS completion"] }));
            let completionPrior = (data.map(function (d) { return d["TSS completion - Last quarter"] }));




            document.getElementById('tss-survey-prev-quarter').innerHTML = d3.format(",")(surveyResponses);
            difference(surveyResponses, surveyResponsesPrior, "tss-survey-prev-quarter-change", "quarter");

            document.getElementById('tss-satisfaction-prev-quarter').innerHTML = d3.format("0.1%")(satisfaction);
            difference(satisfaction, satisfactionPrior, "tss-satisfaction-prev-quarter-change", "quarter");

            document.getElementById('tss-ease-prev-quarter').innerHTML = d3.format("0.1%")(ease);
            difference(ease, easePrior, "tss-ease-prev-quarter-change", "quarter");

            document.getElementById('tss-completion-prev-quarter').innerHTML = d3.format("0.1%")(completion);
            difference(completion, completionPrior, "tss-completion-prev-quarter-change", "quarter");

            d3.csv(path + "/tss.txt?" + today, function (data) {
                data.forEach(function (d, i) {
                    if (i === 0) {
                        document.getElementById('tss-date').innerHTML = d["Date"].replace(/_/g, ",");
                        // document.getElementById('tss-insight').innerHTML = d["Insights"].replace(/_/g, ",");
                    }
                })
            });

        });

        d3.csv(path + "/tss-highest-performing.csv?" + today, function (data) {
            document.getElementById("tss-top-tasks-table").outerHTML = toptasktable;
            data = data.filter(function (d) {
                if (d["Task"].length == 0) {
                    return false;
                }
                return true;
            });

            
            data = data.filter(function (d) {
                if (d["Surveys completed"] < 384) {
                    return false;
                }
                return true;
            });


            // "Task","TSS completion","TSS ease","TSS satisfaction","Surveys completed",
            let label = "Top tasks by volume of responses";
            data.forEach(function (d) {
                
                    d["Task"] = d["Task"];
                    d["TSS completion"] = Math.round(d["TSS completion"] * 100);
                    d["TSS ease"] = Math.round(d["TSS ease"] * 100);
                    d["TSS satisfaction"] = Math.round(d["TSS satisfaction"] * 100);
                    d["Surveys completed"] = d3.format(",")(d["Surveys completed"]);
                
            });


            tabulate("tss-top-tasks-table", data, label, ['Task', 'TSS completion', 'TSS ease', 'TSS satisfaction', 'Surveys completed']);


            for (var i = 1; i < document.getElementById("tss-top-tasks-table").rows.length; i++) {
                let rowCells = document.getElementById("tss-top-tasks-table").rows[i].cells.length - 1;
                for (var j = 1; j < rowCells; j++) {

                    document.getElementById("tss-top-tasks-table").rows[i].cells[j].style.backgroundColor = getColor(document.getElementById("tss-top-tasks-table").rows[i].cells[j].innerHTML);
                    document.getElementById("tss-top-tasks-table").rows[i].cells[j].innerHTML += "%";
                }
            }

            document.getElementById("tss-top-tasks-table").classList.add("wb-tables");
            $("#tss-top-tasks-table").trigger("wb-init.wb-tables");



        });

        d3.csv(path + "/tss-last-12-months.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["TSS completion"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "TSS over the last 12 months";
            let y1 = data.map(function (d) { return parseFloat(d["TSS completion"]).toFixed(2) })
            let y2 = data.map(function (d) { return parseFloat(d["TSS ease"]).toFixed(2) })
            let y3 = data.map(function (d) { return parseFloat(d["TSS satisfaction"]).toFixed(2) })
            let x = data.map(function (d) { return d["Month"] });

            tssMonthsChart = new Chart(
                document.getElementById('tss-over-12-months-chart'),
                {
                    type: 'line',
                    data: {
                        labels: x.reverse(),
                        datasets: [
                            {
                                label: 'Effectiveness',
                                data: y1.reverse(),
                                backgroundColor: '#37b99c',
                                borderColor: '#37b99c'
                            },
                            {
                                label: 'Ease',
                                data: y2.reverse(),
                                backgroundColor: '#ff6384',
                                borderColor: '#ff6384'
                            },
                            {
                                label: 'Satisfaction',
                                data: y3.reverse(),
                                backgroundColor: '#36a2eb',
                                borderColor: '#36a2eb'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                ticks: {
                                    stepSize: 0.2,
                                    beginAtZero: true,
                                    callback: function (value) {
                                        return (value * 100) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            // let parseDate = d3.utcParse("%Y-%m-%d");
            let parseDate = d3.timeParse("%m/%d/%Y")
            let formatDate = d3.timeFormat("%Y-%m-%d");
            data.forEach(function (d) {
                d["Month"] = formatDate(parseDate(d["Month"]));
                d["TSS completion"] = Math.round(d["TSS completion"] * 100) + "%";
                d["TSS ease"] = Math.round(d["TSS ease"] * 100) + "%";
                d["TSS satisfaction"] = Math.round(d["TSS satisfaction"] * 100) + "%";
                d["Surveys completed"] = d3.format(",")(d["Surveys completed"]);
            });
            tabulate("tss-over-12-months-table", data, label, ['Month', 'TSS completion', 'TSS ease', 'TSS satisfaction', 'Surveys completed']);

            document.getElementById("tss-over-12-months-table").classList.add("wb-tables");
            $("#tss-over-12-months-table").trigger("wb-init.wb-tables");
        });


        d3.csv(path + "/contactHC.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('contact-date').innerHTML = d["Date"].replace(/_/g, ",");
            })
        });
        d3.csv(path + "/contact.csv?" + today, function (data) {

            data.forEach(function (d) {
                d["Page URL"] = d["Page URL"];
                d["Visits"] = parseFloat((d["Visits"]) * 100).toFixed(1) + "%";
            });

            tabulate("contact-us-table", data, "Pages leading to Contact us", ['Page URL', 'Visits']);
            
            addURLs("contact-us-table", true);


        });
        d3.csv(path + "/hc.csv?" + today, function (data) {

            data.forEach(function (d) {
                d["Page URL"] = d["Page URL"];
                d["Visits"] = parseFloat(d["Visits"] * 100).toFixed(1) + "%";
            });

            tabulate("helpcentre-table", data, "Pages leading to Help centre", ['Page URL', 'Visits']);
            addURLs("helpcentre-table", true);
        });

        d3.csv(path + "/news.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('news-date').innerHTML = d["Date"].replace(/_/g, ",");
            })
        });
        d3.csv(path + "/news.csv?" + today, function (data) {

            data.forEach(function (d) {
                d["IRCC news"] = d["IRCC news"];
                d["Visits"] = d3.format(",")(d["Visits"]);
            });

            tabulate("news-table", data, "Top newsroom products", ['IRCC news', 'Visits']);
            $("#news-table").trigger("wb-init.gc-table");
        });
        d3.csv(path + "/webnotice.csv?" + today, function (data) {

            data.forEach(function (d) {
                d["IRCC web notices"] = d["IRCC web notices"];
                d["Visits"] = d3.format(",")(d["Visits"]);
            });

            tabulate("notices-table", data, "Top web notices products", ['IRCC web notices', 'Visits']);
            $("#notices-table").trigger("wb-init.gc-table");
        });

        d3.csv(path + "/news.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('news-date').innerHTML = d["Date"].replace(/_/g, ",");
            })
        });

        d3.csv(path + "/crisis.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('crisis-date').innerHTML = d["Date"].replace(/_/g, ",");
            })
        });
        d3.csv(path + "/top-crisis.csv?" + today, function (data) {

            data.forEach(function (d) {
                d["Special measures (E/F)"] = d["Special measures (E/F)"];
                d["Visits"] = d3.format(",")(d["Visits"]);
            });

            tabulate("crisis-content-table", data, "Top special measures content", ['Special measures (E/F)', 'Visits']);
            $("#crisis-content-table").trigger("wb-init.gc-table");
        });

        d3.csv(path + "/crisis-traffic.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Day"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = "% of IRCC traffic to special measures";
            let y1 = data.map(function (d) { return parseFloat(d["% of IRCC traffic to special measures"]).toFixed(3) })
            let y2 = data.map(function (d) { return parseFloat(d["Month before"]).toFixed(3) })
            let x = data.map(function (d) { return d["Day"] });

            crisisChart = new Chart(
                document.getElementById('crisis-traffic-chart'),
                {
                    type: 'line',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: 'Current month',
                                data: y1,
                                backgroundColor: '#37b99c',
                                borderColor: '#37b99c',
                                cubicInterpolationMode: 'monotone',
                                tension: 0.4
                            },
                            {
                                label: 'Previous month',
                                data: y2,
                                backgroundColor: '#ff6384',
                                borderColor: '#ff6384',
                                cubicInterpolationMode: 'monotone',
                                tension: 0.4
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                callback: function (value, index, ticks) {
                                    if ((index == 0) && (index == ticks.length - 1)) {
                                        return "";
                                    }
                                    else {
                                        return value;
                                    }
                                }
                            },
                            y: {
                                ticks: {
                                    stepSize: 1,
                                    min: 0,
                                    max: 2,
                                    beginAtZero: true,
                                    callback: function (value) {
                                        return (value * 100) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );


            data.forEach(function (d) {
                d["Day"] = d["Day"];
                d["% of IRCC traffic to special measures"] = d3.format("0.2%")(d["% of IRCC traffic to special measures"]);
                d["Month before"] = d3.format("0.2%")(d["Month before"]);
            });

            tabulate("crisis-traffic-table", data, "Crisis traffic", ['Day', '% of IRCC traffic to special measures', 'Month before']);
            $("#crisis-traffic-table").trigger("wb-init.gc-table");
        });


        d3.csv(path + "/campaigns.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('campaign-date').innerHTML = d["Date"].replace(/_/g, ",");
            })
        });

        d3.csv(path + "/campaign-top.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Visits"].length == 0) {
                    return false;
                }
                return true;
            });


            let label = "Top campaign pages";

            let x = data.map(function (d) { return d["IRCC campaigns (E/F)"] })
            let y = data.map(function (d) { return d["Visits"] });
            let sum = d3.sum(data.map(function (d) { return d["Visits"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            campaignChart = new Chart(
                document.getElementById('campaign-landing-chart'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["IRCC campaigns (E/F)"] = d["IRCC campaigns (E/F)"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Visits"]) / sum);
                d["Visits"] = d3.format(",")(d["Visits"]);
            });
            tabulate("campaign-landing-table", data, label, ['IRCC campaigns (E/F)', 'Visits', 'Percentage']);
        });

        d3.csv(path + "/campaign-utm.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Visits"].length == 0) {
                    return false;
                }
                return true;
            });


            let label = "Top UTM campaigns";

            let x = data.map(function (d) { return d["UTM Campaign"] })
            let y = data.map(function (d) { return d["Visits"] });
            let sum = d3.sum(data.map(function (d) { return d["Visits"] }));


            let percentage = [];
            for (var i = 0; i < y.length; i++) {
                percentage.push((y[i] / sum) * 100);
            }


            utmChart = new Chart(
                document.getElementById('utm-chart'),
                {
                    type: 'bar',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: percentage,
                                backgroundColor: 'rgba(55, 185, 156, 0.6)',
                                borderColor: '#37b99c'
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                        return (value) + "%"
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["UTM Campaign"] = d["UTM Campaign"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Visits"]) / sum);
                d["Visits"] = d3.format(",")(d["Visits"]);
            });
            tabulate("utm-table", data, label, ['UTM Campaign', 'Visits', 'Percentage']);
        });

        d3.csv(path + "/device-type.csv?" + today, function (data) {

            let label = "Device types";
            let a = data.map(function (d) {
                let tempString = d["Device Type"];
                tempString = tempString.charAt(0).toUpperCase() + tempString.slice(1);
                return tempString;
            })
            let b = data.map(function (d) { return parseInt(d["Visits"]); })

            let total = 0;
            for (var i = 0; i < b.length; i++) {
                total += b[i];
            }
            for (var i = 0; i < b.length; i++) {
                // b[i] = parseFloat((b[i] / total) * 100).toFixed(1);
                b[i] = (b[i] / total);
            }
            devicesChart = new Chart(
                document.getElementById('devices-chart'),
                {
                    type: 'doughnut',
                    data: {
                        labels: a,
                        datasets: [
                            {
                                label: label,
                                data: b,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.8)',
                                    'rgba(54, 162, 235, 0.8)',
                                    'rgba(55, 185, 156, 0.8)'
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(55, 185, 156)'
                                ],
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        layout: {
                            autoPadding: true,
                            padding: 20
                        },
                        plugins: {
                            legend: {
                                display: false,
                                position: 'top',
                                title: {
                                    padding: {
                                        bottom: 20
                                    }
                                }
                            },
                            labels: [
                                {
                                    render: 'label',
                                    position: 'outside',
                                    fontStyle: 'bold',
                                    outsidePadding: 4,
                                    textMargin: 4,
                                    arc: true,
                                },
                                {
                                    render: 'percentage',
                                    precision: 0,
                                    showZero: true,
                                    fontSize: 12,
                                    fontColor: '#000',
                                    fontStyle: 'bold',
                                    textShadow: false,
                                    arc: false,
                                    position: 'default',
                                    overlap: false,
                                    showActualPercentages: true,
                                    outsidePadding: 4,
                                    textMargin: 4
                                },
                            ]
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Device Type"] = d["Device Type"].charAt(0).toUpperCase() + d["Device Type"].slice(1);
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Visits"]) / total);
                d["Visits"] = d3.format(",")(d["Visits"]);
            });
            tabulate("devices-table", data, label, ['Device Type', 'Visits', 'Percentage']);
        });

        d3.csv(path + "/top-mobile-pages.csv?" + today, function (data) {
            document.getElementById("top-mobile-table").outerHTML = mobiletable;
            data.forEach(function (d) {
                d["Page URL"] = d["Page URL"];
                d["% mobile visits (min 1K visits)"] = parseFloat((d["% mobile visits (min 1K visits)"]) * 100).toFixed(1);;
            });

            tabulate("top-mobile-table", data, "Top mobile pages", ['Page URL', '% mobile visits (min 1K visits)']);
            addURLs("top-mobile-table", true);

            d3.csv(path + "/mobile.txt?" + today, function (data) {
                data.forEach(function (d, i) {
                    document.getElementById('mobile-date').innerHTML = d["Date"].replace(/_/g, ",");
                })
            });
        });

    }

    function addURLs(table, urls) {
        document.getElementById(table).classList.add("wb-tables");
        $("#" + table).trigger("wb-init.wb-tables");

        let firstCells = document.getElementById(table).querySelectorAll('td:first-child');

        if (urls) {
            for (var i = 0; i < firstCells.length; i++) {
                firstCells[i].innerHTML = '<a href="https://' + firstCells[i].innerHTML + '">' + firstCells[i].innerHTML + '</a>';
            }
        }
    }

    function difference(a, b, elm, daterange) {


        let dif = parseFloat((Math.abs((a - b) / b)) * 100).toFixed(1);


        if (dif != 0) {
            if (a > b) {
                document.getElementById(elm).innerHTML = '<i class="fas fa-caret-up"></i>&nbsp;' + d3.format(",")(dif) + "%";
                
                
                let text = document.createElement('div');
                text.setAttribute('class', 'addedText');
                text.innerHTML = "<span class=\"small\">increase from last " + daterange + "</span>"
                document.getElementById(elm).insertAdjacentElement('afterend', text);
                document.getElementById(elm).classList.add('text-success');
            }
            else if (a < b) {

                document.getElementById(elm).innerHTML = '<i class="fas fa-caret-down"></i>&nbsp;' + d3.format(",")(dif) + "%";
                let text = document.createElement('div');
                text.setAttribute('class', 'addedText');
                text.innerHTML = "<span class=\"small\">decrease from last " + daterange + "</span>"
                document.getElementById(elm).insertAdjacentElement('afterend', text);
                document.getElementById(elm).classList.add('text-danger');
            }
        }
        else {
            document.getElementById(elm).innerHTML = d3.format(",")(dif) + "%";
        }
    }

    function getColor(value) {
        //value from 0 to 1
        var hue = ((value)).toString(10);
        return ["hsl(", hue, ",85%,60%)"].join("");
    }

    $("#previous-data-select").change(function () {

        let spinner = document.createElement("div")
        spinner.setAttribute('class', 'spinner-wrapper');
        spinner.innerHTML = "<div class='spinner'></div>";
        document.getElementById('content').appendChild(spinner);

        let m = this.value;
        $(".addedText").remove();    
        if (m === "-1") runData();
        else runData(m);
        $(".wb-tables").trigger("wb-init.wb-tables");
        $(spinner).remove();
    });

});

$("#anchors").change(function () {
    let anchor = this.value;

    let link = document.createElement('a');
    link.setAttribute('href', "#" + anchor);
    link.click();

    // console.log(anchor);
    // var url = (location.href).split("#")[0]+"#"+ anchor;             //Save down the URL without hash.
    // // document.querySelector('[href*=#'+anchor+']').click;
    // console.log(document.querySelectorAll("[href='#"+anchor+"']"));

    // window.scrollBy(0, -50);
});

// window.onscroll = function () { scrollSticky() };

// var navbar = document.getElementsByClassName("dashboard-navigation")[0];
// var sticky = navbar.offsetTop;

// function scrollSticky() {
//     if (window.scrollY >= sticky) {
//         navbar.classList.add("sticky")
//     } else {
//         navbar.classList.remove("sticky");
//     }
// }