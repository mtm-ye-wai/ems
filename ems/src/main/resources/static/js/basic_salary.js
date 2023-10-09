$('#excel').click(function () {
    $('#excelModal').modal('show')
    $('#excelModal').modal('hide')
});
$('#pdf').click(function () {
    $('#pdfModal').modal('show')
    $('#pdfModal').modal('hide')
});

$(document)
    .ready(
        function () {
            var t = $('#datatable')
                .DataTable(
                    {
                        "columnDefs": [{
                            "searchable": false,
                            "orderable": false,
                            "targets": 'no-sort'
                        }, {
                            "width": "130px",
                            "targets": 2
                        }],
                        "language": {
                            "paginate": {
                                "previous": "<<",
                                "next": ">>"
                            }
                        },
                        dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
                            + "<'row'<'col-md-12'<'table-responsive'tr>>>"
                            + "<'row'<'col-sm-5'i>>"
                            + "<'row'<'col-sm-12'p>>",
                        "order": [[1, 'asc']],
                        scrollX: true,
                        fixedColumns: {
                            leftColumns: 3
                        }
                    });

            t.on('order.dt search.dt', function () {
                t.column(0, {
                    search: 'applied',
                    order: 'applied'
                }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
            var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
            if (paginate_buttons.length > 2) {
                $('#datatable_paginate').show();
            } else {
                $('#datatable_paginate').hide();
            }
        });