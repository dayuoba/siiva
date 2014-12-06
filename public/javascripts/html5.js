/*golblevalues*/
//screen
var __screenWidth = $(window).width();
//canvas
var canvas = document.getElementById('canvas');
$("#canvas").css('margin-left', (__screenWidth - $("#canvas").attr('width')) / 2);
var ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
ctx.translate(.5, .5);
var rectBlue = "rgb(0,0,118)",
	rectGreen = "rgb(0,222,0)",
	rectRed = "rgb(222,0,0)",
	rectSelect = "rgb(0,255,0)";
//Resource lock
var __resourceLock = false;
var buttonStatus, mouseStatus, selectedStatus;
var __selectedIndex;
var __objOnCreate;
//post
var __postElements = [];
var __postSettings = {
	__canvasWidth: 800,
	__canvasHeight: 1000,
	__canvasColor: ''
}
//Canvas
var Canvas = {
	childs: [],
	set: function(index, property, value) {
		var val = value,
			ind = index,
			prop = property;
		Canvas.childs[ind][prop] = val;
	},
	addChild: function(child) {
		Canvas.childs.push(child);
	},
	createChild: function(x, y, w, h, buttonStatus) {
		var child = {};
		child.x = x;
		child.y = y;
		child.w = w;
		child.h = h;
		if (buttonStatus === 'div') {
			child.color = rectBlue;
		} else if (buttonStatus === 'xiangce') {
			child.color = rectGreen;
		}
		child.class = buttonStatus;
		child.selected = false;
		child.image_src = false;
		child.img = new Image();
		//child.img.src = undefined;
		child.bgcolor = false;
		return child;
	},
	update: function() {
		Canvas.clear();
		Canvas.drawChilds();
	},
	clear: function() {
		var stage = $("#canvas");
		ctx.clearRect(0, 0, $("#canvas").attr('width'), $("#canvas").attr('height'));
	},
	drawChilds: function() {
		for (i = 0; i < Canvas.childs.length; i++) {
			var bgcolor = Canvas.childs[i].bgcolor;
			var image_src = Canvas.childs[i].image_src;
			if (!image_src && !bgcolor) {
				Canvas.stroke(i);
			}
			if (!image_src && bgcolor) {
				Canvas.fill(i);
			}
			if (image_src) {
				if (Canvas.childs[i].img.complete) {
					Canvas.drawImg(i, Canvas.childs[i].img);
				}
				Canvas.childs[i].img.onload = function() {
					try {
						Canvas.drawImg(i, Canvas.childs[i].img);
					} catch (e) {;
					}

				}
			}

		}
	},
	removechild: function() {},
	drawchild: function(obj) {
		ctx.strokeStyle = rectRed;
		ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
	},
	drawRect: function(x, y, w, h) {
		ctx.strokeStyle = rectRed;
		ctx.strokeRect(x, y, w, h);
	},
	fill: function(i) {
		ctx.fillStyle = Canvas.childs[i].bgcolor;
		ctx.fillRect(Canvas.childs[i].x, Canvas.childs[i].y, Canvas.childs[i].w, Canvas.childs[i].h);
	},
	stroke: function(i) {
		ctx.strokeStyle = Canvas.childs[i].color;
		ctx.strokeRect(Canvas.childs[i].x, Canvas.childs[i].y, Canvas.childs[i].w, Canvas.childs[i].h);
	},
	drawImg: function(i, img) {
		var x = Canvas.childs[i].x;
		var y = Canvas.childs[i].y;
		var w = Canvas.childs[i].w;
		var h = Canvas.childs[i].h;
		ctx.drawImage(img, x, y, w, h);
	}
};
/*functions*/
//set

function set(obj, property, value) {
	obj[property] = value;
}
//get

function get(obj, property) {
	var value = obj[property];
	return vaule;
}
//

function createRect(x, y) {
	__objOnCreate.w = x - __objOnCreate.x;
	__objOnCreate.h = y - __objOnCreate.y;
	Canvas.update();
	Canvas.drawchild(__objOnCreate);
}

