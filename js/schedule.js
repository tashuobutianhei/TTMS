
function replaceIt(obj) {
    $('.movie_font h1').text(obj.name);
    $('.movie_font').prev().attr('src',obj.img);
    $('title').text('咸鱼影业——'+obj.name);

    $('.movie_font  p:nth-of-type(1)').text(obj.name);
    $('.movie_font  p:nth-of-type(2)').text(obj.director);
    $('.movie_font  p:nth-of-type(3)').text(obj.type);
    $('.movie_font  p:nth-of-type(4)').text(obj.language);
    $('.movie_font  p:nth-of-type(5)').text(obj.date);
    //计算开始时间月日，加入数组。最多三天的,考虑到重复
    let arry=[]

    obj.list.forEach(function (item,index) {
        let myDate=new Date(item.start);//获取用户选择的时间，生成时间对象  具体时间为时间8:00:00
        let year = myDate.getFullYear();    //获取当前时间的年份 格式xxxx 如：2016
        let month =myDate.getMonth()+1;     //获取当前时间的月份 格式1-9月为x， 10-12月为xx 如：11
        let date = myDate.getDate();        //获取当前时间的日期 格式同月份 如11
        let it = month+'月'+date+'日';

        let flag=1;
        arry.forEach(function (i) {
            if(it==i){
                flag=0;
            }
        })
        if(flag==1){
            arry.push(it);
        }
        console.log(year+' '+month+' '+date)
    })

    arry=arry.sort();
    console.log(arry);
    let len = arry.length;

    //先插入 table
    for(let i=0;i<3;i++){
        $('.list_view .all').append('<table cellpadding="0" cellspacing="0" id="list'+i+'"> <tr>\n' +
            '                    <th>时间</th>\n' +
            '                    <th>语种</th>\n' +
            '                    <th>放映厅</th>\n' +
            '                    <th>售价</th>\n' +
            '                    <th>选座购票</th>\n' +
            '                </tr></table>')
    }

    //根据arry插入导航
    arry.forEach(function (item,index) {
        $('.list_top').append('<a href=#list'+index+'>'+item+'</a>');
    })

    //具体给每个list按照实际分组
    obj.list.forEach(function (item,index) {
        let myDate=new Date(item.start);//获取用户选择的时间，生成时间对象  具体时间为时间8:00:00
        let month =myDate.getMonth()+1;     //获取当前时间的月份 格式1-9月为x， 10-12月为xx 如：11
        let date = myDate.getDate();        //获取当前时间的日期 格式同月份 如11

        let hour =myDate.getHours();
        let min  =myDate.getMinutes();
        let it = month+'月'+date+'日';

        let table = $('.list_view table');

        switch (it){
            case arry[0]:{
                table.eq(0).append(' <tr>\n' +
                    '                    <td class="start">'+hour+':'+min+'</td>\n' +
                    '                    <td class="language">'+obj.language+'</td>\n' +
                    '                    <td class="room">'+item.room+'</td>\n' +
                    '                    <td class="ticket">￥'+item.ticket+'</td>\n' +
                    '                    <td><button data-id='+item.id+'>选座购票</button></td>\n' +
                    '                </tr>')
            };break;
            case arry[1]:{
                table.eq(1).append(' <tr>\n' +
                    '                    <td class="start">'+hour+':'+min+'</td>\n' +
                    '                    <td class="language">'+obj.language+'</td>\n' +
                    '                    <td class="room">'+item.room+'</td>\n' +
                    '                    <td class="ticket">￥'+item.ticket+'</td>\n' +
                    '                    <td><button data-id='+item.id+'>选座购票</button></td>\n' +
                    '                </tr>')
            };break;
            case arry[2]:{
                table.eq(2).append(' <tr>\n' +
                    '                    <td class="start">'+hour+':'+min+'</td>\n' +
                    '                    <td class="language">'+obj.language+'</td>\n' +
                    '                    <td class="room">'+item.room+'</td>\n' +
                    '                    <td class="ticket">￥'+item.ticket+'</td>\n' +
                    '                    <td><button data-id='+item.id+'>选座购票</button></td>\n' +
                    '                </tr>')
            };break;
        }
    })
}

