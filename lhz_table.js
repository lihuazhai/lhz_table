/*!
 * jQuery Cookie Plugin v1.9.0
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
			loadControl(opts);
			$(".lhz-data-show").html(loadDate(opts));
			if(opts.config.ifEdit) {
				edit(opts);
			}
		});
	};

/*******************************************************************************
* //待用函数
* Copyright (C) 2012~2013梨花寨
*
* @author xyang <lihuazhai_com@163.com>
* @site www.lihuazhai.com
* @date 2013.7.22
*******************************************************************************/
//数组转对象attributeFlag,以哪个做为新对象的属性名称
function arrayToObj(data, attributeFlag) {
	var result = {};
	var l = data.length;
	for(var i = 0; i < l; i++) {
		var attribute = data[i]["data"][attributeFlag];
		result[attribute] = data[i];
	}
	return result;
};
// 私有函数：数据格式转换
function formatData(sourceData) {
	var objData = arrayToObj(sourceData, "id");
	var parentNodes = [];
	var childNodes = [];
	var arr_result = [];
	var sourceDataLength = sourceData.length

	for(var i = 0; i < sourceDataLength; i++) {
		if(sourceData[i].data["pid"] == 0) {
			parentNodes.push(sourceData[i]);
		} else {
			childNodes.push(sourceData[i]);
		}
	}
	//console.info("父任务共有 " + parentNodes.length + " 条");
	//console.info("子任务共有 " + childNodes.length + " 条");
	var afterSort = new Array();

	//递归
	function getNext(nextField) {
		afterSort.push(objData[nextField]);
		if(objData[nextField].data.next_id != 0) {
			getNext(objData[nextField].data.next_id);
		}
	};

	function getChildNodes(parentNodeId, depth) {
		var childLength = childNodes.length;
		for(var i = 0; i < childLength; i++) {
			if(childNodes[i].data[pId] == parentNodeId) {
				childNodes[i].level = depth;
				arr_result.push(childNodes[i]);
				getChildNodes(childNodes[i].data.id, depth + 1);
			}
		}
	}

	for(var i in objData) {
		if(objData[i].data.prev_id == 0) {
			afterSort.push(objData[i]);
		}
		if(objData[i].data.next_id != 0) {
			getNext(objData[i].data.next_id);
		}
	}
	return afterSort;
};



//显示操作提示
function showPrompt(text){
	var html = '<span class="lhz-showPrompt">'+text+'</span>';
	$(".lhz-table-box").append(html);
	
	var hidePrompt = function(){
		$(".lhz-showPrompt").hide();
	};
    setTimeout(hidePrompt,1000);
};	


/*******************************************************************************
* //v，页面展示层
* Copyright (C) 2012~2013梨花寨
*
* @author xyang <lihuazhai_com@163.com>
* @site www.lihuazhai.com
* @date 2013.7.22
*******************************************************************************/
// 私有函数：载入框架
function loadFrame() {
	var frame_box = '';
	frame_box += '<div class="lhz-table-box">';
	frame_box += '<div class="lhz-filter-box"></div>';
	frame_box += '<div class="lhz-data-show"></div>';
	frame_box += '<div class="control_btn_box" class="clearfix" >';
	frame_box += '<div class="lhz-page"></div>';
	frame_box += '</div></div>';
	return frame_box;
};

// 私有函数：载入控制
function loadControl(opts) {
	var control_html = '<div>' + '<input type="button" value="新增" class="lhz-table-addNew" />' + '<input type="button" value="删除" class="lhz-table-del" />' + '</div>';

	$(".lhz-filter-box").html(control_html);

	$(".lhz-table-addNew").click(function() {
		pop_dialog();
		var formHtml = addNewForm();
		var btns = '<div class="addNewBtns"><a href="javascript:void(0);" id="addSubmit">提交</a>' + '<a href="javascript:void(0);" onclick="$(\'.pop-dialog\').hide();" id="addClose">关闭</a></div>';

		$(".pop-dialog-title").html("新增");
		$(".pop-dialog-content").html(formHtml);
		$(".pop-dialog-footer").html(btns);

		$("#addSubmit").click(function() {
			var title = $("#newFormTitle").val();
			var content = $("#newFormContent").val();
			var addUrl = opts.addUrl;
			daoMethods.addData(addUrl, title, content);
			//新增数据插入到数据库
			refresh(opts);
		});
	});

	$(".lhz-table-del").click(function() {
		//判断是否至少选择了一项
		var checkedObj = $(".lhz-table-box input[name='ids[]']:checked");
		if(checkedObj.length == 0) {
			alert("至少选择一项");
			return;
		}
		if(confirm("确定要批量删除吗?")) {
			checkedObj.each(function(index) {
				var thidId = $(this).attr("value");
				daoMethods.delData(opts.addUrl, thidId);
				//删除数据操作数据库
				refresh(opts);
			});
		}
	});
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
			var jsonData = formatData(data);
			dataHtml = showData(jsonData);
		}, "json");
	} else {
		dataJson = opts.source.tbData;
		dataHtml = showData(dataJson);
	}

	function showData(dataJson) {
		var dataLeng = dataJson.length;
		var dataHtmlTemp = '<table>';
		dataHtmlTemp += '<thead>';
		dataHtmlTemp += '<tr>';
		dataHtmlTemp += '<td>id</td>';
		dataHtmlTemp += '<td>id</td>';
		dataHtmlTemp += '<td data-field="title">标题</td>';
		dataHtmlTemp += '<td data-field="content">内容</td>';
		dataHtmlTemp += '<td>pid</td>';
		dataHtmlTemp += '<td>prveId</td>';
		dataHtmlTemp += '<td>nextId</td></tr>';
		dataHtmlTemp += '</thead>';
		for(var i = 0; i < dataLeng; i++) {
			dataHtmlTemp += '<tr tr-id=' + dataJson[i].data["id"] + '">';
			dataHtmlTemp += '<td data-field="id"><input type="checkbox" name="ids[]" value="' + dataJson[i].data["id"] + '" /></td>';
			for(var x in dataJson[i].data) {
				dataHtmlTemp += '<td data-field="' + x + '"><span>' + dataJson[i].data[x] + '</span></td>';
			}
			dataHtmlTemp += '</tr>';
		}
		return dataHtmlTemp;
	}

	return dataHtml;
};

