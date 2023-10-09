/**
 * 
 */
$(function() {
	if (typeof paginationJSON != 'undefined' && paginationJSON != null) {
		var pagination = new Pagination(paginationJSON);
		var paginate = pagination.init();
		$(paginate).insertAfter('table');
	}
})
/**
 *Short function of document.createElement(tagName)
 *@param {String} tag
 */
function _create(tag) {
	return document.createElement(tag);
}
/**
 *Short function of document.createElement(tagName)
 *@param {String} id
 */
function _id(id) {
	return document.getElementById(id);
}
/**
 *Short function of document.getElementsByClassName(tagName)
 *@param {String} cls
 */
function _class(cls) {
	return document.getElementsByClassName(cls);
}
/**
 *Short function of document.querySelectorAll(tagName)
 *@param {String} selector
 */
function _$(selector) {
	return document.querySelectorAll(selector);
}

/**
 *Pagination
 *@param {JSON} data
 */
class Pagination {
	constructor(data) {
		this.offset = data.offset;
		this.limit = data.limit;
		this.size = data.size;
		this.page = data.page;
		this.buttons = new Array();
		this.previousBtn = null;
		this.nextBtn = null;
		this.btnsWrapper = null;
		this.listViewLimit = 7;
		this.data = data;
	}

	init() {
		if (this.data) {
			return this.generateField();
		} else {
			return ``;
		}
	}

	generateField() {
		var div = _create("div")
		$(div).addClass('row justify-content-center m-3');
		var ul = _create("ul");
		$(ul).addClass('pagination');
		this.defaultBtn();
		ul.innerHTML = `${this.pages()}`;
		ul.insertBefore(this.previousBtn, ul.firstChild);
		ul.appendChild(this.nextBtn);
		div.appendChild(ul);
		this.btnsWrapper = ul;
		return div;
	}

	defaultBtn() {
		this.previousBtn = this.navBtns('prev');
		this.nextBtn = this.navBtns('next');
	}
	navBtns(cmd) {
		var btn = _create("li");
		$(btn).addClass('paginate_button nav-btns');
		var a = _create("a");
		a.href = '#';
		a.innerHTML = cmd == 'prev' ? `&lt;&lt;` : `&gt;&gt;`;
		btn.appendChild(a);
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			console.log('img')
			$('.pagination .paginate_button').each(function(i) {
				if ($(this).hasClass('active')) {
					if (cmd == 'prev') {
						$('.pagination .paginate_button')[i - 1].firstChild.click();
					} else {
						$('.pagination .paginate_button')[i + 1].firstChild.click();
					}
				}
			})
		})
		return btn;
	}

	alignBtns() {
		//var centerPoint = Number(this.listViewLimit / 2).toFixed();
		var index = 0;
		$(this.btnsWrapper).children().each(function(i) {
			if ($(this).hasClass('nav-btns')) return false;
			if ($(this).hasClass('active')) {
				index = i;
				return false;
			}
		});
		return index;
	}

	pages() {
		let pagination = ``, x = this.alignBtns();
		var totalPages = this.page;
		var currentPage = this.offset;
		var limit = parseInt(this.listViewLimit);
		var centerPoint = parseInt((limit / 2).toFixed());
		console.log(currentPage, centerPoint)
		for (var i = 1; i <= totalPages; i++) {
			let active = i == currentPage ? 'active' : '';
			/*if (i <= 3 || i >= totalPages - 2 || i >= currentPage - 1 && i <= currentPage + 1) { 
				pagination +=`<li class="paginate_button ${active}"><a href="?page=${i}">${i}</a></li>`;
				i++;
			} else { 
				pagination +=`<li class="paginate_button"><a href='#'>...</a></li>`;
				i = i < currentPage ? currentPage - 1 : totalPages - 2;
			}
			*/
			if (totalPages > 7) {
				if (currentPage <= centerPoint) {
					if (i > centerPoint + 1 && i < totalPages) {
						pagination += `<li class="paginate_button"><a href='#'>...</a></li>`;
						i = totalPages - 1;
					} else {
						pagination += `<li class="paginate_button ${active}"><a href="?page=${i}">${i}</a></li>`;
					}
				} else if (currentPage >= centerPoint && currentPage < totalPages - 2) {
					if (i > 1 && i < currentPage - 1) {
						pagination += `<li class="paginate_button"><a href='#'>...</a></li>`;
						i = currentPage - 2;
					} else if (i > currentPage + 1 && i < totalPages) {
						pagination += `<li class="paginate_button"><a href='#'>...</a></li>`;
						i = totalPages - 1;
					} else {
						pagination += `<li class="paginate_button ${active}"><a href="?page=${i}">${i}</a></li>`;
					}
				} else {
					if (i == 2 && i < totalPages) {
						pagination += `<li class="paginate_button"><a href='#'>...</a></li>`;
						i = totalPages - (centerPoint + 1);
					} else {
						pagination += `<li class="paginate_button ${active}"><a href="?page=${i}">${i}</a></li>`;
					}
				}
			} else {
				pagination += `<li class="paginate_button ${active}"><a href="?page=${i}">${i}</a></li>`;
			}
		}
		return pagination;
	}
}