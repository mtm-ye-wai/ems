var listSize = parseInt($('.list_size_ellipsis').val());
for (i = 0; i < listSize; i++) {
    if ($(".description" + i).text().length > 30) {
        short_text = $(".description" + i).text().substr(0, 30);
        $(".description" + i).text(short_text + "...");
    }
}
for (i = 0; i < listSize; i++) {
    if ($(".remark" + i).text().length > 40) {
        short_text = $(".remark" + i).text().substr(0, 40);
        $(".remark" + i).text(short_text + "...");
    }
}

$("#datatable_paginate").click(function () {
    listSize = parseInt($('.list_size_ellipsis').val());
    for (i = 0; i < listSize; i++) {
        if ($(".description" + i).text().length > 30) {
            short_text = $(".description" + i).text().substr(0, 30);
            $(".description" + i).text(short_text + "...");
        }
    }
    for (i = 0; i < listSize; i++) {
        if ($(".remark" + i).text().length > 40) {
            short_text = $(".remark" + i).text().substr(0, 40);
            $(".remark" + i).text(short_text + "...");
        }
    }
});