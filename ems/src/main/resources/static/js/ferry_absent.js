$('#ferryName').change(function (event) {
    var fid = $(this).find('option:selected').val();
    console.log(fid);
    if (fid) {
        $.each(list, function (index, value) {
            var bb = value.toString();
            var splitName = bb.split(',');
            if (splitName[1] == fid) {
                $('#busNumber').val(splitName[2]);
                $('#ferryName').val(splitName[1]);
                $('#ferryId').val(splitName[0]);
                $('#destinationMsg').val(splitName[3]);
            }
        });
    } else {
        $('#busNumber').val("");
        $('#ferryId').val("");
        $('#busNo').val("");
        $('#destinationMsg').val("");
    }
});

$("#busNumber").prop("readonly", true);
$("#destinationMsg").prop("readonly", true);
$(".alert").delay(3000).addClass("in").fadeOut(2000);