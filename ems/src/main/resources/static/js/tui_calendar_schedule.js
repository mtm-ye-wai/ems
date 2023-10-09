'use strict';

$(document).ready(function() {
    $("body").addClass("schedule-body");
});

const DATE_FORMAT_FOR_API = "DD/MM/YYYY hh:mm A";
const DATE_FORMAT_TUI_CALENDAR = "dd/MM/YYYY hh:mm A";
const DATE_FORMAT_MENU_DATE_RANGE = "DD/MM/YYYY";

var urlPrefix = location.origin.concat(contextPath);
var scheduleType = "MyCalendar";
var scheduleList = [];
var cal, resizeThrottled, equipmentSel, memberSel;
var employeeList = [];
var equipmentList = [];

$(document).ready(function () {

    $('html').addClass('hide-scrollbar');
    $('#calendar *').addClass('hide-scrollbar');

    $('#success-alert').hide();
    $('#error-alert').hide();
    equipmentSelectConfig();
    memberSelectConfig();

    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        yearRange: "1900:2050"
    });
    $('.datepicker').attr("autocomplete", "off");
});

/**
 * Binding data to equipment select box
 */
function equipmentSelectConfig() {
    equipmentSel = new Choices('#equipment', {
        removeItemButton: true,
    });

    _.forEach(equipments, (e) => {
        let choiceElement = {};
        choiceElement['value'] = e.equipmentId;
        choiceElement['label'] = e.equipmentName;
        equipmentList.push(choiceElement);
    });
}
function setEquipments() {
    equipmentSel.setChoices(equipmentList, 'value', 'label', false);
    $('#equipment').trigger('change');
}

/**
 * Binding data to member select box
 */
function memberSelectConfig() {
    memberSel = new Choices('#member', {
        removeItemButton: true,
    });

    _.forEach(employees, (e) => {
        let choiceElement = {};
        choiceElement['value'] = e.employeeId;
        choiceElement['label'] = e.employeeName;
        employeeList.push(choiceElement);
    });
}
function setMembers() {
    memberSel.setChoices(employeeList, 'value', 'label', false);
    $('#member').trigger('change');
}

/**
 * Configuration for tui calendar
 */
(function (window, Calendar) {

    cal = new Calendar('#calendar', {
        defaultView: 'week',
        taskView: false,
        scheduleView: ['time'],
        useCreationPopup: false,
        useDetailPopup: false,
        calendars: CalendarCategoryList,
        height: '300px',
        month: {
            narrowWeekend: true,
        },
        week: {
            narrowWeekend: true,
            hourStart: 7,
            hourEnd: 24,
        },
        template: {
            time: function (schedule) {
                return getTimeTemplate(schedule);
            }
        }
    });

    /**
     * Calendar event handlers
     */
    cal.on({
        'clickMore': function (e) {
        },
        'clickSchedule': function (e) {
            showDetailModal(e);
        },
        'clickDayname': function (date) {
        },
        'beforeCreateSchedule': function (e) {
            showCreateModal(e);
            e.guide.clearGuideElement();
        },
        'beforeUpdateSchedule': function (e) {
            if (e.schedule.raw.createdUserId === loginUserId || isAdmin) {
                var schedule = e.schedule;
                var changes = e.changes;

                if (changes && !changes.isAllDay && schedule.category === 'allday') {
                    changes.category = 'time';
                }

                if (!(new Date(schedule.end).getTime() < new Date().getTime())) {
                    schedule.start = (changes.start) ? changes.start : schedule.start;
                    schedule.end = changes.end;
                    updateScheduleByDrag(schedule);
                }
            }
        },
        'beforeDeleteSchedule': function (e) {
        },
        'afterRenderSchedule': function (e) {
        },
        'clickTimezonesCollapseBtn': function (timezonesCollapsed) {

            if (timezonesCollapsed) {
                cal.setTheme({
                    'week.daygridLeft.width': '77px',
                    'week.timegridLeft.width': '77px'
                });
            } else {
                cal.setTheme({
                    'week.daygridLeft.width': '60px',
                    'week.timegridLeft.width': '60px'
                });
            }

            return true;
        }
    });

    resizeThrottled = tui.util.throttle(function () {
        cal.render();
    }, 50);

    window.cal = cal;

    setEventListener();
    setDropdownCalendarType();
    setRenderRangeText();
    setSchedules();
})(window, tui.Calendar);

