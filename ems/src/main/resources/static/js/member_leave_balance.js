$(document).ready(function() {
	drawLeftLeaveTable();
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
			if (lType == "TBD") {
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
	$('#useLeaveTbl').show();
	$('#compensatory-checkbox-div').hide();
	$('#leftLeaveTbl').hide();
	$('#excel-modal').attr("data-target", "#excelUsedModal")
	$('#pdf-modal').attr("data-target", "#pdfUsedModal")
	if (useSize > 0) {
		$('#export-icons-div').show();
	} else {
		$('#export-icons-div').hide();
	}
} else {
	$('.daterange').hide();
	$('#year').val($('#thisYear').val());
	$('#month').val($('#thisMonth').val());
	$('#useLeaveTbl').hide();
	$('#compensatory-checkbox-div').show();
	$('#leftLeaveTbl').show();
	$('#excel-modal').attr("data-target", "#excelLeftModal")
	$('#pdf-modal').attr("data-target", "#pdfLeftModal")
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
		$('#useLeaveTbl').show();
		$('#compensatory-checkbox-div').hide();
		$('#leftLeaveTbl').hide();
		$('#excel-modal').attr("data-target", "#excelUsedModal")
		$('#pdf-modal').attr("data-target", "#pdfUsedModal")
		if (useSize > 0) {
			$('#export-icons-div').show();
		} else {
			$('#export-icons-div').hide();
		}
	} else {
		$('.daterange').hide();
		$('#year').val($('#thisYear').val());
		$('#month').val($('#thisMonth').val());
		$('#useLeaveTbl').hide();
		$('#compensatory-checkbox-div').show();
		$('#leftLeaveTbl').show();
		$('#excel-modal').attr("data-target", "#excelLeftModal")
		$('#pdf-modal').attr("data-target", "#pdfLeftModal")
		if (leftSize > 0) {
			$('#export-icons-div').show();
		} else {
			$('#export-icons-div').hide();
		}
	}
	$(window).trigger('leftcomp');
});

$('.datatable').DataTable(
	{
		"columnDefs": [{
			"searchable": false,
			"orderable": false,
			"targets": 0
		}],
		dom: "<'row'<'col-sm-4'><'col-sm-5'p><'col-sm-3'>>"
			+ "<'row'<'col-sm-12'tr>>"
	}).draw();

var requestTbl = $('.leave-request-list #datatable')
	.DataTable(
		{
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 'no-sort'
			}, {
				"width": "200px",
				"targets": 10
			},],
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
			"scrollX": true,
			"autoWidth": false
		});
requestTbl.draw();

var historyTbl = $('.leave-history-list #datatable')
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
			"order": [[1, 'asc']],
			"scrollX": true
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
				"scrollX": true,
				"autoWidth": false,
				"scrollCollapse": true,
				"columnDefs": [{
					"searchable": false,
					"orderable": false,
					"targets": 'no-sort'
				}],
				"order": [[0, 'asc']],
			"drawCallback": function() {
				$('.dataTables_paginate .ellipsis').eq(1).remove();
			},
			"language": {
				paginate: {
					next: $(window).width() < 510 ? '&gt;&gt;' : 'Next',
					previous: $(window).width() < 510 ? '&lt;&lt;' : 'Previous'
				}
			}
		});
usedLeaveTbl.draw();

if ($(window).width() < 500) {
	$.fn.DataTable.ext.pager.numbers_length = 3;
}

if (usedLeaveTbl.data().count() === 0 || $(window).width() < 500) {
	$('#datatable_paginate, #datatable_info, #datatable_length').hide();
} else {
	$('#datatable_paginate, #datatable_info, #datatable_length').show();
}

/*var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
if (paginate_buttons.length > 2) {
	$('#datatable_paginate').show();
} else {
	$('#datatable_paginate').hide();
}*/

$('#useLeaveTbl #searchbox').on('keyup', function() {
	usedLeaveTbl.search(this.value).draw();
});

$(window).on('resize load leftcomp', function() {
	usedLeaveTbl.columns.adjust();
});


$('#compensatoryCheckbox').on('change', function() {
	showHideCompensatoryColumn()
	$(window).trigger('leftcomp');
})

function showHideCompensatoryColumn() {
	if ($('#compensatoryCheckbox:checked').length) {
		$(".compensatory-col").show();
	} else {
		$(".compensatory-col").hide();
	}
}
showHideCompensatoryColumn()
$(window).trigger('leftcomp');

function drawLeftLeaveTable() {
	$('#leftLeaveTbl #datatable').DataTable().destroy();
	var leftLeaveTbl = $('#leftLeaveTbl #datatable')
		.DataTable(
			{
				"scrollX": true,
				"autoWidth": false,
				"scrollCollapse": true,
				"columnDefs": [{
					"searchable": false,
					"orderable": false,
					"targets": 'no-sort'
				}],
				"order": [[0, 'asc']],
				"drawCallback": function(setting) {
					$('.dataTables_paginate .ellipsis').eq(1).remove();
					showHideCompensatoryColumn();
				},
				"language": {
				paginate: {
					next: $(window).width() < 510 ? '&gt;&gt;' : 'Next',
					previous: $(window).width() < 510 ? '&lt;&lt;' : 'Previous'
				}
			}
			});
	leftLeaveTbl.draw();
	if ($(window).width() < 500) {
	$.fn.DataTable.ext.pager.numbers_length = 3;
}

if (leftLeaveTbl.data().count() === 0 || $(window).width() < 500) {
	$('#datatable_paginate, #datatable_info, #datatable_length').hide();
} else {
	$('#datatable_paginate, #datatable_info, #datatable_length').show();
}

var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
if (paginate_buttons.length > 2) {
	$('#datatable_paginate').show();
} else {
	$('#datatable_paginate').hide();
}
	$('#leftLeaveTbl #searchbox').on('keyup', function() {
		leftLeaveTbl.search(this.value).draw();
	});

	$(window).on('resize load leftcomp', function() {
		leftLeaveTbl.columns.adjust();
	});

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

var employeeInfoTbl = $('.employee-info-list #datatable')
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
			"order": [[1, 'asc']]
		});

employeeInfoTbl.on('order.dt search.dt', function() {
	employeeInfoTbl.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
}).draw();