$(document).ready(function() {
	drawLeftLeaveTable();
	$('#btnApprove').attr('disabled', true);
	$('#btnReject').attr('disabled', true);
	$(".period").trigger('change');
});

$(".alert").delay(3000).addClass("in").fadeOut(2000);
function goBack() {
	window.history.back();
}
$('#excel').click(function() {
	$('#excelModal').modal('hide')
});

$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});

$('#excel-remain').click(function() {
	$('#excelLeftModal').modal('hide')
});

$('#pdf-remain').click(function() {
	$('#pdfLeftModal').modal('hide')
});

$('#excel-used').click(function() {
	$('#excelUsedModal').modal('hide')
});

$('#pdf-used').click(function() {
	$('#pdfUsedModal').modal('hide')
});

var reqListSize = $('.list_size_ellipsis').val();
function checkLeaveRequest() {
	var userType = $('#userType').val();
	var flag = false;
	var hasCheck = false;
	for (var i = 0; i < reqListSize; i++) {
		var checkedId = "#" + i + "chbox";
		var lTypeId = "#" + i + "ltype";
		var checked = $(checkedId).prop("checked");
		var lType = $(lTypeId).val();
		if (checked) {
			hasCheck = true;
			if (userType == "1" && lType == "TBD") {
				flag = true;
			}
		}

		var otDateId = "#" + i + "otdate";
		if (lType == "Compensatory") {
			$(otDateId).show();
		} else {
			$(otDateId).hide();
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

for (var i = 0; i < reqListSize; i++) {
	var lTypeId = "#" + i + "ltype";
	var lType = $(lTypeId).val();
	var otDateId = "#" + i + "otdate";
	if (lType == "Compensatory") {
		$(otDateId).show();
	} else {
		$(otDateId).hide();
	}
}

var useOrLeft = $('#useOrLeft').val();
var leftSize = $('#left-size').val();
var useSize = $('#used-size').val();
if (useOrLeft == "2") {
	$('.daterange').show();
	$('.cut-off-date').hide();
	$('#useLeaveTbl').show();
	$('#compensatory-checkbox-div').hide();
	$('#leftLeaveTbl').hide();
	if (useSize > 0) {
		$('#export-icons-div').show();
	} else {
		$('#export-icons-div').hide();
	}
} else {
	$('.daterange').hide();
	$('.cut-off-date').show();
	$('#year').val($('#thisYear').val());
	$('#month').val($('#thisMonth').val());
	$('#useLeaveTbl').hide();
	$('#compensatory-checkbox-div').show();
	$('#leftLeaveTbl').show();
	if (leftSize > 0) {
		$('#export-icons-div').show();
	} else {
		$('#export-icons-div').hide();
	}
}

$('#useOrLeft').change(function() {
	var useOrLeft = $(this).val();
	var leftSize = $('#left-size').val();
	var useSize = $('#used-size').val();
	if (useOrLeft == "2") {
		$('.daterange').show();
		$('.cut-off-date').hide();
		$('#useLeaveTbl').show();
		$('#compensatory-checkbox-div').hide();
		$('#leftLeaveTbl').hide();
		if (useSize > 0) {
			$('#export-icons-div').show();
		} else {
			$('#export-icons-div').hide();
		}
	} else {
		$('.daterange').hide();
		$('.cut-off-date').show();
		$('#year').val($('#thisYear').val());
		$('#month').val($('#thisMonth').val());
		$('#useLeaveTbl').hide();
		$('#compensatory-checkbox-div').show();
		$('#leftLeaveTbl').show();
		if (leftSize > 0) {
			$('#export-icons-div').show();
		} else {
			$('#export-icons-div').hide();
		}
	}
});

$('#export-excel').click(function() {
	var useOrLeft = $('#useOrLeft').val();
	if (useOrLeft == "2") {
		$('#excelUsedModal').modal('show');
	} else {
		$('#excelLeftModal').modal('show');
	}
});

$('#export-pdf').click(function() {
	var useOrLeft = $('#useOrLeft').val();
	if (useOrLeft == "2") {
		$('#pdfUsedModal').modal('show');
	} else {
		$('#pdfLeftModal').modal('show');
	}
});

$('.datatable').DataTable(
	{
		"columnDefs": [{
			"searchable": false,
			"orderable": false,
			"targets": 0
		}, {
			"targets": [4, 7, 8, 9],
			"type": 'extract-date',
		}],
		dom: "<'row'<'col-sm-4'><'col-sm-5'p><'col-sm-3'>>"
			+ "<'row'<'col-sm-12'tr>>"
	}).draw();

var requestTbl = $('.leave-request-list #datatable')
    .DataTable(
        {
            "scrollX": true,
            "autoWidth": false,
            "scrollCollapse": true,
            "searching": false,
            "paging": false,
            "info": false,
            "ordering": false,
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 'no-sort'
            }, {
                "targets": [5],
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
            "order": [[1, 'asc']],
            // "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]]
        }).draw();

$(window).on('resize load', function () {
    requestTbl.columns.adjust();
});

var historyTbl = $('.leave-history-list #datatable')
	.DataTable(
		{
			"searching": false,
			"paging": false,
			"info": false,
			"ordering": false,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 'no-sort'
			}, {
				"targets": [4, 7, 8, 9],
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
			"order": [[1, 'asc']],
			fixedColumns: {
				leftColumns: 3
			}
		});

historyTbl.on('order.dt search.dt', function() {
	historyTbl.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
}).draw();

var usedLeaveTbl = $('#useLeaveTbl #datatable')
	.DataTable(
		{
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 'no-sort'
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
			"order": [[0, 'asc']],
		});
usedLeaveTbl.draw();

$('#compensatoryCheckbox').on('change', function() {
	drawLeftLeaveTable();
})

function showHideCompensatoryColumn() {
	if ($('#compensatoryCheckbox:checked').length) {
		$(".compensatory-col").show();
	} else {
		$(".compensatory-col").hide();
	}
}

function drawLeftLeaveTable() {
	$('#leftLeaveTbl #datatable').DataTable().destroy();
	var leftLeaveTbl = $('#leftLeaveTbl #datatable')
		.DataTable(
			{
				"searching": false,
				"paging": false,
				"info": false,
				"ordering": false,
				dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
					+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
					+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
				"drawCallback": function(settings) {
					showHideCompensatoryColumn();
				}
			});
	leftLeaveTbl.draw();
}
var employeeTbl = $('.employee-list #datatable')
	.DataTable(
		{
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
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
			"order": [[1, 'asc']],
			"scrollX": true
		});

employeeTbl.on('order.dt search.dt', function() {
	employeeTbl.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
}).draw();

var employeeInfoTbl = $('.employee-info-list .cmn-tbl').DataTable({
	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		"targets": 'no-sort'
	}, {
		"targets": [7],
		"type": 'extract-date',
	}],
	"drawCallback": function() {
		$('.dataTables_paginate .ellipsis').eq(1).remove();
	},
	"order": [[1, 'asc']],
	"scrollX": true,
	"language": {
		paginate: {
			next: $(window).width() < 510 ? '&gt;&gt;' : 'Next',
			previous: $(window).width() < 510 ? '&lt;&lt;' : 'Previous'
		}
	}
});

if ($(window).width() < 500) {
	$.fn.DataTable.ext.pager.numbers_length = 3;
}

employeeInfoTbl.on('order.dt search.dt', function() {
	employeeInfoTbl.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
}).draw();


$('#searchbox').on('keyup', function() {
	employeeInfoTbl.search(this.value).draw();
});

$(window).on('resize click load', function() {
	employeeInfoTbl.columns.adjust();
});

$('#employee-export-excel').click(function() {
	$('#excelModal').css('display', 'block');
	$('body').addClass('reduce-zindex');
});

$('#employee-export-pdf').click(function() {
	$('#pdfModal').css('display', 'block');
	$('body').addClass('reduce-zindex');
});

var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
if (paginate_buttons.length > 2) {
	$('#datatable_paginate').show();
} else {
	$('#datatable_paginate').hide();
}

$('#export-excel').click(function() {
	$('#excelModal').modal('show');
});

$('#export-pdf').click(function() {
	$('#pdfModal').modal('show');
});

$('#managerId').on('change', function() {
	if (this.value === $('#loginUserId').val()) {
		$('#memberFlag').prop("checked", true);
	} else {
		$('#memberFlag').prop("checked", false);
	}
})

function changeLeaveType(select) {
	var id = select.id;
	var selectId = document.getElementById(id);
	var value = selectId.options[selectId.selectedIndex].value;
	var reqHours = 8.0;
	if (value == 1 || value == 2) {
		reqHours *= 0.5;
	} else if (value == 3) {
		reqHours *= 1.0;
	}
	var tempId = id.substring(7);
	var commonId = tempId.split("]")[0];
	var leftHour = document.getElementById(("leftHour[" + commonId + "]")).value;
	if (reqHours > leftHour) {
		$("#" + commonId + "ltype").find("option:contains(Compensatory)").hide();
	} else {
		$("#" + commonId + "ltype").find("option:contains(Compensatory)").show();
	}
}