/*room_id 发的是A+id  schecl发的是 某+id*/

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

function add(seat) {
    for(let i=0;i<seat.row*seat.col;i++){
        seat.list.push(0)
    }

    $('.design table').empty();

    for(let i=1;i<=seat.row;i++){
        $('.design table').append('<tr></tr>')
        for(let j=1;j<=seat.col;j++){
            let k =i-1;
            if(i==3&&j==1){console.log(123)}

            if(seat.list[k*seat.col+j-1]==0){
                $('.design table tr').eq(k).append('<img src="img/meixuan.png" data-row='+i+' data-col='+j+'>')
            }else if(seat.list[k*seat.row+j-1]==9){
                $('.design table tr').eq(k).append('<img src="img/yixuan.png" data-row='+i+' data-col='+j+'>')
            }else {
                $('.design table tr').eq(k).append('<img src="img/yixuan.png" style="visibility: hidden">')
            }

        }
    }

    $('.list').empty();
    for(let i=1;i<=seat.row;i++){
        $('.list').append('<li>'+i+'</li>')
    }
    return seat;
}

var replaceobj = {
    out_replace:function (obj) {
            x= $('.movie .number').eq(0).text();
            for(let i=0;i<$('.movie').length;i++){
                if($('.number',$('.movie').eq(i)).eq(0).text()==obj.num){
                    $('.status',$('.movie').eq(i)).eq(0).text('下线');
                    $('.addmovie',$('.movie').eq(i))[0].disabled=true;
                }
            }
            console.log(x)

    },
    replace_all:function(obj){
        console.log(obj)
        obj.forEach(function (item,index,arr) {
            console.log(item.name)
            let stauts;
            if(item.status==-1){
            	stauts='已下线'
            }else{
            	stauts='上线中'
            }
            $('.include_look').prepend(
                '                  <div class="movie">\n' +
                '                    <div class="view_top"><span class="number">'+item.num+'</span> <span class="name">'+item.name+'</span><img src=\'img/right.png\'class="up" data-num=\'no\'></div>\n' +
                '                    <div class="view_body" style="display: none">\n' +
                '                        <div class="view_middle">\n' +
                '                                <img src='+item.img+'>\n' +
                '                                <table cellspacing="10">\n' +
                '                                    <tr>\n' +
                '                                        <th>导演:</th>\n' +
                '                                        <th class="director">'+item.director+'</th>\n' +
                '                                    </tr>\n' +
                '\n' +
                '                                    <tr>\n' +
                '                                        <th>语种:</th>\n' +
                '                                        <th class="language">'+item.language+'</th>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <th>类型:</th>\n' +
                '                                        <th class="type">'+item.type+'</th>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <th>片长:</th>\n' +
                '                                        <th class="time">'+item.time+'分钟</th>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <th>影片状态:</th>\n' +
                '                                        <th class="status">'+stauts+'</th>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <th>增加排片:</th>\n' +
                '                                        <th ><button type="button" class="addmovie">增加排片</button></th>\n' +
                '                                    </tr>\n' +
                '                                </table>\n' +
                '                        </div>\n' +
                '                        <div class="view_bottom">\n' +
                '                            <table class="count" id='+item.num+'>\n' +
                '                                <tr>\n' +
                '                                    <th>名称</th>\n' +
                '                                    <th>时长</th>\n' +
                '                                    <th>票价</th>\n' +
                '                                    <th>演出厅</th>\n' +
                '                                    <th>开始时间</th>\n' +
                '                                    <th>删除排片</th>\n' +
                '                                </tr>\n' +
                '                            </table>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>')
                if(item.status==-1){
                	 $('.addmovie',$('.movie').eq(index)).attr("disabled", true);
                     console.log($('.addmovie',$('.movie').eq(index))[0])
                }
               
                item.list.forEach(function (it) {
                    $('table[id='+item.num+']').append('   <tr id='+it.id+'>\n' +
                        '                                    <th>'+item.name+'</th>\n' +
                        '                                    <th>'+item.time+'分钟</th>\n' +
                        '                                    <th>'+it.ticket+'</th>\n' +
                        '                                    <th><span>'+it.room+'</span><img class="change_movie" src="img/xiugai.png"></th>\n' +
                        '                                    <th><span>'+it.start+'</span><img class="change_movie" src="img/xiugai.png"></th>\n' +
                        '                                    <th class="remove_movie">删除</th>\n' +
                        '                                </tr>'

                    )
                })


        })



    },
    up_replace:function(obj){
        $('.include_look').prepend(
            '                  <div class="movie">\n' +
            '                    <div class="view_top"><span class="number">'+obj.num+'</span> <span class="name">'+obj.name+'</span><img src=\'img/right.png\'class="up" data-num=\'no\'></div>\n' +
            '                    <div class="view_body" style="display: none">\n' +
            '                        <div class="view_middle">\n' +
            '                                <img src='+obj.img+'>\n' +
            '                                <table cellspacing="10">\n' +
            '                                    <tr>\n' +
            '                                        <th>导演:</th>\n' +
            '                                        <th class="director">'+obj.director+'</th>\n' +
            '                                    </tr>\n' +
            '\n' +
            '                                    <tr>\n' +
            '                                        <th>语种:</th>\n' +
            '                                        <th class="language">'+obj.language+'</th>\n' +
            '                                    </tr>\n' +
            '                                    <tr>\n' +
            '                                        <th>类型:</th>\n' +
            '                                        <th class="type">'+obj.type+'</th>\n' +
            '                                    </tr>\n' +
            '                                    <tr>\n' +
            '                                        <th>片长:</th>\n' +
            '                                        <th class="time">'+obj.time+'分钟</th>\n' +
            '                                    </tr>\n' +
            '                                    <tr>\n' +
            '                                        <th>影片状态:</th>\n' +
            '                                        <th class="status">'+obj.status+'</th>\n' +
            '                                    </tr>\n' +
            '                                    <tr>\n' +
            '                                        <th>增加排片:</th>\n' +
            '                                        <th ><button class="addmovie">增加排片</button></th>\n' +
            '                                    </tr>\n' +
            '                                </table>\n' +
            '                        </div>\n' +
            '                        <div class="view_bottom">\n' +
            '                            <table class="count" \n' +
            '                                <tr>\n' +
            '                                    <th>名称</th>\n' +
            '                                    <th>时长</th>\n' +
            '                                    <th>票价</th>\n' +
            '                                    <th>演出厅</th>\n' +
            '                                    <th>开始时间</th>\n' +
            '                                    <th>删除排片</th>\n' +
            '                                </tr>\n' +
            '                            </table>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>')
    },
    replace :function (arr,that) {
        $(that).parent().parent().children().eq(3).html('A'+arr.room+'<img class="change_movie" src="img/xiugai.png">');
        $(that).parent().parent().children().eq(4).html(arr.start+'<img class="change_movie" src="img/xiugai.png">')
    },
    add_replace :function (arr,that,id) {
        console.log(id);

        let x = $('.movie');
        for(let i=0;i<x.length;i++){
            console.log(x.eq(i).children('.view_top').children('.number').text())

           if(x.eq(i).children('.view_top').children('.number').text()==arr.num){
               let  name = x.eq(i).children('.view_top').children('.name').text();
               let long = $('.time',x.eq(i).children('.view_body').children('.view_middle')).text()
               $('.count',x.eq(i)).append($(' <tr id='+id+'>\n' +
                   '                                    <th>'+name+'</th>\n' +
                   '                                    <th>'+long+'</th>\n' +
                   '                                    <th>'+arr.ticket+'</th>\n' +
                   '                                    <th>A'+arr.room+'<img class="change_movie" src="img/xiugai.png"></th>\n' +
                   '                                    <th>'+arr.start+'<img class="change_movie" src="img/xiugai.png"></th>\n' +
                   '                                    <th class="remove_movie">删除</th>\n' +
                   '                                </tr>'))
           }
        }
    },

    replace_people_change:function(obj){
        let x = $('.count3').find('tr');
        for(let i = 0;i<x.length;i++){
            if(x.eq(i).children().eq(1).text()==obj.id){
                if(obj['tel']){
                    x.eq(i).children().eq(3).html(obj['tel']+'<img class="change_people" src="img/xiugai.png">')
                }else if(obj['email']){
                    x.eq(i).children().eq(4).html(obj['email']+'<img class="change_people" src="img/xiugai.png">')
                }else{
                    x.eq(i).children().eq(5).html(obj['address']+'<img class="change_people" src="img/xiugai.png">')
                }
            }
        }
    },
    replacePeople:function (obj) {
            $(' <tr>\n' +
                '                    <th>'+obj.identity+'</th>\n' +
                '                    <th>'+obj.id+'</th>\n' +
                '                    <th>'+obj.name+'</th>\n' +
                '                    <th>'+obj.tel+'<img class="change_people" src="img/xiugai.png"></th>\n' +
                '                    <th>'+obj.email+'@qq.com<img class="change_people" src="img/xiugai.png"></th>\n' +
                '                    <th>'+obj.address+'<img class="change_people" src="img/xiugai.png"></th>\n' +
                '                    <th class="remove_people">删除</th>\n' +
                '                </tr>').appendTo($('.count3').eq(0));

    },
    replacePeopleAll:function(obj){
        obj.forEach(function (item,index,arr) {
            $('#people .count3').append('<tr>\n' +
                '                    <th>'+item.identity+'</th>\n' +
                '                    <th>'+item.id+'</th>\n' +
                '                    <th>'+item.name+'</th>\n' +
                '                    <th>'+item.tel+'<img class="change_people" src="img/xiugai.png"></th>\n' +
                '                    <th>'+item.email+'@qq.com<img class="change_people" src="img/xiugai.png"></th>\n' +
                '                    <th>'+item.address+'<img class="change_people" src="img/xiugai.png"></th>\n' +
                '                    <th class="remove_people">删除</th>\n' +
                '                </tr>')
        })
    },

    replaceMoney:function (arr) {
        arr.forEach(function (item,index,arr) {
            $('#money .count').append('<tr>\n' +
                '                    <th>'+item.name+'</th>\n' +
                '                    <th>'+item.money+'</th>\n' +
                '                </tr>')
        })
    },

    replaceRoomAdd:function (obj) {
        $('#seat table').eq(0).append($(' <tr>\n' +
            '                        <th>'+obj.id+'</th>\n' +
            '                        <th>'+obj.name+'</th>\n' +
            '                        <th>'+obj.row+'<img class="change_room row" src="img/xiugai.png"></th>\n' +
            '                        <th>'+obj.col+'<img class="change_room col" src="img/xiugai.png"></th>\n' +
            '                        <th>'+obj.val+'</th>\n' +
            '                        <th class="remove_room">删除</th>\n' +
            '                        <th class="design_room">设计</th>\n' +
            '                    </tr>'));
    },
    replaceRoomChange:function (obj) {

        let x = $('#seat .count3 tr');

        for(let i = 1;i<x.length;i++){
            if(x.eq(i).children().eq(0).text()==obj.id){

                if(obj['row']){
                    x.eq(i).children().eq(2).html(obj['row']+'<img class="change_room row" src="img/xiugai.png">')
                }else{
                    x.eq(i).children().eq(3).html(obj['col']+'<img class="change_room col" src="img/xiugai.png">')
                }
            }
        }
    },
    replaceRoomAll:function (obj) {
        obj.forEach(function (item,index,arr) {
            $('#seat .count3').append('  <tr>\n' +
                '                        <th>'+item.id+'</th>\n' +
                '                        <th>'+item.name+'</th>\n' +
                '                        <th>'+item.row+'<img class="change_room row" src="img/xiugai.png"></th>\n' +
                '                        <th>'+item.col+'<img class="change_room col" src="img/xiugai.png"></th>\n' +
                '                        <th>'+item.val+'</th>\n' +
                '                        <th class="remove_room">删除</th>\n' +
                '                        <th class="design_room">设计</th>\n' +
                '                    </tr>')
        })
    }

}

