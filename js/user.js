

function  ajax_change_user(obj){
	console.log(obj)
    $.ajax({
        type: "post",
        url:'/ttms/UserManageServlet',
        data:obj,
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            /*data={
                res:1
            }*/
            if(data.res==1){
                alert('成功')
            }
        }
    })
}

function ajax_return_ticket(obj,that) {
    console.log(obj)
    $.ajax({
        type: "post",
        url:'/ttms/RefundServlet',
        data:obj,
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            /*data={
                res:1
            }*/
            if(data.res==1){
                alert('退票成功，在24h内返还买票金额');
                let list = $('.out_ticket');
                for(let i=0;i<list.length;i++){
                    console.log(list.eq(i).attr('data-outIt'))
                    if(list.eq(i).attr('data-outIt')==obj.ticket_id){
                        list.eq(i).parent().css('background-color', 'rgba(0,0,0,.3)');
                        list.eq(i).attr('data-status','yes');
                        list.eq(i).text('已退票' )
                    }
                }
            }
        }
    })
}

function replaceit(obj) {
    $('.head>img').attr('src',obj.img);

    $('#user>div div:nth-of-type(1)').append('<span>'+JSON.parse( $.cookie('login')).username+'</span>')
    $('#user>div div:nth-of-type(3)').append('<span>'+obj.sex+'</span><img src="img/change.png">')
    $('#user>div div:nth-of-type(4)').append('<span>'+obj.tel+'</span><img src="img/change.png">')

    obj.history.forEach(function (item,index) {
        let status = ''
        if(item.status==1){
            $('#buy table').append('<tr>\n' +

                '                            <td>'+item.name+'</td>\n' +
                '                            <td>'+item.language+'</td>\n' +
                '                            <td>'+item.type+'</td>\n' +
                '                            <td>'+item.time+'</td>\n' +
                '                            <td>'+item.start+'</td>\n' +
                '                            <td>￥'+item.ticket+'</td>\n' +
                '                            <th data-outIt= "'+item.ticketId+'"class="out_ticket" data-status="no">退票</th>\n' +
                '\n' +
                '                        </tr>')
        }else {
            $('#buy table').append('<tr style="background-color: rgba(0,0,0,.3)">\n' +
                '                            <td>'+item.name+'</td>\n' +
                '                            <td>'+item.language+'</td>\n' +
                '                            <td>'+item.type+'</td>\n' +
                '                            <td>'+item.time+'</td>\n' +
                '                            <td>'+item.start+'</td>\n' +
                '                            <td>￥'+item.ticket+'</td>\n' +
                '                            <th data-outIt= "'+item.ticketId+'"class="out_ticket" data-status="yes">已退票</th>\n' +
                '\n' +
                '                        </tr>')
        }

    })
}
function  loading(){

    let obj={
        want:'user',
        username:JSON.parse( $.cookie('login')).username
    }

    $.ajax({
        type: "post",
        url:'/ttms/ShowUserInfoServlet',
        data:obj,
        async:true,
        success:function (data) {
            obj = JSON.parse(data);
            /*obj={
                img:'img/头像%20男孩.png',
                sex:'男',
                tel:'xxxxxxxxxxx',
                history:[{
                    status:1,
                    name:'复仇者联盟',
                    language:'xxx',
                    type:'xxx',
                    time:'xxx',
                    start:'xxxx',
                    ticket:'XX',
                    ticketId:'1'
                },{
                    status:1,
                    name:'复仇者联盟',
                    language:'xxx',
                    type:'xxx',
                    time:'xxx',
                    start:'xxxx',
                    ticket:'XX',
                    ticketId:'2'
                },{
                    status:-1,
                    name:'复仇者联盟',
                    language:'xxx',
                    type:'xxx',
                    time:'xxx',
                    start:'xxxx',
                    ticket:'XX',
                    ticketId:'3'
                }
                ]
            }*/
            replaceit(obj);
        }
    })
}


