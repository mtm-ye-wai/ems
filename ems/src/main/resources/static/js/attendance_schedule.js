var countResult;
var loading = false;
var selectedDate = [];
$(function() {
    $("body").addClass("attendanceSchedule");
    if ($("#search-c-date")[0] != null) validateSCD();
    countResult = document.getElementsByClassName('t-count');
    for (let c of countResult)
        calculateTotal(c);
    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        showOtherMonths: true,
        selectOtherMonths: true,
        yearRange: "1800:2030",
    });
    $('.datepicker').attr("autocomplete", "off");
    //date range picker
    $("#search-date-range").daterangepicker({
        autoApply: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    //scroll to talbe
    if ($("#date-selections")[0] != null) scrollToTable();
    if ($("#check-all")[0] != null) checkAll();
    $('.date-picker').attr("autocomplete", "off");
    $('.view').click(function() {
        $('#deptId').val($(this).prev().val());
    });

    $('.check-lab').on('click', function(e) {
        e.preventDefault();
        if ($(this).parent().hasClass("no-permit")) return false;
        $("#btn-submit").removeAttr("disabled");
        var previousSibling = this.previousSibling;
        while (previousSibling && previousSibling.nodeType != 1) {
            previousSibling = previousSibling.previousSibling
        }
        $(this).toggleClass('active');
        if ($(this).hasClass("active")) {
            previousSibling.value = 1;
            checkAll();
        } else {
            previousSibling.value = 0;
            document.getElementById('check-all').checked = false;
        }
        $(this).prev().trigger("change")
    });

    $(".day-index").on("change", function() {
        var index = Number($(this).data("col"));
        calculateTotal(countResult[index]);
    })
    //check_all
    $("#check-all").on("change", function(e) {
        e.preventDefault();
        $("#btn-submit").removeAttr("disabled");
        if ($(this).is(":checked")) {
            $(".check-lab").each(function() {
                if (!$(this).parent().hasClass("no-permit"))
                    $(this).addClass("active");
            });
            $(".day-index").each(function() {
                if (!$(this).parent().hasClass("no-permit"))
                    $(this).val("1")
            });
        } else {
            $(".check-lab").each(function() {
                if (!$(this).parent().hasClass("no-permit"))
                    $(this).removeClass("active");
            });
            $(".day-index").each(function() {
                if (!$(this).parent().hasClass("no-permit"))
                    $(this).val("0")
            });
        }
        $(".day-index").trigger("change")
    });

    //date
    setDate();
    //date filter
    $(".m-switch").on("click", function() {
        var cur = $("#search-date");
        var curdate = cur.val().trim().length == 0 ? $("#default-date").text().replaceAll("/", "-") :
            cur.val();
        var d = curdate.split("-");
        var month = (Number(d[1]));
        var year = Number(d[0]);
        if ($(this).hasClass("date-s-p")) {
            if (month == 1) {
                year--;
                month = 12;
            } else {
                month--;
            }
        } else if ($(this).hasClass("date-s-n")) {
            if (month == 12) {
                year++;
                month = 1;
            } else {
                month++;
            }
        }
        var strMonth = month < 10 ? "0" + month : month;
        cur.val(year + "-" + strMonth);
        cur.trigger("change");
    });
    var guessFoc = false;
    $("#search-date").on("change", function() {
        if (guessFoc) return false;
        extraFromSubmit()
    });

    $("#search-btn").on("click", function() {
        extraFromSubmit();
    });

    $("#search-date").on("blur", function() {
        guessFoc = false;
        $(this).trigger("change");
    });
    //emp name search
    $("#emp-search").on("change", function() {
        var val = this.value.trim();
        if (val.length == 0) {
            this.value = "";
        };
        extraFromSubmit()
    });
    //manager filters
    $("#filter-manager").on("change", function() {
        var val = this.value.trim();
        if (val.length == 0) {
            this.value = "";
            return false;
        };
        extraFromSubmit()
    })
    //search input enter
    $(".search-inps").on("keydown", function(e) {
        if (e.key === 'Enter') {
            if ($(this).hasClass("emps")) {
                $(this).trigger("change")
            }
            this.blur();
        } else {
            guessFoc = true;
        }
    })
    //Search monthly , weekly, daily
    $("#search-c-date").on("change", function() {
        extraFromSubmit();
    })
    //monthly weekly change
    $("#search-filter-type").on('change', function() {
        extraFromSubmit();
    })
    //monthly weekly switch btns
    $(".mwd-switch").on("click", function() {
        var filtertype = $("#search-filter-type");
        var search = $("#search-c-date");
        if ($(this).hasClass("date-s-p")) { //previous
            if (filtertype.val() == "0") {
                search[0].value = changeMonthly(new Date(convertDDMMYYtoDate(search[0].value)), false);
            } else {
                search[0].value = changeWeekly(new Date(convertDDMMYYtoDate(search[0].value)), false);
            }
        } else { //next
            if (filtertype.val() == "0") {
                search[0].value = changeMonthly(new Date(convertDDMMYYtoDate(search[0].value)), true);
            } else {
                search[0].value = changeWeekly(new Date(convertDDMMYYtoDate(search[0].value)), true);
            }
        }
        search.trigger('change');
    });
    $(".inv-lab").on('click', function(e) {
        e.preventDefault();
        //$("#click-alert-modal").modal();
    });
    $(".permission-lab").on('click', function(e) {
        e.preventDefault();
        $("#permission-alert-modal").modal();
    });
    //row down select
    $(document).on('click', '.down', function(e) {
        if ($(this).hasClass('down-dis')) return false;
        e.preventDefault();
        var currentIndex = Number($(this).data("index"));
        var initialIndex = Number($(".table-footer").data("emp-size"));
        let date = this.dataset['date'];

        $("#permission-icon").remove();
        if ($(this).hasClass("active")) {
            $(this).removeClass("date-selections active");
            $("#d-" + (currentIndex)).removeClass("date-selections");
            for (let i = 0; i < initialIndex; i++) {
                $("#days-" + i + "_" + currentIndex).parent().removeClass("date-selections");
            }
            selectedDate = selectedDate.filter(d => d != date);
        } else {
            $(this).addClass("date-selections active");
            $("#d-" + (currentIndex)).addClass("date-selections");
            for (let i = 0; i < initialIndex; i++) {
                $("#days-" + i + "_" + currentIndex).parent().addClass("date-selections");
            }
            selectedDate.push(date);
        }
    });
    $(document).on("contextmenu", ".down.date-selections.active, .days.date-selections", contextMenu);
    //lock selected row
    $(document).on("click", ".lock-selected-row", function(e) {
        e.preventDefault();
        var dataIndex = [];
        $(".down.date-selections.active").each(function() {
            dataIndex.push(Number(this.innerText.trim()) - 1);
        });
        var orgDate = $("#search-c-date")[0].value;
        var date = orgDate.split("/")[1] + "/" + orgDate.split("/")[2];
        $.ajax({
            type: "GET",
            url: window.mainURL + "/attendanceSchedule/permission?date=" + date + "&index=" + dataIndex.toString(),
            processData: false,
            contentType: false,
            beforeSend: function() {
                loading = true;
                $("#permit").css({ display: "inline-block" })
                $("#permit").removeClass("fas fa-shield-alt");
                $("#permit")[0].innerHTML = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                            <circle cx="50" cy="50" fill="none" stroke="#504141" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                                              <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                                            </circle>
                                            <!-- [ldio] generated by https://loading.io/ --></svg>`;
            },
            success: function(data) {
                loading = false;
                $("#permit")[0].innerHTML = ``;
                $("#permit").addClass("fas fa-check");
                $("#context-div").blur();
                if ($('td.date-selections').hasClass('no-permit') ) {
                    $('td.date-selections').removeClass('no-permit');
                } else {
                    $('td.date-selections').addClass('no-permit');
                }
            },
            error: function(e) {
                console.log(e)
            }
        })
    });
    //toggle Check
    $(document).on("click", ".toggle-check", function(e) {
        e.preventDefault();
        var dataIndex = [];
        var allEmpCount = Number($(".table-footer").data("emp-size"));
        var xary = [];
        $(".down.date-selections.active").each(function() {
            dataIndex.push(Number($(this).data("index")));
            var index = Number($(this).data("index"));

            for (let x = 0; x < allEmpCount; x++) {
                var y = (document.getElementById("days-" + x + "_" + index));
                xary.push($(y).next()[0]);
            }
        });
        var check = true;
        for (let i = 0; i < xary.length; i++) {
            if (!$(xary[i]).hasClass('active')) {
                check = false;
                break;
            }
        }
        if (check) {
            xary.forEach(a => {
                $(a).removeClass("active");
                $(a).prev()[0].value = 0;
            });
        } else {
            xary.forEach(a => {
                $(a).addClass("active");
                $(a).prev()[0].value = 1;
            });
        }
        $(".t-count").each(function() { calculateTotal(this) })
        $("#context-div").blur()
    });

});

