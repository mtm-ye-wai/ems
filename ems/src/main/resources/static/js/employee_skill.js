$(document)
    .ready(
        function() {
            $('.datepicker').datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                showOtherMonths: true,
                selectOtherMonths: true,
                yearRange: "1800:2030",
                minDate: moment($('#old-position-start-date').val(), "DD/MM/YYYY").toDate()
            });
            $('.datepicker').attr("autocomplete", "off");

            var empName = $('#empName').val();
            if (empName) {
                $('#choose-pos').hide();
                $('#choose-cer').hide();
                $('#position_id').attr('disabled', false);
                $('#jlpt').attr('disabled', false);
            } else {
                $('#choose-pos').show();
                $('#choose-cer').show();
                $('#position_id').attr('disabled', true);
                $('#jlpt').attr('disabled', true);
            }
            $('#basic-salary').val(
                numberFormat($('#basic-salary').val()));
            $('#japanese-skill').val(
                numberFormat($('#japanese-skill').val()));
            addTotalBalance("skillList", $("#skillListSize").val());
            var listTbl = $('.employee-skill-list #datatable')
                .DataTable(
                    {
                        "columnDefs": [{
                            "searchable": false,
                            "orderable": false,
                            "targets": 'no-sort'
                        }],
                        "order": [1, 'asc'],
                        scrollX: true,
                        fixedColumns: {
                            leftColumns: 3
                        }
                    });

            $(window).on('resize load', function () {
                listTbl.columns.adjust();
            });

            $('.employee-skill-list #searchbox').on('keyup', function () {
                listTbl.search(this.value).draw();
            });

            listTbl.on('order.dt search.dt', function() {
                listTbl.column(0, {
                    search: 'applied',
                    order: 'applied'
                }).nodes().each(function(cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();

            var paginate_buttons = $('#datatable_wrapper').find(
                ".paginate_button");
            if (paginate_buttons.length > 2) {
                $('#datatable_paginate').show();
            } else {
                $('#datatable_paginate').hide();
            }

            var currencyId = $('#currencyId').val();
            skillLabelChangeByCurrency(currencyId);

            if (!$('#empName').val()) {
                $('#position-start-date').attr('disabled', true);
            }
            var positionId = $('#position_id').val();
            checkPositionChanges(positionId);
            $('#download-excel').on('click', function() {
                $('#download-param').attr('name', 'padExport')
                $('#listEmpForm').submit()
            })
        });

function skillLabelChangeByCurrency(currencyId) {
    if (currencyId) {
        $.ajax({
            type: "POST",
            url: "getCurrencyByCurrencyId?currencyId=" + currencyId,
            processData: false,
            contentType: false,
            success: function(response, status, xhr) {
                var ct = xhr.getResponseHeader("content-type") || "";
                if (ct.indexOf('html') > -1) {
                    document.querySelector('html').innerHTML = response 
                }
                if (response) {
                    $('.currency').text(' (' + response.symbol + ')');
                } else {
                    console.log(error);
                }
            },
            error: function() {
                console.log("error");
            }
        });
    }
}

$('#currencyId').change(function() {
    var currencyId = $(this).val();
    skillLabelChangeByCurrency(currencyId);
});

$('#empName').change(function() {
    var empName = $(this).val();
    if (empName) {
        $('#choose-pos').hide();
        $('#choose-cer').hide();
        $('#position_id').attr('disabled', false);
        $('#position-start-date').attr('disabled', false);
        $('#jlpt').attr('disabled', false);
    } else {
        $('#choose-pos').show();
        $('#choose-cer').show();
        $('#position_id').attr('disabled', true);
        $('#position-start-date').attr('disabled', true);
        $('#jlpt').attr('disabled', true);
    }
    $.ajax({
        type: "POST",
        url: "getEmpForSkillByName?employeeName=" + empName,
        processData: false,
        contentType: false,
        success: function(response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                document.querySelector('html').innerHTML = response
            }
            if (response && response != null) {
                $('#employee-id').val(response.employeeId);
                $('#position_id').val(response.position);
                $('#jlpt').val(response.jlpt);
                $('#basic-salary').val(numberFormat(response.basicSalary));
                $('#japanese-skill').val(numberFormat(response.amount));
                addTotalBalance("skillList", $("#skillListSize").val());
            } else {
                $('#employee-id').val("");
                $('#position_id').val("");
                $('#jlpt').val("");
                $('#basic-salary').val("");
                $('#japanese-skill').val("");
                $('#total-salary').val("");
                $('.skill-fields').val("");
            }
        },
        error: function(ex) {
            console.log("error");
        }
    });
});

$('#position_id').change(function() {
    var positionId = $(this).val();
    $('.position-start-date-error').text('');
    checkPositionChanges(positionId);
    $.ajax({
        type: "POST",
        url: "getBasicSalaryByPositionId?positionId=" + positionId,
        processData: false,
        contentType: false,
        success: function(response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                document.querySelector('html').innerHTML = response
            }
            if (response && response != null) {
                $('#basic-salary').val(response.basicSalary);
                addTotalBalance("skillList", $("#skillListSize").val());
            } else {
                $('#basic-salary').val("");
            }
        },
        error: function(ex) {
            console.log("error");
        }
    });
});

