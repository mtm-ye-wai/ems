$("#routePlanId").change(function() {
	if ($('#routePlanId').find(":selected").val() == "0") {
		$("#clone").fadeIn();
	} else {
		$("#clone").fadeOut();
		$("#register").attr("disabled", false);
		$('#fromDate').val('');
	}
});

$("#clone").hide();

$("#routePlanId").trigger("change");

$("#update-btn").click(function() {
	console.log(removeCaches)
	var check = false;
	var count = 0;
	var flagList = [];
	for (var i = 0; i < memberList.length; i++) {
		if (memberList[i].preFlag == 1) {
			flagList.push(memberList[i].employeeId);
		}
	}
	if (removeCaches.length == 0) {
		if (flagList.length != 0) {
			check = true;
		}
	} else {
		for (var i = 0; i < removeCaches.length; i++) {
			for (var k = 0; k < flagList.length; k++) {
				console.log(flagList[k]);
				console.log(removeCaches[i].id);
				if (flagList[k] == removeCaches[i].id) {
					count++;
				}
			}
		}
		if (count != flagList.length) {
			check = true;
		}
	}
	if (check) {
		$("#warningModal").css('display', 'block');
		$('body').addClass('reduce-zindex');
	} else {
		$("#updateModal").css('display', 'block');
		$('body').addClass('reduce-zindex');
	}
});

$('#fromDate').datepicker({
	dateFormat: 'dd/mm/yy',
	maxDate: new Date(),
	showOtherMonths: true,
	selectOtherMonths: true,
	onSelect: function(date) {
		if (date != null) {
			$.ajax({
				type: "POST",
				url: "checkRouteExist?date=" + date,
				processData: false,
				contentType: false,
				success: function(response, status, xhr) {
					if (response == false) {
						$("#register").attr("disabled", true);
						document.getElementById("error").innerHTML +=
							`<div class="alert alert-warning alert-dismissible py-0 mb-0" id="myAlert">
                                <a href="#" class="close px-3 py-0" data-dismiss="alert" aria-label="close">&times;</a> <strong>No Ferry Route In Selected Date</strong>
                             </div>`
						$(".alert").delay(2000).addClass("in").fadeOut(1000);
					} else {
						$("#register").attr("disabled", false);
					}
				},
				error: function() {
					console.log("error");
				}
			});
		}
	}

});

//date picker
$('#date').datepicker({
	dateFormat: 'dd/mm/yy',
	minDate: new Date(),
	showOtherMonths: true,
	selectOtherMonths: true
});
$('#c-date.datepicker').datepicker({
	dateFormat: 'dd/mm/yy',
	showOtherMonths: true,
	selectOtherMonths: true
});

var ferryMemberList, gopChoiceList;
var selectMember = null,
	gopChoices = null;
