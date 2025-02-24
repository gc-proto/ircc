let tempVar;
let lang = document.getElementsByTagName('html')[0].getAttribute('lang');
let locale, formatDate, langTime, formatTime, shortMonth;
let loaded = false;
let temp = [];

let dict = {
    en: {
        percent: "%",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        latestData: "Latest data",
        dateRange: ["month", "quarter"],
        difference: ["increase from last ", "decrease from last ", ""],
        unknown:"unknown",

    },
    fr: {
        percent: " %",
        months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        latestData: "Dernières données",
        dateRange: ["mois", "trimestre"],
        difference: ["augmentation par rapport au dernier", "diminution par rapport au dernier "],
        unknown: "inconnu"

    }

}

if (lang === "en") {
    locale = d3.formatDefaultLocale({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        percent: "%"
    });

    langTime = d3.timeFormatLocale({
        dateTime: "%A, %e %B %Y %X",
        date: "%Y-%m-%d",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });

    formatTime = d3.timeFormat("%B %Y");
    shortMonth = d3.timeFormat("%b %-d, %Y");
}
else {
    locale = d3.formatDefaultLocale({
        decimal: ",",
        thousands: " ",
        grouping: [3],
        percent: " %",
    });

    langTime = d3.timeFormatLocale({
        dateTime: "%A, %e %B %Y %X",
        date: "%d/%m/%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
        months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
    });

    formatTime = langTime.format("%B %Y");
    shortMonth = langTime.format("%-d %b %Y");
}

