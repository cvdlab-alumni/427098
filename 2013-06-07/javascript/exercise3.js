/**
	Funzioni Ausiliarie
**/

var drawable_objects = [];

function draw(obj){
	drawable_objects.push(obj);
	DRAW(obj);
}


function hide(obj){
	drawable_objects = drawable_objects.filter( function(item){
		return item !== obj;
	});
	HIDE(obj);
}

function hideAll(){
	while(drawable_objects.length>0)
		HIDE(drawable_objects.pop());	
}


function T(dims) {
    return function (values) {
      return function (object) {
       return object.translate(dims, values);
      };
    };
  }

function R(dims) {
    return function (values) {
      return function (object) {
       return object.rotate(dims, values);
      };
    };
  }

function S(dims) {
    return function (values) {
      return function (object) {
       return object.scale(dims, values);
      };
    };
  }

//Richiama l'omonima funzione con clone
function TC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
  }

//Richiama l'omonima funzione con clone
function RC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().rotate(dims, values);
      };
    };
  }

//Richiama l'omonima funzione con clone
function SC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().scale(dims, values);
      };
    };
  }

function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

var scalePoints = function(points,values) {
	return points.map(function(item){
		return item.map(function(elem){
			return elem*values;
		});
	});
}

function traslaPointsZ(points,value){
	return points.map(function(item){
		return [item[0],item[1],item[2]+value];
	});
}

function traslaPointsY(points,value){
	return points.map(function(item){
		return [item[0],item[1]+value,item[2]];
	});
}

function traslaPointsX(points,value){
	return points.map(function(item){
		return [item[0]+value,item[1],item[2]];
	});
}

function bezier_circle_not_centered_map(r,x_value,y_value,z_value,selector){

	if (selector === undefined)
		selector = S0

	var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];

	var circle_points = scalePoints(base_points,r);

	if (x_value !== 0)
		circle_points = traslaPointsX(circle_points,x_value)
	if (y_value !== 0)
		circle_points = traslaPointsY(circle_points,y_value)
	if (z_value !== 0)
		circle_points = traslaPointsZ(circle_points,z_value)

	return BEZIER(selector)(circle_points)
}

/**
	Fine
**/

function x(coord){
	return coord[0];
}
function y(coord){
	return coord[1];
}
function z(u,v){

	if (u>40 && v>50) return 0; //centro abitato
	else if (u>30 && u<45 && v>20 && v<30) return 0.2; //centro abitato
	else if (u>16 && u<25 && v>16 && v<25) return -(Math.pow(Math.cos(u),2)+Math.pow(Math.sin(v),2)); //lago
	else if (u>30 && v>10 && v<30) return 0.2; //foresta
	return (u+v)*(u*v)%5 + (Math.random() - 0.5);
}

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
	var colori = [rgb([0,158,96]),rgb([0,153,0]),rgb([0,153,0])]
	var albero_base = cilynder(raggio*0.5,altezza/3);
	var albero_foglie = MAP(BEZIER(S1)([bezier_circle_not_centered_map(raggio,0,0,altezza/3),[0,0,altezza]]))(domain)
	albero_foglie = STRUCT([albero_foglie, unifyBezierCurves(bezier_circle_not_centered_map(raggio*0.5,0,0,altezza/3),bezier_circle_not_centered_map(raggio,0,0,altezza/3))])

	albero_base = COLOR(rgb([101,67,33]))(albero_base)

	colore = colori[ parseInt(Math.random()*colori.length) ]
	albero_foglie = COLOR(colore)(albero_foglie)

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