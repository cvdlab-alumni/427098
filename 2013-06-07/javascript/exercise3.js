function x(coord){
	return coord[0];
}
function y(coord){
	return coord[1];
}
function z(u,v){

	if (u>30 && v>30) return 0; //centro abitato
	//else if (u>10 && u<25 && v>10 && v<25) return 0.2; //lago
	else if (u>16 && u<25 && v>16 && v<25) return -(Math.pow(Math.cos(u),2)+Math.pow(Math.sin(v),2)); //lago
	// else if (u>10 && u<25 && v>10 && v<25) return Math.abs((u*v)-(17))%3; //lago
	//else if (u>10 && u<25 && v>10 && v<25) return ((u+v)*(u*v))%3 + 0.5; //lago
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


function filaAlberi(area_x,albero_r,albero_h){
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