function showSelectedRect() {
	var selectIndex = getSelected();
	if (typeof(selectIndex) != 'undefined') {
		var x = Canvas.childs[selectIndex].x;
		var y = Canvas.childs[selectIndex].y;
		var w = Canvas.childs[selectIndex].w;
		var h = Canvas.childs[selectIndex].h;
		Canvas.drawRect(x, y, w, h);
	}
}

function showRect(i) {
	var selectIndex = i;
	if (typeof(selectIndex) != 'undefined') {
		var x = Canvas.childs[selectIndex].x;
		var y = Canvas.childs[selectIndex].y;
		var w = Canvas.childs[selectIndex].w;
		var h = Canvas.childs[selectIndex].h;
		Canvas.drawRect(x, y, w, h);
	}
}

function getSelected() {
	var a=0;
	for (i = 0; i < Canvas.childs.length; i++) {
		if (Canvas.childs[i].selected) {
			a=i;
		}
	}
	return a;
}

function findRect(x, y) {
	var mouseX = x;
	var mouseY = y;
	for (i = 0; i < Canvas.childs.length; i++) {
		console.log(i);
		var left = Canvas.childs[i].x;
		var right = Canvas.childs[i].x + Canvas.childs[i].w;
		var top = Canvas.childs[i].y;
		var bottom = Canvas.childs[i].y + Canvas.childs[i].h;
		if (right >= mouseX && left <= mouseX && bottom >= mouseY && top <= mouseY) {
			Canvas.childs[i].selected = true;
		} else {
			Canvas.childs[i].selected = false;
		}
	}
}

function isCollision(selectedIndex) {
	for (i = 0; i < Canvas.childs.length; i++) {
		var selectedLeft = Canvas.childs[selectedIndex].x;
		var selectedRight = Canvas.childs[selectedIndex].x + Canvas.childs[selectedIndex].w;
		var selectedTop = Canvas.childs[selectedIndex].y;
		var selectedBottom = Canvas.childs[selectedIndex].y + Canvas.childs[selectedIndex].h;
		var currentLeft = Canvas.childs[i].x;
		var currentRight = Canvas.childs[i].x + Canvas.childs[i].w;
		var currentTop = Canvas.childs[i].y;
		var currentBottom = Canvas.childs[i].y + Canvas.childs[i].h;
	}
}

function isOnSide(x, y) { //if(isOnSide) cursor turn
	var mouseX = x;
	var mouseY = y;
	var selectIndex = getSelected();
	var left = Canvas.childs[selectIndex].x;
	var right = Canvas.childs[selectIndex].x + Canvas.childs[selectIndex].w;
	var top = Canvas.childs[selectIndex].y;
	var bottom = Canvas.childs[selectIndex].y + Canvas.childs[selectIndex].h;
	if (mouseX >= left - 3 && mouseX <= left + 3 && mouseY > top && mouseY < bottom) { //left
		selectedStatus = 1;
		$("#canvas").css("cursor", "e-resize");
		//return true;
	} else if (mouseX >= right - 3 && mouseX <= right + 3 && mouseY > top && mouseY < bottom) { //right
		selectedStatus = 2;
		$("#canvas").css("cursor", "e-resize");
		//return true;
	} else if (mouseY >= top - 3 && mouseY <= top + 3 && mouseX > left && mouseX < right) { //top
		selectedStatus = 3;
		$("#canvas").css("cursor", "n-resize");
		//return true;
	} else if (mouseY >= bottom - 3 && mouseY <= bottom + 3 && mouseX > left && mouseX < right) { //bottom
		selectedStatus = 4;
		$("#canvas").css("cursor", "n-resize");
		//return true;
	} else if (right - 10 > mouseX && left + 10 < mouseX && bottom - 10 > mouseY && top + 10 < mouseY) {
		selectedStatus = 5;
		$("#canvas").css("cursor", "move");
	} else {
		$("#canvas").css("cursor", "default");
	}
}

