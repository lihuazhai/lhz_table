var setting = {
	"selectOption" : [{
		"id" : "tracker_id",
		"name" : "����"
	}, {
		"id" : "priority_id",
		"name" : "���ȼ�"
	}, {
		"id" : "assigned_to_id",
		"name" : "�����"
	}],

	"filterData" : {
		"defaulted" : {
			"tracker_id_1" : {
				"leftParentheses" : true,
				"defaultCondition" : "=",
				"defaultOption" : "Ĭ��ֵ-����_1",
				"rightParentheses" : true,
				"andor" : "and"
			},
			"priority_id_6" : {
				"leftParentheses" : false,
				"defaultCondition" : "!",
				"defaultOption" : "Ĭ��ֵ-���ȼ�",
				"rightParentheses" : false,
				"andor" : "or"
			},
			"tracker_id_3" : {
				"leftParentheses" : true,
				"defaultCondition" : "=",
				"defaultOption" : "Ĭ��ֵ-����_3",
				"rightParentheses" : true,
				"andor" : "and"
			}
		},

		"selection" : {
			"tracker_id" : {
				"name" : "����",
				"condition" : [{
					"id" : "2",
					"value" : "=",
					"name" : "����",
					'hasOption' : '1'
				}, {
					"id" : "3",
					"value" : "!",
					"name" : "������",
					'hasOption' : '0'
				}, {
					"id" : "1",
					"value" : "all",
					"name" : "ȫ��",
					'hasOption' : '1'
				}],
				"defaultCondition" : "!",
				"type" : "text",
				"defaultOption" : "2",
				"defalutName" : ""
			},
			"priority_id" : {
				"name" : "���ȼ�",
				"condition" : [{
					"id" : "2",
					"value" : "=",
					"name" : "����",
					"hasOption" : "1"
				}, {
					"id" : "3",
					"value" : "!",
					"name" : "������",
					'hasOption' : '1'
				}, {
					"id" : "1",
					"value" : "all",
					"name" : "ȫ��",
					"hasOption" : "1"
				}],
				"defaultCondition" : "all",
				"type" : "select",
				"option" : [{
					"id" : "123",
					"value" : "low",
					"name" : "��"
				}, {
					"id" : "124",
					"value" : "general",
					"name" : "��ͨ"
				}, {
					"id" : "123",
					"value" : "hight",
					"name" : "hight"
				}, {
					"id" : "123",
					"value" : "urgent",
					"name" : "����"
				}],
				"defaultOption" : "low"
			},
			"assigned_to_id" : {
				"name" : "�����",
				"condition" : [{
					"id" : "2",
					"value" : "=",
					"name" : "����",
					"hasOption" : "1"
				}, {
					"id" : "5",
					"value" : "!",
					"name" : "������",
					"hasOption" : "1"
				}, {
					"id" : "3",
					"value" : "none",
					"name" : "��",
					"hasOption" : "0"
				}, {
					"id" : "1",
					"value" : "6",
					"name" : "ȫ��",
					"hasOption" : "1"
				}],
				"defaultCondition" : "=",
				"type" : "date",
				"defaultOption" : "�ı�ֵ"
			}
		}
	},

	"row" : {
		"id" : {
			"name" : "id",
			"show" : true,
			"edit" : true,
			"links" : false,
			"type" : "text",
			"width" : "3%"
		},
		"title" : {
			"name" : "����",
			"show" : true,
			"links" : true,
			"edit" : "1",
			"type" : "text",
			"width" : "15%"
		},
		"description" : {
			"name" : "����",
			"show" : true,
			"links" : true,
			"edit" : true,
			"type" : "text",
			"width" : ""
		},
		"subject" : {
			"name" : "������Ŀ",
			"show" : true,
			"links" : false,
			"edit" : true,
			"type" : "text",
			"width" : ""
		},
		"assignee" : {
			"name" : "������",
			"show" : true,
			"links" : true,
			"edit" : true,
			"type" : "text",
			"width" : ""
		},
		"priority" : {
			"name" : "���ȼ�",
			"show" : true,
			"edit" : true,
			"links" : false,
			"type" : "select",
			"options" : {
				"P7" : "P7",
				"p8" : "p8"
			},
			"width" : "5%"
		},
		"status" : {
			"name" : "״̬",
			"show" : true,
			"edit" : true,
			"links" : false,
			"type" : "select",
			"options" : {
				"completed" : "�ѽ��",
				"complete" : "��ͣ��"
			},
			"width" : "5%"
		},
		"startDate" : {
			"name" : "��ʼʱ��",
			"show" : true,
			"links" : false,
			"edit" : true,
			"type" : "date",
			"width" : "8%"
		},
		"endDate" : {
			"name" : "����ʱ��",
			"show" : true,
			"links" : false,
			"edit" : true,
			"type" : "date",
			"width" : "8%"
		},
		"percent" : {
			"name" : "��ɰٷֱ�(%)",
			"show" : true,
			"links" : false,
			"edit" : true,
			"type" : "percent",
			"options" : {
				"20%" : "20%",
				"30%" : "30%",
				"60%" : "60%"
			},
			"width" : "6%"
		}
	},

	"group" : [{
		"id" : "status",
		"name" : "״̬",
		"selected" : "0"
	}, {
		"id" : "title",
		"name" : "����",
		"selected" : "0"
	}, {
		"id" : "assigned_to",
		"name" : "ָ�ɸ�",
		"selected" : "0"
	}, {
		"id" : "updated_on",
		"name" : "������",
		"selected" : "0"
	}, {
		"id" : "fixed_version",
		"name" : "Ŀ��汾",
		"selected" : "0"
	}, {
		"id" : "startDate",
		"name" : "�������",
		"selected" : "0"
	}, {
		"id" : "endDate",
		"name" : "����ʱ��",
		"selected" : "0"
	}]

}