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

//Richiama l'omonima funzione senza clone
function TNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
  }

 function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
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

function unifyBezierCurves(map_curve_1,map_curve_2){
	return MAP(BEZIER(S1)([map_curve_1,map_curve_2]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]));
}

var minValueCoordinate = function(points,axis){
	minVal = points[0][axis]
	for (i=1; i<points.length; i++)
		if (points[i][axis]<minVal)
			minVal = points[i][axis]
	return minVal
}

var maxValueCoordinate = function(points,axis){
	maxVal = points[0][axis]
	for (i=1; i<points.length; i++)
		if (points[i][axis]>maxVal)
			maxVal = points[i][axis]
	return maxVal
}

function traslateToOrigin(points){
	var minX = minValueCoordinate(points,0);
	var minY = minValueCoordinate(points,1);
	var minZ = minValueCoordinate(points,2);
	if (minX !== 0)
		points = traslaPointsX(points,-minX);
	if (minY !== 0)
		points = traslaPointsY(points,-minY);
	if (minZ !== 0)
		points = traslaPointsZ(points,-minZ);
	return points
}

var scalePointsX = function(points,values) {
	return points.map(function(item){
		return [item[0]*values,item[1],item[2]];
	});
}

var scalePointsY = function(points,values) {
	return points.map(function(item){
		return [item[0],item[1]*values,item[2]];
	});
}

var scalePointsZ = function(points,values) {
	return points.map(function(item){
		return [item[0],item[1],item[2]*values];
	});
}


function adjustCurveFromCanvas(curve_Points, startPoint, endPoint){

	var newCurve = traslateToOrigin(curve_Points);

	var relationship_x = 0;
	var relationship_y = 0;
	var relationship_z = 0;

	if (curve_Points[0][0]-curve_Points[curve_Points.length-1][0] !== 0)
		relationship_x = Math.abs(endPoint[0]-startPoint[0]) / Math.abs(curve_Points[0][0]-curve_Points[curve_Points.length-1][0]);
	if (curve_Points[0][1]-curve_Points[curve_Points.length-1][1] !== 0)
		relationship_y = Math.abs(endPoint[1]-startPoint[1]) / Math.abs(curve_Points[0][1]-curve_Points[curve_Points.length-1][1]);
	if (curve_Points[0][2]-curve_Points[curve_Points.length-1][2] !== 0)
		relationship_z = Math.abs(endPoint[2]-startPoint[2]) / Math.abs(curve_Points[0][2]-curve_Points[curve_Points.length-1][2]);

	newCurve = scalePointsX(scalePointsY(scalePointsZ(newCurve,relationship_z),relationship_y),relationship_x);
	newCurve = traslaPointsX(traslaPointsY(traslaPointsZ(newCurve,startPoint[2]),startPoint[1]),startPoint[0]);
	return newCurve;
}


var x = 0;
var y = 1;
var z = 2;

var dimension_x = 70;
var dimension_y = 27.5;
var dimension_z = 27.5;
var cushion_black_color = rgb([40,40,40]);
var cushion_white_color = rgb([300,300,300]);

var chassis_thickness = 2;
var chassis_depth = 3.5;
var chassis_y = 21;
var chassis_z = 24;	

var back_depth = 7.5;
var back_z = 24;

var seat_cushion_z = 10;


var chassis_ground_1 = CUBOID([dimension_x,chassis_depth,chassis_thickness]) //x
var chassis_ground_2 = CUBOID([chassis_depth,chassis_y,chassis_thickness]) //y
var chassis_ground = STRUCT([chassis_ground_1,chassis_ground_2,T([x])([dimension_x-chassis_depth])(chassis_ground_2)]);

var chassis_1 = TNC([y])([chassis_y])(CUBOID([chassis_depth,chassis_thickness,chassis_z]));
var chassis_2 = CUBOID([chassis_thickness,chassis_thickness,dimension_z-back_z])

var chassis = STRUCT([chassis_ground,chassis_1,T([x])([dimension_x-chassis_depth])(chassis_1),
						T([x,y,z])([chassis_depth-chassis_thickness,chassis_depth,chassis_thickness])(chassis_2),
						T([x,y,z])([dimension_x-chassis_depth,chassis_depth,chassis_thickness])(chassis_2),
						T([z])([chassis_z-chassis_thickness]),chassis_ground_2,T([x])([dimension_x-chassis_depth])(chassis_ground_2)]);

