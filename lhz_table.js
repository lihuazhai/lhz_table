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
			loadFilter(opts);
			$(".lhz-data-show").html(loadDate(opts));
			if(opts.config.ifEdit) {
				edit(opts);
			}
			
			var pageMsg = {'boxId':'lhz-page','totalNum':50,'totalPage':25,
			'pageSize':10,'currentPage':2,'pageCallBack':_callBackPage,'url':opts.selectUrl};
			_createPage(pageMsg);
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


//分页回调操作
function _callBackPage(url,currentPage,pageSize) {
	daoMethods.selectData(url,currentPage,pageSize);
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
		frame_box += '<div class="lhz-filter-box clearfix"><div class="filter_box"><ul></ul></div><div class="sel_box"></div></div>';
		frame_box += '<div class="lhz-control-box"></div>';
		frame_box += '<div class="lhz-data-show"></div>';
		frame_box += '<div class="lhz-page"></div>';
		frame_box += '</div>';
	return frame_box;
};

// 载入过滤器
function loadFilter(opts){
	var filterHtml = '';
		filterHtml += '<select class="add_filter_item"><option value="0">'+opts.lang.choose+'</option>';
		var itemList = opts.setting.filterData;		
		for (item in itemList){
		   filterHtml += '<option value="'+itemList[item].id+'">'+itemList[item].name+'</option>';
		};
		filterHtml += '</select>';
		
		$(".lhz-filter-box .sel_box").html(filterHtml);
		
		var filterBtns = '';
			filterBtns = '<div class="filterBtns"><input type="button" value="搜索" data-btn="search" /></div>';
		
		
		$(".lhz-filter-box").after(filterBtns);
		
		$(".lhz-table-box .filterBtns").find("input[data-btn='search']").click(function(){
			var selJson = '[';
			$(".lhz-filter-box .filter_box li").each(function(){
				var field = $(this).children().eq(0).val();
				var condition = $(this).children().eq(1).val();
				var value = $(this).children().eq(2).val();
				if(value == ""){
					value = " ";
				}
                if ($(this).index() == $(".lhz-filter-box .filter_box li").length - 1) {
                    selJson += '{"field":"'+field+'", "condition" : "'+condition+'", "value" : "'+value+'"}';
                }else{
					selJson += '{"field":"'+field+'", "condition" : "'+condition+'", "value" : "'+value+'"},';
                }
			});			
			selJson += ']';
				
		    var obj = eval ("(" + selJson + ")");			
			//var obj = JSON.parse(selJson); 			
			//alertTest(obj);
			
			daoMethods.selectDataTemp(opts.selectUrl,1,20,obj);

		});
		
		$('.add_filter_item').change(function(){
			var thisValue = $(this).val();
			var filterItem = '<li>';
				filterItem += '<input type="checkbox" value="'+thisValue+'" />';
				filterItem += '<select>';
				var condition = opts.setting.filterData[thisValue].condition;
				var conditionLength = condition.length;
				for (var i=0; i < conditionLength; i++) {
				  filterItem += '<option value="'+condition[i].value+'">'+condition[i].name+'</option>';
				};
				filterItem += '<select>';
				if(opts.setting.filterData[thisValue].type == "text"){
					 filterItem += '<input type="text" />';
				}else if(opts.setting.filterData[thisValue].type == "select"){
					
					filterItem += '<select>';
					var selectObj = opts.setting.filterData[thisValue].option;
					var optionLength = selectObj.length;
					for (var i=0; i < optionLength; i++) {
					  filterItem += '<option value="'+selectObj[i].value+'">'+selectObj[i].name+'</option>';
					};
					filterItem += '<select>';
				}
				filterItem += '</li>';
				
				$(".lhz-filter-box .filter_box ul").append(filterItem);
				
		});
			
}

// 私有函数：载入控制
function loadControl(opts) {
	var control_html = '<div>' + '<input type="button" value="新增" class="lhz-table-addNew" />' + '<input type="button" value="删除" class="lhz-table-del" />' + '</div>';

	$(".lhz-control-box").html(control_html);

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
			dataHtml = _showData(jsonData);
		}, "json");
	} else {
		dataJson = opts.source.tbData;
		dataHtml = _showData(dataJson);
	}
	return dataHtml;
};

//= showData生成TdHtml 
function _showData(dataJson) {
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
};

function renew(data){
	var jsonData = formatData(data);
	var dataHtml = _showData(data);
	$(".lhz-data-show").html(dataHtml);
};

