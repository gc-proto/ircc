document.getElementById('find-out-form').onsubmit = (e) => e.preventDefault();

let clear = false;
let data;
const toolContainer = document.querySelector(".tool-container");
const btnNext = document.getElementById("btn-next");
const btnPrevious = document.getElementById("btn-previous");
const btnReset = document.getElementById("btn-reset");
const form = document.getElementById("find-out-form");
const changeAnswersDiv = document.getElementById('changeAnswers');
let userAnswers = [];

const doclang = document.documentElement.lang === "en" ? "en" : "fr";
const langSettings = {
    en: {
        errorMessageDiv: `<section id="errors-${form.id}" class="alert alert-danger" tabindex="-1"><h2>The form could not be submitted because 1 error was found.</h2><ul><li><a href="#passport_code_table"><span class="prefix">Error&nbsp;1: </span>This field is required.</a></li></ul></section>`,
        errorMessageH2: `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Error&nbsp;1: </span>This field is required.</span></strong>`
    },
    fr: {
        errorMessageDiv: `<section id="errors-${form.id}" class="alert alert-danger" tabindex="-1"><h2>Le formulaire n'a pu être soumis car 1 erreur a été trouvée.</h2><ul><li><a href="#q1-item-0"><span class="prefix">Erreur&nbsp;1&nbsp;: </span>Ce champ est obligatoire.</a></li></ul></section>`,
        errorMessageH2: `<strong id="passport_code_table-error" class="error"><span class="label label-danger"><span class="prefix">Erreur&nbsp;1&nbsp;: </span>Ce champ est obligatoire.</span></strong>`
    }
};

let traveller_type, purpose_of_travel, travel_type;
let passport_type = false;

async function getJSON() {
    const response = await fetch("visas.json");
    data = await response.json();
}
getJSON();

btnNext.addEventListener("click", handleNextClick);
btnPrevious.addEventListener("click", previous);
btnReset.addEventListener("click", () => previous(userAnswers[0]?.id));

function handleNextClick() {
    if (clear) console.clear();

    const currentQuestion = document.querySelector(".question:not(.hidden)");
    if (!validateSelection(currentQuestion)) return;

    const selectedInput = getSelectedInput(currentQuestion);
    const nextQuestionId = determineNextQuestion(currentQuestion.id, selectedInput);
    const next = document.getElementById(nextQuestionId);

    if (!next) return;

    console.log({ currentQuestion: currentQuestion.id, selectedInput, traveller_type, purpose_of_travel, next: next.id });
    
    userAnswers.push(currentQuestion);
    updateUI(currentQuestion, next);
}

function validateSelection(currentQuestion) {
    if (currentQuestion.querySelector("input") && !currentQuestion.querySelector("input:checked")) {
        $(form).validate().valid();
        return false;
    }
    return true;
}

function getSelectedInput(currentQuestion) {
    return currentQuestion.querySelector("input:checked")?.value;
}

function determineNextQuestion(question, selectedInput) {
    const handlers = {
        "question-traveller_type": () => {
            traveller_type = selectedInput;
            return data[question][selectedInput];
        },
        "question-purpose_of_travel": () => {
            purpose_of_travel = selectedInput;
            return data[question][traveller_type][selectedInput];
        },
        "question-travel": () => {
            travel_type = selectedInput;
            return data[question][purpose_of_travel][traveller_type]?.[selectedInput] || data[question][purpose_of_travel];
        }
    };
    return handlers[question]?.() || data[question][traveller_type][selectedInput] || data[question][traveller_type];
}

function updateUI(currentQuestion, next) {
    btnPrevious.classList.remove("hidden");
    toolContainer.classList.toggle("results", !next.id.includes("question"));
    btnNext.classList.toggle("hidden", !next.id.includes("question"));
    btnReset.classList.toggle("hidden", next.id.includes("question"));
    
    currentQuestion.classList.add("hidden");
    next.classList.remove("hidden");
    next.focus();
    toolContainer.scrollIntoView({ block: "start" });
}

function previous(changeAnswer = null) {
    let previousQuestion = changeAnswer ? document.getElementById(changeAnswer) : userAnswers.pop();
    if (!previousQuestion) return;
    
    document.querySelector(".question:not(.hidden), .result:not(.hidden)")?.classList.add("hidden");
    previousQuestion.classList.remove("hidden");

    toolContainer.classList.remove("results");
    btnNext.classList.remove("hidden");
    btnReset.classList.add("hidden");

    if (!userAnswers.length) btnPrevious.classList.add("hidden");
    toolContainer.scrollIntoView({ block: "start" });
}

$("button.passport-code").on("click", function () {
    const code = $(this).data("passport-code");
    traveller_type = data["question-passport_code"][code].trim();
    document.getElementById("passport-selection").textContent =
        `${$(this).text()} (${$(`[data-passport-code='${code}']`).eq(1).text()})`;
    document.getElementById("passport-selection").dataset.passportCode = code.trim();
    $("#passport-code").addClass("hidden");
    $("#passport-code-selection").removeClass("hidden");
});

$("#passport-selection-change").on("click", function () {
    $("#passport-code").removeClass("hidden");
    $("#passport-code-selection").addClass("hidden");
});
