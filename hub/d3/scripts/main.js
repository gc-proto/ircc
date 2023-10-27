import {feedbackData} from "./modules/page-feedback.js"
import {wordCloud} from "./modules/word-cloud.js"
import {includeHTML} from "./modules/template.js"
// import {setAttributes}  from "./utils.js"


includeHTML();
$( document ).on( "wb-ready.wb", function( event ) {
  // feedbackData();
  wordCloud();
});
