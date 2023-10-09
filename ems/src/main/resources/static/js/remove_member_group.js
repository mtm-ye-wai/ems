$(function () {
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#chatMemberTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

$(function () {
    $('input:checkbox').click(function () {
        if ($(this).is(':checked')) {
            $('#removeMember').prop("disabled", false);
        } else {
            if ($('.checks').filter(':checked').length < 1) {
                $('#removeMember').attr('disabled', true);
            }
        }
    });
});

$(function () {
    $("#checkAll").click(function () {
        var reqListSize = $('.list-size').val();
        for (var i = 0; i < reqListSize; i++) {
            var checkedId = "#" + i + "chbox";
            if ($("#checkAll").is(':checked')) {
                $(checkedId).prop("checked", true);
            } else {
                $(checkedId).prop("checked", false);
            }
        }
    });
});