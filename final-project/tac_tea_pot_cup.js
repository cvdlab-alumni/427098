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

var plate_points = addYValue([[0.23, 1.68], [1.17, 1.19], [1.89, 1.13], [3.11, 1.18]],0);

var plate_curve = BEZIER(S0)(plate_points);
var plate = MAP(plate_curve)(ROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])]);

draw(plate)

