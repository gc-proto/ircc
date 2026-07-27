//Last updated: 2022-06-17
$("document").ready(function () {

    // To make it easier to update for EN/FR, setting all content that would be called in the JS at teh top to easily toggle with depending on page language.
    let language = document.documentElement.lang;
    let languageSettings = {
        datalistValidationNote: {
            en: "Error: Please select your country using the list below.",
            fr: ""
        },
        changeBtnText: {
            en: "Change",
            fr: "Changer",
            subText: {
                en: "answer for",
                fr: "réponse pour"
            }
        }
    }

    // Global variable declarations

    let formID = document.getElementById('programFinderForm');
    let pageh1 = document.getElementById('resultHeading');
    let questionPath = new Array(); // Array, stores the flow of the questions. As in, in which order the cquestions showed up, so that when there’s what is av user clicks previous it follows same logical order
    let questions = document.getElementsByClassName("question"); //grabs all the questions on the page (divs with class question, wrapper/container for each of the questions)
    let currentQuestion, nextQuestion; // Setting as global variable since using it in multiple functions, will store the HTML element that is the current question on screen    

    let flows = [];

    let btnNext = document.getElementById('btnNext'),
        btnPrev = document.getElementById('btnPrev');

    let selectedContainer = document.getElementById('selectedAnswers');
    let sContainer;

    // Call the function to convert the list items into form elements.
    convertForm();

    // V6.4, params is only relevant for the share feature, where if the URL has a results query string, it skips the intro & questions and goes straight to the results.
    // The if statement shows/hides the corresponding elements.
    const urlParams = new URLSearchParams(window.location.search);
    const startoverquery = urlParams.get('reset');

    // Reset everything to starting position, from Q1
    if (startoverquery != null) { startQuestions() }
    //The params variable & IF statement aren't being used currently, but leaving for prosperity. If a user has a URL with results in the query string (ex.: a share URL), then hide the questions and show the corresponding results.
    let params = getUrlVars()["results"];
    if (params) {

        document.getElementById('intro').classList.add('hidden');
        document.getElementById('specialMeasures').classList.add('hidden');
        document.getElementById('resultHeadingContainer').classList.add('hidden');
        document.getElementById('program-finder').classList.remove('hidden');
        document.getElementById('toolWrapper').classList.remove('hidden');
        document.getElementById('sideImage').classList.remove('hidden');
        document.getElementById("wb-cont").scrollIntoView();

        //Gets the current question )question 1) 
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].classList.contains('hidden')) {
                currentQuestion = questions[i];
            } else {
                continue;
            }
        }

        currentQuestion.classList.add('hidden');
        btnNext.classList.add('hidden');
        btnPrev.classList.add('hidden');

        $(params).removeClass("hidden");
        // document.querySelectorAll('.btn-startOver').forEach(el => el.classList.remove('hidden'));


        //Start unhiding result content, and hiding question content
        document.getElementById('program-finder').classList.add('hidden');
        document.getElementById('allResults').classList.remove('hidden');

        document.querySelector('.allResults').classList.remove('hidden');
        document.querySelector('.cnt-selection').classList.remove('hidden');
        document.getElementById('sideImage').classList.add('hidden');


        updateHeading();


        shareURL = window.location.href;
    }

    // The HTML is based a lot on the field flow plugin (but not using it to avoid a lot of customization).
    // convertForm takes the basic HTML lists and transforms it into form elements.
    $('details.result').sort(function (a, b) {
        if (a.textContent.trim() < b.textContent.trim()) {
            return -1;
        } else {
            return 1;
        }
    }).appendTo('#resultsContainer');


    function convertForm() {
        let results = document.querySelectorAll('.result');

        // for every question...
        for (let i = 0; i < questions.length; i++) {
            //skip if it's a pseudo result
            if (questions[i].classList.contains('pseudoResult')) continue;


            let defaultSettings = '{"type": null, "flow": "null"}';
            //data-pf is basically like the fieldflow's data-wb-fieldflow
            // Get what was in the data-pf, the ID and the question text
            let questionSettings = questions[i].getAttribute('data-pf') ? JSON.parse(questions[i].getAttribute('data-pf')) : JSON.parse(defaultSettings);
            let questionID = questions[i].getAttribute('id');
            let questionHeader = questions[i].querySelector('.question-header') ? questions[i].querySelector('.question-header') : questions[i].getElementsByTagName('p')[0];

            //if the settings renders it as a datalist
            if ((questionSettings.type != null) && (questionSettings.type == "datalist")) {
                //create the elements
                let questionItemLabel = document.createElement('label');
                let questionItemInput = document.createElement('input');

                //put question (<p>) in the >label>
                questionItemLabel.innerHTML = questionHeader.innerHTML;

                // Create the div, question label, inputs and assign attributes
                let datalistWrapper = document.createElement('div');
                setAttributes(datalistWrapper, {
                    "class": "datalist-wrapper",
                    "aria-live": "polite"
                });
                setAttributes(questionItemLabel, {
                    "class": "field-name",
                    "for": questionID + "-input"
                });
                setAttributes(questionItemInput, {
                    "id": questionID + "-input",
                    "class": "datalist",
                    "list": questionID + "-list",
                    "placeholder": questionSettings.placeholder,
                    "autocomplete": "country-name",
                    "spellcheck": "true"
                });

                let questionItems = questions[i].querySelectorAll('li[data-pf]');
                let datalist = document.createElement("datalist");
                setAttributes(datalist, {
                    "id": questionID + "-list"
                });

                //the 'next' gets added to data-value attribute, value is the text inside of the LI 
                for (let j = 0; j < questionItems.length; j++) {
                    let dataValues = JSON.parse(questionItems[j].getAttribute('data-pf'));
                    let datalistOption = document.createElement("option");
                    setAttributes(datalistOption, {
                        "data-value": dataValues.next,
                        "value": questionItems[j].textContent
                    });
                    // add the <options> to the datalist
                    datalist.appendChild(datalistOption);
                }
                // add the datalist to the wrapper
                datalistWrapper.appendChild(questionItemInput);                
                datalistWrapper.innerHTML += "<span class=\"glyphicon glyphicon-search\"></span>";

                questions[i].innerHTML = questionItemLabel.outerHTML + datalistWrapper.outerHTML + datalist.outerHTML;
            } else {
                // for other questions, take the content and put it in a radio button, labels, legend and fieldset
                // this is roughly the same as the code aboce
                let fieldset = document.createElement('fieldset');
                fieldset.setAttribute('class', 'gc-chckbxrdio')
                let legend = document.createElement('legend');
                legend.innerHTML = questionHeader.innerHTML;

                if (questions[i].getElementsByTagName('p').length > 1) {
                    legend.classList.add('field-name');
                    legend.classList.add('pseudo');
                } else {
                    legend.classList.add('field-name');
                }

                fieldset.appendChild(legend);
                questionHeader.parentNode.replaceChild(fieldset, questionHeader);


                let questionItems = questions[i].querySelectorAll('li[data-pf]');
                let questionList = questionItems[0].parentElement;


                let radioGroup = document.createElement('div');
                radioGroup.classList.add('radio-group');


                for (let j = 0; j < questionItems.length; j++) {

                    questionItems[j].classList.add('radio');

                    let dataValues = JSON.parse(questionItems[j].getAttribute('data-pf'));

                    let questionItemLabel = document.createElement('label');
                    let questionItemInput = document.createElement('input');
                    let questionItemText = questionItems[j].innerHTML;

                    // data store is for when the question flow is not linear and you need to store a result to show up in the results page. Like francophone immigration for example. Depends on language question which is at the start of the flow but may not apply to other situations.

                    let dataStoreResult = dataValues.store != null ? dataValues.store : "";
                    let dataStoreFlow = dataValues.flow != null ? dataValues.flow : "";

                    // end flow = let script know that the flow is about to change. No longer relevant now that progress bar is gone.
                    // 2023-06 note: revisit, endflow can probably be removed but need to double check the code.
                    let dataEndFlow = dataValues.endFlow != null ? dataValues.endFlow : "";
                    if (dataStoreFlow != "") {
                        flows.push(dataStoreFlow);
                    }

                    setAttributes(questionItemLabel, {
                        "for": questionID + "-item" + "-" + j
                    });

                    if (j == 0) {
                        setAttributes(questionItemInput, {
                            "required": "required",
                        });
                    }

                    setAttributes(questionItemInput, {
                        "type": "radio",
                        "value": questionItems[j].innerHTML,
                        "name": questionID + "-item",
                        "id": questionID + "-item" + "-" + j,
                        "data-value": dataValues.next,
                        "data-store-result": dataStoreResult,
                        "data-store-flow": dataStoreFlow,
                        "data-end-flow": dataEndFlow
                    });


                    questionItemLabel.innerHTML += questionItemText;
                    questionItems[j].innerHTML = "";
                    questionItems[j].appendChild(questionItemInput);
                    questionItems[j].appendChild(questionItemLabel);
                }

                setAttributes(questionList, {
                    "class": "list-unstyled lst-spcd-2"
                });
                radioGroup.appendChild(questionList);
                fieldset.appendChild(radioGroup);
            }

            //populate an array of all the flows for the different questions.
            if (questionSettings.flow != null) {
                flows.push(questionSettings.flow);
            }

        }
    }


    //Start button, hide the introduction and show the tool
    document.getElementById('getStarted').onclick = function () {
        startQuestions();
    }
    function startQuestions() {
        document.getElementById('intro').classList.add('hidden');
        document.getElementById('resultHeadingContainer').classList.add('hidden');
        document.getElementById('specialMeasures').classList.add('hidden');
        document.getElementById('program-finder').classList.remove('hidden');
        document.getElementById('tool').classList.remove('hidden');
        document.getElementById('toolWrapper').classList.remove('hidden');
        document.getElementById('sideImage').classList.remove('hidden');
        document.getElementById('tool').querySelector('input').focus();
        currentQuestion = document.getElementById('q1');
    }


    //Next button
    btnNext.onclick = function () {
        //go through all of the questions in the HTML
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].classList.contains('hidden')) {
                //set the current question, the one that doesn't have a hidden class on it, then step out of the for loop
                currentQuestion = questions[i];
            } else { continue; }
        }
        //next question = the value/data-value of the radio button/datalist
        nextQuestion = checkInput("value");

        if (!nextQuestion) {
            //validate form if there's no next question
            $(formID).validate();
            $(formID).valid();
        }
        else {
            //if there is a next question, add current question to a questionPath array so we can track the user's selected answers
            if (questionPath.length === 0) questionPath.push(currentQuestion);
            let questionText = currentQuestion.querySelector('legend').textContent;
            let selectedDetails = document.createElement('div');
            let selected = currentQuestion.querySelector('input:checked');
            let answerText = selected.value;

            // if there isn't a "what you told us" container already created, then create it
            if (!sContainer) {  // selectedContainer
                selectedContainer.parentNode.replaceChild(selectedDetails, selectedContainer);
                selectedContainer = selectedDetails;
                setAttributes(selectedContainer, {
                    "id": "selectedAnswers",
                })
                sContainer = document.createElement('dl')
                setAttributes(sContainer, {
                    "class": "small"
                })
            }

            // Add the <dt>, <dd> elements for each question that has been answered, and append a "Change your answer" button. 
            let qContainer = document.createElement('dt');
            qContainer.innerHTML = questionText;
            let aContainer = document.createElement('dd');
            aContainer.innerHTML = "<span>" + answerText + "</span>";

            let changeQ = document.createElement('button');
            changeQ.innerHTML = languageSettings.changeBtnText[language] + '<span class="wb-inv">&nbsp;' + languageSettings.changeBtnText.subText[language] + '&nbsp;"' + questionText + '"</span>';

            setAttributes(changeQ, {
                "class": "btn btn-link btn-change",
                "role": "button",
                "data-question": questionPath[questionPath.length - 1].getAttribute('id'),
                "data-gc-analytics-customclick": "IRCC:PFChangeBtn:" + questionPath[questionPath.length - 1].getAttribute('id')
            });

            aContainer.appendChild(changeQ);
            sContainer.appendChild(qContainer);
            sContainer.appendChild(aContainer);

            // show results, if there's a # then it's going to a result, else another question
            if (nextQuestion.indexOf('#') >= 0) {
                // Add the current question to the array
                questionPath.push(currentQuestion); 
                // Hide it, and the next button
                currentQuestion.classList.add('hidden'); 
                btnNext.classList.add('hidden');

                // unhide the results (nextQuestion in this case is the results)
                $(nextQuestion).removeClass("hidden");

                // Start hiding/showing what you want to display for the reuslts screen
                document.querySelectorAll('.btn-startOver').forEach(el => el.classList.remove('hidden'));
                document.querySelectorAll('.btn-prev').forEach(el => el.classList.remove('hidden'));

                let radioButtons = formID.getElementsByTagName('input');
                //show all the stored results and add them to the resultTracker variable
                //resulttracker variable appends to a hidden form input and sends the chosen results to Adobe Analytics
                let resultTracker = "";
                for (let i = 0; i < radioButtons.length; i++) {
                    let storedResult = radioButtons[i].getAttribute('data-store-result');
                    if ((radioButtons[i].checked) && (storedResult != "")) {
                        if (storedResult.indexOf("#") > -1) {
                            $(storedResult).removeClass('hidden');
                        }
                        else {
                            if (document.getElementById(storedResult)) {
                                document.getElementById(storedResult).classList.remove('hidden');
                            }
                            else {
                                document.querySelectorAll('.result:not(.hidden)').forEach(el => el.querySelectorAll("." + storedResult).forEach(el2 => el2.classList.remove('hidden')));
                            }

                        }
                        resultTracker += storedResult;
                    }
                }
                document.getElementById('resultTracker').setAttribute('value', nextQuestion + "," + resultTracker);
                document.querySelectorAll('.result:not(.hidden)').forEach(elm => elm.classList.add('filtered'));

                //Submit the form, so that we can get the analytics tracking
                $(formID).submit();

                //Start unhiding result content, and hiding question content
                document.getElementById('program-finder').classList.add('hidden');
                document.getElementById('allResults').classList.remove('hidden');
                document.querySelector('.allResults').classList.remove('hidden');
                document.querySelector('.cnt-selection').classList.remove('hidden');
                document.getElementById('resultHeadingContainer').classList.remove('hidden');
                document.getElementById('sideImage').classList.add('hidden');
                document.getElementById('otherPrograms').classList.remove('hidden');

                updateHeading();

                selectedContainer.appendChild(sContainer);
                selectedContainer.classList.remove('hidden');

                //resetting style for image to overflow container
                document.getElementById('program-finder').style.overflow = "visible";

                // move the navigation buttons under different container
                document.querySelector('.cnt-button-move').appendChild(document.querySelector('.navigation-buttons'));
                document.getElementById('allResults').focus();

            }
            // go to next question
            else {
                //show/hide current question and next question
                document.querySelectorAll('.btn-startOver').forEach(el => el.classList.add('hidden')); //redundant
                nextQuestion = document.getElementById(nextQuestion);
                nextQuestion.classList.remove("hidden");
                currentQuestion.classList.add("hidden");
                document.getElementById('tool').classList.add('borders');

                //if it's a pseudo result, we hide the next button but we have to round the corners of the previous button
                if (nextQuestion.classList.contains('pseudoResult')) {
                    btnNext.classList.add('hidden');
                    btnPrev.classList.add('btnborders');
                }
                else {
                    btnNext.classList.remove('hidden');
                    btnPrev.classList.remove('btnborders');
                }

                //add next question to the question path array
                questionPath.push(nextQuestion);
                currentQuestion = nextQuestion;

                let dataPF = currentQuestion.getAttribute('data-pf') ? JSON.parse(currentQuestion.getAttribute('data-pf')) : JSON.parse('{"inherit":"null", "flow": ""}');

                //update the side image based on which flow the next question follows
                if (dataPF.flow) updateSideImage(dataPF.flow);
                else if (currentQuestion.getAttribute('id') == "q1") updateSideImage("default");
                btnPrev.classList.remove('hidden');
            }

            btnNext.blur();
            currentQuestion.querySelector('input').focus();
            btnPrev.classList.remove('hidden');
        }


    }

    // Change the layout on load, on resize; In medium view, results need to stack, and fix layout of the details element with flexbox
    $(window).on('resize', function () {
        adjustSelectedAnswersCnt();
    });
    adjustSelectedAnswersCnt();
    function adjustSelectedAnswersCnt() {

        let cnt = document.getElementById('resultHeadingContainer');
        let hdng = document.getElementById('resultHeading');
        let txt = document.getElementById('selectedAnswers');
        let details = document.createElement('details');
        let sum = document.createElement('summary');

        sum.setAttribute('class', 'flex-container');
        sum.innerHTML = '<span class="flex-item item1"></span><span class="flex-item item2">';

        if (($(window).width() < 975)) {
            if ((document.querySelectorAll('.mbl-details').length == 0)) {
                cnt.appendChild(details);
                details.appendChild(sum);
                sum.querySelector('.item2').appendChild(hdng);
                details.appendChild(txt);
                details.setAttribute('class', 'mbl-details mrgn-tp-0')
            }
        }
        else {
            cnt.appendChild(hdng);
            cnt.appendChild(txt);
            document.querySelectorAll('.mbl-details').forEach(el => el.remove());
        }
    }

    // If user changed a question in "What you told us" section, go back to the question they want to change
    $(document).on('click', '.btn-change', function () {
        let q = this.getAttribute('data-question');
        const ind = (element) => element.getAttribute('id') == q;

        questionPath.length = questionPath.findIndex(ind) + 1; // reset the array to last question modified
        for (var i = 0; i < questionPath.length; i++) {

            let option = questionPath[i].querySelector('input:checked');
            if (option) option.checked = false;
        }
        currentQuestion.classList.add('hidden');
        document.getElementById(q).classList.remove('hidden');

        // reset the "what you told us" section
        currentQuestion = document.getElementById(q);
        if (this.parentElement.nextElementSibling) {
            do {
                this.parentElement.nextElementSibling.remove();
            } while (this.parentElement.nextElementSibling)
        }
        this.parentElement.previousElementSibling.remove();
        this.parentElement.remove();

        // hide/show what's necessary
        document.querySelectorAll('details').forEach(el => el.removeAttribute('open'));
        document.querySelectorAll('.result').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.result').forEach(el => el.classList.remove('filtered'));
        document.getElementsByClassName('btn-navigation')[0].classList.add('hidden');
        document.querySelector('.cnt-button').appendChild(document.querySelector('.navigation-buttons'));
        btnNext.classList.remove('hidden');
        document.getElementById('program-finder').classList.remove('hidden');
        document.getElementById('otherPrograms').classList.add('hidden');
        document.querySelectorAll('.btn-startOver').forEach(el => el.classList.add('hidden'));

        document.getElementById('allResults').classList.add('hidden');
        document.querySelector('.allResults').classList.add('hidden');
        document.querySelector('.cnt-selection').classList.add('hidden');
        document.getElementById('resultHeadingContainer').classList.add('hidden');
        document.getElementById('sideImage').classList.remove('hidden');

        if (document.getElementById('flowText')) {
            document.getElementById('flowText').remove();
        }

        if (currentQuestion.getAttribute('id') == "q1") {
            btnPrev.classList.add('hidden');
            document.getElementById('tool').classList.remove('borders');
            selectedContainer.innerHTML = "";
            selectedContainer.classList.add('hidden');
        }

        btnPrev.classList.remove('btnborders');

        //update side image based on flow
        let dataPF = currentQuestion.getAttribute('data-pf') ? JSON.parse(currentQuestion.getAttribute('data-pf')) : JSON.parse('{"inherit":"null", "flow": "" }');
        if (dataPF.flow) updateSideImage(dataPF.flow);
        else if (currentQuestion.getAttribute('id') == "q1") updateSideImage("default");

        if (checkInput("type") === "btn") {
            btnNext.classList.add('hidden');
        }

    });

    // If click see all, then show all of the results.
    document.querySelector('.btn-see-all').onclick = function () {
        document.getElementById('resultsContainer').focus;
        document.getElementById('resultsContainer').scrollIntoView;
    }


    //reloads the page, ideally i'd like for it to reinitialize the tool without reloading but for now this owrks.
    document.querySelectorAll('.btnStartOver').forEach(function (item) {
        item.onclick = function () {
            // window.location = window.location.href.split("?")[0] + "?startOver";
            // alert(window.location);
            // location.reload();
            location.replace(window.location.pathname + "?reset");
        }
    });


    // goes back to previous question
    document.querySelectorAll('.btn-prev').forEach(function (item) {
        item.onclick = function () {
            //resetting the form in case there was a validation error and hit previous; need to call validate function first. Then remove error message element.
            var validator = $(formID).validate();
            validator.resetForm();
            if (document.getElementById('errors-programFinderForm')) document.getElementById('errors-programFinderForm').remove();

            selectedContainer.classList.add('hidden');
            if (sContainer != null) {
                sContainer.querySelector('dt:last-of-type').remove();
                sContainer.querySelector('dd:last-of-type').remove();
            }

            //start showing/hiding elements
            document.querySelectorAll('details').forEach(el => el.removeAttribute('open'));
            document.querySelectorAll('.result:not(.hidden)').forEach(elm => elm.classList.remove('filtered'));

            document.querySelector('.cnt-button').appendChild(document.querySelector('.navigation-buttons'));
            document.getElementById('program-finder').classList.remove('hidden');
            document.querySelectorAll('.result').forEach(el => el.classList.add('hidden'));
            document.getElementsByClassName('btn-navigation')[0].classList.add('hidden');


            document.querySelector('.btn-expand').classList.remove('hidden');
            document.querySelector('.btn-collapse').classList.add('hidden');

            btnNext.classList.remove('hidden');


            document.getElementById('otherPrograms').classList.add('hidden');
            document.querySelectorAll('.btn-startOver').forEach(el => el.classList.add('hidden'));

            document.getElementById('allResults').classList.add('hidden');

            document.querySelector('.allResults').classList.add('hidden');
            document.querySelector('.cnt-selection').classList.add('hidden');
            document.getElementById('resultHeadingContainer').classList.add('hidden');
            currentQuestion.classList.add("hidden"); //hide the current question
            document.getElementById('sideImage').classList.remove('hidden');
            document.getElementById('toolWrapper').classList.remove('print');

            if (document.getElementById('flowText')) {
                document.getElementById('flowText').remove();
            }

            //remove the question from the array, it is no longer in the flow of questions
            questionPath.pop();

            //get the previous question that was in the flow, and show it, removing the hidden class
            questionPath[questionPath.length - 1].classList.remove("hidden");
            //set the current question variable to the previous question
            currentQuestion = questionPath[questionPath.length - 1];
            if (currentQuestion.getAttribute('id') == "q1") {
                btnPrev.classList.add('hidden');
                document.getElementById('tool').classList.remove('borders');
                selectedContainer.innerHTML = "";
                selectedContainer.classList.add('hidden');
            }

            btnPrev.classList.remove('btnborders');

            checkInput("input").focus();
            //update side image based on flow
            let dataPF = currentQuestion.getAttribute('data-pf') ? JSON.parse(currentQuestion.getAttribute('data-pf')) : JSON.parse('{"inherit":"null", "flow": "" }');
            if (dataPF.flow) updateSideImage(dataPF.flow);
            else if (currentQuestion.getAttribute('id') == "q1") updateSideImage("default");

            if (checkInput("type") === "btn") {
                btnNext.classList.add('hidden');
            }
        }
    });


    //check the element's attribute, parameter dictates if it's input, flow, end, type, value
    function checkInput(dataToCheck) {
        let radioBtns = currentQuestion.getElementsByTagName("input");
        let selectedInput;

        //loop through all the radio buttons
        for (let i = 0; i < radioBtns.length; i++) {
            if (radioBtns[i].checked) {
                selectedInput = radioBtns[i];
            }
        }

        if (!selectedInput) {
            return false;
        }

        switch (dataToCheck) {
            //get the first radio input in the question
            case "input":
                return radioBtns[0];
            //get the flow for this question
            case "flow":
                return selectedInput.getAttribute("data-store-flow");
            //check if the input goes to a result/ends the flow (could be pseudo)
            case "end":
                if (selectedInput.getAttribute("data-end-flow") === "true") {
                    return "max";
                }
                break;
            //checks what kind of input we are checking
            case "type":
                if (selectedInput.getAttribute("type") === "hidden") {
                    return "hidden";
                }
                if (selectedInput.getAttribute("type") === "button") {
                    return "btn";
                }
                break;
            //gets the data-value (what to go to next, ie: Next Question)
            case "value":
                if (checkValidateDatalist(currentQuestion, false)) {
                    return currentQuestion.getAttribute("data-default");
                } else {
                    return selectedInput.getAttribute('data-value');
                }
            //default, it's a radio button, return true
            default:
                return true;
        }
    }

    $(".datalist").on("change", function () {
        validateDatalist(this.parentElement.parentElement, this.parentElement.parentElement.getElementsByTagName('datalist')[0]);
    });

    //function gets called in checkInput; if validate = true then it validates the entry and will trigger an error message if it doesn't; else it returns true if the the current question has a datalist.
    function checkValidateDatalist(question, validate) {
        let hasDatalist = question.getElementsByClassName("datalist")[0];
        if (validate) validateDatalist(question, hasDatalist);
        if (hasDatalist) {
            return true;
        } else {
            return false;
        }
    }

    function validateDatalist(question, datalist) {

        let selectedOption = question.getElementsByTagName('input')[0].value.toLowerCase();
        let valid;
        let options = datalist.getElementsByTagName("option");

        //compare what the user put in the datalist/text input, and compare it to teh options. If there's a match update the attribute data-default to value, return true and exit loop, else change data-default to blank and return false.
        for (let i = 0; i < options.length; i++) {
            if (selectedOption === options[i].getAttribute("value").toLowerCase()) {
                question.setAttribute('data-default', options[i].getAttribute("data-value"));
                valid = true;
                break;
            } else {
                valid = false;
                question.setAttribute('data-default', "");
            }
        }
        //create error div element
        let validationNote = document.createElement("div");
        setAttributes(validationNote, {
            "class": "alert alert-danger mrgn-tp-md mrgn-bttm-0",
            "id": "validationNote",
            "aria-live": "polite"
        });
        validationNote.innerHTML = '<p class="mrgn-tp-0 mrgn-bttm-0"><strong>' + languageSettings.datalistValidationNote[language] + '</strong></p>'

        //if input was valid, remove validation, reset aria
        //else append error message, set aria
        if (valid && selectedOption != "") {
            if (document.getElementById('validationNote')) document.getElementById('validationNote').remove();
            question.setAttribute('aria-invalid', 'false');
        } else {
            if (document.getElementById('validationNote')) document.getElementById('validationNote').remove();
            question.parentElement.insertBefore(validationNote, question);
            question.setAttribute('aria-invalid', 'true');
            document.getElementById('validationNote').focus();
        }
    }

    //update the side image based on the flow and tweak the CSS depending on design layout.
    function updateSideImage(elm) {
        document.getElementById('sideImage').classList.remove('hidden');
        let imgsrc = "";
        document.getElementById('program-finder').style.overflow = "visible";
        document.getElementById('sideImage').style.right = "0";
        document.getElementById('sideImage').style.width = "auto";
        document.getElementById('sideImage').style.bottom = "0";
        switch (elm) {
            case "work":
            case "workPerm":
                imgsrc = "work-perm2.png";
                if (window.innerWidth < 1200) document.getElementById('sideImage').style.bottom = "20%";
                else document.getElementById('sideImage').style.bottom = "10%";
                document.getElementById('sideImage').style.width = "40%";
                break;
            case "workTemp":
                imgsrc = "work-temp2.png";
                if (window.innerWidth < 1200) document.getElementById('sideImage').style.bottom = "20%";
                else document.getElementById('sideImage').style.bottom = "10%";
                document.getElementById('sideImage').style.width = "40%";
                break;
            case "familyJoin":
            case "familyBring":
            case "familyJoin, familyBring":
            case "family":
                imgsrc = "family2.png";
                document.getElementById('sideImage').style.bottom = "0";
                break;
            case "visit":
                imgsrc = "travel2.png";
                document.getElementById('sideImage').style.right = "30px";
                document.getElementById('sideImage').style.width = "25%";
                document.getElementById('sideImage').style.bottom = "10%";
                break;
            default:
                imgsrc = "choose-path2.png";
                document.getElementById('sideImage').style.right = "0";
                document.getElementById('sideImage').style.width = "auto";
                document.getElementById('sideImage').style.bottom = "0";
                break;
        }
        document.getElementById('sideImage').setAttribute('src', '/explore-programs/images/' + imgsrc)
    }


    //each time a radio button is selected...
    $("input[type=radio]").on("click", function () {
        let maincontent = document.getElementById("program-finder");
        let inputRadio = maincontent.getElementsByTagName("input");

        //if one of the questions that's not part of the questionPath array has a checked radio button, uncheck it, the user has changed from this path.
        for (let i = 1; i < questions.length; i++) {
            if (!questionPath.includes(questions[i])) {
                let radio = questions[i].querySelector('input[type=radio]:checked');
                if (radio) {
                    radio.checked = false;
                }
            }

        }

        //if the selected radio button is going to lead to a result...
        if ($(this)[0].getAttribute('data-value').indexOf("#") >= 0) {

            // Go through all selected radio buttons to see if there was a stored result
            // add it to the resultTrack and update the result tracker element; redundant since it also happens with the next button may need to revist
            let resultTracker = "";
            //loop through all the labels
            for (let j = 0; j < inputRadio.length; j++) {
                if (inputRadio[j].checked) {
                    if (inputRadio[j].getAttribute("data-store-result")) {
                        if (inputRadio[j].getAttribute("data-store-result").indexOf("#") > -1) {
                            $(document.getElementById(inputRadio[j].getAttribute("data-store-result"))).removeClass('hidden');
                        }
                        else {
                            if (document.getElementById(inputRadio[j].getAttribute("data-store-result"))) {
                                document.getElementById(inputRadio[j].getAttribute("data-store-result")).classList.remove('hidden');
                            }
                            else {

                                document.querySelectorAll('.result').forEach(el => el.querySelectorAll("." + inputRadio[j].getAttribute("data-store-result")).forEach(el2 => el2.classList.remove('hidden')));
                            }
                            resultTracker += inputRadio[j].getAttribute("data-store-result");
                        }
                    }
                }
                document.getElementById('resultTracker').setAttribute('value', $(this)[0].getAttribute('data-value') + "," + resultTracker);
            }
            btnNext.setAttribute("type", "submit");
            // btnNext.setAttribute('data-gc-analytics-formsubmit', 'submit');
            btnNext.removeAttribute('data-gc-analytics-customclick');
            formID.appendChild(document.querySelector('.navigation-buttons'));

        }
        else {
            document.getElementById('resultTracker').setAttribute('value', "");
            btnNext.setAttribute("type", "button");
            btnNext.setAttribute('data-gc-analytics-customclick', 'IRCC:Button:Next_' + currentQuestion.getAttribute('id'));
            // btnNext.removeAttribute('data-gc-analytics-formsubmit');
            document.querySelector('.cnt-button').appendChild(document.querySelector('.navigation-buttons'));
        }
    });


    function updateHeading() {
        const results = document.getElementsByClassName('result');
        let numberResults = 0;

        for (let i = 0; i < results.length; i++) {
            if ((!results[i].classList.contains('hidden')) && (!results[i].classList.contains('promo'))) {
                numberResults++
            }
        }

        if (numberResults > 5) { document.getElementsByClassName('btn-navigation')[0].classList.remove('hidden'); }

        //setting the focus back to the h1            
        pageh1.focus();

    }

    // Stops the form from submitting automatically, specifically for the datalist when a user hits enter, the form does not submit and refresh the page.


    formID.onsubmit = function (e) {
        e.preventDefault();
    }


    //end of document ready, keep at the bottom of the doc
});


