$(".alert").delay(3000).addClass("in").fadeOut(2000);
$("#update")
    .click(
        function () {
            var value = $('input[type="checkbox"]:checked').val();
            if (value == null) {
                var $type = $("#wfhStatus");
                var selectValue = $("option:selected", $type).val();

                if (selectValue === "1") {
                    document.getElementById('lblTitle').innerHTML = 'Request Work from Home';
                    document.getElementById('pText').innerHTML = 'Do you want to request?';
                    document.getElementById('btnUpdate').innerHTML = 'Request';
                } else if (selectValue === "2") {
                    document.getElementById('lblTitle').innerHTML = 'Approve Work from Home';
                    document.getElementById('pText').innerHTML = 'Do you want to approve?';
                    document.getElementById('btnUpdate').innerHTML = 'Approve';
                } else if (selectValue === "3") {
                    document.getElementById('lblTitle').innerHTML = 'Reject Work from Home';
                    document.getElementById('pText').innerHTML = 'Do you want to reject?';
                    document.getElementById('btnUpdate').innerHTML = 'Reject';
                } else {
                    document.getElementById('lblTitle').innerHTML = 'Update Work from Home';
                    document.getElementById('pText').innerHTML = 'Do you want to update?';
                    document.getElementById('btnUpdate').innerHTML = 'Update';
                }
            } else {
                document.getElementById('lblTitle').innerHTML = 'Delete Work from Home';
                document.getElementById('pText').innerHTML = 'Do you want to delete?';
                document.getElementById('btnUpdate').innerHTML = 'Delete';
            }
        });

var myErrAlert = document.getElementById("myErrAlert");
var fromDateError = document.getElementById("fromDateError");
var toDateError = document.getElementById("toDateError");
var fromTimeError = document.getElementById("fromTimeError");
var toTimeError = document.getElementById("toTimeError");
myErrAlert.style.display = "none";
fromDateError.style.display = "none";
toDateError.style.display = "none";
var leaveArr = new Map();

$(document).on("click", "#show", function (event) {
    $('#time-err').text('');
    $('#leave-err').text('');
    if (validate()) {
        $.ajax({
            type: "POST",
            url: "getAttendanceDateList",
            data: new FormData(document.getElementById("registerWFHForm")),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            success: function (response, status, xhr) {
                var ct = xhr.getResponseHeader("content-type") || "";
                if (ct.indexOf('html') > -1) {
                    window.location.reload();
                    return;
                }
                if (response && response.length > 0) {
                    showAttendances(JSON.parse(response));
                }
            },
            error: function (e) {
				$("#mytbody tr").remove();
                $('#shift-data-empty-err').text(e.responseText);
            }
        });
    }
});

function showAttendances(attendances) {
    var tbody = document.getElementById("mytbody");
    $('#shift-data-empty-err').text('');
    $("#mytbody tr").remove();
    attendances
        .forEach(function (attendance) {
            var row = document.getElementById("wfhDetailTable")
                .getElementsByTagName("tr").length - 1;
            var tr = document.createElement("tr");
            var tdDate = document.createElement("td");
            tdDate.classList.add("text-right");
            var lblDate = document.createElement("label");
            lblDate.innerHTML = attendance.recordDate;
            var tdFromTime = document.createElement("td");
            tdFromTime.classList.add("right");
            var tdToTime = document.createElement("td");
            tdToTime.classList.add("right");
            var tdAttendance = document.createElement("td");
            tdAttendance.classList.add("text-center");
            var tdWfhStatus = document.createElement("td");
            tdWfhStatus.classList.add("text-center");
            var tdDescription = document.createElement("td");
            var tdAction = document.createElement("td");
            tdAction.classList.add("text-center");
            tdDate.innerHTML = '<input type="hidden" id="wfhRegisterFormList'
                + row
                + '.recordDate" name="wfhRegisterFormList['
                + row
                + '].recordDate" value= "' + attendance.recordDate + '" class="recordDate" />';
            tdDate.appendChild(lblDate);
            tdFromTime.innerHTML = '<input type="time" id="wfhRegisterFormList'
                + row
                + '.fromTime" name="wfhRegisterFormList['
                + row
                + '].fromTime" value= "'
                + attendance.arrivalTime
                + '" class="form-control"/>';
            tdToTime.innerHTML = '<input type="time" id="wfhRegisterFormList'
                + row
                + '.toTime" name="wfhRegisterFormList['
                + row
                + '].toTime" value= "'
                + attendance.leaveTime
                + '" class="form-control"/>';
            tdAttendance.innerHTML = '<input type="checkbox" id="wfhRegisterFormList'
                + row
                + '.isWFH" name="wfhRegisterFormList['
                + row
                + '].isWFH" class="pointer attendance-checkbox" />';
            tdWfhStatus.innerHTML = '<select class="form-control pointer wfh-status" id="wfhRegisterFormList'
                + row
                + '.wfhStatus" name="wfhRegisterFormList['
                + row
                + '].wfhStatus" disabled="true">'
                + getWFHStatusList();
                +'</select>';
            tdDescription.innerHTML = '<textarea id="wfhRegisterFormList'
                + row
                + '.description" name="wfhRegisterFormList['
                + row
                + '].description" cols="30" tabindex="4"  class="form-control"></textarea>';
            tdAction.innerHTML = '<input type="hidden" id="detailNo'
                + row
                + '" value= '
                + row
                + ' class="detailNo" />'
                +'<a href="#" class="text-danger text-decoration-none" id="wfhDetailDelete"><i class="fa fa-trash-alt pr-2"></i>Delete</a>';
            tr.appendChild(tdDate);
            tr.appendChild(tdFromTime);
            tr.appendChild(tdToTime);
            tr.appendChild(tdAttendance);
            tr.appendChild(tdWfhStatus);
            tr.appendChild(tdDescription);
            tr.appendChild(tdAction);
            tbody.appendChild(tr);
            row++;
            $('html,body').animate({
                scrollTop: 670
            }, 'fast')
        });
}

