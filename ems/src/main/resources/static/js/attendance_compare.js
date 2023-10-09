var tdArriveE = 0;
var tdArriveF = 0;
var tdDepartE = 0;
var tdDepartF = 0;

$(document).ready(function () {
    $('#datatable').DataTable({
        "scrollY": "250px",
        "scrollCollapse": true,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columnDefs": [{
            "width": "400px",
            "targets": 6
        }],
    });
    // alertCompareColor();
    finalResultColor();
});

$('.tdArriveE').click(function () {
    if (tdArriveE == 0) {
        if (tdArriveF == 1) {
            tdArriveF = 0;
            $(".tdArriveF").css("background", "#eee");
            $('#timeArrive').val($(".tdArriveF").text());
            $(".tdLateF").css("background-color", "#eee");
            $('#timeLate').val($(".tdLateF").text());
        }
        tdArriveE = 1;
        $(".tdArriveE").css("background-color", "#03a9f4");
        $('#timeArrive').val($(".tdArriveE").text());
        $(".tdLateE").css("background-color", "#03a9f4");
        $('#timeLate').val($(".tdLateE").text());
    } else {
        tdArriveE = 0;
        $(".tdArriveE").css("background", "#eee");
        $('#timeArrive').val($(".tdArriveE").text());
        $(".tdLateE").css("background-color", "#eee");
        $('#timeLate').val($(".tdLateE").text());
    }
    if (tdArriveE == 0 && tdArriveF == 0) {
        $('#timeArrive').val($(".tdArriveE").text());
        $('#timeLate').val($(".tdLateE").text());
    }
});

$('.tdDepartE').click(function () {
    if (tdDepartE == 0) {
        if (tdDepartF == 1) {
            tdDepartF = 0;
            $(".tdDepartF").css("background", "#fff");
            $('#timeDepart').val($(".tdDepartF").text());
            $(".tdEarlyF").css("background-color", "#fff");
            $('#timeEarly').val($(".tdEarlyF").text());
        }
        tdDepartE = 1;
        $(".tdDepartE").css("background", "#03a9f4");
        $('#timeDepart').val($(".tdDepartE").text());
        $(".tdEarlyE").css("background-color", "#03a9f4");
        $('#timeEarly').val($(".tdEarlyE").text());
    } else {
        tdDepartE = 0;
        $(".tdDepartE").css("background", "#fff");
        $('#timeDepart').val($(".tdDepartE").text());
        $(".tdEarlyE").css("background-color", "#fff");
        $('#timeEarly').val($(".tdEarlyE").text());
    }
    if (tdDepartE == 0 && tdDepartF == 0) {
        $('#timeDepart').val($(".tdDepartE").text());
        $('#timeEarly').val($(".tdEarlyE").text());
    }
});

$('.tdArriveF').click(function () {
    if (tdArriveF == 0) {
        if (tdArriveE == 1) {
            tdArriveE = 0;
            $(".tdArriveE").css("background", "#eee");
            $('#timeArrive').val($(".tdArriveE").text());
            $(".tdLateE").css("background-color", "#eee");
            $('#timeLate').val($(".tdLateE").text());
        }
        tdArriveF = 1;
        $(".tdArriveF").css("background-color", "#03a9f4");
        $('#timeArrive').val($(".tdArriveF").text());
        $(".tdLateF").css("background-color", "#03a9f4");
        $('#timeLate').val($(".tdLateF").text());
    } else {
        tdArriveF = 0;
        $(".tdArriveF").css("background", "#eee");
        $('#timeArrive').val($(".tdArriveF").text());
        $(".tdLateF").css("background-color", "#eee");
        $('#timeLate').val($(".tdLateF").text());
    }
    if (tdArriveE == 0 && tdArriveF == 0) {
        $('#timeArrive').val($(".tdArriveE").text());
        $('#timeLate').val($(".tdLateE").text());
    }
});

