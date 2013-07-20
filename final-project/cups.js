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

function traslaPointsX(points,value){
	return points.map(function(item){
		return [item[0]+value,item[1],item[2]];
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

var scalePoints = function(points,values) {
	return points.map(function(item){
		return item.map(function(elem){
			return elem*values;
		});
	});
}

function bezier_circle_map(r,selector){

	if (selector === undefined)
		selector = S0

	var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];

	var circle_points = scalePoints(base_points,r);

	return BEZIER(selector)(circle_points)
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

function rotateProfileNoTraslate(points){
	var area_domain = PROD1x1([INTERVALS(1)(128),INTERVALS(1)(128)]);
	var curve_map = BEZIER(S0)(points);
	return MAP(PROFILEPROD_SURFACE([curve_map,bezier_circle_map(1,S1)]))(area_domain);
}

function circle(r){
	return DISK(r)([64,2])
}

function bezier_full_circle_not_centered(r,x_value,y_value,z_value){
	return MAP(BEZIER(S1)([bezier_circle_not_centered_map(r,x_value,y_value,z_value),[x_value,y_value,z_value]]))(PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]));
}






var line_domain = INTERVALS(1)(32)
var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])

var external_color = rgb([181,37,46]);
var internal_color = rgb([38,5,14]);


function generateCup(profile,depth,ray){
	var internal_profile = [];
	var external_profile = [];

	profile.sort();
	profile = traslaPointsX(profile,-(profile[0][0]-ray))

	profile.forEach(function(coord){
		internal_profile.push([coord[0]-depth,coord[1],coord[2]]);
		external_profile.push([coord[0]+depth,coord[1],coord[2]]);
	});

	var step = (external_profile[internal_profile.length-1][0] - internal_profile[internal_profile.length-1][0])/3;
	var profile_conjuction = [  internal_profile[internal_profile.length-1],
								[internal_profile[internal_profile.length-1][0] + step, internal_profile[internal_profile.length-1][1], internal_profile[internal_profile.length-1][2]],
								[internal_profile[internal_profile.length-1][0] + 2*step, internal_profile[internal_profile.length-1][1], internal_profile[internal_profile.length-1][2]],
								external_profile[internal_profile.length-1] ];

	var base_h = 0.02;
	var base = MAP(BEZIER(S1)([ bezier_circle_not_centered_map(ray,0,0,base_h),
								bezier_circle_not_centered_map(1.05*ray,0,0,base_h/2),
								bezier_circle_map(ray)	]))(area_domain);

	var internal_part = STRUCT([ rotateProfileNoTraslate(internal_profile), TNC([2])([internal_profile[0][2]])(circle(ray))]);
	var external_part = STRUCT([ rotateProfileNoTraslate(external_profile),
								 rotateProfileNoTraslate(profile_conjuction),
								 TNC([2])([internal_profile[0][2]-base_h])(base),
								 bezier_full_circle_not_centered(ray, 0, 0, internal_profile[0][2]-base_h)
							    ]);

	internal_part = COLOR(internal_color)(internal_part)
	external_part = COLOR(external_color)(external_part)

	return STRUCT([ internal_part,external_part ]);
}

var points1 = [[0.93, 0,0.25], [1.09, 0,0.25], [1.28, 0,0.43], [1.4, 0,0.58]];
var points2 = [[1.63, 0, 0.06], [1.8, 0, 0.14], [1.84, 0, 0.21], [1.88, 0, 0.46]];
var points3 = [[2.23, 0, 0.23], [2.41, 0, 0.29], [2.54, 0, 0.34], [2.57, 0, 0.51]];

points1 = traslaPointsZ(points1,-0.25)
points2 = traslaPointsZ(points2,-0.06)
points3 = traslaPointsZ(points3,-0.23)

var cup1 = generateCup(points1,0.015,0.2)
var cup2 = generateCup(points2,0.015,0.1)
var cup3 = generateCup(points3,0.015,0.2)

var cups = STRUCT([cup3, TNC([0])([1.5])(cup1), TNC([0,1])([0.7,1])(cup2)])

draw(cups)

