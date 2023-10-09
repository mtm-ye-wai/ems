$('button[type="submit"]').one("click", function() {
    $(this).click(function () { return false; });
});