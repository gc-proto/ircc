const urlParams = new URLSearchParams(window.location.search);
const scroll = urlParams.get('scroll');

$( document ).on( "radio.createctrl.wb-fieldflow", ".wb-fieldflow", function( event ) {
    if (scroll) {
        const ff = document.querySelector('.wb-fieldflow-form');
        let inputs = ff.querySelectorAll('input');
        inputs.forEach(item => item.addEventListener('change', scrollOnChange(item)));
    }
});

$( document ).on( "removeClass.action.wb-fieldflow", ".wb-fieldflow", function( event ) {
    if (scroll) {
        let result = document.querySelector('.result:not(.hidden)');
        result.scrollIntoView({behaviour: 'smooth'});
    }
});

function scrollOnChange(selectedInput){
    let parent = getFieldset(selectedInput);
    let sib = parent.nextElementSibling;
    if(sib){
        sib.scrollIntoView({behavior: 'smooth' });
    }
}

function getFieldset(selectedInput){
    return selectedInput.closest('fieldset');
}