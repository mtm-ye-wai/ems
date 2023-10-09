var choice = null;
$(function() {
    stateManagement();
    $('[data-toggle="tooltip"]').tooltip();
    $(".step-btn").on('click', function() {
        
        var step = this.dataset['step'];
        if (step >= 4) {
            $(".step-btn")[1].innerHTML = "Download";
        } 
        if(!$(this).hasClass("next") && step <= 5) {
            $(".step-btn")[1].innerHTML = "Next";
        }
        
        if (step == 5 && $(this).hasClass("next")) {
            document.getElementById('skillSheetForm').submit();
            return false;
        } else {
            $(".form-step").removeClass("active");
            updateView(step, $(this).hasClass("next"));
            var targetStepRef = $(".step-progress-btn")[Number(step) + 1];
            $(targetStepRef).removeAttr("disabled");
        }

    });
    $(".exp-add").on("click", function(e) {
        e.preventDefault();
        var index = document.getElementsByClassName("emps").length;
        addExp(index)
    });
    $("#add-new-exp").on("click", function(e) {
        e.preventDefault();

        var tr = document.createElement("tr");
        $(tr).addClass("opc");
        tr.innerHTML = newExpData();

        document.getElementById("tbl").appendChild(tr);

        var tr1 = document.createElement("tr");
        $(tr1).addClass("opc-res");
        tr1.innerHTML = addExpRes();

        document.getElementById("res-tbl").appendChild(tr1);
    });
    //paginate
    $(".step-progress-btn").on("click", function() {
        if (!$(this).hasClass("active")) return false;
        var index = this.dataset['index'];
        selectedActive(index);
    })
});

function selectedActive(index) {
    /*$(".step-btn").attr("data-step",index);
    */
    $(".form-step").removeClass("active");
    $(".form-step").each(function(i) {
        if (i == (index - 1)) {
            $(this).addClass("active");
            $(this).css({ left: 0 });
        }
    })
}