/*START - JS FOR PRINT*/
// open closed details elements for printing
window.addEventListener('beforeprint', () => {
    const allDetails = document.body.querySelectorAll('details');
    for (let i = 0; i < allDetails.length; i++) {
        if (allDetails[i].open) {
            allDetails[i].dataset.open = '1';
        } else {
            allDetails[i].setAttribute('open', '');
        }
    }
});

// after printing close details elements not opened before
window.addEventListener('afterprint', () => {
    const allDetails = document.body.querySelectorAll('details');
    for (let i = 0; i < allDetails.length; i++) {
        if (allDetails[i].dataset.open) {
            allDetails[i].dataset.open = '';
        } else {
            allDetails[i].removeAttribute('open');
        }
    }
});

document.getElementById('btnPrint').onclick = function () {
    document.getElementById('toolWrapper').classList.add('print');
    window.print();
}

//print function
function printPageArea() {

}

//utility function to set attributes in short lines of code
function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}



/*	Code to trigger WET after modals are loaded into the page, taken from WET documentation  */
/**
 * @title Execute any WET plugin on AJAXed-in content
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp (Github)
 * @version 1.0.0+2016-10-14
 */
(function ($, document, wb) {
    "use strict";

    $("#genuineOfferModal").on("wb-contentupdated", function (event, data) {
        // "data.ajax-type" contains the insersion method [after, append, before, prepend, replace]
        // "data.content" contains the
        let $elm = $(event.currentTarget);
        $elm
            .find(wb.allSelectors)
            .addClass("wb-init")
            .filter(":not(#" + $elm.attr("id") + " .wb-init .wb-init)")
            .trigger("timerpoke.wb");
        /*
         * Since we are working with events we want to ensure that we are being
         * passive about our control, so returning true allows for events to always
         * continue
         */
        $("#genuine_modal").append(
            '<div class="modal-footer"><button type="button" class="btn btn-sm btn-primary pull-left popup-modal-dismiss">Close<span class="wb-inv"> overlay (escape key)</span></button></div>'
        );

        return true;
    });
})(jQuery, document, wb);

$(".wb-toggle").on("click", function (event) {
    let exp = document.querySelector('.btn-expand');
    let col = document.querySelector('.btn-collapse');
    exp.classList.toggle('hidden');
    col.classList.toggle('hidden');

});



//Get page parameters and return the value; Ex.: program-finder.asp?result=r1a, getUrlVars()["results"] = r1a;
function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