$(function () {
    loading()
    $('.nav').children().click(function (event) {
        let x = $('.nav').children();
        for(let i= 0;i<x.length;i++){
            x.eq(i).css({
                'background-color':'white',
                'color':'rgb(233,66,56)'
            })
            x.eq(i).find('img').remove()
        }

        $(event.target).css({
            'background-color':'rgb(233,66,56)',
            'color':'white'
        })
        $(event.target).append('<img src="img/point.png">')

    })


    $('.head>div img').click(function () {
        $(this).parent().html('<form>' +
            '<input type="file" name="head"><input type="button" class="button" value="确定修改"></input>'+
            '</form>'
            )
    })

    $('body').on('click','.head .button',function () {
        let ob=new FormData($('.head form')[0]);

        $.ajax({
	        type: "post",
	        url:'/ttms/ChangeHend',
	        data:ob,
	        async:true,
	        processData: false,
            contentType: false,
	        success:function (data) {
	            data=JSON.parse(data);
	            /*data={
	                res:1
	            }*/
	            if(data.res==1){
	                alert('成功')
	            }
	        }
        })
        
        $(this).parent().parent().html('修改头像<img src="img/change.png">')
    })

    //预览
    $('body').on('change','.head input',function () {
        // getObjectURL是自定义的函数，见下面
        // this.files[0]代表的是选择的文件资源的第一个，因为上面写了 multiple="multiple" 就表示上传文件可能不止一个
        // ，但是这里只读取第一个
        var objUrl = getObjectURL(this.files[0]) ;
        // 这句代码没什么作用，删掉也可以
        // console.log("objUrl = "+objUrl) ;
        if (objUrl) {
            // 在这里修改图片的地址属性
            $(".head>img").attr("src", objUrl) ;
        }
    })

    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null ;
        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
     }




    var  jiluIt=['',''];

    $('body').on('click','.cancelIt',function () {

        if(jiluIt[0]=='密码:'){
            $(this).parent().html('<span>密码:</span><span>'+''.padStart(jiluIt[1].length,'*') +'</span><img src="img/change.png">');
        }else{
            $(this).parent().html('<span>'+jiluIt[0]+'</span><span>'+jiluIt[1] +'</span><img src="img/change.png">');
        }
    })


    $('body').on('click','#user img',function () {
        that = $(this).parent();
        let  which = that.children().eq(0).text();
        console.log(which)
        switch (which){
            case '密码:':{
                    jiluIt[0]='密码:',
                    jiluIt[1]=$(this).prev().text();
                $(this).parent().html('<span>密码:</span><input ><button>确定修改</button><button style="background-color: red;color: white;margin-left: 5px" class="cancelIt">取消</button>')
                that.children('input').focus();
            };break;
            case '性别:':{
                    jiluIt[0]='性别:',
                    jiluIt[1]=$(this).prev().text();
                $(this).parent().html('<span>性别:</span>' +
                    '<select>' +
                    '<option value="Boy">男</option>' +
                    '<option value="Girl">女</option>' +
                    '</select>' +
                    '<button>确定修改</button><button style="background-color: red;color: white;margin-left: 5px" class="cancelIt">取消</button>')
                that.children('input').focus();
            };break;
            case '手机号:':{
                    jiluIt[0]='手机号:',
                    jiluIt[1]=$(this).prev().text();
                $(this).parent().html('<span>手机号:</span><input ><button>确定修改</button><button style="background-color: red;color: white;margin-left: 5px" class="cancelIt">取消</button>')
                that.children('input').focus();
            };break
        }
    })
    var flag = [0,0,0];

    $('body').on('click','#user button',function () {
        let which = $(this).parent().children().eq(0).text();

        switch (which){
            case '密码:':{
                console.log(flag[0])
                if(flag[0]){
                    let obj={
                        want:'password',
                        password:$(this).prev().val()
                    }
                    ajax_change_user(obj);
                    let len = $(this).prev().val().length;
                    let text=''
                    for(let i=0;i<len;i++){
                        text+='*';
                    }
                    $(this).parent().html('<span>密码:</span><span>'+text+'</span><img src="img/change.png">')
                    flag[0]=0;
                }
                };break;
            case '性别:':{
                let obj={
                    want:'sex',
                    sex:$(this).prev().val()
                }
                ajax_change_user(obj);
                if($(this).prev().val()=='Boy'){
                	 $(this).parent().html('<span>性别:</span><span>男</span><img src="img/change.png">')
                }else{
                	 $(this).parent().html('<span>性别:</span><span>女</span><img src="img/change.png">')
                }
               
            };break;
            case '手机号:':{
                if(flag[2]){
                    let obj={
                        want:'telphone',
                        telphone:$(this).prev().val()
                    }
                    ajax_change_user(obj);
                    $(this).parent().html('<span>手机号:</span><span>'+$(this).prev().val()+'</span><img src="img/change.png">')
                    flag[2]=0
                }
               };break
        }
    })

    $('body').on('change','#user input',function () {
        let which = $(this).parent().children().eq(0).text();
        switch (which){
            case '密码:':{
                if(check.check_password($(this).val())){
                    $(this).parent().children().eq(3).empty()
                    $(this).parent().append('<span class="right">√</span>')
                    flag[0]=1
                }else{
                    $(this).parent().children().eq(3).empty()
                    $(this).parent().append('<span class="error">X</span>')
                }
            };break;
            case '性别:':{

            };break;
            case '手机号:':{
                console.log()
                if(check.check_tel($(this).val())){
                    $(this).parent().children().eq(3).empty()
                    $(this).parent().append('<span class="right">√</span>')
                    flag[2]=1
                }else{
                    $(this).parent().children().eq(3).empty()
                    $(this).parent().append('<span class="error">X</span>')
                }
            };break
        }
    })



    $('body').on('click','.out_ticket',function () {
        if($(this).attr("data-status")=='yes'){
            alert('亲，已经退票了哦')
        }else{
            let ticketId = $(this).attr('data-outIt');
            let obj = {
                want:'returnTicket',
                ticket_id:ticketId
            }
            if(confirm('真的想退票吗？无法更改哦')){
                ajax_return_ticket(obj,this)
            }
        }



    })

})