var mbList = new Array();
if (memberList != null) {
	memberList.forEach(e => {
		var x = {
			id: e.employeeId,
			n: e.employeeName,
			gop: e.getOnPoint,
			t: e.time,
			gfp: e.getOffPoint,
			m: e.morning == 1 ? true : false,
			e: e.evening == 1 ? true : false,
			cmp: e.compFlg,
			moveFlg: e.moveFlg
		}
		mbList.push(x);
	})
}
var itemCaches = memberList == null ? [] : mbList;
var removeCaches = [];
var memberTable = null;
var limitNo = seatNo == null ? 25 : seatNo;
var limitData = [{ id: $("#f-rid")[0].value, limit: seatNo }];
var selectRowOpt = false;
function applyDataToTable(edata, i) {
	function routePlanOpt() {
		if (planFlg) {
			return {
				"option": `<option value="-">-</option>;`,
				"time": '<input type="' + etimeView("-").type + '" contenteditable="false" style="' + etimeView("-").style + '" class="' + etimeView("-").class + '" value="' + "-" + '" ' + etimeView("-").rd + '/>',
			}
		} else {
			return {
				"option": '<option value="1" ' + isSelected(edata.m, "1" | true) + '>〇</option>'
					+ '<option value="0"' + isSelected(edata.m, "0" | false) + '>X</option>',
				"time": '<input type="' + etimeView(edata.t).type + '" contenteditable="false" style="' + etimeView(edata.t).style + '" class="' + etimeView(edata.t).class + '" value="' + edata.t + '" ' + etimeView(edata.t).rd + '/>',
			}
		}
	}
	var rowData = [
		(i + 1),
		edata.n
		+ '<input type="text" hidden="hidden" class="input txt-center" contenteditable="false" value="'
		+ edata.n
		+ '" checked />',
		edata.gop
		+ '<input type="text" hidden="hidden" contenteditable="false" class="gop input" value="'
		+ edata.gop
		+ '" checked />',
		routePlanOpt().time,
		edata.gfp
		+ '<input type="text" hidden="hidden" contenteditable="false" class="gfp input"  value="'
		+ edata.gfp
		+ '" checked />',
		'<select class="set-status input" onchange="period(this)">'
		+ routePlanOpt().option
		+ ' </select>',
		'<select class="set-status" onchange="period(this)">'
		+ routePlanOpt().option
		+ ' </select>',
		'<input type="text"  class="input" hidden="hidden" value="'
		+ edata.id
		+ '"  data-cmp="' + edata.cmp + '"/>'
		+ '<input class="comp" type="hidden" checked="checked" value="' + edata.cmp + '" hidden="hidden"/>'
		+ '<button type="button" onclick="unchoose(this)" class="remove-one unchoose-btn" id="remove-' + i + '" data-row="' + i + '" title="Remove">' +
		'<img src="/ems/resources/new-design/img/ico_member_remove.png"></button>']

	memberTable.row.add(rowData).draw();
}
function updateIndex() {
	$(this).children().each(function(i) {
		generateRowId(this, i);
	});
}
function isMove(id) {
	var move = false;
	for (let data of itemCaches) {
		if (data.id == id) {
			if (data.moveFlg) {
				move = true;
				break;
			}
		}
	}
	return move;
}
function isCGM(id) {
	var cgm = false;
	for (let data of itemCaches) {
		if (data.id == id) {
			if ('compFlg' in data) {
				if (data.compFlg) {
					cgm = true;
					break;
				}
			}
			if ('cmp' in data) {
				if (data.cmp) {
					cgm = true;
					break;
				}
			}
		}
	}
	return cgm;
}
function isRMC(id) {
	var rmc = false;
	for (let data of itemCaches) {
		if (data.id == id) {
			if ('resp' in data) {
				if (data.resp) {
					rmc = true;
					break;
				}
			}
		}
	}
	return rmc;
}
var etimeView = function(time) {
	var type = time == '-' ? 'text' : 'time';
	var cls = time == '-' ? "form-control text-center input" : "form-control time input pick-time";
	var rd = time == '-' ? "readOnly" : null;
	var style = time == '-' ? "display:flex; margin:0 auto;width: 124.49px;" : "display:flex; margin:0 auto;";
	return {
		type: type,
		class: cls,
		rd: rd,
		style: style
	}
}
function isSelected(a, b) {
	if (a == b) {
		return "selected";
	}
	return null;
}
function isChecked(a) {
	if (a) return `checked="checked"`;
	return ``;
}
function clearSelectList(...lists) {
	lists.forEach(list => {
		$(list).children().each(function() {
			if (this.value != 0) {
				$(this).remove();
			} else {
				$(this).text("Please choose " + this.dataset['opt']);
			}
		})
	});
}
function setFerryMembers() {
	selectMember.setChoices(ferryMemberList, 'value', 'label', false);
	$('#ferrymember').trigger('change');
}
function setGOPGroup() {
	gopChoices.setChoices(gopChoiceList, 'value', 'label', false);
	$('#gop-select').trigger('change');
}
var j = 0;
function generateRowId(row, index) {
	const inputData = ["employeeName", "getOnPoint", "time", "getOffPoint", "employeeId"];
	const selectData = ["morning", "evening"];
	const hiddenData = ["compFlg"];
	var i = index == null ? $(row).children("td").first().text() : index + 1;
	$(row).children("td").first().text(i);
	var incrementId = i;
	var autoGenerateId = incrementId - 1;
	$(row).find("input.input").each(function(i) {
		this.id = "frdList" + autoGenerateId + "." + inputData[i];
		this.name = "frdList[" + autoGenerateId + "]." + inputData[i];
	});
	$(row).find("select").each(function(i) {
		this.id = "frdList" + autoGenerateId + "." + selectData[i];
		this.name = "frdList[" + autoGenerateId + "]." + selectData[i];
	});
	$(row).find("input.comp").each(function(i) {
		this.id = "frdList" + autoGenerateId + "." + hiddenData[i];
		this.name = "frdList[" + autoGenerateId + "]." + hiddenData[i];
	})
	$(row).find("button").attr("data-row", autoGenerateId);
	$(row).find("button").attr("id", "remove-" + autoGenerateId);

}
/**
@param{Element} element
 */
function period(element) {
	var name = element.name;
	var index = name.slice(name.indexOf("[") + 1, name.lastIndexOf("]"));
	if (document.getElementById("frdList" + index + ".morning").value == 0 && document.getElementById("frdList" + index + ".evening").value == 0) {
		$("#remove-" + index)[0].click();
	}
	var val = document.getElementById("frdList" + index + ".morning").value;
	var time = document.getElementById("frdList" + index + ".time");
	var tval = time.value;
	var gop = document.getElementById("frdList" + index + ".getOnPoint");
	switch (val) {
		case '0':
			time.type = "text";
			time.readOnly = true;
			time.value = "-";
			time.classList.remove("time");
			time.classList.add("text-center");
			time.style['width'] = '124.49px';
			break;
		case '1':
			time.readOnly = false;
			time.value = tval == '-' ? $("#f-time")[0].value : tavl;
			time.type = "time";
			time.classList.add("time");
			gop.value = $(gop.parentElement).text();
			break;
	}

}
var helper = function(e, tr) {
	e.preventDefault();
	var $originals = tr.children();
	var $helper = tr.clone();
	$helper.children().each(function(index) {
		$(this).width($originals.eq(index).width());
	});
	$helper.css({ "opacity": ".9", "background-color": "#FFF", "box-shadow": "1px 3px 50px #0000004c" });
	return $helper;
}

