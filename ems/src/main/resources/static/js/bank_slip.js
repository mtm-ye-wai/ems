$(document)
	.ready(
		function() {
			var t = $('#datatable')
				.DataTable(
					{
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
							+ "<'row'<'col-sm-5'i>>"
							+ "<'row'<'col-sm-12'p>>",
						"order": [[1, 'asc']]

					});

			t.on('order.dt search.dt', function() {
				t.column(0, {
					search: 'applied',
					order: 'applied'
				}).nodes().each(function(cell, i) {
					cell.innerHTML = i + 1;
				});
			}).draw();

			var paginate_buttons = $('#datatable_wrapper').find(
				".paginate_button");
			if (paginate_buttons.length > 2) {
				$('#datatable_paginate').show();
			} else {
				$('#datatable_paginate').hide();
			}
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

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});