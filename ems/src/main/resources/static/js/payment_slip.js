var fixHelperModified = function (e, tr) {
    var $originals = tr.children();
    var $helper = tr.clone();
    $helper.children().each(function (index) {
        $(this).width($originals.eq(index).width())
    });
    return $helper;
}, updateIndex = function (e, ui) {

    $('#skillEdit tr').each(function (i) {
        $(this).find('td:eq(0) input[type=hidden]').val((i - 1) + 1);
        $(this).find('td:eq(0) span').text((i - 1) + 1);
    });
    $('#otherEdit tr').each(function (i) {
        $(this).find('td:eq(0) input[type=hidden]').val((i - 1) + 1);
        $(this).find('td:eq(0) span').text((i - 1) + 1);
    });
    $('#deductionEdit tr').each(function (i) {
        $(this).find('td:eq(0) input[type=hidden]').val((i - 1) + 1);
        $(this).find('td:eq(0) span').text((i - 1) + 1);
    });
};
$("#skillEdit tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
}).disableSelection();

$("#skillEdit tbody").sortable({
    distance: 5,
    delay: 100,
    opacity: 0.6,
    cursor: 'move',
    update: function () {
    }
});
$("#otherEdit tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
}).disableSelection();

$("#otherEdit tbody").sortable({
    distance: 5,
    delay: 100,
    opacity: 0.6,
    cursor: 'move',
    update: function () {
    }
});

$("#deductionEdit tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
}).disableSelection();

$("#deductionEdit tbody").sortable({
    distance: 5,
    delay: 100,
    opacity: 0.6,
    cursor: 'move',
    update: function () {
    }
});
$(".alert").delay(3000).addClass("in").fadeOut(2000);