function selectAllMembers() {
	if (document.getElementById('select_all').checked) {
		$('.check_data').each(function() {
			if (!this.checked) {
				this.checked = true;
				$(this).trigger("change");
			}
		});
	} else {
		$('.check_data').each(function() {
			this.checked = false;
			$(this).trigger("change");
		});
	}
}
function getPreviousDay(date = new Date()) {
	var previous = new Date();
	previous.setDate(date.getDate() - 1);
	if (previous.getDay() == 0) {
		previous.setDate(previous.getDate() - 2);
	}
	if (previous.getDay() == 6) {
		previous.setDate(previous.getDate() - 1);
	}
	return previous;
}
$(function() {
	//date picker
	$('#f-date.datepicker').datepicker({
		dateFormat: 'dd/mm/yy',
		minDate: new Date(),
		showOtherMonths: true,
		selectOtherMonths: true
	});
	$('#c-date.datepicker').datepicker({
		dateFormat: 'dd/mm/yy',
		showOtherMonths: true,
		selectOtherMonths: true
	});
	if ($('#f-time')[0].value == null || $('#f-time')[0].value == "") {
		$('#f-time')[0].value = "06:00";
	}
	memberTable = $('#ferry-member-table')
		.DataTable(
			{

				"columnDefs": [{
					"searchable": false,
					"orderable": false,
					"targets": [0, 1]
				}, { className: 'txt-center', "targets": [0, 7] }],
				"paging": false,
				"ordering": false,
				"info": false,
				"scrollX": true,
				"rowCallback": function(row, data, i) {
					if (parseInt(data[0]) != i + 1) {
						var newData = [i + 1, data[1], data[2], data[3], data[4], data[5], data[6], data[7]];
						memberTable.row($(row)).data(newData);
					}
					generateRowId(row);
					var data = {
						containment: "#ferry-member-table_wrapper",
						cursor: "grabbing",
						helper: helper,
						zIndex: "999",
						forceHelperSize: true,
						start: function(e, ui) {
							$(this).attr('data-start', ui.item.index());
						},
						stop: updateIndex
					};
					$(row.parentElement).sortable(data);
				},
				autoWidth: false,
			});
			$(window).on('resize click load', function() {
				t.columns.adjust();
			});
	//table select all
	$("._select-all").on("change", function() {
		var cur = this;
		$("#ferry-member-table tbody tr").each(function() {
			if ($(this).children().hasClass("dataTables_empty")) {
				return false;
			}
			var id = $(this).children('td').last().children('input').first().val();
			if (isRMC(id)) {
				return false;
			}
			if (cur.checked) {
				$(this).addClass("selected");
				$("#transfer").removeAttr("disabled");
				$("#transfer").removeClass("disabled");
			} else {
				$(this).removeClass("selected");
				$("#transfer").attr("disabled", "disabled");
				$("#transfer").addClass("disabled");
			}
		})
	});


	memberTable.on('order.dt search.dt', function() {
		memberTable.column(0, {
			search: 'applied',
			order: 'applied'
		}).nodes().each(function(cell, i) {
			cell.innerHTML = i + 1;
		});
	}).draw();

	$('.choose-member').change(
		function() {
			$('#ferry-member-table tr').each(
				function() {
					$(this).find('td.sorting_1')
						.addClass('text-center');
				});
		});

	$('#ferry-member-table .check_data').each(function() {
		$(this).trigger("change");
	});

	$("#btn-submit").on("click", function(e) {
		e.preventDefault();
		if (!planFlg && !memberTable.data().any()) {
			$("#error").css('display', 'block');
			$("#error-msg").text("No data selected!");
			$("#updateModal").css('display', 'none');
			return false;
		}
		if (memberTable.rows().count() > limitNo) {
			$("#error").css('display', 'block');
			var error_msg = $("#error-msg").text("Number of person exceed the limit! (" + memberTable.rows().data().length + "/" + limitNo + " ). \n Are You Sure You Want To Save?");
			error_msg.html(error_msg.html().replace(/\n/g, '<br/>'));
			$("#save_btn").on("click", function(e) {
				document.getElementById("ferry-route-form").submit();
				return true;
			})
			$("#updateModal").css('display', 'none');
			return false;
		}
		if (!planFlg && checkError().error) {
			$("#error").css('display', 'block');
			$("#error-msg").text(checkError().msg);
			$("#updateModal").css('display', 'none');
			return false;
		}
		document.getElementById("ferry-route-form").submit();
		return true;
	});
	$('#ferrymember').on('change', function() {
		let multiSel = $('#member-field .choices__input').attr("placeholder");
		var limit = getLimit().org;
		var cur = selectMember.getValue(true).length;
		cur = getLimit().oncount + cur;
		if (cur > limit) {
			$("#limit-size").css({ color: "red" });
		} else {
			$("#limit-size").css({ color: "inherit" });
			$("#l-er").remove();
		}
		$("#limit-size").text(cur + "/" + limit);
		let selVal = $(this).val();
		if (selVal && selVal.length > 0) {
			if (multiSel) {
				$('#member-field .choices__input').attr("placeholder", "");
			}
		} else {
			if (!multiSel) {
				$('#member-field .choices__input').attr("placeholder", "Choose Member");
			}
		}
	});

	$('#gop-select').on('change', function() {
		let multiSel = $('#gop-member-field .choices__input').attr("placeholder");
		var limit = getLimit().org;
		var curgroup = gopChoices.getValue(true);
		var cur = 0;
		for (let x of curgroup) {
			cur += x.length;
		}
		cur = getLimit().oncount + cur;
		if (cur > limit) {
			$("#gop-limit-size").css({ color: "red" });
		} else {
			$("#gop-limit-size").css({ color: "inherit" });
			$("#gop-l-er").remove();
		}
		$("#gop-limit-size").text(cur + "/" + limit);
		let selVal = $(this).val();
		if (selVal && selVal.length > 0) {
			if (multiSel) {
				$('#gop-member-field .choices__input').attr("placeholder", "");
			}
		} else {
			if (!multiSel) {
				$('#gop-member-field .choices__input').attr("placeholder", "Choose Get On Point");
			}
		}
	});

	//get avaliable ferry and doctor by date
	$("#f-date").on("change", function(e) {
		e.preventDefault();
		$.ajax({
			type: "GET",
			url: "driverFerryList?date=" + this.value,
			processData: false,
			contentType: false,
			success: function(response) {
				if (typeof response != 'object') {
					return false;
				}
				limitData = new Array();
				var error = response.error;
				var msg = response.msg;
				var ferryList = document.getElementById("f-rid");
				var driverList = document.getElementById("driverList");
				if (error) {
					responseError(msg);
					ferryList.innerHTML = "<option data-opt='Ferry' value='0'>Please Select Date First</option>";
					driverList.innerHTML = "<option data-opt='Driver' value='0'>Please Select Date First</option>";
					return false;
				}
				var driverListResponse = response.driverList;
				var ferryListResponse = response.ferryList;
				clearSelectList(ferryList, driverList);
				driverListResponse.forEach((data) => {
					var opt = document.createElement("option");
					opt.value = data.driverId;
					opt.label = data.driverName;
					driverList.appendChild(opt);
				});
				ferryListResponse.forEach((data) => {
					var opt = document.createElement("option");
					opt.value = data.ferryId;
					opt.label = data.routeName;
					ferryList.appendChild(opt);
					var mdata = { "id": Number(data.ferryId), "limit": Number(data.seatNo) };
					limitData.push(mdata);
				});

			},
			error: function(er) {
				console.log(er);
			}
		});
	});
	selectMember = new Choices('#ferrymember', {
		removeItemButton: true,
		duplicateItemsAllowed: false,
		shouldSort: false
	});
	gopChoices = new Choices('#gop-select', {
		removeItemButton: true,
		duplicateItemsAllowed: false,
		shouldSort: false
	});
	//set member rp
	$('.set-rp-member').on('click', function(e) {
		e.preventDefault();
		var routePlanId = $("#routePlanId")[0].value;
		var directions = window.location.href;
		directions = directions.slice(0, directions.indexOf("edit"));
		getFerryMemberData(directions + "/getFerryMember?routePlanId=" + routePlanId);
	});
	//set member
	$(".set-member").on("click", function(e) {
		e.preventDefault();
		if (smHasError()) {
			return false;
		}
		var date = $("#f-date")[0].value;
		var ferryRoute = $("#f-rid")[0].value;
		var directions = window.location.href;
		directions = directions.slice(0, directions.indexOf("edit"));
		if (ferryRoute) {
			getFerryMemberData(directions + "getFerryMember?date=" + date + "&ferryId=" + ferryRoute);
		} else {
			getFerryMemberData(directions + "/getFerryMember?routePlanId=" + routePlanId);
		}
	});

	//import member by gop
	$(".import-gop").on("click", function(e) {
		e.preventDefault();
		if (smHasError()) {
			return false;
		}
		getGOPData();
	})
	//set member modal ok button click
	$(document).on("click", "#set-member-submit", function() {
		$("#l-er").remove();
		var limit = getLimit().limit;
		var org = getLimit().org;
		var cur = getLimit().oncount;
		data = selectMember.getValue(true);
		if (data.length > limit) {
			$("#set-m-er-msg").append($("<span class='error-ms' id='l-er'>Member exceeds the limit! Only \"" + (org - cur) + "\" seats available!</span>"));
			return false;
		}
		var count = 0;
		data.forEach((edata) => {
			applyDataToTable(edata, count++);
			itemCaches.push(edata);
		});
		selectMember.clearStore();
		if (!regist) {
			curselected = selectMember.getValue(true);
			curselected.forEach(data => {
				removeCaches = removeCaches.filter(d => (d.employeeId != data.id));
			});
		}
		highlightCGM();
		$(`.modalDialog`).css('display', 'none');
		$('body').removeClass('reduce-zindex');
	});

	//set member modal ok button click
	$("#import-member-modal .btn-ok").on("click", function() {
		$("#gop-l-er").remove();
		var limit = getLimit().limit;
		var org = getLimit().org;
		var cur = getLimit().oncount;
		var cc = gopChoices.getValue(true);
		var data = 0;
		for (let c of cc) {
			data += c.length;
		}
		if (data.length > limit) {
			$("#set-m-er-msg").append($("<span class='text-danger' id='gop-l-er'>Member exceeds the limit! Only \"" + (org - cur) + "\" seats available!</span>"));
			return false;
		}
		var count = 0;
		cc.forEach((gop) => {
			gop.forEach((e) => {
				var edata = {
					id: e.employeeId,
					n: e.employeeName,
					gop: e.getOnPoint,
					t: $("#f-time")[0].value == '' ? "07:00" : $("#f-time")[0].value,
					gfp: e.getOffPoint,
					m: true,
					e: true
				};
				applyDataToTable(edata, count++);
				itemCaches.push(edata);
			})
		});
		if (!regist) {
			var curselectedArry = gopChoices.getValue(true);
			for (let curselected of curselectedArry) {
				curselected.forEach(data => {
					removeCaches = removeCaches.filter(d => (d.employeeId != data.id));
				});
			}
		}
		gopChoices.clearStore();
		$("#import-member-modal").modal("hide");
	});
	$("#set-member-modal .close-btn").on("click", function() {
		$("#l-er").remove();
		selectMember.clearStore();
	});
	$("#import-member-modal .modal-close").on("click", function() {
		$("#gop-l-er").remove();
		gopChoices.clearStore();
	});
	/*$("#ferry-member-table tr").on("click", ".unchoose-btn", function(e) {
		e.stopPropagation();
		unchoose(this);
	});*/
	function smHasError() {
		var error = false;
		var er = ["Date", "Driver", "Ferry", "Start time"];
		$("#top-data input, #top-data select").each(function(i) {
			if (this.value == '' || this.value == null || this.value == 0) {
				error = true;
				$(this).next().text(er[i - 1] + " cannot be null!")
			}
		})
		return error;
	}

	$("#top-data input, #top-data select").on("change", function() {
		if (this.value != '' || this.value != null || this.value != 0) {
			$(this).next().text("")
		}
	});
	$("#auto-group").on("click", function() {
		if (memberTable != null) {
			if (memberTable.rows().count() > 0) {
				$("#order-member-modal .btn-ok").show();
				autoGroup();
			} else {
				warn()
			}
		} else {
			warn()
		}
		function warn() {
			$("#s-point")[0].innerHTML = '';
			$("#s-point").append("<span class='error-ms'>There is no data to order !</span>")
			$("#order-member-modal").css('display', 'block');
			$('body').addClass('reduce-zindex');
			$("#order-member-modal .btn-ok").hide();
		}
	});
	$(".clone-member").on("click", function() {
		if (smHasError()) {
			return false;
		}
		defaultCloneData();
		$("#clone-modal").modal();
	});
	$("#clone-modal").on("click", ".btn-ok", function() {
		if (cloneDataErr()) {
			return false;
		}
		var fromDate = $("#c-date")[0].value;
		var forDate = $("#f-date")[0].value;
		var ferryId = $("#clone-choose-ferry")[0].value;
		$.ajax({
			type: "GET",
			url: "getCloneData?fromDate=" + fromDate + "&forDate=" + forDate + "&ferryId=" + ferryId,
			processData: false,
			contentType: false,
			beforeSend: function() {
				//
			},
			success: function(response, status, xhr) {
				$("#clone-modal").modal("hide");
				if (response.length <= 0) {
					responseError("No avaliable data to clone!");
					return false;
				}
				if (response.length > getLimit().limit) {
					responseError("The copy data is greater than current avaliable seat number!");
					return false;
				}
				itemCaches.forEach((c) => {
					response = response.filter(data => data.employeeId != c.id);
				});
				if (typeof response == "object") {
					var i = 0;
					response.forEach(edata => {
						var data = {
							id: edata.employeeId,
							n: edata.employeeName,
							gop: edata.getOnPoint,
							t: edata.time,
							gfp: edata.getOffPoint,
							m: edata.morning == 1 ? true : false,
							e: edata.evening == 1 ? true : false,
							cmp: edata.compFlg,
						};
						itemCaches.push(data);
						applyDataToTable(data, i++);
					});
				}

			},
			error: function(er) {
				console.log(er);
			}
		});
	});
	$(document).on('click', function(e) {
		var doc = e.target;
		$("#ferry-member-table tbody tr").each(function() {
			if (doc != this) {
				selectRowOpt = false;
			}
		})
	})
	//row selection
	$("#ferry-member-table tbody").on('dblclick click', 'tr', function(e) {
		e.stopPropagation();
		e.preventDefault();
		var empId = $(this).children("td").last().children("input").first().val();
		var check = true;
		itemCaches.forEach(data => {
			if (data.id == empId) {
				if ('resp' in data && data.resp) {
					check = false;
					return false;
				}
			}
		});
		if (!check) return false;
		if ($(this).children().hasClass("dataTables_empty")) {
			return false;
		}
		if (e.type == 'click' && !selectRowOpt) {
			return false;
		}
		selectRowOpt = true;
		$(this).toggleClass("selected");
		if (memberTable.rows('.selected').data().length > 0) {
			$("#transfer").removeAttr("disabled");
			$("#transfer").removeClass("disabled");
		} else {
			$("#transfer").attr("disabled", "disabled");
			$("#transfer").addClass("disabled");
			selectRowOpt = false;
		}
		if (memberTable.rows('.selected').data().length == memberTable.rows().data().length) {
			$("._select-all")[0].checked = true;
		} else {
			$("._select-all")[0].checked = false;
		}
	});
	$("#ferry-member-table tbody tr").on('click dblclick mousedown mouseup', 'input, select', function(e) {
		e.stopPropagation();
	});
	//transfer modal
	$("#transfer").on("click", function() {
		var directions = window.location.href;
		directions = directions.slice(0, directions.indexOf("edit"));
		var x = document.getElementById("ferry-trans-select");
		var selectedMembers = memberTable.rows('.selected').data();
		$('.hidden-form').remove();
		$("#selected-m").html("Transfer <strong class='text-green'>" + selectedMembers.length + "</strong> members");
		for (var i = 0; i < selectedMembers.length; i++) {
			var comSym = (getTableRowData(Number(selectedMembers[i][0]) - 1)[8].cmp) ? "1" : "0";
			$("<input class='hidden-form' />").attr("name", "employeeIdList[" + i + "]").attr("value", getTableRowData(Number(selectedMembers[i][0]) - 1)[8].id + ":" + comSym).attr("hidden", "hidden").appendTo($("#transfer-form"));
		}
		var url = "";
		if (ferryRoute) {
			url = directions + "/getFerryForTransfer?date=" + $("#f-date")[0].value + "&ferryId=" + $("#f-rid")[0].value + "&empCount=" + selectedMembers.length;
		} else {
			url = directions + "/getFerryForTransfer?routePlanId=" + Number($("#routePlanId")[0].value) + "&ferryId=" + $("#f-rid")[0].value + "&empCount=" + selectedMembers.length;
		}
		getFerryToTransfer(url, x);
		$("#transfer-member-modal").css('display', 'block');
		$('body').addClass('reduce-zindex');
	})
});
function getFerryToTransfer(url, x) {
	$.ajax({
		type: "GET",
		url: url,
		processData: false,
		contentType: false,
		beforeSend: function() {
			x.innerHTML = "<option value>Fetching ferry .... </option>";
		},
		success: function(response, status, xhr) {
			$("#transfer-member-modal .btn-ok").removeAttr("disabled");
			if (response.error) {
				$("#transfer-member-modal .btn-ok").attr("disabled", "disabled");
				responseError("No avaliable ferry to transfer!");
				$(x).addClass("text-danger border-2");
				x.innerHTML = "<option value>No Avaliable Ferry !</option>";
				return false;
			}
			if (typeof response.ferryList == "object") {
				$(x).removeClass("text-danger border-2");
				var ferryId = $("#f-rid")[0].value;
				var ferryListTotransfer = response.ferryList.filter((data) => data.ferryId != ferryId);
				x.innerHTML = "<option value>Choose Ferry</option>";
				ferryListTotransfer.forEach(data => {
					var option = document.createElement("option");
					option.value = data.ferryId;
					option.label = data.routeName;
					x.appendChild(option)
				});
			}
		},
		error: function(er) {
			responseError("Error while load ferry list to transfer!");
		}
	});

}
function selectListener(e) {
	var id = e.detail.id; // id
	var label = e.detail.label; // label
	var value = e.detail.value; //value
	if (markCGM(value)) {
		$(this).next().children().each(function() {
			var refId = this.dataset['id'];
			if (refId == id) {
				$(this).addClass("cgm-select");
			}
		});
	}
}
function markCGM(data) {
	return (data.cmp)
}
function getFerryMemberData(url) {
	$("#set-member-modal").css('display', 'block');
	$('body').addClass('reduce-zindex');
	$.ajax({
		type: "GET",
		url: url,
		processData: false,
		contentType: false,
		success: function(response, status, xhr) {
			itemCaches.forEach((c) => {
				response = response.filter(data => data.employeeId != c.id);
			});
			if (!regist) {
				removeCaches.forEach(c => {
					var data = {
						employeeId: c.id,
						employeeName: c.n,
						evening: c.e,
						getOffPoint: c.gop,
						getOnPoint: c.gfp,
						morning: c.m,
						time: c.t,
						compFlg: c.cmp,
						rmc: true
					}
					response.push(data);
				});
			}
			$("#limit-size").text(getLimit().oncount + "/" + getLimit().org);
			ferryMemberList = new Array();
			response.forEach((e) => {
				var choiceElement = {};
				choiceElement['value'] = { id: e.employeeId, n: e.employeeName, gop: e.getOnPoint, t: $("#f-time")[0].value == '' ? "07:00" : $("#f-time")[0].value, gfp: e.getOffPoint, m: true, e: true, cmp: e.compFlg, resp: 'rmc' in e && e.rmc ? false : true };
				choiceElement['label'] = e.employeeName;
				ferryMemberList.push(choiceElement);
			});
			setFerryMembers();
		},
		error: function(er) {
			console.log(er);
		}
	});
}

