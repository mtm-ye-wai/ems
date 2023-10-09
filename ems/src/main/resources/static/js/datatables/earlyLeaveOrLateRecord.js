$(function () {
    var earlyLeaveTable = $('.earlyLeaveOrLate #datatable')
        .DataTable(
            {
                "scrollX": true,
                "autoWidth": false,
                "columnDefs": [{
                    "searchable": false,
                    "orderable": false,
                    "targets": 0
                }, {
                    "targets": [4],
                    "type": 'extract-date',
                }],
                "order": [[1, 'asc']],
            });
    $('#datatable_paginate').toggle(earlyLeaveTable.page.info().recordsDisplay > 0);
    $('#datatable_length').toggle(earlyLeaveTable.page.info().recordsDisplay > 0);
    $('#datatable_info').toggle(earlyLeaveTable.page.info().recordsDisplay > 0);
        
    $('.earlyLeaveOrLate #search-box').on('keyup', function () {
        earlyLeaveTable.search(this.value).draw();
        $('#datatable_paginate').toggle(earlyLeaveTable.page.info().recordsDisplay > 0);
        $('#datatable_length').toggle(earlyLeaveTable.page.info().recordsDisplay > 0);
        $('#datatable_info').toggle(earlyLeaveTable.page.info().recordsDisplay > 0);    
    });

    $(window).on('resize load', function () {
        earlyLeaveTable.columns.adjust();
    });

    earlyLeaveTable.on('order.dt search.dt', function () {
        earlyLeaveTable.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
})
