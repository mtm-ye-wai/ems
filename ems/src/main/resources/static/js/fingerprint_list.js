$(document).ready(function() {

	jQuery.extend(jQuery.fn.dataTableExt.oSort, {
		"date-uk-pre": function(a) {
			var ukDatea = a.split('/');
			return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
		},

		"date-uk-asc": function(a, b) {
			return ((a < b) ? -1 : ((a > b) ? 1 : 0));
		},

		"date-uk-desc": function(a, b) {
			return ((a < b) ? 1 : ((a > b) ? -1 : 0));
		}
	});

	var t = $('#datatable').DataTable({
		"scrollX": true,
		"autoWidth": false,
		"scrollCollapse": true,
		"columnDefs": [{
			"searchable": false,
			"orderable": false,
			"targets": [0, 8]
		},
		{
			"type": "date-uk",
			"targets": 3
		}, {
			"targets": [3],
			"type": 'extract-date',
		}],
		dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>" +
			"<'row'<'col-md-12'<'table-responsive'tr>>>" +
			"<'row'<'col-sm-5'i>>" +
			"<'row'<'col-sm-12'p>>",
		"order": [[2, 'asc']]

	});
	$('.finger_print #searchbox').on('keyup', function () {
				t.search(this.value).draw();
			});
			$(window).on('resize load', function () {
				t.columns.adjust();
			});

	t.on('order.dt search.dt', function() {
		t.column(0, {
			search: 'applied',
			order: 'applied'
		}).nodes().each(function(cell, i) {
			cell.innerHTML = i + 1;
		});
	}).draw();
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

$(".alert").delay(3000).addClass("in").fadeOut(2000);