var gopData = new Object();
function getGOPData() {
	var date = $("#f-date")[0].value;
	$.ajax({
		type: "GET",
		url: "getEmployeeDataByGOP?date=" + date,
		processData: false,
		contentType: false,
		beforeSend: function() {
		},
		success: function(response, status, xhr) {
			if (typeof response != 'object') {
				return false
			}
			itemCaches.forEach((c) => {
				if (c.gop in response) {
					delete response[c.gop];
				}
			});
			gopChoiceList = new Array();
			for (let x in response) {
				var choiceElement = {};
				choiceElement['value'] = response[x];
				choiceElement['label'] = x;
				gopChoiceList.push(choiceElement);
			}
			setGOPGroup();

		},
		error: function(er) {
			console.log(er);
		}
	});
	$("#import-member-modal").modal();
}
var gopCaches = new Array();
function saveDataByGOP(gopdata) {
	gopdata.forEach((data) => {
		data.forEach((e, i) => {
			var data = {
				id: e.employeeId,
				n: e.employeeName,
				gop: e.getOnPoint,
				t: e.time,
				gfp: e.getOffPoint,
				m: e.morning == 1 ? true : false,
				e: e.evening == 1 ? true : false,
				cmp: e.compFlg
			};
			applyDataToTable(data, i);
		});
	});
}
function responseError(msg) {
	var error = errorElement(msg);
	if ($("#myAlert")) {
		$("#myAlert").remove();
	}
	$(".error_class").append(error);
	$(error).hide();
	$(error).fadeIn(350);
	setTimeout(function() { $(error).fadeOut(350, function() { $(this).remove(); }) }, 5000);
}
var errorElement = function(msg) {
	return $("<div class=\"alert alert-warning alert-dismissible py-0 mb-0\"\r\n"
		+ "id=\"myAlert\">\r\n"
		+ "<a href=\"#\" class=\"close px-3 py-0\" data-dismiss=\"alert\"\r\n"
		+ "aria-label=\"close\">&times;</a> <strong>" + msg + "</strong>\r\n"
		+ "</div>");
}
function getLimit() {
	var ferry = document.getElementById("f-rid");
	var x = limitData;
	var markid = ferry.value;
	var limit;
	var org;
	var curCount = memberTable.rows().count();
	for (let y of x) {
		if (y.id == markid) {
			limit = y.limit - curCount;
			org = y.limit;
			break;
		}
	}
	return {
		limit: Number(limit),
		org: Number(org),
		oncount: Number(curCount)
	};
}
function defaultCloneData() {
	var date = $("#f-date")[0].value;
	var realdate = date.split('/');
	var getDate = getPreviousDay(new Date(realdate[2], realdate[1] - 1, realdate[0]));
	$('#c-date.datepicker').datepicker("setDate", getDate);
	$("#clone-choose-ferry").val(Number($("#f-rid")[0].value));
}
function cloneDataErr() {
	var clonedate = $("#c-date")[0];
	var cloneferry = $("#clone-choose-ferry")[0];
	var errors = false;
	if ($(clonedate).next().hasClass("text-danger")) {
		$(clonedate).next().remove();
	}
	if ($(cloneferry).next().hasClass("text-danger")) {
		$(cloneferry).next().remove();
	}
	if (clonedate.value == null || clonedate.value == '') {
		$($("<span class='text-danger' id='c-d-err'>Please choose date !</span>")).insertAfter(clonedate);
		errors = true;
	}
	if (cloneferry.value == null || cloneferry.value == 0) {
		$($("<span class='text-danger' id='c-f-err'>Please choose ferry !</span>")).insertAfter(cloneferry);
		errors = true;
	}
	return errors;
}
function removeAllRowData() {
	memberTable.rows().remove().draw();
	if (!regist) {
		removeCaches = new Array();
		removeCaches = itemCaches;
	} else {
		itemCaches = new Array()
	}
}
function removeRowData(target) {
	var index = $(target).data("row");
	var eid = $(target).parent().children().first().val();
	var comp = $(target).parent().children().eq(1).val();
	console.log(comp);
	console.log(index, eid, target)
	if (!regist) {
		for (let data of itemCaches) {
			if ((data.id + data.cmp) == (eid + comp)) {
				removeCaches.push(data);
				break;
			}
		};
	}
	itemCaches = itemCaches.filter(d => (d.id + d.cmp) != (eid + comp));
	for (var i = 0; i < memberTable.rows().count(); i++) {
		var data = getTableRowData(i);
		if ((data[8].id + data[8].cmp) == (eid + comp)) {
			memberTable.row(i).remove().draw();
		}
	}
}
function triggerContentEditable(...elements) {
	elements.forEach(ele => {
		$(ele).addClass("content-editable");
		$(ele).attr("tabindex", "-1");
		$(ele).attr("contenteditable", false);
		$(ele).attr("title", "Double click to edit content");
	})
}
function checkError() {
	var error = false;
	var msg = "";
	var times = [];
	var gopTimeData = [];
	$("#ferry-member-table tbody").children("tr").each(function() {
		var gtd = { index: '', gop: '', time: '' };
		$(this).find("input").each(function(i) {
			if (this.type == "hidden") return false;
			gtd.index = i;
			if ($(this).val().length == 0 || $(this)[0].value.trim() == null) {
				$(this).parent().addClass("bg-color-error");
				error = true;
				msg = "Data cannot be empty!";
			}
			if ($(this).hasClass("gop")) {
				gtd.gop = this.value;
			}
			if (this.type == "time") {
				times.push(this.value);
				gtd.time = $(this).hasClass("time") ? this.value : '-';
			}

		});
		gopTimeData.push(gtd);
	});
	resetBorder();
	var data = analyseGOPTime(times);
	var gtdstatus = analyseGOP(gopTimeData);
	if (data.error) {
		error = data.error;
		msg = data.msg;
	} else if (gtdstatus.error) {
		error = gtdstatus.error;
		msg = gtdstatus.msg;
	}
	return {
		error: error,
		msg: msg
	};
}
function getTableRowData(rowIndex) {
	var ary = new Array();
	var Rowdata = memberTable.rows().data()[rowIndex];
	var obj = new Object();
	var realDataFormat = ["c", "n", "gop", "t", "gfp", "m", "e", "id"];
	var i = 0;
	for (let x of Rowdata) {
		var c = document.createElement("td");
		c.dataset['td'] = realDataFormat[i];
		c.innerHTML = x;
		var data = {
			row: "",
			value: "",
			name: "",
			org: new Object()
		};
		data.row = rowIndex;
		if ($(c).children().length) {
			data.name = $(c).children()[0].name;
			var val = $(c).children()[0].value;
			var o = c.dataset['td'];
			if (o == "m" || o == "e") {
				val = val == "1" ? true : val == "0" ? false : val;
			}
			obj[o] = val;

			if ($(c).children()[0].dataset['cmp'] != null) {
				data.name = $(c).children()[1].name;
				$(c).children()[1].value = $(c).children()[0].dataset['cmp'] == true ? true : false;
				obj["cmp"] = $(c).children()[0].dataset['cmp'] == "true" ? true : false;
			}
		}
		i++;
		data.value = $(c).text();
		ary.push(data);
	}
	ary.push(obj);
	return ary;
}
function autoGroup() {
	var data = groupData();
	var result = new Array();
	$("#order-member-modal").css('display', 'block');
	$('body').addClass('reduce-zindex');
	$("#s-point").children().each(function() {
		$(this).remove();
	});
	for (let x of data.orderData) {
		var sort = document.createElement("div");
		$(sort).addClass("gop ui-state-default");
		sort.innerHTML = "<span class=''ui-icon ui-icon-arrowthick-2-n-s'></span><span class='gop-name'>" + x + "</span>";
		$("#s-point").append(sort);
	}
	$("#s-point").sortable({
		cursor: "grabbing",
		containment: "#s-point"
	});
	$("#order-member-modal .btn-ok").on("click", function() {
		if ($("#warning-modal").length == 0) {
			execute();
		}
		$("#warning-modal").css('display', 'block');
		$("#order-member-modal").css('display', 'none');
	});
	$("#warning-modal").on("click", ".btn-ok", function() {
		execute();
		$(`.modalDialog`).css('display', 'none');
		$('body').removeClass('reduce-zindex');
	})
	function execute() {
		var updateOrder = new Array();
		$("#s-point").children().each(function() {
			updateOrder.push(this.innerText);
		});
		result = data.orgData.group(updateOrder);
		updateTable(result);
		highlightCGM()
	}
	$("#transfer").attr("disabled", "disabled");
	$("#transfer").addClass("disabled");
}
//higlight cgm
function highlightCGM() {
	$("#ferry-member-table tbody").children("tr").each(function() {
		var cgm = $(this).children("td").last().children().first().data('cmp');
		var id = $(this).children("td").last().children().first().val();
		if (cgm) {
			$(this).addClass("bg-color-guest");
			$(this).find("input[type='hidden']").each(function() {
				this.checked = true;
				this.value = true;
			})
		} else {
			$(this).removeClass("bg-color-guest");
			$(this).find("input[type='hidden']").each(function() {
				this.checked = false;
				this.value = false;
			})
		}
		console.log(isMove(id));
		if (isMove(id)) {
			$(this).addClass("row-highlight");
		}
	});
}
function unchoose(element) {
	if ($(element).hasClass("all")) {
		removeAllRowData();
	} else {
		removeRowData(element);
	}
}
function groupData() {
	var orgRowData = new Array();
	var pointAry = new Array();
	var orderAry = new Array();
	for (var i = 0; i < memberTable.rows().count(); i++) {
		var rowData = getTableRowData(i);
		orgRowData.push(rowData);
		pointAry.push(rowData[2].value);
	}
	orderAry = pointAry.samePoint();
	return {
		"orgData": orgRowData,
		"pointData": pointAry,
		"orderData": orderAry
	}
}
function updateTable(ary) {
	memberTable.rows().remove().draw();
	var count = 0;
	for (let data of ary) {
		applyDataToTable(data[8], count++);
	}
}

