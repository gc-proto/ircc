document.getElementById('find-out-form').onsubmit = function (e) { e.preventDefault() };

let data;
let btnNext = document.getElementById("btn-next");
let btnPrevious = document.getElementById("btn-previous");
let userAnswers = [];

let traveller_type, purpose_of_travel, travel_document;

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
    let currentQuestion = document.querySelector('.question:not(.hidden)');
    let selectedInput = currentQuestion.querySelector('select') ? currentQuestion.querySelector('select').value : currentQuestion.querySelector('input:checked').value;
    let question = currentQuestion.getAttribute('id');
    let next;

    btnPrevious.classList.remove('hidden');

    console.log("Question: " + question);
    console.log("Selected input: ", selectedInput);

    switch (question) {
        case "question-traveller_type":
            traveller_type = selectedInput;
            next = document.getElementById(data[question][selectedInput]);
            console.log("Traveller type: " + traveller_type);
            break;        
        case "question-uspr":
            if (selectedInput === "yes") {
                traveller_type = "uspr"
            }
            else {
                traveller_type = "unkown"
            }
            console.log("Traveller type: " + traveller_type);
            next = document.getElementById(data[question][selectedInput]);
            break;
        case "question-travel_document":
            next = document.getElementById(data[question][purpose_of_travel][selectedInput]);               
            break;
        case "question-nonimmigrant_visa":
            next = document.getElementById(data[question][traveller_type][purpose_of_travel][selectedInput]);               
            break;
        case "question-travel_document_israel":
        case "question-travel_document_romania":
        case "question-travel_document_taiwan":
            next = document.getElementById(data[question][purpose_of_travel][selectedInput]);               
            break;
        case "question-passport_code":           
            // traveller_type = data[question][selectedInput];
            // console.log(traveller_type);
            next = document.getElementById(data["question-purpose_of_travel"][traveller_type][purpose_of_travel]); 
            break; 
        case "question-purpose_of_travel":
            purpose_of_travel = selectedInput;
            next = document.getElementById(data[question][traveller_type][selectedInput]);
            break;
        default:
            console.log("Traveller type: " + traveller_type);
            next = document.getElementById(data[question][traveller_type][selectedInput]);
            break;
    }

    console.log("Next: ", next);
    console.log("Traveller: ", traveller_type);

    userAnswers.push(currentQuestion);

    if (next.getAttribute('id').indexOf('question') > -1) {
        console.log("go to a question");
    }
    else {
        console.log("go to a result");
    }

    currentQuestion.classList.add('hidden');
    next.classList.remove('hidden');
};

btnPrevious.onclick = function () {
    let currentQuestion = document.querySelector('.question:not(.hidden)') ? document.querySelector('.question:not(.hidden)') : document.querySelector('.result:not(.hidden)');   
    currentQuestion.classList.add('hidden');

    userAnswers[userAnswers.length-1].classList.remove('hidden');
    userAnswers.pop();
}

$("button.passport-code").on("click", function(){
    let code = $(this).attr('data-passport-code');

    traveller_type = data["question-passport_code"][code];
    
    console.log(code);
    console.log(traveller_type);

    document.getElementById('passport-selection').innerHTML = `${document.querySelector('[data-passport-code="'+code+'"]').innerHTML} (${document.querySelectorAll('[data-passport-code="'+code+'"]')[1].innerHTML})`;

    document.getElementById('passport-code').classList.add('hidden');
    document.getElementById('passport-code-selection').classList.remove('hidden');
});

$("#passport-selection-change").on("click", function(){
    document.getElementById('passport-code').classList.remove('hidden');
    document.getElementById('passport-code-selection').classList.add('hidden');
});

// function layoutShift(){
//     let tableInformation = document.querySelector('.table-information');
    
//     document.querySelector('.top').insertAdjacentHTML("afterend",tableInformation.outerHTML);
//     tableInformation.remove();
    
// } 

// $( ".wb-tables" ).on( "wb-ready.wb-tables", function( event ) {
//     layoutShift();
// });