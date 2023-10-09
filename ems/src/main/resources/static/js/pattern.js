$(document).ready(function() {
	var t = $('#datatable')
		.DataTable({
			"scrollX": true,
			"autoWidth": false,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 'no-sort'
			}],
			"order": [[1, 'asc']]
		});

	$(window).on('resize load', function() {
		t.columns.adjust();
	});

	$('#searchbox').on('keyup', function() {
		t.search(this.value).draw();
	});

	t.on('order.dt search.dt', function() {
		t.column(0, {
			search: 'applied',
			order: 'applied'
		}).nodes().each(function(cell, i) {
			cell.innerHTML = i + 1;
		});
	}).draw();

	if ($('#patternDays').val()) {
		var patternDays = $('#patternDays').val().split(',');
		$('input[type=checkbox]').each(function() {
			if (patternDays.indexOf($(this).val()) > -1) {
				$(this).attr('checked', true);
			}
		});
	}
});

$(".crud-list .delete").click(function() {
	var deleteLink = $(this).data("href");
	$("#deleteModal #delete-confirm").attr("href", deleteLink);
});

$('#shift-days').change(function() {
	var patternDays = [];
	$(this).find('li .alternate input[type=checkbox]:checked').each(function() {
		patternDays.push($(this).val());
	});
	$('#patternDays').val(patternDays);
});