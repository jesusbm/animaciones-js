
/*
 * Objeto que representa un cubo especificando un 
 * punto de origen Po y la longitud de un lado
 */
function Cubo(Po, lado){
	var Po = Po ? Po : new P3(0,0,0);
	this.l = lado? lado : 100;
	
	this.Vs = new Array();
	
	var v1 = new P3(this.l,0,0);
	var v2 = new P3(0,this.l,0);
	var v3 = new P3(0,0,this.l);
	
	this.Vs.push(Po);
	this.Vs.push(Po.sum(v1));
	this.Vs.push(Po.sum(v1).sum(v2));
	this.Vs.push(Po.sum(v2));
	
	this.Vs.push(Po.sum(v3));
	this.Vs.push(Po.sum(v3).sum(v1));
	this.Vs.push(Po.sum(v3).sum(v1).sum(v2));
	this.Vs.push(Po.sum(v3).sum(v2));
	

	/*
	 * Dibuja el cubo
	 */
	this.dibujar =
		function(ctx){
			this.Vs.map(
				function(P){
					P.dibujar(ctx);
				});
			ctx.beginPath();
			ctx.moveTo(this.Vs[0].x, this.Vs[0].y);
			ctx.lineTo(this.Vs[1].x, this.Vs[1].y);
			ctx.lineTo(this.Vs[2].x, this.Vs[2].y);
			ctx.lineTo(this.Vs[3].x, this.Vs[3].y);
			ctx.lineTo(this.Vs[0].x, this.Vs[0].y);
			ctx.lineTo(this.Vs[4].x, this.Vs[4].y);
			ctx.lineTo(this.Vs[5].x, this.Vs[5].y);
			ctx.lineTo(this.Vs[6].x, this.Vs[6].y);
			ctx.lineTo(this.Vs[7].x, this.Vs[7].y);
			ctx.lineTo(this.Vs[4].x, this.Vs[4].y);
			ctx.moveTo(this.Vs[1].x, this.Vs[1].y);
			ctx.lineTo(this.Vs[5].x, this.Vs[5].y);
			ctx.moveTo(this.Vs[2].x, this.Vs[2].y);
			ctx.lineTo(this.Vs[6].x, this.Vs[6].y);
			ctx.moveTo(this.Vs[3].x, this.Vs[3].y);
			ctx.lineTo(this.Vs[7].x, this.Vs[7].y);
			ctx.stroke();
		};

	/*
	 * Aplica una funcion f a cada uno de los puntos vertices del cubo
	 * y devuelve un nuevo cubo con los nuevos vertices.
	 */
	this.aplicar = 
		function(f){
			var cubo2 = new Cubo();
			cubo2.l = this.l;
			cubo2.Vs = this.Vs.map(f);
			return cubo2;
		};
}
