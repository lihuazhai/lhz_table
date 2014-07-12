    var repayName = (function() {

        var $input = $('#repay_name'),
            //历史信用卡btn
            $btn = $('#repay_history_btn'),
            //历史还款信用卡层
            $layer = $('#repay_history_layer'),
            //历史还款信用卡列表
            $list = $('#repay_history_list'),

            bindEvent = function() {
                $btn.on('click', function(e) {
                    e.stopPropagation();
                    $layer.toggle();
                });
                // 点击页面其它部分，模块隐藏
                listener.clickBody.add(function() {
                    $layer.hide();
                });
                // 监听选择历史信用卡广播
                listener.selectHistoryPayment.add(function(data) {
                    $input.val(data.name).trigger('blur');
                });
                // 点击历史数据广播
                $list.on('click', '.list-item', function(e) {
                    e.stopPropagation();
                    $layer.hide();
                    var $item = $(this),
                        _oData = {};
                    ['name', 'cardNo', 'bankCode', 'bankName', 'remindDate', 'mobile'].forEach(function(item, i) {
                        _oData[item] = $item.attr('data-' + item);
                    });
                    // 广播选择历史信用卡
                    listener.selectHistoryPayment.fire(_oData);
                });
            };

        return {
            init: function() {
                bindEvent();
            },
            // 检测规则
            checkRule: function(reg) {
                var _val = $input.val();
                var _reg = reg || /^[\u4E00-\u9FFF]+(?:·[\u4E00-\u9FFF]+)*$/;
                if (_val.length == 0) {
                    setTip($input, 'warning', '请填写持卡人姓名');
                    
                    return false;
                    
                } else if (_val.length < 2) {
                    
                    setTip($input, 'error', '持卡人姓名至少2个字');
                    
                    return false;
                    
                } else if (!_reg.test(_val)) {
                    
                    setTip($input, 'error', '持卡人姓名格式不正确');
                    return false;
                }
                setTip($input, 'success');
                return true;
            },
            input: $input
        }

    })();

    repayName.init();