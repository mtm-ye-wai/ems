$(".alert").delay(3000).addClass("in").fadeOut(2000);

function openModal() {

    if ($('#file-name').val()) {
        console.log("show modal");
        $('#addModal').modal('toggle');
    } else {
        console.log("show error");
        $('p.error').html('Please choose file path.');
    }
}
function setfilename(val) {

    var fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);
    document.getElementById("file-name").value = fileName;
}

$('#add').click(function (event) {

    event.preventDefault();
    $.ajax({

        type: "POST",
        url: "addHolidays",
        data: new FormData(document.getElementById("myform")),
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,

        success: function (response) {
            if (response.status == 'FAIL') {

                showFormError(response.errorMessageList);
            } else {

                $('#exampleModal').modal('hide');
                window.location.reload();
            }
        },
        error: function (ex) {
            console.log(ex);
        }
    });
});

$('#downloadTemplate').click(function () {
    $('#downloadTemplateModal').modal('hide')
});