function checkPositionChanges(positionId) {
    var oldPositionId = $("#old-position").val();
    if (positionId !== oldPositionId) {
        $('#positionStartDate').val('');
    } else {
        $('#positionStartDate').val($('#oldPositionStartDate').val());
    }
}

$('#jlpt').change(function() {
    var languageId = $(this).val();
    $.ajax({
        type: "POST",
        url: "getAmountByLanguageId?languageId=" + languageId,
        processData: false,
        contentType: false,
        success: function(response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                document.querySelector('html').innerHTML = response
            }
            if (response && response != null) {
                $('#japanese-skill').val(response.amount);
                addTotalBalance("skillList", $("#skillListSize").val());
            } else {
                $('#japanese-skill').val("");
            }
        },
        error: function(ex) {
            console.log("error");
        }
    });
});

$('#skill-form').change(function() {
    addTotalBalance("skillList", $("#skillListSize").val());
});

function addTotalBalance(amountId, listSize) {
    var bsAmount = $('#basic-salary').val();
    var jpAmount = $('#japanese-skill').val();
    var basicSalaryAmount = bsAmount && bsAmount != "NaN" ? bsAmount.replace(/\,/g, '') : 0;
    var jpSkillAmount = jpAmount && jpAmount != "NaN" ? jpAmount.replace(/\,/g, '') : 0;
    var totalBalance = parseFloat(basicSalaryAmount) + parseFloat(jpSkillAmount);

    for (var i = 0; i < listSize; i++) {
        var id = "#" + amountId + "_" + i;
        var amountValue = numberFormat($(id).val());
        $(id).val(amountValue);
        if (amountValue) {
            let number = amountValue.replace(/\,/g, '');
            if (number.length == 0 || number == "NaN") {
                number = "0";
            }
            totalBalance = parseFloat(totalBalance) + parseFloat(number);
        }
    }
    $('#total-salary').val(numberFormat(totalBalance.toFixed(2)));
}

