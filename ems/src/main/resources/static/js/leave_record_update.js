$("#update").click(function() {
	$('body').addClass('reduce-zindex');
	var value = $('input[type="checkbox"]:checked').val();
	if (value == null) {
		var $type = $("#leaveDetailStatus");
		var selectValue = $("option:selected", $type).val();
		if (selectValue === "1") {
			$('#requestModal').css('display', 'block');
		} else if (selectValue === "2") {
			$('#approvedModal').css('display', 'block');
		} else if (selectValue === "3") {
			$('#rejectModal').css('display', 'block');
		} else {
			$('#updateModal').css('display', 'block');
		}
	} else {
		$('#delete-modal').css('display', 'block');
	}
});

var annual = leave[0];
var casual = leave[1];
var sick = leave[2];

if (oldLeaveId == 1 || oldLeaveId == 6) {
	if (annual < 1) {
		$("#period option[value=" + 3 + "]").hide();
	} else {
		$("#period option[value=" + 3 + "]").show();
	}
} else if (oldLeaveId == 2 || oldLeaveId == 6) {
	if (casual < 1) {
		$("#period option[value=" + 3 + "]").hide();
	} else {
		$("#period option[value=" + 3 + "]").show();
	}
} else if (oldLeaveId == 3 || oldLeaveId == 6) {
	if (sick < 1) {
		$("#period option[value=" + 3 + "]").hide();
	} else {
		$("#period option[value=" + 3 + "]").show();
	}
}
$(".alert").delay(3000).addClass("in").fadeOut(2000);

var today = new Date();
var dd = today.getDate();
var currentMonth = today.getMonth();
var previousMonth = currentMonth - 1;

var yyyy = today.getFullYear();
var minDate;

if (dd > 25) {
	if (dd <= 27) {
		minDate = 26 + '.' + previousMonth + '.' + yyyy;
	} else {
		minDate = 26 + '.' + currentMonth + '.' + yyyy;
	}
} else {
	minDate = 26 + '.' + previousMonth + '.' + yyyy;
}
var values = minDate.split(".");
var parsed_date = new Date(values[2], values[1], values[0]);
$(".datepicker").datepicker({
	dateFormat: 'dd/mm/yy',
	showButtonPanel: true,
	changeMonth: true,
	changeYear: true,
	minDate: parsed_date,
	showOtherMonths: true,
	selectOtherMonths: true
});

var lType = $('#ltype').val();
if (lType === "Annual" && annual < 1) {
	$("#period option[value=" + 3 + "]").hide();
} else if (lType === "Casual" && casual < 1) {
	$("#period option[value=" + 3 + "]").hide();
} else if (lType === "Sick" && sick < 1) {
	$("#period option[value=" + 3 + "]").hide();
} else {
	$("#period option[value=" + 3 + "]").show();
}

if (lType && lType == "Compensatory") {
	$("#ot-date-div").show();
} else {
	$("#ot-date-div").hide();
}

var status = $('#leaveDetailStatus').val();
var delFlag = $('#delFlag1:checked').val();
var userType = $('#userType').val();
if (userType == 1 && lType == "TBD" && delFlag == undefined && (status == "1" || status == "2" || status == "7")) {
	if ($('.leave-edit').attr("disabled") == undefined) {
		$('.leave-edit').attr('disabled', true);
	}
} else if (userType == 3 && delFlag == undefined && status == "1") {
	if ($('.leave-edit').attr("disabled") == undefined) {
		$('.leave-edit').attr('disabled', true);
	}
} else {
	if ($('.leave-edit').attr("disabled")) {
		$('.leave-edit').removeAttr("disabled");
	}
}

$('#ltype').change(function() {
	if ($(this).val() === "Annual" && annual < 1) {
		$("#period option[value=" + 3 + "]").hide();
	} else if ($(this).val() === "Casual" && casual < 1) {
		$("#period option[value=" + 3 + "]").hide();
	} else if ($(this).val() === "Sick" && sick < 1) {
		$("#period option[value=" + 3 + "]").hide();
	} else {
		$("#period option[value=" + 3 + "]").show();
	}
	var status = $('#leaveDetailStatus').val();
	var delFlag = $('#delFlag1:checked').val();
	var userType = $('#userType').val();
	if (userType == 3 && delFlag == undefined && status == "1") {
		if ($('.leave-edit').attr("disabled") == undefined) {
			$('.leave-edit').attr('disabled', true);
		}
	} else if (userType == 1 && $(this).val() == "TBD" && delFlag == undefined && (status == "1" || status == "2" || status == "7")) {
		if ($('.leave-edit').attr("disabled") == undefined) {
			$('.leave-edit').attr('disabled', true);
		}
	} else {
		if ($('.leave-edit').attr("disabled")) {
			$('.leave-edit').removeAttr("disabled");
		}
	}

	if ($(this).val() && $(this).val() == "Compensatory") {
		$("#ot-date-div").show();
		//$("#update").attr("disabled","disabled");
	} else {
		$("#ot-date-div").hide();
	}
});

