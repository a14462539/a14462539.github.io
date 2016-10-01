'use strict'
//绑定事件
function addEvent(obj,ev,fn){
	obj.addEventListener?obj.addEventListener(ev,fn,false):obj.attachEvent('on'+ev,fn);
}
//鼠标滚动事件 兼容
function addWheel(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',wheel,false)
	}else{
		addEvent(obj,'mousewheel',wheel)
	}
	function wheel(ev){
	var oEvent=ev || event;
	var bDown=true;
		bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		fn&&fn(bDown);
		oEvent.preventDefault&&oEvent.preventDefault();
	}
}
//页面加载完成前 提前执行函数 兼容
function domReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn&&fn();
		},false);
	}else{
		document.onreadystatechange=function(){
			if(document.readyState=='complete'){
				fn&&fn();
			}
		}
	}
}
//自定义选取class
function getByClass(obj,sClass){
	var arr=[];
	if(obj.getElementsByClassName){
		arr=obj.getElementsByClassName(sClass);
	}else{
		var aEl=obj.getElementsByTagName('*');
		for(var i=0; i<aEl.length; i++){
			var cArr=aEl[i].className.split(' ');
			for(var j=0; j<cArr.length; j++){
				if(cArr[j]==sClass){
					arr.push(aEl[i]);
				}
			}
		}
	}
	return arr;
}
//随机数
function rnd(n,m){
	return parseInt(Math.random()*(m-n))+n;
}
//在数组中寻找某个东西
function findInArr(n,arr){
	for(var i=0; i<arr.length; i++){
		if(arr[i]==n){
			return true;
		}	
	}
	return false;
}

//补0
function toDou(n){
	return n<10?'0'+n:n;
}
//绝对位置
function getPost(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		
		obj=obj.offsetParent;
	}
	return {left:l,top:t};
}
//运动
function getStyle(obj,Style){
	return (obj.currentStyle||getComputedStyle(obj,false))[Style];
}
function startMove(obj,json,options){
	options=options||{};
	options.duration=options.duration||700;
	options.easing=options.easing||'ease-out';
	var start={};
	var dis={};
	for(var name in json){
		if(name=='opacity'){
			if(isNaN(getStyle(obj,name))){
				obj.style.opacity=1;
			}
		}
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	var count=Math.floor(options.duration/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();
		}
	},30);
}
//json2url
function json2url(json){
				var arr=[];
				for(var name in json){
					arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
//url2json
function url2json(str){
	var arr=str.split('&');
	var json={};
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		json[arr2[0]]=arr2[1];
	}
	return json;
}
//url2json
function url2json(str){
	var arr=str.split('&');
	var json={};
	for(var i=0; i<arr.length;i++){
		var arr2=arr[i].split('=');
		json[arr2[0]]=arr2[1];
	}
	return json;
}
//角度转弧度
function d2a(n){
	return n*Math.PI/180;
}
//弧度转角度
function a2d(n){
	return n*180/Math.PI;
}



