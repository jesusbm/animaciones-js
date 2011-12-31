
/*
 * Objeto que representa el contexto de trabajo 
 */
contexto = new Object();
ang0 = 0.0;
x0 = 100; 
y0 = 110;

ang1 = 0.0;
x1 = 100; 
y1 = 180;

ang2 = 0.0;
x2 = 180; 
y2 = 110;

ang3 = 0.0;
x3 = 180; 
y3 = 180;

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

/*
 * Objeto que representa una molecula de acido formico
 */
function AcidoFormico(pC, ang){
	
	var d = new P2(20, 0);
	var a1 = 120;
	var a2 = 60;

	this.C  = pC;
	this.Oc = pC.sum(d).rot(-a1+ang, pC);
	this.Hc = pC.sum(d).rot( a1+ang, pC);
	this.Oh = pC.sum(d).rot(ang, pC);
	this.Ho = this.Oh.sum(d).rot(-a2+ang, this.Oh);
	
	this.dibujar =
		function(){
			var ctx = contexto.ctx;			
			var atomos = [this.C, this.Oc, this.Hc, this.Oh, this.Ho];
			
			for (var i=0; i<atomos.length; i++){
				ctx.beginPath();
				ctx.arc(atomos[i].x, atomos[i].y, 5, 0.0, 2*Math.PI, true);
				ctx.fill();
			}

			ctx.beginPath();
			ctx.moveTo(this.Oc.x, this.Oc.y);
			ctx.lineTo(this.C.x,  this.C.y);
			ctx.lineTo(this.Oh.x, this.Oh.y);
			ctx.lineTo(this.Ho.x, this.Ho.y);
			ctx.moveTo(this.C.x,  this.C.y);
			ctx.lineTo(this.Hc.x, this.Hc.y);
			ctx.stroke();
		};
}

/*
 * Muestra un mensaje
 */
function mostrar(mensaje){
	document.getElementById("mensaje").innerHTML = mensaje;
}

/*
 * Inicializa el contexto de la aplicacion
 */
function inicializar(){
	contexto.lienzo = document.getElementById("lienzo");
	contexto.ctx = contexto["lienzo"].getContext("2d");
	contexto.H = contexto.lienzo.height;
	contexto.W = contexto.lienzo.width;
	
	setInterval(function(){
					limpiar(); 
					new AcidoFormico(new P2(x0+=2*(Math.random()-0.5), y0+=2*(Math.random()-0.5)), ang0+=2*(Math.random()-0.5)).dibujar();
					new AcidoFormico(new P2(x1+=2*(Math.random()-0.5), y1+=2*(Math.random()-0.5)), ang1+=2*(Math.random()-0.5)).dibujar();
					new AcidoFormico(new P2(x2+=2*(Math.random()-0.5), y2+=2*(Math.random()-0.5)), ang2+=2*(Math.random()-0.5)).dibujar();
					new AcidoFormico(new P2(x3+=2*(Math.random()-0.5), y3+=2*(Math.random()-0.5)), ang3+=2*(Math.random()-0.5)).dibujar();
				}, 
				20);
}

/*
 * Limpia el area de dibujo
 */
function limpiar(){
	contexto["ctx"].clearRect(0, 0, contexto.H, contexto.W);
	contexto["ctx"].strokeRect(0, 0, contexto.H, contexto.W);
}

