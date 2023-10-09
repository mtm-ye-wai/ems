function isNumber(el, evt) {
	var ch = String.fromCharCode(evt.which);
	var number = el.value.split('.');
	if (!(/[0-9\.]/.test(ch)) || (number[1] && number[1].length > 1)) {
		evt.preventDefault();
	}
}

function formatNumber(event) {
	if (event.which >= 37 && event.which <= 40) {
		event.preventDefault();
	}
	var value = event.target.value;
	var decs = value.split(".");
	let num = decs[0];
	if (decs.length > 1) {
		num += '.' + decs[1];
	}
	if (!decs[0]) {
		num = "";
	}
	$('#manPerHour').val(num);
}

function preventCopyPaste(event) {
	if (event.which == 17 || event.which == 86 || event.which == 67) {
		event.preventDefault();
	}
}

 if ($(window).width() >= 768) {
var tbl = $('#datatable').DataTable(
	{
		"scrollX": true,
		"autoWidth": false,
		"scrollCollapse": true,
		"columnDefs": [{
			"searchable": false,
			"orderable": false,
			"targets": 'no-sort'
		}, {
			"targets": [6, 7],
			"type": 'extract-date',
		}],
		dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
				"order": [[1, 'asc']],
		"fixedColumns": {
			leftColumns: 3
		}
	});
	}else{
		var tbl = $('#datatable').DataTable(
	{
		"scrollX": true,
		"autoWidth": false,
		"scrollCollapse": true,
		"columnDefs": [{
			"searchable": false,
			"orderable": false,
			"targets": 'no-sort'
		}, {
			"targets": [6, 7],
			"type": 'extract-date',
		}],
		dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
				"order": [[1, 'asc']],
		"fixedColumns": {
			leftColumns: 1
		}
	});
	}
	$(' #searchbox').on('keyup', function () {
				tbl.search(this.value).draw();
			});

			$(window).on('resize load', function () {
				tbl.columns.adjust();
			});


tbl.on('order.dt search.dt', function() {
	tbl.column(0, {
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

$('#excel').click(function() {
	$('#excelModal').modal('hide')
});

$('#pdf').click(function() {
	$('#pdfModal').modal('hide')
});

function listRowClick(id) {
	/* Row active class edition start */
	var active = $("#row" + id).hasClass("active-row");
	if (active) {
		$("#row" + id).removeClass("active-row");
	}
	if ($(".pd-assign-tbl tr").hasClass("active-row")) {
		$(".pd-assign-tbl tr").removeClass("active-row");
	}
	if (!active) {
		$("#row" + id).addClass("active-row");
	}
	/* Row active class edition end */

	/* Button href edition start */
	var projectAssignId = $('#assignId' + id).val();
	var employeeId = $('#empId' + id).val();

	var editHref = $('#assign-edit').attr("href");
	$('#assign-edit').attr("href",
		editHref.split("=")[0] + "=" + projectAssignId);

	var deleteHref = $('#assign-delete').attr("data-href");
	$('#assign-delete').attr("data-href",
		deleteHref.split("=")[0] + "=" + projectAssignId);

	var detailHref = $('#assign-detail').attr("href");
	$('#assign-detail').attr("href",
		detailHref.split("=")[0] + "=" + projectAssignId);

	var historyHref = $('#assign-history').attr("href");
	$('#assign-history').attr("href",
		historyHref.split("=")[0] + "=" + employeeId);
	/* Button href edition edit */

	/* Button active class edition start */
	var groupOne = $(".assign-btn-grp .btn-group-one")
		.hasClass("disabled-link");
	var groupTwo = $(".assign-btn-grp .btn-group-two")
		.hasClass("disabled-link");
	if ($(".pd-assign-tbl tr").hasClass("active-row")) {
		var managerId = $('#mgrId' + id).val();
		var loginUserId = $('#loginId' + id).val();
		var loginUserType = $('#loginTyp' + id).val();
		if (groupOne
			&& (loginUserType == 1 || (loginUserType == 3 && managerId == loginUserId))) {
			$(".assign-btn-grp .btn-group-one").removeClass("disabled-link");
		}
		if (groupTwo) {
			$(".assign-btn-grp .btn-group-two").removeClass("disabled-link");
		}
	} else {
		if (!groupOne) {
			$(".assign-btn-grp .btn-group-one").addClass("disabled-link");
		}
		if (!groupTwo) {
			$(".assign-btn-grp .btn-group-two").addClass("disabled-link");
		}
	}
	/* Button active class edition end */
}

function historyRowClick(id) {
	/* Row active class edition start */
	var active = $("#row" + id).hasClass("active-row");
	if (active) {
		$("#row" + id).removeClass("active-row");
	}
	if ($(".pd-assign-tbl tr").hasClass("active-row")) {
		$(".pd-assign-tbl tr").removeClass("active-row");
	}
	if (!active) {
		$("#row" + id).addClass("active-row");
	}
	/* Row active class edition end */

	/* Button href edition start */
	var projectAssignId = $('#assignId' + id).val();
	var employeeId = $('#empId' + id).val();
	var editHref = $('#assign-edit').attr("href");
	$('#assign-edit').attr("href",
		editHref.split("=")[0] + "=" + projectAssignId + "&empId=" + employeeId);

	var deleteHref = $('#assign-delete').attr("data-href");
	$('#assign-delete').attr("data-href",
		deleteHref.split("=")[0] + "=" + projectAssignId + "&empId=" + employeeId);
	/* Button href edition edit */

	/* Button active class edition start */
	var btnLink = $(".assign-btn-grp a").hasClass("disabled-link");
	if ($(".pd-assign-tbl tr").hasClass("active-row")) {
		var managerId = $('#mgrId' + id).val();
		var loginUserId = $('#loginId' + id).val();
		var loginUserType = $('#loginTyp' + id).val();
		if (loginUserType == 1 || (loginUserType == 3 && managerId == loginUserId)) {
			if (btnLink) {
				$(".assign-btn-grp a").removeClass("disabled-link");
			}
		} else {
			if (!btnLink) {
				$(".assign-btn-grp a").addClass("disabled-link");
			}
		}
	} else {
		if (!btnLink) {
			$(".assign-btn-grp a").addClass("disabled-link");
		}
	}
	/* Button active class edition end */
}

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

//import project assign
function setfilename(val) {
	var fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);
	document.getElementById("file-name").value = fileName;
}

$('#assign-upload').click(function() {
	$('#uploadModal').modal('hide');
});

$('#assign-download').click(function() {
	$('#downloadModal').modal('hide');
});