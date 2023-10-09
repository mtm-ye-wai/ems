$(document).ready(function() {
	var t = $('#holiday .cmn-tbl').DataTable({
		"scrollX": true,
		"autoWidth": false,
		"scrollCollapse": true,
		"columnDefs": [{
			"searchable": false,
			"orderable": false,
			"targets": 'no-sort'
		}]
	});

	$(window).on('resize click load', function() {
		t.columns.adjust();
	});
	
	$('#searchbox').on('keyup', function() {
		t.search(this.value).draw();
	});

	t.on('order.dt search.dt', function() {
		t.column(0, {
			search: 'applied',
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

});

$(".alert").delay(3000).addClass("in").fadeOut(2000);


