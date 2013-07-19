
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

function addYValue(points, y){
	return points.map(function(item){
		return [item[0],y,item[1]];
	});
}

function traslaPointsY(points,value){
	return points.map(function(item){
		return [item[0],item[1]+value,item[2]];
	});
}

function unifyBezierCurves(map_curve_1,map_curve_2){
	return MAP(BEZIER(S1)([map_curve_1,map_curve_2]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]));
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

function traslaPointsZ(points,value){
	return points.map(function(item){
		return [item[0],item[1],item[2]+value];
	});
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

function cilynder(r,h){
	return EXTRUDE([h])(DISK(r)([64, 2]))
}

function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}






var line_domain = INTERVALS(1)(32);
var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]);

var depth = 0.5;

// Front background

var lock_left_profile1 = addYValue([[0.52, 1.26], [0.45, 1.33], [0.43, 1.46], [0.59, 1.49]],0);
var lock_left_profile2 = addYValue([[0.52, 1.26], [0.52, 1.12], [0.49, 1.02], [0.58, 1.03]],0);
var lock_right_profile1 = addYValue([[0.67, 1.27], [0.67, 1.12], [0.68, 1.01], [0.58, 1.03]],0);
var lock_right_profile2 = addYValue([[0.67, 1.27], [0.7, 1.29], [0.77, 1.46], [0.59, 1.49]],0);
var lock_up = addYValue([[0.69, 1.44], [0.64, 1.52], [0.54, 1.51], [0.5, 1.46]],0);
var lock_down = addYValue([[0.54, 1.04],[0.57, 1.01],[0.62, 1.01],[0.64, 1.04]],0);

var handle_left1 = [[0.27,0,1.26],[0.27,0,3.48]];
var handle_left2 = [[0.27,0,1.26],[0.27,0,0.35]];
var handle_right1 = [[0.91,0,1.26],[0.91,0,0.35]];
var handle_right2 = [[0.91,0,1.26],[0.91,0,3.48]];
var handle_up = [[0.91,0,3.48],[0.27,0,3.48]];
var handle_down = [[0.27,0,0.35],[0.91,0,0.35]];

var lock_left_profile1_curve = BEZIER(S0)(lock_left_profile1)
var lock_left_profile2_curve = BEZIER(S0)(lock_left_profile2)
var lock_right_profile1_curve = BEZIER(S0)(lock_right_profile1)
var lock_right_profile2_curve = BEZIER(S0)(lock_right_profile2)
var lock_down_curve = BEZIER(S0)(lock_down)
var lock_up_curve = BEZIER(S0)(lock_up)
var handle_left1_curve = BEZIER(S0)(handle_left1)
var handle_left2_curve = BEZIER(S0)(handle_left2)
var handle_right1_curve = BEZIER(S0)(handle_right1)
var handle_right2_curve = BEZIER(S0)(handle_right2)
var handle_up_curve = BEZIER(S0)(handle_up)
var handle_down_curve = BEZIER(S0)(handle_down)

var lock_left1 = MAP(BEZIER(S1)([ lock_left_profile1_curve, handle_left1_curve ]))(area_domain);
var lock_left2 = MAP(BEZIER(S1)([ lock_left_profile2_curve, handle_left2_curve ]))(area_domain);
var lock_right1 = MAP(BEZIER(S1)([ lock_right_profile1_curve, handle_right1_curve ]))(area_domain);
var lock_right2 = MAP(BEZIER(S1)([ lock_right_profile2_curve, handle_right2_curve ]))(area_domain);
var lock_up = MAP(BEZIER(S1)([ handle_up_curve, lock_up_curve ]))(area_domain);
var lock_down = MAP(BEZIER(S1)([ handle_down_curve, lock_down_curve ]))(area_domain);

var lock_front = STRUCT([ lock_left1,lock_left2,lock_right1,lock_right2,lock_up,lock_down]);

// Back background

var lock_left_profile1_t = traslaPointsY(lock_left_profile1, depth);
var lock_left_profile2_t = traslaPointsY(lock_left_profile2, depth);
var lock_right_profile1_t = traslaPointsY(lock_right_profile1, depth);
var lock_right_profile2_t = traslaPointsY(lock_right_profile2, depth);
var lock_up_t = traslaPointsY(lock_up, depth);
var lock_down_t = traslaPointsY(lock_down, depth);

var handle_left1_t = traslaPointsY(handle_left1, depth);
var handle_left2_t = traslaPointsY(handle_left2, depth);
var handle_right1_t = traslaPointsY(handle_right1, depth);
var handle_right2_t = traslaPointsY(handle_right2, depth);
var handle_up_t = traslaPointsY(handle_up, depth);
var handle_down_t = traslaPointsY(handle_down, depth);