$('.tdDepartF').click(function () {
    if (tdDepartF == 0) {
        if (tdDepartE == 1) {
            tdDepartE = 0;
            $(".tdDepartE").css("background", "#fff");
            $('#timeDepart').val($(".tdDepartE").text());
            $(".tdEarlyE").css("background-color", "#fff");
            $('#timeEarly').val($(".tdEarlyE").text());
        }
        tdDepartF = 1;
        $(".tdDepartF").css("background", "#03a9f4");
        $('#timeDepart').val($(".tdDepartF").text());
        $(".tdEarlyF").css("background-color", "#03a9f4");
        $('#timeEarly').val($(".tdEarlyF").text());
    } else {
        tdDepartF = 0;
        $(".tdDepartF").css("background", "#fff");
        $('#timeDepart').val($(".tdDepartF").text());
        $(".tdEarlyF").css("background-color", "#fff");
        $('#timeEarly').val($(".tdEarlyF").text());
    }
    if (tdDepartE == 0 && tdDepartF == 0) {
        $('#timeDepart').val($(".tdDepartE").text());
        $('#timeEarly').val($(".tdEarlyE").text());
    }
});
$("tr td#iconTD").click(function (e) {

    console.log("click");
    var item = $(this).closest("tr");

    var col0 = item.find('td:eq(0)').text();
    console.log(col0);

    var col1 = item.find('td:eq(1)').text();
    var col2 = item.find('td:eq(2)').text();
    var col3 = item.find('td:eq(3)').text();
    var col4 = item.find('td:eq(4)').text();

    var col6 = item.find('td:eq(6)').text();
    var col7 = item.find('td:eq(7)').text();
    var col8 = item.find('td:eq(8)').text();
    var col9 = item.find('td:eq(9)').text();

    $('.dateM').text(col0);
    $('.tdArriveE').text(col1);
    $('.tdArriveF').text(col6);

    $('.tdDepartE').text(col2);
    $('.tdDepartF').text(col7);

    $('.tdLateE').text(col3);
    $('.tdLateF').text(col8);

    $('.tdEarlyE').text(col4);
    $('.tdEarlyF').text(col9);

    $('#timeArrive').val(col1);
    console.log($('#timeArrive').val());
    $('#timeLate').val(col3);

    $('#timeDepart').val(col2);
    $('#timeEarly').val(col4);

    setDefaultToCopareModal();
    $("#compareEditModal").modal("toggle");
});

