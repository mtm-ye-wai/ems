var URL_PREFIX = location.origin.concat(CONTEXT_PATH);

$(document).ready(function() {
	$('#error-alert').hide();
	$('.datepicker').attr("autocomplete", "off");
	$('.datepicker').datepicker({
		dateFormat: "dd/mm/yy",
		yearRange: "1800:2030",
		maxDate: new Date(),
		beforeShow: function(readonly) { if ($(readonly).attr('readonly')) { return false; } }
	});
});

$(".cal-ico").on('click', function() {
	var $datepickerInput = $(this).siblings(".datepicker");
	$datepickerInput.focus();
});

var tbl = $('#datatable').DataTable({
	"scrollX": true,
	"autoWidth": false,
	"scrollCollapse": true,
	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		"targets": 'no-sort'
	}, {
		'width': 90,
		'targets': 2
	}, {
		'width': 170,
		'targets': 3
	}, {
		'width': 130,
		'targets': 4
	}, {
		'width': 120,
		'targets': 6
	}],
	"createdRow": function(row, data, dataIndex, cells) {
		if (cells[6].lastElementChild.value === '3') {
			$(row).addClass("slight-fever-color");
		} else if (cells[6].lastElementChild.value === '4') {
			$(row).addClass("fever-color");
		}
	},
	dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>" +
		"<'row'<'col-md-12'<'table-responsive'tr>>>" +
		"<'row'<'col-sm-5'i>>" +
		"<'row'<'col-sm-12'p>>",
	sorting: []
});
$('#searchbox').on('keyup', function() {
	tbl.search(this.value).draw();
});
$(window).on('resize load', function() {
	tbl.columns.adjust();
});

tbl.on('order.dt search.dt', function() {
	tbl.column(0, {
		search: 'applied',
		order: 'applied'
	}).nodes().each(function(cell, i) {
		cell.innerHTML = i + 1;
	});
	tbl.column(3).nodes().each(function(cell, i) {
		if (cell.firstElementChild.value === '2') {
			cell.lastElementChild.selectedIndex = 1;
		} else {
			cell.lastElementChild.selectedIndex = 0;
		}
	});
}).draw();

$('[name="temperature"]').on('keypress', function(e) {
	let regexp = /^\d*(\.\d{0,1})?$/;
	if (!regexp.test(this.value) || !(e.which >= 46 && e.which <= 57 && e.which !== 47) ||
		(e.which === 46 && this.value.length === 0) ||
		(!this.value.includes('.') && this.value.length >= 3 && e.which !== 46) ||
		(this.value.includes('.') && $(this).val().split('.')[1].length >= 1) ||
		(this.value.includes('.') && e.which === 46)) {
		e.preventDefault();
	}
});

function validationCheckAndSubmit(formId) {
	$.ajax({
		url: URL_PREFIX.concat('/validationCheckForTemperatureRecord'),
		contentType: "application/json;charset=utf-8",
		type: 'POST',
		data: JSON.stringify(getFormDataAsJSON(formId)),
		success: function(response, status, xhr) {
			var ct = xhr.getResponseHeader("content-type") || "";
			if (ct.indexOf('html') > -1) {
				window.location.reload();
				return;
			}
			if (!response) {
				$(`#${formId}`).append('<input type="hidden" name="save" />');
				$(`#${formId}`).submit();
			}
		},
		error: function(error) {
			$('#error-alert-msg').text(error.responseText);
			$('#error-alert').show();
			$("#error-alert").delay(3000).addClass("in").fadeOut(2000);
		}
	});
}

function getFormDataAsJSON(formId) {
	var formArr = $(`#${formId}`).serializeArray();
	var jsonObject = {};
	$.each(formArr, function(i, v) {
		jsonObject[v.name] = v.value;
	});
	return jsonObject;
}