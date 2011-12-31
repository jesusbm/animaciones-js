
contexto = new Object();
contador = 1;
unirCajas = false;
cajasUnidas = false;

function inicializar(){
    contexto.canvas = $("lienzo");
    contexto.ctx = contexto.canvas.getContext("2d");
    contexto.W   = contexto.canvas.width;
    contexto.H   = contexto.canvas.height;
    contexto.W2  = contexto.W/2;
    contexto.H2  = contexto.H/2;
    contexto.ctx.translate(contexto.W2, contexto.H2);
    contexto.ctx.scale(1.0, -1.0);

    limpiar();
    var s = new Simulacion(20, 50, 20, 1000);

    intrv = setInterval(
            function(){
                limpiar();
                s.dibujar(contexto.ctx);
                s.mover();
                
                //$("mensaje").innerHTML = cajasUnidas;
                if (unirCajas){
                    if(s.sep > 0.0){
                        s.sep -= 0.005;
                    }else{
                        cajasUnidas = true;
                        unirCajas = false;
                    }
                }
                
                if (cajasUnidas){
                    var T1 = s.s1.T;
                    var T2 = s.s2.T;
                    var delta = (T2-T1)/200;
                    //$("mensaje").innerHTML = s.s1.T + "<br/>" + s.s2.T;
                    s.s1.cambiarEnergia(T1+delta);
                    s.s2.cambiarEnergia(T2-delta);
                }
            },
            25);
}

function limpiar(){
    contexto.ctx.clearRect(-contexto.W2,-contexto.H2,contexto.W,contexto.H);
    //contexto.ctx.strokeRect(-contexto.W2,-contexto.H2,contexto.W,contexto.H);
}

function eventoBoton(){
    unirCajas = true;
}

function $(id){
    return document.getElementById(id);
}

/*
 *
 */
function Simulacion(N1, T1, N2, T2){
    var Lx = 150;
    var Ly = 150;
    this.s1 = new Sistema(N1, Lx, Ly, T1, "#0AA");
    this.s2 = new Sistema(N2, Lx, Ly, T2, "#A0A");
    this.sep = 0.1;
    
    this.mover = 
        function(){
            this.s1.mover();
            this.s2.mover();
        };

    this.dibujar = 
        function(ctx){
            ctx.save();
            ctx.translate(-(1.0+this.sep)*Lx, -75);
            this.s1.dibujar(ctx);
            ctx.translate( (1.0+2.0*this.sep)*Lx, 0);
            this.s2.dibujar(ctx);
            ctx.restore();
        };
}