$(document)
    .on(
        "click",
        "#editData",
        function (e) {
            $('#timeArriveS').removeAttr('style');
            $('#timeDepartS').removeAttr('style');
            $("#error-msg").text('');
            var item = $(this).closest("tr");
            var col0 = item.find('td:eq(0)').text().trim();
            var col1 = item.find('td:eq(1)').text().trim();
            var col2 = item.find('td:eq(2)').text().trim();
            var col3 = item.find('td:eq(3)').text().trim();
            var col4 = item.find('td:eq(4)').text().trim();
            var col5 = item.find('td:eq(5)').text().trim();
            var col6 = item.find('.rowIndex').val();
            var hiddenWFHRecordId = "attendanceList" + col6
                + ".wfhHiddenRecordId";
            var hiddenWFHArrive = "attendanceList" + col6
                + ".hiddenArrivalTime";
            var hiddenWFHDept = "attendanceList" + col6
                + ".hiddenLeaveTime";
            var hiddenLeavePeriod = "attendanceList" + col6
                + ".leavePeriod";
            var hiddenLeaveType = "attendanceList" + col6
                + ".leaveType";
            var hiddencol1 = document.getElementById(hiddenWFHRecordId).value;
            var hiddencol2 = document.getElementById(hiddenWFHArrive).value;
            var hiddencol3 = document.getElementById(hiddenWFHDept).value;
            var hiddencol4 = document.getElementById(hiddenLeavePeriod).value;
            var hiddencol5 = document.getElementById(hiddenLeaveType).value;

            $("#fingerprintDiv").hide();
            $('#editfinal').hide();
            $('#compare-btn-group').addClass('justify-content-center');
            $("#wfhDiv").hide();
            $("#leaveDiv").hide();

            var statusArr = col5.split(',');
            if (statusArr.length == 1 && statusArr[0] == "Leave"
                && hiddencol4 != "Full") {
                $("#ggDate").text(col0);
                $("#timeArriveS").val(col1);
                $("#timeDepartS").val(col2);
                /* $("#timeLateS").val(col3); */
                /* $("#timeEarlyS").val(col4); */
                /* $("#fingerprintDiv").show(); */
                document.getElementById("fingerprintDiv").style.display = "block";
                $('#editfinal').show();
                $('#compare-btn-group').removeClass('justify-content-center');
            }

            for (var i = 0; i < statusArr.length; i++) {
                if (statusArr[i] == "WFH") {
                    if (hiddencol1) {
                        $("#wfhDate").text(col0);
                        $("#timeWFHArriveS").text(hiddencol2);
                        $("#timeWFHDepartS").text(hiddencol3);
                    } else {
                        $("#wfhDate").text(col0);
                        $("#timeWFHArriveS").text(col1);
                        $("#timeWFHDepartS").text(col2);
                    }

                    /* $("#wfhDiv").show(); */
                    document.getElementById("wfhDiv").style.display = "block";
                }
                if (statusArr[i] == "Fingerprint" || statusArr[i] == "") {
                    $("#ggDate").text(col0);
                    $("#timeArriveS").val(col1);
                    $("#timeDepartS").val(col2);
                    /* $("#timeLateS").val(col3); */
                    /* $("#timeEarlyS").val(col4); */
                    /* $("#fingerprintDiv").show(); */
                    document.getElementById("fingerprintDiv").style.display = "block";
                    $('#editfinal').show();
                    $('#compare-btn-group').removeClass('justify-content-center');
                }
                if (statusArr[i] == "Leave") {
                    $("#leaveDate").text(col0);
                    $("#leavePeriod").text(hiddencol4);
                    $("#leaveType").text(hiddencol5);
                    /* $("#leaveDiv").show(); */
                    document.getElementById("leaveDiv").style.display = "block";
                }
            }
            $("#setLeaveAndManualModal").modal("toggle");

            $("button#editfinal")
                .click(
                    function (e) {
                        let timeArriveS = $('#timeArriveS').val(), timeDepartS = $('#timeDepartS').val();
                        let timeArrive = modalValidate(timeArriveS, "timeArriveS");
                        let timeDepart = modalValidate(timeDepartS, "timeDepartS");

                        if (!(timeArrive && timeDepart)) {
                            $("#error-msg").text("Arrival time and Departure time are required fields!");
                            $("#error-msg").css('color', 'red');
                            return false;
                        }
                        var date = $("#ggDate").text();
                        var fingerprintDiv = document
                            .getElementById("fingerprintDiv").style.display;
                        var wfhDiv = document
                            .getElementById("wfhDiv").style.display;
                        var date = "";
                        var arriveTime = "";
                        var departTime = "";
                        var wfhArriveS = "";
                        var wfhDepartS = "";
                        var arriveTimestamp = $("#timeArriveS")
                            .val().split(" ");
                        var departTimestamp = $("#timeDepartS")
                            .val().split(" ");
                        var error = 0;
                        if (arriveTimestamp[0] > departTimestamp[0]) {
                            error = 1;
                        }

                        if (arriveTimestamp[1] == departTimestamp[1]) {
                            if (arriveTimestamp[0] > departTimestamp[0]) {
                                error = 1;
                            }
                        }

                        if (error != 0) {
                            $("#error-msg").text("Arrival time is greater than departure time!");
                            $("#error-msg").css('color', 'red');
                            return false;
                        }
                        if (fingerprintDiv == "block"
                            && wfhDiv == "none") {
                            date = $("#ggDate").text();
                            arriveTime = arriveTimestamp[0];
                            departTime = departTimestamp[0];
                        }
                        if (wfhDiv == "block"
                            && fingerprintDiv == "none") {
                            date = $("#wfhDate").text();
                            arriveTime = $("#timeWFHArriveS")
                                .text();
                            departTime = $("#timeWFHDepartS")
                                .text();
                        }

                        if (wfhDiv == "block"
                            && fingerprintDiv == "block") {
                            date = $("#ggDate").text();
                            arriveTime = arriveTimestamp[0];
                            departTime = departTimestamp[0];
                            wfhArriveS = $("#timeWFHArriveS")
                                .text();
                            wfhDepartS = $("#timeWFHDepartS")
                                .text();
                        }

                        var leaveTbl = document
                            .getElementById("leaveDiv").style.display;
                        var leavePeriod = $("#leavePeriod")
                            .text();
                        var late = 0;
                        var early = 0;
                        if (arriveTime) {
                            var speArrive = arriveTime
                                .split(':');
                            var hr = Number(speArrive[0]);
                            var min = Number(speArrive[1]);

                            var time = (hr * 60) + min;

                            var startMin = 480;

                            if (leaveTbl != "none"
                                && leavePeriod
                                && leavePeriod == "Morning") {
                                startMin = 780;
                            }
                            if (time >= startMin) {
                                late = time - startMin;
                            }
                        }

                        if (departTime) {
                            var speArrive = departTime
                                .split(':');
                            var hr = Number(speArrive[0]);
                            var min = Number(speArrive[1]);

                            var time = (hr * 60) + min;

                            var startMin = 1020;
                            if (leaveTbl != "none"
                                && leavePeriod
                                && leavePeriod == "Evening") {
                                startMin = 720;
                            }

                            if (time <= startMin) {
                                early = startMin - time;
                            }
                        }
                        var lateTime = late;
                        var earlyTime = early;
                        if (!lateTime && arriveTime) {
                            lateTime = 0;
                        }
                        if (!earlyTime && departTime) {
                            earlyTime = 0;
                        }
                        var wfhdate = $("#wfhDate").text();
                        var t = $('#datatable').DataTable();
                        var rowData = t.row(item).data();
                        var rowId = findRows(date, 0);
                        if (rowId != -1) {
                            var rowData = t.row(rowId).data();
                            rowData[1] = arriveTime
                                + '<input id="attendanceList'
                                + rowId
                                + '.arrivalTime" name="attendanceList['
                                + rowId
                                + '].arrivalTime" type="hidden" value="'
                                + arriveTime
                                + '">'
                                + '<input id="attendanceList'
                                + rowId
                                + '.hiddenArrivalTime" name="attendanceList['
                                + rowId
                                + '].hiddenArrivalTime" type="hidden" value="'
                                + wfhArriveS + '">';
                            rowData[2] = departTime
                                + '<input id="attendanceList'
                                + rowId
                                + '.leaveTime" name="attendanceList['
                                + rowId
                                + '].leaveTime" type="hidden" value="'
                                + departTime
                                + '">'
                                + '<input id="attendanceList'
                                + rowId
                                + '.hiddenLeaveTime" name="attendanceList['
                                + rowId
                                + '].hiddenLeaveTime" type="hidden" value="'
                                + wfhDepartS + '">';
                            rowData[3] = lateTime
                                + '<input id="attendanceList'
                                + rowId
                                + '.lateMinutes" name="attendanceList['
                                + rowId
                                + '].lateMinutes" type="hidden" value="'
                                + lateTime + '">';
                            rowData[4] = earlyTime
                                + '<input id="attendanceList'
                                + rowId
                                + '.earlyLeaveMin" name="attendanceList['
                                + rowId
                                + '].earlyLeaveMin" type="hidden" value="'
                                + earlyTime + '">';
                            t.row(rowId).data(rowData).draw();
                            // editCompare(rowId, arriveTime,
                            // departTime, lateTime,
                            // earlyTime);
                            finalResultColor();
                        }
                    });
        });

