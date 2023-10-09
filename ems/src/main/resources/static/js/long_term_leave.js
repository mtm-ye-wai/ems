var dates;
document.addEventListener('DOMContentLoaded', function(event) {
	var lblRequest = document.getElementById("requestDate");
	lblRequest.value = formatDate(new Date());
});

$(document).on("click", "#show", function(event) {
	if (validate()) {
		$.ajax({
			type: "POST",
			url: "getWFHDateForLeave",
			data: new FormData(document.getElementById("myleaveform")),
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			success: function(response, status, xhr) {
				var ct = xhr.getResponseHeader("content-type") || "";
				if (ct.indexOf('html') > -1) {
					window.location.reload();
					return;
				}
				if (response && response.length > 0) {
					var tmpMsg = "";
					for (i = 0; i < response.length; i++) {
						if (tmpMsg != "") {
							tmpMsg += ", " + response[i];
						} else {
							tmpMsg += response[i];
						}
					}
					var wfhErrorMsg;
					if (response.length == 1) {
						wfhErrorMsg = "[" + tmpMsg + "] is already taken WFH!";
					} else if (response.length > 1) {
						wfhErrorMsg = "[" + tmpMsg + "] are already taken WFH!";
					}
					var wfhError = document.getElementById("wfh-date-err");
					wfhError.innerHTML = "<strong>" + wfhErrorMsg + "</strong>";
					$("#wfh-date-err").fadeIn().delay(3000).addClass("in").fadeOut(2000);
				} else {
					$('#wfh-date-err').text('');
				}
			},
			error: function(ex) {

			}
		});

		$.ajax({
			type: "POST",
			url: "getDates",
			data: new FormData(document.getElementById("myleaveform")),
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			success: function(response, status, xhr) {
				var ct = xhr.getResponseHeader("content-type") || "";
				if (ct.indexOf('html') > -1) {
					window.location.reload();
					return;
				}
				if (response.status == 'FAIL') {
					showFormError(response.errorMessageList);
				} else {
					if (response.length == 0) {
						getHolidays();
					} else {
						$('#holiday-date-err').text('');
					}
					showLeaveDates(response);
				}
			},
			error: function(ex) {
			}
		});
	}
});

function showLeaveDates(dates) {
	var leaveType = document.getElementsByName("leaveType")[0].value;
	var description = document.getElementsByName("description")[0].value;
	var table = document.getElementById("leaveDetailTable");
	var tbody = document.getElementById("mytbody");
	$("#mytbody tr").remove();
	dates.forEach(function(date) {
		var row = document.getElementById("leaveDetailTable")
			.getElementsByTagName("tr").length - 1;
		var tr = document.createElement("tr");
		var tdDate = document.createElement("td");
		tdDate.classList.add("text-right");
		var lblDate = document.createElement("label");
		lblDate.innerHTML = date;
		var tdLeaveType = document.createElement("td");
		var lblLeaveType = document.createElement("label");
		lblLeaveType.innerHTML = leaveType;
		var tdDescription = document.createElement("td");
		var lblDescription = document.createElement("label");
		lblDescription.innerHTML = description;

		tdDate.innerHTML = '<input type="hidden" id="date' + row
			+ '" name="leaveReportFormList[' + row + '].date" value= "'
			+ date + '" />';
		tdDate.appendChild(lblDate);
		tdLeaveType.innerHTML = '<input type="hidden" id="date' + row
			+ '" name="leaveReportFormList[' + row
			+ '].leaveType" value= "' + leaveType + '" />';
		tdLeaveType.appendChild(lblLeaveType);
		tdDescription.innerHTML = '<input type="hidden" id="date' + row
			+ '" name="leaveReportFormList[' + row
			+ '].description" value= "' + description + '" />';
		tdDescription.appendChild(lblDescription);
		tr.appendChild(tdDate);
		tr.appendChild(tdLeaveType);
		tr.appendChild(tdDescription);
		tbody.appendChild(tr);
		$('html,body').animate({
			scrollTop: 670
		}, 'fast')
	});
	if (dates.length !== 0) {
		requestValidate();
	}
}