//新增数据页面
function addNewForm() {
	var formHtml = '<div class="addNewForm">' + '<ul>' + '<li>名称：<input type="text" name="title" id="newFormTitle" /></li>' + '<li>内容：<textarea name="content" id="newFormContent"></textarea></li></ul>' + '</div>';
	return formHtml;
};
	
	
/*******************************************************************************
* //c，业务操作层
* Copyright (C) 2012~2013梨花寨
*
* @author xyang <lihuazhai_com@163.com>
* @site www.lihuazhai.com
* @date 2013.7.22
*******************************************************************************/
//点击启动编辑功能
function edit(opts) {
	$(".lhz-table-box td").hover(function() {
		$(this).css("cursor", "text");
		$(this).find("span").css("border-bottom", "dashed 1px #08C");
	}, function() {
		$(this).find("span").css("border-bottom", "dashed 1px #FFF");
		$(this).find("span.urlEdit").css("display", "none");
	});

	$(".lhz-table-box td span").click(function() {
		var tdobj = $(this).parent();
		if(tdobj.children().children().length > 0) {//禁止重复点击
			return false;
		}
		var old_val = $(this).text();

		var html_new = '<input type="text" value="' + old_val + '"  />';
			html_new += '<a class="update_btn" href="javascript:void(0);" >提交更新</a>';
			html_new += '<a class="cancel_btn" href="javascript:void(0);" >撤消操作</a>';
		tdobj.html(html_new);

		$(".update_btn").bind("click", {
			opts : opts ,type : "text"
		}, toUpdade);

	});
};

//取更新的新数据
function toUpdade(event) {
	var $this = $(event.target);
	//获取当前jquery对象
	var edit_id = $(this).parents('tr').children().first().find("input").val();
	var field = $(this).parent('td').attr("data-field");
	var new_val = $(this).prev().val();
	var edit_data = {
		action : "update",
		id : edit_id,
		field : field,
		new_val : new_val
	};
	//alertTest(edit_data);
	daoMethods.update(event.data.opts.updateUrl,edit_data);
	refresh(event.data.opts);
};

//刷新数据
function refresh(opts){
	$(".lhz-data-show").html(loadDate(opts));
	if(opts.config.ifEdit) {
		edit(opts);
	}
}

	
/*******************************************************************************
* //dao层，直接操作数据库
* Copyright (C) 2012~2013梨花寨
*
* @author xyang <lihuazhai_com@163.com>
* @site www.lihuazhai.com
* @date 2013.7.22
*******************************************************************************/
var daoMethods = {
	//新增数据操作
	addData : function(url, title, content) {
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"action" : "add",
				"title" : title,
				"content" : content
			},
			success : function(data) {
				if(data == true) {
					showPrompt("新增成功!");
				} else {
					alert("新增失败!")
				}
				$('.pop-dialog').hide();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("ajax error");
			}
		});
	},
	//更新数据操作
	update : function(url,edit_data) {
		$.ajax({
			type : "POST",
			url : url,
			data : edit_data,
			success : function(data) {
				if(data == true) {
					showPrompt("修改成功!");
				} else {
					alert("失败!")
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("ajax error");
			}
		});
	},
	//删除数据操作
	delData : function(url, id) {
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"action" : "del",
				"id" : id
			},
			success : function(data) {
				if(data == true) {
					showPrompt("删除成功!");
				} else {
					alert("失败!")
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("ajax error");
			}
		});
	}
};
	
/*******************************************************************************
* //defaults 配置，插件参数默认配置
* Copyright (C) 2012~2013梨花寨
*
* @author xyang <lihuazhai_com@163.com>
* @site www.lihuazhai.com
* @date 2013.7.22
*******************************************************************************/
// 插件的defaults
$.fn.lhz_table.defaults = {
	tbData : null,
	updateUrl : null,
	background : 'yellow'
};

})(jQuery);
