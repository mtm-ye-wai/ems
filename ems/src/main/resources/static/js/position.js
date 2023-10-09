$(document).ready(function() {
	var t = $('#dataTable')
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
				"order": []
			});

	t.on('order.dt search.dt', function() {
		t.column(0, {
			search: 'applied',
			order: 'applied'
		}).nodes().each(function(cell, i) {
			cell.innerHTML = i + 1;
		});
	}).draw();

	$('#searchbox').on('keyup', function() {
		t.search(this.value).draw();
	});


	$(window).on('resize click load', function() {
		t.columns.adjust();
	});
});


$(".alert").delay(3000).addClass("in").fadeOut(2000);
