/**
 * Thousand digit separator
 */
function formatNumber(inp) {
    $(inp)
        .on(
            'keyup keypress',
            function (evt) {
                if (!((evt.which >= 48 && evt.which <= 57)
                    || evt.which == 8 || evt.which == 46)) {
                    evt.preventDefault();
                }
                if (evt.which != 110) {// not a fullstop
                    let number = $(this).val().replace(/\,/g, '');
                    if (number.length == 0)
                        number = "0";
                    let n = parseFloat(number, 10);
                    $(this).val(n.toLocaleString());
                }
            });
}
let basicSalary = new formatNumber(document.getElementById('basicSalary'));
let monthlySaving = new formatNumber(document.getElementById('monthlySaving'));
let fees = new formatNumber(document.getElementById('fees'));
let efees = new formatNumber(document.getElementById('efees'));
let amount = new formatNumber(document.getElementById('amount'));