function updateView(step, options = true) {
    document.body.scrollIntoView({ behavior: "auto", block: "start" })
    step = Number(step);
    var prevStep = step > 1 ? document.getElementById("step-" + (step - 1)) : null;
    var currentStep = document.getElementById("step-" + step);
    var nextStep = document.getElementById("step-" + (step + 1));

    if (step > 0) {
        $("#prev-step-btn").removeAttr("disabled");
    }

    if (options) {
        $(currentStep).animate({ left: "-100%" }, 320, function() {
            $(this).removeClass("active")
        })
        $(nextStep).addClass("active")
        $(nextStep).animate({ left: 0 }, 320, function() {
            $(this).addClass("active");
        });
        $(".step-btn").attr("data-step", (step + 1));

    } else {
        if (prevStep != null) {
            $(currentStep).animate({ left: "100%" }, 320, function() {
                $(this).removeClass("active")
            })
            $(prevStep).addClass("active")
            $(prevStep).animate({ left: 0 }, 320, function() {
                $(this).addClass("active");
            });
            $(".step-btn").attr("data-step", (step + 1));
            $(".step-btn").attr("data-step", (step - 1));

        }
    }
    updatePage(step, options);
    updateToolTip(options ? step + 1 : step - 1);
}
jQuery.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
};
function updatePage(index, opt = true) {
    var x = opt ? index : (index - 1);
    var progress = document.getElementById("p-" + x);

    if (opt) {
        $(progress).addClass("active");
        setTimeout(function() {
            $(progress).next().addClass("active");
        }, 500);
    } else {
        $(progress).removeClass("active");
        $(progress).next().removeClass("active");
    }
}
function addExp(index) {
    var expField = document.getElementById("exp-field");
    var x = document.createElement("div");
    $(x).addClass("input-group mb-2");
    x.innerHTML = `<textarea name="personalInfo.experiences[${index}]"
                        class="form-control search-inps emps state-management" data-state="exp"
                        placeholder="Experiences / Certifications"></textarea>
                      <div class="input-group-append"
                        style="cursor: pointer;" onclick="removeExp(this)">
                        <span class="input-group-text" id="basic-addon2"><i
                          class="fas fa-times"></i></span>
                      </div>`;
    expField.append(x);
}
function removeExp(selector) {
    $(selector).parent().remove();
    $(".emps").each(function(i) {
        this.name = `personalInfo.experiences[${i}]`;
    });
    $("#exp-res").html(refreshExp());
}
function updateToolTip(index) {
    var help = $(".help")[0];
    $(".help.plus").attr("disabled", "disabled");
    if (index == 4) {
        $(".help.plus").removeAttr("disabled");
    }
    switch (index) {
        case 1:
            $(help).attr("data-original-title", toolTipData().personalInfo);
            break;
        case 2:
            $(help).attr("data-original-title", toolTipData().seftIntroduction);
            break;
        case 3:
            $(help).attr("data-original-title", toolTipData().skill);
            break;
        case 4:
            $(help).attr("data-original-title", toolTipData().experience);
            break;
        default:
            $(help).attr("data-original-title", toolTipData().personalInfo);
    }
    $('[data-toggle="tooltip"]').tooltip();
}
function toolTipData() {
    const personalInfo = `<strong>Personal Information</strong><br>
                        <p class="text-left">Fill Your Information And Experiences</p>`;

    const seftIntroduction = `<strong>Self Introduction</strong><br>
                        <p class="text-left">Type the cleanest letter About yourself</p>`;

    const skill = `<strong>Skill</strong><br>
                        <p class="text-left">Choose your main skill and level.</p>`;

    const experience = `<strong>Experiences</strong><br>
                        <p class="text-left">Show your experience your past project.</p>`;

    return {
        personalInfo: personalInfo,
        seftIntroduction: seftIntroduction,
        skill: skill,
        experience: experience,
    }
}
function newExpData() {
    var x = document.getElementsByClassName("opc").length;
    return `<td class="edit text-center">${x + 1}<input name="expList[${x}].index" value="${x + 1}" hidden="hidden"/></td>
                      <td class="edit"><textarea name="expList[${x}].projectName" class="textarea state-management" data-state="exp_${x}_1"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].since" class="textarea state-management" data-state="exp_${x}_2"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].until" class="textarea state-management" data-state="exp_${x}_3"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].duration" class="textarea state-management" data-state="exp_${x}_4"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].pjScalePeople" class="textarea state-management" data-state="exp_${x}_5"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].os" class="textarea state-management" data-state="exp_${x}_6"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].mw" class="textarea state-management" data-state="exp_${x}_7"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].db" class="textarea state-management" data-state="exp_${x}_8"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].language" class="textarea state-management" data-state="exp_${x}_9"></textarea>
                      </td>
                      <td class="edit"><textarea name="expList[${x}].fw" class="textarea state-management" data-state="exp_${x}_10"></textarea>
                      </td>
                      <td class="edit vt-center ">
                        <div class="text-left"
                          style="white-space: normal;">
                          <div class="d-inline-block mr-2">
                            <div class="d-flex align-items-center">
                              <input name="expList[${x}].planning"  value="Planning" type="checkbox" id="f-1_${x}" class="mb-0 radio state-management"  data-state="exp_${x}_11"><label
                                for="f-1_${x}">Planing</label>
                            </div>
                          </div>
                          <div class="d-inline-block mr-2">
                            <div class="d-flex align-items-center">
                              <input name="expList[${x}].rd"  value="RD" type="checkbox" id="f-2_${x}" class="mb-0 radio state-management"  data-state="exp_${x}_12"><label
                                for="f-2_${x}">RD</label>
                            </div>
                          </div>
                          <div class="d-inline-block mr-2">
                            <div class="d-flex align-items-center">
                              <input name="expList[${x}].bd" value="BD" type="checkbox" id="f-3_${x}" class="mb-0 radio state-management"  data-state="exp_${x}_13"><label
                                for="f-3_${x}">BD</label>
                            </div>
                          </div>
                          <div class="d-inline-block mr-2">
                            <div class="d-flex align-items-center">
                              <input name="expList[${x}].ddfd" value="DD/FD" type="checkbox" id="f-4_${x}" class="mb-0 radio state-management"  data-state="exp_${x}_14"><label
                                for="f-4_${x}">DD/FD</label>
                            </div>
                          </div>
                          <div class="d-inline-block mr-2">
                            <div class="d-flex align-items-center">
                              <input name="expList[${x}].m" value="M" type="checkbox" id="f-5_${x}" class="mb-0 radio state-management"  data-state="exp_${x}_15"><label
                                for="f-5_${x}">M</label>
                            </div>
                          </div>
                          <div class="d-inline-block mr-2">
                            <div class="d-flex align-items-center">
                              <input name="expList[${x}].ut" value="UT" type="checkbox" id="f-6_${x}" class="mb-0 radio state-management"  data-state="exp_${x}_16"><label
                                for="f-6_${x}">UT</label>
                            </div>
                          </div>
                          <div class="d-inline-block mr-2">
                            <div class="d-flex align-items-center">
                              <input name="expList[${x}].it" value="IT" type="checkbox" id="f-7_${x}" class="mb-0 radio state-management"  data-state="exp_${x}_17"><label
                                for="f-7_${x}">IT</label>
                            </div>
                          </div>
                          <div class="d-inline-block mr-2">
                            <div class="d-flex align-items-center">
                              <input name="expList[${x}].operation" value="" type="checkbox" id="f-8_${x}" class="mb-0 radio state-management"  data-state="exp_${x}_18"><label
                                for="f-8_${x}">Operation</label>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="vt-center p-2"><select name="expList[${x}].positionId"
                        class="form-control position state-management"  data-state="exp_${x}_19">
                          <option value="0">Choose Position</option>
                          <option value="1">Project Leader</option>
                          <option value="2">Team Leader</option>
                          <option value="3">Sub Leader</option>
                          <option value="4">Member</option>
                      </select></td>
                      <td class="edit"><textarea name="expList[${x}].task" class="textarea state-management" data-state="exp_${x}_23"></textarea>
                      </td>`;
}

