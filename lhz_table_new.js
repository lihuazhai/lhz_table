/*!
 * jQuery Cookie Plugin v1.9.0
 */
(function($) {
	require(['../src/introduce.js'], function(introduc){
		var jsPath = introduc.getPath();
		introduc.loadjscssfile("../skin/default/css/reset.css", "css");
		introduc.loadjscssfile("../skin/default/css/lhz_table.css", "css");
		introduc.loadjscssfile(jsPath + "/My97DatePicker/WdatePicker.js", "js");
	});

	$.fn.lhz_table = function(options) {
		if(options === undefined){
			return this.each(function() {
				var tbObj = $(this);
				require(['../src/createDom.js'], function(create){
					tbObj.html(create.defaultShow());
				}); 
			});
		}else{
			var opts = $.extend({}, $.fn.lhz_table.defaults, options);
			return this.each(function() {
				var tbObj = $(this);
				require(['../src/createDom.js'], function(create){
					if(opts.needControl){
						tbObj.html(create.loadFrame());
						//载入控制按钮
						create.loadControl(opts);
						//载入过滤器
						create.loadFilter(opts);
					}else{
						var tpl = create.loadTable();
						var data = opts.tbData;
						tbObj.html(juicer(tpl, data));
					}
				});

				require(['../src/page.js'], function(page) {
					var pageMsg = {
						'boxId': 'lhz-page',
						'totalNum': 58,
						'totalPage': 25,
						'pageSize': 10,
						'currentPage': 2,
						'pageCallBack': function(){
							alert(23423)
						},
						'url': 'baidu.com'
					};

					page.init(pageMsg);
				});

				require(['../src/popup.js'], function(Pop) {
					var renderbefore = function(){
						//alert(2342423)
					}
					var renderafter = function(){
						//alert(1111)
					}

					var pop = new Pop({'title': '百度金融 - 温馨提示','content': '','width': 572,'callback':{renderbefore:renderbefore,renderafter:renderafter}});

                   //pop.setTitle("这是新标题");
                    pop.render();
                    //pop.setContent("这是新内容");
                    pop.show();
				});

				// $(".lhz-data-show").html(loadDate(opts));

				// if (opts.config.ifEdit) {
				// 	edit(opts);
				// }
			});
		}
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
		for (var i = 0; i < l; i++) {
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

		for (var i = 0; i < sourceDataLength; i++) {
			if (sourceData[i].data["pid"] == 0) {
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
			if (objData[nextField].data.next_id != 0) {
				getNext(objData[nextField].data.next_id);
			}
		};

		function getChildNodes(parentNodeId, depth) {
			var childLength = childNodes.length;
			for (var i = 0; i < childLength; i++) {
				if (childNodes[i].data[pId] == parentNodeId) {
					childNodes[i].level = depth;
					arr_result.push(childNodes[i]);
					getChildNodes(childNodes[i].data.id, depth + 1);
				}
			}
		}

		for (var i in objData) {
			if (objData[i].data.prev_id == 0) {
				afterSort.push(objData[i]);
			}
			if (objData[i].data.next_id != 0) {
				getNext(objData[i].data.next_id);
			}
		}
		return afterSort;
	};

	//分页回调操作
	function _callBackPage(url, currentPage, pageSize) {
		daoMethods.selectData(url, currentPage, pageSize);
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
		for (var i = 0; i < dataLeng; i++) {
			dataHtmlTemp += '<tr tr-id=' + dataJson[i].data["id"] + '">';
			dataHtmlTemp += '<td data-field="id"><input type="checkbox" name="ids[]" value="' + dataJson[i].data["id"] + '" /></td>';
			for (var x in dataJson[i].data) {
				dataHtmlTemp += '<td data-field="' + x + '"><span>' + dataJson[i].data[x] + '</span></td>';
			}
			dataHtmlTemp += '</tr>';
		}
		return dataHtmlTemp;
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
			if (tdobj.children().children().length > 0) { //禁止重复点击
				return false;
			}
			var old_val = $(this).text();

			var html_new = '<input type="text" value="' + old_val + '"  />';
			html_new += '<a class="update_btn" href="javascript:void(0);" >提交更新</a>';
			html_new += '<a class="cancel_btn" href="javascript:void(0);" >撤消操作</a>';
			tdobj.html(html_new);

			$(".update_btn").bind("click", {
				opts: opts,
				type: "text"
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
			action: "update",
			id: edit_id,
			field: field,
			new_val: new_val
		};
		//alertTest(edit_data);
		daoMethods.update(event.data.opts.updateUrl, edit_data);
		refresh(event.data.opts);
	};

	//刷新数据
	function refresh(opts) {
		$(".lhz-data-show").html(loadDate(opts));
		if (opts.config.ifEdit) {
			edit(opts);
		}
	};

	function renew(data) {
		var jsonData = formatData(data);
		var dataHtml = _showData(data);
		$(".lhz-data-show").html(dataHtml);
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
		addData: function(url, title, content) {
			$.ajax({
				type: "POST",
				url: url,
				data: {
					"action": "add",
					"title": title,
					"content": content
				},
				success: function(data) {
					if (data == true) {
						showPrompt("新增成功!");
					} else {
						alert("新增失败!")
					}
					$('.pop-dialog').hide();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("ajax error");
				}
			});
		},
		//更新数据操作
		update: function(url, edit_data) {
			$.ajax({
				type: "POST",
				url: url,
				data: edit_data,
				success: function(data) {
					if (data == true) {
						showPrompt("修改成功!");
					} else {
						alert("失败!")
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("ajax error");
				}
			});
		},
		//删除数据操作
		delData: function(url, id) {
			$.ajax({
				type: "POST",
				url: url,
				data: {
					"action": "del",
					"id": id
				},
				success: function(data) {
					if (data == true) {
						showPrompt("删除成功!");
					} else {
						alert("失败!")
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("ajax error");
				}
			});
		},
		selectData: function(url, currentPage, pageSize) {
			$.ajax({
				type: "POST",
				url: url,
				dataType: "json",
				data: {
					"action": "sel",
					"currentPage": currentPage,
					"pageSize": pageSize
				},
				success: function(data) {
					if (data != false) {
						showPrompt("查询成功!");
						renew(data);
					} else {
						alert("失败!")
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("ajax error");
				}
			});

		},
		selectDataTemp: function(url, currentPage, pageSize, selData) {
			$.ajax({
				type: "POST",
				url: url,
				dataType: "json",
				data: {
					"action": "selTemp",
					"currentPage": currentPage,
					"pageSize": pageSize,
					"selData": selData
				},
				success: function(data) {
					if (data != false) {
						showPrompt("查询成功!");
						renew(data);
					} else {
						alert("失败!")
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
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
		tbData: null,
		updateUrl: null
	};

})(jQuery);