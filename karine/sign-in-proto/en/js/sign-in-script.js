const btnBack = document.getElementById('btnBack');
const ref = document.referrer;

if (ref.indexOf("/sign-in-proto/") === -1) btnBack.remove();

btnBack.onclick = function () {
    history.back();
};

window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};