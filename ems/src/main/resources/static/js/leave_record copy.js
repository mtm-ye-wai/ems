var historyTbl = $('.leave-history-list #datatable')
    .DataTable(
        {
            "scrollX": true,
            "autoWidth": false,
            "searching": false,
            "paging": false,
            "info": false,
            "ordering": false,
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 'no-sort'
            }, {
                "targets": [4, 7, 8, 9],
                "type": 'extract-date',
            }],
            "language": {
                "paginate": {
                    "previous": "<<",
                    "next": ">>"
                }
            },
            "order": [[1, 'asc']],
            fixedColumns: {
                leftColumns: 3
            }
        });

historyTbl.on('order.dt search.dt', function() {
    historyTbl.column(0, {
        search: 'applied',
        order: 'applied'
    }).nodes().each(function(cell, i) {
        cell.innerHTML = i + 1;
    });
}).draw();

$(window).on('resize load', function () {
    historyTbl.columns.adjust();
});
