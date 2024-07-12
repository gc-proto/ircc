$(".account-chooser a").click(function (e) {
    if (this.getAttribute('href').charAt(0) === "#") {
        e.preventDefault();
        document.getElementById('account-chooser').scrollIntoView('alignToTop');
    }
});



                              


$(".signin-create-btn").click(function (){
    console.log("test")
    document.querySelector('.account-banner').style.minHeight = "0px";
    
    $('.account-chooser').addClass('nojs-show');
    $('.signin-create-btn').addClass('active');

    let h;

    if ($(this).hasClass('signin')) {
        $('.signin-opt, .account-chooser').removeClass('nojs-show');
        $('.find-header, .find-program').addClass('nojs-show');
        $('.account-banner').addClass('sign-in').removeClass('create');        
    }
    else {
        $('.find-header, .find-program, .account-chooser').removeClass('nojs-show');
        $('.signin-opt').addClass('nojs-show');
        $('.account-banner').addClass('create').removeClass('sign-in');
    }

    h = document.querySelector('.account-chooser').offsetHeight;
    document.querySelector('.account-banner').style.minHeight = h + 100 + "px";
      
      
   

});