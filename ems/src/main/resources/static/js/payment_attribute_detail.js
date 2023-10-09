$(document).ready(
    function () {
        var empName = $('#empName').val();
        if (!empName) {
            $('#calculatedYearReg').attr("disabled", true);
            $('#calculatedMonthReg').attr("disabled", true);
            $('#currencyIdReg').attr("disabled", true);
            $('#calculatedYearReg').val($('#select-year').val());
            $('#calculatedMonthReg').val($('#select-month').val());
            $('#currencyIdReg').val($('#select-currency').val());
        } else {
            $('#calculatedYearReg').attr("disabled", false);
            $('#calculatedMonthReg').attr("disabled", false);
            $('#currencyIdReg').attr("disabled", false);
        }

        var currencyId = $('#select-currency').val();
        skillFormDesignChange(currencyId);

        formatAllNumber("otherList", $("#otherListSize").val());
        addTotalBalance("otherList", "#otherBalance", $("#otherListSize")
            .val());
        formatAllNumber("skillList", $("#skillListSize").val());
        addTotalBalance("skillList", "#skillBalance", $("#skillListSize")
            .val());
        formatAllNumber("deductionList", $("#deductionListSize").val());
        setSocialSecurity("deductionList", $("#deductionListSize").val());
        addTotalBalance("deductionList", "#deductionBalance", $(
            "#deductionListSize").val());
        addNetSalary();
        setTotalBalanceHidden();
        var skillSize = $("#skillListSize").val();
        for (var i = 0; i < skillSize; i++) {
            var type = document.getElementById("skillList" + "[" + i + "].type").value;
            if (type == "FV") {
                $('#skillList_' + i).attr('readonly', true);
            }
        }
        
        if($('#isPaid').val() === 'true') {
            $('#currencyIdEdt').css({
                'pointer-events': 'none',
                'background': '#E9ECEF'
            });   
        }
    });

// Payment Detail Registration Form Start
$('#empName').change(
    function () {
        var empName = $(this).val();
        if (!empName) {
            $('#calculatedYearReg').attr("disabled", true);
            $('#calculatedMonthReg').attr("disabled", true);
            $('#currencyIdReg').attr("disabled", true);
            $('#calculatedYearReg').val($('#select-year').val());
            $('#calculatedMonthReg').val($('#select-month').val());
            $('#currencyIdReg').val($('#select-currency').val());
        } else {
            $('#calculatedYearReg').attr("disabled", false);
            $('#calculatedMonthReg').attr("disabled", false);
            $('#currencyIdReg').attr("disabled", false);
        }
        registerFormChanges();
    });

$('#calculatedYearReg').change(
    function () {
        registerFormChanges();
    });

$('#calculatedMonthReg').change(
    function () {
        registerFormChanges();
    });

$('#currencyIdReg').change(function () {
    registerFormChanges();
});

function registerFormChanges() {
    var empName = $('#empName').val();
    var currencyId = $('#currencyIdReg').val();
    var year = $('#calculatedYearReg').val();
    var month = $('#calculatedMonthReg').val();
    addAmtInRegisterForm(empName, year, month, currencyId);
    skillFormDesignChange(currencyId);
}

