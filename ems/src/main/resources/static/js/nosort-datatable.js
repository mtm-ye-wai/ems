$(document)
	.ready(
		function() {
			var noSortTbl = $('.no-sorting #datatable')
				.DataTable(
					{
                        "paging": false,
                        "ordering": false,
                        "searching": false,
						"info": false, 
						"scrollX": true,
						"autoWidth": false,
        				"scrollCollapse": true,
					});

			$(window).on('resize load', function () {
				noSortTbl.columns.adjust();
			});

})
