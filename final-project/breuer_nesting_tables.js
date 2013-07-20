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

function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

//Richiama l'omonima funzione senza clone
function TNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
  }

//Richiama l'omonima funzione senza clone
function RNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().rotate(dims, values);
      };
    };
  }

//Richiama l'omonima funzione senza clone
function SNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().scale(dims, values);
      };
    };
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

function nubs_circonference_control_point_xy(r){
	var points = [[0,-1,0],[0.33,-0.966,0],[0.7,-0.733,0],[0.966,-0.33,0],[1,0,0],[0.966,0.33,0],[0.7,0.733,0],[0.33,0.966,0],
					[0,1,0],[-0.33,0.966,0],[-0.7,0.733,0],[-0.966,0.33,0],[-1,0,0],[-0.966,-0.33,0],[-0.7,-0.733,0],[-0.33,-0.966,0],[0,-1,0]];
	for(var i=0; i<points.length; i++)
		for(var j=0; j<points[i].length; j++)
			points[i][j] = points[i][j]*r;
	return points;
}


function nubs_circonference_control_point_xz(r){
	var points = [[0,0,1],[0.33,0,0.966,],[0.7,0,0.733],[0.966,0,0.33],[1,0,0],[0.966,0,-0.33],[0.7,0,-0.733],[0.33,0,-0.966],
					[0,0,-1],[-0.33,0,-0.966],[-0.7,0,-0.733],[-0.966,0,-0.33],[-1,0,0],[-0.966,0,0.33],[-0.7,0,0.733],[-0.33,0,0.966],[0,0,1]];
	for(var i=0; i<points.length; i++)
		for(var j=0; j<points[i].length; j++)
			points[i][j] = points[i][j]*r;
	return points;
}


function getNodes(points,degree){
	var m = points.length;
	var k = degree;
	var n = (m + k + 1);
	var l = n - 3;
	var j = 1;
	var knots = [];
	for (var i = 0; i < 3; i++) 
		knots[i] = 0;
	for (var i = 3; i < l; i++, j++)
	  knots[i] = j;
	for (var i = l; i < n; i++)
	  knots[i] = j;
	return knots;
}

function arraycopy(array){
	var copied = [];
	for (var i=0; i<array.length; i++)
			copied[i] = array[i];
	return copied;
}

function traslatePoints(points,x,y,z){ 
	return points.map(function(point){
		return traslatePoint(point,x,y,z);
	});
}

function traslatePoint(point,x,y,z){
	point[0] += x;
	point[1] += y;
	point[2] += z;	
	return point;
}

function traslatePoints2(array,coordinate,value){
	switch(coordinate){
		case 0: return traslaPointsX(array,value);
		case 1: return traslaPointsY(array,value);
		case 2: return traslaPointsZ(array,value);
		default: console.log("wrong coordinate: " + coordinate); return; 
	}
}

function ruota_cerchio_nubs(ray,h,points){
	var d=0;
	var circonference_r = [];
	for(var i=0;i<points.length;i++){
		circonference_r[i] = arraycopy(points[i])
	}

	var increm1 = h/8; 
	var increm2 = (0.2*ray)/3
	var increm3 = (0.15*ray)/3

	traslatePoint(circonference_r[0],0,d+increm3,(increm1+increm2))
	traslatePoint(circonference_r[points.length-1],0,d+increm3,(increm1+increm2))
	traslatePoint(circonference_r[(points.length-1)/2],0,h+0.15*8,h*8/3-(increm1*8))

	for(var k = 1; k < (points.length-1)/2; k++){			
		traslatePoint(circonference_r[k],0,d+(increm1+0.15)*k,h*k/3-(increm1*k))
		traslatePoint(circonference_r[points.length-1-k],0,d+(increm1+0.15)*k,h*k/3-(increm1*k))
	}
	return circonference_r;
}

