// Prevent form submission
const form = document.getElementById('find-out-form');
form.onsubmit = e => e.preventDefault();

// DOM elements
const toolContainer = document.querySelector('.tool-container');
const btnNext = document.getElementById('btn-next');
const btnPrevious = document.getElementById('btn-previous');
const btnReset = document.getElementById('btn-reset');
const btnChange = document.getElementById('btn-change');
const changeAnswersContainer = document.getElementById('changeAnswers');
const lbBtn = document.getElementById('lb-dropdown-inpt');

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
let traveller_type, purpose_of_travel, method_of_travel, passport_code, uspr, nonimmigrant_visa, travel_document = false;
let passportCodeSelectionParent = document.getElementById('passport-code-selection');
let passportCodeSelection = document.getElementById('passport-selection');
let passportCodeTable = document.getElementById('passport-code');
let travel_document_israel_answer;
let travel_document_romania_answer;
let travel_document_taiwan_answer;

// Fetch JSON data
(async function fetchData() {
    const response = await fetch('visas-david-copy.json');
    data = await response.json();
})();

$(document).on("wb-ready.wb", function (event) {

    btnNext.addEventListener("click", handleNextClick);
    btnPrevious.addEventListener("click", () => handlePreviousClick(false));
    btnReset.addEventListener("click", () => handlePreviousClick(userAnswers[0]?.id));


    let firstclick = true;



    // On Next button click
    function handleNextClick() {

        if (firstclick) {
            document.querySelectorAll("a:has(span.glyphicon-new-window)").forEach(element => {
                element.setAttribute('target', '_blank');
            });
            firstclick = false;
        }

        if (currentQuestion.id === "question-travel_document_israel") {
            travel_document_israel_answer = selectedInput; // "yes" or "no"
        }
        if (currentQuestion.id === "question-travel_document_romania") {
            travel_document_romania_answer = selectedInput;
        }
        if (currentQuestion.id === "question-travel_document_taiwan") {
            travel_document_taiwan_answer = selectedInput;
        }
        document.querySelector('.legal-disclaimer details').removeAttribute('open');

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
                traveller_type = data["question-passport_code"][passportCodeSelection.getAttribute('data-passport-code')]?.[method_of_travel]?.[purpose_of_travel] || data["question-passport_code"][passportCodeSelection.getAttribute('data-passport-code')];
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

                "question-travel": () => {
                    method_of_travel = selectedInput;
                    return data[question];
                },
                "question-canadian_citizen": () => {
                    traveller_type = selectedInput;
                    return data[question]?.[method_of_travel]?.[selectedInput];
                },
                "question-purpose_of_travel": () => {
                    purpose_of_travel = selectedInput;
                    return data[question]?.[selectedInput];
                },
                "question-uspr": () => {
                    uspr = selectedInput;
                    return data[question]?.[method_of_travel]?.[purpose_of_travel]?.[traveller_type]?.[selectedInput] || data[question]?.[method_of_travel]?.[purpose_of_travel]?.[passport_code]?.[selectedInput] || data[question]?.[method_of_travel]?.[purpose_of_travel]?.[passport_code];
                },
                "question-travel_document": () => {
                    traveller_type = selectedInput;
                    return data[question]?.[method_of_travel]?.[selectedInput];
                },
                "question-passport_code": () => {
                    passport_code = selectedInput;
                    return data["function-handlePassportCode"][purpose_of_travel]?.[method_of_travel]?.[passport_code];
                },
                "question-family": () => {
                    purpose_of_travel = selectedInput;
                    return data[question];
                },
                "question-study": () => getNextForStudyOrWork(),
                "question-work": () => getNextForStudyOrWork(),
                "question-study-vi-march2024": () => {
                    console.log("Handler called for question-study-vi-march2024");
                    console.log("passport_code:", passport_code);
                    console.log("method_of_travel:", method_of_travel);
                    console.log("uspr:", uspr);
                    console.log("selectedInput:", selectedInput);
                    
                    const usprKey = uspr === "yes_uspr" ? "yes_uspr" : "no_uspr";
                    const result = data[question]?.[passport_code]?.[method_of_travel]?.[usprKey]?.[selectedInput];
                    
                    console.log("usprKey:", usprKey);
                    console.log("Looking for path:", `${question} -> ${passport_code} -> ${method_of_travel} -> ${usprKey} -> ${selectedInput}`);
                    console.log("Result:", result);
                    
                    return result;
                },
                
                "question-work-vi-march2024": () => {
                    const usprKey = uspr === "yes_uspr" ? "yes_uspr" : "no_uspr";
                    return data[question]?.[passport_code]?.[method_of_travel]?.[usprKey]?.[selectedInput];
                },
                            "question-transit": () => {
                    return data[question][method_of_travel][traveller_type][selectedInput];
                },
                "question-transit": () => {
                    return data[question][method_of_travel][traveller_type][selectedInput];
                },
                "question-transit_length": () => data[question][traveller_type][selectedInput],
                "question-nonimmigrant_visa": () => {
                    nonimmigrant_visa = selectedInput;
                    return data[question]?.[passport_code]?.[purpose_of_travel]?.[selectedInput];
                },
                "question-travel_document_israel": () => handleTravelDocument(),
                "question-travel_document_romania": () => handleTravelDocument(),
                "question-travel_document_taiwan": () => handleTravelDocument()
            };
            
                 console.log("Question for handler lookup:", question);
                 console.log("Handler exists:", !!questionHandlers[question]);
            // ** Helper functions **

            const getNextForStudyOrWork = () => {
                // Use this constant to DRY up code:
                let base = data[question]?.[method_of_travel]?.[traveller_type];
                let answer; // Will store the result string

                if (traveller_type === "israel") {
                    // Exception: Must use the Israel passport answer for next key
                    answer = base?.[uspr]?.[travel_document_israel_answer]?.[selectedInput];
                } else if (traveller_type === "romania") {
                    answer = base?.[uspr]?.[travel_document_romania_answer]?.[selectedInput];
                } else if (traveller_type === "taiwan") {
                    answer = base?.[uspr]?.[travel_document_taiwan_answer]?.[selectedInput];
                } else {
                    // Regular countries (no extra nesting)
                    answer = base?.[uspr]?.[selectedInput] 
                        || base?.[uspr]                 // sometimes study flows straight to string result here
                        || base?.[selectedInput] 
                        || base;
                }

                if (typeof answer !== "string") {
                    // Defensive logging
                    console.error("Failed to resolve branch in getNextForStudyOrWork", {
                        question, method_of_travel, traveller_type, uspr, selectedInput,
                        travel_document_israel_answer, travel_document_romania_answer, travel_document_taiwan_answer,
                        answer
                    });
                    return undefined;
                }
                return answer;
            };

            const handleTravelDocument = () => {
                travel_document = selectedInput;
                return data[question]?.[purpose_of_travel]?.[method_of_travel]?.[selectedInput] || data[question]?.[purpose_of_travel]?.[method_of_travel] || data[question]?.[purpose_of_travel];
            };

            // ** Main Logic to get the next question **
            const nextQuestionId = questionHandlers[question] ? questionHandlers[question]() : (data[question][traveller_type][selectedInput] || data[question][traveller_type]);
            const nextQuestion = document.getElementById(nextQuestionId);



            console.log("___");
            console.log(traveller_type);
            console.log(purpose_of_travel);
            console.log(method_of_travel);
            console.log(nextQuestionId);
            console.log(nextQuestion.id);


            userAnswers.push(currentQuestion);

            // button control
            btnPrevious.classList.remove('hidden');
            btnReset.classList.toggle('hidden', nextQuestion.id.includes('question'));
            btnChange.classList.toggle('hidden', nextQuestion.id.includes('question'));
            btnNext.classList.toggle('hidden', nextQuestion.id.includes('result'));

            currentQuestion.classList.add('hidden');
            nextQuestion.classList.remove('hidden');

            toolContainer.classList.toggle('results', nextQuestion.id.includes('result'));
            if (nextQuestion.id.includes('result')) {

                let changeAnswersDL = document.createElement("dl");
                changeAnswersDL.classList.add('small', 'mrgn-tp-lg', 'change-answers', 'dl-horizontal');
                for (let i = 0; i < userAnswers.length; i++) {
                    let changeAnswersDT = document.createElement('dt');
                    changeAnswersDT.innerHTML = `<b>${userAnswers[i].querySelector('legend').innerText}</b>`;

                    let changeAnswersDD = document.createElement('dd');
                    changeAnswersDD.classList.add("d-flex", "align-items-center");
                    changeAnswersDD.innerHTML = userAnswers[i].id === "question-passport_code" ? `<span>${userAnswers[i].querySelector('#passport-selection').innerText}</span>` : `<span>${userAnswers[i].querySelector('input:checked').parentElement.innerText}</span>`;

                    let changeAnswersLink = document.createElement('button');
                    changeAnswersLink.classList.add('btn-change-answer', 'mrgn-lft-md', 'btn-link', 'pull-right');
                    changeAnswersLink.innerHTML = `Change <span class="wb-inv">answer for "${changeAnswersDT.innerText}"</span>`;
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


            }
            nextQuestion.focus();
            analytics();
        }
    };

    function expando() {

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

    function handlePreviousClick(changeAnswer) {

        var validator = $(form).validate();
        validator.resetForm();
        if (document.getElementById('errors-' + form.id)) document.getElementById('errors-' + form.id).remove();
        if (changeAnswersContainer.querySelector('dl')) {
            changeAnswersContainer.classList.add('hidden');
            changeAnswersContainer.classList.remove('visible');
            changeAnswersContainer.querySelector('dl').remove();
        }

        // get previous question, using array if previous click or change answer option
        let previousQuestion = changeAnswer ? document.getElementById(changeAnswer) : userAnswers[userAnswers.length - 1];

        // get what's on screen, either a question or a result and hide it. If it's a question, remove the required attribute to prevent a form error.
        let currentQuestion = document.querySelector('.question:not(.hidden)') ? document.querySelector('.question:not(.hidden)') : document.querySelector('.result:not(.hidden)');
        currentQuestion.classList.add('hidden');
        if (currentQuestion.querySelector('input')) currentQuestion.querySelector('input').removeAttribute('required');

        toolContainer.classList.remove('results');
        previousQuestion.classList.remove('hidden');

        if (changeAnswer) {
            let x = userAnswers.indexOf(previousQuestion);
            userAnswers = userAnswers.slice(0, x);
            if (!userAnswers.includes(document.getElementById("question-passport_code"))) {
                // traveller_type = "unknown";
            }
        }
        else {
            userAnswers.pop();
            if (!userAnswers.includes(document.getElementById("question-passport_code"))) {
                // traveller_type = "unknown";
            }
        }





        btnPrevious.classList.toggle('hidden', userAnswers.length === 0);
        btnNext.classList.remove('hidden');
        btnReset.classList.add('hidden');
        btnChange.classList.add('hidden');
        analytics();

    }

    analytics();

    function analytics() {
        let currentQuestion = document.querySelector('.question:not(.hidden)') || document.querySelector('.result:not(.hidden)');
        let attributeNext = btnNext.dataset.gcAnalyticsCustomclick.split("__")[0];
        let attributePrevious = btnPrevious.dataset.gcAnalyticsCustomclick.split("__")[0];

        btnNext.dataset.gcAnalyticsCustomclick = btnNext.dataset.gcAnalyticsCustomclick.split("__")[0] + "__" + currentQuestion.id;
        btnPrevious.dataset.gcAnalyticsCustomclick = btnPrevious.dataset.gcAnalyticsCustomclick.split("__")[0] + "__" + currentQuestion.id;

    }


    $("#passport-selection-change").on("click", function () {

        document.getElementById('lb-dropdown-inpt').innerHTML = "Make a selection...";
        document.getElementById('passport-code-selection').classList.add('hidden');

    });

    // Testing analytics
    $("[data-gc-analytics-customclick]").on("click", function () {
        // console.log($(this).attr("data-gc-analytics-customclick"));
    });

});
$(".wb-tables").on("wb-ready.wb-tables", function (event) {
    document.querySelectorAll(".sorting-icons").forEach(element => {
        // element.innerHTML += `<span class="fa-solid fa-sort pull-left pt-sm-1 text-primary"></span>`;
    });


});

