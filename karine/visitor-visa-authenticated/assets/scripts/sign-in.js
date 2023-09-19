

    const btnSignIn = document.getElementById('btn-sign-in');
    const btnSignOut = document.getElementById('btn-sign-out');

    console.log(btnSignIn)
    if(btnSignIn) {
        btnSignIn.onclick = function(e){
            e.preventDefault;
            localStorage.setItem('signedin', true);
            alert(localStorage.getItem('signedin'));
            history.back();
            
        }
    }
    if(btnSignOut) {
        btnSignOut.onclick = function(){
            localStorage.setItem('signedin', false);
            location.reload();
        }
    }

    const menu = document.querySelector('.menu-banner');

    $( document ).on( "wb-ready.wb", function( event ) {

        console.log(localStorage.getItem('signedin'));
        if (localStorage.getItem('signedin') == "true") {
            console.log('test');
            $.ajax({
                url: "../../../assets/includes/sign-in.html",
                type: "GET",
                success: function(data){
                    $(menu).html(data);
                    
                }
            })
        }
    });
    
