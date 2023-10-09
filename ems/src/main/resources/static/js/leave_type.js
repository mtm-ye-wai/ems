$(document)
    .ready(
        function () {
            var t = $('#datatable')
                .DataTable(
                    {                   
                        "scrollX": true,
                        "autoWidth": false,
                        "scrollCollapse": true,
                        "columnDefs": [{
                            "searchable": false,
                            "orderable": false,
                            "targets": 'no-sort'
                        }],
                        "order": [[2, 'asc']]
                    });

            $(window).on('resize click load', function () {
                t.columns.adjust();
            });

            t.on('order.dt search.dt', function () {
                t.column(0, {
                    search: 'applied',
                    order: 'applied'
                }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();

            $('.leave-type-list #searchbox').on('keyup', function () {
                t.search(this.value).draw();
            });
        });

$(".alert").delay(3000).addClass("in").fadeOut(2000);

$('#confirm-delete').on(
    'show.bs.modal',
    function (e) {
        $(this).find('.btn-ok').attr('href',
            $(e.relatedTarget).data('href'));

        $('.debug-url').html(
            'Delete URL: <strong>'
            + $(this).find('.btn-ok').attr('href')
            + '</strong>');
    });

function isNumber(el, evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}

function formatNumber(event) {
    if (event.which >= 37 && event.which <= 40) {
        event.preventDefault();
    }
};

function preventCopyPaste(event) {
    if (event.which == 17 || event.which == 86 || event.which == 67) {
        event.preventDefault();
    }
}
