$(function () {
    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        yearRange: "1800:2030",
    });
    $('.datepicker').attr("autocomplete", "off");

});
