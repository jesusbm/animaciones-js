/*
 * Crea una particula cuyas coordenadas (x,y) estan el el conjunto (0,Lx)x(0,Ly)
 * y que tiene una velocidad de magnitud v, con orientacion inicial aleatoria.
 */
function Particula(Lx, Ly, v, color){

    var theta = 2*Math.PI*Math.random();
    this.radio = 3;
    this.p  = new P2((Lx-2*this.radio)*Math.random()+this.radio, (Ly-2*this.radio)*Math.random()+this.radio);
    this.vx = v*Math.cos(theta);//v*(Math.random()-0.5);
    this.vy = v*Math.sin(theta);//Math.sqrt(v*v - this.vx*this.vx)*(Math.random()>0.5? 1.0 : -1.0);
    this.v = v; //magnitud de la velocidad
    this.color = color;

    /*
     * Cambia la posicion de la Particula de acuerdo con la velocidad actual.
     */
    this.mover =
        function(){
            this.p.x += 0.1*this.vx;
            this.p.y += 0.1*this.vy;
        };
        
    /*
     * Dibuja un circulo con centro en (x,y) relleno con el color indicado.
     */
    this.dibujar = 
        function(ctx){
            ctx.beginPath();
            ctx.fillStyle = this.color;
			ctx.arc(this.p.x, this.p.y, 5, 0.0, 2*Math.PI, true);
			ctx.fill();
        };
        
    /*
     * Especifica una nueva magnitud para la velocidad de la particula.
     */
    this.cambiarVelocidad = 
        function(x){
            var factor = x / this.v;
            this.v = x;
            this.vx *= factor;
            this.vy *= factor;
        };
}
