/*For QA
window.addEventListener('keydown', ({key}) => {
    if (key === "Backspace") {
        btnPrevious.click();
    }
    if (key === "Enter") {
        btnNext.click();
    }

});
*/
let clear = false; // For QA

//Prevent form submission
document.getElementById('find-out-form').onsubmit = function (e) { e.preventDefault() };


let data;
let toolContainer = document.querySelector(".tool-container")
let btnNext = document.getElementById("btn-next");
let btnPrevious = document.getElementById("btn-previous");
let form = document.getElementById("find-out-form");
let userAnswers = [];

let traveller_type, purpose_of_travel, travel_document, travel_type;
let passport_type = false;
let visit_length = false;

let errorMessageDiv = `<section id="errors-${form.getAttribute('id')}" class="alert alert-danger" tabindex="-1"><h2>The form could not be submitted because 1 error was found.</h2><ul><li><a href="#passport_code_table"><span class="prefix">Error&nbsp;1: </span>This field is required.</a></li></ul></section>`;
let errorMessageH2 = `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Error&nbsp;1: </span>This field is required.</span></strong>`


// Load JSON file and assign data to variable
getJSON();
async function getJSON() {
    const requestURL =
        "visas.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonData = await response.json();

    data = jsonData;
}

// On Next button click
btnNext.onclick = function () {

    // For QA, if you type clear = true in console, it'll clear the console long on each next button click. Will be removed from prod.
    if (clear) {
        console.clear(); 
    }

    //Get current question & if no selection was made, force form validation to show error. Else, if something was selected, continue with rest of script.
    let currentQuestion = document.querySelector('.question:not(.hidden)');
    
    // if (!currentQuestion.querySelector('input:checked') && (!currentQuestion.getAttribute('id') === "question-passport_code")) {
    //     $(form).validate();
    //     $(form).valid();
    // }
    if (currentQuestion.querySelector('input') && !currentQuestion.querySelector('input:checked')) {
        $(form).validate();
        $(form).valid();
    }
    if ((currentQuestion.getAttribute('id') === "question-passport_code") && document.getElementById('passport-code-selection').classList.contains('hidden')) {        
        
       currentQuestion.insertAdjacentHTML('beforebegin', errorMessageDiv)
       currentQuestion.querySelector('legend').insertAdjacentHTML('beforeend', errorMessageH2);
       document.getElementById(`errors-${form.getAttribute('id')}`).focus();
    }
    else {
        if ((currentQuestion.getAttribute('id') === "question-passport_code") && currentQuestion.querySelector(`#errors-${form.getAttribute('id')}`)) {
            document.getElementById(`errors-${form.getAttribute('id')}`).remove();
            document.getElementById('passport_code_table-error').remove();

        }
        
        // if user has previously went to the country table and made a selection, force variable assignment of type of traveller and selected input; else get the checked radio button.
        if (currentQuestion.querySelector('#passport-code-selection') && (!document.getElementById('passport-code-selection').classList.contains('hidden'))) {
            traveller_type = (data["question-passport_code"][document.getElementById('passport-selection').getAttribute('data-passport-code')]).trim();
            selectedInput = traveller_type;
        }
        else {
            selectedInput = currentQuestion.querySelector('input:checked').value;
        }

        let question = currentQuestion.getAttribute('id');
        let next;

        // show previous button
        btnPrevious.classList.remove('hidden');

        switch (question) {
            case "question-traveller_type":
                traveller_type = selectedInput;
                next = document.getElementById(data[question][selectedInput]);
                break;

            case "question-uspr":
                if (selectedInput === "yes") {
                    traveller_type = "uspr"
                }
                else {
                    traveller_type = "unknown"
                }
                next = document.getElementById(data[question]);
                break;
            case "question-purpose_of_travel":
                purpose_of_travel = selectedInput;

                next = document.getElementById(data[question][traveller_type][selectedInput]);

                break;
            case "question-family":
                purpose_of_travel = selectedInput;
                next = document.getElementById(data[question][selectedInput][traveller_type]);
                break;
            case "question-study":
            case "question-work":
                console.log("passport_type: ", passport_type);
                if (travel_type === "air" && userAnswers.includes(document.getElementById("question-travel"))) {
                    next = document.getElementById(data[question][traveller_type][travel_type][selectedInput]);
                }
                else if (passport_type === true) {
                    next = document.getElementById(data[question][traveller_type][passport_type][selectedInput]);
                }
                else {
                    next = document.getElementById(data[question][traveller_type][selectedInput]);
                }
                break;
            case "question-travel":
                travel_type = selectedInput;
                if (!data[question][purpose_of_travel][traveller_type]) {
                    next = document.getElementById(data[question][purpose_of_travel]);
                }
                else {
                    next = document.getElementById(data[question][purpose_of_travel][traveller_type][selectedInput]);
                }
                break;

            case "question-transit":
                if ((traveller_type === "eTA-X" || traveller_type === "eTA-X-TWOV" || traveller_type === "mexico")) {
                    next = document.getElementById(data[question][traveller_type][travel_type][selectedInput]);
                }
                else {
                    next = document.getElementById(data[question][traveller_type][selectedInput]);
                }
                break;
            case "question-transit_length":
                next = document.getElementById(data[question][traveller_type][selectedInput]);
                break;
            case "question-nonimmigrant_visa":
                next = document.getElementById(data[question][traveller_type][purpose_of_travel][selectedInput]);
                break;

            case "question-travel_document":
                traveller_type = selectedInput;
                next = document.getElementById(data[question][purpose_of_travel][selectedInput]);
                break;
            case "question-travel_document_israel":
            case "question-travel_document_romania":
            case "question-travel_document_taiwan":
                if (selectedInput === "yes") {
                    passport_type = true;
                }
                else {
                    passport_type = false;
                }
                if (!data[question][purpose_of_travel][selectedInput]) {
                    next = document.getElementById(data[question][purpose_of_travel]);
                }
                else {
                    next = document.getElementById(data[question][purpose_of_travel][selectedInput]);
                }
                break;

            case "question-passport_code":
                if (traveller_type === "us_citizen" && purpose_of_travel === "family") {
                    next = document.getElementById(data["question-purpose_of_travel"][traveller_type]["family_notsupervisa"]);
                }
                else if (!data["question-purpose_of_travel"][traveller_type][purpose_of_travel]) {
                    next = document.getElementById(data["question-purpose_of_travel"][traveller_type]);
                }
                else {
                    next = document.getElementById(data["question-purpose_of_travel"][traveller_type][purpose_of_travel]);
                }
                break;
            default:
                if (!data[question][traveller_type][selectedInput]) {
                    next = document.getElementById(data[question][traveller_type]);
                }
                else {
                    next = document.getElementById(data[question][traveller_type][selectedInput]);

                }
                break;
        }

        console.log("===================");
        console.log("Question: " + question);
        console.log("Selected input: ", selectedInput);
        console.log("Traveller: ", traveller_type);
        console.log("purpose_of_travel: ", purpose_of_travel);
        console.log("Next: ", next);
        console.log("===================");

        userAnswers.push(currentQuestion);

        if ((next.getAttribute("id") === "question-study" || next.getAttribute("id") === "question-work") && traveller_type === "us_citizen") {
            document.getElementById('study-extend_permit').parentElement.classList.add('hidden');
            document.getElementById('work-extend_permit').parentElement.classList.add('hidden');
        }
        else {
            document.getElementById('study-extend_permit').parentElement.classList.remove('hidden');
            document.getElementById('work-extend_permit').parentElement.classList.remove('hidden');
        }

        if (next.getAttribute('id').indexOf('question') > -1) {
            console.log("go to a question");
        }
        else {
            console.log("go to a result");
            btnNext.classList.add('hidden');
        }

        currentQuestion.classList.add('hidden');
        next.classList.remove('hidden');
        toolContainer.scrollIntoView({ block: "start" })
    }
};