var AjaxValue = {
    //返回res
    out_movie:function(){
        //返回res表明是否下线成功
        obj={
            num:$('form')[2].elements[0].value,
        }

        $('form')[2].elements[0].value=''
        	
        $.ajax({
            type: "post",
            // url:"/?want=out",
            url:'/ttms/updatePlayServlet',
            data:obj,
            async:true,
            // processData: false,
            // contentType: false,
            success:function (data) {
               data=JSON.parse(data);
                /*data={
                    res:1
                }*/
                console.log(obj)
                if(data.res==1){
                	alert('下线成功')
                    $('.look_out').slideToggle(1000)
                    replaceobj.out_replace(obj);
                }

            }
        })
    },
    up_movie:function(obj){
        //要求从后台返回一个num和res
        var fomrdata = new FormData($('form')[1]);

        console.log(fomrdata);

        $.ajax({
            type: "post",
            data:fomrdata,
            url:'/ttms/AddPlayServlet',
            async:true,
            processData: false,
            contentType: false,
            success:function (data) {
                console.log(obj)
                data = JSON.parse(data);
                /*data = {
                    res:1,
                    num:2
                }*/

         //       var objUrl = getObjectURL($('form')[1].elements[5].value);
                var objUrl = getObjectURL($('form')[1].elements[5].files[0]) ;
              
                obj={
                    num:data.num,
                    name:$('form')[1].elements[0].value,
                    img:objUrl,
                    director:$('form')[1].elements[1].value,
                    language:$('form')[1].elements[2].value,
                    type:$('form')[1].elements[3].value,
                    time:$('form')[1].elements[4].value,
                    status:'上线中',
                }
                if(data.res==1){
                    replaceobj.up_replace(obj);
                    $('.look_up').slideToggle(1000)
                    for(let i = 0;i<$('form')[1].elements.length-1;i++){
                        $('form')[1].elements[i].value=''
                    }
                }else{
                    alert('引进失败');
                }

            }
        })
    },

    watch :function () {
        //返回一个复杂的json数组
        $.ajax({
            type: "get",
            url:"/ttms/findPlayAllServlet",
            async:true,
            success:function (data) {
                //展示数据
                obj=JSON.parse(data);
               /* obj=[
                    {
                        num:'1',
                        name:'xxx',
                        img:"img/fczlm3.png",
                        director:'xxx',
                        language:'xxx',
                        type:'xxx',
                        time:'xxx',
                        status:'xxx',
                        list:[
                            {
                                id:'a1',
                                room:'xxx',
                                ticket:'xxx',
                                start:'xxx'
                            },{
                                id:'a2',
                                room:'xxx',
                                ticket:'xxx',
                                start:'xxx'
                            }
                        ]
                    },
                    {
                        num:'2',
                        name:'xxx',
                        img:"img/fczlm3.png",
                        director:'xxx',
                        language:'xxx',
                        type:'xxx',
                        time:'xxx',
                        status:'xxx',
                        list:[
                            {
                                id:'a3',
                                name:'xxx3',
                                time:'xxx',
                                room:'xxx',
                                ticket:'xxx',
                                start:'xxx'
                            },{
                                id:'a4',
                                name:'xxx4',
                                time:'xxx',
                                room:'xxx',
                                ticket:'xxx',
                                start:'xxx'
                            }
                        ]
                    }
                ]*/

                replaceobj.replace_all(obj.obj);
            }
        })
    },
    change :function (obj,that) {
        //返回res
        $.ajax({
            type: "post",
            url:"/ttms/UpdateScheServlet",
            data:obj,
            async:true,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
                /*data={
                    res:1
                }*/
                if(data.res==1){
                    alert('修改成功');
                    replaceobj.replace(obj,that);
                }else {
                    alert('修改失败产生冲突');
                }
            }
        })
    },
    add : function (that) {
        //返回id和res
        var form = $('form')[0];
        let obj={
            want:'add',
            num:form.elements[0].value,
            room:form.elements[1].value.substring(1),
            start:form.elements[2].value,
            ticket:form.elements[3].value
        }

        console.log(typeof obj.start);

        for(let i = 0;i<$('form')[0].elements.length-1;i++){
            $('form')[0].elements[i].value='';
        }

        $.ajax({
            type: "post",
            url:"/ttms/AddScheServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
               /* data={
                    res:1,
                    id:'a2'
                }*/
                
                if(data.res==1){
                    alert('添加成功');
                    $('.look_add').slideToggle(1000);
                    replaceobj.add_replace(obj,that,data['id']);
                }else {
                    alert('添加失败产生冲突');
                }
            }
        })

    },
    remove : function (obj) {
       // console.log(obj);
        console.log(obj)
        $.ajax({
            type: "post",
            url:"/ttms/DeleteScheServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
                /*data={
                    res:1
                }*/
                if(data.res==1){
                    alert('删除成功');
                }else {
                    alert('删除失败产生冲突');
                }
            }
        })

    },

    changePeople:function(obj){
        console.log(obj)
        $.ajax({
            type: "post",
            url:"/ttms/UpdateEmployeeServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
//                data = {
//                    res:1
//                }
                if(data.res==1){
                    alert('修改成功');
                    replaceobj.replace_people_change(obj);
                }else {
                    alert('修改失败');
                }
            }
        })
    },
    addPeople : function () {
        var form = $('form')[3];
        let obj={
            want:'addPeople',
            identity:form.elements[5].value,
            id:form.elements[0].value,
            name:form.elements[1].value,
            tel:form.elements[2].value,
            email:form.elements[3].value,
            address:form.elements[4].value
        }
        console.log(obj);
        $.ajax({
            type: "post",
            url:"/ttms/AddEmployeeServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
//                data={
//                    res:1
//                }
                if(data.res==1){
                    alert('添加成功');
                    $('.dis_s').eq(0).slideToggle(1000);
                    replaceobj.replacePeople(obj);
                    for(let i = 0;i<$('form')[3].elements.length-1;i++){
                        $('form')[3].elements[i].value='';
                    }
                }else {
                    alert('添加成功产生冲突');
                }
            }
        })
    },
    removePeople : function (obj) {
        //返回res
        console.log(obj)
        $.ajax({
            type: "post",
            url:"/ttms/DeleteEmployeeServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
//                data={res:1}
                if(data.res==1){
                    alert('删除成功');
                }else {
                    alert('添加成功产生冲突');
                }
            }
        })
    },
    watchPeople:function(){
        //返回一个复杂的json数组
        $.ajax({
            type: "get",
            url:"/ttms/ShowServlet",
            // 2/?want=watchPeople"
            // url:'',
            async:true,
            success:function (data) {
                //展示数据
                data=JSON.parse(data);
                /*data=[
                    {
                        identity:'xxx',
                        id:'3',
                        name:'xxxxx',
                        tel:'18392120131',
                        email:'123@qq.com',
                        address:'xxxxxxx'
                    },
                    {
                        identity:'xxx',
                        id:'4',
                        name:'xxxxx',
                        tel:'18392120131',
                        email:'123@qq.com',
                        address:'xxxxxxx'
                    }

                ]*/
                replaceobj.replacePeopleAll(data);
            }
        })
    },

    findMoney :function () {
        let obj={
            want:'money',
        }
        console.log(obj);
        $.ajax({
            type: "post",
            url:"",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                //data = JSON.parse(data);
                data=[
                    {
                        name:'xxxxx',
                        money:'xxx'
                    },
                    {
                        name:'xxxxx',
                        money:'xxx'
                    }

                ]
                replaceobj.replaceMoney(data);

            }
        })
    },

    addRoom:function () {

        var form = $('form')[4];

        let obj={
            want:'addStudio',
            name:form.elements[0].value,
            row:form.elements[1].value,
            col:form.elements[2].value,
            val:form.elements[3].value
        }

        console.log(obj);

        $.ajax({
            type: "post",
            url:"/ttms/updateStudioServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
                /*data={
                    res:1,
                    id:3
                }*/
                if(data.res==1){
                    alert('添加成功');
                    obj['id']=data.id;
                    replaceobj.replaceRoomAdd(obj);
                    $('form').eq(4).fadeOut(1000);
                    for(let i = 0;i<$('form')[4].elements.length-1;i++){
                        $('form')[4].elements[i].value='';
                    }
                }else {
                    alert('检查网络');
                }
            }
        })
    },
    changeRoom:function (obj) {
        $.ajax({
            type: "post",
            url:"/ttms/updateStudioServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
                /*data={
                    res:1
                }*/
                if(data.res==1){
                    alert('修改成功');
                    replaceobj.replaceRoomChange(obj);
                }else {
                    alert('检查网络');
                }
            }
        })
    },
    removeRoom:function (obj) {
        $.ajax({
            type: "post",
            url:"/ttms/updateStudioServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
//                data={res:1}
                if(data.res==1){
                    alert('删除成功');
                }else {
                    alert('添加成功产生冲突');
                }
            }
        })
    },
    watchRoom:function(){
        let obj={
            want:'studio',
        }

        console.log(obj);
        $.ajax({
            type: "post",
            url:"/ttms/updateStudioServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
                /*data=[
                    {
                        id:'3',
                        name:'xxx',
                        row:'10',
                        col:'5',
                        val:'xxxx'
                    },
                    {

                        id:'4',
                        name:'xxx',
                        row:'10',
                        col:'5',
                        val:'xxxx'
                    }

                ]*/
                replaceobj.replaceRoomAll(data);

            }
        })
    },

    design:function (obj) {

        obj.list=obj.list.join();
        console.log(obj)
        $.ajax({
            type: "post",
            url:"/ttms/updateStudioServlet",
            async:true,
            data:obj,
            success:function (data) {
                //展示数据
                data = JSON.parse(data);
                /*data={
                    res:1
                }*/
                if(data.res==1){
                    alert('设计完成');
                    //replaceobj.replaceRoomChange(obj);
                }else {
                    alert('检查网络');
                }
            }
        })
    }
}


