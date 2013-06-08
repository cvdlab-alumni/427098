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