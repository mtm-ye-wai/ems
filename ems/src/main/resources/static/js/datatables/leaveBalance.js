$(function () {
    drawLeftLeaveTable();
    $(".alert").delay(3000).addClass("in").fadeOut(2000);

    var useOrLeft = $('#useOrLeft').val();
    var leftSize = $('#left-size').val();
    var useSize = $('#used-size').val();
    if (useOrLeft == "2") {
        $('.daterange').show();
        $('.cut-off-date').hide();
        $('#useLeaveTbl').show();
        $('#compensatory-checkbox-div').hide();
        $('#leftLeaveTbl').hide();
        $('#excel-modal').attr("data-target", "#excelUsedModal")
        $('#pdf-modal').attr("data-target", "#pdfUsedModal")
        if (useSize > 0) {
            $('#export-icons-div').show();
        } else {
            $('#export-icons-div').hide();
        }
    } else {
        $('.daterange').hide();
        $('.cut-off-date').show();
        $('#year').val($('#thisYear').val());
        $('#month').val($('#thisMonth').val());
        $('#useLeaveTbl').hide();
        $('#compensatory-checkbox-div').show();
        $('#leftLeaveTbl').show();
        $('#excel-modal').attr("data-target", "#excelLeftModal")
        $('#pdf-modal').attr("data-target", "#pdfLeftModal")
        if (leftSize > 0) {
            $('#export-icons-div').show();
        } else {
            $('#export-icons-div').hide();
        }
    }

    $('#useOrLeft').change(function() {
        var useOrLeft = $(this).val();
        var leftSize = $('#left-size').val();
        var useSize = $('#used-size').val();
        if (useOrLeft == "2") {
            $('.daterange').show();
            $('.cut-off-date').hide();
            $('#useLeaveTbl').show();
            $('#compensatory-checkbox-div').hide();
            $('#leftLeaveTbl').hide();
            $('#excel-modal').attr("data-target", "#excelUsedModal")
            $('#pdf-modal').attr("data-target", "#pdfUsedModal")
            if (useSize > 0) {
                $('#export-icons-div').show();
            } else {
                $('#export-icons-div').hide();
            }
        } else {
            $('.daterange').hide();
            $('.cut-off-date').show();
            $('#year').val($('#thisYear').val());
            $('#month').val($('#thisMonth').val());
            $('#useLeaveTbl').hide();
            $('#compensatory-checkbox-div').show();
            $('#leftLeaveTbl').show();
            $('#excel-modal').attr("data-target", "#excelLeftModal")
            $('#pdf-modal').attr("data-target", "#pdfLeftModal")
            if (leftSize > 0) {
                $('#export-icons-div').show();
            } else {
                $('#export-icons-div').hide();
            }
        }
        $(window).trigger('leftcomp');
    });

    function showHideCompensatory () {
        if ($('#compensatoryCheckbox:checked').length) {
            $(".compensatory-col").show();
        } else {
            $(".compensatory-col").hide();
        }
    }

    showHideCompensatory()
    $(window).trigger('leftcomp');
    
    $('#compensatoryCheckbox').on('change', function() {
        showHideCompensatory()
        $(window).trigger('leftcomp');
    })

    function drawLeftLeaveTable() {
        $('#leftLeaveTbl #datatable').DataTable().destroy();
        var leftLeaveTbl = $('#leftLeaveTbl #datatable')
            .DataTable(
                {
                    "searching": false,
                    "paging": false,
                    "info": false,
                    "ordering": false,
                    "scrollX": true,
                    "scrollCollapse": true,
                    "autoWidth": false,
                });
        leftLeaveTbl.draw();
        $(window).on('resize load leftcomp', function () {
            leftLeaveTbl.columns.adjust();
        });
    }

    var usedLeaveTbl = $('#useLeaveTbl #datatable')
        .DataTable(
            {
                "columnDefs": [{
                    "searchable": false,
                    "orderable": false,
                    "targets": 'no-sort'
                }],
                "scrollX": true,
                "scrollCollapse": true,
                "autoWidth": false,
                "order": [[0, 'asc']],
            });
    usedLeaveTbl.draw();
    
    $('#useLeaveTbl #searchbox').on('keyup', function () {
        usedLeaveTbl.search(this.value).draw();
    });

    $(window).on('resize load', function () {
        usedLeaveTbl.columns.adjust();
    });

})