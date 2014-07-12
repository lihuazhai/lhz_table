define(function() {
	//用于测试,显示json详情
	function _alertTest(obj) {
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
	};

	//pop弹窗框
	function pop_dialog(){
		var popHtml = '<div class="pop-dialog">'
			  +'<div class="pop-dialog-title"></div>'
			  +'<div class="pop-dialog-content"></div>'
			  +'<div class="pop-dialog-footer"></div>'
	          +'</div>';
	    $("body").append(popHtml);
	};

	return {
        alertTest : _alertTest;
	};
});
