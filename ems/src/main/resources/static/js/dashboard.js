function download(response) {
    var element = document.createElement('a');
    element.setAttribute('href', response.filePath);
    element.setAttribute('download', response.fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function getFileType() {
    if (!$('#org-err-msg').hasClass('none')) {
        $('#org-err-msg').addClass('none');
    }
    $.ajax({
        type: "GET",
        url: "organizationChartURL",
        processData: false,
        contentType: false,
        success: function (response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            if (response) {
                if (!$('#org-err-msg').hasClass('none')) {
                    $('#org-err-msg').addClass('none');
                }
                if (response.fileExtension == "pdf" || response.fileExtension == "xls" || response.fileExtension == "xlsx") {
                    download(response);
                } else {

                    var orgChart = document.getElementById('org-chart');
                    orgChart.click();
                }
            } else {
                if ($('#org-err-msg').hasClass('none')) {
                    $('#org-err-msg').removeClass('none');
                    $('#myAlert').show();
                    $('.org-err-msg').text("Organization Chart file does not exist yet!");
                    $(".alert").delay(3000).addClass("in").fadeOut(2000);
                }
            }

        },
        error: function(ex) {
            console.log("error");
        }
    });
}