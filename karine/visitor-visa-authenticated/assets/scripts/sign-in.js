

    const btnSignIn = document.getElementById('btn-sign-in');
    const btnSignOut = document.getElementById('btn-sign-out');
    console.log(btnSignOut);
    const menu = document.querySelector('.menu-banner');
    const signin = document.querySelector('.signin-banner');

    
    if(btnSignIn) {
        btnSignIn.onclick = function(e){
            e.preventDefault;
            localStorage.setItem('signedin', true);
            alert(localStorage.getItem('signedin'));
            history.back();
            
        }
    }
    if(btnSignOut) {
        
        btnSignOut.onclick = function(e){
            e.preventDefault;
            console.log('test1');
            localStorage.setItem('signedin', false);
            location.reload();
        }
    }

    $( document ).on( "wb-ready.wb", function( event ) {

        if (localStorage.getItem('signedin') == "true") {
            $.ajax({
                url: "../../../assets/includes/sign-in.html",
                type: "GET",
                success: function(data){
                    $(signin).html(data);
                    menu.classList.add('hidden');
                }
            })
        }
    });
    
