function x(coord){
	return coord[0];
}
function y(coord){
	return coord[1];
}
function z(u,v){

	if (u>40 && v>50) return 0; //centro abitato
	//else if (u>30 && u<45 && v>30 && v<40) return 0.2; //centro abitato
	else if (u>30 && u<45 && v>20 && v<30) return 0.2; //centro abitato
	else if (u>16 && u<25 && v>16 && v<25) return -(Math.pow(Math.cos(u),2)+Math.pow(Math.sin(v),2)); //lago
	else if (u>30 && v>10 && v<30) return 0.2; //foresta
	return (u+v)*(u*v)%5 + (Math.random() - 0.5);
}

//var base = CUBOID([60,60,0.2])
//var base = T([2])([-0.8])(SIMPLEX_GRID([[10,-15,35],[10,-15,35],[1]]))
var base = T([2])([-1.8])(CUBOID([60,60,2]))

function generaTerritorio(point){
	u = x(point)
	v = y(point)
	return [u,v,z(u,v)]
}

var dominio = DOMAIN([[0, 60],[0, 60]])([30,30]);
var montagna = MAP(generaTerritorio)(dominio)
montagna = STRUCT([montagna,base])
montagna = COLOR(rgb([101,67,33]))(montagna)
draw(montagna)


//Es2
colore_acqua = rgb([0,255,255])
lago = COLOR(colore_acqua)(SIMPLEX_GRID([[-15,11],[-15,11],[0.3]]))
draw(lago)


//Es3
domain = PROD1x1([INTERVALS(1)(8),INTERVALS(1)(1)])

function unifyBezierCurves(map_curve_1,map_curve_2){
	return MAP(BEZIER(S1)([map_curve_1,map_curve_2]))(domain);
}

function cilynder(r,h){
	return EXTRUDE([h])(DISK(r)([8, 1]))
}


function albero(raggio,altezza){
	var albero_base = cilynder(raggio*0.5,altezza/3);
	var albero_foglie = MAP(BEZIER(S1)([bezier_circle_not_centered_map(raggio,0,0,altezza/3),[0,0,altezza]]))(domain)
	albero_foglie = STRUCT([albero_foglie, unifyBezierCurves(bezier_circle_not_centered_map(raggio*0.5,0,0,altezza/3),bezier_circle_not_centered_map(raggio,0,0,altezza/3))])

	albero_base = COLOR(rgb([101,67,33]))(albero_base)
	albero_foglie = COLOR(rgb([0,158,96]))(albero_foglie)

	return STRUCT([albero_base,albero_foglie])
}

function generaForesta(area_x,area_y,albero_r,albero_h){

	var y_occupato = 2*albero_r;
	var file_alberi = filaAlberi(area_x,albero_r,albero_h);

	while(y_occupato<area_y){
		file_alberi = STRUCT([file_alberi, T([1])([y_occupato])(filaAlberi(area_x,albero_r,albero_h))]);
		y_occupato += albero_r*2;
	}

	return file_alberi;
}


function filaAlberi(area_x,albero_r,albero_h){ //random per cambiare colore
	var rand_r = (Math.random() * 0.5) -0.25 + albero_r;
	var rand_h = (Math.random() * 0.5) -0.25 + albero_h;

	var x_occupato = rand_r*2;
	var alberi = STRUCT([T([0])([x_occupato])(albero(rand_r,rand_h))]);

	while(x_occupato<area_x){

		rand_r = (Math.random() * 0.5) -0.25 + albero_r;
		rand_h = (Math.random() * 0.5) -0.25 + albero_h;
		alberi = STRUCT([alberi,T([0])([x_occupato])(albero(rand_r,rand_h))]);

		x_occupato += rand_r*2
	}

	return alberi;
}

foresta_grande = generaForesta(28,10,0.6,2)
foresta_grande = T([0,1])([30,10])(foresta_grande)

foresta_piccola = generaForesta(8,8,0.6,1.7)
foresta_piccola = T([0,1])([7,35])(foresta_piccola)

foreste = STRUCT([foresta_grande,foresta_piccola])
draw(foreste)


