$(".account-chooser a").click(function (e) {
    if (this.getAttribute('href').charAt(0) === "#") {
        e.preventDefault();
        document.getElementById('account-chooser').scrollIntoView('alignToTop');
    }
});



                              