function isNumber(el, evt) {
    var ch = String.fromCharCode(evt.which);
    var number = el.value.split('.');
    if (!(/[0-9\.]/.test(ch)) || (number[1] && number[1].length > 1)) {
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
        num2 = "";
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

function numberFormat(num) {
    if (num == null || num == "" || num.length == 0) {
        return "0";
    }
    let number = num.toString().replace(/\,/g, '');
    let n = parseFloat(number, 10);
    return n.toLocaleString();
}

$(".alert").delay(3000).addClass("in").fadeOut(2000);

function setfilename(val) {
    var fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);
    document.getElementById("file-name").value = fileName;
}

var skillList = [];

$('#pd-upload').click(function() {
    $.ajax({
        type: "POST",
        url: "checkIsValueChange",
        data: new FormData(document.getElementById("myform")),
        processData: false,
        contentType: false,
        success: function(response, status, xhr) {
            var list = [];
            var hash = new Object(response);
            var keys = Object.keys(hash);
            for (var i = 0; i < Object.keys(hash).length; i++) {
                if (i == 0) {
                    skillList = JSON.parse(hash[keys[i]]);
                } else {
                    var obj = {};
                    obj['employeeId'] = keys[i].split(",")[0];
                    obj['empoyeeName'] = keys[i].split(",")[1];
                    obj['jOld'] = hash[keys[i]].split(",")[1];
                    obj['jLevel'] = "";
                    obj['jNew'] = hash[keys[i]].split(",")[0];
                    list.push(obj);
                }
            }
            modalData(list);
            $('body').addClass('reduce-zindex');
            $('#confirmModal').css('display', 'block');
        },
        error: function(response, status, xhr) {
            var err = response.responseText.split("Message</b>")[1];
            var allMsg = err.split('</p>')[0].trim();
            var append = `<div class="alert alert-warning alert-dismissible py-0 mb-0"
            id="myAlert">
            <a href="#" class="close px-3 py-0" data-dismiss="alert"
              aria-label="close">&times;</a> <strong>${allMsg}</strong>
          </div>`;
            $(".error_class").append(append);
            $(".alert").delay(3000).addClass("in").fadeOut(2000);
            $("#file").val("");
            $("#file-name").val("");
        }
    });
});

if ($("#msg").val() == "OK") {
    $('#confirmModal').modal('show');
}

var count = 0;

function modalData(list) {
    count++;
    var closest;
    var amount = [];
    skillList.forEach(function(skl) {
        amount.push(skl.amount);
    });
    list.reverse();
    list.forEach(function(skill, i) {
        closest = amount.reduce(function(prev, curr) {
            return (Math.abs(curr - skill.jNew) < Math.abs(prev - skill.jNew) ? curr : prev);
        });
        skillList.forEach(function(skl) {
            if (skl.amount == closest) {
                skill.jLevel = skl.type + ", " + skl.skillLvl;
            }
        });
        var append = `<tr>
                      <td class="txt-center">${i + 1}</td>
                      <td class="txt-center"><input type="hidden" name="empoyeeId" value="${skill.employeeId}">${skill.employeeId}</td>
                      <td class="txt-center">${skill.empoyeeName}</td>
                      <td class="txt-right">${skill.jOld}</td>
                      <td class="txt-right">
                      <select id="jSkillLvl${i + 1}" name="jSkillLvl" class="info-select-box" onchange="reCalJNew(${i + 1})">`
        skillList.forEach(function(ski) {
            append += `<option value="${ski.languageId}"`
            if (ski.amount == closest) {
                append += `selected`
            }
            append += ` >`
            if (ski.skillLvl != "-") {
                append += `${ski.type + ", " + ski.skillLvl}`
            } else {
                append += `${ski.skillLvl}`
            }
            append += `</option>`
        });
        append += `
					</select>
                      </td>
                    <td class="text-right">
                        <input type="text" id="jSkillNew${i + 1}" name="jSkillNew" pattern="[0-9]+" title="Please Enter Number Only" class="form-control" onchange="reCalJSkill(${i + 1})"
							value="${parseFloat(skill.jNew)}"
                    </td>
                </tr>
	`
        if (count == 1) {
            $('#tab').append(append);
        }
    });
}

function reCalJNew(id) {
    skillList.forEach(function(ski) {
        var jLvl = $("#jSkillLvl" + id + " option:selected").val();
        if (ski.languageId == jLvl) {
            $("#jSkillNew" + id).val(parseFloat(parseFloat(ski.amount).toFixed(1)));
        }
    });
}

function reCalJSkill(id) {
    var jNew = $("#jSkillNew" + id).val();
    if (!isNaN(jNew)) {
        $("#jSkillNew" + id).val(parseFloat(parseFloat(jNew).toFixed(1)));
        var amount = [];
        skillList.forEach(function(skl) {
            amount.push(skl.amount);
        });
        closest = amount.reduce(function(prev, curr) {
            return (Math.abs(curr - jNew) < Math.abs(prev - jNew) ? curr : prev);
        });
        $("#jSkillLvl" + id + " option:selected").removeAttr("selected");
        skillList.forEach(function(skl) {
            if (skl.amount == closest) {
                $("#jSkillLvl" + id).find('option[value="' + skl.languageId + '"]').attr("selected", "selected");
            }
        });
    }
}