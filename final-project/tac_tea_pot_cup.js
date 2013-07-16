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

function TNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
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

function rotateProfileNoTraslate(points){
	var area_domain = PROD1x1([INTERVALS(1)(128),INTERVALS(1)(128)]);
	var curve_map = BEZIER(S0)(points);
	return MAP(PROFILEPROD_SURFACE([curve_map,bezier_circle_map(1,S1)]))(area_domain);
}


var line_domain = INTERVALS(1)(32)
var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])

var plate_color_p1 = rgb([60,60,60]);
var plate_color_p2 = rgb([58,58,58]);
var cup_color = rgb([300,300,300]);

var cup_points1 = addYValue([[3.65, 1.16], [4.34, 1.42], [5.07, 1.77], [5.17, 3.11]],0);
var cup_points2 = addYValue([[3.71, 1.16], [4.28, 1.42], [5.01, 1.77], [5.11, 3.11]],0);
var cup_points3 = addYValue([[5.17, 3.11],[5.15, 3.15],[5.13, 3.15],[5.11, 3.11]],0);

var cup_base_traslate = 3.21;

cup_points1 = traslaPointsX(cup_points1,-cup_base_traslate);
cup_points2 = traslaPointsX(cup_points2,-cup_base_traslate);
cup_points3 = traslaPointsX(cup_points3,-cup_base_traslate);

var cup_external = STRUCT([rotateProfileNoTraslate(cup_points1),
							rotateProfileNoTraslate(cup_points2),
							rotateProfileNoTraslate(cup_points3),
							TNC([2])([minValueCoordinate(cup_points1,2)])(circle(3.86-cup_base_traslate+0.05))]); 



cup_external = COLOR(cup_color)(cup_external)

var plate_points = addYValue([[3.74,0.80],[4.6,0.79],[5.46,0.75],[6.06,1.38],[6.06, 1.58], [5.46, 1.15], [4.6, 0.99], [3.74, 1.0]],0);
var plate_base_traslate = 3.15;
plate_points = traslaPointsX(plate_points,-plate_base_traslate);
var plate_p1 = rotateProfileNoTraslate(plate_points);
var plate_p2 = TNC([2])([minValueCoordinate(plate_points,2)+0.045])(circle(3.74-plate_base_traslate+0.05));

plate_p1 = COLOR(plate_color_p1)(plate_p1);
plate_p2 = COLOR(plate_color_p2)(plate_p2);

var plate = STRUCT([plate_p1,plate_p2]);

plate = SNC([0,1,2])([1.25,1.25,1.25])(plate);



draw(cup_external)
draw(plate)