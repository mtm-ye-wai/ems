$(document).ready(function() {

    //load presonal info
   // loadPersonalInfo();


    addPlaceholderByBankAccType();
    //update 15/06/2022
    $("#useFerry1").on("change", function() {
        if (!$(this).is(":checked")) {
            $("#user-4").hide(function() {
                $(this).slideUp(100);
            })
        } else {
            $("#user-4").show(function() {
                $(this).slideDown(100);
            });
        }
    });
});

$('#posId').change(
    function(event) {
        var posId = $(this).find('option:selected').val();
        $.each(list, function(index, value) {
            if (value.positionId == posId) {
                var basicSalary = value.basicSalary;
                $('#basicSalary').val(
                    basicSalary.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                        "$1,"));
            }
        });
    });

$('#bankAccount').keypress(function(event) {
    var bankAccType = $("#bankAccountType").val();
    if (bankAccType == 1 || bankAccType == 3) {
        var num = $(this).val().replace(/ /g, "");
        var ch = String.fromCharCode(event.which);
        if (!(/[0-9]/.test(ch)) || num.length == 16) {
            event.preventDefault();
        }
    }
    if (bankAccType == 2) {
        var num = $(this).val();
        var ch = String.fromCharCode(event.which);
        if (!(/[0-9]/.test(ch)) || num.length == 16) {
            event.preventDefault();
        }
    }
    if (bankAccType == 4) {
        var num = $(this).val();
        var ch = String.fromCharCode(event.which);
        if (!(/[0-9]/.test(ch)) || num.length == 17) {
            event.preventDefault();
        }
    }
});

$('#bankAccount').keyup(function() {
    var bankAccType = $("#bankAccountType").val();
    if (bankAccType == 1 || bankAccType == 3) {
        var num = $(this).val().replace(/ /g, "");
        $(this).val(num.replace(/\B(?=(\d{4})+(?!\d))/g, " "));
    }
});

$('#bankAccount').change(function() {
    addPlaceholderByBankAccType();
});

$('#bankAccountType').on('change', function() {
    $('#bankAccount').val("");
    addPlaceholderByBankAccType();
});

function addPlaceholderByBankAccType() {
    let accountType = $('#bankAccountType').val();
    switch (accountType) {
        case "1":
        case "3":
            $('#bankAccount').attr('placeholder', "1234 1234 1234 1234");
            break;
        case "2":
            $('#bankAccount').attr('placeholder', "Enter bank account with 16 digits");
            break;
        case "4":
            $('#bankAccount').attr('placeholder', "Enter bank account with 17 digits");
            break;
        default:
            $('#bankAccount').removeAttr('placeholder');
            break;
    }
}

$('#macAddress').keypress(function(event) {
    var ch = String.fromCharCode(event.which);
    if (ch == " ") {
        event.preventDefault();
    }
});

$("#macAddress").keyup(function() {
    var num = $(this).val().replace(/-/gi, "");
    $(this).val(addDash(num));
});

function addDash(x) {
    var parts = x.toString().split(",");
    for (i = 0; i < parts.length; i++) {
        parts[i] = parts[i].replace(/\B(?=(.{2})+(?!.))/g, "-");
    }
    return parts.join(",");
}

$('#ssbNo').keypress(function(event) {
    var ch = String.fromCharCode(event.which);
    if (!(/[0-9\.]/.test(ch)) && ch != " ") {
        event.preventDefault();
    }
});

function showImage() {
    if (this.files && this.files[0]) {
        var obj = new FileReader();
        obj.onload = function(data) {
            var image = document.getElementById("image");
            image.src = data.target.result;
            image.style.display = "block";
        }
        obj.readAsDataURL(this.files[0]);
    }
}

var type = $('#employeeType').val();
var employeeSize = $('#employee-size').val();
var operatorSize = $('#operator-size').val();
if (type == 2 || type == 5) {
    $('#user1').hide();
    $('#user2').hide();
    $('#user3').hide();

    $('#operatorTbl').show();
    $('#userTbl').hide();

    $('#search1').hide();
    //$('#search2').hide();
    $('#search3').hide();
    //$('#search4').hide();
    if (operatorSize > 0) {
        $('#export-icons-div').show();
    } else {
        $('#export-icons-div').hide();
    }
} else {
    $('#user1').show();
    $('#user2').show();
    $('#user3').show();

    $('#userTbl').show();
    $('#operatorTbl').hide();

    $('#search1').show();
    //$('#search2').show();
    $('#search3').show();
    //$('#search4').show();
    if (employeeSize > 0) {
        $('#export-icons-div').show();
    } else {
        $('#export-icons-div').hide();
    }
}

