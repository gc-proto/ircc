document.getElementById('find-out-form').onsubmit = function (e) { e.preventDefault() };
console.log(data);

let btnNext = document.getElementById("btn-next");
let btnPrevious = document.getElementById("btn-previous");
let userAnswers = [document.querySelector('.question:not(.hidden)')];
userAnswers

let traveller, purpose, countryType;


btnNext.onclick = function () {
    let currentQuestion = document.querySelector('.question:not(.hidden)');
    let selectedInput = currentQuestion.querySelector('input:checked').value;
    let questionId = currentQuestion.querySelector('input:checked').getAttribute('name');
    let json;
    let next;

    btnPrevious.classList.remove('hidden');

    console.log(questionId)
    switch (questionId) {
        case "traveller_type":
            traveller = selectedInput;
            next = data.traveller_type[traveller];
            break;
        case "purpose_of_travel":
            purpose = selectedInput;
            next = data.purpose_of_travel[purpose][traveller];
            switch (purpose) {
                case "tourist":
                case "transit":
                case "business":
                case "family":
                case "study":
                    if (traveller === "us_citizen" || traveller === "usa") {
                        next = "question-study";
                        document.getElementById("study-extend_permit").parentElement.classList.add('hidden');
                    }
                    break;
                case "work":
                    if (traveller === "us_citizen" || traveller === "usa") {
                        next = "question-work";
                        document.getElementById("work-extend_permit").parentElement.classList.add('hidden');
                    }
                    break;
                default:
                    break;
            }
            break;
        case "study":            
            next = data.purpose_of_travel[purpose][traveller][selectedInput];
        default:
            break;
    }
    console.log("selectedInput", selectedInput);
    console.log("next", next);
    console.log("userAnswers", userAnswers);

    userAnswers.push(currentQuestion);
    currentQuestion.classList.add('hidden');
    document.getElementById(next).classList.remove('hidden');


}



btnPrevious.onclick = function () {
    let currentQuestion = document.querySelector('.question:not(.hidden)');
    let checked = currentQuestion.querySelector('input:checked') ? currentQuestion.querySelector('input:checked').checked = false : null;
    currentQuestion.classList.add('hidden');
    userAnswers.pop();
    userAnswers[userAnswers.length-1].classList.remove("hidden");

    if (userAnswers.length === 1) {
        btnPrevious.classList.add('hidden');
    }
}