chassis = COLOR(rgb([40,40,40]))(chassis);


//Seat cushion
var seat_cushion1_x = 2*dimension_x/3;
var seat_cushion2_x = dimension_x/3;

var sc_left_back_p = [[0,chassis_y,0],[0,chassis_y,seat_cushion_z]];
var sc_left_down_p = [[0,0,0],[0,chassis_y,0]];
var sc_left_front_p = [[0,0,0],[0,-0.5,seat_cushion_z/2],[0,0,seat_cushion_z]];
var sc_left_up_p = [[0,0,seat_cushion_z],[0,chassis_y/2,seat_cushion_z+0.8],[0,chassis_y,seat_cushion_z]];

var sc_right_back_p1 = traslaPointsX(sc_left_back_p,seat_cushion1_x);
var sc_right_down_p1 = traslaPointsX(sc_left_down_p,seat_cushion1_x);
var sc_right_front_p1 = traslaPointsX(sc_left_front_p,seat_cushion1_x);
var sc_right_up_p1 = traslaPointsX(sc_left_up_p,seat_cushion1_x);

var sc_right_back_p2 = traslaPointsX(sc_left_back_p,seat_cushion2_x);
var sc_right_down_p2 = traslaPointsX(sc_left_down_p,seat_cushion2_x);
var sc_right_front_p2 = traslaPointsX(sc_left_front_p,seat_cushion2_x);
var sc_right_up_p2 = traslaPointsX(sc_left_up_p,seat_cushion2_x);

var sc_left_back_c = BEZIER(S0)(sc_left_back_p);
var sc_left_down_c = BEZIER(S0)(sc_left_down_p);
var sc_left_front_c = BEZIER(S0)(sc_left_front_p);
var sc_left_up_c = BEZIER(S0)(sc_left_up_p);
 
var sc_right_back_c1 = BEZIER(S0)(sc_right_back_p1);
var sc_right_down_c1 = BEZIER(S0)(sc_right_down_p1);
var sc_right_front_c1 = BEZIER(S0)(sc_right_front_p1);
var sc_right_up_c1 = BEZIER(S0)(sc_right_up_p1);

var sc_right_back_c2 = BEZIER(S0)(sc_right_back_p2);
var sc_right_down_c2 = BEZIER(S0)(sc_right_down_p2);
var sc_right_front_c2 = BEZIER(S0)(sc_right_front_p2);
var sc_right_up_c2 = BEZIER(S0)(sc_right_up_p2);

var sc_intermedied_up_p1 = [[seat_cushion1_x/2,0,seat_cushion_z],[seat_cushion1_x/5,chassis_y/2,seat_cushion_z+3],[3*seat_cushion1_x/5,chassis_y/2,seat_cushion_z+3],[seat_cushion1_x/2,chassis_y,seat_cushion_z]];
var sc_intermedied_up_p2 = [[seat_cushion2_x/2,0,seat_cushion_z],[seat_cushion2_x/5,chassis_y/2,seat_cushion_z+3],[seat_cushion2_x/5,chassis_y/2,seat_cushion_z+3],[seat_cushion2_x/2,chassis_y,seat_cushion_z]];
var sc_intermedied_up_c1 = BEZIER(S0)(sc_intermedied_up_p1);
var sc_intermedied_up_c2 = BEZIER(S0)(sc_intermedied_up_p2);

var seat_cushion1 = STRUCT([unifyBezierCurves(sc_left_back_c, sc_right_back_c1),
							unifyBezierCurves(sc_left_down_c, sc_right_down_c1),
							unifyBezierCurves(sc_left_front_c, sc_right_front_c1),
							MAP(BEZIER(S1)([sc_left_up_c,sc_intermedied_up_c1,sc_right_up_c1]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])),
							unifyBezierCurves(sc_left_up_c, sc_left_down_c),
							unifyBezierCurves(sc_right_up_c1, sc_right_down_c1),
							unifyBezierCurves(sc_left_front_c, sc_left_back_c),
							unifyBezierCurves(sc_right_front_c1, sc_right_back_c1)]);

