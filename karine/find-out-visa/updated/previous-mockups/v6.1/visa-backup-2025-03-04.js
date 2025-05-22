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
let btnReset = document.getElementById("btn-reset");
let form = document.getElementById("find-out-form");
let userAnswers = [];


let doclang = document.getElementsByTagName('html')[0].getAttribute('lang') == "en" ? "en" : "fr";
let langSettings = {
    en: {
        errorMessageDiv: `<section id="errors-${form.getAttribute('id')}" class="alert alert-danger" tabindex="-1"><h2>The form could not be submitted because 1 error was found.</h2><ul><li><a href="#passport_code_table"><span class="prefix">Error&nbsp;1: </span>This field is required.</a></li></ul></section>`,
        errorMessageH2: `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Error&nbsp;1: </span>This field is required.</span></strong>`,
        answerHeading: `<h2>You told us</h2>`
    },
    fr: {
        errorMessageDiv: `<section id="errors-${form.getAttribute('id')}" class="alert alert-danger" tabindex="-1"><h2>Le formulaire n'a pu être soumis car 1 erreur a été trouvée.</h2><ul><li><a href="#q1-item-0"><span class="prefix">Erreur&nbsp;1&nbsp;: </span>Ce champ est obligatoire.</a></li></ul></section>`,
        errorMessageH2: `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Erreur&nbsp;1&nbsp;: </span>Ce champ est obligatoire.</span></strong>`,
        answerHeading: `<h2>Vous nous avez dit</h2>`
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
            For the object:

            question = the current question displayed on the screen
            selectedInput = the selected radio button OR selected country
            traveller_type = canadian/visa/eta/usa/eta-x/etc
            purpose_of_travel = tourist/transit/business/family/study/work
            next = where are they going to next

            This logic follows what is in the JSON file, and we're essentially getting the next question by going to the current question and following the JSON path.
        */

        const questionHandlers = {
            "question-traveller_type": () => {
                traveller_type = selectedInput;
                return data[question][selectedInput];
            },
            "question-uspr": () => {
                traveller_type = selectedInput === "yes" ? "uspr" : "unknown";
                return data[question];
            },
            "question-purpose_of_travel": () => {
                purpose_of_travel = selectedInput;
                return data[question][traveller_type][selectedInput];
            },
            "question-family": () => {
                purpose_of_travel = selectedInput;
                return data[question][selectedInput][traveller_type];
            },
            "question-study": () => getNextForStudyOrWork(),
            "question-work": () => getNextForStudyOrWork(),
            "question-travel": () => {
                travel_type = selectedInput;
                return data[question][purpose_of_travel][traveller_type]
                    ? data[question][purpose_of_travel][traveller_type][selectedInput]
                    : data[question][purpose_of_travel];
            },
            "question-transit": () => {
                return ["eTA-X", "eTA-X-TWOV", "mexico"].includes(traveller_type)
                    ? data[question][traveller_type][travel_type][selectedInput]
                    : data[question][traveller_type][selectedInput];
            },
            "question-transit_length": () => data[question][traveller_type][selectedInput],
            "question-nonimmigrant_visa": () => data[question][traveller_type][purpose_of_travel][selectedInput],
            "question-travel_document": () => {
                traveller_type = selectedInput;
                return data[question][purpose_of_travel][selectedInput];
            },
            "question-travel_document_israel": () => handleTravelDocument(),
            "question-travel_document_romania": () => handleTravelDocument(),
            "question-travel_document_taiwan": () => handleTravelDocument(),
            "question-passport_code": () => handlePassportCode()
        };

        // ** Helper functions **
        const getNextForStudyOrWork = () => {
            if (travel_type === "air" && userAnswers.includes(document.getElementById("question-travel"))) {
                return data[question][traveller_type][travel_type][selectedInput];
            } else if (passport_type === true) {
                return data[question][traveller_type][passport_type][selectedInput];
            } else {
                return data[question][traveller_type][selectedInput];
            }
        };

        const handleTravelDocument = () => {
            passport_type = selectedInput === "yes";
            return data[question][purpose_of_travel][selectedInput] || data[question][purpose_of_travel];
        };

        const handlePassportCode = () => {
            if (traveller_type === "us_citizen" && purpose_of_travel === "family") {
                return data["question-purpose_of_travel"][traveller_type]["family_notsupervisa"];
            } else {
                return data["question-purpose_of_travel"][traveller_type][purpose_of_travel] || data["question-purpose_of_travel"][traveller_type];
            }
        };

        // ** Main Logic to get the next question **
        const nextQuestionId = questionHandlers[question] ? questionHandlers[question]() : (data[question][traveller_type][selectedInput] || data[question][traveller_type]);

        next = document.getElementById(nextQuestionId);

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
            toolContainer.classList.remove('results');
            btnReset.classList.add('hidden');
        }
        else {
            toolContainer.classList.add('results');
            btnReset.classList.remove('hidden');
            btnNext.classList.add('hidden');

            let changeAnswersDL = document.createElement("dl");
            changeAnswersDL.classList.add('hidden');
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
                changeAnswersLink.addEventListener('click', function (e) {
                    previous(userAnswers[i].getAttribute('id'))
                });

                changeAnswersDD.appendChild(changeAnswersLink);
                changeAnswersDL.appendChild(changeAnswersDT);
                changeAnswersDL.appendChild(changeAnswersDD);
            }
            document.getElementById('changeAnswers').appendChild(changeAnswersDL);
            document.querySelector('#changeAnswers').classList.remove('hidden');
            expandSection();


        }

        currentQuestion.classList.add('hidden');
        next.classList.remove('hidden');        
        if (next.getAttribute('id').indexOf('question') > -1) next.focus();
        
        toolContainer.scrollIntoView({ block: "start" })
    }
};

