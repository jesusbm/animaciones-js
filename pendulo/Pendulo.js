
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
        return (n%m + m)%m;
}

function leerAngulo(){
    ang = mod($('angulo').value, 360);
    $('angulo').value = ang;
    return grad2rad(ang);
}

function $(id){
    return document.getElementById(id);
}

/*
 * Objeto que representa un pendulo en el plano
 */
function Pendulo(x, y, L, ang0){
	
	//punto (0,0) del sistema
	this.O = new P2(x, y);
	
	//variables de estado
	this.Q = new P2(ang0, 0);
	this.L = L;
	this.X = new P2(this.L*Math.sin(ang0),-this.L*Math.cos(ang0));//this.ang2xy(this.Q.x);
	this.mover = 
		function(){
			//mostrar(this.Q.x);
			this.Q = this.integrador(this.Q);
		};
	this.integrador =
		function(x){
			return this.euler(this.modelo, x);
		};
	this.dibujar = 
		function(ctx){
			//this.X = this.ang2xy(this.Q.x);
			ctx.save();
				ctx.rotate(this.Q.x - Math.PI/2);
				this.barra(this.L, 6, ctx);
			ctx.restore();
		};
	this.modelo = 
		function (Q){
			return new P2(Q.y, Math.sin(Q.x)-0.5*Q.y);
		};
	this.euler = 
		function(f, Q){
			var h = 0.15;
			return Q.sum(f(Q).esc(h));
		};
	/*this.ang2xy = 
		function(theta){
			return new P2(this.L*Math.sin(theta),-this.L*Math.cos(theta));
		};*/
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