$('#employeeType').change(function() {
    var type = $(this).val();
    var employeeSize = $('#employee-size').val();
    var operatorSize = $('#operator-size').val();
    if (type == 2 || type == 5) {
        $('#user1').hide();
        $('#user2').hide();
        $('#user3').hide();

        $('#operatorTbl').show();
        $('#userTbl').hide();

        $('#search1').hide();
        //$('#search2').hide();
        $('#search3').hide();
        //$('#search4').hide();
        if (operatorSize > 0) {
            $('#export-icons-div').show();
        } else {
            $('#export-icons-div').hide();
        }
        $("#show-1").hide();
    } else {
        $('#user1').show();
        $('#user2').show();
        $('#user3').show();

        $('#userTbl').show();
        $('#operatorTbl').hide();

        $('#search1').show();
        //$('#search2').show();
        $('#search3').show();
        //$('#search4').show();
        if (employeeSize > 0) {
            $('#export-icons-div').show();
        } else {
            $('#export-icons-div').hide();
        }
        $("#show-1").show();
    }
});

$('#export-excel').click(function() {
    var type = $('#employeeType').val();
    if (type == 2) {
        $('#excelOperModal').modal('show');
    } else {
        $('#excelModal').modal('show');
    }
});

$('#export-pdf').click(function() {
    var type = $('#employeeType').val();
    if (type == 2) {
        $('#pdfOperModal').modal('show');
    } else {
        $('#pdfModal').modal('show');
    }
});

var userTbl = $('#userTbl #datatable')
    .DataTable(
        {
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 'no-sort'
            }, {
                "targets": [7, 11],
                "type": 'extract-date',
            }],
            "language": {
                "paginate": {
                    "previous": "<<",
                    "next": ">>"
                }
            },
            dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
                + "<'row'<'col-md-12'<'table-responsive'tr>>>"
                + "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
            "order": [[1, 'asc']]
        });
userTbl.draw();

userTbl.on('order.dt search.dt', function() {
    userTbl.column(0, {
        search: 'applied',
        order: 'applied'
    }).nodes().each(function(cell, i) {
        cell.innerHTML = i + 1;
    });
}).draw();

var operatorTbl = $('#operatorTbl #datatable')
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
            dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
                + "<'row'<'col-md-12'<'table-responsive'tr>>>"
                + "<'row'<'col-sm-5'i>>" + "<'row'<'col-sm-12'p>>",
            "order": [[1, 'asc']]
        });
operatorTbl.draw();

operatorTbl.on('order.dt search.dt', function() {
    operatorTbl.column(0, {
        search: 'applied',
        order: 'applied'
    }).nodes().each(function(cell, i) {
        cell.innerHTML = i + 1;
    });
}).draw();

$(function() {
    $('#empName')
        .on(
            'blur',
            function() {
                $
                    .ajax({
                        type: "POST",
                        url: "searchEmployeeByName",
                        data: new FormData(document
                            .getElementById("myform")),
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        success: function(response, status, xhr) {
                            var ct = xhr.getResponseHeader("content-type") || "";
                            if (ct.indexOf('html') > -1) {
                                window.location.reload();
                                return;
                            }
                            if (response) {
                                if ($('#empNameDiv').html() != "") {
                                    $(".empNameErr").remove();
                                }
                                if ($('#duplicateName').html() != "") {
                                    $(".duplicateNameErr").remove();
                                }
                                if ($('#errorName').html() != "") {
                                    $(".nameErr").remove();
                                }
                                $('#empNameDiv')
                                    .append(
                                        '<span class="text-danger empNameErr">Employee Name is already exist!</span>');
                            } else {
                                if ($('#empNameDiv').html() != "") {
                                    $(".empNameErr").remove();
                                }
                                if ($('#duplicateName').html() != "") {
                                    $(".duplicateNameErr").remove();
                                }
                                if ($('#errorName').html() != "") {
                                    $(".nameErr").remove();
                                }
                            }
                        },
                        error: function(ex) {
                            console.log("error");
                        }
                    });
            });
});

// import employee list
function setfilename(val) {
    var fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);
    document.getElementById("file-name").value = fileName;
}

$(".alert").delay(3000).addClass("in").fadeOut(2000);

$('#excel').click(function() {
    $('#excelModal').modal('hide')
});
$('#pdf').click(function() {
    $('#pdfModal').modal('hide')
});

$('#excelOper').click(function() {
    $('#excelOperModal').modal('hide')
});
$('#pdfOper').click(function() {
    $('#pdfOperModal').modal('hide')
});

//analysis personal info
function loadPersonalInfo() {
    var maritalStatus = $("#maritalStatus")[0];
    martialCheck(maritalStatus.value);
    $(maritalStatus).on('change', function() {
        martialCheck(this.value);
    });
    
    var lifeInsurance = $("#lifeInsurance");
    console.log(lifeInsurance.is(":checked"));
    lifeInsuranceCheck(lifeInsurance.is(":checked"));
    lifeInsurance.on("change",function(){
        lifeInsuranceCheck($(this).is(":checked"));
    })
}

function martialCheck(value = '1') {
    if (value == null) return;
    if (value == '1') {
        $("#children").attr("readonly","readonly");
        $("#children")[0].value = 0;
    } else {
        $("#children").removeAttr("readonly");
    }
}
function lifeInsuranceCheck(value = false){
    if(value){
        $("#lifeInsurancePrice").removeAttr("readonly");
    }else{
        $("#lifeInsurancePrice").attr("readonly","readonly");
        $("#lifeInsurancePrice")[0].value=0;
    }
}