function getHolidays() {
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var employeeId = $('#employeeId').val();
	$.ajax({
		type: "POST",
		url: "getHolidays?fromDate=" + fromDate + "&toDate=" + toDate + "&employeeId=" + employeeId,
		enctype: 'multipart/form-data',
		processData: false,
		contentType: false,
		success: function(response, status, xhr) {
			var ct = xhr.getResponseHeader("content-type") || "";
			if (ct.indexOf('html') > -1) {
				window.location.reload();
				return;
			}
			if (response && response.length > 0) {
				var tmpMsg = "";
				for (i = 0; i < response.length; i++) {
					if (tmpMsg != "") {
						tmpMsg += ", " + response[i];
					} else {
						tmpMsg += response[i];
					}
				}
				var holidayErrorMsg;
				if (response.length == 1) {
					holidayErrorMsg = "[" + tmpMsg + "] is a holiday date!";
				} else if (response.length > 1) {
					holidayErrorMsg = "[" + tmpMsg + "] are holiday dates!";
				}
				var holidayDateError = document.getElementById("holiday-date-err");
				holidayDateError.innerHTML = "<strong>" + holidayErrorMsg + "</strong>";
				$("#holiday-date-err").fadeIn().delay(3000).addClass("in").fadeOut(2000);
			} else {
				$('#holiday-date-err').text('');
			}
		},
		error: function(ex) {
		}
	});
}

function validate() {
	var myErrAlert = document.getElementById("myErrAlert");
	var from = document.getElementsByName("fromDate")[0].value;
	var to = document.getElementsByName("toDate")[0].value;
	var description = document.getElementsByName("description")[0].value;

	myErrAlert.style.display = "none";

	// Check date with regular expression to match required date format
	re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

	if (from != '' && !from.match(re)) {
		myErrAlert.innerHTML = "<strong>Invalide date format(dd/mm/yyyy)</strong>";
		$("#myErrAlert").fadeIn().delay(3000).addClass("in").fadeOut(2000);
		$("#fromDate").focus();
		return false;
	}

	if (to != '' && !to.match(re)) {
		myErrAlert.innerHTML = "<strong>Invalide date format(dd/mm/yyyy)</strong>";
		$("#myErrAlert").fadeIn().delay(3000).addClass("in").fadeOut(2000);
		$("#toDate").focus();
		return false;
	}

	if (!from || !to) {
		myErrAlert.innerHTML = "<strong>Dates cannot be empty.</strong>";
		$("#myErrAlert").fadeIn().delay(3000).addClass("in").fadeOut(2000);
		$('html,body').animate({
			scrollTop: 0
		}, 'fast')
		return false;
	} else if (!description) {
		myErrAlert.innerHTML = "<strong>Leave Reason cannot be empty.</strong>";
		$("#myErrAlert").fadeIn().delay(3000).addClass("in").fadeOut(2000);
		$('html,body').animate({
			scrollTop: 0
		}, 'fast')
		return false;
	} else {
		var fromDate = from.split("/");
		var toDate = to.split("/");
		var startDate = new Date(fromDate[2], fromDate[1] - 1, fromDate[0]);
		var endDate = new Date(toDate[2], toDate[1] - 1, toDate[0]);
		var leastDate = new Date();
		leastDate.setMonth(leastDate.getMonth() - 1);

		if (startDate.getTime() < leastDate.getTime()) {
			myErrAlert.innerHTML = "<strong>From Date should not be less than a month before today.</strong>";
			$("#myErrAlert").fadeIn().delay(3000).addClass("in").fadeOut(2000);
			$('html,body').animate({
				scrollTop: 0
			}, 'fast')
			return false;
		}

		if (startDate.getTime() > endDate.getTime()) {
			myErrAlert.innerHTML = "<strong>From Date cannot be greater than To Date.</strong>";
			$("#myErrAlert").fadeIn().delay(3000).addClass("in").fadeOut(2000);
			$('html,body').animate({
				scrollTop: 0
			}, 'fast')
			return false;
		}
	}
	return true;
}

function requestValidate() {
	$("#requestModal").css('display', 'block');
	$('body').addClass('reduce-zindex');
}

function formatDate(date) {
	var d = new Date(date), month = '' + (d.getMonth() + 1), day = ''
		+ d.getDate(), year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [day, month, year].join('/');
}

$(".myAlert").delay(3000).addClass("in").fadeOut(2000);

var today = new Date();
var dd = today.getDate();
var currentMonth = today.getMonth();
var previousMonth = currentMonth - 1;
var yyyy = today.getFullYear();
var minDate;

if (dd > 25) {
	if (dd <= 27) {
		minDate = 26 + '.' + previousMonth + '.' + yyyy;
	} else {
		minDate = 26 + '.' + currentMonth + '.' + yyyy;
	}
} else {
	minDate = 26 + '.' + previousMonth + '.' + yyyy;
}

var values = minDate.split(".");
var parsed_date = new Date(values[2], values[1], values[0]);
$(".custom-datepicker").datepicker({
	dateFormat: 'dd/mm/yy',
	showButtonPanel: true,
	minDate: parsed_date,
	showOtherMonths: true,
	selectOtherMonths: true
});