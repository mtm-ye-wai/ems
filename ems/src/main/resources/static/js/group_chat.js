var URL_PREFIX = location.origin.concat(CONTEXT_PATH);

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
    if ($('#group-list-size').val() == '0') {
	    $('#current-grp').val("");
		$('#post-create-form').hide();
        $('#send').prop('disabled', true);
        $('#fileUpload').prop('disabled', true);
    }
    if ($('#current-grp').val()) {
        removeBgColor();
        postRemove();
        resetPostCreateData();
        var id = $('#current-grp').val();
        var currentId = '#group-li' + id;
        $(currentId).addClass('bg-active');
        groupChatScreenChange(id);
    }
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#chatMemberTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    var permissionSelect = new Choices('#multi', {
        removeItemButton: true
    });

    var groupOwnerSlt = $('.choices__input').attr("placeholder");
    var ownerVal = $("#multi").val();
    if (ownerVal && ownerVal.length > 0) {
        if (groupOwnerSlt) {
            $('.choices__input').attr("placeholder", "");
        }
    } else {
        if (!groupOwnerSlt) {
            $('.choices__input').attr("placeholder", "Choose Group Admin");
        }
    }
});

function groupselect(index) {
    removeBgColor();
    postRemove();
    resetPostCreateData();
    var selectedGId = '#group-li' + index;
    $(selectedGId).addClass('bg-active');
    groupChatScreenChange(index);
}

var select = false;
function groupChatScreenChange(groupId) {
    select = true;
    var flg = $('#privateFlg').val();
    $('#current-grp').val(groupId);
    if (!flg) {
        flg = 0;
    }
    if (flg == 1) {
        if (!$('#privatePost').hasClass('col-gray')) {
            $('#privatePost').addClass('col-gray');
        }
        if ($('#publicPost').hasClass('col-gray')) {
            $('#publicPost').removeClass('col-gray');
        }
    } else {
        if (!$('#publicPost').hasClass('col-gray')) {
            $('#publicPost').addClass('col-gray');
        }
        if ($('#privatePost').hasClass('col-gray')) {
            $('#privatePost').removeClass('col-gray');
        }
    }
    $.ajax({
        type: "POST",
        url: "getGroupById?groupId=" + groupId + "&flg=" + flg,
        processData: false,
        contentType: false,
        success: function (response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            if (response) {
                $('.des').remove();
                var des = response.description;
                if (des) {
                    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
                    des = des.replace(urlRegex, function (url) {
                        var hyperlink = url;
                        if (!hyperlink.match('^https?:\/\/')) {
                            hyperlink = 'http://' + hyperlink;
                        }
                        return '<a href="' + hyperlink
                            + '" target="_blank" class="des-link">' + url
                            + '</a>'
                    });
                } else {
                    des = '';
                }
                des = '<span class="des">' + des + "</span>";
                $('#login-id').val(response.loginId);
                $('.description').append(des);
                $('.group-open-name').text(response.name);
                $('.group-open-photo').attr('src', response.photo);
                $('#max-count').val(response.offset);
                $('#total-count').val(response.count);
                for (i = 0; i < response.postList.length; i++) {
                    postCreation(response.postList[i]);
                }

                if (response.permission) {
                    if ($('#edition-span').hasClass("none")) {
                        $('#edition-span').removeClass("none");
                    }
                    if (!$('#member-list-span').hasClass("none")) {
						$('#member-list-span').addClass("none");
					}
                } else {
                    if (!$('#edition-span').hasClass("none")) {
                        $('#edition-span').addClass("none");
                    }
                    if ($('#member-list-span').hasClass("none")) {
						$('#member-list-span').removeClass("none");
					}
                }

            }
        },
        error: function (ex) {
            console.log("error");
        }
    });
    var height = $(".scroll").height();
    $(".scroll").animate({
        scrollTop: height
    }, 200);
}

function removeBgColor() {
    var id = $('#current-grp').val();
    var groupId = '#group-li' + id;
    if ($(groupId).hasClass('bg-active')) {
        $(groupId).removeClass('bg-active');
    }
}

