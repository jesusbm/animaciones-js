/*
 * Sistema formado por un conjunto de N particulas. 
 * Se dibuja como un rectangulo de dimensiones Lx y Ly.
 */
function Sistema(N, Lx, Ly, T, color){

    this.ps = new Array(N);     //particulas
    this.Lx = Lx;               //dimensiones
    this.Ly = Ly;
    this.T = T;                 //Temperatura(energia total del sistema)
    this.color = color;         //color de las particulas
    
    //energia por particula.
    var Tp = T/N;
    
    //se crean las particulas que forman el sistema.
    for (var i=0; i<N; i++){
        this.ps[i] = new Particula(this.Lx, this.Ly, Tp, this.color);
    }
        
    //modifica las posiciones de las particula y verifica que se cumple
    //la condicion de que cada una de ellas permanece en el rectangulo.
    this.mover = 
        function(){
            var limX = this.Lx - this.ps[0].radio;
            var limY = this.Ly - this.ps[0].radio;
            this.ps.map(
                function(P){
                    P.mover();
                    if (P.p.x>=limX) {P.vx *= -1.0;}
                    if (P.p.x<=P.radio)           {P.vx *= -1.0;}
                    if (P.p.y>=limY) {P.vy *= -1.0;}
                    if (P.p.y<=P.radio)           {P.vy *= -1.0;}
                });
        };
        
    var altBarra = -this.Ly/10;
    var espBarra = -this.Ly/30;
    var Tmax = 1000;
    //dibuja las particulas y el rectangulo
    //que representa la frontera del sistema
    this.dibujar =
        function(ctx){
            ctx.strokeRect(0,0,this.Lx,this.Ly);
            ctx.strokeRect(0,espBarra,this.Lx,altBarra);
            ctx.fillStyle = color;
            ctx.fillRect(0,espBarra,this.Lx*this.T/Tmax,altBarra);
            this.ps.map(
                function(P){
                    P.dibujar(ctx);
                });
        };
        
    this.cambiarEnergia = 
        function(T){
            this.T = T;
            var Tm = this.T / this.ps.length;
            this.ps.map(
                function(P){
                    P.cambiarVelocidad(Tm);
                });
        };
 }
 
