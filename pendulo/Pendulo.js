
CTX = new Array();

function inicializar(){
        CTX.canvas = document.getElementById("lienzo");
        CTX.ctx = CTX.canvas.getContext("2d");
        CTX.H = CTX.canvas.height;
        CTX.W = CTX.canvas.width;
        CTX.H2 = CTX.H/2;
        CTX.W2 = CTX.W/2;
        
        CTX.ctx.translate(CTX.W2, CTX.H2);
        
        limpiar();
        
        anguloMeta = leerAngulo();
        pendulo = new Pendulo(0, 0, 150, anguloMeta);
        
        setInterval(animar, 25);
}

function limpiar(){
    CTX.ctx.clearRect(-CTX.W2, -CTX.H2, CTX.W, CTX.H);
    CTX.ctx.strokeRect(-CTX.W2, -CTX.H2, CTX.W, CTX.H);
}

function mostrar(s){
    document.getElementById("mensaje").innerHTML = s;
}

function reiniciar(){
    modificarAngulo(180);
    anguloMeta = leerAngulo();
    pendulo = new Pendulo(0, 0, 150, anguloMeta);
}

function alcanzar(){
    anguloMeta = leerAngulo();
}

function animar(){
    limpiar();
    pendulo.dibujar(CTX.ctx);
    pendulo.mover();
}

function rad2grad(rad){
    return rad*180/Math.PI;
}

function grad2rad(grad){
    return grad*Math.PI/180;
}

function mod(n, m){
        return n%m;//se pueden obtener numeros negativos
        //return (n%m + m)%m;//no se pueden obtener numeros negativos
}

function leerAngulo(){
    ang = mod($('angulo').value, 360);
    $('angulo').value = ang;
    return grad2rad(ang);
}

function modificarAngulo(angGrad){
    $('angulo').value = angGrad;
}

function $(id){
    return document.getElementById(id);
}

/*
 * Objeto que representa un pendulo en el plano
 */
function Pendulo(x, y, L, ang0){

    //momento de entrada al sistema
    this.Tau = 0.0;
    
    //punto (0,0) del sistema
    this.O = new P2(x, y);
    
    //variables de estado
    this.Q = new P2(ang0, 0);
    
    this.L = L;
    
    this.Cntrl = new ControladorPID();
    
    this.mover = 
        function(){
            //mostrar(this.Q.x);
            this.Tau = this.Cntrl.output(anguloMeta - this.Q.x, -this.Q.y);
            this.Q = this.integrador(this.Q, this.Tau);
        };
    this.integrador =
        function(x, T){
            return this.euler(this.modelo, x, T);
        };
    this.dibujar = 
        function(ctx){
            ctx.save();
                ctx.rotate(this.Q.x - Math.PI/2);
                this.barra(this.L, 6, ctx);
            ctx.restore();
        };
    this.modelo = 
        function (Q, T){
            return new P2(Q.y, Math.sin(Q.x) - 0.5*Q.y + T);
        };
    this.euler = 
        function(f, Q, T){
            var h = 0.15;
            return Q.sum(f(Q, T).esc(h));
        };
    this.barra =
        function (L, R, ctx){
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
        };
}

/*
 * Controlador
 */
function ControladorPID(){

    //constantes del controlador PID
    this.Kp = 1.5;
    this.Kd = 2.5;
    this.Ki = 0.05;
    
    //estado del integrador
    this.suma = 0.0;
    
    //limite de la accion integral
    this.limite = 5.0;

    //calcula la salida del integrador
    this.output = 
        function (e, de){
            this.suma += this.Ki*e;
            this.suma = this.suma >  this.limite ?  this.limite : this.suma ;
            this.suma = this.suma < -this.limite ? -this.limite : this.suma ;
            return this.Kp*e + this.Kd*de + this.suma;
        };
}

