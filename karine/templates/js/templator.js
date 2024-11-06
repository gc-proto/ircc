const urlParams = (window.location.href).split("?url=")[1]
let input = document.getElementById('enterURL');
let error = false;
let form = document.getElementById('form');
let downloadedContent = document.getElementById('downloadedContent');
let output = document.getElementById('output');
let showOutput = document.getElementById('showOutput');
let preview = document.getElementById('preview');
let generatedTemplate = "";
let filename = "";
let toolstatus = document.getElementById('status');

let componentID = 0;
let page;

// import basic_en from "./template/basic-en.js";

if (urlParams) {
    input.value = urlParams;
    generateTemplate();
}

let theme = localStorage.getItem("templatorTheme");

if (theme) {document.querySelector('div[data-theme]').setAttribute('data-theme', theme);}


document.getElementById('generate').onclick = function (e) {
    e.preventDefault();

    if (error) {
        form.firstElementChild.remove();
        error = false;
    }

    if (input.value == "") {
        let errorMsg = document.createElement("p");
        errorMsg.setAttribute("id", "errorMsg");
        errorMsg.innerHTML = "Please enter a URL."
        errorMsg.classList.add('error');
        this.parentElement.prepend(errorMsg)
        error = true
    }
    else {
        generateTemplate()
    }
}

function generateTemplate() {
    let href = input.value;
    page = {
        metadata: {
            dateModified: "",
            description: "",
            keywords: "",
            lang: "",
        },
        head: {
            title: "",
            alternateLanguageURL: "",
            experimentalFeatures: "",
            structuredData: "",
        },
        components: {
            breadcrumb: "",
            signInButton: false,
            fluidWidth: false,
            pageFeedbackTool: false,
        },
        contents: "",
    }

    downloadedContent.innerHTML = getURL(href);

    if (href.indexOf("canada.ca/en/") > 1) { page.metadata.lang = "en" }
    else { page.metadata.lang = "fr" }
    // page.metadata.lang = downloadedContent.getElementsByTagName('html')[0].getAttribute('lang');

    page.head.title = downloadedContent.getElementsByTagName('title')[0].innerText;
    let experimentalFeatures = downloadedContent.querySelectorAll('link[rel="stylesheet"]');
    for (let i = 0; i < experimentalFeatures.length; i++) {
        if (experimentalFeatures[i]['href'].indexOf('m%C3%A9li-m%C3%A9lo') > -1) {
            page.head.experimentalFeatures = "https://www.canada.ca/etc/" + decodeURI(experimentalFeatures[i]['href'].split('/etc/')[1]);
        }
    }
    page.head.alternateLanguageURL = page.metadata.lang == "en" ? downloadedContent.querySelector('link[hreflang="fr"').getAttribute('href') : downloadedContent.querySelector('link[hreflang="en"').getAttribute('href');
    page.head.structuredData = downloadedContent.querySelector('script[type="application/ld+json"]') ? downloadedContent.querySelector('script[type="application/ld+json"]').outerHTML : "";

    page.metadata.dateModified = downloadedContent.querySelector('meta[name="dcterms.modified"]').getAttribute('content');
    page.metadata.description = downloadedContent.querySelector('meta[name="dcterms.description"]') ? downloadedContent.querySelector('meta[name="dcterms.description"]').getAttribute('content') : "";
    page.metadata.keywords = downloadedContent.querySelector('meta[name="keywords"]') ? downloadedContent.querySelector('meta[name="keywords"]').getAttribute('content') : "";

    page.components.fluidWidth = downloadedContent.getElementsByTagName('main')[0].classList.contains('container') ? true : false;
    page.components.breadcrumb = downloadedContent.querySelector('.breadcrumb').outerHTML;
    page.components.signInButton = downloadedContent.querySelector('#wb-so') ? true : false;
    let feedback = downloadedContent.querySelectorAll('div[data-ajax-replace]');
    for (let i = 0; i < feedback.length; i++) {
        if (feedback[i].getAttribute('data-ajax-replace').indexOf('page-feedback-') > -1) {
            page.components.pageFeedbackTool = true
        }
    }

    page.contents = downloadedContent.querySelector('main').innerHTML;

    page.contents = fixLinks(page.contents);
    generatedTemplate = page.metadata.lang == "en" ? englishTemplate(page) : frenchTemplate(page);



    preview.innerHTML = generatedTemplate;
    output.value = generatedTemplate;
    document.getElementById('pageDetails').innerHTML = getPageDetails();
    triggerWET();

    document.getElementById('highlighting-content').innerHTML = generatedTemplate;
    update(output.value)

    filename = document.getElementById('enterURL').value.split("/");
    filename = filename.pop();
    showOutput.classList.remove('hidden');

}

