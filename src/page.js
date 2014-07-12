define(function() {
	//分页
 	function CreatePage(msg){
		this.boxId = msg.boxId;
		this.totalNum = msg.totalNum || 10;
		this.totalPage = msg.totalPage  || 10;
		this.pageSize = msg.pageSize  || 10;
		this.currentPage = msg.currentPage  || 10;
		this.pageCallBack = msg.pageCallBack;
		this.url = msg.url;
	};

	function showSelect(pageSize){
		var pageHtml = "";
		pageHtml += '<span>每页显示<b>';
		pageHtml += '<select id="pageSize" class="page-size" name="pageSize">';
		if (pageSize == "10") {
			pageHtml += '<option value="10" selected="selected">10</option>';
		} else {
			pageHtml += '<option value="10">10</option>';
		}
		if (pageSize == "20") {
			pageHtml += '<option value="20" selected="selected">20</option>';
		} else {
			pageHtml += '<option value="20">20</option>';
		}
		if (pageSize == "30") {
			pageHtml += '<option value="30" selected="selected">30</option>';
		} else {
			pageHtml += '<option value="30">30</option>';
		}
		if (pageSize == "50") {
			pageHtml += '<option value="50" selected="selected">50</option>';
		} else {
			pageHtml += '<option value="50">50</option>';
		}
		if (pageSize == "100") {
			pageHtml += '<option value="100" selected="selected">100</option>';
		} else {
			pageHtml += '<option value="100">100</option>';
		}
		return pageHtml;
	};

	CreatePage.prototype.show = function(){
		var pageHtml = '';
		if (this.totalPage > 1) {
			if (this.currentPage != 1) {
				pageHtml += '<a class="prePage" href="javascript:void(0);">上一页</a>';
			}
			if (this.currentPage == "1") {
				pageHtml += '<a class="currentPage" href="javascript:void(0);">1</a>';
			} else {
				pageHtml += '<a href="javascript:void(0);">1</a>';
			}

			if (this.currentPage > 4) {
				pageHtml += '<span>...</span>';
			}

			var midLastPage = this.currentPage + 4 >= this.totalPage ? this.totalPage : this.currentPage + 4;
			var midFirstPage = this.currentPage - 2 <= 2 ? 2 : this.currentPage - 2;

			for (var i = midFirstPage; i < midLastPage; i++) {
				if (i != this.currentPage) {
					pageHtml += '<a href="javascript:void(0);">' + i + '</a>';
				} else {
					pageHtml += '<a class="currentPage" href="javascript:void(0);">' + this.currentPage + '</a>';
				}
			}

			if (this.currentPage < this.totalPage - 4) {
				pageHtml += '<span>...</span>';
			}
			if (this.currentPage == this.totalPage) {
				pageHtml += '<a class="currentPage" href="javascript:void(0);">' + this.totalPage + '</a>';
			} else {
				pageHtml += '<a href="javascript:void(0);">' + this.totalPage + '</a>';
			}
			if (this.currentPage != this.totalPage) {
				pageHtml += '<a class="nextPage" href="javascript:void(0);">下一页</a>';
			}
		} else {
			pageHtml += '<a class="currentPage" href="javascript:void(0);">1</a>';
		}
		pageHtml += showSelect(this.pageSize);
		pageHtml += '</select></b>条</span>';
		pageHtml += '<span>共 <b>' + this.totalPage + '</b>页</span> <span>共<b>' + this.totalNum + '</b>条数据</span>';

		$("." + this.boxId).html(pageHtml);
	};

	CreatePage.prototype.bindEvent = function(){
		var obj = this;//转移this,防止与jquery对象的this冲突
		//点击页码
		$("." + this.boxId + " a").click(function() {
			var currentPage;
			var text = jQuery(this).text();
			var oldPage = jQuery("#" + obj.boxId + " a.currentPage").text();
			var oldNum = parseInt(oldPage);
			if (text == "上一页") {
				currentPage = oldNum - 1;
			} else if (text == "下一页") {
				currentPage = oldNum + 1;
			} else {
				currentPage = parseInt(text);
			}
			var pageSize = jQuery("#pageSize").val();
			obj.pageCallBack(obj.url, obj.currentPage, obj.pageSize);
		});

		//改变页显示行数
		$("." + this.boxId + " #pageSize").change(function() {
			var currentPage = 1;
			var pageSizeNew = jQuery("#pageSize").val();
			obj.pageCallBack(obj.url, obj.currentPage,obj.pageSize);
		});
	};

	return {
		init: function(msg){
			var page = new CreatePage(msg);
			page.show();
			page.bindEvent();
		}
	}
});