/*
 *GET home page.
 */
var express = require('express');
var fs = require('fs');
var filevm = require('../fileVM.js');
var crypto = require('crypto');
var zip = require("node-native-zip");
var archive = new zip()
//
module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render('welcome', {
			title: 'Express',
			user: 'test'
		});
	});
	app.get("/app", function(req, res) {
		res.render('app', {
			title: 'Express',
			user: 'test'
		});
		console.log("app");
	});
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: 'Siiva',
		});
	});
	app.post('/reg', function(req, res) {
		//检验用户两次输入的口令是否一致
		if (req.body['password-repeat'] != req.body['password']) {
			req.flash('error', '两次输入的口令不一致');
			return res.redirect('/reg');
		}
		//生成口令的散列值
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		var newUser = new User({
			name: req.body.username,
			password: password,
		});
		//检查用户名是否已经存在
		User.get(newUser.name, function(err, user) {
			if (user)
				err = 'Username already exists.';
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			//如果不存在则新增用户
			newUser.save(function(err) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/reg');
				}
				req.session.user = newUser;
				req.flash('success', '注册成功');
				res.redirect('/app');
			});
		});
	});
	app.get("/app", function(req, res) {
		res.render('app', {
			title: 'Express'
		});
		console.log("app");
	});
	//
	app.get('/login', function(req, res) {
		res.render('login', {
			title: '用户登入',
		});
	});
	app.post('/login', function(req, res) {
		//生成口令的散列值
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		User.get(req.body.username, function(err, user) {
			if (!user) {
				req.flash('error', '用户不存在');
				return res.redirect('/login');
			}
			if (user.password != password) {
				req.flash('error', '用户口令错误');
				return res.redirect('/login');
			}
			req.session.user = user;
			req.flash('success', '登入成功');
			res.redirect('/app');
		});
	});
	app.get('/logout', function(req, res) {
		req.session.user = null;
		req.flash('success', '登出成功');
		res.redirect('/');
	});
	//
	app.get("/ajax", function(req, res) {
		accessfile.write("ajax");
		res.send("ok");
		console.log("ajax");
	});
	//
	app.get('/download', function(req, res) {
		try {
			fs.unlink('./public/upload/users/user1/yourwork.zip');
		} catch (e) {

		}
		var imgs;
		fs.readdir("./public/upload/users/user1/img/", function(err, files) {
			if (files) {
				imgs = files;
				console.log(imgs);
				for (i = 0; i < imgs.length; i++) {
					archive.addFiles([{
						name: "img/" + imgs[i],
						path: "./public/upload/users/user1/img/" + imgs[i]
					}], function() {;
					});
				}
				archive.addFiles([{
					name: "index.htm",
					path: "./public/upload/users/user1/index.htm"
				}, {
					name: "css/css.css",
					path: "./public/upload/users/user1/css/css.css"
				}, {
					name: "js/css.js",
					path: "./public/upload/users/user1/js/css.js"
				}, {
					name: "js/jq.js",
					path: "./public/upload/users/user1/js/jq.js"
				}], function(err) {
					if (err) return console.log("err while adding files", err);
					var buff = archive.toBuffer();
					fs.writeFile("./public/upload/users/user1/yourwork.zip", buff, function() {
						setTimeout(res.download('./public/upload/users/user1/yourwork.zip'), 1000);
					});
				});
			}
		});
		console.log(" has download");
	});
	//
	app.post('/ajax', express.bodyParser(), function(req, res) {
		//todo
		var postData = req.body.params;
		var settings = req.body.settings;
		var containnerWidth = settings.__canvasWidth;
		var containnerHeight = settings.__canvasHeight;
		var containnerColor = settings.__canvasColor;
		var cssFile = fs.createWriteStream('./public/upload/users/user1/css/css.css', {flag: 'w'});
		var htmFile = fs.createWriteStream('./public/upload/users/user1/index.htm', {flag: 'w'});
		var jsFile = fs.createWriteStream('./public/upload/users/user1/js/css.js', {flag: 'w'});
		filevm.cssFileWrite(cssFile, postData); //makecss
		filevm.htmFileWrite(htmFile, postData); //makehtml
		filevm.jsFileWrite(jsFile, postData, containnerWidth, containnerHeight, containnerColor); //makejs
		res.send('sucess');
		console.log(req.body);
	});
	app.post('/upload', function(req, res, next) {
		console.log(typeof(req.files.file));
		if (typeof(req.files.file) != 'undefined') {
			var image_name = req.files.file.name;
			var tmp_path = req.files.file.path;
			//指定文件上传后的目录-示例为"img"目录。
			var target_path = './public/upload/users/user1/img/' + req.files.file.name;
			//移动文件
			fs.rename(tmp_path, target_path, function(err) {
				if (err) throw err;
				//删除临时文件夹文件,
				fs.unlink(tmp_path, function() {
					if (err) throw err;
					res.send(image_name);
				});
			});
		} else {
			res.send(false);
		}
	});
}