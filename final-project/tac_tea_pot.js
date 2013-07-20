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

function addYValue(points, y){
	return points.map(function(item){
		return [item[0],y,item[1]];
	});
}

function circle(r){
	return DISK(r)([64,2])
}

function rotateProfileNoTraslate(points){
	var area_domain = PROD1x1([INTERVALS(1)(128),INTERVALS(1)(128)]);
	var curve_map = BEZIER(S0)(points);
	return MAP(PROFILEPROD_SURFACE([curve_map,bezier_circle_map(1,S1)]))(area_domain);
}

function bezier_circle(r){
	return MAP(bezier_circle_map(r))(INTERVALS(1)(64));
}

function bezier_circle_map(r,selector){

	if (selector === undefined)
		selector = S0

	var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];
	var circle_points = scalePoints(base_points,r);
	return BEZIER(selector)(circle_points)
}

var scalePoints = function(points,values) {
	return points.map(function(item){
		return item.map(function(elem){
			return elem*values;
		});
	});
}

function traslaPointsX(points,value){
	return points.map(function(item){
		return [item[0]+value,item[1],item[2]];
	});
}

function traslaPointsY(points,value){
	return points.map(function(item){
		return [item[0],item[1]+value,item[2]];
	});
}
function traslaPointsZ(points,value){
	return points.map(function(item){
		return [item[0],item[1],item[2]+value];
	});
}
function unifyBezierCurves(map_curve_1,map_curve_2){
	return MAP(BEZIER(S1)([map_curve_1,map_curve_2]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]));
}

function bezier_full_circle_not_centered(r,x_value,y_value,z_value){
	return MAP(BEZIER(S1)([bezier_circle_not_centered_map(r,x_value,y_value,z_value),[x_value,y_value,z_value]]))(PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]));
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
function bezier_full_circle(r){
	return MAP(BEZIER(S1)([bezier_circle_map(r),[0,0,0]]))(PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]));
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

var line_domain = INTERVALS(1)(32)
var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])

var pot_color = rgb([300,300,300]);

var pot_central_profile = addYValue([[3.75, 1.68], [3.51, 2.47], [3.19, 2.55], [2.99, 2.62]],0);
var pot_bottom_profile = addYValue([[3.75, 1.68], [3.76, 1.61], [3.78, 1.49], [3, 1.41]],0);

var pot_r1 = 0.5;
var traslate_x = -(pot_central_profile[pot_central_profile.length-1][0]-pot_r1-0.01);
var traslate_z = -pot_bottom_profile[pot_bottom_profile.length-1][2];

pot_central_profile = traslaPointsX(pot_central_profile, traslate_x);
pot_bottom_profile = traslaPointsX(pot_bottom_profile, traslate_x);
pot_central_profile = traslaPointsZ(pot_central_profile, traslate_z);
pot_bottom_profile = traslaPointsZ(pot_bottom_profile, traslate_z);

var pot_r2 = 0.9;
var pot_central = STRUCT([ rotateProfileNoTraslate(pot_central_profile),
							rotateProfileNoTraslate(pot_bottom_profile),
							bezier_full_circle_not_centered(pot_r1,0,0,pot_central_profile[pot_central_profile.length-1][2]),
							bezier_full_circle(pot_r2)
						  ]);


var base_h = 0.05;
var base_incomplete = MAP(BEZIER(S1)([ bezier_circle_not_centered_map(pot_r2,0,0,base_h),
							bezier_circle_not_centered_map(1.05*pot_r2,0,0,base_h/2),
							bezier_circle_map(pot_r2)	]))(PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]));
var base = STRUCT([base_incomplete,bezier_full_circle(pot_r2)])


//Top part
var top_points = addYValue([[2.98, 3.02], [3.03, 2.98], [2.97, 2.75], [2.95, 2.6]],0);
var top_points_central = addYValue([[2.98, 3.05], [3.03, 2.98], [2.97, 2.75], [2.95, 2.6]],0.02);
top_points = traslaPointsX(top_points, traslate_x);
top_points = traslaPointsZ(top_points, traslate_z);
top_points_central = traslaPointsX(top_points_central, traslate_x);
top_points_central = traslaPointsZ(top_points_central, traslate_z);
var top_points_t = traslaPointsY(top_points,0.1);
var top_points_central_t = traslaPointsY(top_points_central,0.06);
var top_points_x = traslaPointsX(top_points,-0.02)
var top_points_t_x = traslaPointsX(top_points_t,-0.02)