function unitary_tube_generator(width,height){

	var domain = DOMAIN([[0,1],[0,1]])([30,40]);
	var ray = 1
	var degree = 90

	var tube_distance_y = 0;

	var start_1 = nubs_circonference_control_point_xz(ray)
	var end_1 = traslatePoints2(start_1,1,width)

	var nodes = getNodes(start_1,2)

	var nubs1 = NUBS(S0)(2)(nodes)(start_1);
	var nubs2 = NUBS(S0)(2)(nodes)(end_1);

	var tube_distance_z2 = 1;

	var radiants = (degree*2*PI)/360
	var increm15 = (0.15*ray)/3
	var y_2 = height * Math.cos(radiants) //cateto 1 base
	var z_2 = height * Math.sin(radiants) //cateto 2 altezza

	var new_circumference = nubs_circonference_control_point_xy(ray)

	var start_2 = traslatePoints(new_circumference,0,tube_distance_y+width+ray*1.1,ray*1.2)
	var fine_2 = traslatePoints2(start_2,2,height)

	var nubs3 = NUBS(S0)(2)(nodes)(start_2);
	var nubs4 = NUBS(S0)(2)(nodes)(fine_2);

	var array_bezier = new Array();
	array_bezier[0] = nubs1;
	array_bezier[1] = nubs2;

	var incremz = tube_distance_z2/5
	
	var points = traslatePoints2(nubs_circonference_control_point_xz(1.1),1,width)
		for(i=1;i<5;i++){
		var r_i = ruota_cerchio_nubs(ray,incremz*i,points);//1 0 1
		array_bezier[i+1] = NUBS(S0)(2)(nodes)(r_i);
		var u = MAP(array_bezier[i+1])(INTERVALS(1)(20));
	}

	array_bezier[6] = nubs3;
	array_bezier[7] = nubs4;

	var bez = BEZIER(S1)(array_bezier);
	var unione_1 = MAP(bez)(domain);


	return unione_1;
}

function tube_generator(width,height,ray){
	return RNC([0,1])(-PI/2)(SNC([0,1,2])([ray,ray,ray])(unitary_tube_generator(width/ray,height/ray)));
}

var x = 0;
var y = 1;
var z = 2;

var chassis_x = 20;
var chassis_y = 18;
var chassis_z = 24;
var chassis_ray = 0.7;
var chassis_color = rgb([192,192,192]);
var desk1_color = rgb([255,117,24]);
var desk2_color = rgb([300,300,300]);
var relationship = 1.2;

/** Chassis **/
var chassis_delta = 1.1*chassis_ray;
var chassis_vertical1 = tube_generator(chassis_x/2,chassis_z/2,chassis_ray);
var chassis_vertical2 = TNC([z])([chassis_z/2])(R([y,z])(PI)(chassis_vertical1));
var chassis_orizzontal1 = RNC([x,y])(PI/2)(RNC([y,z])(PI/2)(tube_generator(chassis_y/2,chassis_x/2,chassis_ray)));
var chassis_orizzontal2 = R([y,z])(PI)(chassis_orizzontal1);

var chassis_base = STRUCT([T([y])([chassis_y/2+chassis_delta]), chassis_orizzontal1,chassis_orizzontal2 ])

var chassis = STRUCT([ chassis_base, TNC([x])([chassis_x/2])(chassis_vertical1),
					    TNC([x,y])([chassis_x/2,chassis_y+2*chassis_delta])(chassis_vertical1),
					    T([z])([chassis_z])(chassis_base),
					    T([x,z])([chassis_x/2,chassis_z/2]),chassis_vertical2,
					    T([y])([chassis_y+2*chassis_delta])(chassis_vertical2) ]);

chassis = COLOR(chassis_color)(chassis);

/** Desk **/
var desk_x = chassis_x-4*chassis_ray;
var desk_y = chassis_y+0.3;
var desk_z = 0.7;
var desk = CUBOID([desk_x,desk_y,desk_z]);

var table1 = STRUCT([chassis,TNC([x,y,z])([chassis_ray,chassis_ray,chassis_z])(COLOR(desk1_color)(desk))]);
var table2 = STRUCT([S([x,y,z])([relationship,relationship,relationship])(chassis),
	S([x,y,z])([relationship,relationship,relationship])(TNC([x,y,z])([chassis_ray,chassis_ray,chassis_z])(COLOR(desk2_color)(desk)))]);

var tables = STRUCT([table1, TNC([x,y])([(chassis_x-2*chassis_ray)+chassis_x*relationship,relationship*chassis_y])(RNC([x,y])(PI)(table2)) ])

draw(tables)
