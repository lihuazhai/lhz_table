define(function() {
	// 私有函数：取页面路径
	function _getPath() {
		var js = document.scripts;
		var jsPath = "";
		for (var i = 0; i < js.length; i++) {
			if (js[i].src.indexOf("lhz_table") != "-1") {
				jsPath = js[i].src.substring(0, js[i].src.lastIndexOf("/"));
				break;
			}
		}
		return jsPath;
	};
	// 私有函数：加载js或css
	function _loadjscssfile(filename, filetype) {
		if (filetype == "js") {
			var fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", filename);
		} else if (filetype == "css") {
			var fileref = document.createElement('link');
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}
		if (typeof fileref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	};
	return {
		getPath: _getPath,
		loadjscssfile: _loadjscssfile
	}
});