define(function() {
	var tpl = '<div class="{%prefix%}pop"><div class="hd"><span class="icolse">×</span>{%title%}</div><div class="bd">{%content%}</div></div>';
	var Pop = {
		Options: {
			prefix: 'prefix_',
			position: 'left',
			title: '标题',
			content: '内3213容',
			width: 200
		},
		_init: function(){
			this._action();
		},
		_action: function(){
			var self = this;
			this.bind('load',function(){
				self.show();
				this.head = this.pop.find('.hd');
				this.body = this.head.siblings();
				this.head.click(function(){
					if('none' == self.body.css('display')){
						self.max();
					}else{
						self.min();
					}
				});
				this.pop.find('.icolse').click(function(event){
					event.stopPropagation();
					setTimeout(function(){
						self.destroy();
					},10);
				});
			});	
		},
		render: function(){
			var self = this;
			if(this.isRendered) return;
			this.trigger('onrenderbefore');
			this.isRendered = true;
			this.pop = $(util.format(tpl,this.options)).appendTo(document.body);	
			this.trigger('onrenderafter');
			this.setStyle();
		},
		setStyle: function(){
			var css = 'position:fixed;bottom:1px;width:' + this.width + 'px;';
			if('left' == this.position){
				css += 'left:0px;'
			}else{
				css += 'right:0px;';
			}
			if($.browser.msie && $.browser.version < 7){
				css += 'position:absolute;top:expression(documentElement.scrollTop+documentElement.clientHeight-this.offsetHeight);';
			}
	        document.documentElement.style.cssText += ';background:url(about:blank) fixed;';
			this.pop[0].style.cssText += css;
		},
		show: function(){
			if(this.isShown) return;
			this.render();
			this.trigger('onshowbefore');
			this.isShown = true;
			this.trigger('onshowafter');
		},
		hide: function(){
			this.trigger('onhidebefore');
			this.isShown = false;
			this.pop.hide();
			this.trigger('onhideafter');
		},
		min: function(){
			this.trigger('onminbefore');
			this.body.toggle();
			this.trigger('onminafter');
		},
		max: function(){
			this.trigger('onmaxbefore');
			this.body.toggle();
			this.trigger('onmaxafter');
		},
		destroy: function(){
			var self = this;
			this.trigger('ondestroybefore');
			this.pop.remove();
			this.pop = null;
			this.head = null;
			this.body = null;
			this.trigger('ondestroyafter');
		}
	};


	// 默认模板
	var DIALOG = {
	    // 定义dialog模板字符串
	    'DIALOGTPL': [
	        '<div class="{%prefix%}dialog">',
	            '<div class="bd">',
	                '<div class="content"></div>',
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
	var isIE6 = !-[1,]&&!window.XMLHttpRequest;

    var dialog = {
	     // 实例化时自动执行init
	     _init :  function() {
	        // var that = this;
	       this.isRendered = false;
	       this.isShown = false;
	       this.isDestroyed = false;
	       this._action();
	       console.log(this.title);
	    },
	    /**
	     * 设置.title的内容
	     * @param {String} title // text
	     */
	    setTitle: function(title){
	        var that = this;
	        that.title = title;
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

	    /**
	     * 渲染字符串内容
	     * @param  {String} text // 要渲染的字符串内容
	     */
	    renderText: function(text) {
	        var that = this;
	        that.setContent(text);
	    },
	    /**
	     * 获得视口宽高
	     * @return {Object} // width宽、height高
	     */
	    getViewportSize: function() {
	        var that = this;
	        var obj = {'width': 0, 'height': 0};
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

	    // 渲染到dom中
	    render: function() {
	        var that = this;
	        if (that.isRendered) return;
	        that.isRendered = true;

	        // 渲染dialog
	        that.dialog = $(that._format(that.options.tpl.DIALOGTPL, that.options));
	        that.title && $(that._format(that.options.tpl.DIALOGHDTPL, that.options)).insertBefore(that.dialog.find('.bd'));
	        that.renderText(that.options.content);

            // 如果需要遮罩，则创建遮罩层
	        // if (true) {
	        //     that.modal = $(that._format(that.tpl.MODALTPL, that.options)).hide().appendTo(document.body);
	        //     // 将遮罩填充iframe，遮object如安全控件、flash，遮IE6select
	        //     that.modal.html(that.tpl.IFRAMETPL);
	        // } 

	        that.setStyle();

	        console.log(that.dialog.html() );



	       // that.dialog.hide().appendTo(document.body);
	    },
	    /**
	     * 显示dialog
	     * 如果有遮罩，遮罩显示与dialog保持递进效果，即先遮罩后dialog
	     */
	    show: function() {

	    },
	    /**
	     * 隐藏dialog
	     * 瞬间隐藏dialog及dialog iframe，防止多次触发其它操作
	     */
	    hide: function() {

	    },
	    // 销毁dialog
	    destroy: function() {
	        var that = this;
	        if (that.isDestroyed) return;

	        // 置状态
	        that.isShown = false;
	        that.isRendered = false;
	        that.isDestroyed = true;

	    },
	    // 绑定交互行为
	    _action : function() {
	    	//console.log("sdfsdf");

	    },
	    _format : function(tpl,data){
			var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' + 'with(obj||{}){__p.push(\'' + tpl.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/{%([\s\S]+?)%}/g, function(match, code) {
				return "'," + code.replace(/\\'/g, "'") + ",'";
			}).replace(/<%([\s\S]+?)%>/g, function(match, code) {
				return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
			}).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "');}return __p.join('');";
			var func = new Function('obj', tmpl);
			return data ? func(data) : func;
		}

    };


    var callBackFun = {
    	destroyafter : function(){

    	}
    };
        


	function PopClass(options){
		this.options = $.extend({}, {'prefix':'jj_',title:'标题',content:'内容在这里！',width:200,tpl: DIALOG}, options);
	}

	PopClass.prototype = dialog;
	PopClass.prototype.callBackFun = callBackFun;


	return PopClass;


});