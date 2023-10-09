$(document).ready(function() {
	var tbl = $('#datatable').DataTable({
		"scrollX": true,
		"autoWidth": false,
	    "columnDefs": [{
	        "searchable": false,
			"orderable": false,
			"targets": 'no-sort'
		}],
		dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>" +
	        "<'row'<'col-md-12'<'table-responsive'tr>>>" +
	        "<'row'<'col-sm-5'i>>" +
	        "<'row'<'col-sm-12'p>>",
	    "order": [
	        [1, 'asc']
	    ]
	});
	
	$('#searchbox').on('keyup', function() {
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
});