function modalValidate(validData, name) {
    switch (validData) {
        case null:
        case "":
            $('#' + name).css("border", "1px solid #f10808");
            return false;
        default:
            return true;
    }
}

$(document)
    .on(
        "click",
        "#markAsAbsent",
        function (e) {
            var item = $(this).closest("tr");
            var firstColumn = item.find('td').first().clone(true)
                .text();
            var date = firstColumn.substring(0, 10);
            var rowId = findRows(date, 0);
            var absentFlag = item.find(".absentFlag");
            var flag = "absent";
            console.log(item);
            if (absentFlag.val() == "false") {
                if (item.hasClass("markSpecial")) {
                    item.removeClass("markSpecial");
                }
                item.addClass("markAbsent");
                $(this)
                    .removeClass(
                        "text-danger text-decoration-none btn-delete ml-2");
                $(this).addClass(
                    "text-warning text-decoration-none ml-2");
                /* $(this).text("Unmark Absent"); */
                $(this).text("");
                var unmark = '<i class="fas fa-paint-brush pr-2"></i>Unmark Absent';
                $(this).append(unmark);
                absentFlag.val("true");
                // matchAbsentOrSpecialColor(rowId, flag);
                var specialFlag = item.find(".specialFlag");
                if (specialFlag.val() == "true") {
                    $(this)
                        .closest("tr")
                        .find("#specialAsAbsent")
                        .removeClass(
                            "text-warning text-decoration-none ml-2");
                    $(this)
                        .closest("tr")
                        .find("#specialAsAbsent")
                        .addClass(
                            "text-decoration-none ml-2");
                    $(this).closest("tr").find("#specialAsAbsent")
                        .text("");
                    var marks = '<i class="fas fa-paint-brush pr-2"></i>Mark Special';
                    $(this).closest("tr").find("#specialAsAbsent")
                        .append(marks);
                    specialFlag.val("false");
                }
                var unpaidFlag = item.find(".unpaidFlag");
                if (unpaidFlag.val() == "true") {
                    $(this)
                        .closest("tr")
                        .find("#unpaid")
                        .removeClass(
                            "text-warning text-decoration-none ml-2");
                    $(this)
                        .closest("tr")
                        .find("#unpaid")
                        .addClass(
                            "text-decoration-none ml-2");
                    $(this).closest("tr").find("#unpaid")
                        .text("");
                    var marks = '<i class="fas fa-paint-brush pr-2"></i>Mark Unpaid';
                    $(this).closest("tr").find("#unpaid")
                        .append(marks);
                    unpaidFlag.val("false");
                }
            } else {
                if (item.hasClass("markAbsent")) {
                    item.removeClass("markAbsent");
                }
                if (item.hasClass("markSpecial")) {
                    item.removeClass("markSpecial");
                }
                $(this).removeClass(
                    "text-warning text-decoration-none ml-2");
                $(this)
                    .addClass(
                        "text-danger text-decoration-none btn-delete ml-2");
                /* $(this).text("Mark Absent"); */
                $(this).text("");
                var mark = '<i class="fas fa-paint-brush pr-2"></i>Mark Absent';
                $(this).append(mark);
                absentFlag.val("false");
                // alertCompareColor();
            }
        });

