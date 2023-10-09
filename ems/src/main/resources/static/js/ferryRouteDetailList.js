$(function() {
    $("#employeeName").on("blur keydown change", function(e) {
        var val = this.value.trim();
        if (val.length == 0) {
            this.value = "";
        }
        if (e.key == 'Enter' || e.type == 'blur' || e.type == 'change') {
            fromSubmit();
        }
        
    });
});
function fromSubmit() {
    var form = document.getElementById('submit-form');
    var empName = $("#employeeName");
    var searchDate = $("#date");
    var data = ``;
    if (searchDate[0] != null) {
        var date = searchDate[0].value;
        var dateSplit = date.split('/');
        var dateSearch = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];
        data += `<input type='hidden' id="date" name='date' value='${dateSearch}'>`;
    }
    data += empName[0] == null ? '' : `<input type="hidden" id="employeeName" name='employeeName' value='${empName[0].value}'>`;
    $('#employeeName').val(empName[0].value);
    console.log(data);
    form.innerHTML = data;
    form.submit();
}