function addAmtInRegisterForm(empName, year, month, currencyId) {
    $.ajax({
            type: "POST",
            url: "getEmployeeByEmpName?employeeName=" + empName + "&year=" + year + "&month=" + month + "&currencyId=" + currencyId,
            processData: false,
            contentType: false,
            success: function (response, status, xhr) {
                var ct = xhr.getResponseHeader("content-type") || "";
                if (ct.indexOf('html') > -1) {
                    window.location.reload();
                    return;
                }
                if (response && response != null) {
                    $('#idMsg').val(response.employeeId);
                    $('#pnameMsg').val(response.positionName);
                    $('#exchangeRate').val(response.exchangeRate);
                    var skillSize = $("#skillListSize").val();
                    for (var i = 0; i < skillSize; i++) {
                        var type = document.getElementById("skillList" + "[" + i + "].type").value;
                        if (type == "FVB") {
                            $('#skillList_' + i).val(numberFormat(response.basicSalary));
                            $('#skillList_' + i).attr('readonly', false);
                        } else if (type == "FV") {
                            $('#skillList_' + i).val(numberFormat(response.amount));
                            $('#skillList_' + i).attr('readonly', true);
                        } else {
                            $('#skillList_' + i + '_ks').val('0');
                        }
                    }
                    var addtionSize = $("#otherListSize").val();
                    for (var i = 0; i < addtionSize; i++) {
                        var type = document.getElementById("otherList" + "[" + i + "].type").value;
                        if (type == "FO") {
                            $('#otherList_' + i).val(numberFormat(response.overtimeFee));
                            $('#otherList_' + i + "_used").val(numberFormat(response.otApprovedHour));
                        } else if (type == "FB") {
                            $('#otherList_' + i).val(numberFormat(response.noLeaveNoLate));
                        } else if (type == "FA") {
                            $('#otherList_' + i).val(numberFormat(response.annualRefund));
                        } else if (type == "FT") {
                            $('#otherList_' + i).val(numberFormat(response.travelAllowance));
                            $('#otherList_' + i + "_used").val(numberFormat(response.attendanceDays));
                        }
                    }
                    var deductionSize = $("#deductionListSize").val();
                    for (var j = 0; j < deductionSize; j++) {
                        var type = document.getElementById("deductionList" + "[" + j + "].type").value;
                        if (type == "FV") {
                            $('#deductionList_' + type + "_" + j).val(numberFormat(response.monthlySaving));
                        } else if (type == "FL") {
                            $('#deductionList_' + type + "_" + j).val(numberFormat(response.leaveTimeFine));
                            $('#deductionList_' + j + "_used").val(numberFormat(response.leaveTimeFineUsed));
                        } else if (type == "FP") {
                            $('#deductionList_' + type + "_" + j).val(numberFormat(response.penalty));
                            $('#deductionList_' + j + "_used").val(numberFormat(response.penaltyUsed));
                        }
                    }
                    addTotalBalance("skillList", "#skillBalance", $("#skillListSize").val());
                    addTotalBalance("otherList", "#otherBalance", $("#otherListSize").val());
                    setSocialSecurity("deductionList", $("#deductionListSize").val());
                    addTotalBalance("deductionList", "#deductionBalance", $("#deductionListSize").val());
                    addNetSalary();
                    setTotalBalanceHidden();
                } else {
                    $('#idMsg').val("");
                    $('#pnameMsg').val("");
                    $('.pamountMsg').val("");
                    $('#netSalary').val("");
                    $('.net-hidden-amount').val("0");
                    $('#checkBy').val("0");

                    $('.remark-list').val("");
                    $('.skill-list').val("0");
                    $('.other-list').val("0");
                    $('.other-used').val("0");
                    $('.deduction-list').val("0");
                    $('.deduction-used').val("0");

                    $('#skillBalance').val("0");
                    $('#skillBalance_ks').val("0");
                    $('#otherBalance').val("0");
                    $('#deductionBalance').val("0");

                    var empId = $("#idMsg").val();
                    if (empName && !empId) {
                        var myErrAlert = document
                            .getElementById("myErrAlert");
                        myErrAlert.innerHTML = "<strong>Empty data for this employee</strong>";
                        $('#myErrAlert').fadeIn().delay(3000)
                            .addClass("in").fadeOut(2000);
                        $('html,body').animate({
                            scrollTop: 0
                        }, 'slow');
                    }
                }
            },
            error: function () {
                console.log("error");
            }
        });
}

