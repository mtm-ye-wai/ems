var dob = $('#dob').html();
var dobSlice = dob.substring(0, 11);
var replaceDob = dobSlice.split('-');
$('#dob').html(replaceDob[2] + '/ ' + replaceDob[1] + ' / ' + replaceDob[0]);

var joinDate = $('#joinDate').html();
var joinDateSlice = joinDate.substring(0, 11);
var replaceJoinDate = joinDateSlice.split('-');
$('#joinDate').html(
    replaceJoinDate[2] + '/ ' + replaceJoinDate[1] + ' / '
    + replaceJoinDate[0]);

var nrcDob = $('#nrcDob').html();
if (nrcDob) {
    var nrcDobSlice = nrcDob.substring(0, 11);
    var replaceNrcDob = nrcDobSlice.split('-');
    $('#nrcDob').html(
        replaceNrcDob[2] + '/ ' + replaceNrcDob[1] + ' / ' + replaceNrcDob[0]);
}

$(".alert").delay(3000).addClass("in").fadeOut(2000);