$(document).on("wb-ready.wb", function (event) {


    let date = new Date();

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

    let toptasktable = document.getElementById("tss-top-tasks-table").outerHTML;
    let mobiletable = document.getElementById("top-mobile-table").outerHTML;

    today = String(date).replace(" ", "-");
    let s = d3.formatSpecifier("s");
    s.precision = d3.precisionFixed(1);

    let p;
    let f;

    function formatNumber(num) {
        if (num >= 1000000) {
            p = d3.precisionPrefix(1e5, 1.3e6);
            f = lang === "en" ? d3.formatPrefix("." + p, 1.3e6) : d3.formatPrefix("." + p, 1.3e6);
        }
        else if (num >= 1000) {
            p = d3.precisionPrefix(1e5, 1.3e6);
            f = lang === "en" ? d3.formatPrefix("." + p, 1.3e5) : d3.formatPrefix("." + p, 1.3e5);
        }
        else { f = d3.format(".2f"); }
        return lang === "en" ? f(num) : String(f(num)).toLowerCase();
    }



    let dateModified = $('meta[property="dcterms:modified"').attr('content').split("-");


    let month = dateModified[1];
    let day = dateModified[2];
    let year = dateModified[0];
    let lastMonth;


    if (lang === "en") {
        dateModified = dict[lang].months[month - 1] + " " + day + ", " + year
    }
    else {
        dateModified = day + " " + dict[lang].months[month - 1] + " " + year
    }


    document.getElementById("dateModified").innerHTML = dateModified;


    d3.csv("csv/previous-data.txt?" + today, function (data) {

        let previousData = data.map(function (d) { return d["Previous"] })
        parseTime = d3.timeParse("%Y-%m");

        let thisMonthOption = document.createElement('option');
        thisMonthOption.setAttribute('value', "-1");
        thisMonthOption.innerHTML = dict[lang].latestData
        document.getElementById('previous-data-select').appendChild(thisMonthOption)
        previousData.reverse();
        lastMonth = previousData[0];
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
            .data(columns[lang]).enter()
            .append('th')
            .attr('scope', 'col')
            .text(function (column) {
                return column
            });

        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

        // create a cell in each row for each column

        var cells = rows.selectAll('td')
            .data(function (row) {
                return columns["en"].map(function (column) {
                    return { column: column, value: row[column] };
                });
            })
            .enter()
            .append('td')
            .attr("data-order", function (d) {
                if (!isNaN(d.value)) {
                    return parseFloat(d.value);
                    // console.log(num)
                    // return num.replace(" ", "");
                }
            })
            .text(function (d) {
                if (!isNaN(d.value)) {
                    return d3.format(",")(d.value);
                }
                else {
                    return d.value;
                }
            });


        return table;
    }

    runData();

    function formatDateRage(dateRange) {
        parseTime = d3.timeParse("%b %d, %Y");
        dateRange[0] = shortMonth(parseTime(dateRange[0]));
        dateRange[1] = shortMonth(parseTime(dateRange[1]));

        return dateRange[0] + " - " + dateRange[1]
    }

    async function runData(previousData) {
        let path;
        if (previousData == "-1") {
            path = "csv/export/";
        }
        else {
            path = previousData ? "csv/export/previous/" + previousData + "/" : "csv/export/";
        }

        let ajax = document.querySelectorAll('.ajax-insights');


        for (var i = 0; i < ajax.length; i++) {
            let jData = JSON.parse(ajax[i].getAttribute('data-wb-ajax'));
            let url = jData.url.split("#")[1];
            jData.url = path + "insights-" + lang + ".html#" + url;
            ajax[i].outerHTML = '<div id="' + ajax[i].getAttribute('id') + '" class="ajax-insights" data-wb-ajax=\'{&quot;type&quot;: &quot;replace&quot;, &quot;nocache&quot;: &quot;nocache&quot;,  &quot;url&quot;: &quot;' + jData.url + '&quot;}\'></div>';

        }
        $(".ajax-insights").trigger("wb-init.wb-data-ajax");


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

        d3.csv(path + "traffic-volumes.csv?" + today, function (data) {
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
            difference(daily_average, daily_average_lastMonth, "daily-average-visits-change", dict[lang].dateRange[0]);

            // Visits & Visits - Month before
            let total_visits = (data.map(function (d) { return d["Visits"]; }))[0]
            let total_visits_lastMonth = (data.map(function (d) { return d["Visits - Month before"]; }))[0]
            document.getElementById('total-visits').innerHTML = formatNumber(total_visits);
            difference(total_visits, total_visits_lastMonth, "total-visits-change", dict[lang].dateRange[0]);

            // Page Views per Visit & Page Views per Visit
            let page_views_visit = (data.map(function (d) { return d["Page Views per Visit"]; }))[0]
            let page_views_visits_lastMonth = (data.map(function (d) { return d["Page Views per Visit - Month before"]; }))[0]
            document.getElementById('page-views-visits').innerHTML = formatNumber(page_views_visit);
            difference(page_views_visit, page_views_visits_lastMonth, "page-views-visits-change", dict[lang].dateRange[0]);

            //Daily average page views,Daily average page views - Month before,
            let page_views = (data.map(function (d) { return d["Daily average page views"]; }))[0]
            let page_views_lastMonth = (data.map(function (d) { return d["Daily average page views - Month before"]; }))[0]
            document.getElementById('daily-average-page-views').innerHTML = formatNumber(page_views);
            difference(page_views, page_views_lastMonth, "daily-average-page-views-change", dict[lang].dateRange[0]);

            // Page Views,Page Views - Month before
            let total_page_views = d3.sum(data, function (d) { return d["Page Views"] });
            let total_page_views_lastMonth = d3.sum(data, function (d) { return d["Page Views - Month before"] });


            document.getElementById('total-page-views').innerHTML = formatNumber(total_page_views);
            difference(total_page_views, total_page_views_lastMonth, "total-page-views-change", dict[lang].dateRange[0]);



            d3.csv(path + "traffic.txt?" + today, function (data) {
                data.forEach(function (d) {
                    document.getElementById('traffic-dates').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "))
                })
            });


        });



        d3.csv(path + "referrer-type.csv?" + today, function (data) {


            let label = lang === "en" ? "Top referrer types" : "Principaux types de référents";
            let colheaders = {
                en: ['Referrer Type', 'Entries', 'Percentage'],
                fr: ['Type de référent', 'Entrés', 'Pourcentage']
            }

            data.forEach(function (d) {
                if (lang != "en") {
                    let referrerTypes = ["Search Engines", "Typed/Bookmarked", "Other Web Sites", "Social Networks", "Hard Drive"];
                    let referrerTypesFr = ["Moteur de recherche", "Saisi/signalé", "Autres sites web", "Réseaux sociaux", "Disque dur"]
                    for (var i = 0; i < referrerTypes.length; i++) {
                        if (d["Referrer Type"] === referrerTypes[i]) {
                            d["Referrer Type"] = referrerTypesFr[i]
                        }
                    }

                }
                else d["Referrer Type"] = d["Referrer Type"]


            });

            let x = data.map(function (d) { return d["Referrer Type"] });
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
                                        return (value) + dict[lang].percent
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Entries"]) / sum);
                d["Entries"] = d["Entries"];
            });
            tabulate("top-referrer-table", data, label, colheaders);
        });

        d3.csv(path + "social-networks.csv?" + today, function (data) {

            let label = lang === "en" ? "Top social networks referring traffic" : "Principaux réseaux sociaux référents";
            let colheaders = {
                en: ['Referring Domain', 'Entries', 'Percentage'],
                fr: ['Domaine référent', 'Entrés', 'Pourcentage']
            }


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
                                        return (value) + dict[lang].percent
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
                d["Entries"] = d["Entries"];
            });
            tabulate("top-social-table", data, label, colheaders);

            d3.csv(path + "trafficSources.txt?" + today, function (data) {
                data.forEach(function (d, i) {

                    document.getElementById('referrer-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
                })
            });
        });

        d3.csv(path + "top-pages.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Page Title"].length == 0) {
                    return false;
                }
                return true;
            });


            let label = lang === "en" ? "Visits" : "Visites";
            let colheaders = {
                en: ['Page Title', 'Visits'],
                fr: ['Titre de la page', 'Visites']
            }

            let x = data.map(function (d) { return d["Page Title"] })
            let y = data.map(function (d) { return d["Visits"] })

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
                d["Page Title"] = d["Page Title"];
                d["Visits"] = parseFloat(d["Visits"]);
            });
            tabulate("top-pages-table", data, label, colheaders);
            addURLs("top-pages-table", data, "Page Title");

            d3.csv(path + "topContent.txt?" + today, function (data) {
                data.forEach(function (d, i) {

                    document.getElementById('top-content-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
                })
            });
        });

        d3.csv(path + "top-theme-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked topics on theme page (English)" : "Sujets les plus cliqués sur la page thème (anglais)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }

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
                                        return (value) + dict[lang].percent
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
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-topic-table-en", data, label, colheaders);
            addURLs("top-topic-table-en", data, "Link");
        });

        d3.csv(path + "top-theme-fr.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked links on theme page (French)" : "Liens les plus cliqués sur la page thème (français)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }

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
                                        return (value) + dict[lang].percent
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
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-topic-table-fr", data, label, colheaders);
            addURLs("top-topic-table-fr", data, "Link");
        });

        d3.csv(path + "top-visit-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked links in Visit (English)" : "Liens les plus cliqués sur la page « Visiter le Canada » (anglais)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }

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
                                        return (value) + dict[lang].percent
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
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-visit-table-en", data, label, colheaders);
            addURLs("top-visit-table-en", data, "Link");
        });

        d3.csv(path + "top-visit-fr.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked links in Visit (French)" : "Liens les plus cliqués sur la page « Visiter le Canada » (français)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }


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
                                        return (value) + dict[lang].percent
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-visit-table-fr", data, label, colheaders);
            addURLs("top-visit-table-fr", data, "Link");
        });

        d3.csv(path + "top-immigration-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked links in Immigration (English)" : "Liens les plus cliqués sur la page « Immigrer au Canada » (anglais)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }


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
                                        return (value) + dict[lang].percent
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Clicks"]) / sum);
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-immigration-table-en", data, label, colheaders);
            addURLs("top-immigration-table-en", data, "Link");
        });

        d3.csv(path + "top-immigration-fr.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked links in Immigration (French)" : "Liens les plus cliqués sur la page « Immigrer au Canada » (français)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }

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
                                        return (value) + dict[lang].percent
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
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-immigration-table-fr", data, label, colheaders);
            addURLs("top-immigration-table-fr", data, "Link");
        });

        d3.csv(path + "top-work-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked links in Work (English)" : "Liens les plus cliqués sur la page « Travailler au Canada » (anglais)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }


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
                                        return (value) + dict[lang].percent
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
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-work-table-en", data, label, colheaders);
            addURLs("top-work-table-en", data, "Link");
        });

        d3.csv(path + "top-work-fr.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked links in Work (French)" : "Liens les plus cliqués sur la page « Travailler au Canada » (français)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }



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
                                        return (value) + dict[lang].percent
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
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-work-table-fr", data, label, colheaders);
            addURLs("top-work-table-fr", data, "Link");
        });

        d3.csv(path + "top-study-en.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Most clicked links in Study (English)" : "Liens les plus cliqués sur la page « Étudier au Canada » (anglais)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }




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
                                        return (value) + dict[lang].percent
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
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-study-table-en", data, label, colheaders);
            addURLs("top-study-table-en", data, "Link");
        });

        d3.csv(path + "top-study-fr.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Link"].length == 0) {
                    return false;
                }
                return true;
            });


            let label = lang === "en" ? "Most clicked links in Study (French)" : "Liens les plus cliqués sur la page « Étudier au Canada » (français)";
            let colheaders = {
                en: ['Link', 'Clicks', 'Percentage'],
                fr: ['Lien', 'Clics', 'Pourcentage']
            }

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
                                        return (value) + dict[lang].percent
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
                d["Clicks"] = d["Clicks"];
            });
            tabulate("top-study-table-fr", data, label, colheaders);
            addURLs("top-study-table-fr", data, "Link");
        });

        d3.csv(path + "tss-data.csv?" + today, function (data) {

            let surveyResponses = (data.map(function (d) { return d["TSS surveys responded"]; }))
            let surveyResponsesPrior = (data.map(function (d) { return d["TSS surveys responded - Last month"] }));
            let satisfaction = (data.map(function (d) { return d["TSS satisfaction"] }));
            let satisfactionPrior = (data.map(function (d) { return d["TSS satisfaction - Last month"] }));
            let ease = (data.map(function (d) { return d["TSS ease"] }));
            let easePrior = (data.map(function (d) { return d["TSS ease - Last month"] }));
            let completion = (data.map(function (d) { return d["TSS completion"] }));
            let completionPrior = (data.map(function (d) { return d["TSS completion - Last month"] }));


            document.getElementById('tss-survey-prev-month').innerHTML = d3.format(",")(surveyResponses);
            difference(surveyResponses, surveyResponsesPrior, "tss-survey-prev-month-change", dict[lang].dateRange[0]);

            document.getElementById('tss-satisfaction-prev-month').innerHTML = d3.format("0.1%")(satisfaction);
            difference(satisfaction, satisfactionPrior, "tss-satisfaction-prev-month-change", dict[lang].dateRange[0]);

            document.getElementById('tss-ease-prev-month').innerHTML = d3.format("0.1%")(ease);
            difference(ease, easePrior, "tss-ease-prev-month-change", dict[lang].dateRange[0]);

            document.getElementById('tss-completion-prev-month').innerHTML = d3.format("0.1%")(completion);
            difference(completion, completionPrior, "tss-completion-prev-month-change", dict[lang].dateRange[0]);

            d3.csv(path + "tss.txt?" + today, function (data) {
                data.forEach(function (d, i) {
                    if (i === 0) {
                        document.getElementById('tss-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
                        // document.getElementById('tss-insight').innerHTML = d["Insights"].replace(/_/g, ",");
                    }
                })
            });

        });

        d3.csv(path + "tss-highest-performing.csv?" + today, function (data) {
            let modPath;
            if (path.indexOf("previous") == -1) {
                modPath = path + "previous/" + lastMonth
            }
            else {
                let tempMonth = parseInt(lastMonth.split("-")[1]) - 1;
                if (tempMonth < 10) tempMonth = "0" + tempMonth.toString();
                
                modPath = path.split(lastMonth)[0] + lastMonth.split("-")[0] + "-" + tempMonth;
            }
            d3.csv(modPath + "/tss-highest-performing.csv?" + today, function (data2) {
                document.getElementById("tss-top-tasks-table").outerHTML = toptasktable;
                data = data.filter(function (d) {
                    if (d["Task"].length == 0) {
                        return false;
                    }
                    return true;
                });
                
                if (data2 != null) {
                data2.forEach(function (d) {
                    d["TSS completion - previous month"] = Math.round(d["TSS completion"] * 100);                  
                    delete d["TSS completion"];
                    delete d["TSS ease"];
                    delete d["TSS satisfaction"];
                    delete d["Surveys completed"];
                    delete d["Task"];
                    delete d[""];
                });         

                for (let i = 0; i<data2.length; i++) {
                    if (data2[i]["TSS completion - previous month"]){
                    data[i]["TSS completion - previous month"] = data2[i]["TSS completion - previous month"];}
                }       
                }

                data = data.filter(function (d) {
                    if (d["Surveys completed"] < 384) {
                        return false;
                    }
                    return true;
                });


                // "Task","TSS completion","TSS ease","TSS satisfaction","Surveys completed",
                let label = lang === "en" ? "Top tasks by volume of responses" : "Tâches les plus performantes par volume de réponses";
                let colheaders = {
                    en: ['Task', 'TSS completion', 'TSS ease', 'TSS satisfaction', 'Surveys completed'],
                    fr: ['Tâche', 'Réussite', 'Facilité', 'Satisfaction', 'Réponses']
                }


                data.forEach(function (d) {
                    delete d[""];
                    d["Task"] = d["Task"];

                    if (lang != "en") {
                        switch (d["Task"]) {
                            case "Apply for a work permit":
                                d["Task"] = "Présenter une demande de permis de travail"
                                break;
                            case "Check your application status":
                                d["Task"] = "Vérifiez l’état de sa demande"
                                break;
                            case "Apply for a visitor visa to Canada":
                                d["Task"] = "Présenter une demande de visa de visiteur au Canada"
                                break;
                            case "Immigrate through Express Entry":
                                d["Task"] = "Immigrez dans le cadre d’Entrée express"
                                break;
                            case "Apply for a visitor visa to Canada":
                                d["Task"] = "Présenter une demande de visa de visiteur au Canada"
                                break;
                            case "Apply for an Electronic Travel Authorization (eTA)":
                                d["Task"] = "Autorisation de voyage électronique (AVE)"
                                break;
                            case "Renew a Canadian passport":
                                d["Task"] = "Renouveler un passeport canadien"
                                break;
                            case "Apply for a study permit":
                                d["Task"] = "Présenter une demande de permis d’études"
                                break;
                            case "Apply for Canadian citizenship":
                                d["Task"] = "Présentez une demande de citoyenneté canadienne"
                                break;
                            case "IRCC accounts - sign in and register":
                                d["Task"] = "Comptes d’IRCC - Se connecter et s’enregistrer"
                                break;
                            case "Check processing times":
                                d["Task"] = "Vérifiez les délais de traitement"
                                break;
                            case "Contact Immigration, Refugees and Citizenship Canada":
                                d["Task"] = "Communiquez avec Immigration, Réfugiés et Citoyenneté Canada"
                                break;
                            case "Apply for an Electronic Travel Authorization (eTA)":
                                d["Task"] = "Autorisation de voyage électronique (AVE)"
                                break;
                            case "Check the status of a passport application":
                                d["Task"] = "Vérifiez l’état de sa demande de passeport"
                                break;
                            case "Sponsor your family members to immigrate to Canada":
                                d["Task"] = "Parrainez les membres de votre famille aux fins d’immigration au Canada"
                                break;
                            case "Immigrate as a provincial nominee":
                                d["Task"] = "Immigrez en tant que candidat d’une province"
                                break;
                            case "Apply for a new Canadian passport":
                                d["Task"] = "Demander un nouveau passeport canadien"
                                break;
                            case "Get, renew or replace a permanent resident card":
                                d["Task"] = "Obtenez, renouvelez ou remplacez une carte de résident permanent"
                                break;
                            case "Extend your stay in Canada":
                                d["Task"] = "Prolonger votre séjour au Canada"
                                break;
                            case "Check if you need a visa or electronic travel authorization (eTA) to travel to Canada":
                                d["Task"] = "Découvrez si vous avez besoin d’un visa ou d’une autorisation de voyage électronique (AVE) pour entrer au Canada"
                                break;
                            case "Find an IRCC application package or form":
                                d["Task"] = "Trouvez une trousse de demande ou un formulaire d’IRCC"
                                break;
                            case "Find your National Occupational Classification (NOC)":
                                d["Task"] = "Trouvez votre code de la Classification nationale des professions (CNP)"
                                break;
                            case "Other - Reason for my visit is not in this list":
                                d["Task"] = "Autre - La raison de ma visite n’est pas sur cette liste"
                                break;
                            case "Find a visa application centre":
                                d["Task"] = "Trouvez un centre de réception des demandes de visa"
                                break;
                            case "Find a designated learning institution":
                                d["Task"] = "Trouvez un établissement d’enseignement désigné"
                                break;
                            case "Apply to work and travel abroad with International Experience Canada (IEC) as a Canadian":
                                d["Task"] = "Travailler et voyager à l’étranger avec Expérience internationale Canada (EIC) en tant que Canadien"
                                break;
                            case "Pay your fees online":
                                d["Task"] = "Payez vos frais en ligne"
                                break;
                            case "Apply for a work permit":
                                d["Task"] = "Présenter une demande de permis de travail"
                                break;
                            case "Hire a foreign worker":
                                d["Task"] = "Embaucher un travailleur étranger"
                                break;
                            case "Find out if you need to give your fingerprints and photo (biometrics) and where to do that":
                                d["Task"] = "Découvrez si vous devez fournir vos empreintes digitales et une photo (données biométriques) et où vous pouvez le faire"
                                break;
                            default:
                                break;
                        }
                    }

                    if (data2 != null) {
                        if (d["TSS completion - previous month"] != 0) {
                            d["diff"] = simpleDiff(Math.round(d["TSS completion"] * 100), d["TSS completion - previous month"]);
                        }
                        else d["diff"] = `<span class="badge mrgn-lft-md">${dict[lang].unknown}</span>`
                    }
                   
                    
                    d["TSS completion"] = Math.round(d["TSS completion"] * 100);
                    d["TSS ease"] = Math.round(d["TSS ease"] * 100);
                    d["TSS satisfaction"] = Math.round(d["TSS satisfaction"] * 100);
                    d["Surveys completed"] = d["Surveys completed"];

                });

                tabulate("tss-top-tasks-table", data, label, colheaders);


                for (var i = 1; i < document.getElementById("tss-top-tasks-table").rows.length; i++) {
                    let rowCells = document.getElementById("tss-top-tasks-table").rows[i].cells.length - 1;
                    for (var j = 1; j < rowCells; j++) {    
                        
                        document.getElementById("tss-top-tasks-table").rows[i].cells[j].style.backgroundColor = getColor(document.getElementById("tss-top-tasks-table").rows[i].cells[j].innerHTML);
                        document.getElementById("tss-top-tasks-table").rows[i].cells[j].innerHTML += "%";

                        if ((j===1) && (data2 != null)) document.getElementById('tss-top-tasks-table').rows[i].cells[j].innerHTML += data[i-1]["diff"]
                    }
                }

                document.getElementById("tss-top-tasks-table").classList.add("wb-tables");
                $("#tss-top-tasks-table").trigger("wb-init.wb-tables");
            });
        });

        d3.csv(path + "tss-last-12-months.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["TSS completion"].length == 0) {
                    return false;
                }
                return true;
            });


            // "Task","TSS completion","TSS ease","TSS satisfaction","Surveys completed",
            let label = lang === "en" ? "TSS over the last 12 months" : "Au cours des 12 derniers mois";
            let colheaders = {
                en: ['Month', 'TSS completion', 'TSS ease', 'TSS satisfaction', 'Surveys completed'],
                fr: ['Mois', 'Réussite', 'Facilité', 'Satisfaction', 'Réponses']
            }

            let effectiveness = lang === "en" ? "Effectiveness" : "Efficacité";
            let ease = lang === "en" ? "Ease" : "Facilité";


            let y1 = data.map(function (d) { return parseFloat(d["TSS completion"]).toFixed(2) })
            let y2 = data.map(function (d) { return parseFloat(d["TSS ease"]).toFixed(2) })
            let y3 = data.map(function (d) { return parseFloat(d["TSS satisfaction"]).toFixed(2) })
            let x = data.map(function (d) { return d["Month"] });

            tssMonthsChart = new Chart(
                document.getElementById('tss-over-12-months-chart'),
                {
                    type: 'line',
                    data: {
                        labels: x,
                        datasets: [
                            {
                                label: effectiveness,
                                data: y1,
                                backgroundColor: '#37b99c',
                                borderColor: '#37b99c'
                            },
                            {
                                label: ease,
                                data: y2,
                                backgroundColor: '#ff6384',
                                borderColor: '#ff6384'
                            },
                            {
                                label: 'Satisfaction',
                                data: y3,
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
                                        return (value * 100) + dict[lang].percent
                                    }
                                }
                            }
                        }
                    }
                }
            );

            // let parseDate = d3.timeParse("%Y-%m-%d");
            let parseDate = d3.timeParse("%m/%d/%Y")
            let formatDate = d3.timeFormat("%Y-%m-%d");
            data.forEach(function (d) {
                d["Month"] = formatDate(parseDate(d["Month"]));
                d["TSS completion"] = Math.round(d["TSS completion"] * 100) + dict[lang].percent;
                d["TSS ease"] = Math.round(d["TSS ease"] * 100) + dict[lang].percent;
                d["TSS satisfaction"] = Math.round(d["TSS satisfaction"] * 100) + dict[lang].percent;
                d["Surveys completed"] = d["Surveys completed"];
            });
            tabulate("tss-over-12-months-table", data, label, colheaders);

            document.getElementById("tss-over-12-months-table").classList.add("wb-tables");
            $("#tss-over-12-months-table").trigger("wb-init.wb-tables");
        });

        d3.csv(path + "contactHC.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('contact-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
            })
        });
        d3.csv(path + "contact.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Page URL"].length == 0) {
                    return false;
                }
                return true;
            });
            data.forEach(function (d) {
                d["Page URL"] = d["Page URL"];
                d["Page Title"] = d["Page Title"];
                d["Visits"] = parseFloat((d["Visits"]) * 100).toFixed(1) + dict[lang].percent;
            });


            let label = lang === "en" ? "Pages leading to Contact us" : "Pages allants vers la page « Contactez-nous »";
            let colheaders = {
                en: ['Page URL', 'Visits'],
                fr: ['URL', 'Visites']
            }

            tabulate("contact-us-table", data, label, colheaders);
            addURLs("contact-us-table", data, "Page Title");


        });
        d3.csv(path + "hc.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Page URL"].length == 0) {
                    return false;
                }
                return true;
            });
            data.forEach(function (d) {
                d["Page URL"] = d["Page URL"];
                d["Page Title"] = d["Page Title"];
                d["Visits"] = parseFloat(d["Visits"] * 100).toFixed(1) + dict[lang].percent;
            });


            let label = lang === "en" ? "Pages leading to Help centre" : "Pages allants vers le centre d’aide";
            let colheaders = {
                en: ['Page URL', 'Visits'],
                fr: ['URL', 'Visites']
            }


            tabulate("helpcentre-table", data, label, colheaders);
            addURLs("helpcentre-table", data, "Page Title");
        });

        d3.csv(path + "news.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('news-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
            })
        });
        d3.csv(path + "news.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Page URL"].length == 0) {
                    return false;
                }
                return true;
            });
            data.forEach(function (d) {
                d["Page URL"] = d["Page URL"];
                d["News release"] = d["News release"];
                d["Visits"] = d["Visits"];
            });

            let label = lang === "en" ? "Top newsroom products" : "Articles de la salle de presse les plus performantes";
            let colheaders = {
                en: ['IRCC news', 'Visits'],
                fr: ['Article', 'Visites']
            }

            tabulate("news-table", data, label, colheaders);
            addURLs("news-table", data, "News release");
            $("#news-table").trigger("wb-init.gc-table");
        });
        d3.csv(path + "webnotice.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Page URL"].length == 0) {
                    return false;
                }
                return true;
            });
            data.forEach(function (d) {
                d["Page URL"] = d["Page URL"];
                d["Web notice"] = d["Web notice"];
                d["Visits"] = d["Visits"];
            });
            let label = lang === "en" ? "Top web notices products" : "Avis les plus performantes";
            let colheaders = {
                en: ['IRCC web notices', 'Visits'],
                fr: ['Avis', 'Visites']
            }
            tabulate("notices-table", data, label, colheaders);
            addURLs("notices-table", data, "Web notice");
            $("#notices-table").trigger("wb-init.gc-table");
        });

        d3.csv(path + "news.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('news-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
            })
        });

        d3.csv(path + "crisis.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('crisis-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
            })
        });
        d3.csv(path + "top-crisis.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Page URL"].length == 0) {
                    return false;
                }
                return true;
            });
            data.forEach(function (d) {
                d["Special measures (E/F)"] = d["Special measures (E/F)"];
                d["Page URL"] = d["Page URL"];
                d["Visits"] = d3.format(",")(d["Visits"]);
            });


            let label = lang === "en" ? "Top special measures content" : "Contenu des mesures spéciales les plus performantes";
            let colheaders = {
                en: ['Special measures (E/F)', 'Visits'],
                fr: ['Mesures spéciale', 'Visites']
            }
            tabulate("crisis-content-table", data, label, colheaders);
            addURLs("crisis-content-table", data, "Special measures (E/F)");
            $("#crisis-content-table").trigger("wb-init.gc-table");
        });

        d3.csv(path + "crisis-traffic.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Day"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Traffic to special measures" : "Trafic au mesures spéciales";
            let colheaders = {
                en: ['Day', '% of IRCC traffic to special measures', 'Month before'],
                fr: ['Jour', 'Pourcentage', 'Mois précédent']
            }

            let chartLabels = {
                en: {
                    currentMonth: "Current Month",
                    previousMonth: "Previous month"
                },
                fr: {
                    currentMonth: "Mois en cours",
                    previousMonth: "Mois précédent"
                }
            }

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
                                label: chartLabels[lang].currentMonth,
                                data: y1,
                                backgroundColor: '#37b99c',
                                borderColor: '#37b99c',
                                cubicInterpolationMode: 'monotone',
                                tension: 0.4
                            },
                            {
                                label: chartLabels[lang].previousMonth,
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
                                        return (value * 100) + dict[lang].percent
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

            tabulate("crisis-traffic-table", data, label, colheaders);
            $("#crisis-traffic-table").trigger("wb-init.gc-table");
        });


        d3.csv(path + "campaigns.txt?" + today, function (data) {
            data.forEach(function (d, i) {
                document.getElementById('campaign-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
            })
        });

        d3.csv(path + "campaign-top.csv?" + today, function (data) {

            data = data.filter(function (d) {
                if (d["Visits"].length == 0) {
                    return false;
                }
                return true;
            });
            data = data.filter(function (d) {
                if (d["Visits"].length == 0) {
                    return false;
                }
                return true;
            });

            let label = lang === "en" ? "Top campaign landing pages" : "Pages d’accueil pour les campagnes les plus performantes";
            let colheaders = {
                en: ['Campaign', 'Visits', 'Percentage'],
                fr: ['Campagne', 'Visites', 'Pourcentage']
            }

            let x = data.map(function (d) { return d["Campaign"] })
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
                                        return (value) + dict[lang].percent
                                    }
                                }
                            }
                        }
                    }
                }
            );

            data.forEach(function (d) {
                d["Campaign"] = d["Campaign"];
                d["Percentage"] = d3.format("0.0%")(parseInt(d["Visits"]) / sum);
                d["Visits"] = d["Visits"];
                d["Page URL"] = d["Page URL"];
            });
            tabulate("campaign-landing-table", data, label, colheaders);
            addURLs("campaign-landing-table", data, "Campaign");
        });

        d3.csv(path + "campaign-utm.csv?" + today, function (data) {
            data = data.filter(function (d) {
                if (d["Visits"].length == 0) {
                    return false;
                }
                return true;
            });


            let label = lang === "en" ? "Top UTM campaigns" : "Campagnes UTM les plus performantes";
            let colheaders = {
                en: ['UTM Campaign', 'Visits', 'Percentage'],
                fr: ['Campagne', 'Visites', 'Pourcentage']
            }



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
                                        return (value) + dict[lang].percent
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
                d["Visits"] = d["Visits"];
            });
            tabulate("utm-table", data, label, colheaders);
        });

        d3.csv(path + "device-type.csv?" + today, function (data) {

            let label = lang === "en" ? "Device types" : "Types d’instruments";
            let colheaders = {
                en: ['Device Type', 'Visits', 'Percentage'],
                fr: ['Type d’instrument', 'Visites', 'Pourcentage']
            }


            let a = data.map(function (d) {
                let tempString = d["Device Type"];
                tempString = tempString.charAt(0).toUpperCase() + tempString.slice(1);
                if (lang != "en") {
                    switch (tempString) {
                        case "Desktop":
                            tempString = "Ordinateur de bureau"
                            break;
                        case "Tablet":
                            tempString = "Tablette"
                            break;
                        default:
                            break;
                    }
                }

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
                if (lang != "en") {
                    switch (d["Device Type"].charAt(0).toUpperCase() + d["Device Type"].slice(1)) {
                        case "Desktop":
                            d["Device Type"] = "Ordinateur de bureau"
                            break;
                        case "Tablet":
                            d["Device Type"] = "Tablette"
                            break;
                        case "Mobile":
                            d["Device Type"] = "Mobile"
                            break;
                        default:
                            break;
                    }
                }

                d["Percentage"] = d3.format("0.0%")(parseInt(d["Visits"]) / total);
                d["Visits"] = d3.format(",")(d["Visits"]);
            });
            tabulate("devices-table", data, label, colheaders);
        });

        d3.csv(path + "top-mobile-pages.csv?" + today, function (data) {
            document.getElementById("top-mobile-table").outerHTML = mobiletable;
            tempVar = data;
            data.forEach(function (d) {
                d["Page URL"] = d["Page URL"];
                d["Page Title"] = d["Page Title"];
                d["% mobile visits (min 1K visits)"] = parseFloat((d["% mobile visits (min 1K visits)"]) * 100).toFixed(1);
            });

            let label = lang === "en" ? "Top mobile pages" : "Les pages les plus performantes sur les celluaires";
            let colheaders = {
                en: ['Page URL', '% mobile visits (min 1K visits)'],
                fr: ['URL', 'Pourcentage des visites d’un cellulaires']
            }

            tabulate("top-mobile-table", data, label, colheaders);
            addURLs("top-mobile-table", data, "Page Title");

            d3.csv(path + "mobile.txt?" + today, function (data) {
                data.forEach(function (d, i) {
                    document.getElementById('mobile-date').innerHTML = formatDateRage(d["Date"].replace(/_/g, ",").split(" - "));
                })
            });
        });

        return Promise.resolve(true);

    }

    function addURLs(table, data, pageTitle) {

        document.getElementById(table).classList.add("wb-tables");
        $("#" + table).trigger("wb-init.wb-tables");

        let firstCells = document.getElementById(table).querySelectorAll('td:first-child');
        for (var i = 0; i < firstCells.length; i++) {

            let langattr = "";
            if (lang === "en") {
                if ((data[i][("Page URL")].indexOf("/fr/") > -1 || data[i][("Page URL")].indexOf("/francais/") > -1)) {
                    langattr = "fr"
                }
                else langattr = "en"
            }
            if (lang === "fr") {
                if ((data[i][("Page URL")].indexOf("/en/") > -1 || data[i][("Page URL")].indexOf("/english/") > -1)) {
                    langattr = "en"
                }
                else langattr = "fr"
            }

            if ((data[i][(pageTitle)] == null || data[i][(pageTitle)] == "")) {
                title = data[i][("Page URL")];
            }
            else {
                title = data[i][(pageTitle)]
            }


            firstCells[i].innerHTML = '<a href="https://' + data[i][("Page URL")] + '" target="_blank" lang="' + langattr + '">' + title + '</a>';
        }


        document.getElementById(table).classList.add("wb-tables");
        $("#" + table).trigger("wb-init.wb-tables");
    }

    function getTitle(url, elm) {
        $(elm).load("https://" + url + " h1");
    }

    function simpleDiff(a, b) {
        let bigNum, smallNum;
        if (a > b) {
            bigNum = parseFloat(a);
            smallNum = parseFloat(b);
        }
        else {
            bigNum = parseFloat(b);
            smallNum = parseFloat(a);
        }
        let step1, step2, percentDif;
        step1 = bigNum - smallNum;
        step2 = parseFloat((bigNum + smallNum) / 2);
        percentDif = parseFloat((parseFloat(step1 / step2)) * 100).toFixed(1);

        let val = `<span class="badge mrgn-lft-md">${dict[lang].unknown}</span>`;
        if (percentDif != 0) {
            if (a > b) {
                val = lang === "en" ? '<span class="badge mrgn-lft-md"><i class="fas fa-caret-up fa-1x"></i>&nbsp;' + d3.format(",")(percentDif) + dict[lang].percent  + '</span>': '<span class="badge mrgn-lft-md"><i class="fas fa-caret-up fa-1x"></i>&nbsp;' + d3.format(",")(percentDif) + "&nbsp;%</span>";
            }
            else if (a < b) {
                val = lang === "en" ? '<span class="badge mrgn-lft-md"><i class="fas fa-caret-down fa-1x"></i>&nbsp;' + d3.format(",")(percentDif) + dict[lang].percent  + '</span>': '<span class="badge mrgn-lft-md"><i class="fas fa-caret-down fa-1x"></i>&nbsp;' + d3.format(",")(percentDif) + "&nbsp;%</span>";
            }
        }
        else {
            val = `<span class="badge mrgn-lft-md">${d3.format(",")(percentDif) + dict[lang].percent}</span>`;
        }

        return val;
    }

    function difference(a, b, elm, daterange) {

        let bigNum, smallNum;
        if (a > b) {
            bigNum = parseFloat(a);
            smallNum = parseFloat(b);
        }
        else {
            bigNum = parseFloat(b);
            smallNum = parseFloat(a);
        }

        let step1, step2, percentDif;
        step1 = bigNum - smallNum;
        step2 = parseFloat((bigNum + smallNum) / 2);
        percentDif = parseFloat((parseFloat(step1 / step2)) * 100).toFixed(1);



        if (percentDif != 0) {
            if (a > b) {
                document.getElementById(elm).innerHTML = lang === "en" ? '<i class="fas fa-caret-up"></i>&nbsp;' + d3.format(",")(percentDif) + dict[lang].percent : '<i class="fas fa-caret-up"></i>&nbsp;' + d3.format(",")(percentDif) + "&nbsp;%";


                let text = document.createElement('div');
                text.setAttribute('class', 'addedText');
                text.innerHTML = "<span class=\"small\">" + dict[lang].difference[0] + daterange + "</span>";
                document.getElementById(elm).insertAdjacentElement('afterend', text);
                document.getElementById(elm).classList.add('text-success');
            }
            else if (a < b) {

                document.getElementById(elm).innerHTML = '<i class="fas fa-caret-down"></i>&nbsp;' + d3.format(",")(percentDif) + dict[lang].percent;
                let text = document.createElement('div');
                text.setAttribute('class', 'addedText');
                text.innerHTML = "<span class=\"small\">" + dict[lang].difference[1] + daterange + "</span>";
                document.getElementById(elm).insertAdjacentElement('afterend', text);
                document.getElementById(elm).classList.add('text-danger');
            }
        }
        else {
            document.getElementById(elm).innerHTML = d3.format(",")(percentDif) + dict[lang].percent;
        }
    }

    function getColor(value) {
        //value from 0 to 1
        var hue = ((value)).toString(10);
        return ["hsl(", hue, ",85%,60%)"].join("");
    }

    $("#previous-data-select").change(function () {

        loaded = false;
        let spinner = document.createElement("div")
        spinner.setAttribute('class', 'spinner-wrapper');
        spinner.innerHTML = "<div class='spinner'></div>";
        document.querySelector('.content').appendChild(spinner);


        let m = this.value;
        $(".addedText").remove();
        lastMonth = m;
        runData(m).then(
            function (value) {
                setTimeout(() => { $(".spinner-wrapper").remove() }, 2000)
            });

        $(".wb-tables").trigger("wb-init.wb-tables");


    });

});

$("#anchors").change(function () {
    let anchor = this.value;

    let link = document.createElement('a');
    link.setAttribute('href', "#" + anchor);
    link.click();
});
