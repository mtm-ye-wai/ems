var routePlanData = {};
var planTable = $('#plan-datatable')
    .DataTable(
        {
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 'no-sort'
            }],
            "language": {
                "paginate": {
                    "previous": "<<",
                    "next": ">>"
                }
            },
            "ordering": false,
            dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
                + "<'row'<'col-md-12'<'table-responsive'tr>>>"
                + "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
            autoWidth: false
        });
planTable.draw();
planTable.on('order.dt search.dt', function() {
    planTable.column(0, {
        search: 'applied',
        order: 'applied'
    }).nodes().each(function(cell, i) {
		var id = $(cell).data("id");
		
		$(cell).addClass('show-p-list');
		$(cell).data('ref',id);
        cell.innerHTML = `<div class="d-flex text-green justify-content-center align-item-center"><span class="fa-ico folder-ico"></span></div>`;
        if(!$(cell).data("saveflg")){
			$(cell.firstChild).children().addClass("noti alert-noti");
		}
    });
}).draw();
planTable.on('draw',function(){
	$('tr').each(function(){
		if($(this).hasClass('parent')){
			$(this).find('td:eq(0)').click();
		}
	})
});
//route selection
var ferryRouteList;
var newRouteSelect = new Choices('#select-route', {
		removeItemButton: true,
		duplicateItemsAllowed: false,
		shouldSort: false
});
function setFerryRoute() {
	newRouteSelect.setChoices(ferryRouteList, 'value', 'label', false);
	$('#select-route').trigger('change');
}
function getFerryRoute(url){
	$.ajax({
			type: "GET",
			url: url,
			processData: false,
			contentType: false,
			success: function(response, status, xhr) {
				$("#add-route-plan-modal").modal();
				ferryRouteList = new Array();
				newRouteSelect.clearChoices();
				newRouteSelect.clearStore();
				response.forEach((e) => {
					var choiceElement = {};
					choiceElement['value'] = e.ferryId;
					choiceElement['label'] = e.routeName;
					ferryRouteList.push(choiceElement);
				});
				setFerryRoute();
			},
			error: function(er) {
				console.log(er);
			}
		});
}
$(function() {
	//date-picker
	$(".plan-date").datepicker({
		dateFormat: 'dd/mm/yy',
		showOtherMonths: true,
		selectOtherMonths: true
	});
	$(".new-plan").on("click", function(e) {
		e.preventDefault();
		$("#new-plan-modal").modal();
	});
	$(".edit-plan").on("click", function(e) {
		e.preventDefault();
		var id = this.dataset['id'];
		var name = this.dataset['name'];
		var list = this.dataset['list'].replace(/ /g, '').replace('[', '').replace(']', '').split(",");
		$("#edit-plan-modal").modal();
		$("#rpId").val(id);
		$("#rpName").val(name);
		$("#rpList").val(list);
	});
	//show plan list
	$(document).on("click",".show-p-list",function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		var id = this.dataset['id'];
		if($(this).hasClass("active")){
			var x = document.createElement('tr');
			this.parentElement.classList.add('parent');
            var id = this.dataset['id'];
			x.classList.add('child');
			x.innerHTML = `<td colspan='8' style='padding: 0px !important;'>
							<div class="ani-tr ss row justify-content-start align-items-center">
								<div class='m-1'>
									<label for="view-checker${id}" class="switch view-as">
				                    <input type="checkbox" id="view-checker${id}" class="view-checker"/><span
				                    class="slider square"></span>
				                  </label>
								</div>
								<button type="button" data-id="${this.dataset['id']}" class="plus-btn m-1"><i class="fa fa-plus"></i></button>
							</div>
							<div class="ani-tr row ar align-items-center justify-content-auto">
							</div>
							</td>`;
			$.ajax({
				type: "GET",
				url: "getFerry?routePlanId="+$(this).data("id")+"&routelists=" + $(this).data("routelists"),
				processData: false,
				contentType: false,
				beforeSend: function(){
					$(x).children().find('.ar')[0].innerHTML = `<td colspan='8' style='padding: 0px !important;'><div class='text-s pl-3'>Fetching Route Plan list. Please wait</div></td>`;;
				},
				success: function(response, status, xhr) {
					$(x).children().find('.ar')[0].innerHTML = ``;
				if(typeof response == 'object'){
					routePlanData["route-"+response[0].routePlanId] = response;
					x.id = "route-"+response[0].routePlanId;
					viewAs(x,'gallery');
				}
				},
				error: function(er) {
					$(x).children().find('.ar')[0].innerHTML = `<td colspan='8' style='padding: 0px !important;'><div class='text-s pl-3 text-danger'>Failed to get Route Plan list!</div></td>`;
					setTimeout(function(){$(x).slideUp(350,function(){failActionAJAX(x)})},3000);
				}
			})
			
			$(x).insertAfter(this.parentElement);
			$(x).find('.ani-tr').hide().slideDown(350);
		}else{
			$(this).parent().removeClass("parent");
			if ($(this).parent().next().hasClass('child')) {
				$(this).parent().next().find('.ani-tr').slideUp(350, function() {
					$(this).parent().parent().remove();
				});
			}
		}
	});
	//remove route plan
	$(document).on("click",".remove-route-plan",function(e){
		e.preventDefault();
	});
	//get ferry to add
	$(document).on("click",".plus-btn",function(e){
		e.preventDefault();
		var routePlanId = this.dataset['id'];
		$("#add-route-plan-modal").modal();
		$("#add-rp-id")[0].value=routePlanId;
		getFerryRoute("availableFerry?planId="+routePlanId);
	})
	
	//add new route
	$("#select-route").on("change",function(){
		if(this.value.length > 0 || this.value != null){
			$("#add-route-plan-modal .btn").removeAttr("disabled");
		}else{
			$("#add-route-plan-modal .btn").attr("disabled","disabled");
		}
	})
});
function viewData(cmd,index){
	var tds = "";
	if(routePlanData[index].length == 0){
		return `<span class="text-danger">No data to return!</span>`;
	}
	routePlanData[index].forEach((data,i)=>{
		var save = ``;
		var sts = `<span class='text-danger'>Unsaved</span>`;
		var deleteAble = data.frdList.length > 0 ? 
							`data-toggle="modal" data-target="#reject-confirm-delete"`
			                  :
							`data-toggle="modal" data-target="#confirm-delete"
					         data-href="delete?planId=${data.routePlanId}&ferryId=${data.ferryData.ferryId}"`;
			var border = data.frdList.length > 0 && data.frdList.length <= data.ferryData.seatNo ? "" : "box-danger";
		if(cmd == 'table'){
			if(data.saveFlg){
				save = `<span class="mr-2 fas fa-bookmark text-green" title="Route Saved!"></span>`;
				sts = `<span class='text-green'>Save</span>`;
			}
			tds += `<tr class="${border}" >
					<td class="text-center" style="width: 35px">${i+1}</td>
					<td class="text-s">${save}${data.ferryData.routeName}</td>
					<td class="text-center" style="width: 100px">${sts}</td>
					<td class="text-center" style="width: 100px">${data.frdList.length}/${data.ferryData.seatNo}</td>
					<td class="text-center" style="width: 100px"><div class="d-flex justify-content-center align-items-center">
							<a href='edit?planId=${data.routePlanId}&ferryId=${data.ferryData.ferryId}' class="d-flex align-items-center mx-1  justify-content-center far fa-edit text-green"></a>
							<a href='#' class="remove-route-plan d-flex align-items-center mx-1  justify-content-center fas fa-minus-circle text-danger" ${deleteAble}></a>
						</div></td>
				</tr>`;
		}else if(cmd == 'gallery'){
			if(data.saveFlg){
				save = `<span class="num d-flex align-items-center justify-content-center mx-1 fas fa-bookmark bg-green text-white"></span>`;
			}
			var mtx = data.frdList.length > 0 && data.frdList.length <= data.ferryData.seatNo ? "text-green" : "text-white bg-danger";
			tds += `<div class="d-flex smooth-shadow bg-white flex-column text-center m-2 align-items-center justify-content-center folder-f ${border}">
				<span class='tx'>${data.ferryData.routeName}</span>
				<div class="d-flex mx-auto mt-3">
					<span class="num d-flex align-items-center justify-content-center mx-1 ${mtx}" title="Ferry member : ${data.frdList.length}. Avaliable : ${data.ferryData.seatNo}">${data.frdList.length}/${data.ferryData.seatNo}</span>
					${save}
					<a href='edit?planId=${data.routePlanId}&ferryId=${data.ferryData.ferryId}' class="d-flex align-items-center mx-1  justify-content-center far fa-edit text-green" title="Edit"></a>
					<a href='#' class="d-flex align-items-center mx-1  justify-content-center fas fa-minus-circle text-danger" title="Remove"
					${deleteAble}></a>
				</div>
				</div>`;
			
		}
	});
	return tds;
}
function viewAs(x,cmd){
	var tds = viewData(cmd,x.id);
	$(x).children().find('.ar')[0].innerHTML ='';
	if(cmd == "table"){
		$(x).children().find('.ar')[0].innerHTML = `
						<table class="folder-f col-md-12 cf">
							<thead>
							<tr style="border-bottom: 1px solid #dee2e6;"><th colspan='5'>Ferry Routes</th></tr>
							</thead>
							<tbody>
								${tds}
							</tbody>
						</table>`;
	}else if(cmd == "gallery"){
		$(x).children().find('.ar')[0].innerHTML = `
						${tds}
					`;
	}
	$(x).on('change', '.view-checker', function() {
		if ($(this).is(":checked")) {
			viewAs(x, 'table');
		} else {
			viewAs(x, 'gallery');
		}
	});
}
function failActionAJAX(obj){
	if($(obj).prev().hasClass('parent')){
		$(obj).prev().find('.show-p-list').removeClass('active');
		$(obj).remove();
	}
}
function getCurrentRowCount(table,row){
	var mark = 0;
	$(table).children('tbody').children('tr').each(function(i){
		if(this == row){
			mark = i;
			return false;
		}
	});
	return mark;
}
//check date plan 
function isPlanError() {
	var error = false;
	const data = ['Route Plan Name', 'Date'];
	$(".np-form").each(function(i) {
		if (this.value == null || this.value == '' || this.value.length == 0) {
			error = true;
			$(this).next().text("Please insert " + data[i] + " !");
		} else {
			$(this).next().text("");
		}
	});
	return error;
}
Array.prototype.formToJSON = function() {
	var result = {};
	$.map(this, function(n, i) {
		result[n['name']] = n['value'];
	})
	return result;
}