
var check={
    check_username :function (username) {
        if(/\W/.test(username)||username.length>20) return false;
        else return true;
    },
    check_password:function(pass){
        // alert(/[0-9]{6.}/.test(pass));
        if(!/^[a-zA-Z]\w{5,17}$/.test(pass)){
            return false;
        }else return true;
    },
    HTMLEncode:function(html){   //转义
        var temp = document.createElement('div');
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    HTMLDecode:function(text) {   //反转义
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    check_tel:function (tel) {
        if(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(tel)) return true;
        else return false;
    },
    check_email:function (email) {
        if(/^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/.test(email)) return true;
        else return false;
    },
    check_id:function (id) {
        if(id.length==4&&/[0-9]{4}/.test(id)) return true;
        else return false;
    }

}

window.onload=function () {

    var change=function(check,text,idNumber){
        if(check=='no'){
            $('#'+idNumber).empty()
            $('#'+idNumber).append('× '+text);
            $('#'+idNumber).css({'color':'red'});
        }else if(check=='re'){
            $('#'+idNumber).empty()
        } else {
            $('#'+idNumber).empty()
            $('#'+idNumber).append('√ 正确');
            $('#'+idNumber).css({'color':'lime'});
        }
    }



    // var btn = document.getElementsByClassName('button')[0],

    form = document.querySelectorAll('.dark-matter')[0];

    var flag=[0,0];
    var refresh = function () {
        if(!/manger/.test(window.location)){
            form.elements['username'].value='';
            form.elements['password'].value='';
            flag=[0,0];
            change('re','','check1');
            change('re','','check2');
        }
    }
    var out = function(event){

        console.log(event.target)

        $.cookie('login',' ',{expires: -1,path: '/'});
        refresh()
        $('#huan').empty();
        $('<li id="login">登录</li>').appendTo($('#huan'));
        $(' <li id="register"><a href="register.html">注册</a></li>').appendTo($('#huan'));
        $('#huan').on('click',$('#login'),dis);

       window.location.replace('index.html');
    }

    var repalce = function (obj) {
        $('#huan').empty();
        $('<li class="username">'+obj.username+'</li>').appendTo($('#huan'));
        $('<li class="out">退出登录</li>').appendTo($('#huan'));
        $('#huan').on('click','.out',out);
    }

    var key = $.cookie('login');
   // var key = $.cookie('username');

    if(key){
        var asd = JSON.parse(key);
        
        console.log(asd);
    }

    if(asd!=null){
        if(asd.id=="user"){
            repalce(asd);
        }else {
            repalce(asd);
            $('#top ul:nth-child(2)').append('<li><a href="manger2.0.html">后台管理</a></li>')
            console.log(window.location)
            if( !/manger/.test(window.location)) {
               /* if (confirm('管理员身份已确认，是否进入管理员界面 ')) {
                    window.location = 'manger2.0.html';
                }*/
            }
        }

    }

    var login = function(){
        if(!flag.every(function (cont,index,arr) {
            return cont==1;
        })){
            alert('存在错误信息');
        }else {
            let user = check.HTMLEncode(form.elements['username'].value);
            let password = check.HTMLEncode(form.elements['password'].value);
            let id = check.HTMLEncode(form.elements['id'].value);
            let formdata2 = {
                username: user,
                possword: password,
                id: id
            };
            $.ajax({
                type: "post",
                url: '/ttms/LoginServlet',
                data: formdata2,
                async: true,
                success: function (data) {
                    data2=JSON.parse(data);
                    /*var data2={
                        res:1
                    }*/
                    if (data2.res == 1) {
                        let obj = {
                            id:'user',
                            username:user
                        }
                        $.cookie('login',JSON.stringify(obj),{ expires: 7,path: '/'});
                       // $.cookie('username',JSON.stringify(obj),{ expires: 7 ,path: '/'});
                        repalce(obj);
                        alert('登录成功');
                        undis();
                    } else if(data2.res == 2){

                        let obj = {
                            id:'manger',
                            username:user
                        }
                       $.cookie('login', JSON.stringify(obj), { expires: 7 ,path: '/'});
                        //$.cookie('username',JSON.stringify(obj),{ expires: 7 ,path: '/'});
                        repalce(obj);
                      /*  window.location='manger2.0.html';*/
                        
                    } else {
                        alert('登录失败，用户名密码错误');
                    }

                }
            });
            //btn.disabled = true;
        }
    }

    var undis=function(){
        $('.black').eq(0).slideToggle('slow')
        //$('.black').eq(0).addClass('dis');
    }
    var dis=function(){
        $('.black').eq(0).slideToggle('slow')
        // $('.black').eq(0).removeClass('dis');
    }

    $('#cut').click(undis);
    $('#login').click(dis);

    var btn = document.getElementsByClassName('button')[0];
    console.log(btn);
       //$('.button')[0].click(login);
    btn.onclick=login;

    form.elements['password'].onchange=function () {
        // let pass2=form.elements['password2'].value;
        if(!check.check_password(this.value)){
            change('no','密码过于简单','check2');
            flag[0]=0;
        }else{
            change('yes','密码过于简单','check2');
            flag[0]=1;
        }

    }

    form.elements['username'].onchange=function () {
        if(!check.check_username(this.value)){
            change('no','用户名不合服规范','check1');
            flag[1]=0;
        }else {
            change('yes','用户名不合服规范','check1');
            flag[1]=1;
        }

    }


    $('body').on('click','.username',function () {
       window.location.href='user.html'
    })

    $('body').on('click','.out',out)
}

