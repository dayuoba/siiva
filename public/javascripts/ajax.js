$('#myForm1').submit(function() { //propertybar
      var x = $("#x1").attr('value');
      var y = $("#y1").attr('value');
      var w = $("#w1").attr('value');
      var h = $("#h1").attr('value');
      if (x == '' || y == '' || w == '' || h == '') {
            alert('坐标或者长宽不能为空!');
      } else {
            $(this).ajaxSubmit(function(theback) {
                  var picname;
                  var selectedIndex = getSelected();
                  picname = theback;
                  if (picname) {
                        Canvas.set(selectedIndex, "image_src", "/upload/users/user1/img/" + picname);
                        Canvas.childs[selectedIndex].img.src = Canvas.childs[selectedIndex].image_src;
                        __resourceLock = false;
                  } else {
                       // alert("no pic send");
                  }
            });
            propertyChange1();
            Canvas.update();
            // 提交表单
            $("#pb1").css('display', 'none');
      }
      return false; // 为了防止普通浏览器进行表单提交和产生页面导航（防止页面刷新？）返回false
});
$('#myForm2').submit(function() { //propertywindow
      var x = $("#x2").attr('value');
      var y = $("#y2").attr('value');
      var w = $("#w2").attr('value');
      var h = $("#h2").attr('value');
      var i = $("#contrlwindow2index").text() - 1;
      if (x == '' || y == '' || w == '' || h == '') {
            alert('坐标或者长宽不能为空!');
      } else {
            $(this).ajaxSubmit(function(theback) {
                  var picname;
                  picname = theback;
                  if (picname) {
                        Canvas.set(i, "image_src", "/upload/users/user1/img/" + picname);
                        Canvas.childs[i].img.src = Canvas.childs[i].image_src;
                        __resourceLock = false;
                  } else {
                        alert("no pic send");
                  }
            });
            propertyChange2(i);
            Canvas.update();
            // 提交表单
            $("#pb1").css('display', 'none');
      }
      return false; // 为了防止普通浏览器进行表单提交和产生页面导航（防止页面刷新？）返回false
});
//for_canvas
/*$('#myForm3').submit(function() { //propertywindow
      var x = $("#x2").attr('value');
      var y = $("#y2").attr('value');
      var w = $("#w2").attr('value');
      var h = $("#h2").attr('value');
      var i=$("#contrlwindow2index").text()-1;
      if (x == '' || y == '' || w == '' || h == '') {
            alert('坐标或者长宽不能为空!');
      } else {
            $(this).ajaxSubmit(function(theback) {
                  var picname;
                  picname = theback;
                  if (picname) {
                        Canvas.set(i, "image_src", "/upload/users/user1/img/" + picname);
                        Canvas.childs[i].img.src = Canvas.childs[i].image_src;
                        __resourceLock = false;
                  } else {
                        alert("no pic send");
                  }
            });
            propertyChange2(i);
            Canvas.update();
            // 提交表单
            $("#pb1").css('display', 'none');
      }
      return false; // 为了防止普通浏览器进行表单提交和产生页面导航（防止页面刷新？）返回false
});*/
//


$(function() {
      $("#save").click(function() { //save
            /*if (Canvas.childs.length == 0) {
                  alert('there is nothing to save!')
            } else {*/
            for (i = 0; i < Canvas.childs.length; i++) {
                  __postElements.push({});
                  $.extend(__postElements[i], Canvas.childs[i]);
                  srcRemove(__postElements[i].img, 'src');
                  propertyRemove(__postElements[i], 'img');
            }
            $.post('/ajax', {
                        'params': __postElements,
                        'settings': __postSettings
                  },
                  //回调函数 

                  function(theback) {
                        //输出结果
                        if (theback) {
                              alert(theback);
                        }
                        for (i = 0; i < Canvas.childs.length; i++) {
                              if (Canvas.childs[i].image_src) {
                                    Canvas.childs[i].img.src = Canvas.childs[i].image_src;
                              }
                        }
                  },
                  //返回类型
                  "string"
            );
            return false;
            //}
      });
});