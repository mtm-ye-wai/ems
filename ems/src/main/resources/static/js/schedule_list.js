var urlPrefix = location.origin.concat(contextPath);

$(".alert").delay(3000).addClass("in").fadeOut(2000);

var t = $('#datatable')
  .DataTable(
    {
      "columnDefs": [{
        "targets": 0,
        "width": "40px",
      }, {
        "targets": 3,
        "width": "90px",
      }, {
        "targets": 5,
        "width": "85px",
      }, {
        "targets": 6,
        "width": "135px",
      }, {
        "targets": 7,
        "width": "135px",
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
      "order": [[0, 'asc']],
      "autoWidth": false
    });

var paginate_buttons = $('#datatable_wrapper').find(".paginate_button");
if (paginate_buttons.length > 2) {
  $('#datatable_paginate').show();
} else {
  $('#datatable_paginate').hide();
}

function showMemberList(scheduleId) {
  $.ajax({
    url: urlPrefix.concat('/getScheduleById?scheduleId=' + scheduleId),
    type: 'GET',
    contentType: "application/json;charset=utf-8",
    success: function (data, status, xhr) {
	  var ct = xhr.getResponseHeader("content-type") || "";
        if (ct.indexOf('html') > -1) {
            window.location.reload();
            return;
        }
      if (data) {
        var employeeInfoUrl = (userRole === '1' || userRole === '2') ? 'employeeDetail' : 'employeeInformation';
        $('#memberListTable tbody').empty();
        let memberList = JSON.parse(data).memberList;
        memberList.forEach(m => {
		  let name;
		  if(m.type === 1) {
			name = m.employeeName;
		  } else {
			name = `<a href="${urlPrefix}/${employeeInfoUrl}?employeeId=${m.employeeId}" target="_blank">${m.employeeName}</a>`;
		  }
          $('#memberListTable tbody').append(`
          <tr>
            <td>${name}</td>
            <td>${m.email ? m.email : ''}</td>
          </tr>
          `);
        });
        $('#memberListModal').modal('show');
      }
    },
    error: function (error, status, xhr) {
      console.log("Request: " + error.responseText);
    }
  });
}