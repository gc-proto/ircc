$("document").ready(function () {
  //global variable declarations
  let questionFlow = new Array(); //Array, stores the flow of the questions. As in, in which order the cquestions showed up, so that when the user clicks previous it follows same logical order
  let questions = document.getElementsByClassName("question"); //grabs all the questions on the page (divs with class question, wrapper/container for each of the questions)
  let currentQuestion; //setting as global variable since using it in multiple functions, will store the HTML element that is the current question on screen
  let toolState = "tool"; //stores the state between tool and result, default is tool - Tyh
  let pseudoBtn;
  let skip = false;
  const introText = document.getElementById("introText");
  const disclaimerText = document.getElementById("disclaimerText");
  let country;

  // next button function
  $("#btnNext").on("click", function () {
    introText.classList.add('hidden');
    disclaimerText.classList.add('hidden');


    //declare a varible for the next  question
    let nextQuestion;

    //go through all of the questions in the HTML
    for (let i = 0; i < questions.length; i++) {
      //find which one is currently on the screen by getting the one without the hidden class
      if (!questions[i].classList.contains("hidden")) {
        //store the current question
        currentQuestion = questions[i];
        $(currentQuestion).addClass("answered"); // Add answered to the current question - Louis

        //if the question flow array is empty, add the current question (the first question) to it.
        if (questionFlow.length === 0) {
          questionFlow.push(currentQuestion);
        }

        //check if the current question has checkboxes
        if (isCheckbox(currentQuestion)) {
          //if it does, get the data-default attribute
          //the results to show are in the data-default attribute, the boxes are appended in the "$('input[type=checkbox]').change" function
          nextQuestion = currentQuestion.getAttribute("data-default");
          // checkID = currentQuestion.
          
        } else if (isDatalist(currentQuestion)) {
          nextQuestion = currentQuestion.getAttribute("data-default");
        } else {
          //if it's not a checkbox, it has to be a radio button. Get the value of the selected radio button.
          nextQuestion = checkInput("val");
        }

        // if there is a "#" in either the radio button value, or in the data-default attribute, then we are showing a result.
        // Note: when the radio button value is for a question it does not have the "#" just the ID name
        if (nextQuestion.indexOf("#") >= 0) {
          
          // add the current question to the array so we know which to go back to if user clicks previous button
          questionFlow.push(currentQuestion);

          //show and hide different elements
          $(currentQuestion).addClass("hidden"); // hide the current question
          $("#btnNext").addClass("hidden"); // hide the next button
          $(nextQuestion).removeClass("hidden"); // show the "nextQuestion", in this case nextQuestion = results
          $(".pf-container").addClass("result-container"); //add the result-container class to style the result screen
          $("#btnStartOver").removeClass("hidden"); //show the start over button
          $('#feedbackSurvey').removeClass("hidden"); //show the feedback survey
          
          
          //  **********start - getting the text for the h1**********
          var result = document.getElementById(nextQuestion.split("#")[1]);      
         
          // var resultHeading = result.getElementsByClassName('resultHeading')[0];
          // document.getElementById('wb-cont').innerHTML = resultHeading.innerHTML;

          
          // Go through all selected radio buttons to see if there was a stored result
          var maincontent = document.getElementById("program-finder");
          var inputRadio = maincontent.getElementsByTagName("input");
          //loop through all the labels
          for (var j = 0; j < inputRadio.length; j++) {
            if (inputRadio[j].checked) {
              if (inputRadio[j].getAttribute("data-store-result")) {
                document.getElementById(inputRadio[j].getAttribute("data-store-result")).classList.remove("hidden");
                
              }
            }
          }
          $("#allResults").removeClass("hidden"); //show results
			
			// UKRAINE NOTE BOX
			if (country === "UKR") {
				document.getElementById("ukr_notebox").classList.remove('hidden');
				var nb = document.getElementById("ukr_notebox").getElementsByTagName("h2")[0];
				var temp1 = nb.innerHTML
				nb.outerHTML = "<h3 class='h2'>" + temp1 + "</h3>";
				console.log(nb);
			}
			else {
				document.getElementById("ukr_notebox").classList.add('hidden');
			}
			

          document.querySelector('.progressWrapper').classList.add('hidden');
         
          // //because we're showing results, the progress bar should be maxed out, passing the param "max" forces this to be true
      

          document.getElementById("wb-cont").scrollIntoView();
          //V4 - set focus to h1 (text changes)          
          // $("wb-cont").focus();

          // $("#allResults").focus();

          var h2result = result.getElementsByTagName('h2')[0];
          
          h2result.setAttribute('tabindex', '-1');
          h2result.focus();


          // tool is now in result state - Tyh
          toolState = "result";

          // let storeHTML = document.getElementById('programFinderForm').innerhtml;
          
          increaseProg("result");
        }
        //if there is NO hastag, then show the next question
        else {

          //remove the start over button
          $("#btnStartOver").addClass("hidden");

          //reset the nextQuestion variable to the HTML element nextQuestion
          nextQuestion = document.getElementById(nextQuestion);
          //show the next question,
          nextQuestion.classList.remove("hidden");
          //hide the current question,
          currentQuestion.classList.add("hidden");

          //add it to the array
          questionFlow.push(nextQuestion);
          //reset the currentQuestion variable to the current question on screen
          currentQuestion = nextQuestion;

          //tell it question # you're at
          // ie #5
          var splitQ = currentQuestion.getAttribute("id").split("_")[0];          
          splitQ = splitQ.split("q")[1];          
          increaseProg(splitQ);

          document.getElementById("wb-cont").scrollIntoView();

          let displayedQuestions = document.getElementsByClassName("pseudoResult");

          for (let k = 0; k < displayedQuestions.length; k++) {
            if (!displayedQuestions[k].classList.contains("hidden")) {
              $("#btnNext").addClass("hidden");
              break;
            } else {
              $("#btnNext").removeClass("hidden");
            }
          }
           $("#programFinderForm").focus();

        }

        //if the radio button or checkbox is selected enable the next button, or disable it
        
        if (
          checkInput() ||
          isCheckbox(currentQuestion)          
        ) {
          $("#btnNext").removeAttr("disabled");
          $("#btnNext").removeClass("disabled");
        } else {
          $("#btnNext").addClass("disabled");
          $("#btnNext").attr("disabled", "disabled");
        }
        if (isDatalist(currentQuestion)){
        validateDatalist(currentQuestion.getElementsByClassName("datalist")[0]);
      }

        //show the previous button
        $("#btnPrev").removeClass("hidden");

        // do not want to show previous question button during result state - Tyh
        if (toolState === "tool") {
          //show the previous button
          $("#btnPrev").removeClass("hidden");
        } else {
          //hide the previous button
          $("#btnPrev").addClass("hidden");
        }

        //exit the loop
        break;
      }
    }
  });

  //function for the "previous question" button
  $("#btnPrev").on("click", function () {
    document.querySelector('.progressWrapper').classList.remove('hidden');
    // document.getElementById('wb-cont').innerHTML = h1Text;
    // hide what is currently displayed on the screen
    $(".result").addClass("hidden"); //hide all of the results
    $(".hr").removeClass("hr"); //remove the HRs between the results, could have double HRs if that's not done
    $(".pf-container").removeClass("result-container"); //remove the styles for the result container (setting the colour, changing the block display back to flex)
    // document.getElementById("numberProgramsHeader").classList.add('hidden'); //hide the results header
    $("#btnNext").removeAttr("disabled"); //enable the next btn (disable attribute)
    $("#btnNext").removeClass("disabled").removeClass("hidden"); //enable the next btn (CSS disable, sets btn to blue insted of gray)
    $("#btnStartOver").addClass("hidden"); //hide the "start over" button
    $("#allResults").addClass("hidden"); //hide results
    $("#feedbackSurvey").addClass("hidden"); //hide feedback survey
    currentQuestion.classList.add("hidden"); //hide the current question

    //remove the question from the array, it is no longer in the "flow of questions"
    questionFlow.pop();
    //get the previous question that was in the flow, and show it, removing the hidden class
    questionFlow[questionFlow.length - 1].classList.remove("hidden");
    //set the current question variable to the previous question
    currentQuestion = questionFlow[questionFlow.length - 1];

    decreaseProg(currentQuestion);

    //get the first input in the currentQuestion so that the focus can be set for a11y
    let firstInput = checkInput("input");
    firstInput.focus();

    //next few lines are to decrease the progress bar, get the data-progress-increase value
    //hidden from version__progressBarIncrease = checkInput("prog");
    // check if the current question is the first question in the tool, if yes then force it to 10 (default value)
    if (currentQuestion === questionFlow[0]) {
      $(this).addClass("hidden"); //also hide the previous button if it's the first question
      currentProg = 10;
    }

    if (checkInput("type") === "btn") {
      $("#btnNext").addClass("hidden");
    } else {
      $("#btnNext").removeClass("hidden");
    }

    document.getElementById("wb-cont").scrollIntoView();
  });

  //These 2 function just sets the focus and adds a class to force the label to be outlined
  //Doing this because in the CSS i'm forcing the radio btn's circle to be invisible to user, so the focus outline should be on that btn, but i'm putting it around the label to meet focus visible a11y critera
  $("input[type=radio]").focusin(function () {
    //add the class on the label if it's in focus
    $(this).parent().addClass("label-focus");
  });
  $("input[type=radio]").focusout(function () {
    //remove the class if it's out of focus
    $(this).parent().removeClass("label-focus");
  });

  //function each time a radio button is selected
  $("input[type=radio]").on("click", function () {
    // trigger on radio click rather than on next button click when in result state - Tyh
    if (toolState === "result") {
      $("#allResults").children().addClass("hidden"); // hide current results - Tyh
      // $('#numberProgramsHeader').addClass('hidden'); // hide results header - Tyh

      var el = $(this)[0].parentNode.parentNode.parentNode.parentNode; //get the question - Tyh
      var elPos = questionFlow.indexOf(el); //get the position of the question within the questionFlow - Tyh

      removedQuestions = questionFlow.slice(elPos + 1); //get array of questions being removed (everything after current question) - Tyh
      questionFlow.length = elPos + 1; //trim off all array items after current question - Tyh

      //loop removed questions and hide them - Tyh
      for (let l = 0; l < removedQuestions.length; l++) {
        removedQuestions[l].classList.add("hidden"); //add the class hidden on the questions that have been removed - Tyh
      }

      // if there is a "#" in either the radio button value, or in the data-default attribute, then we are showing a result.
      // Note: when the radio button value is for a question it does not have the "#" just the ID name
      if ($(this)[0].value.indexOf("#") >= 0) {
        $($(this)[0].value).removeClass("hidden"); // show the "nextQuestion", in this case nextQuestion = results

        
        // set focus to the top of result screen, so screen readers start to read the results
        $("#allResults").focus();
      } else {
        //reset the nextQuestion variable to the HTML element nextQuestion
        nextQuestion = document.getElementById($(this)[0].value);
        //show the next question,
        nextQuestion.classList.remove("hidden");
        //add it to the array
        questionFlow.push(nextQuestion);
      }
    }

    //remove the attribute and CSS class that disables the next button
    $("#btnNext").removeClass("disabled");
    $("#btnNext").removeAttr("disabled");

    //get all of the questions in the document
    //getting evreything in the document instead of current question so that the active/selected radio buttons persist when user goes previous/next questions
    var maincontent = document.getElementById("program-finder");
    //get all of the radio button labels in the document
    var inputLabel = maincontent.getElementsByTagName("label");
   console.log(inputLabel);
    //loop through all the labels
    for (var i = 0; i < inputLabel.length; i++) {
      //get the first child (the radio button input)
      let inputRadio = inputLabel[i].firstElementChild;
      //if it's selected,then add the class active
		if(inputRadio){
      if (inputRadio.checked === true) {
        inputLabel[i].classList.add("active");
        
      }
      //if it's not selected, remove the active class
      else {
        inputLabel[i].classList.remove("active");
      }}
    }

  });

  //function each time a checkbox is selected/unselected
  $("input[type=checkbox]").change(function () {
    // in the result state we need to check what question the checkbox is a part of rather than use currentQuestion - Tyh
    if (toolState === "result") {
      // get the question  - Tyh
      var el = $(this)[0].parentNode.parentNode.parentNode.parentNode;

      // Hide the results attached to the current question to handle when a checkbox is unchecked - Tyh
      nextQuestion = el.getAttribute("data-default"); // get the results to remove
      $(nextQuestion).addClass("hidden"); // remove the results

      //store the current question's checkboxes to an array
      var chkboxes = el.querySelectorAll("input[type=checkbox]");

      //loop through all the checkboxes
      for (let i = 0; i < chkboxes.length; i++) {
        //get the question's attribute for default results to show
        //this is a string, and checkboxes value will get appended
        var getValues = el.getAttribute("data-default");

        //if the current checkbox in the loop is checked
        if (chkboxes[i].checked) {
          //get the value (which result to show), and append them to the string variable
          // only add to string if the result is not already there
          if (chkboxes[i].value != "" && chkboxes[i].value != null) {
            if (getValues.indexOf(chkboxes[i].value) < 0) {
              getValues += ", " + chkboxes[i].value;
            }
          }
        } else {
          //if it gets unchecked, then remove it from the string, so it doesn't show in the results
          if (chkboxes[i].value != "" && chkboxes[i].value != null) {
            getValues = getValues.replace(", " + chkboxes[i].value, "");
          }
        }
        //reset the current question's data-default attribute to the new string
        el.setAttribute("data-default", getValues);
      }

      // show the results attached to the currently checked options - Tyh
      nextQuestion = el.getAttribute("data-default"); // get the results to show
      $(nextQuestion).removeClass("hidden"); // show the results
      
    } else {
      //store the current question's checkboxes to an array
      var chkboxes = currentQuestion.querySelectorAll("input[type=checkbox]");

      //loop through all the checkboxes
      for (let i = 0; i < chkboxes.length; i++) {
        //get the question's attribute for default results to show
        //this is a string, and checkboxes value will get appended
        var getValues = currentQuestion.getAttribute("data-default");

        //if the current checkbox in the loop is checked
        if (chkboxes[i].checked) {
          //get the value (which result to show), and append them to the string variable
          // only add to string if the result is not already there
          if (getValues.indexOf(chkboxes[i].value) < 0) {
            getValues += ", " + chkboxes[i].value;
          }
        } else {
          //if it gets unchecked, then remove it from the string, so it doesn't show in the results
          getValues = getValues.replace(", " + chkboxes[i].value, "");
        }
        //reset the current question's data-default attribute to the new string
        currentQuestion.setAttribute("data-default", getValues);
      }
      
    }

    //store the current question's checkboxes to an array
    var chkboxes = currentQuestion.querySelectorAll("input[type=checkbox]");

    //loop through all the checkboxes
    for (let i = 0; i < chkboxes.length; i++) {
      //get the question's attribute for default results to show
      //this is a string, and checkboxes value will get appended
      var getValues = currentQuestion.getAttribute("data-default");

      //if the current checkbox in the loop is checked
      if (chkboxes[i].checked) {
        // console.log(chkboxes[i].value);
        //get the value (which result to show), and append them to the string variable
        // only add to string if the result is not already there
        if (chkboxes[i].value != "" && chkboxes[i].value != null) {
          if (getValues.indexOf(chkboxes[i].value) < 0) {
            getValues += ", " + chkboxes[i].value;
          }
        }
      } else {
        //if it gets unchecked, then remove it from the string, so it doesn't show in the results
        if (chkboxes[i].value != "" && chkboxes[i].value != null) {
          getValues = getValues.replace(", " + chkboxes[i].value, "");
        }
      }

      if (chkboxes[i].checked && chkboxes[i].value === "") {
        for (let j = 0; j < chkboxes.length; j++) {
          if (chkboxes[j].value != "") {
            chkboxes[j].checked = false;
            chkboxes[j].setAttribute("disabled", "disabled");
          }
        }
      }
      if (!chkboxes[i].checked && chkboxes[i].value === "") {
        for (let k = 0; k < chkboxes.length; k++) {
          if (chkboxes[k].value != "") {
            chkboxes[k].removeAttribute("disabled");
          }
        }
      }

      //reset the current question's data-default attribute to the new string
      currentQuestion.setAttribute("data-default", getValues);
    }

    // set the value for the progress bar incrase by getting the # from the checkboxes data-progress-increase attribute;
    // store it in the progressBarIncrease variable
    //hidden from version__console.log("increasing by " + this.getAttribute("data-progress-increase"));
    //hidden from version__progressBarIncrease = this.getAttribute("data-progress-increase");
  });

  //function paramter to check
  // 1) empty = which radio button is checked
  // 2) val = what the selected radio button's value is
  // 3) input = which is the first radio button
  // 4) prog = get the progress increase value
  // 5) res = storing default result
  // 6) type = what kind of input -refactor
  function checkInput(dataToCheck) {
    //get all the radio buttons in the current question
    var radioBtns = currentQuestion.getElementsByTagName("input");

    //loop through all the radio buttons
    for (let i = 0; i < radioBtns.length; i++) {
      //if parameter = "input", return the first radio button (used to set focus in the next button function)
      if (dataToCheck === "input") {
        return radioBtns[0];
      } else if (dataToCheck === "type") {
        if (radioBtns[i].getAttribute("type") === "button") {
          return "btn";
        }
      } else {
        //get the radio button that is selected
        // ||
        // isDatalist(radioBtns[i].parentNode.parentNode)
        
        if (
          radioBtns[i].checked
        ) {



        // if (
        //   radioBtns[i].checked
        // ) {
          //if parameter = "val", get the selected btn's value
         
          if (radioBtns[i].parentNode.classList.contains("skip")) {
            skip = true;
          }
          else {
            skip = false;
          }
          if (dataToCheck === "val") {
            if (radioBtns[i].getAttribute("type") === "button") {
              return pseudoBtn;
            } else {
              return radioBtns[i].value;
            }
          }
          //if parameter = "prog", get the data-progress-increase value
          else if (dataToCheck === "prog") {
            //hidden from version__return radioBtns[i].getAttribute("data-progress-increase");
          }

          //if parameter is empty, return true; returns that it is a radio button and it's selected
          else {
            return true;
          }
          //exit the for loop
          break;
        }
      }
    }
  }

  // This function just checks if the input is a checkbox
  // It's called twice in the code
  // 1) at the beginning of the "next button" function to grab the data-default attribute
  // 2) at the end of the "next button" function to enable the next button; it just checks if it's a checkbox, they're optional so it doesn't check if they have been selected.
  function isCheckbox(question) {
    hasCheckbox = question.getElementsByClassName("checkbox");
    return hasCheckbox.length > 0 ? true : false;
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
      var $elm = $(event.currentTarget);
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

  
  // Stops the form from submitting automatically, specifically for the datalist when a user hits enter, the form does not submit and refresh the page.
  $("#programFinderForm").submit(function (event) {
    event.preventDefault();
  });


  var valid;
  var eventKey=null;
    $("#q2-question").bind('keydown', function (ev) {
    eventKey=ev.which;
    });
    $("#q2-question").bind('input', function (ev) {
      if (window.navigator.userAgent.indexOf("Edge") > -1) {
        if(eventKey==null || (""==$(this).val() && eventKey==8 )){
        console.log("click");
        validateDatalist(document.getElementById('q2-question'));        
        }
        if (eventKey === 13) {
          
        console.log("click");
        validateDatalist(document.getElementById('q2-question')); 
        }

        eventKey=null;
      }
    });

   
  $(".datalist").on("change", function () {
    validateDatalist($(this));
    
  });
  $(".datalist").on("focusout", function() {
    if (valid) {
      $("#btnNext").focus();
    }
  })

  function isDatalist(question) {
    if (!question) {
      for (let i = 0; i < questions.length; i++) {
        if (!questions[i].classList.contains("hidden")) {
          question = questions[i];
        }
      }
    }
    let hasDatalist = question.getElementsByClassName("datalist");

    if (hasDatalist.length > 0) {
      validateDatalist(hasDatalist[0]);
      return true;
    } else {
      return false;
    }
  }

 
  function validateDatalist(question) {
  
    let selectedOption = $(question).val();
    let selectedDataVal, storedQuestion;
    let list = $(question).attr("list");
    list = document.getElementById(list);
    valid = "";

    let options = list.getElementsByTagName("option");
    

    
      for (let i = 0; i < options.length; i++) {
        if ( selectedOption.toLowerCase() === options[i].getAttribute("value").toLowerCase() ) {
          selectedDataVal = options[i].getAttribute("data-value");
          
          if (options[i].getAttribute("data-cgroup")){storedQuestion = options[i].getAttribute("data-cgroup");}
          

          $("#btnNext").removeAttr("disabled");
          $("#btnNext").removeClass("disabled");

          $(question).parent().parent().attr("data-default", selectedDataVal);
          valid = true;
          eventKey=null;
          break;
        } 
        else {
          valid = false;
          eventKey=null;
          $("#btnNext").addClass("disabled");
          $("#btnNext").attr("disabled", "disabled");
          $(question).parent().parent().attr("data-default", "");
        }
      }
    
      
    var alertDiv = document.createElement("div");
    alertDiv.innerHTML = '<div role="alert" class="alert alert-danger provisional mrgn-tp-md mrgn-bttm-0 hidden" id="alertDiv" aria-live="polite" tabindex="-1"><p class="mrgn-tp-0 mrgn-bttm-0"><strong>Error: Please select the country code using the list below.</strong></p></div>';
    $(question).parent().before(alertDiv);

    if (!valid && selectedOption != "") {
      // $("#alertDiv").remove();
      $("#alertDiv").removeClass('hidden');
      $(question).attr("aria-invalid", "true");
      $("#alertDiv").focus();
    } else {
      // $(".alertDiv").remove();
      $("#alertDiv").addClass('hidden');
      $(question).attr("aria-invalid", "false");
    }

    return storedQuestion;
  }

  // V4.2



// Specific to VISA:

$("#q2-question").on("change", function () {
  var storedQuestion = validateDatalist($(this));

	country = $(this).val();
	country = country.split(" ")[0];	
	
//  USPR changes
//  if (storedQuestion === "eTA_eligible") {document.getElementById("q3-2").setAttribute("value", "q5_eta_eligible");}
//  else {
//    document.getElementById("q3-2").setAttribute("value", "q4");
//  }

  if (storedQuestion === "visa_required") {document.getElementById("q4-2").setAttribute("value", "q5_visa_required");}
 
	//  USPR changes
	else if (storedQuestion === "eTA_eligible" || storedQuestion === "eta_eligible") {document.getElementById("q4-2").setAttribute("value", "q5_eta_eligible");}
	
 
  else if (storedQuestion === "eTA-X" || storedQuestion === "eta-X") {document.getElementById("q4-2").setAttribute("value", "q9_eTA-X");}
  else if (storedQuestion === "eTA-X-TWOV" || storedQuestion === "eTA-X-TWOV") {document.getElementById("q4-2").setAttribute("value", "q9_eTA-X-TWOV");}
  else if (storedQuestion === "eTA-X-Mexico" || storedQuestion === "eTA-X-Mexico") {document.getElementById("q4-2").setAttribute("value", "q9_eTA-X-Mexico");}
   else if (storedQuestion === "taiwan") {document.getElementById("q4-2").setAttribute("value", "q10_taiwan");}
  else if (storedQuestion === "israel") {document.getElementById("q4-2").setAttribute("value", "q11_israel");}
  else if (storedQuestion === "romania") {document.getElementById("q4-2").setAttribute("value", "q12_romania");}
  else {document.getElementById("q4-2").setAttribute("value", "q5_" + storedQuestion);}
  
});

document.getElementById("pe").classList.add("hidden");
document.getElementById("toolWrapper").classList.remove("hidden");



// new progress bar?
var progBar = document.getElementById("progressBar");
var prog = 10;
var currProg = document.getElementsByClassName("currentProg");
var progArray = [10];

function increaseProg(x){

  
  
  if (x === "result") {
    // If i'm at a result, force the progress to be 100    
    prog = 100;
  }
  else {    
      x = parseInt(x);  
      if ((x === 4) && (skip === true)) {
        prog = 50;
      }
      else if (x > 5) {
        prog = prog + 10;
      }
      else {
        prog = prog + 10;
      }
    
    
  }
  
  
  progArray.push(prog);
  // console.log("prog array = " + progArray);

  progBar.setAttribute("value", parseInt(prog));
  for (var i=0; i < currProg.length; i++) {
    currProg[i].innerHTML = prog + "%";
  }

  
  // console.log("progress is at : "  + prog);

 

}

function decreaseProg(x){
  


  progArray.pop();
  prog = progArray[progArray.length-1];

  // console.log("prog array = " + progArray);
    
  

  
  progBar.setAttribute("value", parseInt(prog));
  for (var i=0; i < currProg.length; i++) {
    currProg[i].innerHTML = prog + "%";
  }
  // console.log("progress is at : "  + prog);
  

}



  //end of document ready, keep at the bottom of the doc
});





