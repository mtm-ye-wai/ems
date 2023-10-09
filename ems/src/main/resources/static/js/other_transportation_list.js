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
							"targets": [6],
							"type": 'extract-date',
						}],
						"language": {
							"paginate": {
								"previous": "Previous",
								"next": "Next"
							}
						},
						"autoWidth": false,
						"scrollCollapse": true,
						"scrollX": true
					});

			$('#datatable_paginate').toggle(t.page.info().recordsDisplay > 0);
			$('#datatable_length').toggle(t.page.info().recordsDisplay > 0);
			$('#datatable_info').toggle(t.page.info().recordsDisplay > 0);
		
			$('.list-other-transportation #searchbox').on('keyup', function () {
				t.search(this.value).draw();
				$('#datatable_paginate').toggle(t.page.info().recordsDisplay > 0);
				$('#datatable_length').toggle(t.page.info().recordsDisplay > 0);
				$('#datatable_info').toggle(t.page.info().recordsDisplay > 0);
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

var reqListSize = $('.list_size_ellipsis').val();
function otherTransportationRequest() {
	var userType = $('#userType').val();
	var flag = false;
	var hasCheck = false;
	for (var i = 0; i < reqListSize; i++) {
		var checkedId = "#" + i + "chbox";
		var checked = $(checkedId).prop("checked");
		if (checked) {
			hasCheck = true;
		}
	}

	if (hasCheck) {
		if (!flag) {
			if ($('#btnApprove').hasClass("inactive")) {
				$('#btnApprove').removeClass("inactive");
			}
			if ($('#btnApprove').attr("disabled")) {
				$('#btnApprove').removeAttr("disabled");
			}
		} else {
			if (!$('#btnApprove').hasClass("inactive")) {
				$('#btnApprove').addClass("inactive");
			}
			if ($('#btnApprove').attr("disabled") == undefined) {
				$('#btnApprove').attr('disabled', true);
			}
		}
		if ($('#btnReject').hasClass("inactive")) {
			$('#btnReject').removeClass("inactive");
		}
		if ($('#btnReject').attr("disabled")) {
			$('#btnReject').removeAttr("disabled");
		}
	} else {
		if (!$('#btnApprove').hasClass("inactive")) {
			$('#btnApprove').addClass("inactive");
		}
		if (!$('#btnReject').hasClass("inactive")) {
			$('#btnReject').addClass("inactive");
		}
		if ($('#btnApprove').attr("disabled") == undefined) {
			$('#btnApprove').attr('disabled', true);
		}
		if ($('#btnReject').attr("disabled") == undefined) {
			$('#btnReject').attr('disabled', true);
		}
	}
}