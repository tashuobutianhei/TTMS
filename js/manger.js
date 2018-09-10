var movie = [];
var people= [];
// $(function () {
//     alert(666)
// })
window.onload=function () {
    //替换
    var replaceobj = {
        replace :function (arr) {
            $('#watch table').empty();
            $('<tr>\n' +
                '                        <th>'+'名称'+'</th>\n' +
                '                        <th>'+'时长'+'分钟</th>\n' +
                '                        <th>'+'票价'+'</th>\n' +
                '                        <th>'+'演出厅'+'</th>\n' +
                '                        <th>'+'开始时间'+'</th>\n' +
                '                    </tr>'
            ).appendTo($('#watch table'));
            for(var i = 0;i<arr.length;i++){
                $('<tr>\n' +
                    '                        <th>'+arr[i].name+'</th>\n' +
                    '                        <th>'+arr[i].time+'分钟</th>\n' +
                    '                        <th>'+arr[i].ticket+'</th>\n' +
                    '                        <th>'+arr[i].room+'</th>\n' +
                    '                        <th>'+arr[i].start+'</th>\n' +
                    '                    </tr>'
                ).appendTo($('#watch table'));
            }

        },
        replacePeople:function (arr) {
            $('.count3').eq(0).empty();
            $('    <tr>\n' +
                '                            <th>'+'工号'+'</th>\n' +
                '                            <th>'+'姓名'+'</th>\n' +
                '                            <th>'+'电话'+'</th>\n' +
                '                            <th>'+'电子邮箱'+'</th>\n' +
                '                            <th>'+'地址'+'</th>\n' +
                '                        </tr>').appendTo($('.count3').eq(0));

            for(var i=0;i<arr.length;i++){
                $('    <tr>\n' +
                    '                            <th>'+arr[i].num+'</th>\n' +
                    '                            <th>'+arr[1].name+'</th>\n' +
                    '                            <th>'+arr[i].tel+'</th>\n' +
                    '                            <th>'+arr[i].email+'</th>\n' +
                    '                            <th>'+arr[i].address+'</th>\n' +
                    '                        </tr>').appendTo($('.count3').eq(0));
            }
        },
        replaceMoney:function (arr) {
            $('#money table').empty();
            $('  <tr>\n' +
                '                        <th>电影名称</th>\n' +
                '                        <th>票房</th>\n' +
                '                    </tr>').appendTo( $('#money table'));
            for(var i=0;i<arr.length;i++){
                $('  <tr>\n' +
                    '                        <th>复仇者联盟</th>\n' +
                    '                        <th>15亿</th>\n' +
                    '                    </tr>').appendTo( $('#money table'));
            }
        }
    }
    var AjaxValue = {
        watch :function () {
            $.ajax({
                type: "get",
                url:"9/?want=watch",
                // url:'',
                async:true,
                success:function (data) {
                    //展示数据

                    movie = JSON.parse(data).values;
                    replaceobj.replace(movie);
                }
            })
        },
        change :function () {
            var form = $('form')[0];
            let obj={
                want:'change',
                name:form.elements[0].value,
                start:form.elements[1].value,
                room:form.elements[2].value
            }
            console.log(obj);
            $.ajax({
                type: "post",
                url:"2",
                data:obj,
                async:true,
                success:function (data) {
                    //展示数据
                    obj = JSON.parse(data);
                    if(obj.res==1){
                        alert('修改成功');
                        movie=obj.values;
                        replaceobj.replace(movie);
                    }else {
                        alert('修改失败产生冲突');
                    }
                }
            })
        },
        add : function () {
            var form = $('form')[1];
            let obj={
                want:'add',
                name:form.elements[0].value,
                long:form.elements[1].value,
                room:form.elements[2].value,
                start:form.elements[3].value,
                ticket:form.elements[4].value
            }
            console.log(obj);
            $.ajax({
                type: "post",
                url:"3",
                async:true,
                data:obj,
                success:function (data) {
                    //展示数据
                    obj = JSON.parse(data);
                    if(obj.res==1){
                        alert('添加成功');
                        movie=obj.values;
                        replaceobj.replace(movie);
                    }else {
                        alert('添加失败产生冲突');
                    }
                }
            })

        },
        remove : function () {
            var form = $('form')[2];
            let obj={
                want:'remove',
                name:form.elements[0].value,
                room:form.elements[1].value,
                start:form.elements[2].value
            }
            console.log(obj);
            $.ajax({
                type: "post",
                url:"4",
                async:true,
                data:obj,
                success:function (data) {
                    //展示数据
                    obj = JSON.parse(data);
                    if(obj.res==1){
                        alert('删除成功');
                        movie=obj.values;
                        replaceobj.replace(movie);
                    }else {
                        alert('删除失败产生冲突');
                    }
                }
            })

        },
        addPeople : function () {
            var form = $('form')[3];
            let obj={
                want:'addPeople',
                num:form.elements[0].value,
                name:form.elements[1].value,
                tel:form.elements[2].value,
                email:form.elements[3].value,
                address:form.elements[4].value
            }
            console.log(obj);
            $.ajax({
                type: "post",
                url:"5",
                async:true,
                data:obj,
                success:function (data) {
                    //展示数据
                    obj = JSON.parse(data);
                    if(obj.res==1){
                        alert('添加成功');
                        people=obj.values;
                        replaceobj.replacePeople(people);
                    }else {
                        alert('添加成功产生冲突');
                    }
                }
            })
        },
        removePeople : function () {
            var form = $('form')[4];
            let obj={
                want:'removePeople',
                num:form.elements[0].value,
            }
            console.log(obj);
            $.ajax({
                type: "post",
                url:"6",
                async:true,
                data:obj,
                success:function (data) {
                    //展示数据
                    obj = JSON.parse(data);
                    if(obj.res==1){
                        alert('删除成功');
                        people=obj.values;
                        replaceobj.replacePeople(people);
                    }else {
                        alert('添加成功产生冲突');
                    }
                }
            })
        },
        findmoney :function () {
            let obj={
                want:'money',
            }
            console.log(obj);
            $.ajax({
                type: "post",
                url:"7",
                async:true,
                data:obj,
                success:function (data) {
                    //展示数据
                    obj = JSON.parse(data);
                    if(obj.res==1){
                        alert('添加成功');
                        money=obj.values;
                        replaceobj.replaceMoney(money);
                    }else {
                        alert('检查网络');
                    }
                }
            })
        }
    }

    var addORremove = function () {
        //alert(555)
        $('#delete').click(function () {
            $('form').eq(4).slideToggle(1000)
        })

        $('#addone').click(function () {
            $('form').eq(3).slideToggle(1000)
        })

        $('#close1').eq(0).click(function () {
            $('form').eq(3).slideToggle(1000)
        })

        $('#close2').eq(0).click(function () {
            $('form').eq(4).slideToggle(1000)
        })
    };
    addORremove()

    var id;
    //效果
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

    //Ajax
    AjaxValue.watch();
    AjaxValue.findmoney();
    $('#change button').on('click',AjaxValue.change);
    $('#change button').on('click',AjaxValue.change);
    $('#add button').on('click',AjaxValue.add);
    $('#remove button').on('click',AjaxValue.remove);
    $('#readyadd').on('click',AjaxValue.addPeople);
    $('#readyremove').on('click',AjaxValue.removePeople);




}