$('#category').on('change', function (e) {
    removeValidationError();
    if ($('#category').val() === '1') {
        $('#room, #equipment, #member').val('');
        $('#roomDiv, #equipmentDiv, #memberDiv').hide();
        $('#locationDiv').show();
    } else if ($('#category').val() === '2') {
        $('#location').val('');
        $('#roomDiv, #equipmentDiv, #memberDiv').show();
    }
});

$('#room').on('change', function (e) {
    if ($('#room').val() === "0") {
        $('#locationDiv').show();
    } else {
        $('#location').val('');
        $('#locationDiv').hide();
    }
});

$('#equipment').on('change', function () {
    let multiSel = $('#equipmentDiv .choices__input').attr("placeholder");
    let selVal = $(this).val();
    if (selVal && selVal.length > 0) {
        if (multiSel) {
            $('#equipmentDiv .choices__input').attr("placeholder", "");
        }
    } else {
        if (!multiSel) {
            $('#equipmentDiv .choices__input').attr("placeholder", "Choose Equipment");
        }
    }
});

$('#member').on('change', function () {
    let multiSel = $('#memberDiv .choices__input').attr("placeholder");
    let selVal = $(this).val();
    if (selVal && selVal.length > 0) {
        if (multiSel) {
            $('#memberDiv .choices__input').attr("placeholder", "");
        }
    } else {
        if (!multiSel) {
            $('#memberDiv .choices__input').attr("placeholder", "Choose Member");
        }
    }
});

$("#searchEmployee").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#employeeListTable #employeeList tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

/**
 * Event handler for today, prev and next button
 * 
 * @param {Event} e 
 */
function onClickNavi(e) {
    var action = getDataAction(e.target);

    switch (action) {
        case 'move-prev':
            cal.prev();
            break;
        case 'move-next':
            cal.next();
            break;
        case 'move-today':
            cal.today();
            break;
        default:
            return;
    }

    setRenderRangeText();
}

/**
 * Event Handler for calendar view type dropdowns
 * 
 * @param {Event} e 
 */
function onClickMenu(e) {
    var target = $(e.target).closest('a[role="menuitem"]')[0];
    var action = getDataAction(target);
    var options = cal.getOptions();
    var viewName = cal.getViewName();
    let isRefresh = false;

    switch (action) {
        case 'toggle-daily':
            viewName = 'day';
            break;
        case 'toggle-weekly':
            viewName = 'week';
            break;
        case 'toggle-monthly':
            options.month.visibleWeeksCount = 0;
            viewName = 'month';
            break;
        case 'toggle-my-calendar':
            isRefresh = true;
            scheduleType = "MyCalendar";
            document.getElementById('filterTypeName').innerHTML = 'My Calendar';
            break;
        case 'toggle-employee-schedule':
            isRefresh = true;
            scheduleType = "EmployeeSchedule";
            document.getElementById('filterTypeName').innerHTML = 'Employee Schedule';
            break;
        default:
            break;
    }

    cal.setOptions(options, true);
    cal.changeView(viewName, true);

    setDropdownCalendarType();
    setRenderRangeText();

    if (isRefresh) {
        setSchedules();
    }
}


function onChangeCalendars(e) {
    var calendarId = e.target.value;
    var checked = e.target.checked;
    var viewAll = document.querySelector('.lnb-calendars-item input');
    var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
    var allCheckedCalendars = true;

    if (calendarId === 'all') {
        allCheckedCalendars = checked;

        calendarElements.forEach(function (input) {
            var span = input.parentNode;
            input.checked = checked;
            span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
        });

        CalendarCategoryList.forEach(function (calendar) {
            calendar.checked = checked;
        });
    } else {
        findCalendarCategory(calendarId).checked = checked;

        allCheckedCalendars = calendarElements.every(function (input) {
            return input.checked;
        });

        if (allCheckedCalendars) {
            viewAll.checked = true;
        } else {
            viewAll.checked = false;
        }
    }
}

/**
 * Binding action events
 */
function setEventListener() {
    $('#menu-navi').on('click', onClickNavi);
    $('.dropdown-menu a[role="menuitem"]').on('click', onClickMenu);
    $('#lnb-calendars').on('change', onChangeCalendars);

    $('#btn-action-event').on('click', onSchedule);
    $('#btn-update-event').on('click', showUpdateModal);

    window.addEventListener('resize', resizeThrottled);
}