function analyseGOP(gtd) {
	var error = false;
	var msg = "";
	var gop = new Array();
	gtd.forEach(data => {
		gop.push(data.gop);
	})
	var sorted = gop.samePoint();
	var sortedTime = new Array();
	for (let sort of sorted) {
		var m = new Array();
		for (let x of gtd) {
			if (x.gop == sort) {
				m.push(x.time);
			}
		}
		sortedTime.push(m);
	}
	var record = null;
	var count = 0, innerc = 0;
	var groupgop = new Array();
	A: for (let x of sortedTime) {
		record = count == 0 ? [null] : sortedTime[count - 1];
		count++;
		var sequenced = x.sequence("equality");
		for (let y of sequenced) {
			if (y.a.trim().length == 0 || y.a == '-') {
				continue;
			}
			if (y.b.length > 0 && y.b[0].value != '') {
				error = true;
				msg = "Get on point must have the same time value!";
				groupgop.push({ a: sorted[innerc], b: sorted[innerc] })
				break A;
			} else
				if (record[0] == y.a) {
					error = true;
					groupgop.push({ a: sorted[innerc - 1], b: sorted[innerc] });
					msg = "Difference get on point must not have same time!";
				}

		}
		innerc++;
	}
	if (error && groupgop.length > 0) {
		triggerGOPError(groupgop);
	}
	return {
		error: error,
		msg: msg
	};
}
const randomColor = function() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function triggerGOPError(groupgop = new Array()) {
	var mark = null;
	var color = randomColor();
	$('.gop').each(function() {
		$(this).parent().next().children("input").css("border", "1px solid #ccc");
	});
	groupgop.forEach((data) => {
		if (mark != data.a && mark != data.a) {
			color = randomColor();
		}
		mark = data.b;
		error(data.a, data.b, color);
	})

}
function error(gop1, gop2, color) {
	$(".gop").each(function() {
		if (this.value == gop1 || this.value == gop2) {
			$(this).parent().next().children("input").css("border", "2px solid " + color);
			$(this).parent().parent().addClass("bg-color-error");
		}
	});
}
function resetBorder() {
	$(".gop").each(function() {
		$(this).parent().next().children("input").css("border", "1px solid #ccc");
		$(this).parent().parent().removeClass("bg-color-error");
	});
}
function analyseGOPTime(times = new Array()) {
	var data = times.sequence("less");
	var error = false;
	var msg = "";
	var errorIndex = new Array();
	for (let d of data) {
		if (d.b.length > 0) {
			for (let e of d.b) {
				if (!errorIndex.includes(e.index)) {
					errorIndex.push(e.index);
				}
			}
			error = true;
			msg = "Time should be greater than the previous time !";
		}
	}
	var ary = new Array();
	$("#ferry-member-table tbody").children("tr").each(function() {
		$(this).find("input").each(function(i) {
			if ($(this).attr("type") == "time") {
				ary.push(this);
			}
		});
	});
	for (var i = 0; i < ary.length; i++) {
		if ($(ary[i]).hasClass('time-error')) {
			$(ary[i]).removeClass('time-error');
			$(ary[i]).parent().parent().removeClass("bg-color-error");
		}

		if (errorIndex.includes(i)) {
			$(ary[i]).addClass("time-error");
			$(ary[i]).parent().parent().addClass("bg-color-error");
		}
	}
	return {
		error: error,
		msg: msg
	};
}

