function writeCssBody(file) {
	file.write('body{ \n');
	file.write('margin:0;padding:0; \n');
	file.write('} \n');
}

function writeCssContainner(file) {
	file.write('#containner{ \n');
	file.write('position:relative; \n');
	file.write('} \n');
}

function writeCssDivs(file, index) {
	file.write('#div' + index + '{ \n');
	file.write('position:absolute; \n');
	file.write('} \n');
}

function writeHtmDOC(file) {
	file.write('<!DOCTYPE html> \n');
}

function writeHtmHalfMarkup(file, title, id) {
	if (id) {
		file.write('<' + title + ' id="' + id + '"> \n');
	} else {
		file.write('<' + title + '> \n');
	}
}
//html

function writeHtmLink(file, href) {
	file.write('<link rel="stylesheet" href="' + href + '">  \n');
}

function writeHtmNhalfMarkup(file, title) {
	file.write('</' + title + '> \n');
}

function writeHtmDivs(file, index) {
	file.write('<div id="div' + index + '"> \n');
}

function writeHtmScriptLink(file, src) {
	file.write('<script  src="' + src + '">');
	file.write('</script> \n');
}
//js

function writeJSGetScreenWidth(file, width, height) {
	file.write('var __screenWidth = $(window).width(); \n');
	file.write("$('#containner').css('width'," + width + "); \n");
	file.write("$('#containner').css('height'," + height + "); \n");
}

function writeJSGetContainnerLeft(file) {
	file.write("var __containnerLeft = (__screenWidth - parseInt($('#containner').css('width'))) / 2; \n");
}

function writeJSSetContainner(file, containnerColor) {
	file.write("$('#containner').css({ \n");
	file.write("'left': __containnerLeft, \n");
	file.write("'top': 0, \n");
	file.write("'z-index': 0, \n");
	file.write("'background': '#" + containnerColor + "' \n");
	file.write("}); \n");
}

function writeJSSetDivs(file, index, x, y, w, h, bgcolor, imgsrc) {
	file.write("$('#div" + index + "').css({ \n");
	file.write("'left':" + Math.round(x) + ", \n");
	file.write("'top':" + y + ", \n");
	file.write("'width':" + Math.round(w) + ", \n");
	file.write("'height':" + h + ", \n");
	file.write("'background': '" + bgcolor + "', \n");
	file.write("}); \n");
	console.log(imgsrc);
	if (imgsrc != '') {
		var src = '<img src="./img/m_1322022694633.jpg" alt="img" width=111 height=111>';
		file.write("$('#div" + index + "').append('<img src=" + '"' + imgsrc + '"' + ' ' + 'alt="img" width=' + Math.round(w) + ' height=' + h + ' >' + "'); \n");
	}
}
exports.htmFileWrite = function(htmFile, postData) {
	writeHtmDOC(htmFile);
	writeHtmHalfMarkup(htmFile, 'html');
	writeHtmHalfMarkup(htmFile, 'head');
	writeHtmLink(htmFile, 'css/css.css');
	writeHtmNhalfMarkup(htmFile, 'head');
	writeHtmHalfMarkup(htmFile, 'body');
	writeHtmHalfMarkup(htmFile, 'div', 'containner');
	for (i = 0; i < postData.length; i++) {
		writeHtmDivs(htmFile, i);
		writeHtmNhalfMarkup(htmFile, 'div');
	}
	writeHtmNhalfMarkup(htmFile, 'div');
	writeHtmScriptLink(htmFile, 'js/jq.js');
	writeHtmScriptLink(htmFile, 'js/css.js');
	writeHtmNhalfMarkup(htmFile, 'body');
	writeHtmNhalfMarkup(htmFile, 'html');
}

exports.cssFileWrite = function(cssFile, postData) {
	writeCssBody(cssFile);
	writeCssContainner(cssFile);
	for (i = 0; i < postData.length; i++) {
		writeCssDivs(cssFile, i);
	}
}

exports.jsFileWrite = function(jsFile, postData, containnerWidth, containnerHeight, containnerColor) {
	writeJSGetScreenWidth(jsFile, containnerWidth, containnerHeight);
	writeJSGetContainnerLeft(jsFile);
	writeJSSetContainner(jsFile, containnerColor);
	for (i = 0; i < postData.length; i++) {
		var x = postData[i].x;
		var y = postData[i].y;
		var w = postData[i].w;
		var h = postData[i].h;
		var img_src = postData[i].image_src;
		var reg = /[^/\\\\]+$/;
		var filename = img_src.match(reg)[0];
		var imgpath = './img/';

		var bgcolor = postData[i].bgcolor;
		if (img_src != 'false') {
			console.log(img_src);
			writeJSSetDivs(jsFile, i, x, y, w, h, bgcolor, imgpath + filename);
		} else {
			writeJSSetDivs(jsFile, i, x, y, w, h, bgcolor, '');
		}
	}
}