var tbl = $('.equipment #datatable').DataTable({
    "scrollX": true,
    "autoWidth": false,
    "scrollCollapse": true,
    "columnDefs": [{
        "searchable": false,
        "orderable": false,
        "targets": 'no-sort'
    }],
    "language": {
        "paginate": {
            "previous": "Previous",
            "next": "Next"
        }
    },
    "order": [
        [1, 'asc']
    ]
});

$(window).on('resize click load', function () {
    tbl.columns.adjust();
});

$('.equipment #searchbox').on('keyup', function () {
    tbl.search(this.value).draw();
});

tbl.on('order.dt search.dt', function() {
    tbl.column(0, {
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
            'Delete URL: <strong>' +
            $(this).find('.btn-ok').attr('href') +
            '</strong>');
    });
