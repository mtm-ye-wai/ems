function filevalidation() {
    const fi = document.getElementById('file');
    const filePath = fi.value;
    if (fi.files.length > 0) {
        for (var i = 0; i <= fi.files.length - 1; i++) {
            var filename = filePath.substring(filePath.lastIndexOf('\\') + 1);
            var sp = filename.split(".");
            var type = sp[sp.length - 1];
            const filesize = fi.files.item(i).size;
            if (filesize > 2000000 && (type.toLowerCase() == "jpg" || type == "jpeg" || type == "png" || type == "gif" || type == "pdf" || type == "xls" || type == "xlsx")) {
                if ($('#err-org-img').hasClass('none')) {
                    $('#err-org-img').removeClass('none');
                }
            } else {
                document.getElementById("add").disabled = false;
                if (!$('#err-org-img').hasClass('none')) {
                    $('#err-org-img').addClass('none');
                }
            }
        }
    }
}

function zoomin() {
    var containerWidth = $('.card-shadow').width();
    var originalImageWidth = $('#org-chart-img').width();
    var newImageWidth = originalImageWidth + 50;
    if(containerWidth > originalImageWidth && containerWidth > newImageWidth) {
        document.getElementById("org-chart-img").style.width = newImageWidth + "px";
    } else {
        $(".zoom-in").hide();
        document.getElementById("org-chart-img").style.width = containerWidth + "px";
    }
}

function zoomout() {
    $(".zoom-in").show();
    var orgImg = document.getElementById("org-chart-img");
    var currWidth = orgImg.clientWidth;
    orgImg.style.width = (currWidth - 50) + "px";
}

function download(response) {
    var element = document.createElement('a');
    element.setAttribute('href', response.filePath);
    element.setAttribute('download', response.fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    $('#downloadImageModal').modal('hide');
}

function getFileType() {
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
                download(response);
            }
        },
        error: function(ex) {
            console.log("error");
        }
    });
}

function setfilename(val) {
    var fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);
    document.getElementById("file-name").value = fileName;
}

$(".alert").delay(3000).addClass("in").fadeOut(2000);