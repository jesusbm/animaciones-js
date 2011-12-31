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
