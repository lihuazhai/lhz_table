/*******************************************************************************
 * //v，页面展示层
 * Copyright (C) 2012~2013梨花寨
 *
 * @author xyang <lihuazhai_com@163.com>
 * @site www.lihuazhai.com
 * @date 2013.7.22
 *******************************************************************************/
define(['../lib/juicer-min.js'],function() {
	//var createFunction = (function(){
	function _defaultShow() {
		var frame_boxs = '<table class="table">' + '<tr><td>没有数据</td><td>请传入数据</td></tr>' + '<tr><td><a href="#">查手册</a></td><td>请传入数据</td></tr>' + '</table>';
		return frame_boxs;
	};
	function _loadTable(){
		var tpl = [
	       '<table class="table">',
	       '{@each table as tr}',
	            '<tr>',
	            '{@each tr as td}',
	            	'<td>${td}</td>',
	            '{@/each}',
	            '</tr>',
	       '{@/each}',
	       '</table>'
		].join('');
		return tpl;
	};
	// 私有函数：载入框架
	function _loadFrame() {
		var frame_box = '';
		frame_box += '<div class="lhz-table-box">';
		frame_box += '<div class="lhz-filter-box clearfix"><div class="filter_box"><ul></ul></div><div class="sel_box"></div></div>';
		frame_box += '<div class="lhz-control-box"></div>';
		frame_box += '<div class="lhz-data-show"></div>';
		frame_box += '<div class="lhz-page"></div>';
		frame_box += '</div>';
		return frame_box;
	};


	//新增数据页面
	function addNewForm() {
		var formHtml = '<div class="addNewForm">' + '<ul>' + '<li>名称：<input type="text" name="title" id="newFormTitle" /></li>' + '<li>内容：<textarea name="content" id="newFormContent"></textarea></li></ul>' + '</div>';
		return formHtml;
	};

	var bindEvent = {
		//添加数据
		addData : function (addUrl){
			$(".lhz-table-addNew").click(function() {
				var formHtml = addNewForm();
				var btns = '<div class="addNewBtns"><a href="javascript:void(0);" id="addSubmit">提交</a>' + '<a href="javascript:void(0);" onclick="$(\'.pop-dialog\').hide();" id="addClose">关闭</a></div>';

				$(".pop-dialog-title").html("新增");
				$(".pop-dialog-content").html(formHtml);
				$(".pop-dialog-footer").html(btns);

				$("#addSubmit").click(function() {
					var title = $("#newFormTitle").val();
					var content = $("#newFormContent").val();
					daoMethods.addData(addUrl, title, content);
					//新增数据插入到数据库
					refresh(opts);//刷新表格
				});
			});
		},
		//删除数据
		delData : function(delUrl){
			$(".lhz-table-del").click(function() {
				//判断是否至少选择了一项
				var checkedObj = $(".lhz-table-box input[name='ids[]']:checked");
				if (checkedObj.length == 0) {
					alert("至少选择一项");
					return;
				}
				if (confirm("确定要批量删除吗?")) {
					checkedObj.each(function(index) {
						var thidId = $(this).attr("value");
						daoMethods.delData(addUrl, thidId);
						//删除数据操作数据库
						refresh(opts);//刷新表格
					});
				}
			});
		},
		toSearch : function(){
			$(".lhz-table-box .filterBtns").find("input[data-btn='search']").click(function() {
				var selJson = '[';
				$(".lhz-filter-box .filter_box li").each(function() {
					var field = $(this).children().eq(0).val();
					var condition = $(this).children().eq(1).val();
					var value = $(this).children().eq(2).val();
					if (value == "") {
						value = " ";
					}
					if ($(this).index() == $(".lhz-filter-box .filter_box li").length - 1) {
						selJson += '{"field":"' + field + '", "condition" : "' + condition + '", "value" : "' + value + '"}';
					} else {
						selJson += '{"field":"' + field + '", "condition" : "' + condition + '", "value" : "' + value + '"},';
					}
				});
				selJson += ']';

				var obj = eval("(" + selJson + ")");
				//var obj = JSON.parse(selJson); 			
				//alertTest(obj);
				daoMethods.selectDataTemp(opts.searchUrl, 1, 20, obj);
			});
		},
		addFilterItme : function(opts){
			$('.add_filter_item').change(function() {
				var thisValue = $(this).val();
				var filterItem = '<li>';
				filterItem += '<input type="checkbox" value="' + thisValue + '" />';
				filterItem += '<select>';
				var condition = opts.setting.filterData[thisValue].condition;
				var conditionLength = condition.length;
				for (var i = 0; i < conditionLength; i++) {
					filterItem += '<option value="' + condition[i].value + '">' + condition[i].name + '</option>';
				};
				filterItem += '<select>';
				if (opts.setting.filterData[thisValue].type == "text") {
					filterItem += '<input type="text" />';
				} else if (opts.setting.filterData[thisValue].type == "select") {

					filterItem += '<select>';
					var selectObj = opts.setting.filterData[thisValue].option;
					var optionLength = selectObj.length;
					for (var i = 0; i < optionLength; i++) {
						filterItem += '<option value="' + selectObj[i].value + '">' + selectObj[i].name + '</option>';
					};
					filterItem += '<select>';
				}
				filterItem += '</li>';

				$(".lhz-filter-box .filter_box ul").append(filterItem);
			});
		}

	};

	// 载入控制,绑定时间
	function _loadControl(opts) {
		var control_html = '<div>' + '<input type="button" value="新增" class="lhz-table-addNew" />' + '<input type="button" value="删除" class="lhz-table-del" />' + '</div>';
		$(".lhz-control-box").html(control_html);
		bindEvent.addData(opts.addUrl);
		bindEvent.delData(opts.delUrl);
	};

	// 载入过滤器,绑定时间
	function _loadFilter(opts) {
		var filterHtml = '';
		filterHtml += '<select class="add_filter_item"><option value="0">' + opts.lang.choose + '</option>';
		var itemList = opts.setting.filterData;
		for (item in itemList) {
			filterHtml += '<option value="' + itemList[item].id + '">' + itemList[item].name + '</option>';
		};
		filterHtml += '</select>';
		$(".lhz-filter-box .sel_box").html(filterHtml);

		var filterBtns = '';
		filterBtns = '<div class="filterBtns"><input type="button" value="搜索" data-btn="search" /></div>';
		$(".lhz-filter-box").after(filterBtns);

		bindEvent.toSearch(opts);
		bindEvent.addFilterItme(opts);
	};

	// 私有函数：载入数据
	function loadDate(opts) {
		var getType = opts.source.getType;
		var dataJson, dataHtml;
		if (getType == "url") {
			var dataUrl = opts.source.dataUrl;

			/*$.ajaxSetup({
				async: false //设置为同步
			});
			*/

		    console.log(dataUrl);
			$.ajax({
				type: "POST",
				url:  dataUrl,
				data: {},
				dataType: "json",
				success: function(data) {
					console.log(data);
				}
			});

			$.post(dataUrl, function(data) {
				//var responseJsonData = eval('('+data+')');//response.responseText是Ajax的返回值
				//alert(responseJsonData);//这行是对的，打印结果是：[object object],说明已经json数组已经转化为json对象了

				console.log(data);
				var jsonData = formatData(data);
				dataHtml = _showData(jsonData);
			}, "json");
		} else {
			dataJson = opts.source.tbData;
			dataHtml = _showData(dataJson);
		}
		return dataHtml;
	};


	return {
		defaultShow : _defaultShow,
		loadTable : _loadTable,
		loadFrame : function() {
			return _loadFrame();
		},
		loadControl :_loadControl,
		loadFilter :_loadFilter,
		say: function tab() {
			alert("这是模块化tab函数")
		}
	}
	//})();
});