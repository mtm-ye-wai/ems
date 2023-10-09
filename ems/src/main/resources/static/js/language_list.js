$(document)
	.ready(
		function() {
			var t = $('#datatable')
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
							"targets": [5],
							"type": 'extract-date',
						}],
						dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
							+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
							+ "<'row'<'col-sm-5'i>>"
							+ "<'row'<'col-sm-12'p>>",
						"order": [[2, 'asc']]
					});
					
					$('#searchbox').on('keyup', function () {
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