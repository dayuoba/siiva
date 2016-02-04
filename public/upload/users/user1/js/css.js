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
'left':229, 
'top':249, 
'width':263, 
'height':273, 
'background': 'false', 
}); 
$('#div0').append('<img src="./img/04-13-07-8.jpg" alt="img" width=263 height=273 >'); 
$('#div1').css({ 
'left':532, 
'top':253, 
'width':148, 
'height':129, 
'background': '#73FFBE', 
}); 
$('#div2').css({ 
'left':88, 
'top':144, 
'width':83, 
'height':178, 
'background': '#73FFBE', 
}); 
$('#div2').append('<img src="./img/04-13-07-8.jpg" alt="img" width=83 height=178 >'); 
