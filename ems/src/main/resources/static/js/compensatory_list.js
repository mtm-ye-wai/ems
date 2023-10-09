$(document).ready(function() {
	var t = $('#otTable').DataTable({
		"scrollX": true,
		"autoWidth": false,
		"scrollCollapse": true,
		"columnDefs": [{
			"searchable": false,
			"orderable": false,
			"targets": 'no-sort'
		},
		{ "type": "date-uk", "targets": 2 },
		{ "type": "my-month", "targets": 4 }],
		"order": [[1, 'asc']]
	}).columns.adjust().draw();

	$('#searchbox').on('keyup', function() {
		t.search(this.value).draw();
	});

	$(window).on('resize load', function() {
		t.columns.adjust();
	});
});

$(".detail-btn").click(function() {
	/*Show Modal*/
	var target = $(this).data('target');
	$(target).css('display', 'block');
	$('body').addClass('reduce-zindex');
	/*Get Data*/
	var output = "";
	$.ajax({
		type: "POST",
		url: "getDetailCompensatory?empId=" + $(this).data('value'),
		enctype: 'multipart/form-data',
		processData: false,
		contentType: false,
		success: function(response) {
			if (response == "" || response == null) {
				output += "<label class='text-center'>No Compensatory Has Been Taken Yet!</label>";
			} else {
				output += "<label class='text-center'>" + response[0] + "'s Compensatory</label>";
				output += "<div class='tbl'><table><tbody><tr>";
				for (var i = 1; i < response.length; i++) {
					var data = response[i].split(",");
					output += "<td>" + data[0] + "</td>";
					output += "<td>" + data[1] + " hr used</td>";
				}
				output += "</tr></tbody></table></div>";
			}
			$(".modal-body").html(output);
		},
		error: function() {
			console.log("error");
			output += "<label class='text-center'>Something Went Wrong!</label>";
			$(".modal-body").html(output);
		}
	});
});