function postCreation(data) {
    var postData = data.post;
    if (postData) {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        postData = postData.replace(urlRegex, function (url) {
            var hyperlink = url;
            if (!hyperlink.match('^https?:\/\/')) {
                hyperlink = 'http://' + hyperlink;
            }
            return '<a href="' + hyperlink
                + '" target="_blank" class="des-link">' + url
                + '</a>'
        });
    }

    var post = '<div class="post p-3 border-bottom" onmouseenter="mouseenter('
        + data.postId + ')" onmouseleave="mouseleave(' + data.postId
        + ')">' + '<div class="d-flex justify-content-between">'
        + '<div class="emp-profile">' + '<img src="' + data.empPhoto
        + '" class="border border-secondary rounded-circle mr-2" />'
        + '<span>' + data.employeeName + '</span>' + '</div>' + '<small>'
        + data.postDate + '</small>' + '</div>' + '<p class="my-2 post-data">'
        + postData + '</p>';
    if (data.uploadedFile) {
        var sp = data.uploadedFile.split(".");
        var type = sp[sp.length - 1];
        if (type.toLowerCase() == "jpg" || type == "jpeg" || type == "png" || type == "gif") {
            post += '<div class="uploaded-file border pb-1">'
                + '<p class="px-2 py-1 mb-2 border-bottom">'
                + '<i class="fas fa-exclamation-circle pr-2"></i>New file uploaded.</p>'
                + '<div class="uploaded-img px-2 mb-1">'
                + '<img src="'
                + data.uploadedFile
                + '" class="mw-100 mh-100" alt="Unknown File" />'
                + '</div>'
                + '<a href="#" class="pl-2 img-name" onclick="downloadFile('
                + data.postId + ",\'" + data.uploadedFileName
                + '\')">'
                + data.uploadedFileName
                + '</a>'
                + '<a href="#" class="border rounded border-info px-1 ml-2" onclick="showPreviewImg('
                + data.postId + ')"><small>Preview</small></a>' + '</div>';
        } else if (type == "pdf" || type == "txt") {
            post += '<div class="uploaded-file border pb-1">'
                + '<p class="px-2 py-1 mb-2 border-bottom">'
                + '<i class="fas fa-exclamation-circle pr-2"></i>New file uploaded.</p>'
                + '<a href="#" class="pl-2 img-name" onclick="downloadFile('
                + data.postId + ",\'" + data.uploadedFileName
                + '\')">'
                + data.uploadedFileName
                + '</a>'
                + '<a href="#" class="border rounded border-info px-1 ml-2" onclick="showPreviewPDF('
                + data.postId + ')"><small>Preview</small></a>' + '</div>';
        } else {
            post += '<div class="uploaded-file border pb-1">'
                + '<p class="px-2 py-1 mb-2 border-bottom">'
                + '<i class="fas fa-exclamation-circle pr-2"></i>New file uploaded.</p>'
                + '<a href="#" class="pl-2 img-name" onclick="downloadFile('
                + data.postId + ",\'" + data.uploadedFileName + '\')">' + data.uploadedFileName + '</a>'
                + '</div>';
        }
    }
    var loginId = $('#login-id').val();
    if (loginId == data.createdUser) {
        post += '<div id="edit-post'
            + data.postId
            + '" class="des-btns card-shadow border border-top-0 rounded-bottom px-3">'
            + '<a href="#" class="col-green text-decoration-none btn-edit" href="#" onclick="editPost('
            + data.postId
            + ')">'
            + '<i class="far fa-edit pr-2"></i>Edit'
            + '</a>'
            + '<a href="#" class="text-danger text-decoration-none btn-delete ml-3" data-toggle="modal"  onclick="deletePost('
            + data.postId + ')">'
            + '<i class="fas fa-trash-alt pr-2"></i>Delete' + '</a>'
            + '</div>';
    }
    post += '</div>';
    $('#post-list-div').prepend(post);
    var editPost = '#edit-post' + data.postId;
    $(editPost).hide();
}

function postRemove() {
    $(".post").remove();
}

$(".scroll").scroll(function () {
    if ($(this).scrollTop() == 0 && !select) {
        loadResult();
    }
    select = false;
});

function loadResult() {
    var groupId = $('#current-grp').val();
    var flg = $('#privateFlg').val();
    var offset = $('#max-count').val();
    var totalCount = $("#total-count").val();
    var maxCount = parseInt(offset) + 5;
    $('#max-count').val(maxCount);
    if (parseInt(offset) <= parseInt(totalCount)) {
        $
            .ajax({
                type: "GET",
                url: "getPostByGroupId?groupId=" + groupId + "&offset="
                    + maxCount + "&flg=" + flg,
                processData: false,
                contentType: false,
                beforeSend: function (xhr) {
                    $(".scroll")
                        .prepend(
                            $(
                                "<div id='loading-bar-spinner' class='spinner loading'><div class='spinner-icon'></div></div>")
                                .fadeIn('slow')).data(
                                    "loading", true);
                },
                success: function (response, status, xhr) {
                    var ct = xhr.getResponseHeader("content-type") || "";
                    if (ct.indexOf('html') > -1) {
                        window.location.reload();
                        return;
                    }
                    if (response) {
                        setTimeout(function () {
                            postRemove();
                            $(".loading").fadeOut('fast', function () {
                                $(this).remove();
                            });
                            var height = $(".scroll").height();
                            $(".scroll").animate({
                                scrollTop: height
                            }, 200);
                            for (i = 0; i < response.length; i++) {
                                var data = response[i];
                                postCreation(data);
                            }
                        }, 1000);
                    }
                },
                error: function (ex) {
                    console.log("error");
                }
            });
    }
};

