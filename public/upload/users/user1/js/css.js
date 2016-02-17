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
'left':46, 
'top':89, 
'width':322, 
'height':217, 
'background': 'false', 
}); 
$('#div1').css({ 
'left':220, 
'top':391, 
'width':255, 
'height':140, 
'background': 'false', 
}); 
$('#div2').css({ 
'left':468, 
'top':258, 
'width':0, 
'height':0, 
'background': 'false', 
}); 
