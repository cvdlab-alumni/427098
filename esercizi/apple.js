/* Draw an apple */


function generateMirrorPoints(points,axis,value){
	return points.map(function(item){
		a = [];
		for (var i = 0; i < 3; i++) {
			if (i === axis)
				a.push(item[axis] + 2*(value-item[axis]));
			else
				a.push(item[i]);
		}

		return a;
	});
}

function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

function addYValue(points, y){
	return points.map(function(item){
		return [item[0],y,item[1]];
	});
}

var traslaPointsZ = function(points,value){
	return points.map(function(item){
		return [item[0],item[1],item[2]-value];
	});
};
var traslaPointsX = function(points,value){
	return points.map(function(item){
		return [item[0]-value],item[1],item[2];
	});
};


function bezier_circle_map(r,selector){

	if (selector === undefined)
		selector = S0

	var scalePoints = function(points) {
		return points.map(function(item){
			return item.map(function(elem){
				return elem*2*r;
			});
		});
	}

	var traslaPoints = function(points){
		return points.map(function(item){
			return [item[0]-r,item[1],item[2]];
		});
	};

	var base_points = [[0,0,0],[0,0.8,0],[1.3,0.8,0],[1.3,0,0],[1.3,-0.8,0],[0,-0.8,0],[0,0,0]];

	var circle_points_non_centered = scalePoints(base_points);
	var circle_points = traslaPoints(circle_points_non_centered);

	return BEZIER(selector)(circle_points)
}

function bezier_circle(r){
	return MAP(bezier_circle_map(r))(INTERVALS(1)(64));
}

var area_domain = PROD1x1([INTERVALS(1)(128),INTERVALS(1)(128)]);

var points = [[0,0,0], [1.37,0, -0.47], [2.11,0,2.84], [0.03,0,2.36]];


function rotateProfile(points){
	var area_domain = PROD1x1([INTERVALS(1)(128),INTERVALS(1)(128)]);
	var curve_map = BEZIER(S0)(points);
	return MAP(PROFILEPROD_SURFACE([curve_map,bezier_circle_map(1,S1)]))(area_domain);
}

var apple = rotateProfile(points);


var stick_point_base1 = addYValue([[3.35, 4.44], [3.49, 4.55], [4.02, 3.73], [4.04, 3.07]],0);
var stick_point_base2 = addYValue([[3.35, 4.44], [2.8, 4.29], [3.76, 4.37], [3.94, 3.08]],0);
var stick_point_map1 = BEZIER(S0)(stick_point_base1);
var stick_point_map2 = BEZIER(S0)(stick_point_base2);

var stick_up_map1 = BEZIER(S0)([[3.31, 0.3 ,4.38], [3.55, 0.2 ,4.19], [3.85, 0.05 ,3.91], [4, 0.01, 3.06]]);
var stick_up_map2 = BEZIER(S0)([[3.31, -0.3 ,4.38], [3.55, -0.2 ,4.19], [3.85, -0.05 ,3.91], [4, -0.01, 3.06]]);
var stick = MAP(BEZIER(S1)([stick_up_map2,stick_point_map1,stick_up_map1,stick_point_map2,stick_up_map2]))(area_domain);

var leaf_point = addYValue([[4.68, 4.42], [5.25, 4.61],[4.87, 4.4],[4.91, 4.24], [4.72, 3.16], [4.31, 3.8], [3.9, 3.61]],0);
var leaf_map = BEZIER(S0)(leaf_point);
var leaf_simmetry =  BEZIER(S0)(addYValue([[4.59, 4.23], [4.11, 3.97]]));
var h = 0.5;
var leaf_3D_outline_up = BEZIER(S0)([[4.96,0, 4.49], [4.28, h, 4.16], [3.9,0,3.61]]);
var leaf_3D_outline_down = BEZIER(S0)([[4.96,0, 4.49], [4.28,-h, 4.16], [3.9,0,3.61]]);
var leaf_outline = MAP(leaf_map)(INTERVALS(1)(64))


var leaf_point2 = addYValue([[4.68, 4.42], [3.85, 4.44], [3.76, 4.21],[3.9, 3.61]],0);
var leaf_map2 = BEZIER(S0)(leaf_point2);

var leaf = MAP(BEZIER(S1)([leaf_map,leaf_3D_outline_up,leaf_3D_outline_down,leaf_map2]))(area_domain)


apple = COLOR([1,0,0])(apple);
leaf = COLOR(rgb([42, 95, 43]))(leaf);
stick = COLOR(rgb([ 101, 67, 33]))(stick);

var model = STRUCT([apple,T([0,2])([-4,-1]),leaf,stick]);

DRAW(model)