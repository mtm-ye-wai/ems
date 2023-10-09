$(document).ready(function () {
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "date-uk-pre": function (a) {
            var ukDatea = a.split('/');
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },

        "date-uk-asc": function (a, b) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-uk-desc": function (a, b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });

    var t = $('#datatable').DataTable({
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0
        },
        {
            "type": "date-uk",
            "targets": 1
        }],
        dom: "<'row'<'col-sm-4'><'col-sm-5'p><'col-sm-3'>>"
            + "<'row'<'col-md-4'l><'col-md-4'><'col-md-4'f>>"
            + "<'row'<'col-sm-12'tr>>"
            + "<'row'<'col-sm-5'i>>",
        "order": [[1, 'asc']]
    });

    t.on('order.dt search.dt', function () {
        t.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
});

$(".alert").delay(3000).addClass("in").fadeOut(2000);

$('#confirm-delete').on(
    'show.bs.modal',
    function (e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

        $('.debug-url').html(
            'Delete URL: <strong>' + $(this).find('.btn-ok').attr('href')
            + '</strong>');
    });