$(document)
	.ready(
		function() {
			if ($(window).width() < 500) {
				$.fn.DataTable.ext.pager.numbers_length = 3;
			}
			
			var addressChangeTbl = $('.address-change #datatable')
				.DataTable(
					{
						"columnDefs": [{
							"searchable": false,
							"orderable": false,
							"targets": "no-sort"
						}, {
							"targets": [3, 4, 5],
							"type": 'extract-date',
						}],
						"scrollX": true,
						"autoWidth": false,
        				"scrollCollapse": true,
						"fixedColumns": {
							rightColumns: 1,
							leftColumns: 0
						},
						"drawCallback": function () {
							$('.dataTables_paginate .ellipsis').eq(1).remove();
						},
						"language": {
							paginate: {
								next: $(window).width() < 510 ? '&gt&gt' : 'Next',
								previous: $(window).width() < 510 ? '&lt&lt' : 'Previous'
							}
						}
					});
			if(addressChangeTbl.page.info()?.recordsDisplay > 0){
				if($(window).width() > 768) {
					$('#datatable_length').show()
					$('#datatable_info').show()
				}
				$('#datatable_paginate').show()
			}
			else {
				$('#datatable_paginate').hide()
				$('#datatable_length').hide()
				$('#datatable_info').hide()
			}
			$('.address-change #searchbox').on('keyup', function () {
				addressChangeTbl.search(this.value).draw();
				if(addressChangeTbl.page.info().recordsDisplay > 0){
					if($(window).width() > 768) {
						$('#datatable_length').show()
						$('#datatable_info').show()
					}
					$('#datatable_paginate').show()
				}
				else {
					$('#datatable_paginate').hide()
					$('#datatable_length').hide()
					$('#datatable_info').hide()
				}
			});

			$(window).on('resize load', function () {
				addressChangeTbl.columns.adjust();
			});

			addressChangeTbl.on('order.dt search.dt', function() {
				addressChangeTbl.column(0, {
					search: 'applied',
					order: 'applied'
				}).nodes().each(function(cell, i) {
					cell.innerHTML = i + 1;
				});
			}).draw();

			var profileChangeTbl = $('.profile-change #datatable')
				.DataTable(
					{
						"columnDefs": [{
							"searchable": false,
							"orderable": false,
							"targets": "no-sort"
						}, {
							"targets": [13, 14],
							"type": 'extract-date',
						}],
						order: [[0, ]],
						"scrollX": true
					});

			profileChangeTbl.on('order.dt search.dt', function() {
				profileChangeTbl.column(0, {
					search: 'applied',
				}).nodes().each(function(cell, i) {
					cell.innerHTML = i + 1;
				});
			}).draw();
			$('.profile-change #searchbox').on('keyup', function() {
				profileChangeTbl.search(this.value).draw();
			});
			$(window).on('resize click load', function() {
				profileChangeTbl.columns.adjust();
			});

			var transportationHistoryTbl = $(
				'.transportation-history #datatable')
				.DataTable(
					{
						"scrollX": true,
						"autoWidth": false,
						"scrollCollapse": true,
						"columnDefs": [{
							"searchable": false,
							"orderable": false,
							"targets": 'no-sort'
						}, {
							"targets": [4, 5],
							"type": 'extract-date',
						}],
						"order": [[2, 'asc']],
					});

			$(window).on('resize load', function () {
				transportationHistoryTbl.columns.adjust();
			});
			
			$('.transportation-history #searchbox').on('keyup', function () {
				transportationHistoryTbl.search(this.value).draw();
			});

			transportationHistoryTbl.on('order.dt search.dt',
				function() {
					transportationHistoryTbl.column(0, {
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

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});

var reqListSize = $('.list_size_ellipsis').val();
function addressChangeRequest() {
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