/**
 * Calendar view type configuration
 */
function setDropdownCalendarType() {
    var calendarTypeName = document.getElementById('calendarTypeName');
    var calendarTypeIcon = document.getElementById('calendarTypeIcon');
    var type = cal.getViewName();
    var iconClassName;

    if (type === 'day') {
        type = 'Daily';
        iconClassName = 'calendar-icon ic_view_day';
    } else if (type === 'week') {
        type = 'Weekly';
        iconClassName = 'calendar-icon ic_view_week';
    } else {
        type = 'Monthly';
        iconClassName = 'calendar-icon ic_view_month';
    }

    calendarTypeName.innerHTML = type;
    calendarTypeIcon.className = iconClassName;
    $('#calendar *').addClass('hide-scrollbar');
}

/**
 * date format config for header date range text
 */
function setRenderRangeText() {
    var renderRange = document.getElementById('renderRange');
    var options = cal.getOptions();
    var viewName = cal.getViewName();

    var html = [];
    if (viewName === 'day') {
        html.push(currentCalendarDate(DATE_FORMAT_MENU_DATE_RANGE));
    } else if (viewName === 'month' &&
        (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
        html.push(currentCalendarDate(DATE_FORMAT_MENU_DATE_RANGE));
    } else {
        html.push(moment(cal.getDateRangeStart().getTime()).format(DATE_FORMAT_MENU_DATE_RANGE));
        html.push(' ~ ');
        html.push(moment(cal.getDateRangeEnd().getTime()).format(DATE_FORMAT_MENU_DATE_RANGE));
    }
    renderRange.innerHTML = html.join('');
}

/**
 * to get data-action name from event
 * 
 * @param {Event} target 
 */
function getDataAction(target) {
    return target.dataset ? target.dataset.action : target.getAttribute('data-action');
}

/**
 * praparation for schedule item design
 * 
 * @param {JSON} schedule 
 * @returns 
 */
function getTimeTemplate(schedule) {
    var html = [];
    var start = moment(schedule.start.toUTCString());
    var viewType = cal.getViewName();

    if (viewType == 'month' && schedule.raw.isExpired) {
        html.push(start.format('hh:mm A') + '&nbsp;');
        html.push('<strike><strong>' + schedule.title + '</strong></strike>');
        if (schedule.isPrivate) {
            html.push('&nbsp;<span class="calendar-font-icon ic-lock-b"></span>');
        }
    } else if (viewType == 'month' && !schedule.raw.isExpired) {
        html.push(start.format('hh:mm A') + '&nbsp;');
        html.push('<strong>' + schedule.title + '</strong>');
    } else if (schedule.raw.isExpired) {
        html.push('<strike><strong>' + schedule.title + '</strong></strike>');
        if (schedule.isPrivate) {
            html.push('&nbsp;<span class="calendar-font-icon ic-lock-b"></span>');
        }

        if (schedule.raw.meetingRoomId && schedule.raw.meetingRoomName) {
            html.push('</br>' + schedule.raw.meetingRoomName);
        }

        html.push('</br>' + start.format('hh:mm A'));
        html.push('</br>' + schedule.raw.createdUserName);
    } else {
        html.push('<strong>' + schedule.title + '</strong>');
        if (schedule.isPrivate) {
            html.push('&nbsp;<span class="calendar-font-icon ic-lock-b"></span>');
        }

        if (schedule.raw.meetingRoomId  && schedule.raw.meetingRoomName) {
            html.push('</br>' + schedule.raw.meetingRoomName);
        }

        html.push('</br>' + schedule.raw.createdUserName);
        html.push('</br>' + start.format('hh:mm A'));
    }

    return html.join('');
}

/**
 * to get repeat type string
 * 
 * @param {Integer} id
 */
function getRepeatMsgById(id) {
    switch (id) {
        case 2:
            return "Daily";
        case 3:
            return "Weekly";
        case 4:
            return "Monthly";
        default:
            return "Doesn't Repeat";
    }
}

/**
 * To define date format
 * 
 * @param {String} format
 */
function currentCalendarDate(format) {
    var currentDate = moment([cal.getDate().getFullYear(), cal.getDate().getMonth(), cal.getDate().getDate()]);
    return currentDate.format(format);
}

/**
 * Bind start and end before display the modal pop up
 * 
 * @param {Date} start 
 * @param {Date} end 
 * @param {Boolean} isDefaultTime 
 */
function bindDateTimeRange(start, end, isDefaultTime) {

    let startTime = new Date(start);
    let endTime = new Date(end);
    let viewType = cal.getViewName();
    if (viewType === 'month' && isDefaultTime) {
        startTime.setHours(0, 0, 0, 0);
        endTime.setHours(0, 0, 0, 0);
    }

    new tui.DatePicker('#startTime-wrapper', {
        date: startTime,
        input: {
            element: '#startTime',
            format: DATE_FORMAT_TUI_CALENDAR
        },
        timePicker: {
            layoutType: 'tab',
            inputType: 'spinbox'
        },
        autoClose: false
    });

    new tui.DatePicker('#endTime-wrapper', {
        date: endTime,
        input: {
            element: '#endTime',
            format: DATE_FORMAT_TUI_CALENDAR
        },
        timePicker: {
            layoutType: 'tab',
            inputType: 'spinbox'
        },
        autoClose: false
    });
};

/**
 * to compare two date
 * 
 * @param {String} dateStr1 
 * @param {String} dateStr2 
 * @returns Integer
 */
function dateCompareWithoutTime(dateStr1, dateStr2) {
    let date1 = new Date(dateStr1);
    let date2 = new Date(dateStr2);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    if (date1.getTime() == date2.getTime()) {
        return 0;
    } else if (date1.getTime() > date2.getTime()) {
        return 1;
    } else {
        return -1;
    }
}

/**
 * to search calendar date
 * 
 * @param {String} date 
 */
function searchScheduleByDate(date) {
    let regEx = /^\d{2}\/\d{2}\/\d{4}$/;
    let searchDate = date ? date : $('#search-date').val();
    if (searchDate.match(regEx) != null) {
        cal.setDate(moment(searchDate, "DD/MM/yyyy").toDate());
        setRenderRangeText();
    }
}

/**
 * On schedule action event
 * save, update, etc...
 * 
 */
function onSchedule() {
    if (hasValidationError()) {
        return;
    }

    let actionName = $('#btn-action-event').attr('name');
    if (actionName === "save") {
        createSchedule();
    } else if (actionName === "update") {
        showUpdateConfirmModal();
    }
}

/**
 * to check validation for schedule
 * 
 * @returns Boolean
 */
function hasValidationError() {

    removeValidationError(true);

    let hasError = false;
    let title = $('#eventTitle').val();
    let description = $('#description').val();
    let calendarId = $('#category').val();
    let meetingRoom = $('#room').val();
    let startTime = new Date(moment($('#startTime').val()));
    let endTime = new Date(moment($('#endTime').val()));

    if (startTime != null && startTime != "" && endTime != null && endTime != "") {
        var startHour = startTime.getHours()
        var endHour = endTime.getHours();

        if (startHour < 8 || startHour > 23 || endHour < 8 || endHour > 23) {
            $('#err-common').html("Schedule time range must be <b>8 AM ~ 11 PM</b>.");
            $('#common-error-alert').show();
            hasError = true;
        } else {
            if (!$.trim(title)) {
                $('#err-title').text("Title is a required field");
                hasError = true;
            }

            if (calendarId == 2 && !$.trim(description) && !$.trim(meetingRoom)) {
                $('#err-meetingRoomId').text("Meeting Room is a required field");
                hasError = true;
            }

            if (startTime > endTime) {
                $('#err-startTime').text("Start Time must be less than End Time");
                hasError = true;
            } else if (startTime.getTime() == endTime.getTime()) {
                $('#err-endTime').text("End Time must be greater than Start Time");
                hasError = true;
            }
        }
    }

    return hasError;
}

/**
 * to remove all validation errors
 * 
 * @param {Boolean} checkAgain 
 */
function removeValidationError(checkAgain) {
    if (!checkAgain) {
        equipmentSel.clearInput();
        equipmentSel.clearStore();
        memberSel.clearInput();
        memberSel.clearStore();
        setEquipments();
        setMembers();
    }
    $('#common-error-alert').hide();
    $('#err-common, #err-scheduleCategoryId, #err-title, #err-meetingRoomId, #err-startTime, #err-endTime, #err-repeatType, #err-equipment, #err-member').text("");
}

/**
 * to prepare data for schedule create default modal
 * 
 * @param {Event} e 
 */
function defaultModal(e) {
    equipmentSel.clearStore();
    memberSel.clearStore();
    setEquipments();
    setMembers();
    removeValidationError();
    $('#category, #repeat').val('1');

    $('#room').val(0);
    $('#eventTitle, #description, #location, #equipment, #member').val('');
    $('#locationDiv').show();
    $('#roomDiv, #equipmentDiv, #memberDiv, #err-scheduleExist').hide();

    $('#isPrivate').prop('checked', false);
    bindDateTimeRange(e.start, e.end, true);
    $('#eventActionModal #btn-action-event').prop('name', 'save');
    $('#eventActionModal .modal-title').text('Create Schedule');
    $('#eventActionModal #btn-action-event').text('Save');
}

/**
 * to show schedule create default modal
 * 
 * @param {Event} e 
 */
function showCreateModal(e) {
    defaultModal(e);
    $('#eventActionModal').modal();
}

/**
 * to show schedule update modal
 * 
 * @param {Event} e 
 */
function showUpdateModal() {

    let scheduleId = $('#eventDetailModal #scheduleId').val();
    let calendarId = $('#eventDetailModal #calendarId').val();
    let schedule = findScheduleById(scheduleId);

    removeValidationError();
    $('#category').val(calendarId);
    $('#eventTitle').val(schedule.title);
    $('#description').val(schedule.raw.description);
    $('#location').val(schedule.raw.location);
    $('#room').val(schedule.raw.meetingRoomId);
    $('#equipment').val(schedule.raw.equipment);
    $('#member').val(schedule.raw.member);
    $('#repeat').val(schedule.raw.repeat);
    $('#isPrivate').prop('checked', schedule.isPrivate);
    bindDateTimeRange(schedule.start, schedule.end, false);

    _.forEach(schedule.raw.equipment, function (e) {
        equipmentSel.setChoiceByValue(e);
    });

    _.forEach(schedule.raw.member, function (m) {
        memberSel.setChoiceByValue(m);
    });

    if (calendarId == 1) {
        $('#roomDiv, #equipmentDiv, #memberDiv').hide();
    } else {
        $('#roomDiv, #equipmentDiv, #memberDiv').show();
    }

    $('#eventDetailModal').modal('hide');
    $('#eventActionModal #btn-action-event').prop('name', 'update');
    $('#eventActionModal .modal-title').text('Update Schedule');
    $('#eventActionModal #btn-action-event').text('Update');
    $('#equipment, #member').trigger('change');
    $('#eventActionModal').modal();
}

/**
 * to show schedule detail modal
 * 
 * @param {Event} e
 */
function showDetailModal(e) {

    if (e.schedule.isPrivate && e.schedule.raw.member.indexOf(loginUserId) < 0 && e.schedule.raw.createdUserId !== loginUserId && !isAdmin) {
        $('#privateDetailEventTitle').text(e.schedule.title);
        $('#privateDetailStart').text(moment(e.schedule.start._date).format(DATE_FORMAT_FOR_API));
        $('#privateDetailEnd').text(moment(e.schedule.start._date).format(DATE_FORMAT_FOR_API));
        $('#privateEventDetailModal').modal();
        return;
    }

    $('#eventDetailModal #scheduleId').val(e.schedule.id);
    $('#eventDetailModal #calendarId').val(e.schedule.calendarId);
    $('#detailEventTitle').text(e.schedule.title);
    $('#detailStart').text(moment(e.schedule.start._date).format(DATE_FORMAT_FOR_API));
    $('#detailEnd').text(moment(e.schedule.end._date).format(DATE_FORMAT_FOR_API));
    $('#detailRepeat').text(getRepeatMsgById(e.schedule.raw.repeat));

    $('#detailEquipment').text(e.schedule.raw.equipment);
    $('#detailMember').text(e.schedule.raw.member);

    let description = e.schedule.raw.description;
    if (description) {
        $('#detailDescription').text(description);
        $('#detailDescriptionDiv').show();
    } else {
        $('#detailDescriptionDiv').hide();
    }

    let location = e.schedule.raw.location;
    if (location) {
        $('#detailLocation').text(location);
        $('#detailLocationDiv').show();
    } else {
        $('#detailLocationDiv').hide();
    }

    if (e.schedule.calendarId == 1) {
        $('#detailRoomDiv, #detailEquipmentDiv, #detailMemberDiv').hide();
    } else {

        let equipmentArr = e.schedule.raw.equipment;
        let memberArr = e.schedule.raw.member;

        if (e.schedule.raw.meetingRoomId && e.schedule.raw.meetingRoomName) {
            $('#detailRoom').text(e.schedule.raw.meetingRoomName);
            $('#detailRoomDiv').show();
        } else {
            $('#detailRoomDiv').hide();
        }

        if (equipmentArr.length) {
            let equipments = new String();
            equipmentArr.forEach(id => {
                let equipment = findEquipmentById(id);
                if(equipment) {
                    equipments = equipments.concat(equipment.equipmentName) + ', ';
                }
            });

            if (equipments !== undefined && equipments.length != 0) {
                equipments = equipments.substring(0, equipments.length - 2);
                $('#detailEquipment').text(equipments);
                $('#detailEquipmentDiv').show();
            } else {
                $('#detailEquipmentDiv').hide();
            }
        } else {
            $('#detailEquipmentDiv').hide();
        }

        if (memberArr.length) {
            let members = new String();
            memberArr.forEach(id => {
                let employee = findEmployeeById(id);
                members = members.concat(employee.employeeName) + ',<br> ';
            });

            if (members) {
                members = members.substring(0, members.length - 6);
                $('#detailMember').html(members);
                $('#detailMemberDiv').show();
            }
        } else {
            $('#detailMemberDiv').hide();
        }
    }

    if (e.schedule.raw.createdUserId !== loginUserId && !isAdmin) {
        $('#privateDetail').show();
        $('#expired').hide();
        $('#notExpired').hide();
    } else if (e.schedule.raw.isExpired) {
        $('#expired').show();
        $('#notExpired').hide();
        $('#privateDetail').hide();
    } else {
        $('#notExpired').show();
        $('#expired').hide();
        $('#privateDetail').hide();
    }
    $('#eventDetailModal').modal();
}

/**
 * to show update confirm modal
 */
function showUpdateConfirmModal() {
    $('#confirm-update').modal();
    $('#eventActionModal').modal('hide');
}

/**
 * to show delete confirm modal
 */
function showDeleteConfirmModal() {
    $('#confirm-delete').modal();
    $('#eventDetailModal').modal('hide');
}

/**
 * to find meeting data by meetingRoomId
 * 
 * @param {Integer} id 
 * @returns jsonObject
 */
function findMeetingRoomById(id) {
    let meetingRoom = meetingRooms.filter(m => m.meetingRoomId == id);
    return meetingRoom[0];
}

/**
 * to find equipment data by EquipmentId
 * 
 * @param {Integer} id 
 * @returns jsonObject
 */
function findEquipmentById(id) {
    let equipment = equipments.filter(e => e.equipmentId == id);
    return equipment[0];
}

/**
 * to find employee data by EmoloyeeId
 * 
 * @param {Integer} id 
 * @returns jsonObject
 */
function findEmployeeById(id) {
    let employee = employees.filter(e => e.employeeId == id);
    return employee[0];
}

/**
 * to find scheduel data by ScheduleId
 * 
 * @param {Integer} id 
 * @returns jsonObject
 */
function findScheduleById(id) {
    let schedule = scheduleList.filter(s => s.id == parseInt(id));
    return schedule[0];
}

/**
 * To bind API's response errors
 * 
 * @param {Map} errors 
 */
function bindErrors(errors) {
    removeValidationError(true);
    let keys = Object.keys(errors);
    _.forEach(keys, k => {
        $('#err-'.concat(k)).html(errors[k]);
    });

    if ($('#err-common').text()) {
        $('#common-error-alert').show();
        $("#common-error-alert").delay(5000).addClass("in").fadeOut(3000);
    } else {
        $('#common-error-alert').hide();
    }
}

/**
 * To convert API's ScheduleJSONObj to CalendarScheduleObj
 * 
 * @param {JSON} scheduleJSON
 * @returns scheduleObj
 */
function convertToCalendarScheduleObj(scheduleJSON) {
    let category = findCalendarCategory(scheduleJSON.scheduleCategoryId);
    let scheduleObj = {
        id: scheduleJSON.scheduleId,
        calendarId: scheduleJSON.scheduleCategoryId,
        title: scheduleJSON.title,
        start: new Date(moment(scheduleJSON.startTime).utc()),
        end: new Date(moment(scheduleJSON.endTime).utc()),
        raw: {
            description: scheduleJSON.description,
            location: scheduleJSON.location,
            meetingRoomId: scheduleJSON.meetingRoomId,
            meetingRoomName: scheduleJSON.meetingRoomName,
            equipment: scheduleJSON.equipmentIdList,
            member: scheduleJSON.memberIdList,
            repeat: scheduleJSON.repeatType,
            parentId: scheduleJSON.parentId,
            isExpired: scheduleJSON.isExpired,
            createdUserId: scheduleJSON.createdUserId,
            createdUserName: scheduleJSON.createdUserName
        },
        isAllDay: false,
        isPrivate: scheduleJSON.isPrivate,
        color: category.color,
        bgColor: category.bgColor,
        dragBgColor: category.bgColor,
        borderColor: category.borderColor,
        category: 'time',
        dueDateClass: '',
        state: 'Busy'
    };

    return scheduleObj;
}

/**
 * To prepare data for new schedule
 */
function createSchedule() {

    let isPrivate = $('#isPrivate:checkbox:checked').length ? true : false;

    let schedule = {
        scheduleCategoryId: $('#category').val(),
        title: $('#eventTitle').val(),
        description: $('#description').val(),
        startTime: moment($('#startTime').val(), DATE_FORMAT_FOR_API).toDate(),
        endTime: moment($('#endTime').val(), DATE_FORMAT_FOR_API).toDate(),
        location: $('#location').val(),
        meetingRoomId: $('#room').val(),
        equipments: $('#equipment').val(),
        members: $('#member').val(),
        repeatType: $('#repeat').val(),
        parentId: 0,
        isPrivate: isPrivate
    };

    addScheduleAPI(schedule);
}

/**
 * To prepare schedule data for schedule update
 */
function updateSchedule() {

    let scheduleId = $('#eventDetailModal #scheduleId').val();
    let isPrivate = $('#isPrivate:checkbox:checked').length ? true : false;
    let oldSchedule = findScheduleById(scheduleId);

    let schedule = {
        scheduleId: scheduleId,
        scheduleCategoryId: $('#category').val(),
        title: $('#eventTitle').val(),
        description: $('#description').val(),
        startTime: moment($('#startTime').val(), DATE_FORMAT_FOR_API).toDate(),
        endTime: moment($('#endTime').val(), DATE_FORMAT_FOR_API).toDate(),
        location: $('#location').val(),
        meetingRoomId: $('#room').val(),
        equipments: $('#equipment').val(),
        members: $('#member').val(),
        repeatType: $('#repeat').val(),
        parentId: oldSchedule.raw.parentId,
        isPrivate: isPrivate
    };

    updateScheduleAPI(schedule, false);
}

/**
 * To prepare schedule data for drag and drop
 */
function updateScheduleByDrag(schedule) {

    let oldSchedule = findScheduleById(schedule.id);
    let updateSchedule = {
        scheduleId: schedule.id,
        scheduleCategoryId: schedule.calendarId,
        title: schedule.title,
        description: schedule.raw.description,
        startTime: schedule.start._date,
        endTime: schedule.end._date,
        location: schedule.raw.location,
        meetingRoomId: schedule.raw.meetingRoomId,
        equipments: schedule.raw.equipment,
        members: schedule.raw.member,
        repeatType: schedule.raw.repeat,
        parentId: oldSchedule.raw.parentId,
        isPrivate: schedule.isPrivate
    };

    updateScheduleAPI(updateSchedule, true);
}

/**
 * To delete schedule data
 */
function deleteSchedule() {
    let scheduleId = $('#eventDetailModal #scheduleId').val();
    deleteScheduleAPI(scheduleId);
}

/* API calls */
/**
 * Get my schedule list and set to calendar
 */
function setSchedules() {
    if (scheduleType === 'MyCalendar') {
        setMyClaendarSchedules();
    } else {
        setEmployeeSchedules();
    }
}

/**
 * get MyCalendar type schedules and set to calendar
 * 
 */
function setMyClaendarSchedules() {
    $.ajax({
        url: urlPrefix.concat('/getMyCalendarSchedules'),
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        success: function (data, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            scheduleList = [];
            _.forEach(JSON.parse(data), function (s) {
                scheduleList.push(convertToCalendarScheduleObj(s));
            });

            cal.clear();
            cal.createSchedules(scheduleList);
        },
        error: function (error, status, xhr) {
            console.log("Request: " + error.responseText);
        }
    });
}

/**
 * get EmployeeSchedule type schedules and set to calendar
 * 
 */
function setEmployeeSchedules() {
    $.ajax({
        url: urlPrefix.concat('/getEmployeeSchedules'),
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        success: function (data, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            scheduleList = [];
            _.forEach(JSON.parse(data), function (s) {
                scheduleList.push(convertToCalendarScheduleObj(s));
            });

            cal.clear();
            cal.createSchedules(scheduleList);
        },
        error: function (error, status, xhr) {
            console.log("Request: " + error.responseText);
        }
    });
}

/**
 * add new schedule
 * 
 * @param {JSON} schedule
 */
function addScheduleAPI(schedule) {
    $.ajax({
        url: urlPrefix.concat('/addSchedule'),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(schedule),
        success: function (data, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            setSchedules();
            $('#eventActionModal').modal('hide');
            $('#success-alert-msg').html(data);
            $('#success-alert').show();
            $("#success-alert").delay(3000).addClass("in").fadeOut(2000);
        },
        error: function (error, status, xhr) {
            bindErrors(error.responseJSON);
            $('#eventActionModal').scrollTop(0);
        }
    });
}

/**
 * update the schedule
 * 
 * @param {JSON} schedule 
 * @param {Boolean} isDragAndDrop 
 */
function updateScheduleAPI(schedule, isDragAndDrop) {
    $.ajax({
        url: urlPrefix.concat('/updateSchedule'),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(schedule),
        success: function (data, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            setSchedules();
            $('#confirm-update').modal('hide');
            $('#success-alert-msg').html(data);
            $('#success-alert').show();
            $("#success-alert").delay(3000).addClass("in").fadeOut(2000);
        },
        error: function (error, status, xhr) {
            setSchedules();

            if (isDragAndDrop) {
                if (error.responseJSON['common']) {
                    $('#error-alert-msg').text('');
                    $('#error-alert-msg').html(error.responseJSON['common']);
                    $('#error-alert').show();
                    $("#error-alert").delay(3000).addClass("in").fadeOut(2000);
                }
            } else {
                bindErrors(error.responseJSON);
                $('#eventActionModal').scrollTop(0);
                $('#confirm-update').modal('hide');
                $('#eventActionModal').modal('show');
            }

        }
    });
}

/**
 * delete the schedule
 * 
 * @param {Integer} scheduleId 
 */
function deleteScheduleAPI(scheduleId) {
    $.ajax({
        url: urlPrefix.concat('/deleteSchedule'),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        data: scheduleId,
        success: function (data, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            setSchedules();
            $('#confirm-delete').modal('hide');
            $('#success-alert-msg').text(data);
            $('#success-alert').show();
            $("#success-alert").delay(3000).addClass("in").fadeOut(2000);
        },
        error: function (error, status, xhr) {
            console.log("Request: " + error.responseText);
        }
    });
}

/**
 * get schedules by employee id and set to calendar
 * 
 * @param {Integer} id 
 */
function searchEmployeeSchedule(id) {

    $.ajax({
        url: urlPrefix.concat('/searchSchedules?employeeId=') + id,
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        success: function (data, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            scheduleList = [];
            _.forEach(JSON.parse(data), function (s) {
                scheduleList.push(convertToCalendarScheduleObj(s));
            });
            cal.clear();
            cal.createSchedules(scheduleList);

            let employeeName = findEmployeeById(id).employeeName;
            let scheduleCount = scheduleList.length;
            if (scheduleCount === 0) {
                $('#error-alert-msg').text(`${employeeName} has no schedule!`);
                $('#error-alert').show();
                $("#error-alert").delay(3000).addClass("in").fadeOut(2000);
            } else {
                let scheduleTxt = scheduleCount == 1 ? "schedule" : "schedules";
                $('#success-alert-msg').text(`${employeeName} has ${scheduleCount} ${scheduleTxt}.`);
                $('#success-alert').show();
                $("#success-alert").delay(3000).addClass("in").fadeOut(2000);
            }
        },
        error: function (error, status, xhr) {
            console.log("Request: " + error.responseText);
        }
    });
}