var seat_cushion2 = STRUCT([unifyBezierCurves(sc_left_back_c, sc_right_back_c2),
							unifyBezierCurves(sc_left_down_c, sc_right_down_c2),
							unifyBezierCurves(sc_left_front_c, sc_right_front_c2),
							MAP(BEZIER(S1)([sc_left_up_c,sc_intermedied_up_c2,sc_right_up_c2]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])),
							unifyBezierCurves(sc_left_up_c, sc_left_down_c),
							unifyBezierCurves(sc_right_up_c2, sc_right_down_c2),
							unifyBezierCurves(sc_left_front_c, sc_left_back_c),
							unifyBezierCurves(sc_right_front_c2, sc_right_back_c2)]);

seat_cushion1 = COLOR(cushion_black_color)(seat_cushion1);
seat_cushion2 = COLOR(cushion_white_color)(seat_cushion2);

var seat_cushion_ztraslator = dimension_z-back_z+chassis_thickness;
var seat_cushions = TNC([z])([seat_cushion_ztraslator])(STRUCT([seat_cushion1,TNC([x])([seat_cushion1_x])(seat_cushion2)]));

//Arms cushion
var arm_cushion_z = dimension_z-chassis_z;
var ac_front_down_p = [[0,0,0],[chassis_depth,0,0]];
var ac_front_up_p = [[0.2,0,arm_cushion_z],[(chassis_depth+0.2)/2,0,arm_cushion_z+0.3],[chassis_depth-0.2,0,arm_cushion_z]];
var ac_front_left_p = [[0,0,0],[0,0,arm_cushion_z/2],[0.2,0,arm_cushion_z]];
var ac_front_right_p = [[chassis_depth,0,0],[chassis_depth,0,arm_cushion_z/2],[chassis_depth-0.2,0,arm_cushion_z]];
var ac_front_vertical_intermedied_p = [[chassis_depth/2,0,0],[chassis_depth/2,-0.3,arm_cushion_z/2],[chassis_depth/2,0,arm_cushion_z]];
var ac_front_horizzontal_intermedied_p = [[0,0,arm_cushion_z/2],[chassis_depth/2,-0.3,arm_cushion_z/2],[chassis_depth,0,arm_cushion_z/2]];

var ac_back_down_p = traslaPointsY(ac_front_down_p,dimension_y);
var ac_back_up_p = traslaPointsY(ac_front_up_p,dimension_y);
var ac_back_left_p = traslaPointsY(ac_front_left_p,dimension_y);
var ac_back_right_p = traslaPointsY(ac_front_right_p,dimension_y);
var ac_back_vertical_intermedied_p = [[chassis_depth/2,dimension_y,0],[chassis_depth/2,dimension_y+0.3,arm_cushion_z/2],[chassis_depth/2,dimension_y,arm_cushion_z]];

var ac_front_down_c = BEZIER(S0)(ac_front_down_p);
var ac_front_up_c = BEZIER(S0)(ac_front_up_p);
var ac_front_left_c = BEZIER(S0)(ac_front_left_p);
var ac_front_right_c = BEZIER(S0)(ac_front_right_p);
var ac_front_vertical_intermedied_c = BEZIER(S0)(ac_front_vertical_intermedied_p);

var ac_back_down_c = BEZIER(S0)(ac_back_down_p);
var ac_back_up_c = BEZIER(S0)(ac_back_up_p);
var ac_back_left_c = BEZIER(S0)(ac_back_left_p);
var ac_back_right_c = BEZIER(S0)(ac_back_right_p);
var ac_back_vertical_intermedied_c = BEZIER(S0)(ac_back_vertical_intermedied_p);

var arm_cushion = STRUCT([unifyBezierCurves(ac_front_down_c, ac_back_down_c),
							unifyBezierCurves(ac_front_up_c, ac_back_up_c),
							unifyBezierCurves(ac_front_left_c, ac_back_left_c),
							unifyBezierCurves(ac_front_right_c, ac_back_right_c),
							MAP(BEZIER(S1)([ac_front_right_c,ac_front_vertical_intermedied_c,ac_front_left_c]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])),
							MAP(BEZIER(S1)([ac_back_right_c,ac_back_vertical_intermedied_c,ac_back_left_c]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])),
							unifyBezierCurves(ac_front_up_c, ac_front_down_c),
							unifyBezierCurves(ac_back_up_c, ac_back_down_c)
							]);


