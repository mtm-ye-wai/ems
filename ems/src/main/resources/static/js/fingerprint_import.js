function setfilename(target) {
    document.getElementById("add").disabled = true;
    var fileName = target.value.substr(target.value.lastIndexOf("\\") + 1,
        target.value.length);
    document.getElementById("file-name").value = fileName;
    var oFile = target.files[0];
    var reader = new FileReader();
    var extension = fileName.split('.').pop();
    reader.onload = function (e) {
        var data = e.target.result;
        if (extension == 'xlsx') {
            var workbook = XLSX.CFB.read(data, {
                type: 'binary'
            });
            var oJS = XLSX.utils.sheet_to_row_object_array(workbook.SheetNames);
            window.total = oJS.length * 13.5082291;
            window.interval = (total) / 100;
        }
        else {
            var cfb = XLS.CFB.read(data, {
                type: 'binary'
            });
            var wb = XLS.parse_xlscfb(cfb);
            wb.SheetNames.forEach(function (sheetName) {
                var oJS = XLS.utils
                    .sheet_to_row_object_array(wb.Sheets[sheetName]);
                window.total = oJS.length * 13.5082291;
                window.interval = (total) / 100;
            });
        }
        document.getElementById("add").disabled = false;
    };
    reader.readAsBinaryString(oFile);
}

$(document).on("click", "#add", function (event) {
    event.preventDefault();
    if ($('#file-name').val()) {
        $.ajax({
            type: "POST",
            url: "importFingerprint",
            data: new FormData(document.getElementById("myform")),
            enctype: 'multipart/form-data',

            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();

                xhr.upload.onprogress = function (event) {
                    t = setTimeout("updateStatus()", window.interval);
                };

                return xhr;
            },
            beforeSend: function (xhr) {
                $("#uploadModal").modal('toggle');
                resetStatus();
            },
            success: function (response) {
                var remaining = 0;

                if (window.perc < 99) {
                    remaining = (99 - window.perc) * window.interval;
                }

                setTimeout(finish, remaining, response);
            },
            error: function (ex) {
                console.log(ex);
            }
        });
    } else {
        var myErrAlert = document.getElementById("myErrAlert");
        myErrAlert.innerHTML = "<strong>Please choose file path.</strong>";
        $("#myErrAlert").fadeIn().delay(3000).addClass("in").fadeOut(2000);
    }
});
function setfilename(val) {
	var fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);
	document.getElementById("file-name").value = fileName;
}

function updateStatus() {
    if (window.perc < 100) {
        window.perc += 1;
    }
    $('#progressBar').text(window.perc + '%');
    $('#progressBar').css('width', window.perc + '%');

    if (window.perc < 99) {
        t = setTimeout("updateStatus()", window.interval);
    } else {
        clearTimeout(t);
    }
}

function resetStatus() {
    window.perc = 0;
    $('#progressBar').text('');
    $('#progressBar').css('width', '0%');
}

function finish(response) {
    window.perc = 100;
    $('#progressBar').text(window.perc + '%');
    $('#progressBar').css('width', window.perc + '%');
    setTimeout(refresh, 1000, response);
}

function refresh(response) {
    $("#uploadModal").modal('hide');
    document.body.innerHTML = response;
    $(".alert").delay(3000).addClass("in").fadeOut(2000);
    $('#show-names').modal('show');
}