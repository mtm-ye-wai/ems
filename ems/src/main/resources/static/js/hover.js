/**
 * 
 */
window.itech = function(selector) {
    var selector = document.querySelectorAll(selector);
    function command(cmd) {
        [].forEach.call(selector, cmd);
    };
    return {
        hover: function(callback,timeout) {
            command(function(ele) {
                ele.hover(callback,timeout);
            })
        }
    }
}
$(function() {
    itech('.hover').hover(function(data) {
        if (data.blur) {
            var target = data.target;
            var pop = createPopUpBlock(data.x,data.y);
            $(pop).addClass("itech-hover-ele");
            pop.innerHTML = target.dataset['title'];
            console.log(target.style.getPropertyValue("text-align"))
            $(pop).css({
                "min-width":target.offsetWidth + "px",
                "text-align":"center"
            });
            $('body').append(pop)
        } else {
            $(".itech-hover-ele").remove();
        }

    },500);
})
function _(selector) {
    return document.querySelectorAll(selector);
}
function _create(tag) {
    return document.createElement(tag);
}
function createPopUpBlock(x, y) {
    var div = _create('div');
    $(div).css({
        'position': 'absolute',
        'top': y + 'px',
        'left': x + 'px',
        'box-shadow': '1px 2px 3px #0000004c',
        'border-radius': '5px',
        'box-sizing': 'border-box',
        'padding': '5px',
        'background-color': '#FFF',
        'z-index': '100',
        'white-space': 'nowrap',
        'pointer-events': 'none',
        'border': '1px solid',
    });
    return div;
}

Element.prototype.hover = function(callback,timeoutLimit = 1000) {
    $(this).css("cursor", "default");
    var timeout = null;
    var target = this;
    var mark = true;
    this.onmouseover = function() {
        var offset = this.offsets();
        timeout = setTimeout(function() {
            var data = { target: target, x:offset.left,y:offset.top,blur: mark }
            callback(data);
        }, timeoutLimit);
    };

    this.onmouseout = function(e) {
        clearTimeout(timeout);
        mark = false;
        var data = { target: target, blur: mark }
        callback(data);
        mark = true;
    }
}

Element.prototype.offsets = function absolutePosition() {
    var el = this;
    var
        found,
        left = 0,
        top = 0,
        width = 0,
        height = 0,
        offsetBase = absolutePosition.offsetBase;
    if (!offsetBase && document.body) {
        offsetBase = absolutePosition.offsetBase = document.createElement('div');
        offsetBase.style.cssText = 'position:absolute;left:0;top:0';
        document.body.appendChild(offsetBase);
    }
    if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
        var boundingRect = el.getBoundingClientRect();
        var baseRect = offsetBase.getBoundingClientRect();
        found = true;
        left = boundingRect.left - baseRect.left;
        top = boundingRect.top - baseRect.top;
        width = boundingRect.right - boundingRect.left;
        height = boundingRect.bottom - boundingRect.top;
    }
    return {
        found: found,
        left: left,
        top: top,
        width: width,
        height: height,
        right: left + width,
        bottom: top + height
    };
}
