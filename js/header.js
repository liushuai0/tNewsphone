// $(function() {
// 	$.ajax({
// 		type: "post", //请求方式
// 		url: "http://ji.agampai.cn/api/home/index/nav",
// 		dataType: "json",
// 		data: {

// 		}, //请求参数
// 		beforeSend: function() {
// 			//请求前的处理
// 		},
// 		success: function(res) {
// 			console.log(res);
// 			var headernav = res.data.navList
// 			for (var i = 0; i < headernav.length; i++) {
// 				$("#daohanglan").append("<li class='nav-item' onclick='tiaozhuan(" + headernav[i].id +
// 					")'><a class='nav-link daohanglanaaa' id='nav" + headernav[i].id + "' data-toggle='pill' href='javascript:void(0)'>" +
// 					headernav[i].name +
// 					"</a></li>");
// 			}
// 			// $("#nav1").addClass("abc")
			
 
// 			$(".daohanglanaaa").each(function() {
// 				$this = $(this);
// 				console.log($this[0].href);
// 				if($this[0].href==String(window.location)){  
// 				    $this.addClass("abc");  
// 				} 
// 				$(this).on('click',function(){
// 					console.log(this);
// 					if(this.id=='nav1'){
						
// 						this.href="index.html"
						
// 						// window.location.href='index.html'
// 					}else{
// 						this.href="erji.html"
// 						console.log(this);
// 						// window.location.href='erji.html'
// 					}
					
					
// 				})
				
// 			});	


// 			// if (getCookie("id") == 1) {
// 			// 	$("#nav1").addClass("active")
// 			// } else if (getCookie("id") == 2) {
// 			// 	$("#nav2").addClass("active")
// 			// } else if (getCookie("id") == 3) {
// 			// 	$("#nav3").addClass("active")
// 			// } else if (getCookie("id") == 4) {
// 			// 	$("#nav4").addClass("active")
// 			// } else if (getCookie("id") == 5) {
// 			// 	$("#nav5").addClass("active")
// 			// } else if (getCookie("id") == 6) {
// 			// 	$("#nav6").addClass("active")
// 			// } else if (getCookie("id") == 7) {
// 			// 	$("#nav7").addClass("active")
// 			// }

// 		},
// 		error: function() {
// 			console.log("错误")
// 			//请求出错处理
// 		}
// 	});

	
		




// 	// 搜索栏搜索
// 	$("#submitBtn").on('click', function(e) {
// 		alert($('#searchInput').val());
// 	})


// })

	   
	
	
