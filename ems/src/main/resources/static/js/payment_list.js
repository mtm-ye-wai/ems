$(document)
	.ready(
		function() {
			var t = $('#datatable')
				.DataTable(
					{
						"columnDefs": [{
							"searchable": false,
							"orderable": false,
							"targets": 'no-sort'
						}, {
							"width": "130px",
							"targets": 2
						}, {
							"width": "70px",
							"targets": [3, 4, 5, 6, 9]
						}, {
							"targets": [11],
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
						"order": [[1, 'asc']],
						scrollX: true,
						fixedColumns: {
							leftColumns: 3
						}
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
		});

$(".alert").delay(3000).addClass("in").fadeOut(2000);

$('#confirm_reject').on(
	'show.bs.modal',
	function(e) {
		$(this).find('.btn-ok').attr('href',
			$(e.relatedTarget).data('href'));

		$('.debug-url').html(
			'Delete URL: <strong>'
			+ $(this).find('.btn-ok').attr('href')
			+ '</strong>');
	});
$('#confirm_approveAll').on(
	'show.bs.modal',
	function(e) {
		$(this).find('.btn-ok').attr('href',
			$(e.relatedTarget).data('href'));

		$('.debug-url').html(
			'Delete URL: <strong>'
			+ $(this).find('.btn-ok').attr('href')
			+ '</strong>');
	});
$('#confirm_PaidAll').on(
	'show.bs.modal',
	function(e) {
		$(this).find('.btn-ok').attr('href',
			$(e.relatedTarget).data('href'));

		$('.debug-url').html(
			'Delete URL: <strong>'
			+ $(this).find('.btn-ok').attr('href')
			+ '</strong>');
	});
$('#confirm_reRequestAgain').on(
	'show.bs.modal',
	function(e) {
		$(this).find('.btn-ok').attr('href',
			$(e.relatedTarget).data('href'));

		$('.debug-url').html(
			'Delete URL: <strong>'
			+ $(this).find('.btn-ok').attr('href')
			+ '</strong>');
	});
$('#paid-all')
	.click(
		function() {
			if (pendingStatus > 0) {
				$('#paid-all').removeAttr('data-toggle');
				var myErrAlert = document.getElementById("myErrAlert");
				myErrAlert.innerHTML = "<strong>Please approve all payments before paid</strong>";
				$('#myErrAlert').fadeIn().delay(3000).addClass("in")
					.fadeOut(2000);
				$('html,body').animate({
					scrollTop: 0
				}, 'slow');
				return;
			}
		});

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});