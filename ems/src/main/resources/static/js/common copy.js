$(document).ready(function () {
    // prevent keydown
    $(window).keydown(function(event) {
        if (event.keyCode == 13 && event.target.name !== 'loginId' && event.target.name !== 'password' && event.target.name !== 'forgotEmail' && event.target.tagName.toLowerCase() !== 'textarea') {
            event.preventDefault();
            return false;
        }
    });

    // sidebar
    $('#sidebar-btn').click(function () {
        $('.sidebar').toggleClass('visible');
        $('.main').toggleClass('visible');
        $('.logo a').toggleClass('visible');
        $('footer').toggleClass('visible');
    });

    // datepicker
    $(".custom-datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        beforeShow: function (readonly) { if ($(readonly).attr('readonly')) { return false; } }
    });

    $(".cal-ico").on('click', function () {
        var $datepickerInput = $(this).siblings(".custom-datepicker");
        $datepickerInput.focus();
    });
    
    $('.custom-datepicker').attr("autocomplete", "off");

    //Action button
    $('.action-btn').click(function () {
        dropDownFixPosition($(this), $('.row-action-list'));
        if ($('.action-list').hasClass('action-visible')) {
            $('.action-list').not($(this).next()).removeClass('action-visible')
        }
        $(this).next().toggleClass('action-visible');
    })

    $(window).scroll(function () {
        $('.row-action-list').removeClass('action-visible');
    })

    //True false select
    $('.true-false').click(function () {
        if ($('.action-list').hasClass('action-visible')) {
            $('.action-list').not($(this).find('.action-list')).removeClass('action-visible')
        }
        $(this).find('.action-list').toggleClass('action-visible')
    })
    $('.true-false .action-menu').click(function () {
        if ($(this).children().attr('class') == 'true') {
            $(this).parent().parent().find(".result-img").attr({ "src": "img/ico_true.png" });
        }
        if ($(this).children().attr('class') == 'false')
            $(this).parent().parent().find(".result-img").attr({ "src": "img/ico_false.png" });
    })

    //Tab-menu
    $('.tab-list a').click(function () {
        $('.tab-list li').removeClass('active-tab');
        $(this).parent().addClass('active-tab');
        let currentTab = $(this).attr('href');
        $('.tab-content .content-txt').hide();
        $(currentTab).show();
        return false;
    });
   
    //setting tab
    $('.setting-link li:first-child').addClass('active');
    $('.setting-tab').hide();
    $('.setting-tab:first-child').show();
    $(".setting-link li").click(function () {
        $('.setting-link li').removeClass('active');
        $(this).addClass('active');
        $('.setting-tab').hide();

        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
    });

    //Data Table
    var dataTable = $('.common #datatable').DataTable({
        "scrollX": true,
        "autoWidth": false,
        "scrollCollapse": true,
        //"responsive": [
        //    {
        //        breakpoint: 1500
        //    }
        //]
    }).columns.adjust().draw();

    $('.common #searchbox').on('keyup', function () {
        dataTable.search(this.value).draw();
    });
    $(window).on('resize click load', function () {
        dataTable.columns.adjust();
    });
});

$(document).on('click', '.toggle', function (e) {
    e.preventDefault();
    $(".child-nav-list").not($(this).next()).slideUp();
    $(this).next().slideToggle();
    return false;
});

$(document).on('click', '.nav-sp', function (e) {
    e.preventDefault();
     this.classList.toggle("active");
     $('.nav-sp').not($(this)).removeClass('active');
    $(".sub-nav-list").not($(this).next()).slideUp();
    $(this).next().slideToggle();
    return false;
});

$(document).on('click', '.sp-logout', function (e) {
    e.preventDefault();
    $(this).next().slideToggle();
    return false;
});

/** functions */
function showHidePassword(pwdId) {
    if ($(pwdId).find('input').attr("type") == "text") {
        $(pwdId).find('input').attr('type', 'password');
        $(pwdId).find('i').addClass("fa-eye-slash");
        $(pwdId).find('i').removeClass("fa-eye");
    } else if ($(pwdId).find('input').attr("type") == "password") {
        $(pwdId).find('input').attr('type', 'text');
        $(pwdId).find('i').removeClass("fa-eye-slash");
        $(pwdId).find('i').addClass("fa-eye");
    }
}

function dropDownFixPosition(button, dropdown) {
    var dropDownTop = button.offset().top-$(window).scrollTop()+button.outerHeight();
    dropdown.css('top', dropDownTop + "px");
    dropdown.css('left', button.offset().left-150 + "px");
}
