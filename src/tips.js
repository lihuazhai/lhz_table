define(function() {
	//显示操作提示
	function showPrompt(text) {
		var html = '<span class="lhz-showPrompt">' + text + '</span>';
		$(".lhz-table-box").append(html);

		var hidePrompt = function() {
			$(".lhz-showPrompt").hide();
		};
		setTimeout(hidePrompt, 1000);
	};


	return {
		init: showPrompt
	}


});