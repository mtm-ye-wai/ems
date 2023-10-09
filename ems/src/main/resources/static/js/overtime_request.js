$(document).ready(function() {

	var dataTable = $('.overtime-request #datatable').DataTable({
		"scrollX": true,
		"autoWidth": false,
		"scrollCollapse": true,
		"searching": false,
		"paging": false,
		"info": false,
		"ordering": false,
		"columnDefs": [
			{ "targets": "no-sort", "searchable": false, "orderable": false },
			{ "targets": [3, 11], "type": 'extract-date', }
		],
	}).columns.adjust().draw();

	$(window).on('resize load', function() {
		dataTable.columns.adjust();
	});
});

function overtimeRequest() {
	var flag = false;
	var hasCheck = false;
	for (var i = 0; i < $('#size').val(); i++) {
		var checkedId = "#" + i + "chbox";
		var oTypeId = "#" + i + "oType";
		var checked = $(checkedId).prop("checked");
		var oType = $(oTypeId).val();
		if (checked) {
			hasCheck = true;
			if (oType == 1) {
				flag = true;
			}
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

function selectAllCheckBox() {
    if (document.getElementById('select_all').checked == true) {
        $('.check_data').each(function () {
            this.checked = true;
        });
    } else {
        $('.check_data').each(function () {
            this.checked = false;
        });
    }
	overtimeRequest();
}

