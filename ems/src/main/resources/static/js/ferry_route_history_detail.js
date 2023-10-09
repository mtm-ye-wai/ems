var ferryTbl = $('#dataTable').DataTable(
	{
		"scrollX": true,
		"autoWidth": false,
		"scrollCollapse": true,
		"columnDefs": [{
			"searchable": false,
			"orderable": false,
			"targets": 'no-sort'
		}],
		"order": [],
	});
ferryTbl.draw();

$('#searchbox').on('keyup', function() {
	ferryTbl.search(this.value).draw();
});


$(window).on('resize click load', function() {
	ferryTbl.columns.adjust();
});

ferryTbl.on('order.dt search.dt', function() {
	ferryTbl.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
}).draw();

$(".alert").delay(3000).addClass("in").fadeOut(2000);
