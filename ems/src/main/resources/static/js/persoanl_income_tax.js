function addNew() {
	const para = document.createElement("div");
	var countId = document.getElementsByClassName("number").length + 1;
	para.id = "record" + countId;
	$(para).addClass("number col-md-6")
	para.innerHTML = `<i class="fas fa-minus-circle minus" onclick="removeThis(this)"></i>
        <fieldset class="scheduler-border">
          <legend class="scheduler-border">Record ${countId}</legend>
          <div class="row form-group">
            <div class="col-12 col-md-4 align-self-center">
              <form:label path="from[${countId - 1}]" class="required">
                From
              </form:label>
            </div>
            <div class="col-12 col-md-8 mb-1">
              <input type="text" class="form-control from" name="from[${countId - 1}]" />
            </div>
            <div class="col-12 col-md-4 align-self-center">
              <form:label path="to[${countId - 1}]" class="required">
                To
              </form:label>
            </div>
            <div class="col-12 col-md-8 mb-1">
              <input type="text" class="form-control to" name="to[${countId - 1}]" />
            </div>
            <div class="col-12 col-md-4 align-self-center">
              <form:label path="rate[${countId - 1}]" class="required">
                Rate
              </form:label>
            </div>
            <div class="col-12 col-md-8 mb-1">
              <input type="text" class="form-control rate" name="rate[${countId - 1}]" />
            </div>
          </div>
        </fieldset>`;
	const element = document.getElementById("record");
	element.appendChild(para);
}

function removeThis(selector) {
	$(selector).parent().remove();
	$('.number').each(function(i) {
		$(this).find("legend")[0].innerText = "Record " + (i + 1);
	});
	$('.from').each(function(i) {
		var n = this.name.slice(0, this.name.indexOf("["));
		this.name = n + "[" + i + "]";
	});
	$('.to').each(function(i) {
		var n = this.name.slice(0, this.name.indexOf("["));
		this.name = n + "[" + i + "]";
	});
	$('.rate').each(function(i) {
		var n = this.name.slice(0, this.name.indexOf("["));
		this.name = n + "[" + i + "]";
	});
}

$(document)
	.ready(
		function() {
			$('#datatable')
				.DataTable(
					{
						"language": {
							"paginate": {
								"previous": "<<",
								"next": ">>"
							}
						},
						dom: "<'row'<'col-sm-6 d-flex'l><'col-sm-6 d-flex justify-content-end'f>>"
							+ "<'row'<'col-md-12'<'table-responsive'tr>>>"
							+ "<'row'<'col-sm-5'i>>"
							+ "<'row'<'col-sm-12'p>>",
						"order": [[0, 'asc']]
					});
		});