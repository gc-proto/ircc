$(".account-chooser a").click(function (e) {
    if (this.getAttribute('href').charAt(0) === "#") {
        e.preventDefault();
        document.getElementById('account-chooser').scrollIntoView('alignToTop');
    }
});

$(".signin-create-btn").click(function (){

    let h = document.querySelector('.account-banner > .container').offsetHeight;
    console.log(h)

    document.querySelector('.account-banner').style.height = h + 100;
    console.log(h)
});