function loading(){
    $.cookie('scheduleId',' ',{expires: -1,path: '/'});
    let playid = $.cookie('playid');
    let data = {
            id:playid
    }
    console.log(data)
    $.ajax({
        type: "post",
        url: '/ttms/ScheduleServlet',
        data:data,
        async: true,
        success: function (data) {
            obj = JSON.parse(data);
            /*obj={
                    num:'1',
                    name:'复仇者联盟3',
                    img:"img/fczlm3.png",
                    director:'xxx',
                    language:'xxx',
                    type:'xxx',
                    data:'xxx',
                    list:[
                        {
                            id:'a1',
                            room:'A1',
                            ticket:'xxx',
                            start:'2018-06-11T09:20'
                        },{
                            id:'a2',
                            room:'A2',
                            ticket:'xxx',
                            start:'2018-06-11T09:20'
                        },{
                            id:'a3',
                            room:'A2',
                            ticket:'xxx',
                            start:'2018-06-12T09:20'
                        },{
                            id:'a4',
                            room:'A2',
                            ticket:'xxx',
                            start:'2018-06-10T09:20'
                        },{
                            id:'a5',
                            room:'A2',
                            ticket:'xxx',
                            start:'2018-06-10T09:20'
                        },{
                            id:'a6',
                            room:'A2',
                            ticket:'xxx',
                            start:'2018-06-10T09:20'
                        }
                    ]
                }*/

            replaceIt(obj)
        }
    })
}

$(function () {



    loading()

    $('body').on('click','#button_want',function () {
        if($(this).css('color')=='rgb(255, 255, 255)'){
            $(this).css('color','red');
        }else{
            $(this).css('color','white');
        }

    })
    //评分
    $('body').on('click','.star img',function () {
        let x=  $('.star img');
        var len=0;
        for(let i = 0;i<x.length;i++){
            console.log(x.eq(i).attr('src'))
            if(x.eq(i).attr('src')=='img/star.png'){
                len++;
            }
        }
        if($(this).attr('src')=='img/starX.png'){
            $(this).attr('src','img/star.png');
            len++;
            $('.star p').text(len+'星');
        }else if($(this).attr('src')=='img/star.png'){
            $(this).attr('src','img/starX.png');
            len--;
            $('.star p').text(len+'星');
        }
    })

    //开关评论
    $('#close_talk').click(function () {
        let x=  $('.star img');
        for(let i = 0;i<x.length;i++){
            x.eq(i).attr('src','img/starX.png')
        }
        $('.star p').text(0+'星');
        $('.pinglun textarea').val('')
        $('.talk_it').slideToggle(500);
    })
    $('#button_talk').click(function () {
        $('.talk_it').slideToggle(500);
    })

    //发表评论
    $('.pinglun button').click(function () {
        $.ajax({
            type: "post",
            url: '',
            data: {
                userId:'userid',
                playId: $.cookie('playid'),
                star:$('.star p').text().charAt(0),
                text:$('.pinglun textarea').val()
            },
            async: true,
            success: function (data) {
                data=JSON.parse(data)
                if(data.res==1){
                    alert('评论成功');
                    let x=  $('.star img');
                    for(let i = 0;i<x.length;i++){
                        x.eq(i).attr('src','img/starX.png')
                    }
                    $('.star p').text(0+'星');
                    $('.talk_it').slideToggle(500);
                }
            }
        })
    })

    $('body').on('click','.list_view table button',function () {
        let scheduleId = $(this).attr('data-id');
        console.log(scheduleId);
        $.cookie('scheduleId',scheduleId,{ expires: 7 ,path: '/'});
        window.location.href='buy.html'
    })


})