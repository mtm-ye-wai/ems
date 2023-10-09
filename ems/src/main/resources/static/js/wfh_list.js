$('#confirm-cancel').on(
	'show.bs.modal',
	function(e) {
		$(this).find('.btn-ok').attr('href',
			$(e.relatedTarget).data('href'));
		$('.debug-url').html(
			'Cancel URL: <strong>'
			+ $(this).find('.btn-ok').attr('href')
			+ '</strong>');
	});

$('#confirm-request-again').on(
	'show.bs.modal',
	function(e) {
		$(this).find('.btn-ok').attr('href',
			$(e.relatedTarget).data('href'));
		$('.debug-url').html(
			'Request Again URL: <strong>'
			+ $(this).find('.btn-ok').attr('href')
			+ '</strong>');
	});

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

var rowCheck = new Array();
function checkWFHRequest(index) {
	var filtered = rowCheck.filter(function(value) {
		return value == index;
	});

	if (filtered.length > 0) {
		rowCheck = rowCheck.filter(function(value) {
			return value != index;
		});
	} else {
		rowCheck.push(index);
	}

	if (rowCheck.length > 0) {
		if ($('#wfhBtnApprove').hasClass("inactive")) {
			$('#wfhBtnApprove').removeClass("inactive");
		}
		if ($('#wfhBtnReject').hasClass("inactive")) {
			$('#wfhBtnReject').removeClass("inactive");
		}
		if ($('#wfhBtnApprove').attr("disabled")) {
			$('#wfhBtnApprove').removeAttr("disabled");
		}
		if ($('#wfhBtnReject').attr("disabled")) {
			$('#wfhBtnReject').removeAttr("disabled");
		}
	} else {
		if (!$('#wfhBtnApprove').hasClass("inactive")) {
			$('#wfhBtnApprove').addClass("inactive");
		}
		if (!$('#wfhBtnReject').hasClass("inactive")) {
			$('#wfhBtnReject').addClass("inactive");
		}
		if ($('#wfhBtnApprove').attr("disabled") == undefined) {
			$('#wfhBtnApprove').attr('disabled', true);
		}
		if ($('#wfhBtnReject').attr("disabled") == undefined) {
			$('#wfhBtnReject').attr('disabled', true);
		}
	}
}

var requestTbl = $('.wfh-request-list #datatable')
	.DataTable(
		{
			"searching": false,
			"paging": false,
			"info": false,
			"ordering": false,
			"scrollX": true,
			"autoWidth": false,
			"scrollCollapse": true,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
			}, {
				"targets": [4],
				"type": 'extract-date',
			}],
			dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
			"order": [[1, 'asc']]
		});
requestTbl.draw();

var historyTbl = $('.wfh-history-list #datatable')
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
				"targets": 0
			}, {
				"targets": [3],
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
			"fixedColumns": {
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

var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
if (paginate_buttons.length > 2) {
	$('#datatable_paginate').show();
} else {
	$('#datatable_paginate').hide();
}

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});

var attendanceHistoryTbl = $('.attendance-report-history #datatable')
	.DataTable(
		{
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": "no-sort"
			}, {
				"targets": [3],
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
			"scrollX": true,
			"fixedColumns": {
				leftColumns: 4
			}
		});

attendanceHistoryTbl.on('order.dt search.dt', function() {
	attendanceHistoryTbl.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
}).draw();