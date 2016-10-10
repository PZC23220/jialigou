jQuery(function(){
	$('.foot').load('foot.html');
	//监听输入框内容
	$('.txt').each(function(idx,ele){
		ele.oninput = function(){
			if($(this).val()){     //不为空时显示清空按钮
				$(this).siblings('div').show();
			}else{        //为空时隐藏清空按钮
				$(this).siblings('div').hide();
			}
			
		}
		
	});
	//点击清空按钮清空输入框内容
	$('div','.contain').click(function(){
		$(this).siblings('input').val("");
	});
	//生成随机验证码
	$('input').eq(3).val(Random()).click(function(){
		$('input').eq(3).val(Random());
	});
//	//如果cookie中的用户名存在则自动填写表单内容
//	if(getCookie('username')){
//		$('input').eq(0).val(getCookie('username'));
//		$('input').eq(1).val(getCookie('psw'));
//	}
	var a = b = c = false;
	//给手机号输入框添加失去焦点事件
	$('input').eq(0).blur(function(){
		if($(this).val() == getCookie('username')){   //判断手机号是否合法
			a = true;
			$('.hint').eq(0).hide();
		}else{
			$('.hint').eq(0).show();
		}
	});
	//给密码框添加失去焦点事件
	$('input').eq(1).blur(function(){
		if($(this).val() == getCookie('psw')){   //判断密码是否合法
			b = true;
			$('.hint').eq(1).hide();
		}else{
			$('.hint').eq(1).show();
		}
	});
	//给验证码框添加失去焦点事件
	$('input').eq(2).blur(function(){
		if($(this).val() == $('input').eq(3).val()){   //判断验证码是否正确
			c = true;
			$('.hint').eq(2).hide();
		}else{
			$('.hint').eq(2).show();
		}
	});
	
//	$('input').eq(4).click(function(){
//		if(this.checked){
//			$('input').eq(0).val(getCookie('username'));
//			$('input').eq(1).val(getCookie('psw'));
//		}
//	});
	$('button').eq(0).click(function(){
		if(a && b && c){  // 当以上事件都为真时，提示注册成功，否则失败
			alert("登录成功");
		}else{
			alert("登录失败！")
			return false;
		}
	});
	
	//封装函数获取随机验证码
	function Random(){
		var str = "";
		for(var i=0; i<4; i++){
			var isNum = parseInt(Math.random() * 10) % 2;
			if(isNum){
				str += parseInt(Math.random() * 10);
			}else{
				str += String.fromCharCode(parseInt(Math.random() * 26) + 65);
			}
		}
		return str;
	}
	
})