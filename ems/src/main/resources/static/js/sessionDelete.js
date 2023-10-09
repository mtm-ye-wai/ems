$(document).ready(function() {
	$(".sessDel").click(function() {
		$.ajax({
			type: "get",
			url: "deleteSession",
			processData: false,
			contentType: false,
			success: function(response, status, xhr) {
				console.log(response);
			},
			error: function(ex) {
				console.log("error");
			}
		});
	});
});