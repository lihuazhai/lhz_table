/**
 * @name Dialog
 * @class 对话框组件，内容支持text、element、iframeURL
 * @constructor
 * @extends Widget
 * @requires widget
 * @requires util
 * @param {Object}      config              // 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
 * @param {String}      config.prefix       // 对话框class前缀，默认ui-
 * @param {String}      config.title        // 对话框标题
 * @param {String}      config.contentType  // 对话框内容类型，参数支持text、element、iframe
 * @param {String|Node} config.content      // 对话框内容，支持传入html文本、文档内节点、iframeURL
 * @param {Boolean}     config.withModal    // 是否需要遮罩层
 * @param {Float}       config.modalOpacity // 遮罩层透明，0-1之间浮点数
 * @param {String}      config.position     // 相对viewport的位置，目前只支持居中
 * @param {Integer}     config.width        // 对话框宽度
 * @param {Integer}     config.zIndex       // 对话框的深度
 * @param {Integer}     config.duration     // 显示/隐藏的经过时间
 * @param {Object}      config.posOffset    // 位置偏移量对象，{'left':0, 'right': 0}
 * @param {Json}        config.tpl          // 组件模板对象，默认是定义好的DIALOG
 *
 * @example
 * var dialog = new Dialog({...});
 * dialog.bind('close', function(){...})
 * dialog.render();
 * dialog.show();
 */
