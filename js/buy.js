function add(seat) {
    console.log(seat.list);

    $('.seat table').empty();
    for(let i=1;i<=seat.row;i++){
        $('.seat table').append('<tr></tr>')
        for(let j=1;j<=seat.col;j++){
            let k =i-1;
            if(i==3&&j==1){console.log(123)}
            if(seat.list[k*seat.col+j-1]==0){
                $('.seat table tr').eq(k).append('<img src="img/meixuan.png" data-row='+i+' data-col='+j+'>')
            }else if(seat.list[k*seat.row+j-1]==9){
                $('.seat table tr').eq(k).append('<img src="img/yixuan.png" data-row='+i+' data-col='+j+'>')
            }else {
                $('.seat table tr').eq(k).append('<img src="img/yixuan.png" style="visibility: hidden">')
            }

        }
    }

    $('.list').empty();
    for(let i=1;i<=seat.row;i++){
        $('.list').append('<li>'+i+'</li>')
    }
}


var ajaxValue = {
    ajaxSeat :function () {
        $("#ready").attr('disabled',true);
        obj = {
            id:$.cookie('scheduleId') //演出计划id
        }
        console.log(obj)
        $.ajax({
            type: "post",
            url:'/ttms/TicketStatusServlet',
            data:obj,
            async:true,
            success:function (data) {
                data=JSON.parse(data);
                /*data={
                    res:1,
                    row:10,
                    col:10,
                    list:
                        "9,9,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
                }*/
                data.list = data.list.split(',');
                if(data.res==1){
                    add(data);
                }

            }
        })
    },
    ajaxUp: function (obj,flag) {
    	console.log(obj);
        $.ajax({
            type: "post",
            url:'/ttms/TicketSaleServlet',
            data:obj,
            async:true,
            success:function (data) {
 
                /*data={
                    res:1,
                    ticketId:['xxx','xxx','xxx','xxx']
                }*/
            if(flag=='buy'){
                    	
                    	data=JSON.parse(data);
                    	
                if(data.res==1){	
                        $('.zhi').css({
                            'animation':'rotate 0.5s linear 0s 3',
                            '-webkit-animatio':'rotate 0.5s linear 0s 3'})

                        $('.zhi').html("<div class=\"loading\">\n" +
                            "    <div>\n" +
                            "        <span>1</span>\n" +
                            "        <span style=\"color: red\">选择影片场次</span>\n" +
                            "    </div>\n" +
                            "\n" +
                            "    <hr>\n" +
                            "\n" +
                            "    <div>\n" +
                            "        <span>2</span>\n" +
                            "        <span style=\"color: red\">选择座位</span>\n" +
                            "    </div>\n" +
                            "     <hr>\n" +
                            "\n" +
                            "\n" +
                            "    <div>\n" +
                            "        <span>3</span>\n" +
                            "        <span style='color: red'>14分钟内付款</span>\n" +
                            "    </div>\n" +
                            "\n" +
                            "    <hr style=\"background-color:ref;\">\n" +
                            "\n" +
                            "    <div>\n" +
                            "        <span>4</span>\n" +
                            "        <span>电影院取票</span>\n" +
                            "    </div>\n" +
                            "</div>");
                        $('.zhi').append('<h2 style="color:red;position:absolute;height: 40px;bottom: 50px;left: 50%;transform: translateX(-50%)">购票成功，祝您观影愉快</h2>');
                        $('.zhi').append('<h5 style="color:red;position:absolute;height: 40px;left: 50%;transform: translateX(-50%);bottom: 5px">3s之后回到主页</h5>');

                        let time = 5;

                        let change =  function(){
                            console.log(666)
                            $('.zhi h5').text(time+'s后回到主页');
                            time--;
                            if(time==0){
                                window.location.replace('index.html')
                            }
                            setTimeout(change,1000);
                        }

                        change()


                		}
                    
                }else{
                	
                }
            }
            
        })
    }

}

function loading(){
	let scheduleId = $.cookie('scheduleId');
	let playid = $.cookie('playid');
	$.ajax({
        type: "post",
        url:'/ttms/ScheduleServlet',
        data:{
        	id:playid
        },
        async:true,
        success:function (data) {
             data=JSON.parse(data);
             data.list.forEach(function(item,index){
            	 
            	 if(item.id==scheduleId){
                     $('title').text('咸鱼影业—'+data.name);
                	 $('.right_top>img').attr('src',data.img);
                     $('.right_top .name').text(data.name);
                     $('.right_top .type').text(data.type);
                     $('.right_top .time').text(data.director);
                     $('.right_middle .room').text(item.room);
                     $('.right_middle .language').text(data.language);
                     $('.right_middle .start').text(item.start);
                     $('.right_middle .ticket').text(item.ticket);
                     
                     $('.value h3').text(data.name);
                     $('.zhi_middle>img').attr('src',data.img);
                     $('.zhi .value .zhi_start span:nth-of-type(2)').text(item.start);
                     $('.zhi .value .zhi_language span:nth-of-type(2)').text(data.language);
                     $('.zhi .value :nth-last-child(1)').children().eq(1).text('20180'+playid+'0'+scheduleId+'')
             
            	 }
             
            })
       }
	})
}

