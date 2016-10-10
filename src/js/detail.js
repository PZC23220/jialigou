jQuery(function(){
	$('.head').load('head.html',function(){
		var $cartlist = $(".cart");
		if(getCookie('username')){
					$('#login').html('Hi'+ getCookie('username') + '欢迎回嘉！')
					$('a','#rigister').attr('href','login.html').html('[退出]');
				}
				if(getCookie('$count')){
					$('.cart_num').html(getCookie('$count'));
				}
		
		var $count = parseInt($('.cart_num').html());
		
		//给按钮绑定点击事件
		$(".cart_buys").click(function(){
			
			
			var $cruttenli = $('li','.bigimg').eq(0);
			var $copyli = $cruttenli.clone();   //复制li
			
			var startPos = $cruttenli.offset();   //获取li坐标
			var startWidth = $cruttenli.width();  //获取li宽度
			
			//给复制图片添加一个样式
			$copyli.css({
				position: "absolute",
				left:startPos.left,
				top:startPos.top,
				width:startWidth
			});
			
			//把复制的图片放到body中来
			$copyli.appendTo("body");
			
			var cartPos = $cartlist.offset();
			//动画图片飞入购物车
			$copyli.animate({left:cartPos.left,top:cartPos.top,width:0,height:0,opacity:0},1000,function(){
				
				//1.删除复图片
				$copyli.remove();
				//2.弹出对话框
				$('.tips').show().find('span').click(function(){
					$(this).closest('.tips').hide();
				});
				setTimeout(function(){
					$('.tips').hide();
				},3000)
				//3.更改购物车数量
				$count += parseInt($('.count_num').find('input').val());
				$('.cart_num').html($count);
				//3.设置cookie
				var $pro ='';
				var proString = getCookie('G01').split(',');
				var num = parseInt($('input','.count_num').val()) + parseInt(proString[4]);
				$pro +=$('#G01').html() + ',' + $('span','.alt').html() + ',' + $cruttenli.find('img').attr('src') + ',' + $('em','.price').html() + ','+ num;
				var d = new Date('2016-11-1');
				var cookieText = setCookie('G01',$pro,d,'/');
				var total = setCookie('$count',$count,d,'/');
		 	});
	 
		});
	});
	$('.foot').load('foot.html');
	$('.content1_nav').load('nav.html',function(){
		$('.nav').find('h2').click(function(){
			$('.nav_list').toggle();
		});
	});
	
	$('.smallimg').find('img').on('mouseenter',function(){
		var index = $(this).index();
		$('li','.bigimg').hide().eq(index).show();
//		$('li','.bigimg').eq(index).pzoom()
	});
	var $num = $('.count_num').find('input').val();
	$('.count_num').find('i:first').click(function(){
		if($num == 0){
			$('.count_num').find('input').val(0);
		}else{
			$('.count_num').find('input').val($num--);
		}
		
	});
	$('.count_num').find('i:last').click(function(){
		$('.count_num').find('input').val($num++);
	});
	
	$('li','.info_nav').click(function(){
		$(this).addClass('hover').siblings('li').removeClass();
		var index = $(this).index();
		$('li','.change').hide().eq(index).show();
	});
	
	$('li','.bigimg').each(function(){
			$(this).pzoom();
	});
});
