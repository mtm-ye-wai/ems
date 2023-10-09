
$(function() {

	$('#empName').autocomplete({
		source: emptyDepMemberList
	});

	$('#empName').on("input change keyup blur", function(event) {
		$.ajax({
			type: "POST",
			url: "searchEmployee?divName=" + divName,
			data: new FormData(document.getElementById("myform")),
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			success: function(response, status, xhr) {
				console.log(response)
				var ct = xhr.getResponseHeader("content-type") || "";
				if (ct.indexOf('html') > -1) {
					window.location.reload();
					return;
				}
				if (response.status == 'FAIL') {
					console.log("fail...");
					showFormError(response.errorMessageList);
				} else if (response == 'Exist') {
					var msg = "Member already exist in department!"
					$("#idMsg").addClass("error-ms");
					$("#add-member").attr("disabled", "disabled");
					$("#idMsg").html(msg);
				} else if (response == 'Unavaliable') {
					var msg = "This member is not avaliabled!"
					$("#idMsg").addClass("error-ms");
					$("#add-member").attr("disabled", "disabled");
					$("#idMsg").html(msg);
				} else {
					$("#idMsg").removeClass("error-ms")
					$("#add-member").removeAttr("disabled");
					$("#idMsg").html(response);
				}
			},
			error: function(ex) {
				console.log("error");
			}
		});
	});

})

var t = $('.department-member-list #datatable')
	.DataTable(
		{
			"scrollX": true,
			"autoWidth": false,
			"scrollCollapse": true,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": "no-sort",
			}],
			dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
			"order": [[1, 'asc']]
		});
		$('.department-member-list #searchbox').on('keyup', function () {
				t.search(this.value).draw();
			});

			$(window).on('resize load', function () {
				t.columns.adjust();
			});

var tblDepartments = $('.departments #datatable')
	.DataTable(
		{
			"scrollX": true,
			"autoWidth": false,
			"scrollCollapse": true,
			"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": "no-sort",
			}, {
				"targets": [4],
				"type": 'extract-date',
			}],
			dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
				+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
				+ "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
			"order": [[1, 'asc']]
		});
		$('.departments #searchbox').on('keyup', function () {
				tblDepartments.search(this.value).draw();
			});

			$(window).on('resize load', function () {
				tblDepartments.columns.adjust();
			});

tblDepartments.on('order.dt search.dt', function() {
	tblDepartments.column(0, {
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

$(".alert").delay(3000).addClass("in").fadeOut(2000);

