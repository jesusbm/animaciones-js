
var L1;
var L2;
var L3;
var R;
var theta;
var theta2;
var ctx;
var WIDTH;
var HEIGHT;

function inicializar(){
    var canvas = document.getElementById("lienzo");
    ctx = canvas.getContext("2d");
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    L1 = 85; 
    L2 = L1*1.618;
    L3 = L1/1.618;
    R = 8;
    theta = 0;
    limpiar();
    setInterval(dibujar, 20);
}

function dibujar(){

    //calculo del angulo del segundo eslabon
    theta2 = Math.acos(L1*Math.cos(theta)/L2) + Math.PI;

    limpiar();
    ctx.save();
        ctx.translate(WIDTH/2, HEIGHT-L1-R);
        ctx.rotate(theta);
        barra(L1, R);
            ctx.translate(L1, 0);
            ctx.rotate(-theta+theta2);
            barra(L2, R);
                ctx.translate(L2, 0);
                ctx.rotate(-theta2);
                piston(L3, L1);
    ctx.restore();
    
    ctx.save();

    theta += Math.PI/30;
}

function piston(largo, ancho){
    ctx.strokeRect(-ancho/2, -largo/2, ancho, largo);
}

function barra(L, R){
    ctx.beginPath();
    ctx.arc(0,0,R,-Math.PI/2, Math.PI/2, true);
    ctx.lineTo(L,R);
    ctx.arc(L,0,R,Math.PI/2,-Math.PI/2, true);
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(0,0,R/2,0,2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(L,0,R/2,0,2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
}

function limpiar(){
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.strokeRect(0,0,WIDTH, HEIGHT);
}

