$(document).ready(function(){
    var wfhFlag = $("#WFHFlag").val();
    if (wfhFlag == "1") {
        $("#wfh-status").show();
    } else {
        $("#wfh-status").hide();
    }
});

$("#WFHFlag").change(function() {
    var wfhFlag = $(this).val();
    if (wfhFlag == "1") {
        $("#wfh-status").show();
    } else {
        $("#wfh-status").hide();
    }
});

$("#update")
    .click(
        function () {
            var value = $('input[type="checkbox"]:checked').val();
            var modal = document.getElementById('wfhModal');
            var modalHeader = document.getElementById('modal-header');
            var modalIcon = document.getElementById('modal-icon');
            var modalUpdateBtn = document.getElementById('btnUpdate');
            var modalCloseBtn = document.getElementById('close-btn');
            if (modal.classList.contains("confirm-delete")) {
                modal.classList.remove("confirm-delete");
            }
            if (modalHeader.classList.contains("modal-danger")) {
                modalHeader.classList.remove("modal-danger");
            }
            if (modalHeader.classList.contains("bg-danger")) {
                modalHeader.classList.remove("bg-danger");
            }
            if (modalIcon.classList.contains("text-danger")) {
                modalIcon.classList.remove("text-danger");
            }
            if (modalIcon.classList.contains("fa-trash-alt")) {
                modalIcon.classList.remove("fa-trash-alt");
            }
            if (modalUpdateBtn.classList.contains("modal-delete")) {
                modalUpdateBtn.classList.remove("modal-delete");
            }
            if (modalCloseBtn.classList.contains("modal-close")) {
                modalCloseBtn.classList.remove("modal-close");
            }
            modalHeader.classList.add("modal-primary");
            modalHeader.classList.add("bg-green");
            modalIcon.classList.add("col-green");
            modalIcon.classList.add("fa-edit");
            modalCloseBtn.classList.add("btn-default");
            modalUpdateBtn.innerHTML = 'Update';

            if (value == null) {
                var $type = $("#wfhStatus");
                var selectValue = $("option:selected", $type).val();

                if (selectValue === "1") {
                    document.getElementById('lblTitle').innerHTML = 'Request Attendance Report';
                    document.getElementById('pText').innerHTML = 'Do you want to request?';
                } else if (selectValue === "2") {
                    document.getElementById('lblTitle').innerHTML = 'Approve Attendance Report';
                    document.getElementById('pText').innerHTML = 'Do you want to approve?';
                } else if (selectValue === "3") {

                    if (modalHeader.classList.contains("modal-primary")) {
                        modalHeader.classList.remove("modal-primary");
                    }
                    if (modalHeader.classList.contains("bg-green")) {
                        modalHeader.classList.remove("bg-green");
                    }
                    if (modalIcon.classList.contains("col-green")) {
                        modalIcon.classList.remove("col-green");
                    }
                    if (modalCloseBtn.classList.contains("btn-default")) {
                        modalIcon.classList.remove("btn-default");
                    }
                    modal.classList.add("confirm-delete");
                    modalHeader.classList.add("modal-danger");
                    modalHeader.classList.add("bg-danger");
                    modalIcon.classList.add("text-danger");
                    modalUpdateBtn.classList.add("modal-delete");
                    modalCloseBtn.classList.add("modal-close");
                    document.getElementById('lblTitle').innerHTML = 'Reject Attendance Report';
                    document.getElementById('pText').innerHTML = 'Do you want to reject?';
                } else {
                    document.getElementById('lblTitle').innerHTML = 'Update Attendance Report';
                    document.getElementById('pText').innerHTML = 'Do you want to update?';
                }
            } else {
                if (modalHeader.classList.contains("modal-primary")) {
                    modalHeader.classList.remove("modal-primary");
                }
                if (modalHeader.classList.contains("bg-green")) {
                    modalHeader.classList.remove("bg-green");
                }
                if (modalIcon.classList.contains("col-green")) {
                    modalIcon.classList.remove("col-green");
                }
                if (modalIcon.classList.contains("fa-edit")) {
                    modalIcon.classList.remove("fa-edit");
                }
                if (modalCloseBtn.classList.contains("btn-default")) {
                    modalIcon.classList.remove("btn-default");
                }
                document.getElementById('wfhModal').classList
                    .add("confirm-delete");
                modalHeader.classList.add("modal-danger");
                modalHeader.classList.add("bg-danger");
                modalIcon.classList.add("text-danger");
                modalIcon.classList.add("fa-trash-alt");
                modalUpdateBtn.classList.add("modal-delete");
                modalCloseBtn.classList.add("modal-close");
                document.getElementById('lblTitle').innerHTML = 'Delete Attendance Report';
                document.getElementById('pText').innerHTML = 'Do you want to delete?';
                modalUpdateBtn.innerHTML = 'Delete';
            }
        });