function propertyChange1() {
	var x = $("#x1").attr('value');
	var y = $("#y1").attr('value');
	var w = $("#w1").attr('value');
	var h = $("#h1").attr('value');
	var bgcolor = false;
	if ($("#color1").attr('value') != '') {
		bgcolor = "#" + $("#color1").attr('value');;
	}
	for (i = 0; i < Canvas.childs.length; i++) {
		if (Canvas.childs[i].selected) {
			Canvas.set(i, "x", parseInt(x));
			Canvas.set(i, "y", parseInt(y));
			Canvas.set(i, "w", parseInt(w));
			Canvas.set(i, "h", parseInt(h));
			if (bgcolor) {
				Canvas.set(i, "bgcolor", bgcolor);
			}

		}
	}
}

function propertyChange2(i) {
	var x = $("#x2").attr('value');
	var y = $("#y2").attr('value');
	var w = $("#w2").attr('value');
	var h = $("#h2").attr('value');
	var bgcolor = false;
	if ($("#color2").attr('value') != '') {
		bgcolor = "#" + $("#color2").attr('value');;
	}
	Canvas.set(i, "x", parseInt(x));
	Canvas.set(i, "y", parseInt(y));
	Canvas.set(i, "w", parseInt(w));
	Canvas.set(i, "h", parseInt(h));
	if (bgcolor) {
		Canvas.set(i, "bgcolor", bgcolor);
	}
}

function propertyRemove(obj, prop) {
	obj[prop] = false;
}

function srcRemove(obj, prop) {
	obj[prop] = null;
}

function showLayer(i) {
	Canvas.update();
	showRect(i);
	$("#contrlwindow2index").text(i + 1);
	for (j = 0; j < $("#showwindow2 li").length; j++) {
		if (i == j) {
			$(".layer" + j).css('background', '#ccc');
		} else {
			$(".layer" + j).css('background', '#aaa');
		}
	}
	var x = Canvas.childs[i].x;
	var y = Canvas.childs[i].y;
	var w = Canvas.childs[i].w;
	var h = Canvas.childs[i].h;
	var imgsrc = Canvas.childs[i].image_src;
	var bgcolor = Canvas.childs[i].bgcolor;
	$("#contrlwindow2 input[type='text']")[0].value = x;
	$("#contrlwindow2 input[type='text']")[1].value = y;
	$("#contrlwindow2 input[type='text']")[2].value = w;
	$("#contrlwindow2 input[type='text']")[3].value = h;
	if (!imgsrc) {
		$("#contrlwindow2 input[type='file']").value = imgsrc;
	}
	if (!bgcolor) {

	}
}
/*codes*/
//验证输入
$("input[type='text']").change(function() {
	var val = this.value;
	if (isNaN(val)) {
		alert('请输入数字');
	}
});
//
//bottuons
//creatediv
$("#div").click(function() {
	buttonStatus = 'div';
	$("#div").css('background', '#949494');
}).hover(function() {
	$("#div").css('background', '#949494');
}, function() {
	if (buttonStatus != 'div') {
		$("#div").css('background', '#fff');
	}
});
//xiangce
$("#xiangce").click(function() {
	buttonStatus = 'xiangce';
	$("#xiangce").css('background', '#949494');
}).hover(function() {
	$("#xiangce").css('background', '#949494');
}, function() {
	if (buttonStatus != 'xiangce') {
		$("#xiangce").css('background', '#fff');
	}
});