$("#save").click(function () {
    var empName = $("#empName").val();
    var empId = $("#idMsg").val();
    if (empName) {
        if (!empId) {
            var myErrAlert = document.getElementById("myErrAlert");
            myErrAlert.innerHTML = "<strong>Empty data for this employee</strong>";
            $('#myErrAlert').fadeIn().delay(3000).addClass("in").fadeOut(2000);
            $('html,body').animate({
                scrollTop: 0
            }, 'slow');
            return;
        }
        $("#addModal").modal("toggle");
        return;
    } else {
        var myErrAlert = document.getElementById("myErrAlert");
        myErrAlert.innerHTML = "<strong>Choose One Employee</strong>";
        $('#myErrAlert').fadeIn().delay(3000).addClass("in").fadeOut(2000);
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
        return;
    }
});
// Payment Detail Registration Form End

// Payment Detail Edition Form Start
$('#calculatedYearEdit').change(
    function () {
        editFormChanges();
    });

$('#calculatedMonthEdit').change(
    function () {
        editFormChanges();
    });

$('#currencyIdEdt').change(function () {
    editFormChanges();
});

function editFormChanges() {
    var employeeId = $('#employeeId').val();
    var currencyId = $('#currencyIdEdt').val();
    var year = $('#calculatedYearEdit').val();
    var month = $('#calculatedMonthEdit').val();
    addAmtInEditForm(employeeId, year, month, currencyId);
    skillFormDesignChange(currencyId);
}

function addAmtInEditForm(employeeId, year, month, currencyId) {
    $.ajax({
            type: "POST",
            url: "changeYearAndMonth?employeeId=" + employeeId + "&year=" + year + "&month=" + month + "&currencyId=" + currencyId,
            processData: false,
            contentType: false,
            success: function (response, status, xhr) {
                var ct = xhr.getResponseHeader("content-type") || "";
                if (ct.indexOf('html') > -1) {
                    window.location.reload();
                    return;
                }
                if (response && response != null) {
                    $('#currencyIdEdt').css({
                        'pointer-events': 'auto',
                        'background': '#FFF'
                    });
                    layoutForSkillList(response.skillList);
                    layoutForOtherList(response.otherList);
                    layoutForDeduction(response.deductionList);
                    
                    $('#exchangeRate').val(numberFormat(response.exchangeRate));
                    var skillSize = $("#skillListSize").val();
                    for (var i = 0; i < skillSize; i++) {
                        $('#skillList_' + i).val(numberFormat(response.skillList[i].amount));
                    }
                    addTotalBalance("skillList", "#skillBalance", $("#skillListSize").val());
                    
                    var addtionSize = $("#otherListSize").val();
                    for (var i = 0; i < addtionSize; i++) {
                        $('#otherList_' + i).val(numberFormat(response.otherList[i].amount));
                        $('#otherList_' + i + "_used").val(numberFormat(response.otherList[i].used));
                    }
                    addTotalBalance("otherList", "#otherBalance", $("#otherListSize").val());
                    
                    var deductionSize = $("#deductionListSize").val();
                    for (var j = 0; j < deductionSize; j++) {
                        var type = document.getElementById("deductionList" + "[" + j + "].type").value;
                        $('#deductionList_' + type + "_" + j).val(numberFormat(response.deductionList[j].amount));
                        $('#deductionList_' + j + "_used").val(numberFormat(response.deductionList[j].used));
                    }
                    setSocialSecurity("deductionList", $("#deductionListSize").val());
                    addTotalBalance("deductionList", "#deductionBalance", $("#deductionListSize").val());
					var remarkSize = $("#remarkListSize").val();
					for (var j = 0; j < remarkSize; j++) {
						var type = document.getElementById("remarkList" + "[" + j + "].type").value;
						if (type == "M") {
							$('#remarkList_' + j).val(response.remarkList[j].amount);
						}
					}
                    $('#checkBy').val(response.checkBy);
                    addNetSalary();
                    setTotalBalanceHidden();
                    if(response.isPaid) {
                        $('#isPaid').val(true);
                        $('#currencyIdEdt').css({
                            'pointer-events': 'none',
                            'background': '#E9ECEF'
                        });
                    }
                    skillFormDesignChange(response.currencyId);
                    $('#currencyIdEdt').val(response.currencyId);
                }
            },
            error: function () {
                console.log("error");
            }
        });
}
// Payment Detail Edition Form End

