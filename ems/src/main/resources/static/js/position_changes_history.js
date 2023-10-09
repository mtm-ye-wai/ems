$(".alert").delay(3000).addClass("in").fadeOut(2000);

$('#excel').click(function() {
	$(`.modalDialog`).css('display', 'none');
	$('body').removeClass('reduce-zindex');
});
$('#pdf').click(function() {
	$(`.modalDialog`).css('display', 'none');
	$('body').removeClass('reduce-zindex');
});

$(document).ready(function() {
	var t = $('.cmn-tbl')
		.DataTable({
			"scrollX": true,
			"autoWidth": false,
			"scrollCollapse": true,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 'no-sort'
			}, {
				"width": '100px',
				"targets": [0]
			}, {
				"width": '180px',
				"targets": [1]
			}, {
				"width": '130px',
				"targets": [3, 4]
			}],
			"order": [
				[0, 'asc']
			],
			"rowsGroup": [0, 1]
		});
	
	$(window).on('resize click load', function() {
		t.columns.adjust();
	});
	
	$('#searchbox').on('keyup', function() {
		t.search(this.value).draw();
	});


	var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
	if (paginate_buttons.length > 2) {
		$('#datatable_paginate').show();
	} else {
		$('#datatable_paginate').hide();
	}
});