function showPreviewImg(postId) {
    $
        .ajax({
            type: "GET",
            url: "getPostById?postId=" + postId,
            processData: false,
            contentType: false,
            success: function (response, status, xhr) {
                var ct = xhr.getResponseHeader("content-type") || "";
                if (ct.indexOf('html') > -1) {
                    window.location.reload();
                    return;
                }
                if (response) {
                    $('#pre-file-name').text(response.uploadedFileName);
                    $('#pre-file-url').attr("src", response.uploadedFile);
                    $('#pre-file-postid').text(response.postId);
                    $('#pre-upload-date').text(
                        "Upload Date: " + response.postDate);
                    $('#pre-file-owner').text(response.createdUser);
                }
            },
            error: function (ex) {
                console.log("error");
            }
        });
    $('#preview-dialog').modal('show');
}

function showPreviewPDF(postId) {
    $.ajax({
        type: "GET",
        url: "getPostById?postId=" + postId,
        processData: false,
        contentType: false,
        success: function (response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            if (response) {
                window.open(response.uploadedFile);
            }
        },
        error: function (ex) {
            console.log("error");
        }
    });
}

function downloadFile(postId, fileName) {
    $.ajax({
        type: "GET",
        url: "downloadFile?postId=" + postId,
        processData: false,
        contentType: false,
        success: function (filePath, textStatus, xhr) {
			var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            if (filePath && fileName) {
                download(fileName, URL_PREFIX.concat(filePath))
            }
        },
        error: function (ex) {
            console.log(ex);
        }
    });
}

function mouseenter(postId) {
    var editPost = '#edit-post' + postId;
    $(editPost).show();
}

function mouseleave(postId) {
    var editPost = '#edit-post' + postId;
    $(editPost).hide();
}

function showImage() {
    if (this.files && this.files[0]) {
        var obj = new FileReader();
        obj.onload = function (data) {
            var image = document.getElementById("image");
            image.src = data.target.result;
            image.style.display = "block";
        }
        obj.readAsDataURL(this.files[0]);
    }
}

$("#fileUpload").change(function () {
    $('#modal-post-msg').val($('#post-box').val());
    readImage(this);
});

