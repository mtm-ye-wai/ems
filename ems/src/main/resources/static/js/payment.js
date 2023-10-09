function goBack() {
    window.history.back();
}
function exportPdf() {
    $('#pdfModal').modal('hide');
    var HTML_Width = $(".pdfExport").width();
    var HTML_Height = $(".pdfExport").height();
    var empName = $('#name').text();
    var PDF_Width = HTML_Width;
    var PDF_Height = (PDF_Width * 1.3);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var htmlSource = $('.pdfExport')[0];
    html2canvas(htmlSource, {
        scrollY: -window.scrollY
    }).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.setFontSize(7);
        pdf.addImage(imgData, 'JPEG', 90, 30, 550, 930);
        /*pdf.setDrawColor(9, 74, 130);*/
        pdf.save(empName + "_" + month + year + ".pdf");
    });
}

$('#excel').click(function() {
    $('#excelModal').modal('hide');
});
$('#pdf').click(function() {
    $('#pdfModal').modal('hide');
});

$(".alert").delay(3000).addClass("in").fadeOut(2000);