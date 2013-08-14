var setting = {
	"filterData" : {
		"title" : {
			"id" : "title",
			"name" : "标题",
			"defaultCondition" : "equal",
			"condition" : [{
				"hasOption" : false,
				"name" : "[所有]",
				"value" : "all"
			}, {
				"hasOption" : true,
				"name" : "等于",
				"value" : "="
			}, {
				"hasOption" : true,
				"name" : "包含",
				"value" : "include"
			}],
			"type" : "text"
		},
		"type" : {
			"id" : "type",
			"name" : "类别",
			"type" : "select",
			"condition" : [{
				"hasOption" : false,
				"name" : "[所有]",
				"value" : "all"
			}, {
				"hasOption" : true,
				"name" : "等于",
				"value" : "equal"
			}, {
				"hasOption" : true,
				"name" : "不等于",
				"value" : "notequal"
			}],
			"defaultOption" : "bug",
			"option" : [{
				"name" : "普通任务",
				"value" : "daily"
			}, {
				"name" : "Bug任务",
				"value" : "bug"
			}]
		}
	},

	"rowData" : {
		"id" : {
			"name" : "id",
			"show" : true,
			"edit" : true,
			"links" : false,
			"type" : "text",
			"width" : "3%"
		},
		"title" : {
			"name" : "标题",
			"show" : true,
			"links" : true,
			"edit" : "1",
			"type" : "text",
			"width" : "15%"
		},
		"description" : {
			"name" : "内容",
			"show" : true,
			"links" : true,
			"edit" : true,
			"type" : "text",
			"width" : ""
		}
	},

	"groupData" : [{
		"id" : "title",
		"name" : "标题",
		"selected" : "0"
	}, {
		"id" : "description",
		"name" : "内容",
		"selected" : "0"
	}]

}