//分页
function _createPage(msg) {
	var boxId = msg.boxId;
	var totalNum = msg.totalNum;
	var totalPage = msg.totalPage;
	var pageSize = msg.pageSize;
	var currentPage = msg.currentPage;
	var pageCallBack = msg.pageCallBack;
	var url = msg.url;

	var pageHtml = '';

	if(totalPage > 1) {
		if(currentPage != 1) {
			pageHtml += '<a class="prePage" href="javascript:void(0);">上一页</a>';
		}
		if(currentPage == "1") {
			pageHtml += '<a class="currentPage" href="javascript:void(0);">1</a>';
		} else {
			pageHtml += '<a href="javascript:void(0);">1</a>';
		}

		if(currentPage > 4) {
			pageHtml += '<span>...</span>';
		}

		var midLastPage = currentPage + 4 >= totalPage ? totalPage : currentPage + 4;
		var midFirstPage = currentPage - 2 <= 2 ? 2 : currentPage - 2;

		for(var i = midFirstPage; i < midLastPage; i++) {
			if(i != currentPage) {
				pageHtml += '<a href="javascript:void(0);">' + i + '</a>';
			} else {
				pageHtml += '<a class="currentPage" href="javascript:void(0);">' + currentPage + '</a>';
			}
		}

		if(currentPage < totalPage - 4) {
			pageHtml += '<span>...</span>';
		}
		if(currentPage == totalPage) {
			pageHtml += '<a class="currentPage" href="javascript:void(0);">' + totalPage + '</a>';
		} else {
			pageHtml += '<a href="javascript:void(0);">' + totalPage + '</a>';
		}
		if(currentPage != totalPage) {
			pageHtml += '<a class="nextPage" href="javascript:void(0);">下一页</a>';
		}
	} else {
		pageHtml += '<a class="currentPage" href="javascript:void(0);">1</a>';
	}
	pageHtml += '<span>每页显示<b>';
	pageHtml += '<select id="pageSize" class="page-size" name="pageSize">';

	if(pageSize == "10") {
		pageHtml += '<option value="10" selected="selected">10</option>';
	} else {
		pageHtml += '<option value="10">10</option>';
	}
	if(pageSize == "20") {
		pageHtml += '<option value="20" selected="selected">20</option>';
	} else {
		pageHtml += '<option value="20">20</option>';
	}
	if(pageSize == "30") {
		pageHtml += '<option value="30" selected="selected">30</option>';
	} else {
		pageHtml += '<option value="30">30</option>';
	}
	if(pageSize == "50") {
		pageHtml += '<option value="50" selected="selected">50</option>';
	} else {
		pageHtml += '<option value="50">50</option>';
	}
	if(pageSize == "100") {
		pageHtml += '<option value="100" selected="selected">100</option>';
	} else {
		pageHtml += '<option value="100">100</option>';
	}
	pageHtml += '</select></b>条</span>';
	pageHtml += '<span>共 <b>' + totalPage + '</b>页</span> <span>共<b>' + totalNum + '</b>条数据</span>';

	$("." + boxId).html(pageHtml);
	
	//点击页码
	$("." + boxId +" a").click(function(){
		var currentPage;
		var text = jQuery(this).text();
		var oldPage = jQuery("#" + boxId + " a.currentPage").text();
		var oldNum = parseInt(oldPage);
		if (text == "上一页") {
			currentPage = oldNum - 1;
		} else if (text == "下一页") {
			currentPage = oldNum + 1;
		} else {
			currentPage = parseInt(text);
		}
		var pageSize = jQuery("#pageSize").val();
		pageCallBack(url,currentPage, pageSize);
	});
	
    //改变页显示行数
	$("." + boxId + " #pageSize").change(function() {
		var currentPage = 1;
		var pageSizeNew = jQuery("#pageSize").val();

		pageCallBack(url,currentPage, pageSize);
	});

};


	
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
	},
	selectData : function (url,currentPage,pageSize) {
		$.ajax({
			type : "POST",
			url : url,
			dataType : "json",
			data : {
				"action" : "sel",
				"currentPage" : currentPage,
				"pageSize" : pageSize
			},
			success : function(data) {
				if(data != false) {
					showPrompt("查询成功!");
					renew(data);					
				} else {
					alert("失败!")
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("ajax error");
			}
		});
	  
	},
	selectDataTemp : function (url,currentPage,pageSize,selData) {
		$.ajax({
			type : "POST",
			url : url,
			dataType : "json",
			data : {
				"action" : "selTemp",
				"currentPage" : currentPage,
				"pageSize" : pageSize,
				"selData" : selData
			},
			success : function(data) {
				if(data != false) {
					showPrompt("查询成功!");
					renew(data);					
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
