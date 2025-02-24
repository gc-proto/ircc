document.getElementById('find-out-form').onsubmit = function (e) { e.preventDefault() };

let data, data_reset;
let btnNext = document.getElementById("btn-next");
let btnPrevious = document.getElementById("btn-previous");
let userAnswers = [];
let jsonString = "";
let jsonPath = "";

getJSON();

async function getJSON() {
    const requestURL =
        "flatlogic-v5.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonData = await response.json();
    Object.entries(jsonData).forEach(([key, value]) => {
        // console.log(`${key}: ${value}, ${typeof value}`);
    });
    // console.log(jsonData)
    data = jsonData;
    jsonPath = data;
    data_reset = jsonData;
}

btnNext.onclick = function () {
    let currentQuestion = document.querySelector('.question:not(.hidden)');
    let selectedInput = currentQuestion.querySelector('input:checked').value;

    // Log user selection
    console.log("Selected Input: ", selectedInput);

    // Move the current question to the stack of answered questions
    currentQuestion.classList.add('hidden');
    userAnswers.push(selectedInput);

    // Traverse the JSON path dynamically
    jsonPath = getNextQuestionOrResult(jsonPath, selectedInput);

    console.log("Updated jsonPath: ", jsonPath);
};

function getNextQuestionOrResult(currentPath, selectedValue) {
    let nextStep = currentPath[selectedValue];
    console.log(currentPath);
    console.log(selectedValue);
    console.log(nextStep);

    if (typeof nextStep === 'string') {
        // It's a result; display the result
        document.getElementById(nextStep).classList.remove('hidden');
        console.log("Result reached: ", nextStep);
    } else if (typeof nextStep === 'object') {
        // It's a nested object; determine if it contains sub-questions
        let nextKeys = Object.keys(nextStep);

        if (nextKeys.length === 1) {
            // Single next question
            let nextQuestionKey = nextKeys[0];
            document.getElementById(`question-${nextQuestionKey}`).classList.remove('hidden');
            return nextStep;
        } else {
            // Multiple sub-questions; handle dynamically
            console.log("Nested structure: ", nextStep);
            Object.keys(nextStep).forEach(key => {
                if (document.getElementById(`question-${key}`)) {
                    document.getElementById(`question-${key}`).classList.remove('hidden');
                }
            });
            return nextStep;
        }
    } else {
        console.error("Invalid structure or undefined value in JSON path");
    }

    return currentPath; // Fallback to the current path if no changes
}