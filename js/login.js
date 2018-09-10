window.onload=function () {
    var btn = document.getElementsByClassName('button')[0],
        form = document.querySelectorAll('form')[0];
    var flag=[0,0];

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

                console.log(formdata2)

                $.ajax({
                    type: "post",
                    url: '',
                    data: formdata2,
                    async: true,
                    success: function (data) {
                        if (data.res == 1) {
                            alert('登录成功');
                            window.location = 'index.html'
                        } else {
                            alert('登录失败，用户名密码错误');
                        }

                    }
                });
                btn.disabled = true
            }
    }


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
        }

    }

    change=function(check,text,idNumber){
        if(check=='no'){
            $('#'+idNumber).empty()
            $('#'+idNumber).append('× '+text);
            $('#'+idNumber).css({'color':'red'});
        }else {
            $('#'+idNumber).empty()
            $('#'+idNumber).append('√ 正确');
            $('#'+idNumber).css({'color':'lime'});
        }
    }

    //  let formdata = new FormData(form);
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
}