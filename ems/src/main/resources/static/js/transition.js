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

var t = $('#datatable')
	.DataTable(
		{
			"scrollX": true,
			"autoWidth": false,
			"scrollCollapse": true,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
			}, {
				"width": "20px",
				"targets": 0
			}, {
				"width": "110px",
				"targets": 1
			}, {
				"width": "150px",
				"targets": 2
			}, {
				"width": "350px",
				"targets": 3
			}, {
				"width": "70px",
				"targets": 4
			}, {
				"width": "100px",
				"targets": 5
			}, {
				"width": "100px",
				"targets": 6
			}, {
				"targets": [5, 6],
				"type": 'extract-date',
			}],
			"order": [[1, 'asc']],
			"autoWidth": false
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

var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
if (paginate_buttons.length > 2) {
	$('#datatable_paginate').show();
} else {
	$('#datatable_paginate').hide();
}