$(function() {

	var index = 0;

	function topScroll() {
		if (index > 2) {
			index = 0
		}
		$(".recome_slow").css({
			"transform": "translate3d(0px, " + index * -30 + "px, 0px)"
		})
		index++;
	}
	setInterval(topScroll, 2000)
	//导航栏内容加载
	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/mobile/nav",
		dataType: "json",
		data: {

		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			// console.log(res);
			var headernav = res.data.navList
			for (var i = 0; i < headernav.length; i++) {
				$("#daohanglan").append("<li class='nav-item' onclick='tiaozhuan(" + headernav[i].id +
					")'><a class='nav-link daohanglanaaa' id='nav" + headernav[i].id +
					"' data-toggle='pill' href='javascript:void(0)'>" +
					headernav[i].title +
					"</a></li>");
					if(i==headernav.length-1){
						$("#nav"+headernav[i].id+"").css({"padding-right": "50px" });
					}
			}
			
			$("#nav1000").addClass("abc")
		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	show()
})

function swiperTo(index){
	window.location.href='detail.html?id='+index
}




function show() {
	console.log("加载首页");
	$("#centerContent").load("shouye.html")
	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/mobile/index",
		dataType: "json",
		data: {

		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			console.log(res);
			
			//快讯处理
			let kuaixunList=res.data.kuaixunlist.data
			$("#kuaixun").append(res.data.kuaixunlist.title)
			$.each(kuaixunList,function(index,value){
				$("#kuaixunList").append("<div><a class='kuaixuntext' href='detail.html?id="+kuaixunList[index].id+"'>"+kuaixunList[index].title+"</a></div>")
			})
			
			//轮播图处理
			let luoboList=res.data.lunbolist
			$.each(luoboList,function(index,value){
				$("#luoboList").append("<div class='swiper-slide'><img src='"+luoboList[index].thumbnail+"' onclick='swiperTo("+luoboList[index].id+")' style='width: 100%;height:auto'><img src='img/jianbian.png' style='width: 100%;height: 30px;position: absolute;left: 0;bottom: 5px;'> <div class='luobotitle'><a style='color:#ffffff;text-decoration:none;padding-left:4%;padding-right:4%;width:92%; font-size:14px;overflow: hidden;	display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;text-overflow: ellipsis; margin-top:-5px; height:30px;line-height:30px' href='detail.html?id="+luoboList[index].id+"'>"+luoboList[index].title+"</div></div>")
			})
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 2000,//可选选项，自动滑动
				 loop: true,
				autoplayDisableOnInteraction : false,
				observer:true,//修改swiper自己或子元素时，自动初始化swiper
				    observeParents:true,//修改swiper的父元素时，自动初始化swiper
					
			})

			
			// 1.头条处理
			let toutiaoList = res.data.toutiaolist.data
			if (toutiaoList != null && toutiaoList.length > 0) {
				$.each(toutiaoList, function(index, value) {
					if (toutiaoList[index].thumbnail && toutiaoList[index].thumbnail != null) {
						if(index==0){
							$("#toutiaoList").append("<div class='home_card' onclick='toDetail(" + toutiaoList[index].id +
								")'><img src='" + toutiaoList[index].thumbnail +
								"' style='width: 6.6875rem;height: 4.375rem;'><div class='card_right'><div class='card_title' onclick='toDetail(" +
								toutiaoList[index].id + ")'>" + toutiaoList[index].title + "</div><div class='card_date'>" + toutiaoList[
									index].create_time +
								"<img src='img/toutioa.png' style='width: 1.5rem;height: 0.9375rem;margin-left:10px;margin-bottom:-2px' ></div></div></div>")
						}else{
							$("#toutiaoList").append("<div class='home_card' onclick='toDetail(" + toutiaoList[index].id +
								")'><img src='" + toutiaoList[index].thumbnail +
								"' style='width: 6.6875rem;height: 4.375rem;'><div class='card_right'><div class='card_title' onclick='toDetail(" +
								toutiaoList[index].id + ")'>" + toutiaoList[index].title + "</div><div class='card_date'>" + toutiaoList[
									index].create_time +
								"</div></div></div>")
						}
						
					} else {
						$("#toutiaoList").append("<div class='home_card' onclick='toDetail(" + toutiaoList[index].id +
							")'><div class='card_right' style='width:94%'><div class='card_title' onclick='toDetail(" + toutiaoList[
								index].id + ")'>" + toutiaoList[index].title + "</div><div class='card_date'>" + toutiaoList[index].create_time +
							"<img src='img/toutioa.png' style='width: 1.5rem;height: 0.9375rem;' ></div></div></div>")
					}
				})
			} else {
				console.log("头条没有数据");
			}

			//2.要闻处理
			let yaowenList = res.data.yaowenlist.data
			
			if (yaowenList != null && yaowenList.length > 0) {
				$("#yaowen").append(res.data.yaowenlist.title)	
				
				$.each(yaowenList, function(index, value) {
					$("#yaowenList").append("<div class='yaowenListTitle'><a href='detail.html?id=" + yaowenList[index].id +
						"' class='yaowenListText'>" + yaowenList[index].title + "</a></div>")
				})
			} else {
				console.log("要闻没有数据");
			}
			//3.聚焦处理
			let jujiaolist = res.data.jujiaolist.data
			
			if (jujiaolist != null && jujiaolist.length > 0) {
				$("#jujiao").append(res.data.jujiaolist.title)
				$.each(jujiaolist, function(index, value) {
					if (jujiaolist[index].thumbnail) {
						$("#jujiaoList").append(
							"<div class='jujiao_card'><div class='jj_cardleft'><div class='jj_card_title' onclick='toDetail(" +
							jujiaolist[index].id + ")'>" + jujiaolist[index].title + "</div><div class='jj_card_date'>" + jujiaolist[
								index].create_time + "</div></div><div class='jj_cardright'><img src='" + jujiaolist[index].thumbnail +
							"' class='jj_cardrightimg'></div></div>")
					} else {
						$("#jujiaoList").append(
							"<div class='jujiao_card'><div class='jj_cardleft'><div class='jj_card_title' onclick='toDetail(" +
							jujiaolist[index].id + ")'>" + jujiaolist[index].title + "</div><div class='jj_card_date'>" + jujiaolist[
								index].create_time + "</div></div><div class='jj_cardright'></div></div>")
					}
				})
			} else {
				console.log("聚焦没有数据");
			}

			//4.访谈处理
			let fangtanList = res.data.fangtanlist.data
			
			if (fangtanList != null && fangtanList.length > 0) {
				$("#fangtan").append(res.data.fangtanlist.title)
				$.each(fangtanList, function(index, value) {
					if (index == 0) {
						$("#fangtanimg1").attr('src', fangtanList[0].thumbnail)
						$("#fangtanimg1").attr('onclick', "swiperTo("+fangtanList[0].id+")")
						
						$("#fangtantext").append("<a style='color: #FFFFFF;text-decoration:none' href='detail.html?id="+fangtanList[0].id+"'>"+fangtanList[0].title+"</a>")
						
					} else {
						$("#fangtanTwo").append("<div class='fangtan_b1'><img src='" + fangtanList[index].thumbnail +
							"' class='fangtan_b1_Img'><div class='fangtan_b1_title' onclick='toDetail(" + fangtanList[index].id +
							")'>" + fangtanList[index].title + "</div></div>")
					}
				})
			} else {
				console.log("聚焦没有数据");
			}
			//5.大交通处理
			let shenduList = res.data.shendulist.data
			
			if (shenduList != null && shenduList.length > 0) {
				$("#shendu").append(res.data.shendulist.title)
				$.each(shenduList, function(index, value) {
					if (index == 0) {
						$("#shenduImg0").attr("src", shenduList[0].thumbnail)
						$("#shenduTitle0").append("<a style='color:#333333;text-decoration:none' href='detail.html?id=" + shenduList[
							0].id + "'>" + shenduList[0].title + "</a>")
						$("#shenduDate0").append(shenduList[0].create_time)
					} else {
						$("#shenduList").append("<div class='shendu_title' onclick='toDetail(" + shenduList[index].id +
							")'><span style='font-weight: bold;margin-right:5px'>·</span>" + shenduList[index].title + "</div>")
					}
				})
			} else {
				console.log("聚焦没有数据");
			}

			//6.延边新闻处理
			let yanbianList = res.data.yanbianlist.data
			
			if (yanbianList != null && yanbianList.length > 0) {
				$("#yanbian").append(res.data.yanbianlist.title)
				$.each(yanbianList, function(index, value) {
					if (yanbianList[index].thumbnail && yanbianList[index].thumbnail != null) {
						$("#yanbianList").append("<div class='home_card' onclick='toDetail(" + yanbianList[index].id +
							")'><img src='" + yanbianList[index].thumbnail +
							"' style='width: 6.6875rem;height: 4.375rem;'><div class='card_right'><div class='card_title'>" +
							yanbianList[index].title + "</div><div class='card_date'>" + yanbianList[index].create_time +
							"</div></div></div>")
					} else {
						$("#yanbianList").append("<div class='home_card' onclick='toDetail(" + yanbianList[index].id +
							")'><div class='card_right' style='width:94%'><div class='card_title'>" + yanbianList[index].title +
							"</div><div class='card_date'>" + yanbianList[index].create_time + "</div></div></div>")
					}
				})
			} else {
				console.log("头条没有数据");
			}
			//7.江城新闻处理
			let jiangchengList = res.data.bianchenglist.data
			
			if (jiangchengList != null && jiangchengList.length > 0) {
				$("#jiangcheng").append(res.data.bianchenglist.title)
				$.each(jiangchengList, function(index, value) {
					if (jiangchengList[index].thumbnail && jiangchengList[index].thumbnail != null) {
						$("#jiangchengList").append("<div class='home_card' onclick='toDetail(" + jiangchengList[index].id +
							")'><img src='" + jiangchengList[index].thumbnail +
							"' style='width: 6.6875rem;height: 4.375rem;'><div class='card_right'><div class='card_title'>" +
							jiangchengList[index].title + "</div><div class='card_date'>" + jiangchengList[index].create_time +
							"</div></div></div>")
					} else {
						$("#jiangchengList").append("<div class='home_card' onclick='toDetail(" + jiangchengList[index].id +
							")'><div class='card_right' style='width:94%'><div class='card_title'>" + jiangchengList[index].title +
							"</div><div class='card_date'>" + jiangchengList[index].create_time + "</div></div></div>")
					}
				})
			} else {
				console.log("头条没有数据");
			}

			//8.人事处理
			let renshiList = res.data.renshilist.data
			
			if (renshiList != null && renshiList.length > 0) {
				$("#renshi").append(res.data.renshilist.title)
				$.each(renshiList, function(index, value) {
					$("#renshiList").append("<div class='shendu_title' onclick='toDetail(" + renshiList[index].id +
						")'><span style='font-weight: bold;margin-right:5px'>·</span>" + renshiList[index].title + "</div>")
				})
			} else {
				console.log("头条没有数据");
			}
			//9.身边楷模处理
			let kaimoList = res.data.kaimolist.data
			
			if (kaimoList != null && kaimoList.length > 0) {
				$("#kaimo").append(res.data.kaimolist.title)
				
				$.each(kaimoList, function(index, value) {
					if (index == 0) {
						$("#kaimoimg1").attr('src', kaimoList[0].thumbnail)
						$("#kaimoimg1").attr('onclick', "swiperTo("+kaimoList[0].id+")")
						$("#kaimotext").append("<a style='color: #FFFFFF;text-decoration:none' href='detail.html?id="+kaimoList[0].id+"'>"+kaimoList[0].title+"</a>")
					} else {
						$("#kaimoList").append("<div class='shendu_title' onclick='toDetail(" + kaimoList[index].id +
								")'><span style='font-weight: bold;margin-right:5px'>·</span>" + kaimoList[index].title + "</div>")
						
					}
					})
			} else {
				console.log("头条没有数据");
			}
			
			
			console.log(res.data.yaowenlist.cate_id);
			$("#yaowenMore").on('click',function(){
				window.location.href="shouyeList.html?cate_id="+res.data.yaowenlist.cate_id
			})
		
			$("#yaowenMoreB").on('click',function(){
					let chakanList=[]
					$.ajax({
						type: "post", //请求方式
						url: "http://ji.agampai.cn/api/home/mobile/addmore",
						dataType: "json",
						data: {
							cate_id:res.data.yaowenlist.cate_id
						}, //请求参数
						success: function(res) {
							console.log(res.data.data);
							chakanList=res.data.data
							if (chakanList != null && chakanList.length > 0) {
								$.each(chakanList, function(index, value) {
									$("#yaowenList").append("<div class='yaowenListTitle'><a href='detail.html?id=" + chakanList[index].id +
										"' class='yaowenListText'>" + chakanList[index].title + "</a></div>")
								})
							} else {
								console.log("要闻没有数据");
							}
						},
						error(error){
							console.log(error);
						}
					})
					$("#yaowenMoreB").hide()
					$("#yaowenList").css({"padding-bottom": "20px","border-bottom":"8px solid #f9f9f9","margin-bottom": "10px" });
			})
			
			
			
			
			
			
			
			
			
			
			$("#jianduMore").on('click',function(){
				window.location.href="shouyeList.html?cate_id="+res.data.jujiaolist.cate_id
			})
			$("#jianduMoreB").on('click',function(){
					let chakanList=[]
					$.ajax({
						type: "post", //请求方式
						url: "http://ji.agampai.cn/api/home/mobile/addmore",
						dataType: "json",
						data: {
							cate_id:res.data.jujiaolist.cate_id
						}, //请求参数
						success: function(res) {
							console.log(res.data.data);
							chakanList=res.data.data
							if (chakanList != null && chakanList.length > 0) {
								
								$.each(chakanList, function(index, value) {
									if (chakanList[index].thumbnail) {
										$("#jujiaoList").append(
											"<div class='jujiao_card'><div class='jj_cardleft'><div class='jj_card_title' onclick='toDetail(" +
											chakanList[index].id + ")'>" + chakanList[index].title + "</div><div class='jj_card_date'>" + chakanList[
												index].create_time + "</div></div><div class='jj_cardright'><img src='" + chakanList[index].thumbnail +
											"' class='jj_cardrightimg'></div></div>")
									} else {
										$("#jujiaoList").append(
											"<div class='jujiao_card'><div class='jj_cardleft'><div class='jj_card_title' onclick='toDetail(" +
											chakanList[index].id + ")'>" + chakanList[index].title + "</div><div class='jj_card_date'>" + chakanList[
												index].create_time + "</div></div><div class='jj_cardright'></div></div>")
									}
								})
							} else {
								console.log("聚焦没有数据");
							}
						},
						error(error){
							console.log(error);
						}
					})
					$("#jianduMoreB").hide()
					$("#jujiaoList").css({"padding-bottom": "20px","border-bottom":"8px solid #f9f9f9","margin-bottom": "10px" });
			})
			
			

			$("#fangtanMore").on('click',function(){
				window.location.href="shouyeList.html?cate_id="+res.data.fangtanlist.cate_id
			})
			$("#fangtanMoreB").on('click',function(){
					let chakanList=[]
					$.ajax({
						type: "post", //请求方式
						url: "http://ji.agampai.cn/api/home/mobile/addmore",
						dataType: "json",
						data: {
							cate_id:res.data.fangtanlist.cate_id
						}, //请求参数
						success: function(res) {
							console.log(res.data.data);
							chakanList=res.data.data
							if (chakanList != null && chakanList.length > 0) {
								$.each(chakanList, function(index, value) {
									
										$("#fangtanMore9").append("<div class='shendu_title' onclick='toDetail(" + chakanList[index].id +
											")'><span style='font-weight: bold;margin-right:5px'>·</span>" + chakanList[index].title + "</div>")
								})
							} else {
								console.log("要闻没有数据");
							}
						},
						error(error){
							console.log(error);
						}
					})
					$("#fangtanMoreB").hide()
					
					$("#fangtanMore9").css({"padding-bottom": "20px","margin-bottom": "20px" });
			})
			
			
			
			
			
			
			$("#dajiaotongMore").on('click',function(){
				window.location.href="shouyeList.html?cate_id="+res.data.shendulist.cate_id
			})
			$("#shenduListB").on('click',function(){
					let shenduList=[]
					$.ajax({
						type: "post", //请求方式
						url: "http://ji.agampai.cn/api/home/mobile/addmore",
						dataType: "json",
						data: {
							cate_id:res.data.shendulist.cate_id
						}, //请求参数
						success: function(res) {
							console.log(res.data.data);
							shenduList=res.data.data
							if (shenduList != null && shenduList.length > 0) {
								
								$.each(shenduList, function(index, value) {
										$("#shenduList").append("<div class='shendu_title' onclick='toDetail(" + shenduList[index].id +
											")'><span style='font-weight: bold;margin-right:5px'>·</span>" + shenduList[index].title + "</div>")
									
								})
							} else {
								console.log("聚焦没有数据");
							}
						},
						error(error){
							console.log(error);
						}
					})
					$("#shenduListB").hide()
					
					$("#shenduList").css({"padding-bottom": "20px","border-bottom":"8px solid #f9f9f9","margin-bottom": "20px" });
			})
			
			
			
			
			
			
			
			
			
			
			
			
			
			$("#yanbianMore").on('click',function(){
				window.location.href="shouyeList.html?cate_id="+res.data.yanbianlist.cate_id
			})
			$("#yanbianMoreB").on('click',function(){
					let yanbianList=[]
					$.ajax({
						type: "post", //请求方式
						url: "http://ji.agampai.cn/api/home/mobile/addmore",
						dataType: "json",
						data: {
							cate_id:res.data.yanbianlist.cate_id
						}, //请求参数
						success: function(res) {
							console.log(res.data.data);
							yanbianList=res.data.data
							if (yanbianList != null && yanbianList.length > 0) {
								
								$.each(yanbianList, function(index, value) {
									if (yanbianList[index].thumbnail && yanbianList[index].thumbnail != null) {
										$("#yanbianList").append("<div class='home_card' onclick='toDetail(" + yanbianList[index].id +
											")'><img src='" + yanbianList[index].thumbnail +
											"' style='width: 6.6875rem;height: 4.375rem;'><div class='card_right'><div class='card_title'>" +
											yanbianList[index].title + "</div><div class='card_date'>" + yanbianList[index].create_time +
											"</div></div></div>")
									} else {
										$("#yanbianList").append("<div class='home_card' onclick='toDetail(" + yanbianList[index].id +
											")'><div class='card_right' style='width:94%'><div class='card_title'>" + yanbianList[index].title +
											"</div><div class='card_date'>" + yanbianList[index].create_time + "</div></div></div>")
									}
								})
							} else {
								console.log("头条没有数据");
							}
						},
						error(error){
							console.log(error);
						}
					})
					$("#yanbianMoreB").hide()
					
					$("#yanbianList").css({"padding-bottom": "20px", });
			})
			
			
			
			
			
			$("#jiangchengMore").on('click',function(){
				window.location.href="shouyeList.html?cate_id="+res.data.bianchenglist.cate_id
			})
			
			$("#jiangchengMoreB").on('click',function(){
					let yanbianList=[]
					$.ajax({
						type: "post", //请求方式
						url: "http://ji.agampai.cn/api/home/mobile/addmore",
						dataType: "json",
						data: {
							cate_id:res.data.bianchenglist.cate_id
						}, //请求参数
						success: function(res) {
							console.log(res.data.data);
							yanbianList=res.data.data
							if (yanbianList != null && yanbianList.length > 0) {
								
								$.each(yanbianList, function(index, value) {
									if (yanbianList[index].thumbnail && yanbianList[index].thumbnail != null) {
										$("#jiangchengList").append("<div class='home_card' onclick='toDetail(" + yanbianList[index].id +
											")'><img src='" + yanbianList[index].thumbnail +
											"' style='width: 6.6875rem;height: 4.375rem;'><div class='card_right'><div class='card_title'>" +
											yanbianList[index].title + "</div><div class='card_date'>" + yanbianList[index].create_time +
											"</div></div></div>")
									} else {
										$("#jiangchengList").append("<div class='home_card' onclick='toDetail(" + yanbianList[index].id +
											")'><div class='card_right' style='width:94%'><div class='card_title'>" + yanbianList[index].title +
											"</div><div class='card_date'>" + yanbianList[index].create_time + "</div></div></div>")
									}
								})
							} else {
								console.log("头条没有数据");
							}
						},
						error(error){
							console.log(error);
						}
					})
					$("#jiangchengMoreB").hide()
					
					$("#jiangchengList").css({"padding-bottom": "20px","border-bottom":"8px solid #f9f9f9","margin-bottom": "20px" });
			})
			
			
			
			
			
			
			$("#renshiMore").on('click',function(){
				window.location.href="shouyeList.html?cate_id="+res.data.renshilist.cate_id
			})
			
			$("#renshiMoreB").on('click',function(){
					let renshiList=[]
					$.ajax({
						type: "post", //请求方式
						url: "http://ji.agampai.cn/api/home/mobile/addmore",
						dataType: "json",
						data: {
							cate_id:res.data.renshilist.cate_id
						}, //请求参数
						success: function(res) {
							console.log(res.data.data);
							renshiList=res.data.data
							if (renshiList != null && renshiList.length > 0) {
								
								$.each(renshiList, function(index, value) {
									$("#renshiList").append("<div class='shendu_title' onclick='toDetail(" + renshiList[index].id +
										")'><span style='font-weight: bold;margin-right:5px'>·</span>" + renshiList[index].title + "</div>")
								})
							} else {
								console.log("头条没有数据");
							}
						},
						error(error){
							console.log(error);
						}
					})
					$("#renshiMoreB").hide()
					
					$("#renshiList").css({"padding-bottom": "20px","border-bottom":"8px solid #f9f9f9","margin-bottom": "20px" });
			})
			
			
			
			
			
			
			
			
			
			
			
			
			$("#kaimoMore").on('click',function(){
				window.location.href="shouyeList.html?cate_id="+res.data.kaimolist.cate_id
			})
			$("#kaimoMoreB").on('click',function(){
					let kaimoList=[]
					$.ajax({
						type: "post", //请求方式
						url: "http://ji.agampai.cn/api/home/mobile/addmore",
						dataType: "json",
						data: {
							cate_id:res.data.kaimolist.cate_id
						}, //请求参数
						success: function(res) {
							console.log(res.data.data);
							kaimoList=res.data.data
							if (kaimoList != null && kaimoList.length > 0) {
	
								
								$.each(kaimoList, function(index, value) {
									
										$("#kaimoList").append("<div class='shendu_title' onclick='toDetail(" + kaimoList[index].id +
												")'><span style='font-weight: bold;margin-right:5px'>·</span>" + kaimoList[index].title + "</div>")
									})
							} else {
								console.log("头条没有数据");
							}
						},
						error(error){
							console.log(error);
						}
					})
					$("#kaimoMoreB").hide()
					
					$("#kaimoList").css({"padding-bottom": "20px","border-bottom":"8px solid #f9f9f9","margin-bottom": "20px" });
			})
		
			
		},
	})

}

//查看更多下拉
function chakanMore(id){
	
}

//标题右侧显示更多
function showmore(){
	console.log("显示更多");
	window.location.href="daohangList.html"
}


function tiaozhuan(index) {
	console.log(index);
	if (index != 1000) {
		window.location.href = "erji.html?id=" + index
	}else{
		window.location.href = "index.html"
	}
}

function toDetail(id) {
	// $("#centerContent").empty()
	// $("#centerContent").load("erji.html")
	window.location.href = "detail.html?id=" + id
}
