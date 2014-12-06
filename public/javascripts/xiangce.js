var objs_list = document.getElementsByClassName('objs_list');
var time_list = document.getElementsByClassName('time_list');
var Time = document.getElementsByClassName('time');
var add = document.getElementsByClassName('add');
var timeChange = document.getElementsByClassName('timeChange');
var mousestatus = 0;
var win_width = screen.width;

/*var objs_list_ul = {};
objs_list_ul = objs_list[0].childNodes[0];
*/

function showTimekedu(time) {
	var len = time * 12;
	var div = document.createElement('div');
	var kedu = time_list[0].childNodes[1].childNodes[1];
	div.className = "showtime";
	div.style.width = len * 5 + 'px';
	kedu.appendChild(div);
	kedu.addEventListener('mousemove', move, false);
	kedu.addEventListener('mousedown', mousedown, false);
	kedu.addEventListener('mouseup', mouseup, false);


	function move() {
		if (mousestatus == 1) {
			var xiangce_width = 800;
			var mousex = event.pageX;
			var margin = mousex - ((win_width - xiangce_width) / 2 + 150);
			console.log(Time[0].scrollLeft);
			//console.log(margin);
			if ((margin - len * 5 / 2) >= 0) {
				div.style.marginLeft = margin - len * 5 / 2 + Time[0].scrollLeft + 'px';
			}
		}
	}
}

function showTimeChange() {
	alert(this);
}

function mousedown() {
	mousestatus = 1;
}

function mouseup() {
	mousestatus = 0;
}

function addObj() {
	var li = document.createElement('li');
	var div1 = document.createElement('div');
	var div2 = document.createElement('div');
	var a1 = document.createElement('a');
	var a2 = document.createElement('a');
	var a3 = document.createElement('a');
	var a4 = document.createElement('a');
	a1.className = "obj";
	a1.href = "javascript:;";
	a1.onclick = function() {
		alert('obj');
	}
	a2.href = "javascript:;";
	a2.addEventListener('click', showTimeChange, false);
	a3.href = "javascript:;";
	a4.href = "javascript:;";
	div1.appendChild(a1);
	li.appendChild(div1);
	div2.className = "tool";
	div2.appendChild(a2);
	div2.appendChild(a3);
	div2.appendChild(a4);
	li.appendChild(div2);
	objs_list[0].childNodes[1].appendChild(li);
	addTimekedu();
}

function addTimekedu() {
	var li = document.createElement('li');
	time_list[0].childNodes[1].appendChild(li);
}

function xiangceInit() {
	var xiangce_window = document.getElementById('xiangce_window');
	xiangce_window.style.marginLeft = (win_width - 800) / 2 + 'px';
	add[0].addEventListener('click', addObj, false);
	addObj();
	showTimekedu(1);
}
window.onload = function() {
	xiangceInit();
}