function addExpRes() {
    var x = document.getElementsByClassName("opc-res").length;
    return `
            <td class="edit text-center">${x + 1}</td>
                      <td class="edit"><p class="textarea" id="exp_${x}_1-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_2-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_3-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_4-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_5-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_6-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_7-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_8-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_9-res"></p>
                      </td>
                      <td class="edit"><p class="textarea" id="exp_${x}_10-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_11-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_12-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_13-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_14-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_15-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_16-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_17-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p id="exp_${x}_18-res"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p id="exp_${x}_19-res" class="exp_${x}_19-pos"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_20-res" class="exp_${x}_19-pos"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_21-res" class="exp_${x}_19-pos"></p>
                      </td>
                      <td class="verticalTableHeader edit vt-center ">
                        <p  id="exp_${x}_22-res" class="exp_${x}_19-pos"></p>
                      </td>
                      <td class="edit"><p class="textarea state-management" id="exp_${x}_23-res"></p>
                      </td>
    `;
}
/**
 * Manage all change from last page
 */
function stateManagement() {

    $(document).on("change", ".state-management", function() {
        var data = this.dataset['state'];

        var ref = document.getElementById(data + "-res");
        var value = this.value;
        if (data == "exp") {
            value = refreshExp();
        }
        if (data.includes('skill_')) {
            value = this.options[this.selectedIndex].label;
        }
        if ($(this).hasClass("radio")) {
            if ($(this).is(":checked"))
                value = $(this).next().text();
            else
                value = "";
        }
        if ($(this).hasClass("position")) {
            $('.' + data + '-pos').text("");
            var v = this.options[this.selectedIndex].value;
            if (v == 0) return false;
            value = this.options[this.selectedIndex].label;
            var f = data.substring(0, data.lastIndexOf("_") + 1);
            var d = data.substring(data.lastIndexOf("_") + 1);
            var refId = f + Number(Number(d) + (v - 1));
            console.log(refId)
            ref = document.getElementById(refId + "-res");
            console.log(ref)
        }
        ref.innerHTML = value;
    })

}
function refreshExp() {
    value = '';
    $('.emps').each(function() {
    	if(this.value!=null && this.value.trim().length > 0){
    		value += this.value + ", ";
    	}
    });
    value = value.substring(0, value.length - 2);
    return value;
}
