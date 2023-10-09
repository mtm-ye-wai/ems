$(".alert").delay(3000).addClass("in").fadeOut(2000);

function generateYearAndMonth() {
    if (document.getElementById("day").value != "") {
        var day = document.getElementById("day").value.split("/");
        date = new Date(day[2], day[1] - 1, day[0]);
        var month_names = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        document.getElementById("year").value = date.getFullYear();
        document.getElementById("month").value = month_names[date
            .getMonth()];
    }
}

(function () {
    $('ui-state-active').css("background-color", "#2ECC40");
}());