$(document)
    .on(
        "click",
        "#specialAsAbsent",
        function (e) {
            var item = $(this).closest("tr");
            var firstColumn = item.find('td').first().clone(true)
                .text();
            var date = firstColumn.substring(0, 10);
            var rowId = findRows(date, 0);
            var specialFlag = item.find(".specialFlag");
            var flag = "special";
            console.log(item);
            if (specialFlag.val() == "false") {
                if (item.hasClass("markAbsent")) {
                    item.removeClass("markAbsent");
                }
                item.addClass("markSpecial");
                $(this).removeClass(
                    "text-decoration-none ml-2");
                $(this).addClass(
                    "text-warning text-decoration-none ml-2");
                /* $(this).text("Unmark Special"); */
                $(this).text("");
                var unmark = '<i class="fas fa-paint-brush pr-2"></i>Unmark Special';
                $(this).append(unmark);
                specialFlag.val("true");
                // matchAbsentOrSpecialColor(rowId, flag);
                var absentFlag = item.find(".absentFlag");
                if (absentFlag.val() == "true") {
                    $(this)
                        .closest("tr")
                        .find("#markAsAbsent")
                        .removeClass(
                            "text-warning text-decoration-none ml-2");
                    $(this)
                        .closest("tr")
                        .find("#markAsAbsent")
                        .addClass(
                            "text-danger text-decoration-none btn-delete ml-2");
                    $(this).closest("tr").find("#markAsAbsent")
                        .text("");
                    var marks = '<i class="fas fa-paint-brush pr-2"></i>Mark Absent';
                    $(this).closest("tr").find("#markAsAbsent").append(
                        marks);
                    absentFlag.val("false");
                }
                var unpaidFlag = item.find(".unpaidFlag");
                if (unpaidFlag.val() == "true") {
                    $(this)
                        .closest("tr")
                        .find("#unpaid")
                        .removeClass(
                            "text-warning text-decoration-none ml-2");
                    $(this)
                        .closest("tr")
                        .find("#unpaid")
                        .addClass(
                            "text-decoration-none ml-2");
                    $(this).closest("tr").find("#unpaid")
                        .text("");
                    var marks = '<i class="fas fa-paint-brush pr-2"></i>Mark Unpaid';
                    $(this).closest("tr").find("#unpaid")
                        .append(marks);
                    unpaidFlag.val("false");
                }
            } else {
                if (item.hasClass("markSpecial")) {
                    item.removeClass("markSpecial");
                }
                if (item.hasClass("markAbsent")) {
                    item.removeClass("markAbsent");
                }
                $(this).removeClass(
                    "text-warning text-decoration-none ml-2");
                $(this).addClass("text-decoration-none ml-2");
                /* $(this).text("Mark Special"); */
                $(this).text("");
                var mark = '<i class="fas fa-paint-brush pr-2"></i>Mark Special';
                $(this).append(mark);
                specialFlag.val("false");
                // alertCompareColor();
            }
        });

