/**
 * <h2>Move Page</h2>
 * <p>
 * Post Method ページの移動
 * </p>
 * 
 * @param formId
 * @param uri
 * @param offset
 */
function movePage(formId, uri, offset) {
    var pageForm = document.getElementById(formId);
    pageForm.offset.value = offset;
    pageForm.action = uri;
    pageForm.submit();
}

/**
 * <h2>Select all Checked and Unchecked </h2>
 * <p>
 * Select all Checked and Unchecked
 * </p>
 */
function selectAllCheckBox() {
    if (document.getElementById('select_all').checked == true) {
        $('.check_data').each(function () {
            this.checked = true;
        });
    } else {
        $('.check_data').each(function () {
            this.checked = false;
        });
    }
}

/**
 * <h2>Select Each Checked and Unchecked </h2>
 * <p>
 * Select Each Checked and Unchecked
 * </p>
 */
$(function () {
    $('.check_data').change(function () {
        if ($('.check_data:checked').length) {
            $('.check_remove_disable').removeAttr("disabled");
        } else {
            $('check_remove_disable').attr('disabled', 'disabled');
        }
    });
});

/**
 * <h2>Delete Row</h2>
 * <p>
 * Delete Row in Trasportaion Fee Registeration
 * </p>
 * 
 * @param row
 */
function deleteRow(row) {
    var count = $('#feetable tr').length - 1;
    console.log("Count is " + count);
    if (count != 1) {
        console.log("success");
        $(row).closest('tr').remove();
    }
    sumOfFee();
}

/**
 * <h2>Delete Row</h2>
 * <p>
 * Delete Row in Trasportaion Fee Registeration
 * </p>
 * 
 * @param row
 */
function deleteRowRecord(row) {
    $(row).closest('tr').remove();
    sumOfOtherFee();
}

/**
 * <h2>Sum of To and From Office Fee</h2>
 * <p>
 * Sum of To and From Office Fee in Trasportaion Fee Registeration
 * </p>
 * 
 * @param row
 */
function sumOfFee() {
    var fromOffice = 0;
    var toOffice = 0;
    var rowCount = document.getElementById("feetable").rows.length;

    for (var i = 1; i < rowCount; i++) {
        var feeValue = parseFloat(document.getElementById("feetable").rows[i].cells[3]
            .getElementsByTagName("input")[0].value);
        var feeState = document.getElementById("feetable").rows[i].cells[4]
            .getElementsByTagName("select")[0].value;

        if (isNaN(feeValue)) {
            feeValue = 0;
        }
        if (feeState == "1") {
            fromOffice = fromOffice + feeValue;

        } else if (feeState == "2") {
            toOffice = toOffice + feeValue;

        }
    }
    document.getElementById('totalFromOffice').value = fromOffice;
    document.getElementById('totalToOffice').value = toOffice;
}

/**
 * <h2>Year List</h2>
 * <p>
 * Year List
 * </p>
 */
$(function () {
    var $select = $(".year-range");
    var selectedYear = $("#select-year").val();
    var currentYear = (new Date).getFullYear();
    for (i = currentYear; i >= 1996; i--) {
        if ((selectedYear && i == selectedYear)
            || (!selectedYear && i == currentYear)) {
            $select.append($('<option selected></option>').val(i).html(i))
        } else {
            $select.append($('<option></option>').val(i).html(i))
        }
    }
});

function checkDoubleSubmit(clickBtn) {
    $(clickBtn).disabled = true;
}
