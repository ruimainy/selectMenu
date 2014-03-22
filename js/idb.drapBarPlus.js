(function($, win, undefined){
	$.fn.extend({
		exDrapBar: function(config){

				//拖动事件
				var $that = $(this);
				var $_b;
				var mouseDownPoxY;
				var InitY;
				var _dragBtnMoveDistance;
				var $_drag;

				$_drag = $('<div/>',{
								'class': 'drag_wrap'
							})
							.html( '<b/>' )
							.appendTo( $that );

				if(config != undefined && config.containerHeight != undefined){
					$_drag.css("height", config.containerHeight);
				};

				$_b = $_drag.children('b');
				_dragBtnMoveDistance = parseInt($_drag.css('height')) - parseInt($_b.css('height'));

				$_b.bind('mousedown',function(e){
				    //当鼠标按下时,鼠标位置以及对象的当前位置
				    e = e || window.event;
				    var doc = document;

					InitY = $(this).css('top').replace("px", "");
					if( InitY == 'auto')InitY = 0;
					mouseDownPoxY = e.pageY;

					var _btn = $_b[0];//将JQ对象转为JS对象
					if( _btn.setCapture ){
						_btn.setCapture(); //firefox
					}else if(window.captureEvents){
				       window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
				    }

					$(doc).mousemove(function (e) {
					    var tempY = e.pageY - mouseDownPoxY + parseInt(InitY);

					    tempY = tempY < 0 ? 0 : tempY;
					    tempY = tempY > _dragBtnMoveDistance ? _dragBtnMoveDistance : tempY;
					    
					    $_b.css('top', tempY + 'px');

					    ulScroll(tempY, $_b);

					});
					$(doc).mouseup(function () {

						if(_btn.releaseCapture){
			            	_btn.releaseCapture();
			            }else if(window.captureEvents){
			            	window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			            }

					    $(doc).unbind('mousemove');
					});
				});

			function ulScroll( scrollY, bH ){
				//滚动菜单方法
				var ulID = $that.children();
				var ulHeight = $that.children().outerHeight();
				var ulIDparent = parseInt($that.children().parent().css('height'));
				var _bHparent = parseInt(bH.parent().css('height'));
				var _bH = parseInt( bH.css('height'));
				var _bHmove = _bHparent - _bH;
				var _ulMove = '-' + ((ulHeight - ulIDparent) / _bHmove) * scrollY ;
				$that.children().css('top', _ulMove  + 'px' );
			};

		}
	})
}(jQuery, window))