$(document)
    .on(
        "click",
        "#unpaid",
        function (e) {
            var item = $(this).closest("tr");
            var firstColumn = item.find('td').first().clone(true)
                .text();
            var date = firstColumn.substring(0, 10);
            var rowId = findRows(date, 0);
            var unpaidFlag = item.find(".unpaidFlag");
            var flag = "unpaid";
            if (unpaidFlag.val() == "false") {
                if (item.hasClass("markAbsent")) {
                    item.removeClass("markAbsent");
                }
                $(this).removeClass(
                    "text-decoration-none ml-2");
                $(this).addClass(
                    "text-warning text-decoration-none ml-2");
                $(this).text("");
                var unmark = '<i class="fas fa-paint-brush pr-2"></i>Unmark Unpaid';
                $(this).append(unmark);
                unpaidFlag.val("true");
                var absentFlag = item.find(".absentFlag");
                if (absentFlag.val() == "true") {
                    $(this)
                        .closest("tr")
                        .find("#markAsAbsent")
                        .removeClass(
                            "text-warning text-decoration-none ml-2");
                    $(this)
                        .closest("tr")
                        .find("#markAsAbsent")
                        .addClass(
                            "text-danger text-decoration-none btn-delete ml-2");
                    $(this).closest("tr").find("#markAsAbsent")
                        .text("");
                    var marks = '<i class="fas fa-paint-brush pr-2"></i>Mark Absent';
                    $(this).closest("tr").find("#markAsAbsent").append(
                        marks);
                    absentFlag.val("false");
                }
                var specialFlag = item.find(".specialFlag");
                if (specialFlag.val() == "true") {
                    $(this)
                        .closest("tr")
                        .find("#specialAsAbsent")
                        .removeClass(
                            "text-warning text-decoration-none ml-2");
                    $(this)
                        .closest("tr")
                        .find("#specialAsAbsent")
                        .addClass(
                            "text-decoration-none ml-2");
                    $(this).closest("tr").find("#specialAsAbsent")
                        .text("");
                    var marks = '<i class="fas fa-paint-brush pr-2"></i>Mark Special';
                    $(this).closest("tr").find("#specialAsAbsent")
                        .append(marks);
                    specialFlag.val("false");
                }
            } else {
                $(this).removeClass(
                    "text-warning text-decoration-none ml-2");
                $(this).addClass("text-decoration-none ml-2");
                $(this).text("");
                var mark = '<i class="fas fa-paint-brush pr-2"></i>Mark Unpaid';
                $(this).append(mark);
                unpaidFlag.val("false");
            }
        });

/*
 * function matchAbsentOrSpecialColor(rowId, valFlag) { var finalTable =
 * document.getElementById("final").rows; var tableRef =
 * document.getElementById("compareRows").rows; if (valFlag == "absent") {
 * tableRef[rowId].style.background = "#d9534f"; } if (valFlag == "special") {
 * tableRef[rowId].style.background = "#5CB85C"; } }
 */

function finalResultColor() {
    var finalTable = document.getElementById("final").rows;
    for (i = 0; i < finalTable.length; i++) {
        var arriveId = "attendanceList" + i + ".arrivalTime";
        var departId = "attendanceList" + i + ".leaveTime";
        var statusId = "attendanceList" + i + ".status";
        var leavePeriodId = "attendanceList" + i + ".leavePeriod";
        var arrive = document.getElementById(arriveId).value;
        var depart = document.getElementById(departId).value;
        var status = document.getElementById(statusId).value;
        var leavePeriod = document.getElementById(leavePeriodId).value;
        var statusArr = status.split(',');
        finalTable[i].style.background = "none";
        if (statusArr.length == 1) {
            if (!arrive || !depart) {
                if (!statusArr[0]) {
                    finalTable[i].style.background = "#f86e81";
                } else if (statusArr[0] != "Leave"
                    || (statusArr[0] == "Leave" && leavePeriod != "Full")) {
                    finalTable[i].style.background = "#FFD991";
                }
            }
        } else if (statusArr.length > 1) {
            finalTable[i].style.background = "#0fe5fb";
        } else {
            finalTable[i].style.background = "none";
        }
    }
}