//selectdiv
$("#select").click(function() {
	buttonStatus = 'select';
	$("#select").css('background', '#949494');
	__resourceLock = false;
}).hover(function() {
	$("#select").css('background', '#949494');
}, function() {
	if (buttonStatus != 'select') {
		$("#select").css('background', '#fff');
	}
});
//test
/*$("#test").click(function() {
	//__resourceLock = false;
	alert(getSelected());
});*/
//propertybar_cancle
$(".button_cancle").click(function() {
	this.parentNode.style.display = 'none';
});
$(".button_add").click(function() {
	var file=document.createElement('input');
	file.type='file';
	file.name='file';
	file.className='xiangce_pic';
	this.parentNode.appendChild(file);
});
//contrlbar
//contrlForCanvas
$("#contrlForCanvas").click(function() {
	$("#contrlwindow1").css('display', 'block');
	$("#contrlwindow2").css('display', 'none');
});
//contrlForLayers
$("#contrlForLayers").click(function() {
	$("#showwindow2").empty();
	$("#contrlwindow1").css('display', 'none');
	$("#contrlwindow2").css('display', 'block');
	$("#showwindow1").css('display', 'none');
	$("#showwindow2").css('display', 'block');
	for (i = 0; i < Canvas.childs.length; i++) {
		$("#showwindow2").append('<li class="layer' + i + '" onclick="showLayer(' + i + ')" >图层' + (i + 1) + '</li>');
	}
});

