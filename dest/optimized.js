define("cookie",[],function(){return{say:function(){alert("这是模块化tab函数")}}}),define("util",[],function(){return{say:function(e){alert("util: "+e)}}}),require(["cookie","util"],function(e,t){t.say("hello"),e.say()}),define("main",function(){});