document.getElementById('copyClip').onclick = function () {
    navigator.clipboard.writeText(output.value);
    
    toolstatus.innerText = `Copied to clipboard`;
    $(toolstatus).fadeIn("fast").delay(2000).fadeOut("slow");
}

document.getElementById('update').onclick = function () {
    generatedTemplate = output.value;
    preview.innerHTML = output.value;
    toolstatus.innerText = `Updated page preview`;
    $(toolstatus).fadeIn("fast").delay(2000).fadeOut("slow");
}

document.getElementById('save').onclick = function () {
    let data;
    data = output.value;
    var htmlContent = [data];
    var bl = new Blob(htmlContent, { type: "text/html" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = filename;
    a.hidden = true;
    document.body.appendChild(a);
    a.click();
    
    toolstatus.innerText = `Downloaded as `+filename;
    $(toolstatus).fadeIn("fast").delay(2000).fadeOut("slow");
}

document.getElementById('aem-extract').onclick = function(){
    let mainNoPageDetails = downloadedContent.querySelector('main');
    // downloadedContent.querySelector('main').innerHTML;

    mainNoPageDetails.querySelector('.pagedetails').remove();

    console.log(mainNoPageDetails.innerHTML)

    output.value = mainNoPageDetails.innerHTML;

    document.getElementById('highlighting-content').innerHTML = mainNoPageDetails;
    update(output.value)

    showOutput.classList.remove('hidden');
    
}

function getPageDetails() {
    let details = `<dl class="dl-horizontal small">`;
    details += `<dt>Page language</dt><dd>` + page.metadata.lang + `</dd>`;
    details += `<dt>Date modified</dt><dd>` + page.metadata.dateModified + `</dd>`;
    details += `<dt>Page description</dt><dd>` + page.metadata.description + `</dd>`;
    details += `<dt>Keywords</dt><dd>` + page.metadata.keywords + `</dd>`;
    details += `<dt>Page title</dt><dd>` + page.head.title + `</dd>`;
    details += `<dt>Language toggle</dt><dd>` + page.head.alternateLanguageURL + `</dd>`;
    if (page.head.structuredData) {
        details += `<dt>Structured data</dt><dd style="max-height:200px;overflow:scroll;">` + JSON.stringify(JSON.parse(page.head.structuredData.replace(/<[^>]+>/g, ''))) + `</dd>`;
    }
    else {
        details += `<dt>Structured data</dt><dd>N/A</dd>`;
    }
    details += `<dt>Breadcrumbs</dt><dd>` + page.components.breadcrumb.replace(`class="breadcrumb"`, '') + `</dd>`;
    details += `<dt>Sign in button?</dt><dd>` + page.components.signInButton + `</dd>`;
    details += `<dt>Page feedback tool?</dt><dd>` + page.components.pageFeedbackTool + `</dd>`;
    details += `</dl>`;
    return details;
};

function fixLinks(html) {
    html = html.replaceAll(`"/` + page.metadata.lang + `/`, `"https://www.canada.ca/` + page.metadata.lang + `/`)
    html = html.replaceAll(`"/content/canadasite/` + page.metadata.lang + `/`, `"https://www.canada.ca/` + page.metadata.lang + `/`)
    html = html.replaceAll(`"/content/dam/`, `"https://www.canada.ca/content/dam/`)
    html = html.replaceAll(`"etc/`, `"https://www.canada.ca/etc/`)
    return html
}

function getURL(href) {
    return $.ajax({
        url: href,
        async: false
    }).responseText;
}

document.getElementById('enterURL').onkeydown = function (e) {
    if (e.keyCode == 13) {
        document.getElementById('generate').click();
    }
};

function triggerWET() {
    (function ($, document, wb) {
        "use strict";
        // "data.ajax-type" contains the insersion method [after, append, before, prepend, replace]
        // "data.content" contains the
        var $elm = $("#preview");
        $elm
            .find(wb.allSelectors)
            .addClass("wb-init")
            .filter(":not(#" + $elm.attr("id") + " .wb-init .wb-init)")
            .trigger("timerpoke.wb");
    })(jQuery, document, wb);
}

function update(text) {
    let result_element = document.querySelector("#highlighting-content");
    // Handle final newlines (see article)
    if (text[text.length - 1] == "\n") {
        text += " ";
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
}

function sync_scroll(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector("#highlighting");
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
    let code = element.value;
    if (event.key == "Tab") {
        /* Tab key pressed */
        event.preventDefault(); // stop normal
        let before_tab = code.slice(0, element.selectionStart); // text before tab
        let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
        let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_tab + "\t" + after_tab; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update(element.value); // Update text to include indent
    }
}


$('input[type=radio][name=theme]').change(function(){
    if (this.value == 'default') {
        document.querySelector('div[data-theme]').setAttribute('data-theme', "default");
    }
    else {        
        document.querySelector('div[data-theme]').setAttribute('data-theme', "dark");
    }

    localStorage.setItem("templatorTheme", this.value);
});


$("[data-add-snippet").click(function(){

    let component =  $(this).attr('data-add-snippet');
    let componentClass = $(this).attr('data-snippet-class');
    componentID++;
    
    let pre = document.getElementById('highlighting-content');


    switch(component) {
        case "subwayNavigationIndex":
          snippets[component] = snippets[component].replace(/templator-\d+/, 'templator-'+componentID);          
          preview.querySelector('h1').insertAdjacentHTML('afterend', snippets[component]);
          output.value = output.value.replace(`</h1>`, `</h1>` + snippets[component]);
          update(output.value);


          let s = output.value.indexOf('</h1>');
          let e = snippets[component].length + s;
          
          $(output).selectRange(s, e);                      
            
          break;
        case "subwayNavigationStep":
            console.log(component)
            snippets[component].start = (snippets[component].start).replace(/templator-\d+/, 'templator-'+componentID); 

            let h1 = preview.querySelector('h1');            
            (snippets[component].start) = (snippets[component].start).replaceAll('_PLACEHOLDER_', h1.innerText); 

            h1.remove();

            let main = preview.querySelector('main');
            main.classList.add('container');
            main.insertAdjacentHTML('afterbegin', snippets[component].start);
            let mainElm = preview.querySelector('main').outerHTML;
            output.value = output.value.replace(mainElm.substring(0,mainElm.indexOf('>')+1), mainElm.substring(0,mainElm.indexOf('>')+1) + snippets[component].start);


            let pageDetails = preview.querySelector('.pagedetails');
            pageDetails.insertAdjacentHTML('beforebegin', snippets[component].end);            
            output.value = output.value.replace(`<section class="pagedetails">`, snippets[component].end + `<section class="pagedetails">`);



            triggerWET();

          break;
        case "alert" :
            componentClass = $(this).attr('data-snippet-class');
            let alert = snippets.alerts.replace('_PLACEHOLDER_', componentClass);
            navigator.clipboard.writeText(alert);
        case "panel" :
            componentClass = $(this).attr('data-snippet-class');
            let panel = snippets.panels.replace('_PLACEHOLDER_', componentClass);
            navigator.clipboard.writeText(panel);
        case "panelsNoTitle" :
            componentClass = $(this).attr('data-snippet-class');
            let panelsNoTitle = snippets.panelsNoTitle.replace('_PLACEHOLDER_', componentClass);
            navigator.clipboard.writeText(panelsNoTitle);
        case "well":
            componentClass = $(this).attr('data-snippet-class') ? " " + $(this).attr('data-snippet-class') : "";
            navigator.clipboard.writeText(snippets.well.replace('_PLACEHOLDER_', componentClass));
        default:
          // code block
    } 
})



$.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
            
            console.log(this.selectionEnd.getClientRects() );
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
            console.log("b");
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
            console.log("c");
            var rects = range.getClientRects();
            console.log(rects);

        }
    });
};