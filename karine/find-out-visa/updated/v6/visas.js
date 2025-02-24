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


let doclang = document.getElementsByTagName('html')[0].getAttribute('lang') == "en" ? "en" : "fr";
let langSettings = {
    en: {
        errorMessageDiv: `<section id="errors-${form.getAttribute('id')}" class="alert alert-danger" tabindex="-1"><h2>The form could not be submitted because 1 error was found.</h2><ul><li><a href="#passport_code_table"><span class="prefix">Error&nbsp;1: </span>This field is required.</a></li></ul></section>`,
        errorMessageH2: `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Error&nbsp;1: </span>This field is required.</span></strong>`
    },
    fr: {
        errorMessageDiv: `<section id="errors-${form.getAttribute('id')}" class="alert alert-danger" tabindex="-1"><h2>Le formulaire n'a pu être soumis car 1 erreur a été trouvée.</h2><ul><li><a href="#q1-item-0"><span class="prefix">Erreur&nbsp;1&nbsp;: </span>Ce champ est obligatoire.</a></li></ul></section>`,
        errorMessageH2: `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Erreur&nbsp;1&nbsp;: </span>Ce champ est obligatoire.</span></strong>`
    }
}

let traveller_type, purpose_of_travel, travel_document, travel_type;
let passport_type = false;
let visit_length = false;

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
  
    if (currentQuestion.querySelector('input') && !currentQuestion.querySelector('input:checked')) {
        $(form).validate();
        $(form).valid();
    }
    if ((currentQuestion.getAttribute('id') === "question-passport_code") && document.getElementById('passport-code-selection').classList.contains('hidden')) {        
        
       currentQuestion.insertAdjacentHTML('beforebegin', langSettings[doclang].errorMessageDiv)
       currentQuestion.querySelector('legend').insertAdjacentHTML('beforeend', langSettings[doclang].errorMessageH2);
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


        /*
            For the select case:

            question = the current question displayed on the screen
            selectedInput = the selected radio button OR selected country
            traveller_type = canadian/visa/eta/usa/eta-x/etc
            purpose_of_travel = tourist/transit/business/family/study/work
            next = where are they going to next

            This logic follows what is in the JSON file, and we're essentially getting the next question by going to the current question and following the JSON path.

        */

        switch (question) {
            case "question-traveller_type":
                // this question will define what kind of traveller you are, saves it to a variable as it comes up in other cases.
                traveller_type = selectedInput;
                next = document.getElementById(data[question][selectedInput]);
                break;
            case "question-uspr":
                // reset traveller_type in case they are a USPR
                traveller_type = selectedInput === "yes" ? "uspr": "unknown";
                next = document.getElementById(data[question]);
                break;
            case "question-purpose_of_travel":
                 // this question will define what you plan to do when visiting Canada, saves it to a variable as it comes up in other cases.
                purpose_of_travel = selectedInput;
                next = document.getElementById(data[question][traveller_type][selectedInput]);
                break;
            case "question-family":
                // Redefining the purpose here for specificity. Are you visiting for less or more than 6 months (supervisa or not supervisa).
                purpose_of_travel = selectedInput;
                next = document.getElementById(data[question][selectedInput][traveller_type]);
                break;
            case "question-study":
            case "question-work":
                // Some travellers need to answer how they're going to travel to Canada, which impacts their result.
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
                // we need to track how a traveller is travelling, either air (plane) or ground (land, sea, cruise)
                travel_type = selectedInput;
                next = !data[question][purpose_of_travel][traveller_type] ? document.getElementById(data[question][purpose_of_travel]) : document.getElementById(data[question][purpose_of_travel][traveller_type][selectedInput]);
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
                passport_type = selectedInput === "yes" ? true : false;
                next = !data[question][purpose_of_travel][selectedInput] ? document.getElementById(data[question][purpose_of_travel]) : document.getElementById(data[question][purpose_of_travel][selectedInput]);
                break;
            case "question-passport_code":
                // There's an exception here for US travellers because they can get to this question by identifying themselves as US citizens in the first question, or from the list of countries in the table. 
                // To make sure they don't get asked the family question twice, we're sending them to a different path than other travellers.
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
                next = !data[question][traveller_type][selectedInput] ? document.getElementById(data[question][traveller_type]) : document.getElementById(data[question][traveller_type][selectedInput]);
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

            let changeAnswersDL = document.createElement("dl");
            for (let i = 0; i < userAnswers.length; i++) {
                let changeAnswersDT = document.createElement('dt');
                changeAnswersDT.innerHTML = `<b>${userAnswers[i].querySelector('legend').innerText}</b>`;
                
                let changeAnswersDD = document.createElement('dd');
                changeAnswersDD.innerHTML = userAnswers[i].id === "question-passport_code" ? userAnswers[i].querySelector('#passport-selection').innerText : userAnswers[i].querySelector('input:checked').parentElement.innerText;
                
                let changeAnswersLink = document.createElement('button');
                changeAnswersLink.classList.add('btn-change-answer', 'mrgn-lft-md', 'btn-link');
                changeAnswersLink.innerHTML = `Change answer<span class="wb-inv"> for "${changeAnswersDT.innerText}"</span>`;
                changeAnswersLink.setAttribute('data-change', `${userAnswers[i].getAttribute('id')}`);
                changeAnswersLink.setAttribute('type', 'button');
                changeAnswersLink.addEventListener('click', function(e){
                    previous(userAnswers[i].getAttribute('id'))
                });
                changeAnswersDD.appendChild(changeAnswersLink);

                

                changeAnswersDL.appendChild(changeAnswersDT);
                changeAnswersDL.appendChild(changeAnswersDD);
            }
            document.getElementById('changeAnswers').appendChild(changeAnswersDL);
        }

        currentQuestion.classList.add('hidden');
        next.classList.remove('hidden');
        toolContainer.scrollIntoView({ block: "start" })
    }
};


