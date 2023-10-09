$(".alert").delay(3000).addClass("in").fadeOut(2000);

$(".alert .alert-cancel").click(function() {
	$(this).parent().hide();
});