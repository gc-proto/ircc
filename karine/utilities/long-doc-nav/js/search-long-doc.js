var currentURL = window.location
var pages = [currentURL, "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/annual-report-parliament-immigration-2023.html", "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/annual-report-parliament-immigration-2022.html"];

var searchForm = document.getElementById('document-search')
var searchBtn = document.getElementById('search-btn');
var searchInput = document.getElementById('search-input');

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {

    let main = document.getElementsByTagName('main')[0];

    searchForm.onsubmit = function (e) {
        e.preventDefault();
        searchBtn.click();
    }

    searchBtn.onclick = function (e) {
        e.preventDefault();
        let searchKey = searchInput.value;
        let searchContent = getContent();
        for (let i = 0; i < searchContent.length; i++) {

            let html = searchContent[i][0];
            let url = searchContent[i][1];
            let instances = getIndicesOf(searchKey, html);
            console.log(instances);

            let firstResults = instances.slice(0, 3);
            console.log(firstResults);
            if (currentURL === url) {
                
                // let mainHTML = main.innerHTML;

                // for (let j = 0; j < instances.length; j++) {
                //     let searchKeyLength = searchKey.length;
                //     console.log(searchKeyLength)
                //     let insertMark = mainHTML.slice(0,instances[j]) + "<mark>" + mainHTML.slice(instances[j]+searchKeyLength) + "/<mark>";
                //     console.log(insertMark)
                // }


                let searchResultsCtn = document.createElement('div');
                searchResultsCtn.innerHTML += `<p>${instances.length} instances on this page</p>`;

                let mainHTML = document.getElementById('wrapMain').innerHTML;

                searchKey = searchKey.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                let regex = new RegExp("("+searchKey+")", "gi");

                mainHTML = mainHTML.replaceAll(regex, '<mark>$1</mark>');
                console.log(mainHTML);
                document.getElementById('wrapMain').innerHTML = mainHTML;

            }
        }
    }

    function getContent() {
        var content = [];
        for (let i = 0; i < pages.length; i++) {
            let html = getURL(pages[i]);
            let tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            let mainElm = tempContainer.querySelector('main').innerHTML;
            content.push([mainElm, pages[i]])
        }
        return content
    }

    function getURL(href) {
        return $.ajax({
            url: href,
            async: false
        }).responseText;
    }

    function getIndicesOf(searchStr, str, caseSensitive) {
        var searchStrLen = searchStr.length;
        if (searchStrLen == 0) {
            return [];
        }
        var startIndex = 0, index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }


}) 