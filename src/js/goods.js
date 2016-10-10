jQuery(function($){
	$('.head').load('head.html',function(){
		if(getCookie('username')){
			$('#login').html('Hi'+ getCookie('username') + '欢迎回嘉！')
			$('a','#rigister').attr('href','login.html').html('[退出]');
		}
		if(getCookie('$count')){
			$('.cart_num').html(getCookie('$count'));
		}
	});
	$('.foot').load('foot.html');
	$('.content1_nav').load('nav.html',function(){
		$('.nav').find('h2').click(function(){
			$('.nav_list').toggle();
		});
	});
	
	
	//懒加载效果
	var $goodslist = $('.goods');
	var $ul = $('<ul/>').addClass('list');
	$.ajaxSetup({
		url:"../../../data/goodslist.json",
		success:function(res){
			console.log(res);
			$.each(res,function(idx,item){
				var $li = $('<li/>');
				var $a =$('<a/>').attr('href',item.url);
				$('<img/>').attr('src',item.imgurl).appendTo($a);
				$a.appendTo($li);
				$('<p/>').addClass('title').html('<a href='+ item.url +'>'+ item.title +'</a>').appendTo($li);
				var $cost = $('<p/>').addClass('cost');
				$('<em/>').html("&yen;"+item.price).appendTo($cost);
				$('<i/>').html('参考价：'+item.cost).appendTo($cost);
				$('<button/>').html('立即购买').appendTo($cost);
				$cost.appendTo($li);
				
				$ul.append($li);
			});
			$ul.appendTo($goodslist);
		}
	});
	
	$.ajax();
	var n = 0;
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();
		
		if(scrollTop >= $(document).height()-$(window).height()-100){
			n++;
			if(n < 10){
				$.ajax();
			}
			
		}
	})
})