// function alertCompareColor() {
// var finalTable = document.getElementById("final").rows;
// var tableRef = document.getElementById("compareRows").rows;
// for (i = 0; i < tableRef.length; i++) {
// var absentFlag =
// finalTable[i].cells[5].childNodes[4].attributes[3].nodeValue;
// var date = tableRef[i].cells[0].textContent;
// var attArrive = tableRef[i].cells[1].textContent;
// var attDep = tableRef[i].cells[2].textContent;
// var fpArrive = tableRef[i].cells[6].textContent;
// var fpDep = tableRef[i].cells[7].textContent;
// var attendance = attArrive.split(':');
// var attHr = Number(attendance[0]);
// var attMin = Number(attendance[1]);
// var fingerprint = fpArrive.split(':');
// var fpHr = Number(fingerprint[0]);
// var fpMin = Number(fingerprint[1]);
// if (attArrive == "" || attDep == "") {
// tableRef[i].style.background = "#FFD991";
// finalTable[i].style.background = "#FFD991";
// if (fpArrive == "" && fpDep == "") {
// tableRef[i].style.background = "#33ACFF";
// finalTable[i].style.background = "#33ACFF";
// }
// } else {
// var attHr = Number(attendance[0]);
// var attMin = Number(attendance[1]);
// var fingerprint = fpArrive.split(':');
// var fpHr = Number(fingerprint[0]);
// var fpMin = Number(fingerprint[1]);
// if (attHr < fpHr || (attHr == fpHr && attMin < fpMin)) {
// tableRef[i].style.background = "#ccf459";
// finalTable[i].style.background = "#ccf459";
// } else {
// tableRef[i].style.background = "none";
// finalTable[i].style.background = "none";
// }
// }
// }
// }

function editCompare(rowId, arriveTime, departTime, lateTime, earlyTime) {
    var tableRef = document.getElementById("compareRows").rows;
    var row2 = tableRef[rowId];
    row2.cells[1].textContent = arriveTime;
    row2.cells[2].textContent = departTime;
    row2.cells[3].textContent = lateTime;
    row2.cells[4].textContent = earlyTime;
}
function findRows(s, col) {
    var r = -1;
    var dat = $('#datatable').DataTable().column(col).data();
    var len = dat.length;
    for (var k = 0; k < len; k++) {
        if ((dat[k]).toLowerCase().includes(s.toLowerCase()))
            r = k;
    }
    return r;
}

$("button#row")
    .click(
        function (e) {
            var t = $('#datatable').DataTable();
            var date = $('.dateM').text();
            var arriveTime = $('#timeArrive').val();
            var lateTime = $('#timeLate').val();
            var departTime = $('#timeDepart').val();
            var earlyTime = $('#timeEarly').val();

            var rowId = findRows(date, 0);
            if (rowId != -1) {
                console.log("row update");
                var rowData = t.row(rowId).data();
                console.log(rowData);
                rowData[1] = arriveTime + '<input id="attendanceList'
                    + rowId + '.arrivalTime" name="attendanceList['
                    + rowId
                    + '].arrivalTime" type="hidden" value="'
                    + arriveTime + '">';
                rowData[2] = departTime + '<input id="attendanceList'
                    + rowId + '.leaveTime" name="attendanceList['
                    + rowId + '].leaveTime" type="hidden" value="'
                    + departTime + '">';
                rowData[3] = lateTime + '<input id="attendanceList'
                    + rowId + '.lateMinutes" name="attendanceList['
                    + rowId
                    + '].lateMinutes" type="hidden" value="'
                    + lateTime + '">';
                rowData[4] = earlyTime + '<input id="attendanceList'
                    + rowId
                    + '.earlyLeaveMin" name="attendanceList['
                    + rowId
                    + '].earlyLeaveMin" type="hidden" value="'
                    + earlyTime + '">';
                t.row(rowId).data(rowData).draw();
                editCompare(rowId, arriveTime, departTime, lateTime,
                    earlyTime);
                // alertCompareColor();
            } else {
                var nextRowId = t.data().length;
                var rowData = [
                    date + '<input id="attendanceList' + nextRowId
                    + '.recordDate" name="attendanceList['
                    + nextRowId
                    + '].recordDate" type="hidden" value="'
                    + date + '">',
                    arriveTime
                    + '<input id="attendanceList'
                    + nextRowId
                    + '.arrivalTime" name="attendanceList['
                    + nextRowId
                    + '].arrivalTime" type="hidden" value="'
                    + arriveTime + '">',
                    departTime + '<input id="attendanceList'
                    + nextRowId
                    + '.leaveTime" name="attendanceList['
                    + nextRowId
                    + '].leaveTime" type="hidden" value="'
                    + departTime + '">',
                    lateTime
                    + '<input id="attendanceList'
                    + nextRowId
                    + '.lateMinutes" name="attendanceList['
                    + nextRowId
                    + '].lateMinutes" type="hidden" value="'
                    + lateTime + '">',
                    earlyTime
                    + '<input id="attendanceList'
                    + nextRowId
                    + '.earlyLeaveMin" name="attendanceList['
                    + nextRowId
                    + '].earlyLeaveMin" type="hidden" value="'
                    + earlyTime + '">',
                    '<a class="col-green text-decoration-none btn-edit" id="editData"><i class="far fa-edit pr-2"></i>Edit</a>'];
                t.row.add(rowData).draw();
            }
            $("#compareEditModal").modal('hide');
        });