function duplicateRow(e) {
    var detailNo = parseInt($('.table tbody tr').last().find('.detailNo').val()) + 1;
    var tr = $(e.parentNode).closest('tr');
    var next = tr.next();
    if(tr.find('.recordDate').val() === next.find('.recordDate').val()) {
        next.remove();
    }
    var cloneTr = tr.clone();
    cloneTr.find('td:eq(0) input')
    .prop('id', 'wfhRegisterFormList' + detailNo + '.recordDate')
    .prop('name', 'wfhRegisterFormList[' + detailNo + '].recordDate');
    cloneTr.find('td:eq(1) input')
    .prop('id', 'wfhRegisterFormList' + detailNo + '.fromTime')
    .prop('name', 'wfhRegisterFormList[' + detailNo + '].fromTime');
    cloneTr.find('td:eq(2) input')
    .prop('id', 'wfhRegisterFormList' + detailNo + '.toTime')
    .prop('name', 'wfhRegisterFormList[' + detailNo + '].toTime');
    cloneTr.find('td:eq(5) textarea')
    .prop('id', 'wfhRegisterFormList' + detailNo + '.description')
    .prop('name', 'wfhRegisterFormList[' + detailNo + '].description');
    cloneTr.find('.attendance-checkbox')
    .prop("checked", !cloneTr.find('.attendance-checkbox').is(':checked'))
    .prop('id', 'wfhRegisterFormList' + detailNo + '.isWFH')
    .prop('name', 'wfhRegisterFormList[' + detailNo + '].isWFH');
    cloneTr.find('.wfh-status')
    .prop('disabled', !cloneTr.find('.attendance-checkbox').is(':checked'))
    .prop('id', 'wfhRegisterFormList' + detailNo + '.wfhStatus')
    .prop('name', 'wfhRegisterFormList[' + detailNo + '].wfhStatus')
    cloneTr.find('.wfh-status').val(1);
    tr.after(cloneTr);
    sortingWFHList();
}

function getHolidays() {
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    $.ajax({
        type: "POST",
        url: "getHolidays?fromDate=" + fromDate + "&toDate=" + toDate,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function (response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            if (response && response.length > 0) {
                var tmpMsg = "";
                for (i = 0; i < response.length; i++) {
                    if (tmpMsg != "") {
                        tmpMsg += ", " + response[i];
                    } else {
                        tmpMsg += response[i];
                    }
                }
                var holidayErrorMsg;
                if (response.length == 1) {
                    holidayErrorMsg = "[" + tmpMsg + "] is a holiday date!";
                } else if (response.length > 1) {
                    holidayErrorMsg = "[" + tmpMsg + "] are holiday dates!";
                }
                $('#holiday-date-err').text(holidayErrorMsg);
            } else {
                $('#holiday-date-err').text('');
            }
        },
        error: function (ex) {
            console.log("error");
        }
    });
}

function validate() {
    var from = document.getElementsByName("fromDate")[0].value;
    var to = document.getElementsByName("toDate")[0].value;
    // Check date with regular expression to match required date format
    re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

    if (!from || !to) {
        if (!from) {
            fromDateError.innerHTML = "<span>From Date is a required field</span>";
            fromDateError.style.display = "block";
        } else {
            fromDateError.style.display = "none";
        }
        if (!to) {
            toDateError.innerHTML = "<span>To Date is a required field</span>";
            toDateError.style.display = "block";
        } else {
            toDateError.style.display = "none";
        }
        return false;
    } else if ((from != '' && !from.match(re)) || (to != '' && !to.match(re))) {
        if (from != '' && !from.match(re)) {
            fromDateError.innerHTML = "<span>Invalid date format(dd/mm/yyyy)</span>";
            fromDateError.style.display = "block";
        } else {
            fromDateError.style.display = "none";
        }
        if (to != '' && !to.match(re)) {
            toDateError.innerHTML = "<span>Invalid date format(dd/mm/yyyy)</span>";
            toDateError.style.display = "block";
        } else {
            toDateError.style.display = "none";
        }
        return false;
    } else {
        fromDateError.style.display = "none";
        toDateError.style.display = "none";
        var fromDate = from.split("/");
        var toDate = to.split("/");
        var startDate = new Date(fromDate[2], fromDate[1] - 1, fromDate[0]);
        var endDate = new Date(toDate[2], toDate[1] - 1, toDate[0]);

        if (startDate.getTime() > endDate.getTime()) {
            myErrAlert.innerHTML = "<strong>From Date cannot be greater than To Date</strong>";
            $("#myErrAlert").fadeIn().delay(3000).addClass("in").fadeOut(2000);
            return false;
        }
    }
    return true;
}

