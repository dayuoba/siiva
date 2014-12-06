var __screenWidth = $(window).width();
$('#containner').css('width', 1346);
$('#containner').css('height', 2100);
var __containnerLeft = (__screenWidth - parseInt($('#containner').css('width'))) / 2;
$('#containner').css({
	'left': 2,
	'top': 0,
	'z-index': 0
});
$('#div_login').css({
	'right': 0,
	'top': 0,
	'width': 200,
	'height': 20,
	'background': 'false',
	'z-index': 999
});
$('#div0').css({
	'left': 337,
	'top': 1242,
	'width': 0,
	'height': 0,
	'background': 'false',
});
$('#div1').css({
	'left': 0,
	'top': 0,
	'width': 1346,
	'height': 700,
	'background': 'false',
});
$('#div1').append('<img src="/images/welcome.png" alt="img" width=1346 height=700 >');
$('#div2').css({
	'left': 447,
	'top': 801,
	'width': 432,
	'height': 97,
	'background': 'false',
});
$('#div2').append('<img src="/images/startbg.png" alt="img" width=432 height=97 >');
$('#div3').css({
	'left': 0,
	'top': 986,
	'width': 1346,
	'height': 300,
	'background': 'url("/images/introduce_bg.png")',
});
$('#div3').append('<img src="/images/itd_bg1.png" alt="img" width=300 height=300 >');
$('#div4').css({
	'left': 0,
	'top': 1348,
	'width': 1346,
	'height': 300,
	'background': 'url("/images/introduce_bg.png")',
});
$('#div4').append('<img src="/images/itd_bg3.png" alt="img" width=300 height=300 style="float:right">');
$('#div5').css({
	'left': 0,
	'top': 1699,
	'width': 1346,
	'height': 300,
	'background': 'url("/images/introduce_bg.png")',
});
$('#div5').append('<img src="/images/itd_bg2.png" alt="img" width=300 height=300 >');
$('#div6').css({
	'left': 0,
	'top': 2066,
	'width': 1346,
	'height': 23,
	'background': '#171717',
});
//$('#div6').append('<img src="/images/startbg.png" alt="img" width=1346 height=23 >');