// Common Use 2 forms Start
function skillFormDesignChange(currencyId) {
    var currencyMain = $('#cmain_' + currencyId).val();
    var currencySymbol = $('#csym_' + currencyId).val();
    $('#active_main_cr').val(currencyMain);
    if (currencyMain != 1) {
        if ($('#exchange-rate-div').hasClass('none')) {
            $('#exchange-rate-div').removeClass('none');
        }
        if ($('.mmk-amt-div').hasClass('none')) {
            $('.mmk-amt-div').removeClass('none');
        }
        if ($('.amt-div').hasClass('col-md-7')) {
            $('.amt-div').removeClass('col-md-7');
            $('.amt-div').addClass('col-md-3 pl-1');
        }
        $('.currency-symbol').text(currencySymbol);
    } else {
        if (!$('#exchange-rate-div').hasClass('none')) {
            $('#exchange-rate-div').addClass('none');
            $('#exchangeRate').val('0');
        }
        if (!$('.mmk-amt-div').hasClass('none')) {
            $('.mmk-amt-div').addClass('none');
        }
        if ($('.amt-div').hasClass('col-md-3 pl-1')) {
            $('.amt-div').removeClass('col-md-3 pl-1');
            $('.amt-div').addClass('col-md-7');
        }
        $('.currency-symbol').text('');
    }
}

$("#attrOne").change(function () {
    var skillListSize = $("#skillListSize").val();
    addTotalBalance("skillList", "#skillBalance", skillListSize);
    setSocialSecurity("deductionList", $("#deductionListSize").val());
});

$("#attrTwo").change(function () {
    var otherListSize = $("#otherListSize").val();
    addTotalBalance("otherList", "#otherBalance", otherListSize);
});

$("#attr_detail").change(function () {
    var deductionListSize = $("#deductionListSize").val();
    addTotalBalance("deductionList", "#deductionBalance", deductionListSize);
    addNetSalary();
    setTotalBalanceHidden();
});

function setTotalBalanceHidden() {
    var totalSize = $("#totalListSize").val();
    for (var k = 0; k < totalSize; k++) {
        var type = document.getElementById("totalList_" + k + "_type").value;
        var category = document.getElementById("totalList_" + k + "_category").value;
        var totalId = "#totalList_" + k + "_amount";
        var totalBalance = "";
        if (type == "C") {
            if (category == "S") {
                totalBalance = $('#skillBalance').val();
            } else if (category == "O") {
                totalBalance = $('#otherBalance').val();
            } else {
                totalBalance = $('#deductionBalance').val();
            }
        } else {
            totalBalance = $('#netSalary').val();
        }
        $(totalId).val(totalBalance);
    }
}

function addTotalBalance(amountId, totalInputId, listSize) {
    var totalBalance = 0;
    var value = 0;
    var type = 0;
    var mainCurrency = $('#active_main_cr').val();
    var exchangeRate = $('#exchangeRate').val();
    for (var i = 0; i < listSize; i++) {
        if (amountId == "deductionList") {
            var typeElement = document.getElementById(amountId + "[" + i
                + "].type");
            type = typeElement ? typeElement.value : type;
            var deductionType = document.getElementById(amountId + "_" + type
                + "_" + i);
            value = deductionType ? deductionType.value : value;
        } else {
            var amountElement = document.getElementById(amountId + "_" + i);
            value = amountElement ? amountElement.value : value;
        }
        if (value) {
            let number = value.replace(/\,/g, '');
            if (number.length == 0 || number == "NaN") {
                number = "0";
            }
            if (mainCurrency && mainCurrency == 0) {
                var skillKs = parseFloat(number) * parseFloat(exchangeRate.replace(/\,/g, ''));
                $('#' + amountId + '_' + i + '_ks').val(numberFormat(skillKs.toFixed(2)));
            }
            totalBalance = parseFloat(totalBalance) + parseFloat(number);
        }
    }
    $(totalInputId).val(numberFormat(totalBalance.toFixed(2)));
    if (amountId == "skillList") {
        var totalKs = totalBalance * parseFloat(exchangeRate.replace(/\,/g, ''));
        $(totalInputId + '_ks').val(numberFormat(totalKs.toFixed(2)));
    }
}

