function x(coord){
	return coord[0];
}
function y(coord){
	return coord[1];
}
function z(u,v){

	if (u>30 && v>30) return 0; //centro abitato
	//else if (u>10 && u<25 && v>10 && v<25) return 0.2; //lago
	else if (u>10 && u<25 && v>10 && v<25) return ((u+v)*(u*v))%3; //lago
	else if (u>30 && v<30) return 0.2; //foresta
	return (u+v)*(u*v)%5 + (Math.random() - 0.5);
}

var base = CUBOID([60,60,0.2])

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
