$(".alert").delay(3000).addClass("in").fadeOut(2000);

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