var top_curve = BEZIER(S0)(top_points)
var top_curve_central = BEZIER(S0)(top_points_central)
var top_curve_t = BEZIER(S0)(top_points_t)
var top_curve_central_t = BEZIER(S0)(top_points_central_t)
var top_curve_x = BEZIER(S0)(top_points_x)
var top_curve_t_x = BEZIER(S0)(top_points_t_x)

var top_part1_back = MAP(BEZIER(S1)([ top_curve,top_curve_central,top_curve_central_t,top_curve_t ]))(area_domain);
var top_part1_front = MAP(BEZIER(S1)([ top_curve_x,top_curve_central,top_curve_central_t,top_curve_t_x ]))(area_domain);
var top_part1_conjuction1 = unifyBezierCurves(top_curve, top_curve_x);
var top_part1_conjuction2 = unifyBezierCurves(top_curve_t, top_curve_t_x);


var top_part2_points1 = [[2.98, 0.0, 3.03], [2.84, -0.02, 3.06], [2.8, 0.0, 3.05], [2.75, 0.0, 3.05], [2.69, 0.05, 3.03]];
var top_part2_points2 = [[2.98, 0.0, 3], [2.86, -0.02, 3.01], [2.78, 0.0, 3.02], [2.75, 0.0, 3.02], [2.69, 0.05, 3.03]];
var top_part2_points3 = [[2.98, 0.1, 3.03], [2.84, 0.12, 3.06], [2.8, 0.07, 3.05], [2.75, 0.1, 3.05], [2.69, 0.05, 3.03]];
var top_part2_points4 = [[2.98, 0.1, 3], [2.86, 0.12, 3.01], [2.78, 0.07, 3.02], [2.75, 0.1, 3.05], [2.69, 0.05, 3.03]];

var top_part2_points5 = [[2.98, 0.05, 3.05], [2.84, 0.05, 3.08], [2.8, 0.05, 3.07], [2.75, 0.05, 3.05], [2.69, 0.05, 3.03]];
var top_part2_points6 = [[2.98, 0.05, 3], [2.84, 0.05, 2.98], [2.8, 0.05, 2.97], [2.75, 0.05, 3], [2.69, 0.05, 3.03]];

top_part2_points1 = traslaPointsX(top_part2_points1, traslate_x);
top_part2_points1 = traslaPointsZ(top_part2_points1, traslate_z);
top_part2_points2 = traslaPointsX(top_part2_points2, traslate_x);
top_part2_points2 = traslaPointsZ(top_part2_points2, traslate_z);
top_part2_points3 = traslaPointsX(top_part2_points3, traslate_x);
top_part2_points3 = traslaPointsZ(top_part2_points3, traslate_z);
top_part2_points4 = traslaPointsX(top_part2_points4, traslate_x);
top_part2_points4 = traslaPointsZ(top_part2_points4, traslate_z);
top_part2_points5 = traslaPointsX(top_part2_points5, traslate_x);
top_part2_points5 = traslaPointsZ(top_part2_points5, traslate_z);
top_part2_points6 = traslaPointsX(top_part2_points6, traslate_x);
top_part2_points6 = traslaPointsZ(top_part2_points6, traslate_z);

var top_part2_curve1 = BEZIER(S0)(top_part2_points1)
var top_part2_curve2 = BEZIER(S0)(top_part2_points2)
var top_part2_curve3 = BEZIER(S0)(top_part2_points3)
var top_part2_curve4 = BEZIER(S0)(top_part2_points4)
var top_part2_curve5 = BEZIER(S0)(top_part2_points5)
var top_part2_curve6 = BEZIER(S0)(top_part2_points6)

var top_part2 = STRUCT([  MAP(BEZIER(S1)([ top_part2_curve1,top_part2_curve2 ]))(area_domain),
							MAP(BEZIER(S1)([ top_part2_curve3,top_part2_curve4 ]))(area_domain),
							MAP(BEZIER(S1)([ top_part2_curve1, top_part2_curve5, top_part2_curve3 ]))(area_domain),
							MAP(BEZIER(S1)([ top_part2_curve2, top_part2_curve6, top_part2_curve4 ]))(area_domain) ]);	

var top_obj = STRUCT([ top_part1_back,top_part1_front,top_part1_conjuction1,top_part1_conjuction2, top_part2])

// Beak

