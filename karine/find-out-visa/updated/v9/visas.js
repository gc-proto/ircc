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
let traveller_type, purpose_of_travel, method_of_travel, passport_type = false;
let passportCodeSelectionParent = document.getElementById('passport-code-selection');
let passportCodeSelection = document.getElementById('passport-selection');
let passportCodeTable = document.getElementById('passport-code');

// Fetch JSON data
(async function fetchData() {
    const response = await fetch('visas.json');
    data = await response.json();
})();

btnNext.addEventListener("click", handleNextClick);
btnPrevious.addEventListener("click", () => handlePreviousClick(false));
btnReset.addEventListener("click", () => handlePreviousClick(userAnswers[0]?.id));






// On Next button click
function handleNextClick() {

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
            "question-canadian_citizen": () => {
                traveller_type = selectedInput;
                return data[question][selectedInput];
            },
            "question-traveller_type": () => {
                traveller_type = selectedInput;
                return data[question];
            },
            "question-purpose_of_travel": () => {
                purpose_of_travel = selectedInput;
                return data[question][traveller_type][purpose_of_travel];
            },
            "question-travel": () => {
                console.log(selectedInput);
                method_of_travel = selectedInput;
                return data[question][purpose_of_travel];
            },
            "question-travel_document": () => {
                //traveller_type = selectedInput;
                // return traveller_type === "passport"
                //     ? data[question][traveller_type]
                //     : data[question][traveller_type][purpose_of_travel][method_of_travel];

                return data[question]?.[traveller_type]?.[selectedInput]?.[purpose_of_travel]?.[method_of_travel] ||
                    data[question]?.[traveller_type]?.[selectedInput] ||
                    data[question]?.[traveller_type]?.[purpose_of_travel];

            },
            "question-passport_code": () => {
                passport_type = selectedInput
                return data["function-handlePassportCode"][purpose_of_travel][method_of_travel][passport_type];
            },
            "question-family": () => {
                purpose_of_travel = selectedInput;
                return data[question][purpose_of_travel][traveller_type];
            },
            "question-study": () => getNextForStudyOrWork(),
            "question-work": () => getNextForStudyOrWork(),
            "question-transit": () => {
                return ["eTA-X", "eTA-X-TWOV", "mexico"].includes(traveller_type)
                    ? data[question][traveller_type][method_of_travel][selectedInput]
                    : data[question][traveller_type][selectedInput];
            },
            "question-transit_length": () => data[question][traveller_type][selectedInput],
            "question-nonimmigrant_visa": () => {
                passport_type = selectedInput === "yes"
                return data[question]?.[traveller_type]?.[purpose_of_travel]?.[method_of_travel]?.[selectedInput] || data[question]?.[traveller_type]?.[purpose_of_travel]?.[method_of_travel] || data[question]?.[traveller_type]?.[purpose_of_travel]
            },
            "question-travel_document_israel": () => handleTravelDocument(),
            "question-travel_document_romania": () => handleTravelDocument(),
            "question-travel_document_taiwan": () => handleTravelDocument()
        };

        console.log(traveller_type);
        console.log(purpose_of_travel);
        console.log(method_of_travel);

        // ** Helper functions **

        const getNextForStudyOrWork = () => {
            return data[question]?.[traveller_type]?.[method_of_travel]?.[passport_type]?.[selectedInput] ||
                data[question]?.[traveller_type]?.[method_of_travel]?.[selectedInput] ||
                data[question]?.[traveller_type]?.[method_of_travel] ||
                data[question]?.[traveller_type]?.[selectedInput];
        };

        const handleTravelDocument = () => {
            passport_type = selectedInput === "yes";
            return data[question]?.[purpose_of_travel]?.[method_of_travel]?.[selectedInput] || data[question]?.[purpose_of_travel]?.[method_of_travel] || data[question]?.[purpose_of_travel];
        };

        // ** Main Logic to get the next question **
        const nextQuestionId = questionHandlers[question] ? questionHandlers[question]() : (data[question][traveller_type][selectedInput] || data[question][traveller_type]);

        const nextQuestion = document.getElementById(nextQuestionId);
        console.log(nextQuestion);


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
            expandSection();
        }
        nextQuestion.focus();
        analytics();
        // toolContainer.scrollIntoView({ block: "start" })
    }
};

