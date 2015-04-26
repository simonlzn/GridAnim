function createGrids(el, columnNum, rowNum){
    var gridHtml = '';

    for(var j = 0; j < rowNum; j++)
    {
        for(var i = 0; i < columnNum; i++) {
            gridHtml += '<div class="grid" data-cell="' + i + '_' + j + '"></div>'
        }
    }
    el.innerHTML = gridHtml;
}


var gridPlayer = {
    options :{
        nrOfColumn : 24,
        nrOfRow: 6
    },

    alphabeta : {A:[{i:0, j:0},{i:0,j:1},{i:1,j:0}, {i:2, j:0}, {i:0, j:2}, {i:1,j:2}, {i:0,j:3},{i:2, j:1},{i:2, j:2},{i:0, j:4}, {i:2,j:3},{i:2,j:4}],
        I:[{i:0, j:0}, {i:1,j:0}, {i:1, j:2}, {i:2,j:0},{i:1,j:1},{i:1,j:2},{i:1,j:3},{i:1,j:4}, {i:0, j:4}, {i:2, j:4}],
        H:[{i:0,j:0},{i:0,j:1},{i:0,j:2},{i:1,j:2},{i:0,j:3},{i:2,j:2},{i:2,j:1},{i:0,j:4},{i:2,j:3},{i:2,j:0},{i:2,j:4}],
        O:[{i:0,j:0},{i:0,j:1},{i:0,j:2},{i:0,j:3},{i:0,j:4},{i:1,j:4},{i:2,j:4},{i:2,j:3},{i:2,j:2},{i:2,j:1},{i:2,j:0},{i:1,j:0}],
        M:[{i:0,j:0},{i:0,j:1},{i:1,j:1},{i:0,j:2},{i:0,j:3},{i:2,j:0},{i:2,j:1},{i:2,j:2},{i:0,j:4},{i:2,j:3},{i:2,j:4}],
        E:[{i:0,j:0},{i:0,j:1},{i:0,j:2},{i:1,j:0},{i:1,j:2},{i:0,j:3},{i:2,j:0},{i:2,j:2},{i:0,j:4},{i:1,j:4},{i:2,j:4}]
    },

    stepPlay : function(str){
        var that = this;
        var step = 0;
        var interval = setInterval(function(){
            for(var i = 0; i<str.length;i++) {
                var script = that.alphabeta[str[i]];
                if(step < script.length)
                    document.querySelector('.grids [data-cell="' + (script[step].i + i * 4) + '_' + script[step].j + '"]').classList.add('show');
            }
            step++;
            if(step >=12)
                clearInterval(interval);
        },70);
    },

    playLoading :function(){
        var step = 0;
        var that =this;
        var interval = setInterval(function(){
            document.querySelector('.loading [data-cell="' + step%that.options.nrOfColumn + '_' + 0 + '"]').classList.add('show');
            document.querySelector('.loading [data-cell="' + (step + that.options.nrOfColumn -1)%that.options.nrOfColumn + '_' + 0 + '"]').classList.remove('show');
            step++;
        },1000);
    },

    clearGrids : function(){
        var grids = document.querySelectorAll('.grids .grid');
        Array.prototype.forEach.call(grids, function(grid){
            grid.classList.remove('show');
        });
    },

    randomVolum : function(){
        this.clearGrids();

        var that =this;
        var randomVals = [];

        for(var i =0; i < that.options.nrOfColumn; i++){
            randomVals.push(Math.floor((Math.random() * (that.options.nrOfRow -1)) + 1));
        }

        var step = 0;
        var interval = setInterval(function(){
            for(var i =6; i < 18; i++) {
                if(step < randomVals[i])
                    document.querySelector('.grids [data-cell="' + i + '_' + (that.options.nrOfRow - 1 - step) + '"]').classList.add('show');
            }
            step++;

            if(step >= that.options.nrOfRow) {
                clearInterval(interval);
                fadeOut();
            }
        },100);


        function fadeOut(){
            step = 0;
            var interval = setInterval(function(){
                for(var i =6; i < 18; i++) {
                    if((that.options.nrOfRow - 1 -step) <= randomVals[i])
                        document.querySelector('.grids [data-cell="' + i + '_' + step + '"]').classList.remove('show');
                }
                step++;

                if(step >= that.options.nrOfRow) {
                    clearInterval(interval);
                    that.randomVolum();
                }
            },100);
        }
    }
};