//contrlwindows
//contrlwindow1
$("#contrlwindow1 button")[0].onclick = function() {
	var width = parseInt($("#contrlwindow1 input")[0].value);
	var height = parseInt($("#contrlwindow1 input")[1].value);
	var color = $("#contrlwindow1 input")[2].value;
	set(__postSettings, '__canvasWidth', width);
	set(__postSettings, '__canvasHeight', height);
	set(__postSettings, '__canvasColor', color);
	$("#canvas").attr('height', __postSettings.__canvasHeight);
	$("#canvas").attr('width', __postSettings.__canvasWidth);
	$("#canvas").css('margin-left', (__screenWidth - $("#canvas").attr('width')) / 2);
	$("#canvas").css('background', color);
};
$("#contrlwindow1 button")[1].onclick = function() {
	alert('cancle');
};
//showhide1
$("#showhide1").click(function() {
	var stat = $("#ToolBar").css('display');
	if (stat == 'block') {
		$("#ToolBar").css('display', 'none');
		$("#showhide1").css('left', 0);
	} else {
		$("#ToolBar").css('display', 'block');
		$("#showhide1").css('left', 80);
	}
});
//showhide2
$("#showhide2").click(function() {
	var stat = $("#contrlbar").css('display');
	if (stat == 'block') {
		$("#contrlbar").css('display', 'none');
		$("#showhide2").css('right', 0);
	} else {
		$("#contrlbar").css('display', 'block');
		$("#showhide2").css('right', 200);
	}
});
/*events*/
$("body").mouseup(function() {
	mouseStatus = 0;
});
//mousedown
$("#canvas").mousedown(function(e) { //点击鼠标
	mouseStatus = 1;
	//div
	if (buttonStatus == 'div') {
		var mouseX = Math.round(e.pageX - parseInt($("#canvas").css('margin-left')));
		var mouseY = Math.round(e.pageY - 65);
		__objOnCreate = Canvas.createChild(mouseX, mouseY, 0, 0, buttonStatus);
	}
	//select
	if (buttonStatus == 'select') {
		__resourceLock = true;
		Canvas.update();
		showSelectedRect();
	}
	//xiangce
	if (buttonStatus == 'xiangce') {
		var mouseX = Math.round(e.pageX - parseInt($("#canvas").css('margin-left')));
		var mouseY = Math.round(e.pageY - 65);
		__objOnCreate = Canvas.createChild(mouseX, mouseY, 0, 0, buttonStatus);
	}
});
//dbclick
$("#canvas").dblclick(function(e) {
	var mouseX = Math.round(e.pageX - parseInt($("#canvas").css('margin-left')));
	var mouseY = Math.round(e.pageY - 65);
	//select
	if (buttonStatus == 'select') {
		var selectIndex = getSelected();
		if (Canvas.childs[selectIndex].class === 'xiangce') {
			$("#pb2").css('display', 'block');
		} else if (Canvas.childs[selectIndex].class === 'div') {
			var x = Canvas.childs[selectIndex].x;
			var y = Canvas.childs[selectIndex].y;
			var w = Canvas.childs[selectIndex].w;
			var h = Canvas.childs[selectIndex].h;
			$("#pb1 input[type='text']")[0].value = x;
			$("#pb1 input[type='text']")[1].value = y;
			$("#pb1 input[type='text']")[2].value = w;
			$("#pb1 input[type='text']")[3].value = h;
			$("#pb1").css('display', 'block');
		}
	}
	//xiangce  //TODO
	/*if (buttonStatus == 'xiangce') {
		alert("ok");
		$("#pb2").css('display', 'block');
	}*/
});
//mouseup
$("#canvas").mouseup(function() { //鼠标弹起
	mouseStatus = 0;
	//div
	if (buttonStatus == 'div') {
		Canvas.addChild(__objOnCreate);
	}
	//select
	if (buttonStatus == 'div') {
		if (__resourceLock) {
			var selectedIndex = getSelected();
			var Collision = isCollision(selectedIndex);
			switch (Collision) {
				case 1:
					;
				case 2:
					;
				case 3:
					;
				case 4:
					;
			}

		}
	}
	//xiangce
	if (buttonStatus == 'xiangce') {
		Canvas.addChild(__objOnCreate);
	}
});
//mousemove
$("#canvas").mousemove(function(e) {
	var mouseX = Math.round(e.pageX - parseInt($("#canvas").css('margin-left')));
	var mouseY = Math.round(e.pageY - 65);

	if (mouseStatus == 0) { //滑动鼠标

		//div
		//select
		if (buttonStatus == 'select') {
			if (Canvas.childs.length != 0) {
				if (!__resourceLock) {
					findRect(mouseX, mouseY);
					Canvas.update();
					showSelectedRect();
					var xy_keleyi_com = "x坐标:" + mouseX + ",y坐标：" + mouseY;
					$("#mousePosition_keleyi_com").text(xy_keleyi_com);
				}
				if (__resourceLock) {
					isOnSide(mouseX, mouseY);
					var xy_keleyi_com = "x坐标:" + mouseX + ",y坐标：" + mouseY;
					$("#mousePosition_keleyi_com").text(xy_keleyi_com);
				}
			}
		}
	}
	if (mouseStatus == 1) { //拖动鼠标
		//div
		if (buttonStatus == 'div') {
			createRect(mouseX, mouseY);
		}
		//select
		if (buttonStatus == 'select') {
			if (Canvas.childs.length != 0) {
				if (__resourceLock) { //todo has a bug on it
					var selectIndex = getSelected();
					isOnSide(mouseX, mouseY);
					switch (selectedStatus) {
						case 1:
							Canvas.childs[selectIndex].w += Canvas.childs[selectIndex].x - mouseX;
							Canvas.childs[selectIndex].x = mouseX;
							Canvas.update();
							showSelectedRect();
							break;
						case 2:
							Canvas.childs[selectIndex].w = mouseX - Canvas.childs[selectIndex].x;
							Canvas.update();
							showSelectedRect();
							break;
						case 3:
							Canvas.childs[selectIndex].h += Canvas.childs[selectIndex].y - mouseY;
							Canvas.childs[selectIndex].y = mouseY;
							Canvas.update();
							showSelectedRect();
							break;
						case 4:
							Canvas.childs[selectIndex].h = mouseY - Canvas.childs[selectIndex].y;
							Canvas.update();
							showSelectedRect();
							break;
						case 5:
							Canvas.childs[selectIndex].x = Math.round(mouseX - Canvas.childs[selectIndex].w / 2);
							Canvas.childs[selectIndex].y = Math.round(mouseY - Canvas.childs[selectIndex].h / 2);
							Canvas.update();
							showSelectedRect();
							break;
						case 0:
							;
					}
				}
			}
		}
		//xiangce
		if (buttonStatus == 'xiangce') {
			createRect(mouseX, mouseY);
		}
	}
});
//keybord
$(window).keydown(function(e) {
	var mouseX = Math.round(e.pageX - parseInt($("#canvas").css('margin-left')));
	var mouseY = Math.round(e.pageY - 65);
	switch (e.keyCode) {
		case 65:
			//alert(Canvas.childs[0].image_src);
			break;
	}
});