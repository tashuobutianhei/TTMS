
var num=1;

// var lunbo = {
//     move_left:function () {
//         console.log(666)
//         if(num!==3){
//             $('.all').animate({
//                 left: '-=1200px',
//             });
//             num++;
//         } else {
//             $('.all').animate({
//                 left: '0',
//             });
//             num=1;
//         }
//     },
//
//     move_right:function () {
//         if(num!==1){
//             $('.all').animate({
//                 left: '+=1200px',
//             });
//             num--;
//         } else{
//             $('.all').animate({
//                 left: '-2400px',
//             });
//             num=3;
//         }
//
//
//     }
// };

var lazyLoad = (function(){

    var clock;

    function init(){

        $(window).on("scroll", function(){
            if (clock) {clearTimeout(clock)}
            clock = setTimeout(function(){checkShow();}, 200);

        })
        checkShow();
    }

    function checkShow(){
        $(".lazyload img").each(function(){
            var $cur =$(this);
            if($cur.attr('isLoaded')){
                return;
            }
            if(shouldShow($cur)){
                showImg($cur);
            }
        })
    }

    function shouldShow($node){
        var scrollH = $(window).scrollTop(),
            winH = $(window).height(),
            top = $node.offset().top;

        if(top < winH + scrollH){
            return true;
        }else{
            return false;
        }
    }

    function showImg($node){
        $node.attr('src', $node.attr('data-img'));
        $node.attr('isLoaded', true);
    }

    return {init: init}

})();

var change_this=null;

var obj;

function replaceIndexAll(obj) {
	$('#much').text('正在热映('+obj.length+')')
    obj.forEach(function (item,index) {
    	if(item.status!=-1){
    		
        if(index<8){
            $('.ing .show').append('<div class="show_div" data-playid='+item.num+'>\n' +
                '                        <img data-img='+item.img+' src="img/blank.jpg">\n' +
                '                        <div class="buy_ticket"><a >购票</a></div>\n' +
                '                        <div class="name"><p>'+item.name+'</p></div>\n' +
                '                    </div>');
            if(index==0){
            	 $('.ing .ing_right ol').append('<li style="list-style-type: disc">'+
                         '<img src="img/no.1.jpg@120w_80h_1e_1c" width="100%">'+
                         '<p>'+item.name+'</p>'+
                     '</li>')
            }else{
            	$('.ing .ing_right ol').append(' <li data-playid='+item.num+'>'+item.name+'</li>')
            }
            

        }else if(index<10){
            $(' .ing .ing_right ol').append(' <li data-playid='+item.num+'>'+item.name+'</li>')
        }
    	}
    })

}

function loading(){
        //返回一个复杂的json数组
    $.cookie('scheduleId',' ',{expires: -1,path: '/'});
    $.cookie('playid',' ',{expires: -1,path: '/'});
    $.ajax({
            type: "get",
            url:"/ttms/findPlayAllServlet",
            // 2/?want=watch"
            async:true,
            success:function (data) {
                //展示数据
                obj=JSON.parse(data);
//                obj=[
//                    {
//                        num:'1',
//                        name:'复仇者联盟3',
//                        img:"img/fczlm3.png",
//                        director:'xxx',
//                        language:'xxx',
//                        type:'xxx',
//                        time:'xxx',
//                        status:'xxx',
//                        list:[
//                            {
//                                id:'a1',
//
//                                room:'xxx',
//                                ticket:'xxx',
//                                start:'xxx'
//                            },{
//                                id:'a2',
//
//                                room:'xxx',
//                                ticket:'xxx',
//                                start:'xxx'
//                            }
//                        ]
//                    },
//                    {
//                        num:'2',
//                        name:'复仇者联盟2',
//                        img:"img/fczlm3.png",
//                        director:'xxx',
//                        language:'xxx',
//                        type:'xxx',
//                        time:'xxx',
//                        status:'xxx',
//                        list:[
//                            {
//                                id:'a3',
//                                name:'xxx3',
//                                time:'xxx',
//                                room:'xxx',
//                                ticket:'xxx',
//                                start:'xxx'
//                            },{
//                                id:'a4',
//                                name:'xxx4',
//                                time:'xxx',
//                                room:'xxx',
//                                ticket:'xxx',
//                                start:'xxx'
//                            }
//                        ]
//                    }
//                ];
//                for(i=0;i<30;i++){
//                    obj.push({
//                        num:'1',
//                        name:'xxx',
//                        img:"img/fczlm3.png",
//                        director:'xxx',
//                        language:'xxx',
//                        type:'xxx',
//                        time:'xxx',
//                        status:'xxx',
//                        list:[
//                            {
//                                id:'a1',
//                                name:'xxx1',
//                                time:'xxx',
//                                room:'xxx',
//                                ticket:'xxx',
//                                start:'xxx'
//                            },{
//                                id:'a2',
//                                name:'xxx2',
//                                time:'xxx',
//                                room:'xxx',
//                                ticket:'xxx',
//                                start:'xxx'
//                            }
//                        ]
//                    })
//                }
                console.log(obj)
                replaceIndexAll(obj.obj);
            }
        });
}

