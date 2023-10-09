$(document).ready(function() {
	$('.name-select').select2();
});

//For attendance history
var listAttendanceTbl = $('.list-attendance #datatable')
	.DataTable(
		{
			"searching": false,
			"paging": false,
			"info": false,
			"ordering": false,
			dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
			"bDestroy": true,
			"footerCallback": function(row, data, start, end, display) {
			}
		});

var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
if (paginate_buttons.length > 2) {
	$('#datatable_paginate').show();
} else {
	$('#datatable_paginate').hide();
}

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});

var reqListSize = $('.list_size_ellipsis').val();
function checkDeleteBtn() {
	var hasCheck = false;
	for (var i = 0; i < reqListSize; i++) {
		var checkedId = "#" + i + "chbox";
		var checked = $(checkedId).prop("checked");
		if (checked) {
			hasCheck = true;
		}
	}
	if (hasCheck) {
		if ($('#btnDelete').hasClass("inactive")) {
			$('#btnDelete').removeClass("inactive");
		}
		if ($('#btnDelete').attr("disabled")) {
			$('#btnDelete').removeAttr("disabled");
		}
	} else {
		if (!$('#btnDelete').hasClass("inactive")) {
			$('#btnDelete').addClass("inactive");
		}
		if ($('#btnDelete').attr("disabled") == undefined) {
			$('#btnDelete').attr('disabled', true);
		}
	}
}