function replaceMovieAll(obj) {
    var len = -1;
    var ye;
    obj.forEach(function (item,index) {
        len++;
        if(len%10===0){
            ye=len/10
            $('#all').append('<div class="all" id=a'+len/10+'></div>')
        }
    })

    let x = $('#all').children();

    obj.forEach(function (item,index) {
    	if(item.status!=-1){
    		
        let n = Math.floor(index/10);
        x.eq(n).append('<div class="movieIt" data-playid='+item.num+'>\n' +
            '                    <img src='+item.img+'>\n' +
            '                    <div class="name"><a>前去购票</a></div>\n' +
            '                    <div >'+item.name+'</div>\n' +
            '                </div>');
    	}
    });
    for(let i=0;i<=ye;i++){
        k=i+1;
        $('.movie_main>ul').append('<li><a href=#a'+i+'>'+k+'</a></li>');
        if(i==ye){
        $('.movie_main>ul').append('<li><a href=#a'+i+'>尾页</a></li>');
        }
    }

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
               
                replaceMovieAll(obj.obj);
            }
        });
}

$(function () {

    $('body').on('hover','img',function () {
        $(this).next().next().fadeToggle(1000);
    })

    loading();
    //进入电影页面
    $('body').on('click','.name',function () {
        id  = $(this).parent().attr('data-playid');
        $.cookie('playid',id,{ expires: 7 ,path: '/'});
        window.location.href='movie_fu.html'
    })


    $('.guide>div>div span').click(function () {
        let type = $(this).parent().parent()[0].className;
        console.log(type)
        switch (type){
            case 'guide_language':{
                let x =  $('span',$('.guide .'+type));
                x.removeClass('link');
                $(this).addClass('link');
            };break;
            case 'guide_type':{
                let x =  $('span',$('.guide .'+type));
                x.removeClass('link');
                $(this).addClass('link');
            };break;
            case 'guide_time':{
                let x =  $('span',$('.guide .'+type));
                x.removeClass('link');
                $(this).addClass('link');
            };break
        }

    })
})