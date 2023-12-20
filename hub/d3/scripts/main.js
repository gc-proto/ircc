import {feedbackData} from "./modules/page-feedback.js"
import {wordCloud} from "./modules/word-cloud.js"
import {includeHTML} from "./modules/template.js"
import {mapURLs, getTopic} from "./modules/ircc-urls.js"
import {tssCharts} from "./modules/tss.js"
// import {setAttributes}  from "./utils.js"


includeHTML();

$( document ).on( "wb-ready.wb", function( event ) {
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');
  const page = (window.location.pathname).split('/').pop();

  switch (page) {
    case 'index.html':
      loadIndexAA();
      break;
    case 'task-survey.html':
      document.getElementById('date-range').classList.add('hidden');
      mapURLs();
      tssCharts();
      break;
    case 'page-feedback.html': 
      switch (tab) {
        case 'common-words':
          wordCloud();
          break;
        case 'comments':
        default:
          feedbackData();
          break;
      }     
    default:
      break;

    
  }

  document.querySelector('.btn-update').onclick = function(){
    const topicSelection = document.getElementById('topics').value;
    console.log(topicSelection);
    getTopic(topicSelection);
  }

  
});

function loadIndexAA(){
  
}