$('#leaveDetailStatus').change(function() {
	var leaveType = $('#ltype').val();
	var userType = $('#userType').val();
	var status = $('#leaveDetailStatus').val();
	var delFlag = $('#delFlag1:checked').val();
	if (userType == 1 && leaveType == "TBD" && delFlag == undefined && (status == "1" || status == "2" || status == "7")) {
		if ($('.leave-edit').attr("disabled") == undefined) {
			$('.leave-edit').attr('disabled', true);
		}
	} else if (userType == 3 && delFlag == undefined && status == "1") {
		if ($('.leave-edit').attr("disabled") == undefined) {
			$('.leave-edit').attr('disabled', true);
		}
	} else {
		if ($('.leave-edit').attr("disabled")) {
			$('.leave-edit').removeAttr("disabled");
		}
	}
});

$('#delFlag1').change(function() {
	var leaveType = $('#ltype').val();
	var userType = $('#userType').val();
	var status = $('#leaveDetailStatus').val();
	var delFlag = $('#delFlag1:checked').val();
	if (userType == 1 && leaveType == "TBD" && delFlag == undefined && (status == "1" || status == "2" || status == "7")) {
		if ($('.leave-edit').attr("disabled") == undefined) {
			$('.leave-edit').attr('disabled', true);
		}
	} else if (userType == 3 && delFlag == undefined && status == "1") {
		if ($('.leave-edit').attr("disabled") == undefined) {
			$('.leave-edit').attr('disabled', true);
		}
	} else {
		if ($('.leave-edit').attr("disabled")) {
			$('.leave-edit').removeAttr("disabled");
		}
	}
});

function isNumber(el, evt) {
	var ch = String.fromCharCode(evt.which);
	var number = el.value.split('.');
	if (!(/[0-9\.]/.test(ch)) || (number[1] && number[1].length > 1)) {
		evt.preventDefault();
	}
}

function formatNumber(event, id) {
	if (event.which >= 37 && event.which <= 40) {
		event.preventDefault();
	}
	var value = event.target.value;
	var decs = value.split(".");
	let num = decs[0];
	if (decs.length > 1) {
		num += '.' + decs[1];
	}
	if (!decs[0]) {
		num = "";
	}
	var elId = '#' + id;
	$(elId).val(num);
};

function preventCopyPaste(event) {
	if (event.which == 17 || event.which == 86 || event.which == 67) {
		event.preventDefault();
	}
}

$('#attach-link').click(function() {
	var filePath = $('#attach-file').val();
	window.open(filePath);
});

$('#attach-file').click(function() {
	var filePath = $(this).attr('src');
	window.open(filePath);
});

function compShowHide() {
	var period = $("#period").val();
	var comHour = $("#comp").val();
	var otHour;
	if (period == 3) {
		otHour = 8.0;
	} else {
		otHour = 4.0;
	}
	if (comHour.length == 0 || otHour > comHour) {
		$("#ltype").find("option:contains(Compensatory)").hide();
	} else {
		$("#ltype").find("option:contains(Compensatory)").show();
	}
}

$(document).ready(function() {
	$("#ltype").trigger('onchange');
});

//var compasaryChoice = new Choices("#compensatoryOTDate", {
//    removeItemButton: true,
//    duplicateItemsAllowed: false,
//    shouldSort: false
//});
//changeFun(document.getElementById("compensatoryOTDate"));
//$(function() {
//    $("#compensatoryOTDate").on('change', function() {
//        changeFun(this);
//    });
//    $("#period").on("change",function(){
//        var ltypeValue = document.getElementById("ltype").value;
//        if(ltypeValue == "Compensatory"){
//            checkCompensatory();
//        }
//    });
//});
//function changeFun(selector) {
//    let multiSel = $('#compensatory .choices__input').attr("placeholder");
//    let selVal = $(selector).val();
//    if (selVal && selVal.length > 0) {
//        if (multiSel) {
//            $('#compensatory .choices__input').attr("placeholder", "");
//        }
//    } else {
//        if (!multiSel) {
//            $('#compensatory .choices__input').attr("placeholder", "Select One");
//        }
//    }
//    checkCompensatory();
//}
//
//function checkCompensatory(){
//    var ottimesTotal = 0;
//    $("#compensatoryOTDate").children("option").each(function(){
//        if($(this).is(":selected")){
//            console.log(this.innerText.indexOf("("),this.innerText.indexOf(")"))
//            var x = this.innerText.slice(this.innerText.indexOf("(")+1,this.innerText.lastIndexOf(")"));
//            ottimesTotal += Number(x);
//        }
//    });
//    if(comparation(ottimesTotal)){
//        $("#update").removeAttr("disabled");
//    }else{
//        $("#update").attr("disabled","disabled");
//    }
//}
//
//function comparation(total){
//    var period = document.getElementById("period").value;
//    var limit = period == 3 ? 1 : 0.5;
//    return (total >= limit);
//}
