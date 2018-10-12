var  my$ = {
    tap:function(dom,callback){

        if(!dom || typeof dom != 'object'){
            return;
        }

        var startTime,startX,startY,endX,endY;
        dom.addEventListener('touchstart',function(e){
            if(e.targetTouches.length > 1){
                return;
            }
            startTime = Date.now();
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;

        })

        dom.addEventListener('touchend',function(e){
            if(e.changedTouches.length >1){
                return;
            }
            if(Date.now() - startTime > 150){
                return;
            }
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            if(Math.abs(endX - startX) < 30 && Math.abs(endY - startY) < 30){
                callback && callback(e);
            }



        })



    }
}