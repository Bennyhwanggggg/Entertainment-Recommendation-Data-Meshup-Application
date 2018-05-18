(function(window) {
	/**
	 * pagination
	 * @date
	 * @param  {[type]}   cur   current page
	 * @param  {[type]}   total total pages numeber
	 * @param  {[type]}   len   show the number of page number
	 * @return {[type]}         [description]
	 */
	/*var pagination = {
		initPage: function(cur, total, len) {

		}
	}*/
    var pagination = function(options) {
        cur = parseInt(options.cur||1, 10);
        total = parseInt(options.total||0, 10);
        len = parseInt(options.len||0, 10);
        tar = document.getElementById(options.targetId);
        if(!tar || !total) {
            return '';
        }
        var html = '<ul class="pages"><li class="page">';
        if (total === 1) {
            html += '<a href="javascript:void(0);" class="page-index">' + 1 + '</a>'
        }
        if (cur !== 1 && total !== 1) {
            // 上一页
            html += '<a href="javascript:void(0);" class="prev page-index" data-index="' + (cur - 1) + '">&lt;</a>'
        }
        if (total > len && cur > Math.ceil(len / 2) && total !== 1) {
            // 左more
            html += '<span class="more">...</span>';
        }
        if (total !== 1) {
            var _l = len > total ? total : len;
            if (len < total && cur > Math.floor(len / 2) && (cur <= total - Math.floor(len / 2))) {
                for (var j = 1; j <= len; j++) {
                    if (cur === (cur - Math.ceil(len / 2) + j)) {
                        html += '<a href="javascript:void(0);" class="page-index cur" data-index="' + (cur - Math.ceil(len / 2) + j) + '">' + (cur - Math.ceil(len / 2) + j) + '</a>';
                        continue;
                    }
                    html += '<a href="javascript:void(0);" class="page-index" data-index="' + (cur - Math.ceil(len / 2) + j) + '">' + (cur - Math.ceil(len / 2) + j) + '</a>';
                }
            } else if (cur < len) {
                for (var i = 1; i <= _l; i++) {
                    if (cur === i) {
                        html += '<a href="javascript:void(0);" class="cur page-index" data-index="' + i + '">' + i + '</a>'
                        continue;
                    }
                    html += '<a href="javascript:void(0);" class="page-index" data-index="' + i + '">' + i + '</a>'
                }
            } else {
                for (var i = len - 1; i >= 0; i--) {
                    if (cur === (total - i)) {
                        html += '<a href="javascript:void(0);" class="cur page-index" data-index="' + (total - i) + '">' + (total - i) + '</a>'
                        continue;
                    }
                    html += '<a href="javascript:void(0);" class="page-index" data-index="' + (total - i) + '">' + (total - i) + '</a>'
                }
            }
        }

        if (total > len && cur < total - Math.floor(len / 2) && cur !== total && total !== 1) {
            // right more
            html += '<span class="more">...</span>';
        }

        if (cur !== total && total !== 1) {
            // next page
            html += '<a href="javascript:void(0);" class="page-index next" data-index="' + (cur + 1) + '">&gt;</a>';
        }
        html += '<span class="page-total">Total Page<span class="number">' + total + '</span></span>\
          <span class="page-go">to page<input class="w35 go" id="yeshu" type="text" value=""></span>\
          <input type="button" class="gray-btn" id="go-search" value="confirm">';
        tar.innerHTML = html;
        if(options.callback) {
            options.callback(total);
        }
    }

    // cmd || node.js
    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        module.exports = pagination;
    } else {
        window.pagination = pagination;
        // amd
        if ( typeof define === "function" && define.amd ) {
            define( "pagination", [], function () { return pagination; } );
        }
    }









})(window)
