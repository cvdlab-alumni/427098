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
	else if (u>30 && v<30) return 0.2; //foresta
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