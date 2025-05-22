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
    console.log("=======================");
    let currentQuestion = document.querySelector('.question:not(.hidden)');
    let selectedInput = currentQuestion.querySelector('input:checked').value;
    let questionId = currentQuestion.querySelector('input:checked').getAttribute('name');
    console.log("selectedInput: ", selectedInput);
    console.log("questionId: ", questionId);
    console.log("jsonPath: ", jsonPath);

    

    currentQuestion.classList.add('hidden');
    userAnswers.push(currentQuestion);
    if (typeof jsonPath[selectedInput] === "object") {
        console.log("next question");
        if (Object.entries(jsonPath[selectedInput]).length === 1) {
            Object.entries(jsonPath[selectedInput]).forEach(([key, value]) => {
                document.getElementById(`question-${key}`).classList.remove('hidden');
                jsonString += `"${selectedInput}": "${key}"`
            });
        }
        else {
            console.log("sub question");
            Object.entries(jsonPath[selectedInput]).forEach(([key, value]) => {
                console.log(key, value);
                if (key === selectedInput) {
                    // document.getElementById(`question-${selectedInput}`).classList.remove('hidden');                    
                    jsonString += `"${selectedInput}":"${key}"`
                }
            });
        }
    }
    else {
        console.log("result");
        document.getElementById(jsonPath[selectedInput]).classList.remove('hidden');
        jsonString += `"${selectedInput}"`
    }

    console.log("jsonString: ", jsonString);
    jsonPath = JSON.stringify(`${jsonString}`);
    jsonPath = JSON.parse(`{${jsonString}}`);
    console.log("jsonPath: ", jsonPath);

    console.log("data: ", data);
    console.log("userAnswers: ", userAnswers);
};
