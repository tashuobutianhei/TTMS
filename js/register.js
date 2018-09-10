window.onload=function () {
    var flag=[0,0,0,0];
    var btn = document.getElementsByClassName('button')[0],
        form = document.querySelectorAll('form')[0];


    var register = function(){
        console.log(flag)
        if(!flag.every(function (count,index,arr) {
            return count==1;
        })){
            alert('存在不合法信息，请修改');
        }else {

            let name = check.HTMLEncode(form.elements['username'].value);
            let pass = check.HTMLEncode(form.elements['password'].value);
            let tel = check.HTMLEncode(form.elements['telphone'].value);

            let formdata2 = {
                username: name,
                possword: pass,
                telphone: tel
            };

            console.log(formdata2)
            $.ajax({
                type: "post",
                url: '/ttms/RegistServlet',
                data: formdata2,
                async: true,
                success: function (data) {
                    data2=JSON.parse(data)
                    if (data2.res == 1) {
                        alert('注册成功');
                        window.location.href='index.html';
                    }
                    else {
                        alert('注册失败');
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
        check_password_count :function (pass1,pass2) {
            if(pass1!=pass2) return false;
            return true;
        },
        check_password:function(pass){
           // alert(/[0-9]{6.}/.test(pass));
            if(!/^[a-zA-Z]\w{5,17}$/.test(pass)){
                return false;
            }else return true;
        },
        check_tel:function(tel){
            if(!/^1[3|5|7|8|][0-9]{9}$/.test(tel)) return false;
            else return true
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

        btn.onclick=register;

        form.elements['username'].onchange=function () {
            if(!check.check_username(this.value)){
                change('no','用户名不合服规范','check1');
                flag[0]=0;
            }else {
                change('yes','用户名不合服规范','check1');
                flag[0]=1;
            }

        }

        form.elements['password'].onchange=function () {
            // let pass2=form.elements['password2'].value;
            if(!check.check_password(this.value)){
                change('no','密码过于简单','check2');
                flag[1]=0;
            }else{
                change('yes','密码过于简单','check2');
                flag[1]=1;
            }

        }
        form.elements['password2'].onchange=function () {
            let pass2=form.elements['password'].value;
            if(!check.check_password_count(this.value,pass2)){
                change('no','两次密码不一致','check3');
                flag[2]=0;
            }else{
                change('yes','两次密码不一致','check3');
                flag[2]=1;
            }

        }

        form.elements['telphone'].onchange=function () {
            if(!check.check_tel(this.value)){
                change('no','请输入正确电话','check4');
                flag[3]=0;
            }else {
                change('yes','请输入正确电话','check4');
                flag[3]=1;
            }

        }

}