var lock_left_profile1_curve_t = BEZIER(S0)(lock_left_profile1_t)
var lock_left_profile2_curve_t = BEZIER(S0)(lock_left_profile2_t)
var lock_right_profile1_curve_t = BEZIER(S0)(lock_right_profile1_t)
var lock_right_profile2_curve_t = BEZIER(S0)(lock_right_profile2_t)
var lock_down_curve_t = BEZIER(S0)(lock_down_t)
var lock_up_curve_t = BEZIER(S0)(lock_up_t)
var handle_left1_curve_t = BEZIER(S0)(handle_left1_t)
var handle_left2_curve_t = BEZIER(S0)(handle_left2_t)
var handle_right1_curve_t = BEZIER(S0)(handle_right1_t)
var handle_right2_curve_t = BEZIER(S0)(handle_right2_t)
var handle_up_curve_t = BEZIER(S0)(handle_up_t)
var handle_down_curve_t = BEZIER(S0)(handle_down_t)

var lock_left1_t = MAP(BEZIER(S1)([ lock_left_profile1_curve_t, handle_left1_curve_t ]))(area_domain);
var lock_left2_t = MAP(BEZIER(S1)([ lock_left_profile2_curve_t, handle_left2_curve_t ]))(area_domain);
var lock_right1_t = MAP(BEZIER(S1)([ lock_right_profile1_curve_t, handle_right1_curve_t ]))(area_domain);
var lock_right2_t = MAP(BEZIER(S1)([ lock_right_profile2_curve_t, handle_right2_curve_t ]))(area_domain);

var lock_back = STRUCT([ lock_left1_t,lock_left2_t,lock_right1_t,lock_right2_t,lock_up_t,lock_down_t]);

// Conjuction background

var lock = STRUCT([ lock_front,lock_back, 
					unifyBezierCurves(lock_left_profile1_curve, lock_left_profile1_curve_t),
					unifyBezierCurves(lock_left_profile2_curve, lock_left_profile2_curve_t),
					unifyBezierCurves(lock_right_profile1_curve, lock_right_profile1_curve_t),
					unifyBezierCurves(lock_right_profile2_curve, lock_right_profile2_curve_t),
					unifyBezierCurves(handle_left1_curve, handle_left1_curve_t),
					unifyBezierCurves(handle_left2_curve, handle_left2_curve_t),
					unifyBezierCurves(handle_right1_curve, handle_right1_curve_t),
					unifyBezierCurves(handle_right2_curve, handle_right2_curve_t),
					unifyBezierCurves(handle_down_curve, handle_down_curve_t),
					unifyBezierCurves(handle_up_curve, handle_up_curve_t) ]);

// Screws - Da rendere spaccati

var screw_r = 0.035;
var screw_h = 0.02;
var screw = MAP(BEZIER(S1)([ bezier_circle_map(screw_r),
							 bezier_circle_not_centered_map(screw_r,0,0,screw_h/2), 
							 bezier_circle_not_centered_map(0.8*screw_r,0,0,0.9*screw_h), 
							 [0,0,screw_h]  ]))(area_domain);

screw = RNC([1,2])(PI/2)(screw)
var screws_front = STRUCT([ T([0,2])([0.82, 3.37])(screw),T([0,2])([0.37, 3.39])(screw),
						T([0,2])([0.81, 0.43])(screw),T([0,2])([0.38, 0.42])(screw) ]);

screw_bc = RNC([1,2])(PI)(screw)
var screws_back = STRUCT([ T([0,1,2])([0.82, depth, 3.37])(screw_bc),T([0,1,2])([0.37, depth, 3.39])(screw_bc),
						T([0,1,2])([0.81, depth, 0.43])(screw_bc),T([0,1,2])([0.38, depth, 0.42])(screw_bc) ]);

var screws = STRUCT([screws_back,screws_front])


//Handle part
var handle_cily_h = 0.02;
var handle_cily_r = 0.18;
var handle_cily_1 = R([1,2])(PI/2)(cilynder(handle_cily_r, handle_cily_h));

var handle_cily_up = [[-0.0828,0,0.1376],[-0.0508,0,0.1528],[0.066,0,0.1464],[0.0716,0,0.1376]];
var handle_cily_down = [[0.07,0,-0.1304],[0.03,0,-0.1488],[-0.0684,0,-0.14],[-0.0828,0,-0.1288]] ;
var handle_cily_left1 = [[-0.1588,0,0.004],[-0.1612,0,0.0792],[-0.1108,0,0.1208],[-0.0828,0,0.1384]];
var handle_cily_left2 = [[-0.1588,0,0.004],[-0.1564,0,-0.0352],[-0.1212,0,-0.1144],[-0.0828,0,-0.1288]];
var handle_cily_right1 = [[0.0724,0,0.136],[0.1116,0,0.128],[0.158,0,0.0184],[0.1476,0,0.0016]];
var handle_cily_right2 = [[0.07,0,-0.1304],[0.0908,0,-0.1272],[0.158,0,-0.0296],[0.1476,0,0.0016]];