btnPrevious.onclick = function () {
    previous();    
}

function previous(changeAnswer) {
    // revalidated the form and clear and empty the error if there was one; clear the "change answer" section
    var validator = $(form).validate();
    validator.resetForm();
    if (document.getElementById('errors-' + form.getAttribute('id'))) document.getElementById('errors-' + form.getAttribute('id')).remove();
    document.getElementById('changeAnswers').innerHTML = "";

    // get previous question, using array if previous click or change answer option
    let previousQuestion = changeAnswer ? document.getElementById(changeAnswer) : userAnswers[userAnswers.length - 1];

    // get what's on screen, either a question or a result and hide it. If it's a question, remove the required attribute to prevent a form error.
    let currentQuestion = document.querySelector('.question:not(.hidden)') ? document.querySelector('.question:not(.hidden)') : document.querySelector('.result:not(.hidden)');
    currentQuestion.classList.add('hidden');
    if (currentQuestion.querySelector('input')) currentQuestion.querySelector('input').removeAttribute('required');

    // clear some of the variables that are question specific
    if (currentQuestion.getAttribute("id") === 'question-passport_code' || currentQuestion.getAttribute('id') === 'question-travel_document') {
        traveller_type = "unknown";
        passport_type = false;
        travel_type = false;
    }

    // US specific, update the work and study questions with/without the extend option
    if ((previousQuestion.getAttribute("id") === "question-study" || previousQuestion.getAttribute("id") === "question-work") && traveller_type === "us_citizen") {
        document.getElementById('study-extend_permit').parentElement.classList.add('hidden');
        document.getElementById('work-extend_permit').parentElement.classList.add('hidden');
    }
    else {
        document.getElementById('study-extend_permit').parentElement.classList.remove('hidden');
        document.getElementById('work-extend_permit').parentElement.classList.remove('hidden');
    }

    previousQuestion.classList.remove('hidden');

    if (changeAnswer) {
        let x = userAnswers.indexOf(previousQuestion);
        userAnswers = userAnswers.slice(0, x);
    }
    else {
        userAnswers.pop();
    }   

    toolContainer.scrollIntoView({ block: "start" })

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
