function isNumber(el, evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch)) || el.value.length == 2) {
        evt.preventDefault();
    }
}

function formatNumber(event) {
    if (event.which >= 37 && event.which <= 40) {
        event.preventDefault();
    }
};

function preventCopyPaste(event) {
    if (event.which == 17 || event.which == 86 || event.which == 67) {
        event.preventDefault();
    }
}