$(function () {
    AjaxValue.watch();
    AjaxValue.watchPeople();
    AjaxValue.watchRoom();
    AjaxValue.findMoney()
    //隐藏和出现
    var upOrDown = function(count,that){
        $(count).slideToggle(500);

        var logo = $(that).attr('data-num');

        if(logo=='yes')  $(that).attr('data-num','no')
        else if(logo =='no') $(that).attr('data-num','yes')


        if($(that).attr('data-num')=='no'){
            $(that).attr('src','img/right.png');
        }else{
            $(that).attr('src','img/down.png');
        }
    }

    $('body').on('click','.up',function () {
        upOrDown($(this).parent().next(),$(this))
    })

    //切换增加剧目表单可见性
    {
        $('body').on('click', '.addmovie', function () {
            $('.look_add').slideToggle(1000)
        })

        $('body').on('click', '#close_look_add', function () {
            $('.look_add').slideToggle(1000)
        })


        $('body').on('click', '#up_movie', function () {
            $('.look_up').slideToggle(1000)
        })


        $('body').on('click', '#close_look_up', function () {
            $('.look_up').slideToggle(1000)
        })


        $('body').on('click', '#out_movie', function () {
            $('.look_out').slideToggle(1000)
        })


        $('body').on('click', '#close_look_out', function () {
            $('.look_out').slideToggle(1000)
        })
        //切换人员表单可见性
        // $('body').on('click', '#delete', function () {
        //     $('.dis_s').eq(1).slideToggle(1000)
        // })


        $('body').on('click', '#close1', function () {
            $('.dis_s').eq(0).slideToggle(1000)
        })

        $('body').on('click', '#addone', function () {
            $('.dis_s').eq(0).slideToggle(1000)
        })


        // $('body').on('click', '#close2', function () {
        //     $('.dis_s').eq(1).slideToggle(1000)
        // })
    }

    var id;
    //nav效果
    $('nav').click(function(event) {

        $(id).css({
            'background-color': 'rgba(0,0,0,.5)',
            'position': 'relative;',
            'left': '15px'
        });


        id = event.target;


        $(event.target).css({
            'background-color': 'rgba(1,154,255,.5)',
            'position': 'relative;',
            'left': '15px'
        });
    })

    


    var jilu='';
    var text = '';
    
    
    $('body').on('click','.cancel',function(){
    	$(this).parent().html(jilu+'<img class="change_movie" src="img/xiugai.png">')
    })
    
    //修改
    $('body').on('click','.change_movie',function () {
    	if($(this).parents('.movie').children().find('.status').text()=='上线中'){
    	
    		
        text = $(this).parent().text()
        jilu = $(this).parent().text()
       // console.log('text '+text)
        if(/:/.test(text)){
            $(this).parent().html(
                '<input type="datetime-local" placeholder="新的排片" style="width: 150px;height: 30px"><button  class="ready_change" style="margin: -20px 0 0 10px;width: 45px">确定</button><button style="background-color:red;color:white;margin-left:10px;width:40px" class="cancel">取消</button>'
            )
        }else {
            $(this).parent().html(
                '<input placeholder="新的排片" style="width: 100px;height: 30px"><button class="ready_change" style="margin: -20px 0 0 10px">确定</button><button style="background-color:red;color:white;margin-left:10px;width:40px" class="cancel">取消</button>')
        }
    }
    });
    //删除排片
    $('body').on('click','.remove_movie',function () {
    	if($(this).parents('.movie').children().find('.status').text()=='上线中'){
        var len = $(this).parent().siblings().length;
        var array = [];
        let x = $(this).siblings('th');


        let  it = $(this).parent().attr("id");
        let id = it.substring(1);

        for(let i=0;i<x.length;i++){
            if(i===0||i===3||i===4){
                array.push(x[i].innerText)
            }
        }
        let obj={
            want:'remove',
            id:id
        }

    //    if(len==1)  $(this).parent().parent().append('<th class="none" colspan="5" rowspan="2" >暂无排片</th>')
        $(this).parent().remove();

        AjaxValue.remove(obj);
    	}
    })
    //确认修改
    $("body").on('click','.ready_change',function () {
        let value = $(this).parent().parent().children();

        let  it = $(this).parent().parent().attr("id");
        let  id = it.substring(1);

        let array = [];
        array.push(value.eq(0).text());
        console.log(text)
        //改的是room
        if(text.charAt(0)=='A') {
            array.push($(this).prev('input').val());
            array.push(value.eq(4).first().text())
        }
        else {
            array.push(value.eq(3).first().text().substring(1))
            array.push($(this).prev('input').val());
        }
        console.log(array);

        text='';

        let obj = {
            want:'change',
            id:id,
            name:array[0],
            start:array[2],
            room:array[1]
        }
        console.log(obj);
        AjaxValue.change(obj,this);


    })
    //确认增加
    $('body').on('click','.ready_add',function () {
        AjaxValue.add(this)
    })
    //上线
    $('body').on('click','.ready_up',function () {
        AjaxValue.up_movie(this)
    });
    //下线
    $('body').on('click','.ready_out',function () {
        AjaxValue.out_movie(this)
    });



    var text2='';
    //修改员工信息
    $('body').on('click','.change_people',function () {


        text2 = $(this).parent().text();
        jilu = $(this).parent().text();
        console.log(text2);

        $(this).parent().html(
            '<input placeholder="信息" style="width: 80px;height: 30px"><button class="ready_change_people" style="margin: -20px 0 0 10px">确定</button><button style="background-color:red;color:white;margin-left:10px;width:40px" class="cancel">取消</button>'
        );


    });

    $('body').on('click','.ready_change_people',function () {
        let id = $(this).parent().parent().children().eq(1).text();
        let obj={
            id:id
        }
        if( /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(text2)){
            if(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test($(this).prev().val())){
                let tel = $(this).prev().val();
                obj['tel']=tel;
            }else{
                alert('输入正确的电话');
            }
        }else if(/^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/.test(text2) ){
            if(/^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/.test($(this).prev().val())){
                let email = $(this).prev().val();
                obj['email']=email;
            }else{
                alert('输入正确的邮箱');
            }
        }else{
                let address = $(this).prev().val();
                obj['address']=address;
        }
        console.log(obj);
        AjaxValue.changePeople(obj)

    })

    $('body').on('click','.remove_people',function () {
        var len = $(this).parent().siblings().length;
        let  id = $(this).parent().children().eq(1).text();
        let obj={
            want:'removePeople',
            id:id
        }

        if(len==1)  $(this).parent().parent().append('<th colspan="5" rowspan="2" >无工作人员</th>');

        $(this).parent().remove();

        AjaxValue.removePeople(obj);

    })

    $('body').on('click','#ready_add_people',function () {
        AjaxValue.addPeople(this)
    });
    
    
    $('input',$('form').eq(3).children('table')).eq(2).change(function () {
        console.log(check.check_tel($(this).val()))
        if(check.check_tel($(this).val())){
            $('#check_tel').removeClass('checkno')
            $('#check_tel').addClass('checkyes');
            $('#check_tel').text('√')
        }else{
            $('#check_tel').removeClass('checkyes')
            $('#check_tel').addClass('checkno');
            $('#check_tel').text('X')
        }
    })

    $('input',$('form').eq(3).children('table')).eq(3).change(function () {
        console.log(check.check_email($(this).val()))
        if(check.check_email($(this).val())){
            $('#check_email').removeClass('checkno')
            $('#check_email').addClass('checkyes');
            $('#check_email').text('√')
        }else{
            $('#check_email').removeClass('checkyes')
            $('#check_email').addClass('checkno');
            $('#check_email').text('X')
        }
    })

    $('input',$('form').eq(3).children('table')).eq(0).change(function () {
        console.log(check.check_id($(this).val()))
        if(check.check_id($(this).val())){
            $('#check_id').removeClass('checkno')
            $('#check_id').addClass('checkyes');
            $('#check_id').text('√')
        }else{
            $('#check_id').removeClass('checkyes')
            $('#check_id').addClass('checkno');
            $('#check_id').text('X')
        }
    })


    var text3='';
    var seat={};

    $('body').on('click','#addroom',function () {
        $('form').eq(4).fadeToggle(1000);
    })

    $('body').on('click','#close2',function () {
        $('form').eq(4).fadeToggle(1000);
    })

    $('body').on('click','#ready_add_room',function () {
        console.log(1)
        AjaxValue.addRoom()
    })

    $('body').on('click','.change_room',function () {

        text3 = $(this).attr('class').split(' ')[1];
        julu = $(this).parent().text();
        console.log(text3);

        $(this).parent().html(
            '<input placeholder="信息" style="width: 80px;height: 30px"><button class="ready_change_room" style="margin: -20px 0 0 10px">确定</button><button style="background-color:red;color:white;margin-left:10px;width:40px" class="cancel">取消</button>'
        );
    })
    
    $('body').on('click',".ready_change_room",function () {
            let obj={
                want:'changeRoom'
            };
            let id = $(this).parent().parent().children().eq(0).text();
            obj[text3]=$(this).prev().val();
            obj['id']=id;
            $(this).prev('')
            //console.log(obj)
            AjaxValue.changeRoom(obj)

    })

    $('body').on('click','.remove_room',function () {
        let id = $(this).parent().children().eq(0).text();

        let obj ={
            want:'removeRoom',
            id:id
        }
        $(this).parent().remove();
        AjaxValue.removeRoom(obj)
    })

    $('body').on('click','.design_room',function () {
        let id = $(this).parent().children().eq(0).text();
        let row =$('.row',$(this).parent()).parent().text();
        let col =$('.col',$(this).parent()).parent().text();

        let room={
            want:'design',
            id:id,
            row:row,
            col:col,
            list:[]
        };

        $('.design').fadeToggle(1000);

        seat = add(room);

    });

    $('body').on('click','.design table img',function () {
        let img = $(this).attr('src');
        if(img=='img/单人座位.png'){
                $(this).css('visibility','hidden')
                let row = $(this).attr('data-row');
                let col = $(this).attr('data-col');

                let i = row-1;
                let j = col-1;

                j = j+1;
                x=i*seat.col-1+j
                seat.list[x]=2;
        }
    });

    $('body').on('click','#close_design',function () {
        $('.design').fadeToggle(1000);
    })

    $('body').on('click','.ready_design',function () {
        AjaxValue.design(seat)
    })

});
