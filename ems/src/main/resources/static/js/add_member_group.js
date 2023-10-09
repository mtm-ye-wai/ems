$(function () {
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#chatMemberTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        return false;
    });
});

$(function () {
    $('input:checkbox').click(function () {
        if ($(this).is(':checked')) {
            $('#addMember').prop("disabled", false);
        } else {
            if ($('.checks').filter(':checked').length < 1) {
                $('#addMember').attr('disabled', true);
            }
        }
    });
});

$(function () {
    $("#checkAll").click(function () {
        var reqListSize = $('.list-size').val();
        for (var i = 0; i < reqListSize; i++) {
            var checkedId = "#" + i + "chbox";
            $('#addMember').prop('disabled', !$('#checkAll:checked').length);
            if ($("#checkAll").is(':checked')) {
                $(checkedId).prop("checked", true);
            } else {
                $(checkedId).prop("checked", false);
            }
        }
    });
});