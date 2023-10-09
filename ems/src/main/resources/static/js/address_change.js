$(function(){
	//update 15/06/2022
	$("#useFerry1").on("change",function(){
		if(!$(this).is(":checked")){
			$("#user-4").hide(function(){
				$(this).slideUp(100);
			})
		}else{
			$("#user-4").show(function(){
				$(this).slideDown(100);
			});
		}
	});
})
$('.add').click(function () {
    $('#from').val("");
    $('#to').val("");
    $('#travelBy').val("");
    $('#fees').val("");
    $('#from').removeAttr('style');
    $('#to').removeAttr('style');
    $('#travelBy').removeAttr('style');
    $('#fees').removeAttr('style');
});

$("#request").click(function () {
    errorMsg(requestModal)
});
$("#save").click(function () {
    errorMsg(saveModal);
});
$("#update").click(function () {
    errorMsg(updateModal);
});

/**
 * for error message
 * 
 * @param modal
 * @returns
 */
function errorMsg(modal) {
    var row = document.getElementById("myTable").getElementsByTagName("tr").length - 1;
    var newAddress = $("#newAddress").val();
    var startDate = $("#startDate").val();
    var totalfees = $(".totalfees").val();
    if (row && newAddress && startDate && totalfees) {
        $(modal).css('display', 'block');
        $('body').addClass('reduce-zindex');
        return;
    }
    if (!newAddress) {
        $('#myErrAlert .alert-detail').text("Choose New Address for Address Change.");
        $('#myErrAlert').fadeIn().delay(3000).addClass("in").fadeOut(2000);
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
        return;
    }
    var startDateFormat = isDate(startDate);
    if (!startDate) {
        $('#myErrAlert .alert-detail').text("Choose Start Date for Address Change.");
        $('#myErrAlert').fadeIn().delay(3000).addClass("in").fadeOut(2000);
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
        return;
    }
    if (startDate) {
        if (!startDateFormat) {
            $('#myErrAlert .alert-detail').text("Your Start Date Format is Invalid");
            $('#myErrAlert').fadeIn().delay(3000).addClass("in").fadeOut(2000);
            $('html,body').animate({
                scrollTop: 0
            }, 'slow');
            return;
        }
    }
    var numbers = /^[-+]?[0-9]+$/;
    if (totalfees) {
        if (!totalfees.match(numbers)) {
            $('#myErrAlert .alert-detail').text("Fees Value is Invalid");
            $('#myErrAlert').fadeIn().delay(3000).addClass("in").fadeOut(2000);
            $('html,body').animate({
                scrollTop: 0
            }, 'slow');
            return;
        }
    }
    if (!row) {
        $('#myErrAlert .alert-detail').text("Route cannot be empty.");
        $('#myErrAlert').fadeIn().delay(3000).addClass("in").fadeOut(2000);
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
    }
}

var tf = $('.totalfees').val();
var sum = 0;
if (tf) {
    sum = tf ? Number(tf.replace(/,/g, "")) : 0;
}
if (!tf) {
    $('.totalfees').val(0);
}

function isNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}

$('#addClose').click(function () {
    $('#from').removeAttr('style');
    $('#to').removeAttr('style');
    $('#travelBy').removeAttr('style');
    $('#fees').removeAttr('style');

});

