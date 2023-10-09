var userTbl = $('#datatable')
    .DataTable(
        {
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 'no-sort'
            }, {
                "targets": [1],
                "type": 'extract-date',
            }],
            "language": {
                "paginate": {
                    "previous": "<<",
                    "next": ">>"
                }
            },
            dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
                + "<'row'<'col-md-12'<'table-responsive'tr>>>"
                + "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
            "order": [[0, 'asc']]
        });
userTbl.draw();

userTbl.on('order.dt search.dt', function() {
    userTbl.column(0, {
        search: 'applied',
        order: 'applied'
    }).nodes().each(function(cell, i) {
        cell.innerHTML = i + 1;
    });
}).draw();

$('#confirm-delete').on(
    'show.bs.modal',
    function(e) {
        $(this).find('.btn-ok').attr('href',
            $(e.relatedTarget).data('href'));

        $('.debug-url').html(
            'Delete URL: <strong>'
            + $(this).find('.btn-ok').attr('href')
            + '</strong>');
    });