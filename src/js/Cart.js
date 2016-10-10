jQuery(function($){
	//加载头部
	$('.head_nav').load('head.html div.head_nav_content',function(){
		if(getCookie('username')){   //判断是否已登录
			$('#login').html('Hi'+ getCookie('username') + '欢迎回嘉！')
			$('a','#rigister').attr('href','login.html').html('[退出]');
		}
	});
	$('.foot').load('foot.html');   //加载尾部
	//cookiede 读取
	if(getCookie('G01')){   
		var str =  getCookie('G01')
		createLi(str);
	}
	if(getCookie('G02')){
		var str =  getCookie('G02')
		createLi(str);
	}
	if(getCookie('G03')){
		var str =  getCookie('G03')
		createLi(str);
	}
	//创建li存放商品
	function createLi(str){
		var proString = str.split(',');  //将cookie值分割成数组
		var $li = $('<li/>')   //创建li
		var $p1 = $('<p/>').addClass('btn');   //创建p标签并添加class名（全选）
		$('<input type="checkbox" name="check_item" />').appendTo($p1);   //创建多选框并追加到$p1中
		$('<span/>').appendTo($p1);   //创建span标签并追加到$p1中
		$p1.appendTo($li);   //将$p1追加到$li中
		var $a = $('<a/>').attr('href','detail.html').addClass('_img');   //创建a标签并添加class名
		$('<img/>').attr('src',proString[2]).appendTo($a);   //创建img标签并追加到$a中（商品图片）
		$a.appendTo($li);   //将$a追加到$li中
		var $p2 = $('<p/>').addClass('goods_title');  //创建p标签并追加到$a中
		$('<a/>').attr('href','detail.html').html(proString[1]).appendTo($p2);//创建a标签并追加到$p2中（商品标题）
		$('<span/>').html(proString[0]).appendTo($p2);//创建span标签并追加到$p2中（供货号）
		$('<span/>').html('颜色/尺码 ：').appendTo($p2);//创建span标签并追加到$p2中（颜色尺码）
		$('<span/>').html(proString[1]).appendTo($p2);//创建span标签并追加到$p2中（商品标题）
		$p2.appendTo($li);//将$p2追加到$li中
		$('<span/>').addClass('price').html('&yen;<i>'+proString[3]+'</i>').appendTo($li);//创建span标签追加到$li中(商品价格) 
		var $p3 = $('<p/>').addClass('count');//创建p标签并添加class名（数量增减）
		$('<i/>').html('-').addClass('cut').appendTo($p3);  //创建标签并追加到$p3中（减号）
		$('<span/>').html(proString[4]).appendTo($p3);
		$('<i/>').html('+').addClass('add').appendTo($p3);
		$p3.appendTo($li);
		$('<span/>').addClass('jljia').html('&yen;<i>'+proString[3]+'</i>').appendTo($li); 
		var $p4 = $('<p/>').addClass('operate');
		$('<span/>').html('加入收藏夹').appendTo($p4);
		$('<span/>').html('删除').addClass('del').appendTo($p4);
		$p4.appendTo($li);
		
		$li.appendTo('.goods_list');
	}
	
	//复选框的选取
//	$('.btn').find("input").click(function(){
//		if($('input:checked')){
//			$(this).siblings('span').addClass('active');
//		}else{
//			$(this).siblings('span').removeClass('active');
//		}
//		
//	});
	//商品数量加减
	$('.cut').click(function(){
		var $count = $(this).siblings('span').html();
		if($count == 0){
			$(this).siblings('span').html(0);
		}else{
			$(this).siblings('span').html(--$count);
		}
		total();
	});
	$('.add').click(function(){
		var $count = $(this).siblings('span').html();
		$(this).siblings('span').html(++$count);
		total();
	});
	//删除商品	
	$('.del').on('click',function(){
		console.log(1);
		$(this).closest('li').remove();
//		removeCookie('name');
	});
	
	//全选
	$('.all').on('click',function(){
		$(":checkbox").each(function(){
			this.checked = true;
		});

	});
	//删除选中商品
	$('span','.account').eq(0).click(function(){
		$(":checkbox",'.btn').each(function(){
			if(this.checked == true){
				$(this).closest('li').remove();
//				removeCookie('name');
			}
		});
	});
	//清空购物车
	$('span','.account').eq(1).click(function(){
		$(":checkbox",'.btn').each(function(){
			$(this).closest('li').remove();
		});
	});
	
	total();
	//计算总价
	function total(){
		var $total=0,$_total=0;
		$('.price').each(function(){
			$total += $(this).find('i').html()*$(this).siblings('.count').find('span').html();
		});
		$('.jljia').each(function(){
			$_total += $(this).find('i').html()*$(this).siblings('.count').find('span').html();
		});
		
		$('i','.total').html($total.toFixed(2))
		$('i','._total').html($_total.toFixed(2));
	}
	
	//猜你喜欢
	$('button','.like_list').each(function(idx,ele){
		$(this).click(function(){
			var name = 'G0' +(idx+1);
			var $pro ='';
			var num = 0;
			if(getCookie(name)){
				var proString = getCookie(name).split(',');
				num = parseInt(proString[4]) + 1;
			}else{
				num++;
			}
			$pro += name + ',' + $(this).siblings('p').html() + ',' + $(this).siblings('a').find('img').attr('src') + ',' + $(this).siblings('span').find('i').html() + ','+ num;
			var d = new Date('2016-11-1');
			var cookieText = setCookie(name,$pro,d,'/');
			var $count = 1;
			if(getCookie('$count')){
				$count = parseInt(getCookie('$count'));
			}
			var total = setCookie('$count',++$count,d,'/');
			createLi(getCookie(name));
		})
	});
	
});