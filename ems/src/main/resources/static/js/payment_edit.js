$(".alert").delay(3000).addClass("in").fadeOut(2000);
function isNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}
var totalSalary = toNumber($("#totalSalary").text());
var grossSalary = toNumber($("#grossSalary").text());
var totalDeduction = toNumber($("#totalDeduction").text());
var oldSIval = toNumber($("#skillInput").val());
var oldGIval = toNumber($("#otherInput").val());
var oldDIval = toNumber($("#deductionInput").val());
var netSalary = toNumber($("#netSalary").text());

$('#skillInput').keyup(function () {
    var SIval = toNumber($(this).val());
    var ts = totalSalary - oldSIval;
    totalSalary = SIval + ts;
    grossSalary = (grossSalary + SIval) - oldSIval;
    netSalary = (netSalary + SIval) - oldSIval;
    $(".totalSalary").val(numberFormat(totalSalary));
    $(".grossSalary").val(numberFormat(grossSalary));
    $(".skillInput").val(numberFormat(SIval));
    $(this).val(numberFormat(SIval));
    $(".netSalary").val(numberFormat(netSalary));
    $("#totalSalary").text(numberFormat(totalSalary));
    $("#grossSalary").text(numberFormat(grossSalary));
    $("#netSalary").text(numberFormat(netSalary));
    oldSIval = SIval;
});

$('#otherInput').keyup(function () {
    var GIval = toNumber($(this).val());
    var tg = grossSalary - oldGIval;
    grossSalary = GIval + tg;
    netSalary = (netSalary) + (GIval) - oldGIval;
    $(".grossSalary").val(numberFormat(grossSalary));
    $(".otherInput").val(numberFormat(GIval));
    $(this).val(numberFormat(GIval));
    $(".netSalary").val(numberFormat(netSalary));
    $("#grossSalary").text(numberFormat(grossSalary));
    $("#netSalary").text(numberFormat(netSalary));
    oldGIval = GIval;
});

$('#deductionInput').keyup(function () {
    var DIval = toNumber($(this).val());
    var td = totalDeduction - oldDIval;
    totalDeduction = DIval + td;
    netSalary = (netSalary) + (oldDIval) - DIval;
    $(".totalDeduction").val(numberFormat(totalDeduction));
    $(".deductionInput").val(numberFormat(DIval));
    $(this).val(numberFormat(DIval));
    $(".netSalary").val(numberFormat(netSalary));
    $("#totalDeduction").text(numberFormat(totalDeduction));
    $("#netSalary").text(numberFormat(netSalary));
    oldDIval = DIval;
});


function toNumber(str) {
    str = str && str.replace(/,/g, "");
    return Number(str);
}


function numberFormat(str) {
    var number = str.toLocaleString();
    return number;
}