var handle_cily_up_curve = BEZIER(S0)(handle_cily_up);
var handle_cily_down_curve = BEZIER(S0)(handle_cily_down);
var handle_cily_left1_curve = BEZIER(S0)(handle_cily_left1);
var handle_cily_left2_curve = BEZIER(S0)(handle_cily_left2);
var handle_cily_right1_curve = BEZIER(S0)(handle_cily_right1);
var handle_cily_right2_curve = BEZIER(S0)(handle_cily_right2);

var handle_cily_h2 = 0.05;
var handle_cily_up_t = traslaPointsY(handle_cily_up,handle_cily_h2);
var handle_cily_down_t = traslaPointsY(handle_cily_down,handle_cily_h2);
var handle_cily_left1_t = traslaPointsY(handle_cily_left1,handle_cily_h2);
var handle_cily_left2_t = traslaPointsY(handle_cily_left2,handle_cily_h2);
var handle_cily_right1_t = traslaPointsY(handle_cily_right1,handle_cily_h2);
var handle_cily_right2_t = traslaPointsY(handle_cily_right2,handle_cily_h2);

var handle_cily_up_curve_t = BEZIER(S0)(handle_cily_up_t);
var handle_cily_down_curve_t = BEZIER(S0)(handle_cily_down_t);
var handle_cily_left1_curve_t = BEZIER(S0)(handle_cily_left1_t);
var handle_cily_left2_curve_t = BEZIER(S0)(handle_cily_left2_t);
var handle_cily_right1_curve_t = BEZIER(S0)(handle_cily_right1_t);
var handle_cily_right2_curve_t = BEZIER(S0)(handle_cily_right2_t);

var handle_cily = STRUCT([  //front
							MAP(BEZIER(S1)([handle_cily_up_curve,[0,0,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_down_curve,[0,0,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_left1_curve,[0,0,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_left2_curve,[0,0,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_right1_curve,[0,0,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_right2_curve,[0,0,0]]))(area_domain),
							//back
							MAP(BEZIER(S1)([handle_cily_up_curve_t,[0,handle_cily_h2,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_down_curve_t,[0,handle_cily_h2,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_left1_curve_t,[0,handle_cily_h2,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_left2_curve_t,[0,handle_cily_h2,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_right1_curve_t,[0,handle_cily_h2,0]]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_right2_curve_t,[0,handle_cily_h2,0]]))(area_domain), 
							//conjuction
							MAP(BEZIER(S1)([handle_cily_up_curve,handle_cily_up_curve_t]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_down_curve,handle_cily_down_curve_t]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_left1_curve,handle_cily_left1_curve_t]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_left2_curve,handle_cily_left2_curve_t]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_right1_curve,handle_cily_right1_curve_t]))(area_domain),
							MAP(BEZIER(S1)([handle_cily_right2_curve,handle_cily_right2_curve_t]))(area_domain) 
						]);


var handle_cily2 = R([0,2])(PI/4)(handle_cily);
var handle_p2_z = 2*(handle_cily_r-0.03);
var handle_p2 = STRUCT([ CUBOID([handle_p2_z,0.25,handle_p2_z]),
						 TNC([1])([-0.25]),CUBOID([0.6,0.25,handle_p2_z]),
						 TNC([0,1,2])([0.6,handle_p2_z/2,handle_p2_z/2])(RNC([0,2])(PI/2)(  COLOR(rgb([30,30,30]))(cilynder(0.7*handle_p2_z,1.2))) ) ])


var handle = STRUCT([  TNC([0,1,2])([0.58, -handle_cily_h2,2.44]),TNC([1])([2*handle_cily_h2 - handle_cily_h-0.02])(handle_cily_1),
					   TNC([1])([-handle_cily_h2])(handle_cily),handle_cily2, TNC([0,1,2])([-handle_cily_r+0.01,-0.3,-handle_cily_r+0.01])(handle_p2)]);

handle_rotate = RNC([1,2])(PI)( T([0,1,2])([-0.6,-0.015,-2.45])(handle) )

var model = STRUCT([lock,screws,handle,T([0,1,2])([0.6,depth,2.45])(handle_rotate)])



//draw with door
var door_color = rgb([150, 75, 0]);
var door = STRUCT([SIMPLEX_GRID([[0.28,-0.6,7],[depth],[15]]),SIMPLEX_GRID([[-0.28,0.6],[depth],[5.35,-3.13,6.52]])]);
door = COLOR(door_color)(door)
var door_complete = STRUCT([door,TNC([2])([5])(model)])

draw(door_complete)
