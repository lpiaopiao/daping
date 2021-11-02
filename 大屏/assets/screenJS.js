var screen = (function() {

	//	动态切换联合奖惩的数据
	function poll() {
		let ele = $('.sgs-list')[0]
        if (ele.classList.contains('sgs-title-light')) {
            //表示含有'checked'这个类名
            ele.classList.remove('sgs-title-light')
        } else {
            ele.classList.add('sgs-title-light')
        }
    }
    setInterval(() => {
    	poll()
	},5000)

	//数据总览双公示
	$.post(ctx + "/screenController/dataScreening.action",{} , function(data) {
		var indexNum = 0;//归集数据
		var frsj = 0;//法人数据
		var frzt = 0;//法人主体
		var zrrsj = 0;//自然人数据
		var zrrzt = 0;//自然人主体
		var frxzxk = 0;//法人行政许可
		var zrrxzxk = 0;//自然人行政许可
		var sgs = 0;//双公示
		var frxzcf = 0;//法人行政处罚
		var zrrxzcf = 0;//自然人行政处罚
		for(var i=0; i<data.length; i++){
			var arr= data[i];
			frsj = thousandBitSeparator1(arr.frdata);
			frzt = thousandBitSeparator1(arr.frzt);
			indexNum = arr.rkl;
			frxzcf = thousandBitSeparator1(arr.sgsfrxzcf);
			frxzxk = thousandBitSeparator1(arr.sgsfrxzxk);
			sgs = thousandBitSeparator1(arr.sgssum);
			zrrxzcf = thousandBitSeparator1(arr.sgszrrxzcf);
			zrrxzxk = thousandBitSeparator1(arr.sgszrrxzxk);
			zrrsj = thousandBitSeparator1(arr.zrrdata);
			zrrzt = thousandBitSeparator1(arr.zrrzt);

		}
		flipNumCard(indexNum, 10, '#TNum');
		$("#frsj").html(frsj);
		$("#frzt").html(frzt);
		$("#zrrsj").html(zrrsj);
		$("#zrrzt").html(zrrzt);

		$("#frxzxk").html(frxzxk);
		$("#zrrxzxk").html(zrrxzxk);
		$("#sgs").html(sgs);
		$("#frxzcf").html(frxzcf);
		$("#zrrxzcf").html(zrrxzcf);
	});

	//城市信用监测
	$.post(ctx + "/screenController/cityCredit.action",{} , function(data) {
		$("#csxyjc").html(data.ORDER_NAME + "(" + data.SCORE + "分)" );
	});


	//业务办理信用惠民
	$.post(ctx + "/screenController/businessCredit.action",{} , function(data) {
		var xyxfData = 0;//信用修复
		var xyhcData = 0;//信用核查
		var jlpjData = 0;//激励评价
		var cxshData = 0;//诚信商户
		var hldxData = 0;//惠利对象
		var xyxfTime = "— —";//信用修复时间
		var xyhcTime = "— —";//信用核查时间

		for(var i=0; i<data.length; i++){
			var arr= data[i];
           if(arr.TYPE=="type_01"){
			   xyxfData = thousandBitSeparator(arr.COUNT_NUM);
			   xyxfTime= arr.TIME;
		   }else if(arr.TYPE=="type_02"){
			   xyhcData = thousandBitSeparator(arr.COUNT_NUM);
			   xyhcTime= arr.TIME;
		   }else if(arr.TYPE=="type_03"){
			   jlpjData = thousandBitSeparator(arr.COUNT_NUM);
		   }else if(arr.TYPE=="type_04"){
			   cxshData = thousandBitSeparator(arr.COUNT_NUM);
		   }else if(arr.TYPE=="type_05"){
			   hldxData = thousandBitSeparator(arr.COUNT_NUM);
		   }

		}
		$("#xyxfData").html(xyxfData);
		$("#xyxfTime").html(xyxfTime);
		$("#xyhcData").html(xyhcData);
		$("#xyhcTime").html(xyhcTime);

		$("#jlpjData").html(jlpjData);
		$("#cxshData").html(cxshData);
		$("#hldxData").html(hldxData);
	});

	//惩戒对象
	rewardsPunishments("黑名单");
	//奖励对象
	rewardsPunishments("红名单");

	function rewardsPunishments(type){
		var allCjdx = 0;
		var allJldx = 0;
		var html = "";
		$.post(ctx + "/screenController/rewardsPunishments.action",{type:type} , function(data) {
			if(type=="黑名单"){
				for(var i=0; i<data.length; i++){
					var arr= data[i];
					if(arr.TYPE_NAME =="全部"){
						allCjdx = arr.NUM;
					}else{
						html +='<p><span title="'+arr.TYPE_NAME+'">'+arr.TYPE_NAME+'</span><span title="'+arr.NUM+'">'+arr.NUM+'</span></p>';
					}
				}
				$("#allCjdx").html(allCjdx);
				$("#cjdx").append(html);
			}else{
				for(var i=0; i<data.length; i++){
					var arr= data[i];
					if(arr.TYPE_NAME =="全部"){
						allJldx = arr.NUM;
					}else{
						html +='<p><span title="'+arr.TYPE_NAME+'">'+arr.TYPE_NAME+'</span><span title="'+arr.NUM+'">'+arr.NUM+'</span></p>';
					}
				}
				$("#allJldx").html(allJldx);
				$("#jldx").append(html);
			}

		});
	}


	//区县信用排名
	$.post(ctx + "/screenController/cityOrderName.action",{} , function(data) {
		var htmlleft = "";
		var htmlright = "";
		var time= "中经网    — —"
		for(var i=0; i<data.length; i++){
			var arr= data[i];
			if(i < 3){
				time = "中经网    "+ arr.TIME;
				htmlleft += '<li class="table-td">'+
					'<span class="td-pm cBlue2"></span>'+
					'<span class="td-xmmc">'+arr.CITY+'</span>'+
					'</li>';
			}else if(i > 2 && i<12){
				htmlleft += '<li class="table-td">'+
					'<span class="td-pm cBlue2"><i>'+arr.ORDER_CITY+'</i></span>'+
					'<span class="td-xmmc">'+arr.CITY+'</span>'+
					'</li>';
			}else{
				htmlright += '<li class="table-td">'+
					'<span class="td-pm cBlue2"><i>'+arr.ORDER_CITY+'</i></span>'+
					'<span class="td-xmmc">'+arr.CITY+'</span>'+
					'</li>';
			}
		}
		$("#time").html(time);
		$("#qxxypmleft").append(htmlleft);
		$("#qxxypmright").append(htmlright);
		// 区县信用排名 轮询
		let tableBody = document.querySelector('.table-body')
		liList = tableBody.getElementsByTagName('li')
		// 获取要高亮的元素并循环
		async  function fn(list) {
			for (let i = 0; i < list.length; i++) {
				await addClass(i).then(() => {
					i==list.length-1 && fn(liList)
                if(i == list.length-1){
                    liList[list.length-1].classList.remove('background')
                }
			})

			}
		}
		//  添加类名并删除上一个元素的类名
		function addClass(i) {
			return new Promise((resolve, reject) => {
				i!==liList.length && liList[i].classList.add('background')
			i !==0 && liList[i-1].classList.remove('background')
			setTimeout(function(){
				resolve()
			},5000)
		})
		}
		//  高亮区县信用排名
		fn(liList)

		var tabData = {
			'项目运营对比': 'XMYYDBSUBTAB',
			'城市信用监测': 'CSXYJCSUBTAB'
		}
		$("#XMDBTAB span").click(function () {
			var indexTab = $(this).html();
			var nextTab = $(this).siblings('span').html();
			var indexItem = tabData[indexTab];

			$("#XMDBTAB span").html(nextTab);
			$("#XMDBTAB span.active").html(indexTab);

			if (indexItem == 'XMYYDBSUBTAB') {
				$("#XMYYDBSUBTAB").removeClass("active").siblings().addClass("active");
				$("#XMYYDBTABCOM").addClass("active").siblings().removeClass("active");
			} else {
				$("#CSXYJCSUBTAB").removeClass("active").siblings().addClass("active");
				$("#CSXYJCTABCOM").addClass("active").siblings().removeClass("active");
			}
		});
	});
    var optionOne1;

	//四舍五入至万或亿
	function toWorY(value) {
		if (value < 10000) {
			return thousandBitSeparator(value);//如果小于一万有大于以前，调用加千位分割符的方法
		} else if (value >= 10000 && value <= 100000000) {
			return (value / 10000).toFixed(2) + "万";
		} else if (value > 100000000) {
			return (value / 100000000).toFixed(2) + "亿";
		}
	}

    var timer;
    var box1 = document.querySelector('.mess-list1');
    var parent1 = document.querySelector('.drag1');
    var lis1 = document.querySelectorAll(".drag1 li");
    var parent12 = document.querySelector(".drag1-2");
	//市直部门数据归集
	$.post(ctx + "/screenController/szcityOrdertj.action",{type:'市直部门'} , function(data) {
        clearInterval(timer)
        for (let i = 0; i < data.length; i++) {
            lis1.length && drag.removeChild(lis1[i]);
            let w = Math.round(20 / data[0].value * data[i].value)||0;
            let html = "<li>" +
                '<span class="li-sp1">' + (i + 1) + '</span><span class="li-sp2">' + data[i]
                    .name + '</span><span class="range" style="width:' + w +
                '%"></span><span class="li-sp3">' +
				toWorY(data[i].value) +
                '</span></li>';
            $('#drag1').append(html)
        }
        parent12.innerHTML =data.length>4? parent1.innerHTML:'';
        timer = setInterval(autoScrollLine2,50)
	});

    function autoScrollLine2() {
        if (box1.scrollTop >= parent1.offsetHeight) {
            box1.scrollTop = 0;
        } else {
            box1.scrollTop++;
        }
        // if (box1.scrollTop % box1.offsetHeight == 0) {
        //     clearInterval(timer)
        //     setTimeout(() => {
        //         timer = setInterval(autoScrollLine2, 50)
        //     }, 1000)
        // }

    }


	var optionOne2;
	var timer2;
    var box = document.querySelector('.mess-list')
    var parent = document.querySelector('.drag')
    var lis = document.querySelectorAll(".drag li");
    var parent2 = document.querySelector(".drag2");
	//区县部门数据归集
	$.post(ctx + "/screenController/qxcityOrdertj.action",{} , function(data) {
        clearInterval(timer2)
        for (let i = 0; i < data.length; i++) {
            lis.length && drag.removeChild(lis[i]);
            let w = Math.round(20 / data[0].value * data[i].value)||0;
            let html = "<li>" +
                '<span class="li-sp1">' + (i + 1) + '</span><span class="li-sp2">' + data[i]
                    .name + '</span><span class="range" style="width:' + w +
                '%"></span><span class="li-sp3">' +
                toWorY(data[i].value) +
                '</span></li>';
            $('#drag').append(html)
        }
        parent2.innerHTML = data.length>4?parent.innerHTML:'';

        timer2 = setInterval(autoScrollLine,50)

		// var chartWZYYPHCHART = echarts.init(document.getElementById("WZYYPHCHART"));
	});




    function autoScrollLine() {
        if (box.scrollTop >= parent.offsetHeight) {
            box.scrollTop = 0;
        } else {
            box.scrollTop++;
        }
        // if (box.scrollTop % box.offsetHeight == 0) {
        //     clearInterval(timer2)
        //     setTimeout(() => {
        //         timer2 = setInterval(autoScrollLine, 30)
        //     }, 1000)
        // }

    }


	//部门概述
	$.post(ctx + "/screenController/getDeptgs.action",{} , function(data) {
		$("#cjdeptid").text(data.deptSum);
		$("#cjgjmlid").text(data.gjmlSum);
		$("#cjqxdeptid").text(data.deptqxSum);
	});


	/*千分位分隔符*/
	function thousandBitSeparator(num) {
		if(num != null){
			var res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
				return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
					return $1+",";
				});
			})
			return res;
		} else{
			return 0;
		}
	}

	/*千分位分隔符*/
	function thousandBitSeparator1(num) {
		var point=2;
		if(num != null){
			var numStr = num.toString()
			// 十万以内直接返回
            if (numStr.length < 5) {
                var res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
                    return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
                        return $1+",";
                    });
                })

				return '<span class="numfaceNum2" title="'+res+'">'+res+'</span>';
			}
			//大于8位数是亿num.toFixed(2)
			else if (numStr.length > 8) {
				//let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
				let nu =  parseFloat(num / 100000000).toFixed(2)
				//var decimal = parseFloat("0."+numStr.substring(numStr.length - 8)).toFixed(2)*100;
				if(nu>999){
					return ' <span class="numfaceNum2" title="'+ nu+'">'+nu+'</span><p style="display: inline;font-size:10px;margin-left:16px">亿</p>';
				}else if(nu>99){
					return ' <span class="numfaceNum2" title="'+ nu+'">'+nu+'</span><p style="display: inline;font-size:10px;margin-left:8px">亿</p>';
				}else if(nu>9) {
					return ' <span class="numfaceNum2" title="'+nu+'">'+nu+'</span><p style="display: inline;font-size:10px;margin-left:4px">亿</p>';
				}else{
					return ' <span class="numfaceNum2" title="'+ nu+'">'+nu+'</span><p style="display: inline;font-size:10px;margin-left:-6px">亿</p>';
				}
			}
			//大于6位数是十万 (以10W分割 10W以下全部显示)
			else if (numStr.length >= 5) {
				//let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
                let nu = parseFloat(num / 10000).toFixed(2)
				//var decimal = parseFloat("0."+numStr.substring(numStr.length - 4)).toFixed(2)*100
				if(nu>999){
					return ' <span class="numfaceNum2" title="'+nu+'">'+nu+'</span><p style="display: inline;font-size:10px;margin-left:16px">万</p>';
				}else if(nu>99){
					return ' <span class="numfaceNum2" title="'+nu+'">'+nu+'</span><p style="display: inline;font-size:10px;margin-left:8px">万</p>';
				}else if(nu>9) {
					return ' <span class="numfaceNum2" title="'+nu+'">'+nu+'</span><p style="display: inline;font-size:10px;margin-left:4px">万</p>';
				}else{
					return ' <span class="numfaceNum2" title="'+nu+'">'+nu+'</span><p style="display: inline;font-size:10px;margin-left:-6px">万</p>';
				}

			}
		} else{
			return 0;
		}
	}
	
	

})();
