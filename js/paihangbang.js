
function  replaceIndexPai(obj){
    console.log(obj)
    obj.forEach(function (item,index){

        let it;
        if(index==0){
            it = '&hearts;';
        }else{
            it = index+1;
        }

        if(index<10){
            $('#cinemas').append('\t<li class="cinema">\n' +
                '\t\t\t\t\t<span class="num">'+it+'</span>\n' +
                '\t\t\t\t\t<a href="#"><img src='+item.img+' alt="'+item.name+'" title='+item.name+'/></a>\n' +
                '\t\t\t\t\t<div style="color: white">\n' +
                '\t\t\t\t\t\t<a href="#"><h2>'+item.name+'</h2></a>\n' +
                '\t\t\t\t\t\t<p class="actor">主演：'+item.director+'</p>\n' +
                '\t\t\t\t\t\t<span class="time">上映时间：2018-03-30</span>\n' +
                '\t\t\t\t\t\t<i class="score"><span>9.</span>1</i>\n' +
                '<button class="buy" data-playid='+item.num+'>前去观影</button>'+
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t</li>')
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
//            obj=[
//                {
//                    num:'1',
//                    name:'复仇者联盟3',
//                    img:"img/fczlm3.png",
//                    director:'xxx',
//                    language:'xxx',
//                    type:'xxx',
//                    time:'xxx',
//                    status:'xxx',
//                    list:[
//                        {
//                            id:'a1',
//
//                            room:'xxx',
//                            ticket:'xxx',
//                            start:'xxx'
//                        },{
//                            id:'a2',
//
//                            room:'xxx',
//                            ticket:'xxx',
//                            start:'xxx'
//                        }
//                    ]
//                },
//                {
//                    num:'2',
//                    name:'复仇者联盟2',
//                    img:"img/fczlm3.png",
//                    director:'xxx',
//                    language:'xxx',
//                    type:'xxx',
//                    time:'xxx',
//                    status:'xxx',
//                    list:[
//                        {
//                            id:'a3',
//                            name:'xxx3',
//                            time:'xxx',
//                            room:'xxx',
//                            ticket:'xxx',
//                            start:'xxx'
//                        },{
//                            id:'a4',
//                            name:'xxx4',
//                            time:'xxx',
//                            room:'xxx',
//                            ticket:'xxx',
//                            start:'xxx'
//                        }
//                    ]
//                }
//            ];
//            for(i=0;i<30;i++){
//                obj.push({
//                    num:'1',
//                    name:'xxx',
//                    img:"img/fczlm3.png",
//                    director:'xxx',
//                    language:'xxx',
//                    type:'xxx',
//                    time:'xxx',
//                    status:'xxx',
//                    list:[
//                        {
//                            id:'a1',
//                            name:'xxx1',
//                            time:'xxx',
//                            room:'xxx',
//                            ticket:'xxx',
//                            start:'xxx'
//                        },{
//                            id:'a2',
//                            name:'xxx2',
//                            time:'xxx',
//                            room:'xxx',
//                            ticket:'xxx',
//                            start:'xxx'
//                        }
//                    ]
//                })
//            }
            console.log(obj)
            replaceIndexPai(obj.obj);
        }
    });
}



$(function () {
    loading();
    $('body').on('click','.buy',function () {
        let id = $(this).attr('data-playid');
        $.cookie('playid',id,{ expires: 7 ,path: '/'});
        window.location.href='movie_fu.html'
    })
})