/* メニューを開く */
$(function() {
	$(document).on('click', '.content , .content-h', function() {
		$('.user-menu').slideUp('slow');
	});

	$(document).on('click', '.menu-bar', function() {
		$('.navigation').toggleClass('toggle');
		$(this).toggleClass('is-active');
		return false;
	});

	$(document).on('click', '.dropdown', function() {
		$(this).find('.sub-menu').slideToggle('slow');
		$(this).find('a').toggleClass('open');
	});

	$(document).on('click', '.content , .content-h', function() {
		$('.navigation').removeClass('toggle');
		$('.menu-bar').removeClass('is-active');
	});

	$(document).on('click', '.nav-ttl', function() {
		$(this).find('.lists').slideToggle('slow');
		$(this).find('a').toggleClass('open');
		$(this).find('.lists li a').removeClass('open');
	});
	$(document).on('click', '.lists', function() {
		$(this).find('li').removeToggle('slow');
	});
	jQuery.extend(jQuery.fn.dataTableExt.oSort, {
		"extract-date-pre": function(value) {
			var date = value.split('/');
			return (date[2] + date[1] + date[0]) * 1;
		},

		"extract-date-asc": function(a, b) {
			return ((a < b) ? -1 : ((a > b) ? 1 : 0));
		},

		"extract-date-desc": function(a, b) {
			return ((a < b) ? 1 : ((a > b) ? -1 : 0));
		}
	});

});
$(window).keydown(function(event) {
	if (event.keyCode == 13 && event.target.name !== 'loginId' && event.target.name !== 'password' && event.target.name !== 'forgotEmail' && event.target.tagName.toLowerCase() !== 'textarea') {
		event.preventDefault();
		return false;
	}
});