var beak_profile = [[0.84,0.03 ,2.72], [0.89, 0.00,2.74], [0.94, -0.01,2.79], [1, 0,2.81]]
var beak_profile2 = [[0.84,0.03 ,2.72], [0.89, 0.05,2.74], [0.94, 0.07,2.79], [1, 0.06,2.81]]
var beak_profile3 = [[1, 0,2.81], [1.02,0.03,2.81],[1, 0.06,2.81]]
beak_profile = traslaPointsX(beak_profile, traslate_x);
beak_profile = traslaPointsZ(beak_profile, traslate_z);
beak_profile2 = traslaPointsX(beak_profile2, traslate_x);
beak_profile2 = traslaPointsZ(beak_profile2, traslate_z);
beak_profile3 = traslaPointsX(beak_profile3, traslate_x);
beak_profile3 = traslaPointsZ(beak_profile3, traslate_z);

var beak_increase1 = 1.3;
var beak_profile_external = scalePointsX(scalePointsY(beak_profile,beak_increase1), beak_increase1)
var beak_profile2_external = scalePointsX(scalePointsY(beak_profile2,beak_increase1), beak_increase1)
var beak_profile3_external = scalePointsX(scalePointsY(beak_profile3,beak_increase1), beak_increase1)

beak_profile_external = traslaPointsY(traslaPointsX(beak_profile_external,0.46),-0.01);
beak_profile2_external = traslaPointsY(traslaPointsX(beak_profile2_external,0.46),-0.01);
beak_profile3_external = traslaPointsY(traslaPointsX(beak_profile3_external,0.46),-0.01);

var beak_increase2 = 0.6;
var beak_centered = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered2 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered3 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile_external,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered2_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2_external,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered3_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3_external,beak_increase2), -0.47), -0.02), 0.2);


var beak_increase2 = 5;
var beak_end = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end2 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end3 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end2_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
var beak_end3_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);

var beak_end = [[1.21, -0.05,1.42], [1.4, -0.15,1.9], [1.64, -0.2,2.14], [2.28, -0.3,2.43]];
var beak_end2 = [[1.21, 0.05,1.42], [1.4, 0.15,1.9], [1.64, 0.2,2.14], [2.28, 0.3,2.43]];
var beak_end3 = [[2.28, -0.3,2.43], [2.18,-0.1,2.43],[2.18,0.1,2.43],[2.28, 0.3,2.43]];
beak_end = traslaPointsX(beak_end, traslate_x+0.1);
beak_end = traslaPointsZ(beak_end, traslate_z+0.15);
beak_end2 = traslaPointsX(beak_end2, traslate_x+0.1);
beak_end2 = traslaPointsZ(beak_end2, traslate_z+0.15);
beak_end3 = traslaPointsX(beak_end3, traslate_x+0.1);
beak_end3 = traslaPointsZ(beak_end3, traslate_z+0.15);

var beak_curve = BEZIER(S0)(beak_profile);
var beak_curve2 = BEZIER(S0)(beak_profile2);
var beak_curve3 = BEZIER(S0)(beak_profile3);
var beak_curve_external = BEZIER(S0)(beak_profile_external);
var beak_curve2_external = BEZIER(S0)(beak_profile2_external);
var beak_curve3_external = BEZIER(S0)(beak_profile3_external);
var beak_centered_curve = BEZIER(S0)(beak_centered);
var beak_centered2_curve = BEZIER(S0)(beak_centered2);
var beak_centered3_curve = BEZIER(S0)(beak_centered3);
var beak_centered_curve_external = BEZIER(S0)(beak_centered_external);
var beak_centered2_curve_external = BEZIER(S0)(beak_centered2_external);
var beak_centered3_curve_external = BEZIER(S0)(beak_centered3_external);
var beak_end_curve = BEZIER(S0)(beak_end);
var beak_end2_curve = BEZIER(S0)(beak_end2);
var beak_end3_curve = BEZIER(S0)(beak_end3);
var beak_end_curve_external = BEZIER(S0)(beak_end_external);
var beak_end2_curve_external = BEZIER(S0)(beak_end2_external);
var beak_end3_curve_external = BEZIER(S0)(beak_end3_external);

var beak_depth = 0.01;
var beak_lateral_profile1 = [[-1.464,-0.01,1.4],[-1.3484,-0.026,1.04],[-0.1,-0.3,1.17]];
var beak_lateral_profile2 = [[-1.464,0.068,1.4],[-1.3484,0.0208,1.04],[-0.1,0.3,1.17]];
var beak_lateral_profile3 = [[-1.672,0.029,1.31],[-1.2,-0.0026,0.986],[-1.17,0.05,0.16]];

var beak_lateral_curve1 = BEZIER(S0)(beak_lateral_profile1);
var beak_lateral_curve2 = BEZIER(S0)(beak_lateral_profile2);
var beak_lateral_curve3 = BEZIER(S0)(beak_lateral_profile3);