//Es4
function generaCasa(x_dim,y_dim,h_dim){

	base_h = h_dim*0.5
	porta_tx = 0.37*x_dim
	porta_x = 0.2*x_dim
	porta_z = 0.45*base_h

	finestra_x = 0.125*x_dim
	finestra_z = 0.125*base_h
	finestra_tx1 = 0.1*x_dim
	finestra_tx2 = 0.75*x_dim
	finestra_th = 0.1*base_h

	frontale_basso = wallWithHole(0.1,[porta_tx,0],[porta_tx+porta_x,porta_z],x_dim,porta_z+finestra_th);  
	porta = CUBOID([0.05,porta_x,porta_z])
	porta = T([0,1])([porta_x+porta_tx,-porta_x])(porta)
	porta = COLOR(rgb([112,66,20]))(porta)

	frontale_alto1 = wallWithHole(0.1,[finestra_tx1,0],[finestra_tx1+finestra_x,finestra_z],finestra_tx2,base_h-(porta_z+finestra_th));  
	frontale_alto2 = wallWithHole(0.1,[0,0],[finestra_x,finestra_z],x_dim-finestra_tx2,base_h-(porta_z+finestra_th));  

	frontale = STRUCT([frontale_basso,TC([2])([porta_z+finestra_th]),frontale_alto1,TC([0])([finestra_tx2])(frontale_alto2)])

	laterale1 = CUBOID([0.1,y_dim,base_h])
	laterale2 = T([0])([x_dim])(CUBOID([0.1,y_dim+0.1,base_h]))
	laterale3 = T([1])([y_dim])(CUBOID([x_dim,0.1,base_h]))

	casa = STRUCT([frontale,laterale1,laterale2,laterale3])
	casa = STRUCT([T([0,1])([0.1,0.1])(CUBOID([x_dim-0.1,y_dim-0.1,0.1])),casa])
	casa = COLOR(rgb([250, 235, 215]))(casa)

	var tetto_vertici = [ [0,base_h], [x_dim+0.1,base_h], [(x_dim+0.1)/2,h_dim] ];
	var tetto_num_lati = [ [0,1,2] ];
	var tetto_2D = SIMPLICIAL_COMPLEX(tetto_vertici)(tetto_num_lati);
	var tetto = EXTRUDE([y_dim+0.1])(tetto_2D);
	tetto = T([1])([y_dim+0.1])(R([1,2])(PI/2)(tetto))
	tetto = COLOR(rgb([178,34,34]))(tetto)

	casa = STRUCT([casa,tetto,porta])

	return casa;
}

//draw(generaCasa(1,1,2)) // da fare un quarto/terzo
var distanza_case = 1;
var casa_dim = 0.4;

function generaInsediamento(x_dim,y_dim,casa_x,casa_y,casa_z){

	var offset = 1
	var numero_file = (y_dim-casa_y-offset)/(casa_y+2*distanza_case);

	function filaCase(){

		var rand_x = (Math.random() * 0.3) -0.05 + casa_x;
		var rand_z = (Math.random() * 0.3) -0.15 + casa_z;

		var x_occupato = rand_x+distanza_case+offset;
		var fila = STRUCT([T([0])([offset])(generaCasa(rand_x,casa_y,rand_z))]);

		while(x_occupato+offset<x_dim){

			rand_x = (Math.random() * 0.3) -0.05 + casa_x;
			rand_z = (Math.random() * 0.3) -0.15 + casa_z;
			fila = STRUCT([fila,T([0])([x_occupato])(generaCasa(rand_x,casa_y,rand_z))]);
			
			x_occupato += rand_x + distanza_case;
		}

		return fila;
	}

	file_case = T([1])([offset])(filaCase())
	var y_occupato = casa_x+2*distanza_case+offset

	for (i=1; i<numero_file; i++){
		file_case = STRUCT([file_case,T([1])([y_occupato])(filaCase())])
		y_occupato += casa_x+2*distanza_case
	}

	file_case = STRUCT([COLOR(rgb([0,153,0]))(CUBOID([x_dim,y_dim,0.05])),T([2])([0.05])(file_case)])

	return file_case;
}

insediamento1 = generaInsediamento(13,5,casa_dim,casa_dim,casa_dim)
insediamento2 = generaInsediamento(25,5,casa_dim,casa_dim,casa_dim)

insediamento1 = T([0,1])([44.5,53])(insediamento1)
insediamento2 = T([0,1])([33,22])(insediamento2)

insediamenti = STRUCT([T([2])([0.2]),insediamento1,insediamento2])

draw(insediamenti)