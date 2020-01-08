//获取地址栏参数
(function($) {
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
})(jQuery);
$(function(){
	$.ajax({
		type: "post", //请求方式
		url: "http://admin.jrjl.net/api/home/mobile/nav",
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
		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	
	
	$.ajax({
		type: "post", //请求方式
		url: "http://admin.jrjl.net/api/home/mobile/detail",
		dataType: "json",
		data: {
			id:$.getUrlParam('id')
		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			console.log(res);
			console.log(res.data.data);
			$("#isaudio").hide()
			$("#title").append(res.data.data.subtitle)
			document.title = res.data.data.subtitle;
			$("#date").append(res.data.data.create_time)
			$("#c_neirong").append(res.data.data.content)
			$("#bianji").append(res.data.data.editor)
			$("#laiyuan").append(res.data.data.source)
			if(res.data.data.audio!=null&&res.data.data.audio!=''){
				$("#isaudio").show()
				$("#audio1").attr("src",res.data.data.audio)
			}
			// var video
			// video = $("#video").get(0);//赋值标签
			// video.on("loadeddata", function () {//加载完成事件，调用函数
			//     var canvas = document.createElement("canvas");//canvas画布
			//     canvas.width = video.videoWidth * scale;
			//     canvas.height = video.videoHeight * scale;
			//     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);//画图
			//     video.setAttribute("poster", canvas.toDataURL("image/png"));//关键一步 —— 设置标签的 poster 属性的值为 base64 编译过后的canvas绘图。
			//     })
			//相关新闻处理
			let tuijianList=res.data.tuijianlist
			$.each(tuijianList,function(index,value){
			
				let str1=tuijianList[index].create_time.split(" "); 
			
				$("#xiangguanList").append("<div class='xg_list'><span class='xg_list_title' onclick='toDetail("+tuijianList[index].id+")'>"+tuijianList[index].title+"</span><span class='xg_list_date'>"+str1[0]+"</span></div>")
			})
			$("img").on('click',function(){
				WeixinJSBridge.invoke('imagePreview', {
					current: this.src,
					urls: [ // 所有图片的URL列表，数组格式
						this.src
					]
				})
			})
			
			
			
			
			
		},
	})
	
	
	$("#zanting").hide()
	$("#bofang").on('click',function(){
		  var player = $("#audio1")[0]; /*jquery对象转换成js对象*/
		  player.play();/*暂停*/
			$("#bofang").hide()		
			$("#zanting").show()
		        
	})
	$("#zanting").on('click',function(){
		  var player = $("#audio1")[0]; /*jquery对象转换成js对象*/
		            player.pause(); /*播放*/
					$("#bofang").show()
					$("#zanting").hide()
	})
	
	$("video").each(function(i){
		
		$("video").attr("poster","http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg")
	 });
	
})
        

function toDetail(id){
	window.location.href="detail.html?id="+id
}
function tiaozhuan(index) {
	console.log(index);
	if (index != 1000) {
		window.location.href = "erji.html?id=" + index
	}else{
		window.location.href = "index.html"
	}
}
