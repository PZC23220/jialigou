jQuery(function($){
	
	$('.head').load('html/head.html',function(){
		$('#logo').find('img').attr('src','img/ladygood.png');
		$('#login').find('a').attr('href','html/login.html');
		$('#rigister').find('a').attr('href','html/rigister.html');
		$('form').attr('action','html/goods.html');
		$('.cart').find('a').attr('href','html/Cart.html');
		if(getCookie('username')){
			console.log(1);
			$('#login').html('Hi'+ getCookie('username') + '欢迎回嘉！')
			$('a','#rigister').attr('href','html/login.html').html('[退出]');
		}
		if(getCookie('$count')){
			$('.cart_num').html(getCookie('$count'));
		}
	});
	$('.foot').load('html/foot.html',function(){
		$('.foot_info').find('img').attr('src','css/img/foot_info.jpg');
		$('.help_2d').find('img').attr('src','css/img/jlg_2d.jpg');
		$('.call').find('img').attr('src','css/img/call_rz.jpg');
		$('.txt').find('img').attr('src','css/img/pic.gif');
		$('.rz').find('img').eq(0).attr('src','css/img/kx.jpg');
		$('.rz').find('img').eq(1).attr('src','css/img/360.jpg');
		$('.rz').find('img').eq(2).attr('src','css/img/alipay_s.gif');
		$('.rz').find('img').eq(3).attr('src','css/img/hn110_s.gif');
	});
	
	$('.banner').pcarousel();
	$(".list_content").on('mouseenter',function(){
		$(this).find('a').not('.title').addClass("phover");
		$(this).find('.list_content_list2').show();
	}).on('mouseleave',function(){
		$(this).find('a').not('.title').removeClass();
		$(this).find('.list_content_list2').hide();
	});
	
	$('.days').on('click','li',function(){
		$(this).addClass('active').siblings('li').removeClass();
		var index = $(this).index();
		$('.hot_show').eq(index).show().siblings('.hot_show').hide();
	})
	
	$('.hot_list').on('mouseenter',function(){
		$(this).find('.prev').show();
		$(this).find('.next').show();
	}).on('mouseleave',function(){
		$(this).find('.prev').hide();
		$(this).find('.next').hide();
	});
	
	$('.prev').each(function(){
		$(this).click(function(){
			$(this).pClick('prev');
		});
	});
	$('.next').each(function(){
		$(this).click(function(){
			$(this).pClick('prev');
		});
	})
})
