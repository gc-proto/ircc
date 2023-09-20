$( document ).on( "wb-ready.wb", function( event ) {
    const btnSignIn = document.getElementById('btn-sign-in');
    const menu = document.querySelector('.menu-banner');
    const signin = document.querySelector('.signin-banner');

    
    if(btnSignIn) {
        btnSignIn.onclick = function(e){
            e.preventDefault;
            localStorage.setItem('signedin', true);
            history.back();
            
        }
    }    
    if (localStorage.getItem('signedin') == "true") {
        loadSignIn().then(function(data) {
            $(signin).html(data);
            menu.classList.add('hidden');

            const btnSignOut = document.getElementById('btn-sign-out');
            if(btnSignOut) {
                
                btnSignOut.onclick = function(e){
                    e.preventDefault;
                    console.log('test1');
                    localStorage.setItem('signedin', false);
                    location.reload();
                }
            }
        });
        
        
    }

    function loadSignIn(){
        return new Promise(function(resolve) {
            $.ajax({
                url: "../../../assets/includes/sign-in.html",
                type: "GET",
                success: function(data){
                    resolve(data)
                }
            })
        })
        
    }
});
    
