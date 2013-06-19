/*!
 * jQuery Cookie Plugin v1.9.0
 * https://github.com/carhartl/jquery-cookie
 * Copyright 2013 Klaus Hartl
 */
(function($) {
	var jsPath = getPath();
	loadjscssfile("../skin/default/css/reset.css", "css");
	loadjscssfile("../skin/default/css/lhz_table.css", "css");
	loadjscssfile(jsPath + "/My97DatePicker/WdatePicker.js", "js");

	$.fn.lhz_table = function(options) {
		var opts = $.extend({}, $.fn.lhz_table.defaults, options);
		return this.each(function() {
			var tbObj = $(this);
			tbObj.html(loadFrame());
			$("#tb-data-show").html(loadDate(opts));
			//update(opts.updateUrl);
		});
	};
	// 私有函数：取页面路径
	function getPath() {
		var js = document.scripts;
		var jsPath = "";
		for(var i = 0; i < js.length; i++) {
			if(js[i].src.indexOf("tableShow") != "-1") {
				jsPath = js[i].src.substring(0, js[i].src.lastIndexOf("/"));
				break;
			}
		}
		return jsPath;
	};

	// 私有函数：加载js或css
	function loadjscssfile(filename, filetype) {
		if(filetype == "js") {
			var fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", filename);
		} else if(filetype == "css") {
			var fileref = document.createElement('link');
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}
		if( typeof fileref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	};

	function alertTest(obj) {
		var str = JSON.stringify(obj)
		alert(str);
		//用于测试
	};

	// 私有函数：载入框架
	function loadFrame() {
		var frame_box = '';
		frame_box += '<div id="lhz_table-box">';
		frame_box += '<div class="control_box"></div>';
		frame_box += '<div id="tb-data-show"></div>';
		frame_box += '<div id="control_btn_box" class="clearfix" >';
		frame_box += '<div id="page" class="page"></div>';
		frame_box += '</div></div>';
		return frame_box;
	};

	// 私有函数：载入数据
	function loadDate(opts) {
		var getType = opts.source.getType;
		var dataJson, dataHtml;
		if(getType == "url") {
			var dataUrl = opts.source.dataUrl;
			$.ajaxSetup({
				async : false //设置为同步
			});
			$.post(dataUrl, function(data) {
				//var responseJsonData = eval('('+data+')');//response.responseText是Ajax的返回值
				//alert(responseJsonData);//这行是对的，打印结果是：[object object],说明已经json数组已经转化为json对象了					
				var objData = arrayToObj(data,"id");
				var jsonData = formatData(objData);		
				dataHtml = showData(jsonData);
			}, "json");
		} else {
			dataJson = opts.source.tbData;
			dataHtml = showData(dataJson);
		}

		function showData(dataJson) {
			var dataLeng = dataJson.length;
			var dataHtmlTemp = '<table>';
			for(var i = 0; i < dataLeng; i++) {
				dataHtmlTemp += '<tr tr-id=' + dataJson[i].data["id"] + '">';
				for(var x in dataJson[i].data) {
					dataHtmlTemp += '<td>' + dataJson[i].data[x] + '</td>';
				}
				dataHtmlTemp += '</tr>';
			}
			return dataHtmlTemp;
		}

		return dataHtml;
	};
	
	Array.prototype.in_array = function(e)  {  
		for(i=0;i<this.length;i++)  {  
			if(this[i] == e)  
			return true;  
		}  
		return false;  
	}
	
	//数组转对象attributeFlag,以哪个做为新对象的属性名称
	function arrayToObj(data,attributeFlag){
		var result = {};
		var l = data.length;
		for(var i=0;i<l;i++){
			var attribute = data[i]["data"][attributeFlag];
			result[attribute] = data[i];			
		}				
		return result;		
	}
	
	
	function formatData(objData){
		var afterSort = new Array();				
		for(var i in objData) { 			
			//递归
			function getNext(nextField){
				afterSort.push(objData[nextField]);
				if(objData[nextField].data.next!=0){
					getNext(objData[nextField].data.next);
				}				
			};
			
			if(objData[i].data.prev == 0){
				afterSort.push(objData[i]);
			}
			
			if(objData[i].data.next!=0){
				getNext(objData[i].data.next);
			}
		}  
				
		return afterSort;
	}	

	//更新数据
	function update(updateUrl) {
		$.get(updateUrl, {
			title : "John",
			content : "2pm"
		}, function(data) {
			alert("Data Loaded: " + data);
		});
	};

	// 插件的defaults
	$.fn.lhz_table.defaults = {
		tbData : null,
		updateUrl : null,
		background : 'yellow'
	};
})(jQuery);
