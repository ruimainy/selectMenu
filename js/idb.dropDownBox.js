(function ($, win, undefined) {

    $.fn.extend({
        exIdbSelect: function (config) {
            var $idbSelect = $(this);
            var $ulWrap;
            var $result;
            var getReturnData = null;
            var setDefaultViewData = null;

            function createHtml(d) {
                //生成选择条HTML容器
                var $title = $('<div/>', {
                    'class': 's_title'
                })
					.html(config.title)
					.appendTo($idbSelect);

                $result = $('<div/>', {
                    'class': 's_result'
                })
					.html(config.emptyContent)
					.appendTo($idbSelect);

                var $wrap = $('<div/>', {
                    'class': 's_wrap',
                    'tabIndex': '-1'
                })
					.appendTo($idbSelect);

                $ulWrap = $('<ul/>', {})
					.html(receiveJson(d))
					.appendTo($wrap);

                if (config.customBar) {
                    var _ulNumLiHeight = ($ulWrap.find('li').outerHeight(true)) * d.length;

                    if (_ulNumLiHeight > $wrap.height()) {

                        $wrap.css('overflow', 'hidden');

                        if (config != undefined && config.containerHeight != undefined) {
                            $wrap.exDrapBar({ "containerHeight": config.containerHeight });
                        } else {
                            $wrap.exDrapBar();
                        }

                    } else {
                        $wrap.height(_ulNumLiHeight);
                    }

                } else {
                    $wrap.css({ 'overflow-y': 'auto', 'height': config.containerHeight });
                }

                $result.bind('click', function () {
                    $wrap.show();
                    $wrap.trigger('focus');
                });

                $wrap.find('li').bind('click', function () {
                    var _self = $(this);

                    if (_self.hasClass('wrap_liTrue')) {
                        $wrap.hide();
                        return;
                    } else {
                        for (var i = 0; i < $wrap.find('li').length; i++) {
                            var _li = $wrap.find('li').eq(i);
                            if (_li.hasClass('wrap_liTrue')) {
                                _li.removeClass("wrap_liTrue");
                            }
                        }
                        _self.attr('class', 'wrap_liTrue');
                        config.onSelectChanged(_self.index(), d[_self.index()]);
                        getReturnData = d[_self.index()];
                    }

                    $result.html(_self.text());
                    $wrap.hide();
                });

                $wrap.bind('focusout', function (e) {
                    $wrap.css('display', 'none');
                    e.stopPropagation();
                })

            }

            function receiveJson(d) {
                //接收并处理JSON
                var lis = '';
                for (var i in d) {
                    lis += '<li>';
                    lis += d[i][config.field];
                    lis += '</li>'
                }
                return lis;
            }

            this.setData = function (d) {
                //接收数据的公共方法
                $idbSelect.html("");
                createHtml(d);
                setDefaultViewData = d;
            }

            this.getSelectedData = function () {
                //返回被选的数据的obj
                return getReturnData;
            }

            this.setDefaultSelectIndex = function (inx) {
                //设置打开默认选中项
                getReturnData = setDefaultViewData[inx];
                $result.html(setDefaultViewData[inx][config.field]);
            }

            return this;
        }
    });
})(jQuery, window)