var len = 0;

function click (event) {
    let f = 'lock'
    let img = $(event.target).attr('src');

    if(img=='img/meixuan.png'){

        if(len<4){
        
            if($.cookie('login')){
            	
            	 len++;
                 $("#ready").attr('disabled',false);
                 $(this)[0].src = "img/xuanzhong.png"

                 $('.price').text('￥'+len*$('.ticket').text());
                 let row = $(this).attr('data-row');
                 let col = $(this).attr('data-col');
                 //锁座位
            	let username = JSON.parse($.cookie('login')).username;
            	 ajaxValue.ajaxUp({
                     status:'lock',
                     row:row,
                     col:col,
                     playId:$.cookie('playid'),
                     scheduleId:$.cookie('scheduleId'),
                     user:username,
                 },f)
                 
                 if(len>0&&len!=1){
                     $('.ticket_view').append('<div  style="margin-left: 10px;display: inline-block;border: 2px solid red;color: red">'+row+'排'+col+'座'+'</div>')
                 }else if(len==1){
                     $('.ticket_view').text('')
                     $('.ticket_view').append('<div style="margin-left: 10px;display: inline-block;border: 2px solid red;color: red">'+row+'排'+col+'座'+'</div>')
                 }
            }else{
            	alert('请先登录');
            }
           
        }else{

        }
    }else if(img =='img/yixuan.png'){
        $('.talk').slideToggle(1000).delay(1000).slideToggle(1000)
    }else{
    	
    	 if($.cookie('login')){
         	let username = JSON.parse($.cookie('login')).username;
         
           
	        len--
	        $(this)[0].src = "img/meixuan.png";
	        $('.price').text('￥'+len*$('.ticket').text())
	        
        if(len==0){
            $("#ready").attr('disabled',true);
            $('.ticket_view').text('一次最多选4个座位');
            
            let row = $(this).attr('data-row');
            let col = $(this).attr('data-col');
         
         
            ajaxValue.ajaxUp({
                status:'unlock',
                row:row,
                col:col,
                playId:$.cookie('playid'),
                scheduleId:$.cookie('scheduleId'),
                user:username
            },f)
            
        }else if(len!=0&&len>0){
            let row = $(this).attr('data-row');
            let col = $(this).attr('data-col');
            let x= $('.ticket_view').children();
            alert(666)
            ajaxValue.ajaxUp({
                status:'unlock',
                row:row,
                col:col,
                playId:$.cookie('playid'),
                scheduleId:$.cookie('scheduleId'),
                user:username
            },f)
            
                for(let i=0;i< x.length;i++){
                    let arry =  x.eq(i).text().split('座');
                    arry = arry[0].split('排');


                    let row2 = arry[0]
                    let col2 = arry[1]
                    if(row2==row&&col2==col){
                        x.eq(i).remove();
                    }
                }
           }

        

    } else {
    	alert('请先登录')
    }
    }
}

$(function () {
	loading()

    $('body').on('click','table img',click);

    ajaxValue.ajaxSeat();

    $('#ready').click(function () {
        if($.cookie('login')){
            $('.buy').fadeIn(500);
            let child = $('.ticket_view').children();
            $('.zhi_seat div').html(child)
        }else{
            alert('请先登录');
        }


    })


    $('body').on('click','#close_zhi',function () {
        $('.buy').fadeOut(500);
    })
    $('body').on('click','.ready_buy',function () {
        let f = 'buy';
        let arry=[];
        let x = $('.zhi_seat div').children();
        for(let i = 0;i<x.length;i++){
            let obj={
                status:'buy',
                user:$('#huan').children().eq(0).text(),
                playId:$.cookie('playid'),
                scheduleId:$.cookie('scheduleId')
            };
            let arr= x.eq(i).text().split('座');
             arr = arr[0].split('排');

            obj['row'] = arr[0];
            obj['col'] = arr[1];



            arry.push(obj);
        }
        
        console.log(arry)
        arry.forEach(function(item){
        	ajaxValue.ajaxUp(item,f);
        })  
    })
     
})
