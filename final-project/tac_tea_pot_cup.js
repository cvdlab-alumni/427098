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

var minValueCoordinate = function(points,axis){
	minVal = points[0][axis]
	for (i=1; i<points.length; i++)
		if (points[i][axis]<minVal)
			minVal = points[i][axis]
	return minVal
}

function circle(r){
	return DISK(r)([64,2])
}


function TNC(dims) {
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
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

function traslaPointsY(points,value){
	return points.map(function(item){
		return [item[0],item[1]+value,item[2]];
	});
}

function unifyBezierCurves(map_curve_1,map_curve_2){
	return MAP(BEZIER(S1)([map_curve_1,map_curve_2]))(PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]));
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


//Handle
var handle_points11 = addYValue([[5.82, 2.47], [5.72, 3.05], [5.6, 2.83], [5.16, 2.88]],0);
var handle_points12 = addYValue([[5.82, 2.47], [5.9, 1.92], [5.68, 1.97], [5.41, 1.81]],0);
var handle_points13 = addYValue([[4.21, 1.39], [4.19, 1.28], [4.82, 1.53], [5.41, 1.82]],0);

var handle_points21 = addYValue([[5.67, 2.42], [5.63, 2.79], [5.28, 2.76],[5.06, 2.48]],0);
var handle_points22 = addYValue([[5.67, 2.42], [5.78, 2.17], [5.62, 2.04], [5.1, 1.85]],0);
var handle_points23 = addYValue([[4.53, 1.60], [4.75, 1.69], [4.87, 1.74], [5.1, 1.85]],0);

handle_points11 = traslaPointsX(handle_points11,-cup_base_traslate);
handle_points12 = traslaPointsX(handle_points12,-cup_base_traslate);
handle_points13 = traslaPointsX(handle_points13,-cup_base_traslate);
handle_points21 = traslaPointsX(handle_points21,-cup_base_traslate);
handle_points22 = traslaPointsX(handle_points22,-cup_base_traslate);
handle_points23 = traslaPointsX(handle_points23,-cup_base_traslate);

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

handle = COLOR(cup_color)(handle)

//Plate

var plate_points = addYValue([[3.74,0.80],[4.6,0.79],[5.46,0.75],[6.06,1.38],[6.06, 1.58], [5.46, 1.15], [4.6, 0.99], [3.74, 1.0]],0);
var plate_base_traslate = 3.15;
plate_points = traslaPointsX(plate_points,-plate_base_traslate);
var plate_p1 = rotateProfileNoTraslate(plate_points);
var plate_p2 = TNC([2])([minValueCoordinate(plate_points,2)+0.045])(circle(3.74-plate_base_traslate+0.05));

plate_p1 = COLOR(plate_color_p1)(plate_p1);
plate_p2 = COLOR(plate_color_p2)(plate_p2);

var plate = STRUCT([plate_p1,plate_p2]);
plate = SNC([0,1,2])([1.25,1.25,1.25])(plate);


//Model Assembly

var cup = STRUCT([cup_external,plate,handle]);
draw(cup)