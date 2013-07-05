// 私有函数：取页面路径
function getPath() {
	var js = document.scripts;
	var jsPath = "";
	for(var i = 0; i < js.length; i++) {
		if(js[i].src.indexOf("lhz_table") != "-1") {
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

//用于测试,显示json详情
function alertTest(obj) {
	var str = JSON.stringify(obj)
	alert(str);
	//用于测试
};

//判断某值是否是数组中的元素
Array.prototype.in_array = function(e)  {  
	for(i=0;i<this.length;i++)  {  
		if(this[i] == e)  
		return true;  
	}  
	return false;  
}

//pop弹窗框
function pop_dialog(){
	var popHtml = '<div class="pop-dialog">'
				  +'<div class="pop-dialog-title"></div>'
				  +'<div class="pop-dialog-content"></div>'
				  +'<div class="pop-dialog-footer"></div>'
	              +'</div>';
        $("body").append(popHtml);
}