btnPrevious.onclick = function () {
    var validator = $(form).validate();
    validator.resetForm();
    if (document.getElementById('errors-' + form.getAttribute('id'))) document.getElementById('errors-' + form.getAttribute('id')).remove();

    let currentQuestion = document.querySelector('.question:not(.hidden)') ? document.querySelector('.question:not(.hidden)') : document.querySelector('.result:not(.hidden)');
    currentQuestion.classList.add('hidden');
    if (currentQuestion.querySelector('input')) currentQuestion.querySelector('input').removeAttribute('required');

    if (currentQuestion.getAttribute("id") === 'question-passport_code' || currentQuestion.getAttribute('id') === 'question-travel_document') {
        traveller_type = "unknown";
        passport_type = false;
        travel_type = false;
    }

    userAnswers[userAnswers.length - 1].classList.remove('hidden');
    if ((userAnswers[userAnswers.length - 1].getAttribute("id") === "question-study" || userAnswers[userAnswers.length - 1].getAttribute("id") === "question-work") && traveller_type === "us_citizen") {
        document.getElementById('study-extend_permit').parentElement.classList.add('hidden');
        document.getElementById('work-extend_permit').parentElement.classList.add('hidden');
    }
    else {
        document.getElementById('study-extend_permit').parentElement.classList.remove('hidden');
        document.getElementById('work-extend_permit').parentElement.classList.remove('hidden');
    }
    toolContainer.scrollIntoView({ block: "start" })
    userAnswers.pop();

    if (userAnswers.length === 0) {
        btnPrevious.classList.add('hidden');
    }

    btnNext.classList.remove('hidden');
}

$("button.passport-code").on("click", function () {
    console.log('passport btn firing')
    let code = $(this).attr('data-passport-code');
    traveller_type = data["question-passport_code"][code].trim();

    document.getElementById('passport-selection').innerHTML = `${document.querySelector('[data-passport-code="' + code + '"]').innerHTML} (${document.querySelectorAll('[data-passport-code="' + code + '"]')[1].innerHTML})`;
    document.getElementById('passport-selection').setAttribute('data-passport-code', code.trim());
    document.getElementById('passport-code').classList.add('hidden');
    document.getElementById('passport-code-selection').classList.remove('hidden');
});

$("#passport-selection-change").on("click", function () {
    document.getElementById('passport-code').classList.remove('hidden');
    document.getElementById('passport-code-selection').classList.add('hidden');
});
