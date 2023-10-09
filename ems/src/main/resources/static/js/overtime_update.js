$(function() {
    $(document).ready(function() {
        let floatTtime = timeStringToFloat($("#toTime").val());
        let floatFtime = timeStringToFloat($("#fromTime").val());
        let overTime = floatTtime - floatFtime;
        if (floatFtime < 12 && floatTtime > 13) {
            overTime = overTime - 1;
        }
        $("#overTime").attr("value", overTime ? overTime.toFixed(2) : 0);
        /* $("#overTimeTbl").append("<span class=text-center>" + overTime + "</span>"); */
        $("#fromTime").change(function() {
            let floatTtime = timeStringToFloat($("#toTime").val());
            let floatFtime = timeStringToFloat($("#fromTime").val());
            let overTime = floatTtime - floatFtime;
            if (floatFtime < 12 && floatTtime > 13) {
                overTime = overTime - 1;
            }
            $("#overTime").attr("value", overTime ? overTime.toFixed(2) : 0);
        });
        $("#toTime").change(function() {
            let floatTtime = timeStringToFloat($("#toTime").val());
            let floatFtime = timeStringToFloat($("#fromTime").val());
            let overTime = floatTtime - floatFtime;
            if (floatFtime < 12 && floatTtime > 13) {
                overTime = overTime - 1;
            }
            $("#overTime").attr("value", overTime ? overTime.toFixed(2) : 0);
        });
        function timeStringToFloat(time) {
            if (!time) {
                return 0;
            }

            var hoursMinutes = time.split(/[.:]/);
            var hours = parseInt(hoursMinutes[0], 10);
            var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
            return hours + minutes / 60;
        }

        $('#excel').click(function() {
            $('#excelModal').modal('hide')
        });

        $('#pdf').click(function() {
            $('#pdfModal').modal('hide')
        });
    });
});

$("#update").click(function(e) {
	var value = $('input[name="delFlag"]:checked').val();
	var modal;
	if (value == null) {
		var $type = $("#overtimeStatus");
		var selectValue = $("option:selected", $type).val();
		if (selectValue === "1") {
			modal = '#requestModal';
		} else if (selectValue === "2") {
			modal = '#approveModal';
		} else if (selectValue === "3") {
			modal = '#rejectModal';
		} else {
			modal = '#updateModal';
		}
	} else {
		modal = '#deleteModal';
	}
	e.preventDefault();
	$(modal).css('display', 'block');
	$('body').addClass('reduce-zindex');
});

var requestTbl = $('.overtime-request #datatable')
    .DataTable(
        {
            "searching": false,
            "paging": false,
            "info": false,
            "ordering": false,
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": "no-sort"
            }, {
                "targets": [3, 11],
                "type": 'extract-date',
            }],
            "language": {
                "paginate": {
                    "previous": "<<",
                    "next": ">>"
                }
            },
            dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
                + "<'row'<'col-md-12'<'table-responsive'tr>>>"
                + "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
            "order": [[1, 'asc']]
        });

requestTbl.draw();

var t = $('.overtime-history #datatable')
    .DataTable(
        {
            "searching": false,
            "paging": false,
            "info": false,
            "ordering": false,
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": "no-sort"
            }, {
                "targets": [3, 9, 11],
                "type": 'extract-date',
            }],
            "language": {
                "paginate": {
                    "previous": "<<",
                    "next": ">>"
                }
            },
            dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
                + "<'row'<'col-md-12'<'table-responsive'tr>>>"
                + "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
            "fixedColumns": {
                leftColumns: 3
            }
        });

t.on('order.dt search.dt', function() {
    t.column(0, {
        search: 'applied',
        order: 'applied'
    }).nodes().each(function(cell, i) {
        cell.innerHTML = i + 1;
    });
}).draw();

var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
if (paginate_buttons.length > 2) {
    $('#datatable_paginate').show();
} else {
    $('#datatable_paginate').hide();
}
$(".alert").delay(3000).addClass("in").fadeOut(2000);

