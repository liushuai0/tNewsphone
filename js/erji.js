//获取地址栏参数
(function($) {
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
})(jQuery);
$(function() {
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
			// $("#nav1000").addClass("abc")
			$("#nav" + $.getUrlParam('id') + "").addClass("abc")
		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	show()

})

//获取文章列表
function show() {
	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/mobile/articlelist",
		dataType: "json",
		data: {
			cate_id:$.getUrlParam('id'),
			page:0
		}, //请求参数

		success: function(res) {
			console.log(res);
			let dataList=res.data.list
			if(dataList!=null&&dataList.length>0){
				$.each(dataList,function(index,value){
					if(dataList[index].thumbnail&&dataList[index].thumbnail!=null){
						$("#cardLists").append("<div class='home_card'><img src='"+dataList[index].thumbnail+"' style='width: 6.6875rem;height: 4.375rem;' ><div class='card_right'><div class='card_title' onclick='toDetail("+dataList[index].id+")'>"+dataList[index].title+"</div><div class='card_date'>"+dataList[index].create_time+"</div></div></div>")
					}else{
						$("#cardLists").append("<div class='home_card'><div class='card_right'  style='width:94%;height:40px'><div class='card_title' onclick='toDetail("+dataList[index].id+")'>"+dataList[index].title+"</div><div class='card_date'>"+dataList[index].create_time+"</div></div></div>")
					}
				})
			}else{
				
				$("#cardLists").append("<div style='text-align: center;'>当前数据为空</div>")
			}
			
		},
	})
}
function toDetail(id){
	window.location.href = "detail.html?id="+id
}

function showmore(r){
	window.location.href = "daohangList.html"
}

function tiaozhuan(index) {
	console.log(index);
	if (index == 1000) {
		window.location.href = "index.html"
	} else {
		window.location.href = "erji.html?id=" + index
		// $(".daohanglanaaa").removeClass("abc")
		// $("#nav"+index+"").addClass("abc")
	}
}