function expandSection() {
    // let dl = changeAnswersContainer.querySelector('dl');
    // let btnToggle = document.querySelector('.btn-toggle');
    // if (window.innerWidth < 991) {


    //     if (btnToggle) { btnToggle.remove() }
    //     let expand_collapse = document.createElement('button');
    //     expand_collapse.classList.add('btn-expand', 'btn-toggle', 'pull-left', 'stretched-link');
    //     expand_collapse.innerHTML = `<span class="fas fa-plus fa-x2" aria-hidden="true"></span>`;
    //     changeAnswersContainer.querySelector('div').prepend(expand_collapse);
    //     expand_collapse.addEventListener('click', function (e) {
    //         expando(dl, btnToggle);
    //     });


    //     dl.classList.add('hidden');

    // }
    // else {
    //     if (btnToggle) btnToggle.remove();
    // }
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

function handlePreviousClick(changeAnswer) {

    // if (changeAnswer === "question-canadian_citizen") {
    //     document.querySelector('#intro').classList.remove('hidden');
    //     document.querySelector('.legal-disclaimer').classList.remove('hidden');
    // }
    // revalidated the form and clear and empty the error if there was one; clear the "change answer" section
    var validator = $(form).validate();
    validator.resetForm();
    if (document.getElementById('errors-' + form.id)) document.getElementById('errors-' + form.id).remove();
    if (changeAnswersContainer.querySelector('dl')) {
        changeAnswersContainer.classList.add('hidden');

        changeAnswersContainer.querySelector('dl').remove();
    }
    // changeAnswersContainer.innerHTML = "";

    // get previous question, using array if previous click or change answer option
    let previousQuestion = changeAnswer ? document.getElementById(changeAnswer) : userAnswers[userAnswers.length - 1];


    // get what's on screen, either a question or a result and hide it. If it's a question, remove the required attribute to prevent a form error.
    let currentQuestion = document.querySelector('.question:not(.hidden)') ? document.querySelector('.question:not(.hidden)') : document.querySelector('.result:not(.hidden)');
    currentQuestion.classList.add('hidden');
    if (currentQuestion.querySelector('input')) currentQuestion.querySelector('input').removeAttribute('required');

    // clear some of the variables that are question specific
    if (currentQuestion.id === 'question-passport_code' || currentQuestion.id === 'question-travel_document' && traveller_type != 'uspr') {
        traveller_type = "unknown";
        passport_type = false;
    }

    if (previousQuestion.id === "question-passport_code") {
        clearPassportTable();
    }


    toolContainer.classList.remove('results');
    previousQuestion.classList.remove('hidden');

    if (changeAnswer) {
        let x = userAnswers.indexOf(previousQuestion);
        userAnswers = userAnswers.slice(0, x);
        if (!userAnswers.includes(document.getElementById("question-passport_code"))) {
            traveller_type = "unknown";
            passport_type = false;
        }
    }
    else {
        userAnswers.pop();
    }




    btnPrevious.classList.toggle('hidden', userAnswers.length === 0);
    btnNext.classList.remove('hidden');
    btnReset.classList.add('hidden');
    btnChange.classList.add('hidden');
    // toolContainer.scrollIntoView({ block: "start" });
    analytics();

}

analytics();

function analytics() {
    let currentQuestion = document.querySelector('.question:not(.hidden)');
    let attributeNext = btnNext.dataset.gcAnalyticsCustomclick.split("__")[0];
    let attributePrevious = btnPrevious.dataset.gcAnalyticsCustomclick.split("__")[0];

    btnNext.dataset.gcAnalyticsCustomclick = btnNext.dataset.gcAnalyticsCustomclick.split("__")[0] + "__" + currentQuestion.id;
    btnPrevious.dataset.gcAnalyticsCustomclick = btnPrevious.dataset.gcAnalyticsCustomclick.split("__")[0] + "__" + currentQuestion.id;

}

// $("button.passport-code").on("click", function () {
//     let code = $(this).attr('data-passport-code');
//     traveller_type = data["question-passport_code"][code].trim();
//     document.getElementById('passport-selection-track').value = traveller_type;

//     passportCodeSelection.innerHTML = `${document.querySelector('[data-passport-code="' + code + '"]').innerHTML}`;
//     passportCodeSelection.setAttribute('data-passport-code', code.trim());
//     // passportCodeTable.classList.add('hidden');
//     passportCodeSelectionParent.classList.remove('hidden');
//     $("td.active").removeClass('active');
//     this.parentElement.classList.add('active');

//     if (window.innerWidth > 991) {
//         passportCodeSelectionParent.style.marginTop = document.querySelector('.top').clientHeight + "px";
//     }
//     else {
//         passportCodeSelectionParent.style.marginTop = "15px";
//         passportCodeSelectionParent.querySelector("p").scrollIntoView({ block: "start" });
//     }

//     passportCodeSelectionParent.querySelector("p").focus();

// });

$("#passport-selection-change").on("click", function () {

    document.getElementById('lb-dropdown-inpt').innerHTML = "Make a selection...";
    document.getElementById('passport-code-selection').classList.add('hidden');

});

// Testing analytics
$("[data-gc-analytics-customclick]").on("click", function () {
    console.log($(this).attr("data-gc-analytics-customclick"));
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
        traveller_type = data["question-passport_code"][code].trim();
        document.getElementById('passport-selection-track').value = traveller_type;

        passportCodeSelection.innerHTML = child.innerHTML;
        document.getElementById('lb-dropdown-inpt').innerHTML = child.innerHTML;
        passportCodeSelection.setAttribute('data-passport-code', code.trim());
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
