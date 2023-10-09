$(document).ready(function() {
	$('.datepicker').datepicker({
		dateFormat: "dd/mm/yy",
		yearRange: "1800:2030",
		maxDate: new Date(),
		beforeShow: function(readonly) { if ($(readonly).attr('readonly')) { return false; } }
	});
	$('.datepicker').attr("autocomplete", "off");
	$('#updateAllBtn').attr('disabled', true);
});
$(".cal-ico").on('click', function() {
	var $datepickerInput = $(this).siblings(".datepicker");
	$datepickerInput.focus();
});

var tbl = $('#datatable').DataTable({
	"scrollX": true,
	"autoWidth": false,
	"scrollCollapse": true,
	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		"targets": 'no-sort'
	}],
	"createdRow": function(row, data, dataIndex, cells) {
		if (cells[6].lastElementChild.value === '3') {
			$(row).addClass("slight-fever-color");
		} else if (cells[6].lastElementChild.value === '4') {
			$(row).addClass("fever-color");
		}
	},
	dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>" +
		"<'row'<'col-md-12'<'table-responsive'tr>>>" +
		"<'row'<'col-sm-5'i>>" +
		"<'row'<'col-sm-12'p>>",
	sorting: []
});
$('#searchbox').on('keyup', function () {
				tbl.search(this.value).draw();
			});
			$(window).on('resize load', function () {
				tbl.columns.adjust();
			});

tbl.on('order.dt search.dt', function() {
	tbl.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
}).draw();

function updateTemperatureRecord(formId) {
	$(`#${formId}`).append('<input type="hidden" name="update" />');
	$(`#${formId}`).submit();
}

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});