arm_cushion = TNC([z])([chassis_z])(arm_cushion);
arm_cushions = STRUCT([COLOR(cushion_white_color)(arm_cushion),T([x])([dimension_x-chassis_depth])(COLOR(cushion_black_color)(arm_cushion))])

//Back cushion
var seat_cushion_z_def = seat_cushion_z+dimension_z-back_z+chassis_thickness

var back_cushion_delta_x = dimension_x-2*chassis_depth +0.8;
var back_cushion_x1 = seat_cushion1_x-chassis_depth;
var back_cushion_x2 = back_cushion_delta_x-back_cushion_x1;
var back_cushion_p = adjustCurveFromCanvas([[0,0.23, 2.8],[0,0.28, 3.58],[0,0.3, 4],[0,0.72, 3.87]],[chassis_depth-0.4,chassis_y,seat_cushion_z_def],[chassis_depth,dimension_y,dimension_z]);
var back_cushion_end_p1 = traslaPointsX(back_cushion_p,back_cushion_x1);
var back_cushion_end_p2 = traslaPointsX(back_cushion_p,back_cushion_x2);

var back_cushion_back_p = [[chassis_depth-0.4,dimension_y,seat_cushion_ztraslator],[chassis_depth-0.4,dimension_y,dimension_z]];
var back_cushion_back_end_p1 = traslaPointsX(back_cushion_back_p,back_cushion_x1);
var back_cushion_back_end_p2 = traslaPointsX(back_cushion_back_p,back_cushion_x2);

var back_cushion_down_p = [[chassis_depth-0.4,chassis_y,seat_cushion_ztraslator],[chassis_depth-0.4,dimension_y,seat_cushion_ztraslator]];
var back_cushion_down_end_p1 = traslaPointsX(back_cushion_down_p,back_cushion_x1);
var back_cushion_down_end_p2 = traslaPointsX(back_cushion_down_p,back_cushion_x2);

var back_cushion_c = BEZIER(S0)(back_cushion_p);
var back_cushion_end_c1 = BEZIER(S0)(back_cushion_end_p1);
var back_cushion_end_c2 = BEZIER(S0)(back_cushion_end_p2);
var back_cushion_back_c = BEZIER(S0)(back_cushion_back_p);
var back_cushion_back_end_c1 = BEZIER(S0)(back_cushion_back_end_p1);
var back_cushion_back_end_c2 = BEZIER(S0)(back_cushion_back_end_p2);
var back_cushion_down_c = BEZIER(S0)(back_cushion_down_p);
var back_cushion_down_end_c1 = BEZIER(S0)(back_cushion_down_end_p1);
var back_cushion_down_end_c2 = BEZIER(S0)(back_cushion_down_end_p2);

var back_cushion_central1 = STRUCT([unifyBezierCurves(back_cushion_c,back_cushion_end_c1),
									unifyBezierCurves(back_cushion_back_c,back_cushion_back_end_c1),
									unifyBezierCurves(back_cushion_down_c,back_cushion_down_end_c1)]);

var back_cushion_central2 = STRUCT([unifyBezierCurves(back_cushion_c,back_cushion_end_c2),
									unifyBezierCurves(back_cushion_back_c,back_cushion_back_end_c2),
									unifyBezierCurves(back_cushion_down_c,back_cushion_down_end_c2)]);

var back_cushion_central = STRUCT([COLOR(cushion_white_color)(back_cushion_central1), TNC([x])([back_cushion_x1])(COLOR(cushion_black_color)(back_cushion_central2))]);

var back_cushion_plx = chassis_depth;
var back_cushion_ply = dimension_y-chassis_y-chassis_thickness;
var back_cushion_plz = dimension_z-seat_cushion_ztraslator-arm_cushion_z;
var back_cushion_pl = CUBOID([back_cushion_plx,back_cushion_ply,back_cushion_plz]);

var back_cushion = STRUCT([ back_cushion_central,
							T([z])([seat_cushion_ztraslator]),
							T([y])([dimension_y-back_cushion_ply]), COLOR(cushion_white_color)(back_cushion_pl),
							COLOR(cushion_black_color)(T([x])([dimension_x-chassis_depth])(back_cushion_pl))]);


var model = STRUCT([back_cushion,chassis,seat_cushions,arm_cushions]);

draw(model);