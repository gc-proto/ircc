// Prevent form submission
const form = document.getElementById('find-out-form');
form.onsubmit = e => e.preventDefault();

// DOM elements
const toolContainer = document.querySelector('.tool-container');
const btnNext = document.getElementById('btn-next');
const btnPrevious = document.getElementById('btn-previous');
const btnReset = document.getElementById('btn-reset');
const changeAnswersContainer = document.getElementById('changeAnswers');

// JSON data and user answers
let data;
let userAnswers = [];

// Language settings
let doclang = document.getElementsByTagName('html')[0].getAttribute('lang') == "en" ? "en" : "fr";
let langSettings = {
    en: {
        errorMessageDiv: `<section id="errors-${form.id}" class="alert alert-danger" tabindex="-1"><h2>The form could not be submitted because 1 error was found.</h2><ul><li><a href="#passport_code_table"><span class="prefix">Error&nbsp;1: </span>This field is required.</a></li></ul></section>`,
        errorMessageH2: `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Error&nbsp;1: </span>This field is required.</span></strong>`
    },
    fr: {
        errorMessageDiv: `<section id="errors-${form.id}" class="alert alert-danger" tabindex="-1"><h2>Le formulaire n'a pu être soumis car 1 erreur a été trouvée.</h2><ul><li><a href="#q1-item-0"><span class="prefix">Erreur&nbsp;1&nbsp;: </span>Ce champ est obligatoire.</a></li></ul></section>`,
        errorMessageH2: `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Erreur&nbsp;1&nbsp;: </span>Ce champ est obligatoire.</span></strong>`
    }
}

// Variables for travel data
let traveller_type, purpose_of_travel, travel_type, passport_type = false;
let passportCodeSelectionParent = document.getElementById('passport-code-selection');
let passportCodeSelection = document.getElementById('passport-selection');
let passportCodeTable = document.getElementById('passport-code');

// Fetch JSON data
(async function fetchData() {
    const response = await fetch('https://test.canada.ca/ircc/karine/find-out-visa/updated/v6.1/visas.json');
    data = await response.json();
})();

btnNext.addEventListener("click", handleNextClick);
btnPrevious.addEventListener("click", () => handlePreviousClick(false));
btnReset.addEventListener("click", () => handlePreviousClick(userAnswers[0]?.id));

// On Next button click
function handleNextClick() {

    //Get current question & if no selection was made, force form validation to show error. Else, if something was selected, continue with rest of script.
    let currentQuestion = document.querySelector('.question:not(.hidden)');

    if (currentQuestion.querySelector('input') && !currentQuestion.querySelector('input:checked')) {
        $(form).validate();
        $(form).valid();
    }
    if ((currentQuestion.id === "question-passport_code") && passportCodeSelectionParent.classList.contains('hidden')) {
        currentQuestion.insertAdjacentHTML('beforebegin', langSettings[doclang].errorMessageDiv)
        currentQuestion.querySelector('legend').insertAdjacentHTML('beforeend', langSettings[doclang].errorMessageH2);
        document.getElementById(`errors-${form.id}`).focus();
        return
    }
    else {
        if ((currentQuestion.id === "question-passport_code") && currentQuestion.querySelector(`#errors-${form.id}`)) {
            document.getElementById(`errors-${form.id}`).remove();
            document.getElementById('passport_code_table-error').remove();
        }

        // if user has previously went to the country table and made a selection, force variable assignment of type of traveller and selected input; else get the checked radio button.
        if (currentQuestion.querySelector('#passport-code-selection') && (!passportCodeSelectionParent.classList.contains('hidden'))) {
            traveller_type = (data["question-passport_code"][passportCodeSelection.getAttribute('data-passport-code')]).trim();
            selectedInput = traveller_type;
        }
        else {
            selectedInput = currentQuestion.querySelector('input:checked').value;
        }

        const question = currentQuestion.id;

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

        const nextQuestion = document.getElementById(nextQuestionId);

        
        
        userAnswers.push(currentQuestion);

        // button control
        btnPrevious.classList.remove('hidden');
        btnReset.classList.toggle('hidden', nextQuestion.id.includes('question'));
        btnNext.classList.toggle('hidden', nextQuestion.id.includes('result'));

        currentQuestion.classList.add('hidden');
        nextQuestion.classList.remove('hidden');  

        toolContainer.classList.toggle('results', nextQuestion.id.includes('result'));
        if (nextQuestion.id.includes('result')) {

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
                changeAnswersLink.setAttribute('data-change', `${userAnswers[i].id}`);
                changeAnswersLink.setAttribute('type', 'button');
                changeAnswersLink.setAttribute('data-gc-analytics-customclick', 'button');
                changeAnswersLink.addEventListener('click', function (e) {
                    handlePreviousClick(userAnswers[i].id)
                });

                changeAnswersDD.appendChild(changeAnswersLink);
                changeAnswersDL.append(changeAnswersDT, changeAnswersDD);
            }
            changeAnswersContainer.appendChild(changeAnswersDL);
            changeAnswersContainer.classList.remove('hidden');
            expandSection();
        }
        else {
            nextQuestion.focus();
        }
        analytics();
        toolContainer.scrollIntoView({ block: "start" })
    }
};

