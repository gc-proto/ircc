

displayMenu();

window.onresize = function(){ displayMenu() };

$('#left-navigation').on( "wb-contentupdated", function( event, data ){
    displayMenu()

    $('#left-navigation div h2>a[role="button"]').on( "click mouseenter focusin", function(e){
        e.preventDefault();
        if (window.innerWidth < 1199) {
            $('#left-navigation ul').css("display","none");
            let subMenu = $($(this).attr("href"));
            subMenu.css("display","block");
    
        }
    });
    
    $('#left-navigation ul').on( "mouseleave focusout", function(){
        if (window.innerWidth < 1199) {        
            $('#left-navigation ul').css("display","none");
        }
    });

    let currentPage = (window.location.href).split('/').pop();
    let links = document.querySelectorAll('#left-navigation a');
    for (let i = 0; i < links.length; i++) {

        if (links[i].getAttribute('href') === currentPage) {
            links[i].classList.add('active');
        }
    }

});

function displayMenu() {
    if (window.innerWidth > 1199) { 
        $('#left-navigation ul').css("display","block");
    }
    else {
        $('#left-navigation ul').css("display","none");
    }
   
   
}