function showHidePassword(pwdDivId) {
    if ($(pwdDivId).find('input').attr("type") == "text") {
        $(pwdDivId).find('input').attr('type', 'password');
        $(pwdDivId).find('i').addClass("fa-eye-slash");
        $(pwdDivId).find('i').removeClass("fa-eye");
    } else if ($(pwdDivId).find('input').attr("type") == "password") {
        $(pwdDivId).find('input').attr('type', 'text');
        $(pwdDivId).find('i').removeClass("fa-eye-slash");
        $(pwdDivId).find('i').addClass("fa-eye");
    }
}