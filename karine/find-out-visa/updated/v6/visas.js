//keep anchor to the top of the page

document.getElementById('find-out-form').onsubmit = function (e) { e.preventDefault() };

let data;
let btnNext = document.getElementById("btn-next");
let btnPrevious = document.getElementById("btn-previous");
let userAnswers = [];

let traveller_type, purpose_of_travel, travel_document, travel_type;
let passport_type = false;
let visit_length = false;

let clear = false;

getJSON();

async function getJSON() {
    const requestURL =
        "visas.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonData = await response.json();

    data = jsonData;
}

btnNext.onclick = function () {
    if (clear) {
        console.clear();
    }
    let currentQuestion = document.querySelector('.question:not(.hidden)');

    if (currentQuestion.querySelector('#passport-code-selection') && (!document.getElementById('passport-code-selection').classList.contains('hidden'))) {
        if (!document.getElementById('passport-code-selection').classList.contains('hidden')) {
            traveller_type = (data["question-passport_code"][document.getElementById('passport-selection').getAttribute('data-passport-code')]).trim();
            selectedInput = traveller_type;
        }
    }
    else {
        selectedInput = currentQuestion.querySelector('input:checked').value;
    }

    let question = currentQuestion.getAttribute('id');
    let next;

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
                console.log("tesT?");
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
};

btnPrevious.onclick = function () {
    let currentQuestion = document.querySelector('.question:not(.hidden)') ? document.querySelector('.question:not(.hidden)') : document.querySelector('.result:not(.hidden)');
    currentQuestion.classList.add('hidden');

    if (currentQuestion.getAttribute("id") === 'question-passport_code') {
        traveller_type = "unknown"
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
    userAnswers.pop();

    if (userAnswers.length === 0) {
        btnPrevious.classList.add('hidden');
    }

    btnNext.classList.remove('hidden');
}
/*For quick coding.
window.addEventListener('keydown', ({key}) => {
    if (key === "Backspace") {
        btnPrevious.click();
    }
    if (key === "Enter") {
        btnNext.click();
    }

});
*/
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