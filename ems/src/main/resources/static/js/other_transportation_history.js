$(document)
	.ready(
		function() {
			var t = $('#datatable')
				.DataTable(
					{
						"columnDefs": [{
							"searchable": false,
							"orderable": false,
							"targets": 'no-sort'
						}, {
							"targets": [5, 6, 7],
							"type": 'extract-date',
						}],
						"autoWidth": false,
						"scrollCollapse": true,
						"scrollX": true,
						"fixedColumns": {
							leftColumns: 0,
							rightColumns: 1
						}
					});
			$('#datatable_paginate').toggle(t.page.info().recordsDisplay > 0);
			$('#datatable_length').toggle(t.page.info().recordsDisplay > 0);
			$('#datatable_info').toggle(t.page.info().recordsDisplay > 0);

			$('.list-other-transportation #searchbox').on('keyup', function () {
				t.search(this.value).draw();
				$('#datatable_paginate').toggle(t.page.info().recordsDisplay > 0);
				$('#datatable_length').toggle(t.page.info().recordsDisplay > 0);
				$('#datatable_info').toggle(t.page.info().recordsDisplay > 0);
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

$(".alert").delay(3000).addClass("in").fadeOut(2000);

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

$('#changeModal').on(
	'show.bs.modal',
	function(e) {
		$(this).find('.btn-ok').attr('href',
			$(e.relatedTarget).data('href'));

		$('.debug-url').html(
			'Delete URL: <strong>'
			+ $(this).find('.btn-ok').attr('href')
			+ '</strong>');
	});

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});