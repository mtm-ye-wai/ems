var ical;
/*
 Create the Calendar.
 */
function drawCalendar() {
    ical = new Web2Cal('calendarContainer', {
        loadEvents: loadCalendarEvents,
        onPreview: onPreview,
        onNewEvent: onNewEvent,
        views: "day, month, week"
    });
    ical.build();
}
function loadCalendarEvents() {
    $.ajax({
        type: 'GET',
        url: 'showEvent',
        success: function (response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            var d = new Array();
            var events = new Array();
            results.forEach(function (result) {
                events.push(createEvent(result.eventName, result.scheduleId, (new Date(result.startTime)), (new Date(result.endTime)), result.description));
            });
            console.log(events)
            var group = {
                name: "Category 2",
                groupId: "200",
                events: events
            };
            d.push(group);
            ical.render(d);
        },
        error: function (ex) {
            console.log("error");
        }
    })

}
var activeEvent;
function onPreview(evt, dataObj, html) {
    activeEvent = dataObj;
    ical.showPreview(evt, html);
}
/*
 Method invoked when event is moved or resized
 @param event object containing eventID and newly updated Times
 */
function updateEvent(event) {
    ical.updateEvent(event);
}

/*
 Method invoked when creating a new event, before showing the new event form.
 @param obj - Object containing (startTime, endTime)
 @param groups - List of Group objects ({groupId, name})
 @param allday - boolean to indicate if the event created is allday event.
 */
function onNewEvent(obj, groups, allday) {
    Web2Cal.defaultPlugins.onNewEvent(obj, groups, allday);
}

/*
 Click on Edit Button in preview window
 */
function rzEditEvent(evId, winEvent) {
    var evObj = ical.getEventById(evId);
    console.log(JSON.stringify(evObj))
    jQuery("#defaultNewEventTemplate").find("#eventName").val(
        evObj.eventName).end().find("#description").val(
            evObj.description).end()
        .find("#eventGroup").val(evObj.groupId)
        .end().find("#eventStartTime").val(
            evObj._startTime.toNiceTime()).end().find(
                "#eventEndTime").val(evObj._endTime.toNiceTime()).end()
        .find("#eventStartDate").val(
            evObj._startTime.toStandardFormat()).end().find(
                "#eventEndDate").val(evObj._endTime.toStandardFormat())
        .end().find("#addEventBtn").hide().end()
        .find("#updateEventBtn").show().end()
        .find("#addTitle").hide().end()
        .find("#updateTitle").show().end();

    ical.showEditEventTemplate(jQuery("#defaultNewEventTemplate"),
        evObj.eventId, winEvent);
    ical.hidePreview();
}
function rzUpdateEvent() {
    var updEv = Web2Cal.defaultPlugins.getNewEventObject();
    updEv['eventId'] = activeEvent.eventId;
    jQuery("#defaultNewEventTemplate").hide();
    updateEvent(updEv);
}

function updateEvent(updateEventObj) {
    console.log(updateEventObj);
    var obj = {
        'eventName': updateEventObj.eventName,
        'scheduleId': updateEventObj.eventId,
        'startTime': updateEventObj.startTime,
        'endTime': updateEventObj.endTime,
        'description': updateEventObj.description
    }
    $.ajax({
        type: 'POST',
        url: 'updateEvent',
        data: obj,
        success: function (response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";
            if (ct.indexOf('html') > -1) {
                window.location.reload();
                return;
            }
            if (results === "") {
                ical.updateEvent(updateEventObj);
            }

            var html = '<div class="alert alert-warning alert-dismissible py-0 mb-0" id="myAlert"> '
                + '<a href="#" class="close px-3 py-0" data-dismiss="alert" aria-label="close">&times;</a> <strong id="error-msg"></strong>'
                + '</div> ';
            $('#err-msg').append(html);
            $('#error-msg').append(results);
            $(".alert").delay(3000).addClass("in").fadeOut(2000);
        },
        error: function (ex) {
            console.log(ex);
        }
    })
}
/**
 Clicking delete in Preview window
 */
function rzDeleteEvent() {
    //alert("Delete Event in DB and invoke ical.deleteEvent({eventId: id})");
    ical.deleteEvent({
        eventId: activeEvent.eventId
    });
    ical.hidePreview();
}

/**
 * Click of Add in add event box.
 */
function rzAddEvent() {
    var newev = Web2Cal.defaultPlugins.getNewEventObject();
    addEvent(newev);

}
function addEvent(newev) {
    $.ajax({
        type: 'POST',
        url: 'createEvent',
        data: newev,
        success: function (results) {
            console.log(results)
            newev.eventId = results
            ical.addEvent(newev);
        },
        error: function (ex) {
            console.log("error");
        }
    })
}

/**
 * Onclick of Close in AddEvent Box.
 */
function rzCloseAddEvent() {
    ical.closeAddEvent();
    ical.hidePreview();
}

/**
 * Once page is loaded, invoke the Load Calendar Script.
 */
jQuery(document).ready(
    function () {
        drawCalendar();

        new Web2Cal.TimeControl(jQuery("#eventStartTime").get(0));
        new Web2Cal.TimeControl(jQuery("#eventEndTime").get(0), jQuery(
            "#eventStartTime").get(0), {
            onTimeSelect: updateDateForTime,
            dateField: "eventEndDate"
        });
    });

function createEvent(name, id, timestart, timeend, desc) {
    return {
        name: name,
        eventId: id,
        startTime: timestart,
        endTime: timeend,
        description: desc
    };
}