function expandSection() {
    if (window.innerWidth < 768) {
        
        
        if (!document.querySelector('.btn-toggle')) {
            let expand_collapse = document.createElement('button');
            expand_collapse.classList.add('btn-expand', 'btn-toggle', 'pull-left');
            expand_collapse.innerHTML = `<span class="fas fa-plus fa-x2" aria-hidden="true"></span>`;
            document.getElementById('changeAnswers').prepend(expand_collapse);
            expand_collapse.addEventListener('click', function (e) {
                expando();
            });
        }

        document.querySelector('#changeAnswers dl').classList.add('hidden');

    }
    else {
        if (document.querySelector('.btn-toggle')) document.querySelector('.btn-toggle').remove();
        document.querySelector('#changeAnswers dl').classList.remove('hidden');
    }
}

window.onresize = function (event) {
    expandSection();
};

function expando() {
    let div = document.getElementById('changeAnswers');
    let btn = div.querySelector('button');

    if (btn.classList.contains('btn-collapse')) {
        div.querySelector('dl').classList.add('hidden');
        btn.classList.add('btn-expand');
        btn.classList.remove('btn-collapse');
        btn.querySelector('span').classList.remove('fa-minus');
        btn.querySelector('span').classList.add('fa-plus');
    }
    else {
        div.querySelector('dl').classList.remove('hidden');
        btn.classList.add('btn-collapse');
        btn.classList.remove('btn-expand');
        btn.querySelector('span').classList.add('fa-minus');
        btn.querySelector('span').classList.remove('fa-plus');
    }
}


btnPrevious.onclick = function () {
    previous();
}
btnReset.onclick = function () {
    previous(userAnswers[0].getAttribute('id'));
}

function previous(changeAnswer) {
    // revalidated the form and clear and empty the error if there was one; clear the "change answer" section
    var validator = $(form).validate();
    validator.resetForm();
    if (document.getElementById('errors-' + form.getAttribute('id'))) document.getElementById('errors-' + form.getAttribute('id')).remove();
    document.getElementById('changeAnswers').innerHTML = "";

    // get previous question, using array if previous click or change answer option
    let previousQuestion = changeAnswer ? document.getElementById(changeAnswer) : userAnswers[userAnswers.length - 1];
    document.querySelector('#changeAnswers').classList.add('hidden');
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

    toolContainer.classList.remove('results');
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
    btnReset.classList.add('hidden');
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
