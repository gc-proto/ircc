const pageFeedbackToolTemplate = document.createElement('template');

pageFeedbackToolTemplate.innerHTML = lang === "en" ? `<div class="row"> <div class="col-sm-8 col-md-9 col-lg-9"> <div class="wb-disable-allow" data-ajax-replace="https://www.canada.ca/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html"></div> </div> </div> `: `<div class="row"> <div class="col-sm-8 col-md-9 col-lg-9"> <div class="wb-disable-allow" data-ajax-replace="https://www.canada.ca/etc/designs/canada/wet-boew/assets/feedback/page-feedback-fr.html"></div> </div> </div>`;

document.addEventListener('DOMContentLoaded', function() {

  if (pageConstants.pageFeedbackTool) {
    document.getElementsByClassName('pft')[0].append(pageFeedbackToolTemplate.content);
  }

  if (!pageConstants.fluidWidth) {
    document.getElementsByTagName('main')[0].classList.add('container');      
  }
  else {
    document.getElementsByClassName('pagedetails')[0].classList.add('container');
  }

});