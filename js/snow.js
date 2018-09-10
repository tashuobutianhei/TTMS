
    var snows=[];
    var canvas = document.getElementById('snow');
    var width = window.innerWidth;
    var hegiht = window.innerHeight;

    function onresize(){
        canvas.width=width;
        canvas.height=hegiht;
        makesnow(width*hegiht/50000);
        context = canvas.getContext('2d');
        context.clearRect(0, 0,width*10, hegiht*10);     //清空
    }

    function snow(){
        this.x =0;
        this.y = 0;
        this.run_x = 0; //运动状态
        this.run_y = 0;
        this.reset()
    }
    snow.prototype.reset=function(){
        this.x = Math.random()*window.innerWidth;;
        this.y = Math.random()*window.innerHeight;;
        this.run_x = (Math.random() * 1) - 0.5; //运动状态
        this.run_y = (Math.random() * 0.5) + 0.5;
    }


    function makesnow(cont){
        snows=[];
        for(var i=0;i<cont;i++){
            m = new snow();
            snows.push(m);
        }
    }

    function draw(){
        context = canvas.getContext('2d');
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);     //清空

        var gradient = context.createLinearGradient(0,0,10,10);

        gradient.addColorStop(0,'#FF4500');
        gradient.addColorStop(1,'#FFB90F');



        context.fillStyle='#FF4500';

        for(var i=0;i<snows.length;i++){
            snows[i].x+=snows[i].run_x;
            snows[i].y+=snows[i].run_y;
            if(snows[i].x>window.innerWidth||snows[i].y>window.innerHeight){
                snows[i].reset();
            }
            context.beginPath();

            context.arc(snows[i].x,snows[i].y,5,0,Math.PI*2);
            context.fill();

        }
        window.requestAnimationFrame(draw);
    }

    onresize();
    addEventListener('resize',onresize);
    draw();