var wfhListSize = parseInt($('#wfhListSize').val());
for (i = 0; i < wfhListSize; i++) {
    var fromTimeDivId = "#fromTimeErr" + i;
    var toTimeDivId = "#toTimeErr" + i;
    var descriptionDivId = "#descriptionErr" + i;
    if ($('.fromTimeError' + i).html() != ''
        && $('.fromTimeError' + i).html() != undefined) {
        $('.fromTimeError' + i).remove();
        $(fromTimeDivId)
            .append(
                '<span class="text-danger">From Time is a required field</span>');
    }
    if ($('.toTimeError' + i).html() != ''
        && $('.toTimeError' + i).html() != undefined) {
        $('.toTimeError' + i).remove();
        $(toTimeDivId).append(
            '<span class="text-danger">To Time is a required field</span>');
    }
}

$('.table tbody')
    .on(
        'click',
        '#wfhDetailDelete',
        function () {
            $(this).closest('tr').remove();
            sortingWFHList();
        });

function sortingWFHList() {
    var wfhTable = document.getElementById("mytbody").rows;
    for (i = 0; i < wfhTable.length; i++) {
        wfhTable[i].cells[0].children[0].id = "wfhRegisterFormList"
            + i + ".recordDate";
        wfhTable[i].cells[0].children[0].name = "wfhRegisterFormList["
            + i + "].recordDate";
        wfhTable[i].cells[1].children[0].id = "wfhRegisterFormList"
            + i + ".fromTime";
        wfhTable[i].cells[1].children[0].name = "wfhRegisterFormList["
            + i + "].fromTime";
        wfhTable[i].cells[2].children[0].id = "wfhRegisterFormList"
            + i + ".toTime";
        wfhTable[i].cells[2].children[0].name = "wfhRegisterFormList["
            + i + "].toTime";
        wfhTable[i].cells[3].children[0].id = "wfhRegisterFormList"
            + i + ".isWFH";
        wfhTable[i].cells[3].children[0].name = "wfhRegisterFormList["
            + i + "].isWFH";
        let _attendance = wfhTable[i].cells[3].lastElementChild.name;
        if(_attendance.includes('_wfhRegisterFormList')) {
            wfhTable[i].cells[3].lastElementChild.name = "_wfhRegisterFormList["
            + i + "].isWFH";
        }
        wfhTable[i].cells[4].children[0].id = "wfhRegisterFormList"
            + i + ".wfhStatus";
        wfhTable[i].cells[4].children[0].name = "wfhRegisterFormList["
            + i + "].wfhStatus";
        wfhTable[i].cells[5].children[0].id = "wfhRegisterFormList"
            + i + ".description";
        wfhTable[i].cells[5].children[0].name = "wfhRegisterFormList["
            + i + "].description";
    }
}

function getWFHStatusList() {
    var options = '';
    var statusArr = strMapToArray(listStatus);
    for(var i = 0; i < statusArr.length; i++) {
        var status = statusArr[i];
        options += `<option value='${status[0]}'>${status[1]}</option>`;
    }
    return options;
}
  
function strMapToArray(str) {
    var strMap = str.substring(1, str.length-1);
    var jsonObj = strMap.split(",").reduce((obj, item) => {
        let [key, value] = item.trim().split("=");
        obj[key] = value;
        return obj;
    }, {});
    return jsonToArray(jsonObj);
}

function jsonToArray(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push([key, json[key]]);
    });
    return result;
}

$('.table tbody').on('change', '.attendance-checkbox', function(e) {
    var attendanceCount = 0;
    var wfhCount = 0;
    var recordCount = 0;
    var recordDate = $(e.target).closest('tr').find('td:first').text();
    var tb = $('.table tbody');
    tb.find("tr").each(function(index, element) {
        let date = $(element).find('td:first').text();
        if(recordDate === date) {
            let isAttendance = $(element).find('.attendance-checkbox')[0].checked;
            isAttendance ? attendanceCount++ : wfhCount++;
            recordCount++;
        }
    });
    if(recordCount > 1 && (wfhCount > 1 || attendanceCount > 1)) {
        $(e.target).closest('tr').find('.attendance-checkbox')[0].checked = !$(e.target).closest('tr').find('.attendance-checkbox')[0].checked;
    } else {
        changeStatusDropdown(e);   
    }
});

function changeStatusDropdown(e) {
    if(e.target.checked) {
        $(e.target).closest('tr').find('.wfh-status').prop("disabled", false);
    } else {
        $(e.target).closest('tr').find('.wfh-status').prop("disabled", true);
    }
}