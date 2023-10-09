$(function () {
    $(document).ready(function () {
        $('.upload-button').click(function () {
            $('.upload-file').click();
        })
        $('.upload-file').on('change', function () {
            var x = document.getElementById("upload-file");
            var txt = ""
            if ('files' in x) {
                for (var i = 0; i < x.files.length; i++) {
                    var file = x.files[i];
                    if ('name' in file) {
                        txt += file.name;
                    }
                }
            }
            $('.textbox').val(txt);
        })
    });
});
