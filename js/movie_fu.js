function replaceIt(obj) {
    $('title').text('咸鱼影业—'+obj[0].name);

    $('.movie_font h1').text(obj[0].name);
    console.log(obj[0].img)
    $('.movie_font').prev().attr("src",obj[0].img);


    $('.movie_font  p:nth-of-type(1)').text(obj[0].name);
    $('.movie_font  p:nth-of-type(2)').text(obj[0].director);
    $('.movie_font  p:nth-of-type(3)').text(obj[0].type);
    $('.movie_font  p:nth-of-type(4)').text(obj[0].language);
    $('.movie_font  p:nth-of-type(5)').text(obj[0].date);

    obj.forEach(function (item,index) {
        if(index>0){
            $('.movie_more1').append('<div>\n' +
                '                    <img src='+item.img+'>\n' +
                '                    <p data-id='+item.num+'>'+item.name+'</p>\n' +
                '                </div>')
        }
    })
}

function loading(){
    let playid = $.cookie('playid');

    $.ajax({
        type: "post",
        url: '/ttms/findAllScheServlet',
        data: {
            id:playid
        },
        async: true,
        success: function (data) {
            obj = JSON.parse(data);
            /*obj=[{
                    num:'1',
                    name:'复仇者联盟123',
                    img:"img/fczlm3.png",
                    director:'xxx',
                    language:'xxx',
                    type:'xxx',
                    money:'xxx', //票房
                    date:'xxx'  //上映日期
                }, {
                    num:'2',
                    name:'复仇者联盟123',
                    img:"img/fczlm3.png",

                }, {
                    num:'3',
                    name:'复仇者联盟123',
                    img:"img/fczlm3.png",

                }, {
                    num:'4',
                    name:'复仇者联盟123',
                    img:"img/fczlm3.png",

                }, {
                    num:'5',
                    name:'复仇者联盟123',
                    img:"img/fczlm3.png",

                }]*/

            replaceIt(obj)
        }
    })
}

$(function () {
    loading();
    //页面跳转
    $('body').on('click','.movie_more1 p',function () {
         let id = $(this).attr('data-id');
         $.cookie('playid',id,{ expires: 7 ,path: '/'});
         window.location.replace('movie_fu.html')
    })
    
    $('body').on('click','#button_buy',function () {
        window.location.href='schedule.html'
    })


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
        }else if($(this).attr('src')=='img/starX.png'){
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
})