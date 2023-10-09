$(document).ready(function() {

	var dataTable = $('#datatable').DataTable({
		"scrollX": true,
		"autoWidth": false,
		"scrollCollapse": true,
		"paging": false,
		"columnDefs": [
			{ "width": "5%", "targets": 0 },
			{ "orderable": false, "targets": "no-sort" }
		],
	}).columns.adjust().draw();

	$(window).on('resize load', function() {
		dataTable.columns.adjust();
	});

	var empList = $('#checkEmployees').val().split(',');
	$('input[type=checkbox]').each(function() {
		if (empList.indexOf($(this).val()) > -1) {
			$(this).attr('checked', true);
		}
	});
});

$("#searchbox").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("#datatable tbody tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

$(".check-item").click(function() {
	var empList = [];
	$('input[type=checkbox]:checked').each(function() {
		empList.push($(this).val());
	});
	$('#checkEmployees').val(empList);
});

$('#checkAll').click(function() {
	var isChecked = $(this).is(':checked')
	var empList = [];
	$('.alternate-input').each(function() {
		this.checked = isChecked;
		if (isChecked) {
			empList.push($(this).val());
		}
	});
	$('#checkEmployees').val(empList);
})