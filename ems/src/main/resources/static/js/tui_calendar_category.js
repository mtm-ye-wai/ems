'use strict';

var CalendarCategoryList = [];

function CalendarCategoryInfo() {
  this.id = null;
  this.name = null;
  this.checked = true;
  this.color = null;
  this.bgColor = null;
  this.borderColor = null;
  this.dragBgColor = null;
}

function addCalendarCategory(calendar) {
  CalendarCategoryList.push(calendar);
}

function findCalendarCategory(id) {

  let index = 0;
  CalendarCategoryList.forEach(function (category) {
    if (category.id == id && !index) {
      index = id;
    }
  });

  return CalendarCategoryList[index - 1];
}

function hexToRGBA(hex) {
  var radix = 16;
  var r = parseInt(hex.slice(1, 3), radix),
    g = parseInt(hex.slice(3, 5), radix),
    b = parseInt(hex.slice(5, 7), radix),
    a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
  var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

  return rgba;
}

(function () {
  var category;
  var id = 0;

  category = new CalendarCategoryInfo();
  id += 1;
  category.id = String(id);
  category.name = 'My Calendar';
  category.color = '#ffffff';
  category.bgColor = '#00c292';
  category.dragBgColor = '#00c292';
  category.borderColor = '#00c292';
  addCalendarCategory(category);

  category = new CalendarCategoryInfo();
  id += 1;
  category.id = String(id);
  category.name = 'Meeting Room';
  category.color = '#ffffff';
  category.bgColor = '#00a9ff';
  category.dragBgColor = '#00a9ff';
  category.borderColor = '#00a9ff';
  addCalendarCategory(category);
})();