function findmovie(val){
        $('.li').empty();
        let len=0;
        if(val==''){

        }else{
            obj.obj.forEach(function (item,index) {
                reg=new RegExp(val)
                if(reg.test(item.name)){
                    len++;
                   if(len<6){
                       $('.li').append('<li data-id='+item.num+'>'+item.name+'</li>')
                   }

                }
            })
        }

 }

 $(function () {


    loading();


    count = 0;
    time=null;
    var fadeLun;
    fadeLun = function () {

        $('.all img').eq(this.count).fadeToggle('slow');

        if (this.count == 2) this.count = 0;
        else  window.count++;

        $('.all img').eq(this.count).fadeToggle('slow');
         time = setTimeout(fadeLun,3000);
    };
    fadeLun();


    $('#one').click(function () {
        clearTimeout(time);
        console.log(window.count);

        $('.all img').eq(window.count).fadeToggle('slow');

        if (window.count == 0) window.count = 2;
        else  window.count--;

        $('.all img').eq(window.count).fadeToggle('slow');
        time = setTimeout(fadeLun,3000);

    })

    $('#two').click(function () {
        clearTimeout(time);
        console.log(window.count);

        $('.all img').eq(window.count).fadeToggle('slow');

        if (window.count == 2) window.count = 0;
        else  window.count++;

        $('.all img').eq(window.count).fadeToggle('slow');
        time = setTimeout(fadeLun,3000);

    })

   
    //懒加载
    lazyLoad.init();


   
    $('body').on('click',' .ing .ing_right ol li',function(){
    	 $.cookie('playid',$(this).attr('data-playid'),{ expires: 7 ,path: '/'});
         window.location.href="movie_fu.html";

    })
    
    
    $('body').on('hover','.show_div',function () {
        $(this).find('.name').fadeToggle('slow')
    })


    $('body').on('click','.buy_ticket',function (e) {
        if(e.target.tagName=='DIV'){
            $.cookie('playid',$(this).parent().attr('data-playid'),{ expires: 7 ,path: '/'});
            window.location.href="movie_fu.html";

        }else if(e.target.tagName=='A'){
            $.cookie('playid',$(this).parent().attr('data-playid'),{ expires: 7 ,path: '/'});
            window.location.href="movie_fu.html";
        }
    })


    //find功能
    var i=-1;

    $('.find input').keyup(function (event) {
        let len = $('.li').children().length;
        if(event.which==38){
            i--;
            if(i<0){
                while(i<0){
                    i=i+len;
                }
            }
            $('.li').children().css('backgroundColor','white')
            $('.li').children().eq(i).css('backgroundColor','rgb(200,170,134)');
        }else if(event.which==40){
            i++;
            if(i>len-1){
                while(i>len-1){
                    i=i-len;
                }
            }
            $('.li').children().css('backgroundColor','white')
            $('.li').children().eq(i).css('backgroundColor','rgb(200,170,134)');
        }else if(event.which==13){
            let lenght = $('.li').children().length;
            for(let i=0;i<lenght;i++){
                if($('.li').children().eq(i).css('backgroundColor')=='rgb(200, 170, 134)'){
                    let id = $('.li').children().eq(i).attr("data-id");
                    $.cookie('playid',id,{ expires: 7 ,path: '/'});
                    $(this).val('')
                    window.location.href='movie_fu.html';
                }
            }
        }else{
            let val = $(this)[0].value;
            findmovie(val);
        }

    })



    //
    // $('body').on('click','.username',function () {
    //     let username = $(this).text();
    //     $.cookie('username',username,{ expires: 7 ,path: '/'});
    //     window.location.href='user.html'
    // })
    //
    // $('body').on('click','.out',function () {
    //     $.cookie('username',' ',{expires: -1,path: '/'});
    //     window.location.replace('index.html')
    // })

 })