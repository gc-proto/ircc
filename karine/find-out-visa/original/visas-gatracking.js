//ga('comms.send', 'event', 'category', 'action', 'label');

var nextBtn = document.getElementById('btnNext');
var q1, q4, q5;

nextBtn.onclick = function(){
  var currentQuestion = document.querySelector('.question:not(.hidden)')  
  var radios = currentQuestion.getElementsByTagName('input');
  currentQuestion = currentQuestion.getAttribute('id').split("_")[0];
  
  // console.log(radios);
   
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      switch(currentQuestion) {
        // DOCUMENT SELECTION
        case "q1":
          
          q1 = radios[i].parentNode.textContent.trim()
          break;
        //GREEN CARD
        case "q4":
              
          q4 = radios[i].parentNode.textContent.trim()
          break;
        //PURPOSE OF VISIT/TRAVEL
        //q5_eta_eligible, q5_USPR, q5_usa, q5_visa_required, q5_eTA-X, q5_visa_eTA-X_required, q5_usa
        case "q5":
            
          q5 = radios[i].parentNode.textContent.trim();
          break;
        default:
          //do nothing
      }

      // result
      var answer = radios[i].value;
      if (answer.indexOf('#') > -1) {
        ga('comms.send','event', 'document_selection', 'radio_click', q1);
        ga('comms.send','event', 'green_card_selection', 'radio_click', q4);
        ga('comms.send','event', 'purpose_selection', 'radio_click', q5);
        
        ga('comms.send','event', 'result', 'result_displayed', radios[i].value);
      }

    }
  }  
}

var learnMoreLink = document.getElementsByClassName('learnMore');
for(var i = 0; i < learnMoreLink.length; i++) {  
  learnMoreLink[i].onclick = function(){     
   
    ga('comms.send','event', 'learn_more', 'link_click', this.getAttribute('href').trim());
  };
  
}
