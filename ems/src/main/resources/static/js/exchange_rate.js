$(document)
	.ready(
		function() {
			var t = $('#datatable')
				.DataTable({
					"columnDefs": [{
						"searchable": false,
						"orderable": false,
						"targets": 'no-sort'
					}],
					"language": {
						"paginate": {
							"previous": "<<",
							"next": ">>"
						}
					},
					dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>" +
						"<'row'<'col-md-12'<'table-responsive'tr>>>" +
						"<'row'<'col-sm-5'i>>" +
						"<'row'<'col-sm-12'p>>",
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

function isNumber(el, evt) {
	var ch = String.fromCharCode(evt.which);
	var number = el.value.split('.');
	if (!(/[0-9\.]/.test(ch)) || (number[1] && number[1].length > 1)) {
		evt.preventDefault();
	}
}

function preventCopyPaste(evt) {
	if (evt.keyCode == 86) {
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
	num = num.replace(/,/gi, "").split("").reverse().join("");

	var num2 = RemoveRogueChar(num.replace(/(.{3})/g, "$1,").split("")
		.reverse().join(""));
	if (decs.length > 1) {
		num2 += '.' + decs[1];
	}
	if (!decs[0]) {
		num2 = "";
	}
	$('#exchangeRate').val(num2);
};

function RemoveRogueChar(convertString) {
	if (convertString.substring(0, 1) == ",") {
		return convertString.substring(1, convertString.length)
	}
	return convertString;
}