Array.prototype.samePoint = function() {
	var ary = [...new Set(this)];
	return ary;
}
Array.prototype.group = function(orderAry) {
	var x = orderAry;
	var gp = new Array();
	for (let y of x) {
		for (let data of this) {
			if (data[2].value == y)
				gp.push(data);
		}
	}
	return gp;
}

Array.prototype.sequence = function(rule = "less") {
	var res = new Array();
	for (var i = 0; i < this.length; i++) {
		var x = this[i];
		var obj = { a: x, b: new Array() };
		for (var j = i; j < this.length; j++) {
			var y = this[j];
			switch (rule) {
				case 'less':
					if (y < x && y.length > 0 && x.length > 0) {
						obj.b.push({ index: j, value: y });
					}
					break;
				case 'equality':
					if (y != x) {
						obj.b.push({ index: j, value: y });
					}
					break;
			}
		}
		res.push(obj);
	}
	return res;
}

Array.prototype.sortRowData = function(s, e) {

	var record = this[s];
	if (s < e) {
		for (let i = s; i < e; i++) {
			var data = this[i + 1];
			this[i] = data;
		}
		this[e] = record;
	} else {
		for (let i = s; i > e; i--) {
			var data = this[i - 1];
			this[i] = data;
		}
		this[e] = record;
	}
	return this;
}