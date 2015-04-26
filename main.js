window.onload = function () {
    setTimeout(function(){
        document.getElementById('logo').classList.add('end');
        document.getElementById('background').style.opacity = '0';
    }, 500);

    var columnNum = 24;
    var rowNum = 6;



    setTimeout(function(){
        document.querySelector('.slogan').classList.add('show');
        createGrids(document.querySelector('.grids'), columnNum, rowNum);
        gridPlayer.stepPlay('AIHOME');

        createGrids(document.querySelector('.loading'), columnNum, 1);
        gridPlayer.playLoading();

    }, 1500);
}