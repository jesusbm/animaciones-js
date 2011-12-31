
CTX = new Array();
P = new Array();
P[0] = new P2(20, 20);
P[1] = new P2(40, 20);
P[2] = new P2(40, 40);
P[3] = new P2(20, 40);
L = new Array();
L.push(P);
intervAnim;
integrador;
adelante;

function inicializar(){
		CTX.canvas = document.getElementById("lienzo");
		CTX.ctx = CTX.canvas.getContext("2d");
		CTX.H = CTX.canvas.height;
		CTX.W = CTX.canvas.width;
		CTX.H2 = CTX.H/2;
		CTX.W2 = CTX.W/2;
		
		CTX.ctx.translate(CTX.W2, CTX.H2);
		
		limpiar();
		intervAnim = setInterval(animacion, 150);
		//integrador = getIntegrador(euler, osciladorArmonico);
		integrador = getIntegrador(verlet, osciladorArmonico);
		adelante=true;
}

function animacion(){
	var c = CTX.ctx;
	if (adelante){
		P = P.map(integrador);
		L.push(P);
	}else{
		if (L.length>2){
			L.pop();
		}else{
			L.pop();
			P = L.pop(); //P = L[0];
			L.push(P);
			adelante=true;
		}
	}
	limpiar();
	var i, j;
	for(i=0; i<L.length; i++){
		c.beginPath();
		c.moveTo(L[i][0].x, L[i][0].y);
		for (j=1; j<L[i].length; j++){
			c.lineTo(L[i][j].x, L[i][j].y);
		}
		c.closePath();
		c.stroke();
	}
	
	if (L[i-1][0].x > CTX.W2){
		adelante=false;
	}
}

function limpiar(){
	CTX.ctx.clearRect(-CTX.W2, -CTX.H2, CTX.W, CTX.H);
	CTX.ctx.strokeRect(-CTX.W2, -CTX.H2, CTX.W, CTX.H);
}

function mostrar(s){
	document.getElementById("mensaje").innerHTML = s;
}

/*
 * \ddot{x} = -x
 * Si:
 * 		q = [q_1, q_2] = [x, \d{x}] = [x, y]
 * entonces:
 * 		F(q) = [\dot{q_1}, \dot{q_2}] = [q2, -q1] = [\d{x}, -x] = [y, -x]
 */
function osciladorArmonico(Q){
	return new P2(Q.y, -Q.x);
}

function getIntegrador(metodo, sistema){
	return  function(x){
				return metodo(sistema, x);
			};
}

/*
 * Integrador de Euler
 */
function euler(f, Q){
	var h = 0.25;
	return Q.sum(f(Q).esc(h));
}

/*
 * Este no es el integrador de Verlet, hay que corregir esto.
 */
function verlet(f, Q){
	var h = 0.45;
	return Q.sum(f(Q).esc(h));
}

/*
 * Objeto que representa un punto (x, y) en el plano
 */
function P2(xx, yy){
	this.x = xx;
	this.y = yy;
	this.sum = 
		function(Q){
			return new P2(this.x+Q.x, this.y+Q.y);
		};
	this.dot = 
		function (Q){
			return this.x*Q.x + this.y*Q.y;
		};
	this.esc = 
		function(k){
			return new P2(k*this.x, k*this.y); 
		};
	this.abs = 
		function(){
			return Math.sqrt(this.x*this.x + this.y*this.y);
		};
	this.subs =
		function (Q){
			return new P2(this.x-Q.x, this.y-Q.y);
		};
	this.unit =
		function (){
			return this.esc(1.0/this.abs());
		};
	this.rot = 
		function (ang, PO){
			var angRad = ang*Math.PI/180.0;
			var sin = Math.sin(angRad);
			var cos = Math.cos(angRad);
			if (!PO){
				//rotacion con respecto al origen
				return this.rot(ang, new P2(0.0, 0.0));
			}else{
				//rotacion con respecto a u punto PO
				var v = this.subs(PO);
				return new P2(v.x*cos-v.y*sin, v.x*sin+v.y*cos).sum(PO);
			}
		};
}
