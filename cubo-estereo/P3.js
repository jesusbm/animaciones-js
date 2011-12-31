/*
 * Objeto que representa un punto (x, y, z) en el espacio
 */
function P3(xx, yy, zz){
	this.x = xx;
	this.y = yy;
	this.z = zz;
	this.sum = 
		function(Q){
			return new P3(this.x+Q.x, this.y+Q.y, this.z+Q.z);
		};
	this.cross = 
		function(Q){
			return new P3(	this.y*Q.z-this.z*Q.y, 
							-this.x*Q.z+this.z*Q.x,
							this.x*Q.y-this.y*Q.x);
		};
	this.dot = 
		function (Q){
			return this.x*Q.x + this.y*Q.y + this.z*Q.z;
		};
	this.esc = 
		function(k){
			return new P3(k*this.x, k*this.y, k*this.z); 
		};
	this.abs = 
		function(){
			return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
		};
	this.abs2 = 
		function(){
			return this.x*this.x + this.y*this.y + this.z*this.z;
		};
	this.subs =
		function (Q){
			return new P3(this.x-Q.x, this.y-Q.y, this.z-Q.z);
		};
	this.unit =
		function (){
			return this.esc(1.0/this.abs());
		};
	this.rot = 
		function (ang, P, Po){
			var Po = Po || new P3(0.0, 0.0, 0.0);
			var angRad = ang*Math.PI/180.0;
			var S = Math.sin(angRad/2);
			var C = Math.cos(angRad/2);
			var SS = S*S;
			var CC = C*C;
			var SC = S*C;
				
			//rotacion con respecto a un vector (P - Po)
			var X = this.subs(Po);		//punto a rotar
			var V = P.subs(Po).unit();	//eje de rotacion
			
			var v1 = X.esc(CC);
			var v2 = V.esc(SS*X.dot(V));
			var v3 = X.cross(V);
			var v4 = v3.esc(-2*SC);
			var v5 = V.cross(v3).esc(-SS);			
			var Q  = v1.sum(v2).sum(v4).sum(v5);
			return Q.sum(Po);
		};
	this.dibujar = 
		function(ctx){
			ctx.beginPath();
			ctx.arc(this.x, this.y, 5, 0.0, 2*Math.PI, true);
			ctx.fill();
		};	
}