function expandSection() {
    let dl = changeAnswersContainer.querySelector('dl');
    let btnToggle = document.querySelector('.btn-toggle');
    if (window.innerWidth < 768) {
        
        
        if (!btnToggle) {
            let expand_collapse = document.createElement('button');
            expand_collapse.classList.add('btn-expand', 'btn-toggle', 'pull-left');
            expand_collapse.innerHTML = `<span class="fas fa-plus fa-x2" aria-hidden="true"></span>`;
            changeAnswersContainer.prepend(expand_collapse);
            expand_collapse.addEventListener('click', function (e) {
                expando(dl, btnToggle);
            });
        }

        dl.classList.add('hidden');

    }
    else {
        if (btnToggle) btnToggle.remove();
        dl.classList.remove('hidden');
    }
}

function expando() {
    // let div = changeAnswersContainer;
    // let btn = div.querySelector('button');

    let dl = changeAnswersContainer.querySelector('dl');
    let btnToggle = changeAnswersContainer.querySelector('.btn-toggle');
    let icon = btnToggle.querySelector('span');

    if (btnToggle.classList.contains('btn-collapse')) {
        dl.classList.add('hidden');
        btnToggle.classList.add('btn-expand');
        btnToggle.classList.remove('btn-collapse');
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
    else {
        dl.classList.remove('hidden');
        btnToggle.classList.add('btn-collapse');
        btnToggle.classList.remove('btn-expand');
        icon.classList.add('fa-minus');
        icon.classList.remove('fa-plus');
    }
}

window.onresize = function (event) {
    expandSection();
};

function handlePreviousClick(changeAnswer) {
    // revalidated the form and clear and empty the error if there was one; clear the "change answer" section
    var validator = $(form).validate();
    validator.resetForm();
    if (document.getElementById('errors-' + form.id)) document.getElementById('errors-' + form.id).remove();
    changeAnswersContainer.innerHTML = "";

    // get previous question, using array if previous click or change answer option
    let previousQuestion = changeAnswer ? document.getElementById(changeAnswer) : userAnswers[userAnswers.length - 1];
    changeAnswersContainer.classList.add('hidden');
    // get what's on screen, either a question or a result and hide it. If it's a question, remove the required attribute to prevent a form error.
    let currentQuestion = document.querySelector('.question:not(.hidden)') ? document.querySelector('.question:not(.hidden)') : document.querySelector('.result:not(.hidden)');
    currentQuestion.classList.add('hidden');
    if (currentQuestion.querySelector('input')) currentQuestion.querySelector('input').removeAttribute('required');

    // clear some of the variables that are question specific
    if (currentQuestion.id === 'question-passport_code' || currentQuestion.id === 'question-travel_document') {
        traveller_type = "unknown";
        passport_type = false;
        travel_type = false;
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
    
    btnPrevious.classList.toggle('hidden', userAnswers.length === 0);
    btnNext.classList.remove('hidden');
    btnReset.classList.add('hidden');
    toolContainer.scrollIntoView({ block: "start" });
    analytics();
    
}

analytics();

function analytics(){
    let currentQuestion = document.querySelector('.question:not(.hidden)');
    let attributeNext = btnNext.dataset.gcAnalyticsCustomclick.split("__")[0];
    let attributePrevious = btnPrevious.dataset.gcAnalyticsCustomclick.split("__")[0];

    btnNext.dataset.gcAnalyticsCustomclick = btnNext.dataset.gcAnalyticsCustomclick.split("__")[0] + "__" +  currentQuestion.id;
    btnPrevious.dataset.gcAnalyticsCustomclick = btnPrevious.dataset.gcAnalyticsCustomclick.split("__")[0] + "__" +  currentQuestion.id;

}

$("button.passport-code").on("click", function () {
    let code = $(this).attr('data-passport-code');
    traveller_type = data["question-passport_code"][code].trim();
    document.getElementById('passport-selection-track').value = traveller_type;

    passportCodeSelection.innerHTML = `${document.querySelector('[data-passport-code="' + code + '"]').innerHTML} (${document.querySelectorAll('[data-passport-code="' + code + '"]')[1].innerHTML})`;
    passportCodeSelection.setAttribute('data-passport-code', code.trim());
    // passportCodeTable.classList.add('hidden');
    passportCodeSelectionParent.classList.remove('hidden');
    $("tr.active").removeClass('active');
    this.parentElement.parentElement.classList.add('active');
    
    if (window.innerWidth > 991) {
        passportCodeSelectionParent.style.marginTop = document.querySelector('.top').clientHeight + "px";
    }
    else {
        passportCodeSelectionParent.querySelector("p").scrollIntoView({ block: "start" });
    }

    passportCodeSelectionParent.querySelector("p").focus();
    
});

$("#passport-selection-change").on("click", function () {
    // passportCodeTable.classList.remove('hidden');
    passportCodeSelectionParent.classList.add('hidden');
    $("tr.active").removeClass('active');
    
});


// Testing analytics
$("[data-gc-analytics-customclick]").on("click", function(){
    console.log($(this).attr("data-gc-analytics-customclick"));
});

$( ".wb-tables" ).on( "wb-ready.wb-tables", function( event ) {
    document.querySelectorAll(".sorting-icons").forEach(element => {
        element.innerHTML += `<span class="fa-solid fa-sort pull-left pt-sm-1 text-primary"></span>`;
    });    
});