var reqListSize = $('.list_size_ellipsis').val();
function overtimeRequest() {
    var userType = $('#userType').val();
    var flag = false;
    var hasCheck = false;
    for (var i = 0; i < reqListSize; i++) {
        var checkedId = "#" + i + "chbox";
        var oTypeId = "#" + i + "oType";
        var checked = $(checkedId).prop("checked");
        var oType = $(oTypeId).val();
        if (checked) {
            hasCheck = true;
            if (oType == 1) {
                flag = true;
            }
        }
    }

    if (hasCheck) {
        if (!flag) {
            if ($('#btnApprove').hasClass("inactive")) {
                $('#btnApprove').removeClass("inactive");
            }
            if ($('#btnApprove').attr("disabled")) {
                $('#btnApprove').removeAttr("disabled");
            }
        } else {
            if (!$('#btnApprove').hasClass("inactive")) {
                $('#btnApprove').addClass("inactive");
            }
            if ($('#btnApprove').attr("disabled") == undefined) {
                $('#btnApprove').attr('disabled', true);
            }
        }
        if ($('#btnReject').hasClass("inactive")) {
            $('#btnReject').removeClass("inactive");
        }
        if ($('#btnReject').attr("disabled")) {
            $('#btnReject').removeAttr("disabled");
        }
    } else {
        if (!$('#btnApprove').hasClass("inactive")) {
            $('#btnApprove').addClass("inactive");
        }
        if (!$('#btnReject').hasClass("inactive")) {
            $('#btnReject').addClass("inactive");
        }
        if ($('#btnApprove').attr("disabled") == undefined) {
            $('#btnApprove').attr('disabled', true);
        }
        if ($('#btnReject').attr("disabled") == undefined) {
            $('#btnReject').attr('disabled', true);
        }
    }
}

function appDis() {
    var select = document.getElementById("otFeeType");
    var value = select.value;
    if (value == 1 && $("#loginId").val() == 1 && ($("#overtimeStatus").val() == 2 || $("#overtimeStatus").val() == 7)) {
        $("#update").attr("disabled", true);
    } else {
        $("#update").attr("disabled", false);
    }
}

$(document).ready(function() {
    var t = $('#otTable').DataTable({
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 'no-sort'
        },
        {
            "type": "date-uk",
            "targets": 2
        },
        {
            "type": "my-month",
            "targets": 4
        }],
        "language": {
            "paginate": {
                "previous": "<<",
                "next": ">>"
            }
        },
        dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>" +
            "<'row'<'col-md-12'<'table-responsive'tr>>>" +
            "<'row'<'col-sm-5'i>>" +
            "<'row'<'col-sm-12'p>>",
    });

    t.on('order.dt search.dt', function() {
        t.column(0, {
            search: 'applied',
        }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
    if (paginate_buttons.length > 2) {
        $('#datatable_paginate').show();
    } else {
        $('#datatable_paginate').hide();
    }

    if ($("#updatePage").val() == "overtimeUpdate") {
        appDis();
    }
});

function detail(id) {
    $("#detailModal").modal();
    var output = "";
    $.ajax({
        type: "POST",
        url: "getDetailCompensatory?empId=" + id,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function(response, status, xhr) {
            if (response == "" || response == null) {
                output += "<div class='text-center'>No Compensatory Has Been Taken Yet!</div>";;
            } else {
                output += "<div class='text-center'>" + response[0] + "'s Compensatory</div>";
                for (var i = 1; i < response.length; i++) {
                    output += "<div class='row w-75 mx-auto text-center'><div class='col-md-6 border  border-dark'>" + response[i].split(",")[0] + "</div><div class='col-md-6 border border-dark'>" + response[i].split(",")[1] + " hr used</div></div>";
                }
            }
            document.getElementById("detailBody").innerHTML = output;
        },
        error: function(ex) {
            console.log("error");
        }
    });
}