$('#row')
    .click(
        function () {
            $('#from').removeClass('error');
            $('#to').removeClass('error');
            $('#travelBy').removeClass('error');
            $('#fees').removeClass('error');
            let from = $('#from').val(),
                to = $('#to').val(), 
                travelBy = $('#travelBy').val(),
                fees = $('#fees').val();
            let fromFlag = modalValidate(from, "from");
            let toFlag = modalValidate(to, "to");
            let travelByFlag = modalValidate(travelBy, "travelBy");
            let feesFlag = modalValidate(fees, "fees");
            if (fromFlag && toFlag && travelByFlag && feesFlag) {
                let row = $('#myTable>tbody>tr').length;

                if (window.rowId && !isNaN(window.rowId)) {
                    window.rowId++;
                } else {
                    window.rowId = row;
                }
                $('#myTable tbody')
                    .append(
                        `<tr>
                            <td id="rowId" class="index txt-center">
                            </td>
                            <td>
                                <input type="hidden" name="routeList[${window.rowId}].from_route" value="${from}" />
                                <span>${from}</span>
                            </td>
                            <td>
                                <input type="hidden" name="routeList[${window.rowId}].to_route" value="${to}" />
                                <span>${to}</span>
                            </td>
                            <td>
                                <input type="hidden" name="routeList[${window.rowId}].travel_by" value="${travelBy}" />
                                <span>${travelBy}</span>
                            </td>
                            <td class="txt-right">
                                <input type="hidden" name="routeList[${window.rowId}].fees" value="${fees}" />
                                <span>${fees}</span>
                            </td>
                            <td class="txt-right">
                                <input type="hidden" name="routeList[${window.rowId}].route_order" value="${(window.rowId)}" />
                                <span>${(window.rowId)}</span>
                            </td>
                            <td class="crud-actions">
								<div class="crud-list">
									<a href="#" class="update btn-edit"> <img src="resources/new-design/img/ico_edit_blue.png" alt="Edit"></a>
									<a class="delete open-btn" id="btnDelete"><img src="resources/new-design/img/ico_delete.png" alt="Delete"></a>
								</div>
							</td>
                        </tr>`);
                rowNum();
                // move to rowNum
                $('#routeAddModal').css("display", "none");
                $('#from').val("");
                $('#to').val("");
                $('#travelBy').val("");
                $('#fees').val("");
                $('body').removeClass('reduce-zindex');
            }
        });

function modalValidate(validData, name) {
    switch (validData) {
        case null:
        case "":
            $('#' + name).addClass("error");
            return false;
        default:
            return true;
    }
}

function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;

    var dtArray = currVal.match(rxDatePattern);

    if (dtArray == null)
        return false;

    dtMonth = dtArray[3];
    dtDay = dtArray[1];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11)
        && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

$('.table tbody').on('click', '#btnDelete', function () {
    var current = $(this).closest('tr');
    var col1 = current.find('td:eq(0)').text();
    var col5 = current.find('td:eq(4) span').text();
    $(this).closest('tr').remove();
    let row = $('#myTable>tbody>tr').length;
    if (row <= col1 && window.rowId <= col1) {
        window.rowId--;
    }
    rowNum();
});

rowNum();

function rowNum() {
    let routeFee = 0, totalAmount = 0;
    $('#myTable>tbody>tr').each(
        function (i) {
            $(this).find('td:eq(0)').text(i + 1)
            $(this).find('td:eq(5) input[type=hidden]').val(i + 1);
            $(this).find('td:eq(5) span').text(i + 1);
            $(this).find('td:eq(1) input[type=hidden]').attr('name',
                'routeList[' + i + '].from_route');
            $(this).find('td:eq(2) input[type=hidden]').attr('name',
                'routeList[' + i + '].to_route');
            $(this).find('td:eq(3) input[type=hidden]').attr('name',
                'routeList[' + i + '].travel_by');
            $(this).find('td:eq(4) input[type=hidden]').attr('name',
                'routeList[' + i + '].fees');
            $(this).find('td:eq(5) input[type=hidden]').attr('name',
                'routeList[' + i + '].route_order');
            routeFee = $(this).find('td:eq(4) input[type=hidden]').val();
            $(this).find('td:eq(4) span').text(formatNumber(routeFee));
            totalAmount += Number(routeFee.replace(/,/g, ""));
        });
    $('.totalfees').val(formatNumber(totalAmount));
}
var current;
$('.table tbody').on('click', '.btn-edit', function () {

    current = $(this).closest('tr');
    var col1 = current.find('td:eq(0) span').text();
    var col2 = current.find('td:eq(1) span').text();
    $('#efrom').val(col2);
    var col3 = current.find('td:eq(2) span').text();
    $('#eto').val(col3);
    var col4 = current.find('td:eq(3) span').text();
    $('#etravelBy').val(col4);
    var col5 = current.find('td:eq(4) span').text();
    $('#efees').val(formatNumber(col5));
    var amt = col5.replace(/,/g, "");
    sum = (sum ? sum : 0) - amt;

    $('#efrom').removeAttr('style');
    $('#eto').removeAttr('style');
    $('#etravelBy').removeAttr('style');
    $('#efees').removeAttr('style');
    $('#editModal').css("display", "block");
    $('body').addClass('reduce-zindex');

});
$('.fees')
    .keydown(
        function (event) {
            if (event.which
                && (event.which < 46 || event.which > 57 || event.which == 47)
                && event.keyCode != 8) {
                event.preventDefault();
            }
            if (event.which == 46 && $(this).val().indexOf('.') != -1) {
                event.preventDefault();
            }
        });

