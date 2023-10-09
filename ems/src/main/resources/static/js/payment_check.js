$(document).ready(function () {
    var empListSize = $("#attendanceEmpSize").val();
    if (empListSize > 30) {
        if (!$('#attendance-body').hasClass('all-check')) {
            $('#attendance-body').addClass('all-check');
        }
    } else {
        if ($('#attendance-body').hasClass('all-check')) {
            $('#attendance-body').removeClass('all-check');
        }
    }
});

$('#calculatedYear').change(function () {
    $('#searchYearMonth').click();
});

$('#calculatedMonth').change(function () {
    $('#searchYearMonth').click();
});

$(".alert").delay(3000).addClass("in").fadeOut(2000);
$('#payment').click(function () {
    var myErrAlert = document.getElementById("myErrAlert");
    myErrAlert.innerHTML = "<strong>All Employee's data are not correct. Check Again!</strong>";
    $('#myErrAlert').fadeIn().delay(1000).addClass("in")
        .fadeOut(2000);
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
});

$("#attendance").click(function () {
    removeCheckColor();
});

function checkEmployee(empId, routeIdx) {
    removeCheckColor();
    var checkEmp = "#checkedEmpId" + routeIdx;
    $(checkEmp).addClass("checkEmpIdColor");
    var year = $('#calculatedYear').val();
    var month = $('#calculatedMonth').val();
    $("#goToCheckAttendSingle").attr("href",
        "compareAttendee?isSingle=true&empId=" + empId + "&year=" + year + "&month=" + month);
    $("#goToCheckAttendAll").attr("href",
        "compareAttendee?isSingle=false&empId=" + empId + "&year=" + year + "&month=" + month);
}

var empSize = $("#attendanceEmpSize").val();
function removeCheckColor() {
    for (var i = 0; i < empSize; i++) {
        var emp = "#checkedEmpId" + i;
        if ($(emp).hasClass("checkEmpIdColor")) {
            $(emp).removeClass("checkEmpIdColor");
        }
    }
}