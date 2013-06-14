var setting = {
"selectOption" : [{
	"id" : "tracker_id",
	"name" : "类型"
}, {
	"id" : "priority_id",
	"name" : "优先级"
}, {
	"id" : "assigned_to_id",
	"name" : "分配给"
}],

"filterData" : {           
	"defaulted" : {
		"tracker_id_1" : {
			"leftParentheses" : true,
			"defaultCondition" : "=",
			"defaultOption" : "默认值-类型_1",
			"rightParentheses" : true,
			"andor" : "and"
		},"priority_id_6" : {
			"leftParentheses" : false,
			"defaultCondition" : "!",
			"defaultOption" : "默认值-优先级",
			"rightParentheses" : false,
			"andor" : "or"
		},"tracker_id_3" : {
			"leftParentheses" : true,
			"defaultCondition" : "=",
			"defaultOption" : "默认值-类型_3",
			"rightParentheses" : true,
			"andor" : "and"
		}},
	
	"selection" : {
		"tracker_id" : {
			"name" : "类型",
			"condition" : [{
				"id" : "2",
				"value" : "=",
				"name" : "等于",
				'hasOption' : '1'
			}, {
				"id" : "3",
				"value" : "!",
				"name" : "不等于",
				'hasOption' : '0'
			}, {
				"id" : "1",
				"value" : "all",
				"name" : "全部",
				'hasOption' : '1'
			}],
			"defaultCondition" : "!",
			"type" : "text",
			"defaultOption" : "2",
			"defalutName" : ""
		},
		"priority_id" : {
			"name" : "优先级",
			"condition" : [{
				"id" : "2",
				"value" : "=",
				"name" : "等于",
				"hasOption" : "1"
			}, {
				"id" : "3",
				"value" : "!",
				"name" : "不等于",
				'hasOption' : '1'
			}, {
				"id" : "1",
				"value" : "all",
				"name" : "全部",
				"hasOption" : "1"
			}],
			"defaultCondition" : "all",
			"type" : "select",
			"option" : [{
				"id" : "123",
				"value" : "low",
				"name" : "低"
			}, {
				"id" : "124",
				"value" : "general",
				"name" : "普通"
			}, {
				"id" : "123",
				"value" : "hight",
				"name" : "hight"
			}, {
				"id" : "123",
				"value" : "urgent",
				"name" : "紧急"
			}],
			"defaultOption" : "low"
		},
		"assigned_to_id" : {
			"name" : "分配给",
			"condition" : [{
				"id" : "2",
				"value" : "=",
				"name" : "等于",
				"hasOption" : "1"
			}, {
				"id" : "5",
				"value" : "!",
				"name" : "不等于",
				"hasOption" : "1"
			}, {
				"id" : "3",
				"value" : "none",
				"name" : "无",
				"hasOption" : "0"
			}, {
				"id" : "1",
				"value" : "6",
				"name" : "全部",
				"hasOption" : "1"
			}],
			"defaultCondition" : "=",
			"type" : "date",
			"defaultOption" : "文本值"
		}
	}
},

"row" : {
	"id" : {
		"name" : "id",
		"show" : true,
		"edit": true,
		"links": false,
		"type": "text",
		"width" : "3%"
	},
	"title" : {
		"name" : "标题",
		"show" : true,
		"links": true,
		"edit": "1",
		"type": "text",
		"width" : "15%"
	},
	"description" : {
		"name" : "描述",
		"show" : true,
		"links": true,
		"edit": true,
		"type": "text",
		"width" : ""
	},
	"subject" : {
		"name" : "所属项目",
		"show" : true,
		"links": false,
		"edit": true,
		"type": "text",
		"width" : ""
	},
	"assignee" : {
		"name" : "负责人",
		"show" : true,
		"links": true,
		"edit": true,
		"type": "text",
		"width" : ""
	},
	"priority" : {
		"name" : "优先级",
		"show" : true,
		"edit": true,
		"links": false,
		"type": "select",
		"options": {
			"P7": "P7",
			"p8": "p8"
		},
		"width" : "5%"
	},
	"status" : {
		"name" : "状态",
		"show" : true,
		"edit": true,
		"links": false,
		"type": "select",
		"options": {
			"completed": "已解决",
			"complete": "暂停中"
		},
		"width" : "5%"
	},
	"startDate" : {
		"name" : "开始时间",
		"show" : true,
		"links": false,
		"edit": true,
		"type": "date",
		"width" : "8%"
	},
	"endDate" : {
		"name" : "结束时间",
		"show" : true,
		"links": false,
		"edit": true,
		"type": "date",
		"width" : "8%"
	},
	"percent" : {
		"name" : "完成百分比(%)",
		"show" : true,
		"links": false,
		"edit": true,
		"type": "percent",
		"options": {
			"20%": "20%",
			"30%": "30%",
			"60%": "60%"
		},
		"width" : "6%"
	}
},

"group" : [{
	"id" : "status",
	"name" : "状态",
	"selected" : "0"
}, {
	"id" : "title",
	"name" : "标题",
	"selected" : "0"
}, {
	"id" : "assigned_to",
	"name" : "指派给",
	"selected" : "0"
}, {
	"id" : "updated_on",
	"name" : "更新于",
	"selected" : "0"
}, {
	"id" : "fixed_version",
	"name" : "目标版本",
	"selected" : "0"
}, {
	"id" : "startDate",
	"name" : "完成日期",
	"selected" : "0"
}, {
	"id" : "endDate",
	"name" : "结束时间",
	"selected" : "0"
}]

}