$('#editRow').click(
    function () {

        var from = $('#efrom').val(), to = $('#eto').val(), travelBy = $(
            '#etravelBy').val(), fees = $('#efees').val();
        var efrom = modalValidate(from, "efrom");
        var eto = modalValidate(to, "eto");
        var etravelBy = modalValidate(travelBy, "etravelBy");
        var efees = modalValidate(fees, "efees");
        let routeFee = 0, amount = 0, sum = 0;
        if (efrom && eto && etravelBy && efees) {
            current.find('td:eq(1) span').text(from);
            current.find('td:eq(1) input[type=hidden]').val(from);

            current.find('td:eq(2) span').text(to);
            current.find('td:eq(2) input[type=hidden]').val(to);

            current.find('td:eq(3) span').text(travelBy);
            current.find('td:eq(3) input[type=hidden]').val(travelBy);

            current.find('td:eq(4) span').text(fees);
            current.find('td:eq(4) input[type=hidden]').val(fees);

            $('.table tr').each(function () {
                routeFee = $(this).find('td:eq(4)').text();
                amount = amount + Number(routeFee.replace(/,/g, ""));
            });
            sum = amount;
            $('.totalfees').val(formatNumber(sum));
            $('#editModal').css("display", "none");
            $('body').removeClass('reduce-zindex');
        }
    });

var fixHelperModified = function (e, tr) {
    var $originals = tr.children();
    var $helper = tr.clone();
    $helper.children().each(function (index) {
        $(this).width($originals.eq(index).width())
    });
    return $helper;
}, updateIndex = function (e, ui) {
    $('td.index', $(this).parent()).each(function (i) {
        $(this).html(i + 1);
    });

    $('input[type=text]', $(this).parent()).each(function (i) {
        $(this).val(i + 1);
    });
    $('.table tr').each(
        function () {
            $(this).find('td:eq(5) input[type=hidden]').val(
                $(this).find('td:eq(0)').text());
            $(this).find('td:eq(5) span').text(
                $(this).find('td:eq(0)').text());
        });
    window.rowId = undefined;
};
$("#myTable tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
}).disableSelection();

$("#myTable tbody").sortable({
    distance: 5,
    delay: 100,
    opacity: 0.6,
    cursor: 'move',
    update: function () {
    }
});

$("#startDate").on('change', function () {
    var aa = $('#startDate').val();
    var splitName = aa.split('/');
    var afterSplit = splitName[2] + '-' + splitName[1] + '-' + splitName[0];
    $("#expiredDate").datepicker("change", {
        minDate: new Date(afterSplit)
    });
});

var startExpired = $('#startDate').val();
if (startExpired && startExpired.length > 4) {
    var splitName = startExpired.split('/');
    var afterSplit = splitName[2] + '-' + splitName[1] + '-' + splitName[0];
    $("#expiredDate").datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: new Date(afterSplit)
    });
}

$(function () {
    $('#requestDate').val(formatDate(new Date())) ;
});
function formatDate(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = ''
        + d.getDate(), year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

function formatNumber(num) {
    let number = num.toString().replace(/\,/g, '');
    if (number.length == 0)
        number = "0";
    let n = parseFloat(number, 10);
    return n.toLocaleString();
}

$(".close-modal").click(function(){
    $('#from').val("");
    $('#to').val("");
    $('#travelBy').val("");
    $('#fees').val("");
})

$(".alert").delay(3000).addClass("in").fadeOut(2000);
