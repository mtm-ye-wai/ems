$(document)
	.ready(
		function() {
			var t = $('.cmn-tbl')
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
						"order": [[1, 'asc']],
					});

			$(window).on('resize click load', function() {
				t.columns.adjust();
			});

			$('#searchbox').on('keyup', function() {
				t.search(this.value).draw();
			});
			
			t.on('order.dt search.dt', function() {
				t.column(0, {
					search: 'applied',
					order: 'applied'
				}).nodes().each(function(cell, i) {
					cell.innerHTML = i + 1;
				});
			}).draw();

			var listTbl = $('.attri-detail-list #datatable')
				.DataTable(
					{
						"stateSave": true,
						"columnDefs": [{
							"searchable": false,
							"orderable": false,
							"targets": 'no-sort',
						}, {
							"width": "30px",
							"targets": 0
						}, {
							"width": "100px",
							"targets": 1
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
						dom: "<'row'<'col-sm-7 d-flex searchform justify-content-between'l><'col-sm-5 d-flex justify-content-end'f>>"
							+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
							+ "<'row'<'col-sm-5'i>>"
							+ "<'row'<'col-sm-12'p>>",
						"order": [[1, 'asc']],
						"autoWidth": false,
						scrollX: true
					});

			$('.attri-detail-list #datatable').on('click', 'td.details-control', function() {
				var tr = $(this).closest('tr');
				var row = listTbl.row(r);
				if (row.child.isShown()) {
					row.child.hide();
					tr.find('.details-control').html("<i class='fa fa-plus-circle'></i>");
					tr.removeClass('shown');
				}
				else {
					row.child(detailFormat(row.data())).show();
					tr.find('.details-control').html("<i class='fa fa-minus-circle'></i>");
					tr.addClass('shown');
				}
			});

			var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
			if (paginate_buttons.length > 2) {
				$('#datatable_paginate').show();
			} else {
				$('#datatable_paginate').hide();
			}

		});

$(".alert").delay(3000).addClass("in").fadeOut(2000);

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

function clickCardHeader(id) {
	var cardId = "#" + id;
	console.log(cardId);
	if ($(cardId).hasClass('open')) {
		$(cardId).removeClass('open');
	} else {
		$(cardId).addClass('open');
	}
}

function resetModalEvent() {
	$('#custom-export input[type="checkbox"]:checked').prop('checked', false);
	if (!$('#collapseOne1').hasClass('show')) {
		$('#collapseOne1').addClass('show');
		$('#card-title1').addClass('open');
	}
	if ($('#collapseTwo2').hasClass('show')) {
		$('#collapseTwo2').removeClass('show');
		$('#card-title2').removeClass('open');
	}
	if ($('#collapseThree3').hasClass('show')) {
		$('#collapseThree3').removeClass('show');
		$('#card-title3').removeClass('open');
	}
}

$('#customExport').submit(function(e) {
	$('#custom-export').modal('hide');
	$('#customExport').submit();
	return false;
});

$('#skill_sel_all').click(function() {
	if ($(this).prop("checked") == true) {
		$('.skill_chk_data').each(function() {
			if (!this.checked) {
				this.checked = true;
				$(this).trigger("change");
			}
		});

	}
	else if ($(this).prop("checked") == false) {
		$('.skill_chk_data').each(function() {
			this.checked = false;
			$(this).trigger("change");
		});
	}
});

$('#add_sel_all').click(function() {
	if ($(this).prop("checked") == true) {
		$('.add_chk_data').each(function() {
			if (!this.checked) {
				this.checked = true;
				$(this).trigger("change");
			}
		});

	}
	else if ($(this).prop("checked") == false) {
		$('.add_chk_data').each(function() {
			this.checked = false;
			$(this).trigger("change");
		});
	}
});

$('#ded_sel_all').click(function() {
	if ($(this).prop("checked") == true) {
		$('.ded_chk_data').each(function() {
			if (!this.checked) {
				this.checked = true;
				$(this).trigger("change");
			}
		});

	}
	else if ($(this).prop("checked") == false) {
		$('.ded_chk_data').each(function() {
			this.checked = false;
			$(this).trigger("change");
		});
	}
});

function detailFormat(data) {
	// for skill amount table
	let skillAmountHeaderTxt = $('.skill-amount-header')[0].innerText;
	let skillAmountHeaders = (skillAmountHeaderTxt == '' || skillAmountHeaderTxt == undefined) ? [] : skillAmountHeaderTxt.split('#');
	let skillAmountAmountTxt = data[4];
	let skillAmounts = (skillAmountAmountTxt == '' || skillAmountAmountTxt == undefined) ? [] : skillAmountAmountTxt.split('#');
	let skillAmountTemplate = '<table class="table detail-table mr-3"><tr><td colspan="2" class="text-center align-middle bg-green font-weight-bold">Skill</td></tr>';
	skillAmountHeaders.forEach(function(value, i) {
		if (value.trim()) {
			skillAmountTemplate += `<tr><td class="align-middle">${value}</td><td class="align-middle text-right">${skillAmounts[i]}</td></tr>`;
		}
	});
	skillAmountTemplate += '</table>';

	// for other amount table
	let otherAmountHeaderTxt = $('.other-amount-header')[0].innerText;
	let otherAmountHeaders = (otherAmountHeaderTxt == '' || otherAmountHeaderTxt == undefined) ? [] : otherAmountHeaderTxt.split('#');
	let otherAmountTxt = data[5];
	let otherAmounts = (otherAmountTxt == '' || otherAmountTxt == undefined) ? [] : otherAmountTxt.split('#');
	let otherAmountTemplate = '<table class="table detail-table mr-3"><tr><td colspan="2" class="text-center align-middle bg-addition font-weight-bold">Addition</td></tr>';
	otherAmountHeaders.forEach(function(value, i) {
		if (value.trim()) {
			otherAmountTemplate += `<tr><td class="align-middle">${value}</td><td class="align-middle text-right">${otherAmounts[i]}</td></tr>`;
		}
	});
	otherAmountTemplate += '</table>';

	// for deduction amount table
	let deductionAmountHeaderTxt = $('.deduction-amount-header')[0].innerText;
	let deductionAmountHeaders = (deductionAmountHeaderTxt == '' || deductionAmountHeaderTxt == undefined) ? [] : deductionAmountHeaderTxt.split('#');
	let deductionAmountTxt = data[6];
	let deductionAmounts = (deductionAmountTxt == '' || deductionAmountTxt == undefined) ? [] : deductionAmountTxt.split('#');
	let deductionAmountTemplate = '<table class="table detail-table"><tr><td colspan="2" class="text-center align-middle bg-deduction font-weight-bold">Deduction</td></tr>';
	deductionAmountHeaders.forEach(function(value, i) {
		if (value.trim()) {
			deductionAmountTemplate += `<tr><td class="align-middle">${value}</td><td class="align-middle text-right">${deductionAmounts[i]}</td></tr>`;
		}
	});
	deductionAmountTemplate += '</table>';

	let name = data[2];
	let year = data[10];
	let month = data[11];
	let updatedAt = data[12];
	let template = `<div class="detail-header row mt-1 pt-2 mx-2"><h6 class="col-9 text-center"><b>${name}</b> (${month}-${year})</h6><h6 class="col-3 text-right">Updated Date: ${updatedAt}</h6></div>`
		+ "<div class='row justify-content-center m-1'>"
		+ skillAmountTemplate + otherAmountTemplate + deductionAmountTemplate
		+ "</div>"
	return template;
}