function addNetSalary() {
    var netBalance = 0;
    var mainCurrency = $('#active_main_cr').val();
    var skill = (mainCurrency && mainCurrency == 0) ? $('#skillBalance_ks').val() : $('#skillBalance').val();
    var other = $("#otherBalance").val();
    var deduction = $("#deductionBalance").val();
    let skillBalance = skill && skill != "NaN" ? skill.replace(/\,/g, '') : 0;
    let otherBalance = other && other != "NaN" ? other.replace(/\,/g, '') : 0;
    let deductionBalance = deduction && deduction != "NaN" ? deduction.replace(
        /\,/g, '') : 0;
    netBalance = (parseFloat(skillBalance) + parseFloat(otherBalance))
        - parseFloat(deductionBalance);
    $("#netSalary").val(numberFormat(netBalance.toFixed(2)));
}

function setSocialSecurity(id, listSize) {
    var mainCurrency = $('#active_main_cr').val();
    var skillBalance = (mainCurrency && mainCurrency == 0) ? $('#skillBalance_ks').val() : $('#skillBalance').val();
    var skillTotal = skillBalance.replace(/\,/g, '');
    var socialSecurity = (skillTotal >= 300000) ? 6000 : skillTotal * 0.02;
    socialSecurity = socialSecurity.toFixed(2);
    for (var i = 0; i < listSize; i++) {
        var type = document.getElementById(id + "[" + i + "].type").value;
        if (type == "FS") {
            $("#deductionList_" + type + "_" + i).val(
                numberFormat(socialSecurity));
        }
    }
}

function isNumber(el, evt) {
    var ch = String.fromCharCode(evt.which);
    var number = el.value.split('.');
    if (!(/[0-9\.]/.test(ch)) || (number[1] && number[1].length > 2)) {
        evt.preventDefault();
    }
}

function preventCopyPaste(evt) {
    if (evt.keyCode == 86) {
        evt.preventDefault();
    }
}

function formatNumber(event, index, category) {
    if (event.which >= 37 && event.which <= 40) {
        event.preventDefault();
    }
    var value = event.target.value;
    var decs = value.split(".");
    let num = decs[0];
    num = num.replace(/,/gi, "").split("").reverse().join("");

    var num2 = RemoveRogueChar(num.replace(/(.{3})/g, "$1,").split("")
        .reverse().join(""));
    if (decs.length > 1) {
        num2 += '.' + decs[1];
    }
    if (!decs[0]) {
        num2 = "0";
    }
    var inputId = '#' + category + '_' + index;
    $(inputId).val(num2);
};

function RemoveRogueChar(convertString) {
    if (convertString.substring(0, 1) == ",") {
        return convertString.substring(1, convertString.length)
    }

    return convertString;
}

function formatAllNumber(amountId, listSize) {
    var value = 0;
    for (var i = 0; i < listSize; i++) {
        var typeElement = document.getElementById(amountId + "[" + i
            + "].type");
        type = typeElement ? typeElement.value : type;
        var deductionType = document.getElementById(amountId + "_" + type
            + "_" + i);
        if (amountId == "deductionList" && typeElement && deductionType) {
            var type = typeElement.value;
            value = deductionType.value;
            deductionType.value = numberFormat(value);
        } else {
            var amountElement = document.getElementById(amountId + "_" + i);
            value = amountElement ? amountElement.value : value;
            amountElement.value = numberFormat(value);
        }
    }
}

