$(document).ready(
	function() {
		var t = $('.cmn-tbl')
			.DataTable(
				{
					"scrollX": true,
					"autoWidth": false,
					"scrollCollapse": true,
					"columnDefs": [{
						"searchable": false,
						"orderable": false,
						"targets": 'no-sort'
					}],
					"order": [[2, 'asc']]
				});

		t.on('order.dtz search.dt', function() {
			t.column(0, {
				search: 'applied',
				order: 'applied'
			}).nodes().each(function(cell, i) {
				cell.innerHTML = i + 1;
			});
		}).draw();

		$('#searchbox').on('keyup', function() {
			t.search(this.value).draw();
		});

		$(window).on('resize click load', function() {
			t.columns.adjust();
		});
	});

$(".alert").delay(3000).addClass("in").fadeOut(2000);

$(function() {
	$('#datepicker').datepicker({
		dateFormat: 'dd/mm/yy',
	});
	$('#datepicker').attr("autocomplete", "off");
});

$(document).on("click", "#delete", function(e) {
	e.preventDefault();
	console.log("click");
	var item = $(this).closest("tr");
	var col0 = item.find('td:eq(0)').text();
	console.log(col0);

	var col1 = item.find('td:eq(1)').text();
	var col2 = item.find('td:eq(2)').text();
	var col3 = item.find('td:eq(3)').text();
	var col4 = item.find('td:eq(4)').text();
	var col5 = item.find('td:eq(5)').text();
	$("#createdAt").val(col5);
});

$('.closeFerryModal').click(function() {
	$('#datepicker').val("");
	$('#datepicker').removeAttr('style');
	document.getElementById("error").innerHTML = "";
});

function deleteData(id) {
	$("#deleteId").val(id);
	$("#confirm-delete").modal();
}

//////////
function deleteFerryData(id) {
	$("#confirm-delete-ferry").modal();
	$("#deleteId").val(id);
}

function toggleActiveFerry(id) {
	$("#confirm-inactive-ferry").css('display', 'block');
	$('body').addClass('reduce-zindex');
	$("#inactiveId").val(id);
	changeAction("#check" + id, "#ref" + id)
}

function deleteDriver(id) {
	$("#deleteId").val(id);

}
function changeAction(checkid, id) {
	$(checkid).on('change', function() {
		if ($(this).is(":checked")) {
			$(id).text("Active");
		} else {
			$(id).text("Inactive");
		}
	});
}
$(function() {
	var alertBox = document.querySelector('.activate-success');

	$('#confirm-delete-driver').on('click', '.btn-ok', function() {
		window.location = "deleteDriver/" + $("#deleteId")[0].value;
	})
	$('#confirm-delete-ferry').on('click', '.btn-ok', function() {
		window.location = "deleteFerry/" + $("#deleteId")[0].value;
	})
	//cancel activation
	$('#confirm-inactive-ferry').on('click', '.close-btn', function() {
		var selector = "#lab" + $("#inactiveId")[0].value;
		$(selector).click();
		var id = ($("#inactiveId")[0].value);
		changeAction("#check" + id, "#ref" + id);
		$("#confirm-inactive-ferry").css('display', 'none');
		$('body').removeClass('reduce-zindex');
	})
	//confirm activation
	$('#confirm-inactive-ferry').on('click', '.btn-ok', function() {
		var ferryId = $("#inactiveId")[0].value;
		$.ajax({
			type: "GET",
			url: "ferryActivation/" + ferryId,
			processData: false,
			contentType: false,
			success: function(response, status, xhr) {
				var msg = response.activeFlg ? "Active Ferry success!" : "Inactive Ferry success!";
				if (alertBox) {
					alertBox.style.display = 'block';
					setTimeout(function() {
						alertBox.style.display = 'none';
					}, 3000);
				}
				var alertDetailSpan = document.querySelector('.activate-alert');
				if (alertDetailSpan) {
					alertDetailSpan.textContent = msg;
				}
				$("#confirm-inactive-ferry").css('display', 'none');
				$('body').removeClass('reduce-zindex');
			},
			error: function(ex) {
				console.log(ex);
			}
		});
	})
})