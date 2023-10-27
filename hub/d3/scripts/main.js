import {feedbackData} from "./modules/page-feedback.js"
import {wordCloud} from "./modules/word-cloud.js"
import {includeHTML} from "./modules/template.js"
// import {setAttributes}  from "./utils.js"


includeHTML();
$( document ).on( "wb-ready.wb", function( event ) {
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');

  switch (tab) {
    case 'common-words':
      wordCloud();
      break;
    case 'comments':
    default:
      feedbackData();
      break;
  }
  
});
