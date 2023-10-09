$("#update").click(function(e) {
	var $type = $("#status");
	var selectValue = $("option:selected", $type).val();
	if (selectValue === "2") {
		modal = '#approveModal';
	} else if (selectValue === "3") {
		modal = '#rejectModal';
	} else {
		modal = '#updateModal';
	}
	e.preventDefault();
	$(modal).css('display', 'block');
	$('body').addClass('reduce-zindex');
});

$(document).ready(function() {
	$('#emp-name-list').val($('#employee-id').val());
	var deptForm = document.getElementById("deptForm");
	if (deptForm != null) {
		$.ajax({
			type: "POST",
			url: "getOldDeptByEmpId",
			data: new FormData(deptForm),
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			success: function(response, status, xhr) {
				var ct = xhr.getResponseHeader("content-type") || "";
				if (ct.indexOf('html') > -1) {
					window.location.reload();
					return;
				}
				if (response) {
					$('.old-dept').text(response);
				}
			},
			error: function(ex) {
				console.log("error");
			}
		});
	}
	var newDept = "";
	if ($('#departmentId').val()) {
		newDept = $('#departmentId').find('option:selected').text();
	}
	$('.new-dept').text(newDept);
});

$('#emp-name-list').change(function() {
	var empId = $(this).find('option:selected').val();
	var empName = $(this).find('option:selected').text();
	$('#employee-id').val(empId);
	if (empId) {
		$('#employee-name').val(empName);
	} else {
		$('#employee-name').val("");
	}
	$.ajax({
		type: "POST",
		url: "getOldDeptByEmpId",
		data: new FormData(document.getElementById("deptForm")),
		enctype: 'multipart/form-data',
		processData: false,
		contentType: false,
		success: function(response, status, xhr) {
			var ct = xhr.getResponseHeader("content-type") || "";
			if (ct.indexOf('html') > -1) {
				window.location.reload();
				return;
			}
			if (response) {
				$('.old-dept').text(response);
			}
		},
		error: function(ex) {
			console.log("error");
		}
	});
});

$('#departmentId').change(function() {
	var newDept = "";
	if ($('#departmentId').val()) {
		newDept = $(this).find('option:selected').text();
	}
	$('.new-dept').text(newDept);
});

$('.dept-change-btn').click(function() {
	var oldDept = $('.old-dept').text();
	var newDept = $('.new-dept').text();
	if (oldDept && newDept) {
		$('#show-save-change').show();
		$('#show-req-change').show();
		$('#show-approve-change').show();
	} else {
		$('#show-save-change').hide();
		$('#show-req-change').hide();
		$('#show-approve-change').hide();
	}
});

var requestList = $('.emp_dept_change_list #datatable')
	.DataTable(
		{
			"scrollX": true,
			"autoWidth": false,
			"scrollCollapse": true,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 'no-sort'
			}, {
				"targets": [5, 6],
				"type": 'extract-date',
			}],
			dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
			"order": [[1, 'asc']]
		});
		$('.emp_dept_change_list #searchbox').on('keyup', function () {
				requestList.search(this.value).draw();
			});

			$(window).on('resize load', function () {
				requestList.columns.adjust();
			});

requestList.draw();

var requestHistory = $('.emp_dept_change_history #datatable')
	.DataTable(
		{
			"scrollX": true,
			"autoWidth": false,
			"scrollCollapse": true,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": "no-sort"
			}, {
				"targets": [4, 5],
				"type": 'extract-date',
			}],
			dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
				"order": [[1, 'asc']],
			"fixedColumns": {
				leftColumns: 3
			}
		});
		$('.emp_dept_change_history #searchbox').on('keyup', function () {
				requestHistory.search(this.value).draw();
			});

			$(window).on('resize load', function () {
				requestHistory.columns.adjust();
			});

requestHistory.on('order.dt search.dt', function() {
	requestHistory.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
}).draw();

var historyList = $('.dept_change_history #datatable')
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
			dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
				"order": [[1, 'asc']],
			"fixedColumns": {
				leftColumns: 3
			}
		});
		$('.dept_change_history #searchbox').on('keyup', function () {
				historyList.search(this.value).draw();
			});

			$(window).on('resize load', function () {
				historyList.columns.adjust();
			});

historyList.on('order.dt search.dt', function() {
	historyList.column(0, {
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

$('#confirm-delete').on(
	'show.bs.modal',
	function(e) {
		$(this).find('.btn-ok').attr('href',
			$(e.relatedTarget).data('href'));
		$('.debug-url').html(
			'Delete URL: <strong>'
			+ $(this).find('.btn-ok').attr('href')
			+ '</strong>');
	});

$(".alert").delay(3000).addClass("in").fadeOut(2000);

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});

var reqListSize = $('.list_size_ellipsis').val();
function departmentChangeRequest() {
	var userType = $('#userType').val();
	var flag = false;
	var hasCheck = false;
	for (var i = 0; i < reqListSize; i++) {
		var checkedId = "#" + i + "chbox";
		var checked = $(checkedId).prop("checked");
		if (checked) {
			hasCheck = true;
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