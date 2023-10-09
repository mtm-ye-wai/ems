$(document).ready(function() {
	$('.no-sort').removeClass("sorting_asc");
});

if ($('#jsp').val() == "wfh") {
	if ($('#sortDate').attr('class').search("sortUp") >= 0) {
		$('#sortDate').addClass("sortActive");
	}
	if ($('#sortDate').attr('class').search("sortDown") >= 0) {
		$('#sortDate').addClass("sortActive");
	}

	function toggleSortDate() {
		$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form" + id);
		if ($('#sortDate').attr('class').search("sortUp") >= 0) {
			$('#sortDate').removeClass("sortUp");
			$('#sortDate').addClass("sortDown");
			$('#sort').val("dateSortDown");
		} else if ($('#sortDate').attr('class').search("sortDown") >= 0) {
			$('#sortDate').removeClass("sortDown");
			$('#sortDate').addClass("sortUp");
			$('#sort').val("dateSortUp");
		}
		$('#limit').val(10);
		$('#page').val(1);
		$('form' + id).submit();
	}
} else if ($('#jsp').val() == "overtime" || $('#jsp').val() == "leave") {
	if ($('#sortDate').attr('class').search("sortUp") >= 0) {
		$('#sortDate').addClass("sortActive");
	}
	if ($('#sortDate').attr('class').search("sortDown") >= 0) {
		$('#sortDate').addClass("sortActive");
	}
	if ($('#sortName').attr('class').search("sortUp") >= 0) {
		$('#sortName').addClass("sortActive");
	}
	if ($('#sortName').attr('class').search("sortDown") >= 0) {
		$('#sortName').addClass("sortActive");
	}

	function toggleSortName() {
		$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form" + id);
		if ($('#sortDate').attr('class').search("sortUp") >= 0) {
			$('#sortDate').removeClass("sortUp");
			$('#sortDate').addClass("sortDef");
		} else if ($('#sortDate').attr('class').search("sortDown") >= 0) {
			$('#sortDate').removeClass("sortDown");
			$('#sortDate').addClass("sortDef");
		}
		if ($('#sortName').attr('class').search("sortUp") >= 0) {
			$('#sortName').removeClass("sortUp");
			$('#sortName').addClass("sortDown");
			$('#sort').val("nameSortDown");
		} else if ($('#sortName').attr('class').search("sortDown") >= 0) {
			$('#sortName').removeClass("sortDown");
			$('#sortName').addClass("sortUp");
			$('#sort').val("nameSortUp");
		} else if ($('#sortName').attr('class').search("sortDef") >= 0) {
			$('#sortName').removeClass("sortDef");
			$('#sortName').addClass("sortUp");
			$('#sort').val("nameSortUp");
		}
		$('#limit').val(10);
		$('#page').val(1);
		$('form' + id).submit();
	}

	function toggleSortDate() {
		$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form" + id);
		if ($('#sortName').attr('class').search("sortUp") >= 0) {
			$('#sortName').removeClass("sortUp");
			$('#sortName').addClass("sortDef");
		} else if ($('#sortName').attr('class').search("sortDown") >= 0) {
			$('#sortName').removeClass("sortDown");
			$('#sortName').addClass("sortDef");
		}
		if ($('#sortDate').attr('class').search("sortUp") >= 0) {
			$('#sortDate').removeClass("sortUp");
			$('#sortDate').addClass("sortDown");
			$('#sort').val("dateSortDown");
		} else if ($('#sortDate').attr('class').search("sortDown") >= 0) {
			$('#sortDate').removeClass("sortDown");
			$('#sortDate').addClass("sortUp");
			$('#sort').val("dateSortUp");
		} else if ($('#sortDate').attr('class').search("sortDef") >= 0) {
			$('#sortDate').removeClass("sortDef");
			$('#sortDate').addClass("sortUp");
			$('#sort').val("dateSortUp");
		}
		$('#limit').val(10);
		$('#page').val(1);
		$('form' + id).submit();
	}
} else if ($('#jsp').val() == "attendance") {
	if ($('#sortName').attr('class').search("sortUp") >= 0) {
		$('#sortName').addClass("sortActive");
	}
	if ($('#sortName').attr('class').search("sortDown") >= 0) {
		$('#sortName').addClass("sortActive");
	}
	if ($('#sortId').attr('class').search("sortUp") >= 0) {
		$('#sortId').addClass("sortActive");
	}
	if ($('#sortId').attr('class').search("sortDown") >= 0) {
		$('#sortId').addClass("sortActive");
	}

	function toggleSortID() {
		$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form#movePage");
		if ($('#sortName').attr('class').search("sortUp") >= 0) {
			$('#sortName').removeClass("sortUp");
			$('#sortName').addClass("sortDef");
		} else if ($('#sortName').attr('class').search("sortDown") >= 0) {
			$('#sortName').removeClass("sortDown");
			$('#sortName').addClass("sortDef");
		}
		if ($('#sortId').attr('class').search("sortUp") >= 0) {
			$('#sortId').removeClass("sortUp");
			$('#sortId').addClass("sortDown");
			$('#sort').val("idSortDown");
		} else if ($('#sortId').attr('class').search("sortDown") >= 0) {
			$('#sortId').removeClass("sortDown");
			$('#sortId').addClass("sortUp");
			$('#sort').val("idSortUp");
		} else if ($('#sortId').attr('class').search("sortDef") >= 0) {
			$('#sortId').removeClass("sortDef");
			$('#sortId').addClass("sortUp");
			$('#sort').val("idSortUp");
		}
		$('#limit').val(10);
		$('#page').val(1);
		$('form#movePage').submit();
	}

	function toggleSortName() {
		$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form#movePage");
		if ($('#sortId').attr('class').search("sortUp") >= 0) {
			$('#sortId').removeClass("sortUp");
			$('#sortId').addClass("sortDef");
		} else if ($('#sortId').attr('class').search("sortDown") >= 0) {
			$('#sortId').removeClass("sortDown");
			$('#sortId').addClass("sortDef");
		}
		if ($('#sortName').attr('class').search("sortUp") >= 0) {
			$('#sortName').removeClass("sortUp");
			$('#sortName').addClass("sortDown");
			$('#sort').val("nameSortDown");
		} else if ($('#sortName').attr('class').search("sortDown") >= 0) {
			$('#sortName').removeClass("sortDown");
			$('#sortName').addClass("sortUp");
			$('#sort').val("nameSortUp");
		} else if ($('#sortName').attr('class').search("sortDef") >= 0) {
			$('#sortName').removeClass("sortDef");
			$('#sortName').addClass("sortUp");
			$('#sort').val("nameSortUp");
		}
		$('#limit').val(10);
		$('#page').val(1);
		$('form#movePage').submit();
	}
} else if ($('#jsp').val() == "leaveBalance") {
	if ($('#sortId').attr('class').search("sortUp") >= 0) {
		$('#sortId').addClass("sortActive");
	}
	if ($('#sortId').attr('class').search("sortDown") >= 0) {
		$('#sortId').addClass("sortActive");
	}

	function toggleSortId() {
		$("<input/>").attr("name", "search").attr("hidden", "hidden").appendTo("form" + id);
		if ($('#sortId').attr('class').search("sortUp") >= 0) {
			$('#sortId').removeClass("sortUp");
			$('#sortId').addClass("sortDown");
			$('#sort').val("idSortDown");
		} else if ($('#sortId').attr('class').search("sortDown") >= 0) {
			$('#sortId').removeClass("sortDown");
			$('#sortId').addClass("sortUp");
			$('#sort').val("idSortUp");
		}
		$('#limit').val(10);
		$('#page').val(1);
		$('form' + id).submit();
	}
}