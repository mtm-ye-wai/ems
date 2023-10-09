$(document).ready(function() {
	//show entities
	var total = $('#size').val();
	var start = 1;
	var end = $('#limit').val();
	if ($('#page').val() > 1) {
		start = ($('#limit').val() * ($('#page').val() - 1)) + 1;
		end = $('#limit').val() * $('#page').val();
	}
	if (parseInt(total) < parseInt(end)) {
		end = total;
	}
	var text = document.getElementById('showTotal');
	if (text != null) {
		text.innerText = "Showing " + start + " to " + end + " of " + total + " entries";
	}
});

//form submit id
if ($('#jsp').val() == "wfh") {
	var id = "#movePageWFH";
} else if ($('#jsp').val() == "leave" || $('#jsp').val() == "attendance" || $('#jsp').val() == "leaveBalance") {
	var id = "#movePage";
} else if ($('#jsp').val() == "overtime") {
	var id = "#movePageOvertime";
}

//submit
function limitSubmit() {
	$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form" + id);
	$('#limit').val($('#secLimit').val());
	$('#page').val(1);
	$('#sort').val();
	$('form' + id).submit()
}
function pageNumSubmit(page) {
	$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form" + id);
	$('#page').val("");
	$('#page').val(page);
	$('#sort').val();
	$('form' + id).submit();
}
function pageSubmit() {
	$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form" + id);
	$('#limit').val(10);
	$('#page').val(1);
	$('#sort').val();
	$('form' + id).submit();
}

//paginatoin
var itemsCount = $('#size').val();
var itemsOnPage = $('#limit').val();
var pagination = new Pagination({
	container: $("#pagination")
});
var pageNum = $('#page').val();
pagination.make(itemsCount, itemsOnPage, pageNum);