function contextMenu(e) {
    if (loading) return false;
    var readOnly = document.getElementById('readOnly').value == 'true';
    if(readOnly) return false;
    e.preventDefault();
    var div = document.createElement("div");
    var disabled = "";
    var disabledLock = ``;
    if ($("#managerId")[0] != null) {
        if ($("#managerId")[0].value.trim() == 0
            || $("#readOnly")[0].value == "true") {
            disabled = `disabled="disabled"`;
        }
    }
    if ($("#filter-manager")[0] != null) {
        if ($("#filter-manager")[0].value != 0 || $("#saveOption")[0].value == "true"
            || $("#readOnly")[0].value == "true") {
            disabledLock = `disabled="disabled"`;
        }
    }
    var countSelection = document.querySelectorAll("th.down.days.date-selections").length;
    var disabledDownload = "";
    console.log(countSelection)
    if (countSelection != 1) {
        disabledDownload = `disabled="disabled"`;
    }

    $(div).addClass("context-menu");
    div.id = "context-div";
    //$(div).css({border: "1.5px solid"})
    $(div).attr("tabindex", "-1");
    if (utype != null && utype != 3) {
        div.innerHTML = `<button class="list lock-selected-row justify-content-between" ${disabledLock}><span class="d-flex align-items-center"><i class="fas fa-shield-alt mr-1 context-menu-ico" id="permit"></i>Lock Permission</span><i class="far fa-question-circle tool-tip" data-toggle="tooltip" data-placement="right" title="Lock permission from editing!"></i></button>
        <button class="list toggle-check justify-content-between" ${disabled}><span class="pr-3"><i class="fas fa-check-double mr-1 context-menu-ico"></i>Toggle Select</span><i class="far fa-question-circle tool-tip" data-toggle="tooltip" data-placement="right" title="Select/Unselect"></i></button>
        <button class="list download-excel justify-content-between" ${disabledDownload}><span class="pr-3"><i class="fa fa-file-pdf mr-1 context-menu-ico"></i>Download Excel</span><i class="far fa-question-circle tool-tip" data-toggle="tooltip" data-placement="right" title="Download"></i></button>`;
    } else {
        div.innerHTML = `<button class="list toggle-check justify-content-between" ${disabled}><span class="pr-3"><i class="fas fa-check-double mr-1 context-menu-ico"></i>Toggle Select</span><i class="far fa-question-circle tool-tip"  data-placement="right" data-toggle="tooltip" title="Select/Unselect"></i></button>`;
    }
    var rect = document.body.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    $(div).css({ top: y + "px", left: x + "px" });
    $(this).css({ position: "relative" });
    $('body').append(div);
    $(div).focus()
    $(div).on('blur', function(event) {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        $(this).remove();
    });
    $('[data-toggle="tooltip"]').tooltip();
}
function extraFromSubmit() {
    var form = document.getElementById('extra-form');
    var manager = $('#filter-manager');
    var searchByDate = $('#search-date');
    var filters = $("#search-filter-type");
    var searchByFilter = $("#search-c-date");
    var empName = $("#emp-search");
    var data = ``;
    data += manager[0] == null ? '' : `<input type='hidden' name='managerId' value='${manager[0].value}'>`;
    if (searchByDate[0] != null) {
        var date = searchByDate[0].value;
        var dateSplit = date.split('-');
        var fmtDate = "01/" + dateSplit[1] + "/" + dateSplit[0];
        var ftDate = calculateFromDateToDate(convertDDMMYYtoDate(fmtDate), '0');
        var year = dateSplit.length == 3 ? dateSplit[1] : dateSplit.length == 2 ? dateSplit[0] : dateSplit[0];
        var month = dateSplit.length == 3 ? dateSplit[2] : dateSplit.length == 2 ? dateSplit[1] : dateSplit[1];
        data += `<input hidden="hidden" name="date" value="${month}/${year}">
        <input type='hidden' name='from' value='${ftDate.from}'>
        <input type='hidden' name='to' value='${ftDate.to}'>`;
    }
    data += filters[0] == null ? '' : `<input type='hidden' name='filterType' value='${filters[0].value}'>`;
    if (searchByFilter[0] != null) {
        var scdata = calculateFromDateToDate(convertDDMMYYtoDate(searchByFilter[0].value), filters[0].value);
        var dateSplit = searchByFilter[0].value.split("/");
        var month = dateSplit.length == 3 ? dateSplit[1] : dateSplit.length == 2 ? dateSplit[0] : dateSplit[0];
        var year = dateSplit.length == 3 ? dateSplit[2] : dateSplit.length == 2 ? dateSplit[1] : dateSplit[1];
        data += `<input hidden="hidden" name="from" value="${scdata.from}">
        <input hidden="hidden" name="to" value="${scdata.to}">
        <input hidden="hidden" name="markDate" value="${searchByFilter[0].value}">
        <input hidden="hidden" name="date" value="${month}/${year}">`;
    }
    data += empName[0] == null ? '' : `<input type='hidden' name='empName' value='${empName[0].value}'>`;
    form.innerHTML = data;
    form.submit();
}
function changeMonthly(date = new Date(), direction = true) {
    if (direction)
        return formatDDMMYY(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    else
        return formatDDMMYY(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
}

function changeWeekly(date = new Date(), direction = true) {
    if (direction) {
        return formatDDMMYY(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
    } else {
        return formatDDMMYY(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
    }
}

function validateSCD() {
    var val = $("#search-c-date")[0].value;
    if (val.split("/").length != 3) {
        $("#search-c-date")[0].value = "01/" + val;
    }
}
function calculateTotal(element) {
    var count = element.dataset['count'];
    var empList = $(".table-footer").data("emp-size");
    var total = 0;
    for (let x = 0; x < empList; x++) {
        var z = document.getElementById("days-" + x + "_" + count);
        if (z != null && (z.value == "1" || z.value == 1)) {
            total++;
        }
    }
    element.innerHTML = `<strong>${total}</strong>`;
}
function setDate() {
    var date = $("#date")[0].value.trim();
    var d = date.split('/');
    if (d.length == 2) {
        $("#search-date").val(d[1] + "-" + d[0]);
    }
    if (d.length == 3) {
        $("#search-date").val(d[2] + "-" + d[1]);
    }
}
function checkAll() {
    var check = true;
    if ($(".check-lab").length) {
        $('.check-lab').each(function() {
            if ($(this).parent().hasClass("no-permit")) return false;
            if (!$(this).hasClass("active")) {
                check = false;
                return false;
            }
        });
    } else {
        check = false;
    }

    if (check) {
        document.getElementById('check-all').checked = true;
    } else {
        document.getElementById('check-all').checked = false;
    }
}
function calculateFromDateToDate(date = new Date(), filterType = "0") {
    var data = { from: "", to: "" };
    if (filterType == "0") {
        data.from = getFirstDayOfMonth(date.getFullYear(),
            date.getMonth());
        data.to = getLastDayOfMonth(date.getFullYear(),
            date.getMonth());
    } else if (filterType == "1") {
        data.from = getFirstDayOfWeekByDate(date);
        data.to = getLastDayOfWeekByDate(date);
    } else {
        date.from = formatDDMMYY(date);
        data.to = formatDDMMYY(date);
    }
    return data;
}
function getFirstDayOfWeekByDate(date = new Date()) {
    var firstday = date.getDate() - (date.getDay());
    return formatDDMMYY(new Date(date.setDate(firstday)));
}
function getLastDayOfWeekByDate(date = new Date()) {
    var lastday = date.getDate() - (date.getDay()) + 6;
    return formatDDMMYY(new Date(date.setDate(lastday)));
}
function getFirstDayOfMonth(year, month) {
    return formatDDMMYY(new Date(year, month, 1));
}
function getLastDayOfMonth(year, month) {
    return formatDDMMYY(new Date(year, month + 1, 0));
}
function formatDDMMYY(date = new Date()) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    return day + '/' + month + '/' + year;
}
function convertDDMMYYtoDate(format) {
    var dd = format.split("/");
    var day = dd[0];
    var month = dd[1];
    var year = dd[2];
    return new Date(month + "/" + day + "/" + year);
}
function scrollToTable() {
    document.getElementById("date-selections").scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
    });
}
//download directly
$('#excel').click(function(e) {
    e.preventDefault();
    var form = document.getElementById("excelDownloadForm");
    let fromdate = document.getElementById("exc-date");
    $(".date-error").remove();
    if (fromdate.value == '') {
        $($(`<span class="text-danger date-error">Please choose date!</span>`)).insertAfter($(fromdate));
    } else {
        let fromFmt = formatDDMMYY(new Date(fromdate.value));
        document.getElementById("exc-from-date").value = fromFmt;
        form.submit();
        $('#excelModal').modal('hide');
    }
});

//download manually
$(document).on("click", ".download-excel", function() {
    var form = document.getElementById("excelDownloadForm");
    var selected = document.querySelectorAll("th.down.days.date-selections")[0];
    var date = $(selected).data("date");
    document.getElementById("exc-from-date").value = date;
    form.submit();
    $("#context-div").blur()
});