var lhr = 0;
var lmin = 0;
var fhrmin = 0;
// $('#timeArriveS').change(function(e) {
// var arrive = $("#timeArriveS").val();
// var wfharrive = $("#timeWFHArriveS").text();
// var leavePeriod = $("#leavePeriod").text();
// var wfhTbl = document.getElementById("wfhDiv").style.display;
// var leaveTbl = document.getElementById("leaveDiv").style.display;
// var late = "";
// if (arrive) {
// if (wfhTbl != "none" && wfharrive && wfharrive < arrive) {
// arrive = wfharrive;
// }
//
// var speArrive = arrive.split(':');
// f
// var hr = Number(speArrive[0]);
// var min = Number(speArrive[1]);
//
// // for hour
//
// var time = (hr * 60) + min;
//
// var startMin = 480;
// if (leaveTbl != "none" && leavePeriod && leavePeriod == "Morning") {
// startMin = 780;
// }
//
// if (time >= startMin) {
// late = time - startMin;
// }
// }
//
// $('#timeLateS').val(late);
// });
//
// $('#timeDepartS').change(function(e) {
// var arrive = $("#timeDepartS").val();
// var wfharrive = $("#timeWFHDepartS").text();
// var leavePeriod = $("#leavePeriod").text();
// var wfhTbl = document.getElementById("wfhDiv").style.display;
// var leaveTbl = document.getElementById("leaveDiv").style.display;
// var early = "";
// if (arrive) {
// if (wfhTbl != "none" && wfharrive && wfharrive > arrive) {
// arrive = wfharrive;
// }
// var speArrive = arrive.split(':');
// var hr = Number(speArrive[0]);
// var min = Number(speArrive[1]);
//
// var time = (hr * 60) + min;
//
// var startMin = 1020;
// if (leaveTbl != "none" && leavePeriod && leavePeriod == "Evening") {
// startMin = 720;
// }
//
// if (time <= startMin) {
// early = startMin - time;
// }
// }
// $('#timeEarlyS').val(early);
// });

function setDefaultToCopareModal() {
    tdArriveE = 0;
    tdArriveF = 0;
    tdDepartE = 0;
    tdDepartF = 0;
    /*
     * $(".tdArriveF").css("background", "#eee");
     * $(".tdLateF").css("background-color", "#eee")
     * $(".tdDepartF").css("background", "#fff");
     * $(".tdEarlyF").css("background-color", "#fff");
     * $(".tdArriveE").css("background", "#eee");
     * $(".tdLateE").css("background-color", "#eee")
     * $(".tdDepartE").css("background", "#fff");
     * $(".tdEarlyE").css("background-color", "#fff");
     */

    $(".tdArriveF").css("background", "#eee");
    $(".tdLateF").css({
        "text-align": "right",
        "background-color": "#eee"
    });
    $(".tdDepartF").css("background", "#fff");
    $(".tdEarlyF").css({
        "text-align": "right",
        "background-color": "#fff"
    });
    $(".tdArriveE").css("background", "#eee");
    $(".tdLateE").css({
        "text-align": "right",
        "background-color": "#eee"
    });
    $(".tdDepartE").css("background", "#fff");
    $(".tdEarlyE").css({
        "text-align": "right",
        "background-color": "#fff"
    });
    $("#timeArrive").css({
        "text-align": "right",
        "background-color": "#eee"
    });
    $("#timeLate").css({
        "text-align": "right",
        "background-color": "#eee"
    });
    $("#timeDepart").css({
        "text-align": "right",
        "background-color": "#eee"
    });
    $("#timeEarly").css({
        "text-align": "right",
        "background-color": "#eee"
    });
    /*
     * $("#timeLateS").css({"text-align": "right", "background-color": "#eee"});
     * $("#timeEarlyS").css({"text-align": "right", "background-color":
     * "#eee"});
     */
}

$(".alert").delay(3000).addClass("in").fadeOut(2000);