function numberFormat(num) {
    if(num) {
        let number = num.toString().replace(/\,/g, '');
        if (number.length == 0)
            number = "0";
        let n = parseFloat(number, 10);
        return n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    } else {
        return '0.00';
    }
}
// Common Use 2 forms End

$('#attr_detail a.collapsed').on('click', function (e) {
    $(this).find('[class*="angle"]').toggleClass('fa-angle-up fa-angle-down');
});

$(".alert").delay(3000).addClass("in").fadeOut(2000);

//import payment detail
function setfilename(val) {
    var fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);
    document.getElementById("file-name").value = fileName;
}

$('#pd-upload').click(function () {
    $('#uploadModal').modal('hide')
});

$('#pd-download').click(function () {
    $('#downloadModal').modal('hide')
});

function layoutForSkillList(skillList) {
    $('#attrOne').empty();
    skillList.forEach(function(skill, i) {
    $('#attrOne').append(`
      <div class="row align-items-center form-group">
        <div class="col-12 col-md-5">
          <label class="mb-0">${skill.attributeName}</label>
          <input type="hidden" name="skillList[${i}].attribute_detail_id" value="${skill.attribute_detail_id}" /> 
          <input type="hidden" name="skillList[${i}].attributeId" value="${skill.attributeId}" /> 
          <input type="hidden" name="skillList[${i}].attributeName" value="${skill.attributeName}" /> 
          <input type="hidden" name="skillList[${i}].created_at" value="${skill.created_at}" /> 
		  <input type="hidden" name="skillList[${i}].category" value="${skill.category}" /> 
          <input type="hidden" id="skillList[${i}].type" name="skillList[${i}].type" value="${skill.type}" />
          <input type="hidden" name="skillList[${i}].created_at" value="${skill.created_at}" />
        </div>
        <div class="col-12 col-md-4 px-0 none mmk-amt-div">
          <div class="d-flex align-items-center">
            <span class="pr-1 main-currency">Ks</span> 
            <input type="text" id="skillList_${i}_ks" class="form-control col-9 skill-list" readonly />
            <span class="currency-symbol"></span>
          </div>
        </div>
        <div class="col-12 col-md-7 amt-div">
          <input class="form-control skill-list"
            type="text"
            id="skillList_${i}"
            name="skillList[${i}].amount"
            onkeyup="formatNumber(event, ${i}, 'skillList')"
            onkeypress="isNumber(this, event)"
            onkeydown="preventCopyPaste(event)" />
        </div>
      </div>
    `);
    if (skill.type == "FVB") {
        $('#skillList_' + i).attr('readonly', false);
    } else if (skill.type == "FV") {
        $('#skillList_' + i).attr('readonly', true);
    }
    });
    $('#attrOne').append(`
    <input type="hidden" id="skillListSize" value="${skillList.length }" />
    <div class="balanceDiv pt-3">
      <div class="row form-group">
        <div class="col-12 col-md-5">
          <label class="mb-0">Subtotal Balance</label>
        </div>
        <div class="col-12 col-md-4 px-0 none mmk-amt-div">
          <div class="d-flex align-items-center">
            <span class="pr-1 main-currency">Ks</span> 
            <input type="text" id="skillBalance_ks" class="form-control col-9" readonly /> 
            <span class="currency-symbol"></span>
          </div>
        </div>
        <div class="col-12 col-md-7 amt-div">
          <input type="text" id="skillBalance" class="form-control" readonly />
        </div>
      </div>
    </div>
    `);
}