function readImage(input) {
    addBlock("#fileImg");
    addBlock("#fileDefault-pdf");
    addBlock("#fileDefault-word");
    addBlock("#fileDefault-excel");
    if (input.files && input.files[0]) {
        if (input.files[0].name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
            var reader = new FileReader();
            $('.modal-body img').removeAttr('style');
            reader.onload = function (e) {
                $('.modal-body #fileImg').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
            removeBlock("#fileDefault-pdf");
            removeBlock("#fileDefault-word");
            removeBlock("#fileDefault-excel");
            $("#fileImg").show();
            $("#fileDefault-pdf").hide();
            $("#fileDefault-word").hide();
            $("#fileDefault-excel").hide();
        } else {
            var fileExtension = input.files[0].name.split('.').pop();
            switch (fileExtension) {
                case 'pdf':
                    removeBlock("#fileImg");
                    removeBlock("#fileDefault-word");
                    removeBlock("#fileDefault-excel");
                    $("#fileImg").hide();
                    $("#fileDefault-pdf").show();
                    $("#fileDefault-word").hide();
                    $("#fileDefault-excel").hide();
                    break;
                case 'docx':
                    removeBlock("#fileImg");
                    removeBlock("#fileDefault-pdf");
                    removeBlock("#fileDefault-excel");
                    $("#fileImg").hide();
                    $("#fileDefault-pdf").hide();
                    $("#fileDefault-word").show();
                    $("#fileDefault-excel").hide();
                    break;
                case 'xls':
                case 'xlsx':
                    removeBlock("#fileImg");
                    removeBlock("#fileDefault-pdf");
                    removeBlock("#fileDefault-word");
                    $("#fileImg").hide();
                    $("#fileDefault-pdf").hide();
                    $("#fileDefault-word").hide();
                    $("#fileDefault-excel").show();
                    break;
                default:
                    removeBlock("#fileDefault-pdf");
                    removeBlock("#fileDefault-word");
                    removeBlock("#fileDefault-excel");
                    $("#fileImg").show();
                    $("#fileDefault-pdf").hide();
                    $("#fileDefault-word").hide();
                    $("#fileDefault-excel").hide();
            }
            $('.modal-body img').css({
                'width': '20%'
            });
        }
        $('#fileName').val(input.files[0].name);
        $('#previewPhoto').modal('show');
    }
}

function addBlock(id) {
    if (!$(id).hasClass('d-block')) {
        $(id).addClass('d-block');
    }
}

function removeBlock(id) {
    if ($(id).hasClass('d-block')) {
        $(id).removeClass('d-block');
    }
}

function resetPostCreateData() {
    $('#private-flg').val('');
    $('#fileUpload').val('');
    $('#post-box').val('');
    $('#modal-post-msg').val('');
    $('#fileName').val('');
    $('#fileImg').attr('src', '');
}

$('#post-modal-send').click(function () {
    $('#post-box').val($('#modal-post-msg').val());
});

$('.post-modal-close').click(function () {
    $('#fileUpload').val('');
    $('#modal-post-msg').val('');
    $('#fileName').val('');
    $('#fileImg').attr('src', '');
});

function viewMembers() {
    var groupId = $('#current-grp').val();
    var link = $('#viewMembers');
    link.attr('href', link.attr('href') + 'groupId=' + groupId);
}

function addMember() {
    var groupId = $('#current-grp').val();
    var link = $('#addMember');
    link.attr('href', link.attr('href') + 'groupId=' + groupId);
}

function removeMember() {
    var groupId = $('#current-grp').val();
    var link = $('#removeMember');
    link.attr('href', link.attr('href') + 'groupId=' + groupId);
}

function editGroup() {
    var groupId = $('#current-grp').val();
    var link = $('#editGroup');
    link.attr('href', link.attr('href') + 'groupId=' + groupId);
}

function deleteGroupChat() {
    $("#confirm-delete-grp").modal();
    $('.delete-title').html("Delete Group Chat");
}

$('#confirm-delete-grp').on('click', '.delete-grp', function (e) {
    e.preventDefault();
    var groupId = $('#current-grp').val();
    window.location = "deleteGroupChat?groupId=" + groupId;
});

function editPost(postId) {
    $('#text-box-post').val(postId);
    $.ajax({
        type: "GET",
        url: "getPost?postId=" + postId,
        processData: false,
        contentType: false,
        success: function (response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            $('#post-box').val(response.post);
            if (response.privateFlg === 1) {
                $('#private-flg').attr('checked', 'checked');
            }
        }
    });
}

function deletePost(postId) {
	$('#confirm-delete-post').modal();
    $('.delete-title').html("Delete Post");
    $('#confirm-delete-post').on('click', '.delete-post', function (e) {
        e.preventDefault();
        window.location = "getPostDelete?postId=" + postId;
    });
}

$('#privatePost').click(function () {
    var groupId = $('#current-grp').val();
    $('#privateFlg').val(1);
    removeBgColor();
    postRemove();
    resetPostCreateData();
    var id = $('#current-grp').val();
    var currentId = '#group-li' + id;
    $(currentId).addClass('bg-active');
    groupChatScreenChange(groupId);
});

$('#publicPost').click(function () {
    var groupId = $('#current-grp').val();
    $('#privateFlg').val(0);
    removeBgColor();
    postRemove();
    resetPostCreateData();
    var id = $('#current-grp').val();
    var currentId = '#group-li' + id;
    $(currentId).addClass('bg-active');
    groupChatScreenChange(groupId);
});

$('#multi').change(function () {
    var groupOwnerSlt = $('.choices__input').attr("placeholder");
    var ownerVal = $(this).val();
    if (ownerVal && ownerVal.length > 0) {
        if (groupOwnerSlt) {
            $('.choices__input').attr("placeholder", "");
        }
    } else {
        if (!groupOwnerSlt) {
            $('.choices__input').attr("placeholder", "Choose Group Admin");
        }
    }
});

function download(fileName, filePath) {
    var element = document.createElement('a');
    element.setAttribute('href', filePath.concat(fileName));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

$('#post-box').keydown(function (e) {
  if (e.ctrlKey && e.keyCode == 13) {
    $("#send" ).click();
  }
});