let lbSelect = document.getElementById('ss_elem_list');
let lbOptions = lbSelect.getElementsByTagName('li');

Array.prototype.forEach.call(lbSelect.children, child => {
    child.addEventListener("click", function () {
        code = child.id;
        traveller_type = data["question-passport_code"]?.[code]?.[method_of_travel]?.[purpose_of_travel] || data["question-passport_code"]?.[code];


        // traveller_type = data["question-passport_code"][code].trim();



        document.getElementById('passport-selection-track').value = traveller_type;

        passportCodeSelection.innerHTML = child.innerHTML;
        document.getElementById('lb-dropdown-inpt').innerHTML = child.innerHTML;
        passportCodeSelection.setAttribute('data-passport-code', code);
        passportCodeSelectionParent.classList.remove('hidden');
        $("td.active").removeClass('active');
        this.parentElement.classList.add('active');

        passportCodeSelectionParent.querySelector("p").focus();
        document.getElementById("listbox").classList.add("hidden");
        lbBtn.classList.toggle("opened");
    })
});


lbBtn.onclick = function () {
    if (!lbBtn.classList.contains("opened")) {
        document.getElementById('lb-filter').value = "";
        filterFunction();
    }

    lbBtn.classList.toggle("opened");
    openDropdown();
}

function openDropdown() {
    document.getElementById("listbox").classList.toggle("hidden");
    for (let i = 0; i < lbOptions.length; i++) {
        lbOptions[i].removeAttribute('aria-selected');
        lbOptions[i].classList.remove('focused');
    }
    lbSelect.focus();
}

function filterFunction() {
    const input = document.getElementById("lb-filter");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("listbox");
    const a = div.getElementsByTagName("li");
    for (let i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (a[i].value != "lb-filter-li") {
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }
}