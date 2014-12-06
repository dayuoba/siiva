var __screenWidth = $(window).width(); 
$('#containner').css('width',800); 
$('#containner').css('height',1000); 
var __containnerLeft = (__screenWidth - parseInt($('#containner').css('width'))) / 2; 
$('#containner').css({ 
'left': __containnerLeft, 
'top': 0, 
'z-index': 0, 
'background': '#' 
}); 
$('#div0').css({ 
'left':25, 
'top':102, 
'width':136, 
'height':88, 
'background': '#6D24FF', 
}); 
$('#div0').append('<img src="./img/11.jpg" alt="img" width=136 height=88 >'); 
$('#div1').css({ 
'left':186, 
'top':22, 
'width':255, 
'height':146, 
'background': '#4FADFF', 
}); 
$('#div2').css({ 
'left':453, 
'top':94, 
'width':104, 
'height':121, 
'background': 'false', 
}); 
$('#div3').css({ 
'left':587, 
'top':119, 
'width':88, 
'height':80, 
'background': 'false', 
}); 