function layoutForOtherList(otherList) {
    $('#attrTwo').empty();
    otherList.forEach(function(other, i) {
    $('#attrTwo').append(`
      <div class="row align-items-center form-group">
        <div class="col-12 col-md-5">
          <label class="mb-0">${other.attributeName}</label>
          <input type="hidden" name="otherList[${i}].attribute_detail_id" value="${other.attribute_detail_id}" /> 
          <input type="hidden" name="otherList[${i}].attributeId" value="${other.attributeId}" /> 
          <input type="hidden" name="otherList[${i}].attributeName" value="${other.attributeName}" /> 
          <input type="hidden" name="otherList[${i}].category" value="${other.category}" /> 
          <input type="hidden" name="otherList[${i}].created_at" value="${other.created_at}" /> 
          <input type="hidden" id="otherList[${i}].type" name="otherList[${i}].type" value="${other.type}" />
          <input type="hidden" name="otherList[${i}].created_at" value="${other.created_at}" /> 
        </div>
        <div class="col-12 col-md-7">
          <input type="text" class="form-control"
            id="otherList_${i}"
            name="otherList[${i}].amount"
            onkeyup="formatNumber(event, ${i}, 'otherList')"
            onkeypress="isNumber(this, event)"
            onkeydown="preventCopyPaste(event)"
            value="${other.amount}" />
          <c:if test="${other.type == 'FO' || other.type == 'FT'}">
            <input type="hidden" id="otherList_${i }_used" name="otherList[${i}].used" value="${other.used }" />
          </c:if>
        </div>
      </div>
    `);
    });
    $('#attrTwo').append(`
    <input type="hidden" id="otherListSize" value="${otherList.length }" />
    <div class="balanceDiv pt-3">
      <div class="row form-group">
        <div class="col-12 col-md-5">
          <label class="mb-0">Subtotal Balance</label>
        </div>
        <div class="col-12 col-md-7">
          <input type="text" id="otherBalance" class="form-control" readonly />
        </div>
      </div>
    </div>
    `);
}

function layoutForDeduction(deductionList) {
    $('#attrThree').empty();
    deductionList.forEach(function(deduction, i) {
    $('#attrThree').append(`
      <div class="row align-items-center form-group">
        <div class="col-12 col-md-5">
          <label class="mb-0">${deduction.attributeName}</label>
          <input type="hidden" name="deductionList[${i}].attributeId" value="${deduction.attributeId}" /> 
          <input type="hidden" name="deductionList[${i}].attributeName" value="${deduction.attributeName}" /> 
          <input type="hidden" name="deductionList[${i}].attribute_detail_id" value="${deduction.attribute_detail_id}" /> 
          <input type="hidden" name="deductionList[${i}].category" value="${deduction.category}" /> 
          <input type="hidden" id="deductionList[${i}].type" name="deductionList[${i}].type" value="${deduction.type}" />
          <input type="hidden" name="deductionList[${i}].created_at" value="${deduction.created_at}" /> 
        </div>
        <div class="col-12 col-md-7">
          <input type="text" class="form-control"
            id="deductionList_${deduction.type}_${i}"
            name="deductionList[${i}].amount"
            onkeyup="formatNumber(event, ${i}, 'deductionList_${deduction.type}')"
            onkeypress="isNumber(this, event)"
            onkeydown="preventCopyPaste(event)"
            value="${deduction.amount}" />
          <c:if test="${deduction.type == 'FL' || deduction.type == 'FP'}">
            <input type="hidden" id="deductionList_${i }_used" name="deductionList[${i}].used" value="${deduction.used }" />
          </c:if>
        </div>
      </div>
    `);
    });
    $('#attrThree').append(`
    <input type="hidden" id="deductionListSize" value="${deductionList.length }" />
    <div class="balanceDiv pt-3">
      <div class="row form-group">
        <div class="col-12 col-md-5">
          <label class="mb-0">Subtotal Balance</label>
        </div>
        <div class="col-12 col-md-7">
          <input type="text" id="deductionBalance" class="form-control" readonly />
        </div>
      </div>
    </div>
    `);
}