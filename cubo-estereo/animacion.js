
contexto = new Object();
angulo = 0.0;
angStereo = -10.0;

//cubo centrado en el origen (no se modifica)
cubo0 = new Cubo(new P3(-50, -50, -50), 100);
//cubo1 = new Cubo(new P3(-50, -50, -50), 100);

//eje de rotacion
eje1 = new P3(50,80,0);
eje0 = new P3(0,0,-50);
ejeY = new P3(0,1,0);

function inicializar(){
	contexto.canvas = document.getElementById("lienzo");
	contexto.ctx = contexto.canvas.getContext("2d");
	contexto.W = contexto.canvas.width;
	contexto.H = contexto.canvas.height;
	contexto.W2 = contexto.W/2;
	contexto.H2 = contexto.H/2;
	contexto.ctx.translate(contexto.W2, contexto.H2);
	contexto.ctx.scale(1.0, -1.0);
	
	//dibujar cada n ms
	setInterval(dibujar, 25);
}

function dibujar(){
	angulo += 1.0;
		
	var cuboI = cubo0.aplicar(
		function(P){
			return P.rot(angulo, eje1, eje0);
		});
		
	var cuboD = cuboI.aplicar(
	    function(P){
	        return P.rot(angStereo, ejeY);
	    });
	
	limpiar();
	
	contexto.ctx.save();
	contexto.ctx.translate(-150,0);
	cuboI.dibujar(contexto.ctx);
	contexto.ctx.translate(300, 0);
	cuboD.dibujar(contexto.ctx);
	contexto.ctx.restore();
}

function limpiar(){
	contexto.ctx.clearRect(-contexto.W2, -contexto.H2, contexto.W, contexto.H);
	contexto.ctx.strokeRect(-contexto.W2, -contexto.H2, contexto.W, contexto.H);
	/*contexto.ctx.moveTo(-contexto.W2, 0);
	contexto.ctx.lineTo( contexto.W2, 0);
	contexto.ctx.moveTo(0, -contexto.H2);
	contexto.ctx.lineTo(0,  contexto.H2);
	contexto.ctx.stroke();*/
}

function mostrar(s){
	document.getElementById("mensaje").innerHTML = s;
}
