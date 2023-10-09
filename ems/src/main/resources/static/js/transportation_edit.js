var today = new Date();
var startDate = $("#startDate").val().split("/");
var lastDate = new Date(startDate[2] + 1, 11, 31);
$(function () {
    $('#startDate').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: '0',
        yearRange: '-0:+1',
        maxDate: lastDate,
        hideIfNoPrevNext: true
    });
});

$(".alert").delay(3000).addClass("in").fadeOut(2000);

$('#employee_id').change(function (event) {
    var empId = $(this).find('option:selected').val();
    if (empId) {
        $.each(list, function (index, value) {
            var bb = value.toString();
            var splitName = bb.split(',');
            if (splitName[0] == empId) {
                $('#nameMsg').text(splitName[1]);
                $('#employeeName').val(splitName[1]);
            }
        });
    } else {
        $('#nameMsg').text("");
        $('#employeeName').val("");
    }

});