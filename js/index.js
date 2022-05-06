// 开机动画
// 获取有关元素
var startAn=document.querySelector("#startAn");
var showPercent=document.querySelector("#showPercent");
// 定义开机动画要执行的函数
function loadingAn(){
	var t=100;
	var flag=0;
	// 保存定时器
	var timer;
	timer=setInterval(function(){
		flag++;
		showPercent.innerHTML=parseInt((flag/t)*100)+"%";
		// 满足某个条件的时候，要关闭定时器
		if(flag==t){
			// 关闭定时器"%"
			clearInterval(timer);
			// 删除开机动画的div
			// startAn.remove();
			// 添加了过渡效果，就可以使用过渡效果结束事件
			startAn.style.transition="all 1s";
			// startAn.style.opacity=0;
			startAn.style.height=0;
		}
	},10);
}
// 调用这个函数
loadingAn();
// 当开机动画的div的高度变成0后，删除这个div（添加过渡效果结束事件）
startAn.addEventListener("transitionend",function(){
	// 删除开机动画的div
	startAn.remove();
});
// 获取音乐图标
var music=document.querySelector("#music");
// 获取音频元素
var playmp=document.querySelector("#playmp");
var onoff=true;
music.addEventListener("touchstart",function(){
	if(onoff){
		music.className="active";
		// 播放音乐
		playmp.play();
	}else{
		music.className="";
		// 暂停音乐
		playmp.pause();	
	}
	onoff = !onoff;
});
// 获取ul
var list=document.querySelector("#list");

// 无缝衔接，n个li是不够用的 n+2才够用
// 操作元素
        // 因为要做无缝滚动，所以要克隆第一张，放到最后一张后面;
        // 克隆最后一张，放到第一张前面
        // 1. 克隆元素
var oldFirstChild=list.children[0];
var firstChild=list.children[0].cloneNode(true);
var lastChild=list.children[list.children.length-1].cloneNode(true);
      
list.insertBefore(lastChild,oldFirstChild);
list.appendChild(firstChild);

// 计算出li的个数
var allLi=list.querySelectorAll("li");
var len=allLi.length;
// 设置滑动有关的参数
var startY=0;//用来保存y坐标的初始值
var moveY=0;//用来保存滑动时y坐标的值
var distanceY=0;//用来保存两个位置垂直方向的差
var isMove=false;//是否允许滑动
// 表示当前所在屏的编号
var index=1;//0 1 2 3 4 5
// 拿到屏幕的高度
var h=window.innerHeight;
// 定义一个改变ul位置的函数
function setTranslateY(y){
	list.style.transform="translateY("+y+"px)";
}
// 触摸开始，记录初始位置
list.addEventListener("touchstart",function(e){
	startY=e.touches[0].clientY;
});
// 开始滑动
list.addEventListener("touchmove",function(e){
	isMove=true;//允许滑动
	// 获取最新位置
	moveY=e.touches[0].clientY;
	// 计算两个位置的差
	distanceY=moveY-startY;
	// 如果在第一屏且往下滑动是不允许的
	// 如果在最后一屏且往上滑动也是不允许的
	// if(index==0 && distanceY>0 || index==3 && distanceY<0){
	// 	isMove=false;//不允许滑动
	// }else{
		// 改变ul的位置
		// ul的位置=ul现在的位置+滑动的距离;
		var currY=-index*h+distanceY;
		// 手指没有离开屏幕的时候不需要过渡效果
		// 就是要删除过渡效果
		list.style.transition="none";
		setTranslateY(currY);
	// }	
});
// 手指离开屏幕的时候确定往上滑动还是往下滑动
list.addEventListener("touchend",function(){
	// 允许滑动
	if(isMove){
		if(distanceY>0){
			// 往下滑动
			index--;
		}else{
			index++
		}
		// 定位
		// 改变位置的时候加上过渡效果
		list.style.transition="transform 0.2s";
		setTranslateY(-index*h);
		// 控制再次滑动了屏幕才允许改变位置
		isMove=false;
	}
});
// 窗口大小发生改变的时候
window.addEventListener("resize",function(){
	// 获取最新高度
	h=window.innerHeight;
	// 重新定位
	setTranslateY(-index*h);
});
// 每次页面切换完毕，看看现在在哪一个位置
// 每次切换完毕都要判断是否到了第一张或最后一张
list.addEventListener("transitionend",function(){
	console.log(len);
	// 5=6-1
	// if(index>=5){
	if(index>=(len-1)){
		// 如果到了最后一张瞬间显示和它相同的另外一张
		index=1;
		console.log("瞬间定位到第1屏");
		// removeTransition();
		list.style.transition="none";
		setTranslateY(-index*h);
	}else if(index<=0){
		// 如果到了第一张瞬间显示和它相同的另外一张
		// index=4;//6-2=4
		index=len-2;
		console.log("瞬间定位到第4屏");
		// removeTransition();
		list.style.transition="none";
		setTranslateY(-index*h);
	}
});