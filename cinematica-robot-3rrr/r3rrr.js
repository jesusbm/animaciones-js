/*
    Cinematica inversa del un robot paralelo planar 3rrr redundante.
    Inverse kinematics of a 3rrr redundant planar parallel robot.
    ruskiikot@gmail.com
*/


var P0;
//var P1;
//var P2;
//var P3;
var BX;
var BY;
var L1;
var L2;
//var L3;
//var T0;
var T1;
var T2;
var R;

var r;
var deltar;
var theta;

var ctx;
var WIDTH;
var HEIGHT;
var WIDTH2;
var HEIGHT2;

function inicializar(){
    P0 = [10, 0];
    //P1 = P0;
    //P2 = P0;
    //P3 = P0;

    BX = [ -50,  50,  0];
    BY = [ -50, -50, 50];
    L1 = [ 60,  60,  60];
    L2 = [ 60,  60,  60];
    //L3 = [ 20,  20,  20];
    T1 = [-0.5,  1.0,  4.0];
    T2 = [ 1.5,  1.5,  1.4];
    R  = 5;
    deltar = 0.1;
    r = 0;
    theta = 0;
    var canvas = document.getElementById("lienzo");
    ctx = canvas.getContext("2d");
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    WIDTH2 = WIDTH/2;
    HEIGHT2 = HEIGHT/2;
    ctx.translate(WIDTH2, HEIGHT2);
    ctx.scale(1, -1);
    limpiar();
    setInterval(dibujar, 20);
}

function dibujar(){

    var aux;
    limpiar();
    for (var i=0; i<3; i++){
        ctx.save();
            //traslacion al origen del brazo i-esimo
            ctx.translate(BX[i], BY[i]);
            
            //se calcula una nueva posicion objetivo
            P0[0] = r*Math.cos(theta);
            P0[1] = r*Math.sin(theta);
            aux = cinversa(i, P0);
            T1[i]=aux[0];
            T2[i]=aux[1];
            
            //se calculan los angulos de los eslabones del brazo i-esimo
            brazo(i);
        ctx.restore();
    }
    
    //nueva posicion de la trayectoria
    theta += Math.PI/36;
    r += deltar;
    deltar = (r>40 || r<0) ? -deltar : deltar;
}

function cinversa(i, P){
    var Lc = (P[0]-BX[i])*(P[0]-BX[i]) + (P[1]-BY[i])*(P[1]-BY[i]);
    t1 = Math.atan2(P[1]-BY[i], P[0]-BX[i]) + Math.acos((L1[i]*L1[i] + Lc - L2[i]*L2[i])/(2*L1[i]*Math.sqrt(Lc)));
    t2 = Math.acos((L1[i]*L1[i] + L2[i]*L2[i] - Lc)/(2*L1[i]*L2[i])) + Math.PI;
    return [t1, t2];
}

function brazo(i){
    ctx.save();
    ctx.rotate(T1[i]);
    barra(L1[i], R);
    ctx.translate(L1[i], 0);
    ctx.rotate(T2[i]);
    barra(L2[i], R);
    ctx.restore();
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
    ctx.clearRect(-WIDTH2,-HEIGHT2,WIDTH,HEIGHT);
    //ctx.strokeRect(-WIDTH2,-HEIGHT2,WIDTH,HEIGHT);
}

