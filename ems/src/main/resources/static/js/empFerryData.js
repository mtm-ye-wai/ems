var tableData = $('#datatable')
    .DataTable(
        {
            "autoWidth" : false,
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 'no-sort'
            },
            {
                "width" : "3%",
                "targets" : [0]
            },
            {
                "width" : "10%",
                "targets" : [1]
            },
            {
                "width" : "14%",
                "targets" : [2]
            },
            {
                "width" : "10%",
                "targets" : [3]
            },
            {
                "width" : "7%",
                "targets" : [8]
            },
            {
                "width" : "15%",
                "targets" : [4,6]
            },
            {
                "width" : "10%",
                "targets" : [5,7]
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
            "order": [[0, 'asc']],
            "ordering" : false
        });
tableData.draw();

tableData.on('order.dt search.dt', function() {
    tableData.column(0, {
        search: 'applied',
        order: 'applied'
    }).nodes().each(function(cell, i) {
        cell.innerHTML = i + 1;
    });
}).draw();


$('#excel').click(function() {
	$('#excelModal').modal('hide')
});