var beak = STRUCT([ MAP(BEZIER(S1)([ beak_curve3_external,beak_centered3_curve_external,beak_end3_curve ]))(area_domain),
					MAP(BEZIER(S1)([ beak_lateral_curve1,beak_lateral_curve3,beak_lateral_curve3,beak_lateral_curve3,beak_lateral_curve2 ]))(area_domain)
					]);


// Handle
var handle_points11 = addYValue([[3.73, 2.85], [3.01, 3.21], [3.09, 3.02], [3.02, 2.61]],0);
var handle_points12 = addYValue([[3.73, 2.85], [4.39, 2.55], [4.31, 2.32], [4.08, 2.08]],0);
var handle_points13 = addYValue([[3.66, 1.82], [3.84, 1.9], [3.94, 1.99], [4.08, 2.08]],0);

var handle_points21 = addYValue([[3.7, 2.77], [3.02, 3.09], [3.15, 2.84], [3.11, 2.56]],0);
var handle_points22 = addYValue([[3.7, 2.77], [4.24, 2.48], [4.21, 2.32], [3.96, 2.15]],0);
var handle_points23 = addYValue([[3.6, 1.97], [3.74, 2.01], [3.85, 2.08], [3.96, 2.15]],0);

handle_points11 = traslaPointsX(handle_points11, traslate_x);
handle_points11 = traslaPointsZ(handle_points11, traslate_z);
handle_points12 = traslaPointsX(handle_points12, traslate_x);
handle_points12 = traslaPointsZ(handle_points12, traslate_z);
handle_points13 = traslaPointsX(handle_points13, traslate_x);
handle_points13 = traslaPointsZ(handle_points13, traslate_z);
handle_points21 = traslaPointsX(handle_points21, traslate_x);
handle_points21 = traslaPointsZ(handle_points21, traslate_z);
handle_points22 = traslaPointsX(handle_points22, traslate_x);
handle_points22 = traslaPointsZ(handle_points22, traslate_z);
handle_points23 = traslaPointsX(handle_points23, traslate_x);
handle_points23 = traslaPointsZ(handle_points23, traslate_z);

var handle_delta_y = 0.2;
var handle_points11t = traslaPointsY(handle_points11,handle_delta_y);
var handle_points12t = traslaPointsY(handle_points12,handle_delta_y);
var handle_points13t = traslaPointsY(handle_points13,handle_delta_y);
var handle_points21t = traslaPointsY(handle_points21,handle_delta_y);
var handle_points22t = traslaPointsY(handle_points22,handle_delta_y);
var handle_points23t = traslaPointsY(handle_points23,handle_delta_y);

var handle_curve11 = BEZIER(S0)(handle_points11)
var handle_curve12 = BEZIER(S0)(handle_points12)
var handle_curve13 = BEZIER(S0)(handle_points13)
var handle_curve21 = BEZIER(S0)(handle_points21)
var handle_curve22 = BEZIER(S0)(handle_points22)
var handle_curve23 = BEZIER(S0)(handle_points23)
var handle_curve11t = BEZIER(S0)(handle_points11t)
var handle_curve12t = BEZIER(S0)(handle_points12t)
var handle_curve13t = BEZIER(S0)(handle_points13t)
var handle_curve21t = BEZIER(S0)(handle_points21t)
var handle_curve22t = BEZIER(S0)(handle_points22t)
var handle_curve23t = BEZIER(S0)(handle_points23t)

var handle = STRUCT([ 	unifyBezierCurves(handle_curve11,handle_curve11t),
						unifyBezierCurves(handle_curve12,handle_curve12t),
						unifyBezierCurves(handle_curve13,handle_curve13t),
						unifyBezierCurves(handle_curve21,handle_curve21t),
						unifyBezierCurves(handle_curve22,handle_curve22t),
						unifyBezierCurves(handle_curve23,handle_curve23t),						
						unifyBezierCurves(handle_curve11,handle_curve21),				
						unifyBezierCurves(handle_curve12,handle_curve22),				
						unifyBezierCurves(handle_curve13,handle_curve23),						
						unifyBezierCurves(handle_curve11t,handle_curve21t),				
						unifyBezierCurves(handle_curve12t,handle_curve22t),				
						unifyBezierCurves(handle_curve13t,handle_curve23t)
					 ]);


var pot = STRUCT([ pot_central,base,top_obj,handle,beak ]);							

var pot = STRUCT([ COLOR(pot_color)(pot),
					COLOR(rgb([30,30,30]))(bezier_full_circle_not_centered(1.1*pot_r1,0,0,0.97*pot_central_profile[pot_central_profile.length-1][2])) 
					]);


draw(pot)
