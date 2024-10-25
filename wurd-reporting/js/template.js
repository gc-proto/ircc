displayMenu();

$('#left-navigation h2>a[role="button"]').on( "click mouseenter focusin", function(e){
    e.preventDefault();
    if (screen.width < 1199) {
        $('#left-navigation ul').css("display","none");
        let subMenu = $($(this).attr("href"));
        subMenu.css("display","block");

    }
});

$('#left-navigation ul').on( "mouseleave focusout", function(){
    if (screen.width < 1199) {        
        $('#left-navigation ul').css("display","none");
    }
});

window.onresize = function(){ displayMenu() };

$('#left-navigation').on( "wb-contentupdated", function( event, data ){
    displayMenu()
});

function displayMenu() {
    if (screen.width > 1199) { 
        $('#left-navigation ul').css("display","block");
    }
    else {
        $('#left-navigation ul').css("display","none");
    }
}