define(
	function(require) {
		// var dep1 = require('dep1'),dep3 = require('dep3');

		// 默认模板
		var DIALOG = {
			// 定义dialog模板字符串
			'DIALOGTPL': [
				'<div class="{%prefix%}dialog">',
				'<div class="bd">',
				'<div class="content">ddddd</div>',
				'</div>',
				'</div>'
			].join(''),

			// 定义dialog标题模板字符串
			'DIALOGHDTPL': [
				'<div class="hd">',
				'<span class="close" title="关闭" data-type="close"></span>',
				'<h4 class="title">{%title%}</h4>',
				'</div>'
			].join(''),

			// 定义浮层iframe遮罩模板字符串
			'IFRAMETPL': [
				'<iframe frameborder="0" scrolling="no" src="javascript:\'\'" style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>'
			].join(''),

			// 定义modal模板字符串
			'MODALTPL': [
				'<div class="{%prefix%}modal" style="top:0;left:0;background-color:#000;">',
				'</div>'
			].join('')
		};

		// 判断是否是IE6
		var isIE6 = !-[1, ] && !window.XMLHttpRequest;

		var util = util || {};
		util.format = function(tpl, data) {
			var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' + 'with(obj||{}){__p.push(\'' + tpl.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/{%([\s\S]+?)%}/g, function(match, code) {
				return "'," + code.replace(/\\'/g, "'") + ",'";
			}).replace(/<%([\s\S]+?)%>/g, function(match, code) {
				return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
			}).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "');}return __p.join('');";
			var func = new Function('obj', tmpl);
			return data ? func(data) : func;
		};

		//回调执行
		var callbackExecute = function(fun) {
			if (fun && (fun instanceof Function)) {
				fun();
			}
		}

		var render = function(that) {
			if (that.isRendered) return;
			callbackExecute(that.callback.renderbefore);
			that.isRendered = true;

			// 渲染dialog，根据type判断插入什么类型的数据
			that.dialog = $(util.format(that.tpl.DIALOGTPL, that.options));
			that.title && $(util.format(that.tpl.DIALOGHDTPL, that.options)).insertBefore(that.dialog.find('.bd'));
			that.setContent(that.content);
			that.dialog.hide().appendTo(document.body);


			// 如果需要遮罩，则创建遮罩层
			if (that.withModal) {
				that.modal = $(util.format(that.tpl.MODALTPL, that.options)).hide().appendTo(document.body);
				// 将遮罩填充iframe，遮object如安全控件、flash，遮IE6select
				that.modal.html(that.tpl.IFRAMETPL);
			}

			that.setStyle();

			callbackExecute(that.callback.renderafter);
		}

		var dialogFuns = {
			/**
			 * 设置.title的内容
			 * @param {String} title // text
			 */
			setTitle: function(title) {
				var that = this;
				that.title = title;
				that.dialog.find('.title').html(title);
			},
			/**
			 * 设置.content的内容
			 * @param {String} content // text、element
			 */
			setContent: function(content) {
				var that = this;
				that.content = content;
				that.dialog.find('.content').html(content);
			},
			// 设置样式
			setStyle: function() {
				var that = this;

				// 设置dialog的样式
				that.dialog.css({
					'position': isIE6 ? 'absolute' : 'fixed',
					'width': (function() {
						if (isIE6) {
							return that.width === 'auto' ? that.maxWidth : that.width;
						}
						return that.width;
					})(),
					'maxWidth': that.maxWidth,
					'zIndex': that.zIndex
				});

				// 如果有遮罩，设置遮罩的样式 
				that.withModal && that.modal.css({
					'position': isIE6 ? 'absolute' : 'fixed',
					'opacity': that.modalOpacity,
					'zIndex': that.zIndex - 1
				});

				that.setCenter();
			},

			/**
			 * 获得视口宽高
			 * @return {Object} // width宽、height高
			 */
			getViewportSize: function() {
				var that = this;
				var obj = {
					'width': 0,
					'height': 0
				};
				var _docDe = document.documentElement;
				var _docBd = document.body;
				if (document.compatMode && document.compatMode == 'CSS1Compat') {
					obj.width = _docDe.clientWidth;
					obj.height = _docDe.clientHeight;
				} else if (_docBd && (_docBd.scrollLeft || _docBd.scrollTop)) {
					obj.width = _docBd.clientWidth;
					obj.height = _docBd.clientHeight;
				}
				return obj;
			},
			// 将dialog设置viewport居中
			setCenter: function() {
				var that = this;
				var _viewportSize = that.getViewportSize();
				var _left = _viewportSize.width - parseInt(that.dialog.outerWidth());
				var _top = _viewportSize.height - parseInt(that.dialog.outerHeight());

				// 偏移量
				var _offsetLeft = that.posOffset.left ? that.posOffset.left : 0;
				var _offsetTop = that.posOffset.top ? that.posOffset.top : 0;
				that.dialog.css({
					'left': (function() {
						return isIE6 ? _left / 2 + _offsetLeft + document.documentElement.scrollLeft : _left / 2 + _offsetLeft;
					})(),
					'top': (function() {
						return isIE6 ? _top / 2 + _offsetTop + document.documentElement.scrollTop : _top / 2 + _offsetTop;
					})()
				});

				// 如果有遮罩，设置遮罩覆盖viewport
				that.withModal && that.modal.css({
					'width': _viewportSize.width,
					'height': _viewportSize.height,
					'top': (function() {
						return isIE6 ? document.documentElement.scrollTop : 0;
					})()
				});

				// 如果没有遮罩，需要将ifm同步到dialog的位置
				!that.withModal && that.ifm.css({
					'left': (function() {
						return isIE6 ? _left / 2 + _offsetLeft + document.documentElement.scrollLeft : _left / 2 + _offsetLeft;
					})(),
					'top': (function() {
						return isIE6 ? _top / 2 + _offsetTop + document.documentElement.scrollTop : _top / 2 + _offsetTop;
					})()
				});
			},
			// 渲染到dom中
			render: function() {
				render(this);
			},
			show: function() {
				this.dialog.show();
			}

		};

		//定义类
		function Popup(options) {
			this.options = $.extend({
				prefix: "ui_"
			}, options);
			this.withModal = true;
			this.title = options.title || "这里是标题";
			this.content = options.content || "这里是内容";
			this.width = 520;
			this.maxWidth = 520;
			this.zIndex = 9999;
			this.posOffset = {
				'left': 0,
				'top': 0
			};
			this.callback = options.callback || {};
			this.isRendered = false;
			this.isShown = false;
			this.isDestroyed = false;
			this.tpl = DIALOG;
		}
		Popup.prototype = dialogFuns;
		return Popup;
	}
);