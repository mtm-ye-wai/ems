$(document).ready(function() {
    // open modal
	$('.open-btn').click(function(e) {
		e.preventDefault();
		var target = $(this).attr('data-target');
        $(target).css('display', 'block');
		$('body').addClass('reduce-zindex');

        // custom bind href
        bindUrl = $(this).data('href');
        if (bindUrl) {
            $(target).find('.btn-ok').attr('href',bindUrl);
        }
	});

    // close modal
	$('.close-btn, .download-btn, .submit-btn').click(function(e) {
		$(`.modalDialog`).css('display', 'none');
        $('body').removeClass('reduce-zindex');
	});
});