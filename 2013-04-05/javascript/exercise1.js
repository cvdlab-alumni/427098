//Andrea Iuliano

//Global variables
var z_pillar0 = 2.5;
var r_pillar0 = 0.25/2;
var l_pillar0 = 0.25;
var dist_pillar0_x = 2.75;
var dist_circle_to_square_x = 1.46675;
var dist_pillar0_y = 5.32;
var dist_pillar0_square_1 = 1.067;
var dist_pillar0_square_2 = 2.79;

var first_floor_z = 0.3905;
var dist_pillar1_up_circle = 8.25;
var dist_pillar1_up_square = 11;
var l_pillar1_small = 0.2;
var dist_pillar1_small = 1.46;


//Support functions
function circle(r){
	var domain = DOMAIN([[0,2*PI]])([36]);

	var circ = function (r) {
 		return function (v) {
  			return [r*COS(v[0]), r*SIN(v[0])];
  		};
	};

	var mapping = circ(r);

	return (MAP(mapping)(domain));
}

function extrude(obj,z){
	return EXTRUDE([z])(obj);
}

function traslate(coord,values,obj){
	var new_coord = coord.map(function(item){
		return item-1;	
	}); 
	return T(new_coord)(values)(obj);
}

function traslateVector(coord,values){
	var new_coord = coord.map(function(item){
		return item-1;	
	}); 
	return T(new_coord)(values);
}

//Draw a first circle pillar
var pillar_circle_model_2D = traslate([1,2],[r_pillar0, r_pillar0],circle(r_pillar0));
var pillar_circle_model = extrude(pillar_circle_model_2D,z_pillar0);

var pillar0_below = STRUCT( [pillar_circle_model, STRUCT(REPLICA(4)([ traslateVector( [1], [dist_pillar0_x]), pillar_circle_model ])) ]);

var square_pillar_model = CUBOID([l_pillar0,l_pillar0,z_pillar0]);

var pillar0_up_three_square = STRUCT(REPLICA(3)([ traslateVector( [1], [dist_pillar0_x]), square_pillar_model]));

var piller0_up_small = traslate([1],[dist_circle_to_square_x],square_pillar_model);

var pillar0_up_centered = STRUCT( [pillar_circle_model,pillar0_up_three_square,piller0_up_small] );

var pillars0 = STRUCT([pillar0_below, traslate([2],[dist_pillar0_y],pillar0_up_centered)]);


//Draw pillar1
var pillar1_below = STRUCT([square_pillar_model, STRUCT(REPLICA(4)([traslateVector([1],[dist_pillar0_x]),square_pillar_model])) ]);

var pillar1_up_1 = STRUCT( [square_pillar_model, STRUCT(REPLICA(2)([traslateVector([1],[dist_pillar0_x]),square_pillar_model]))] );
var pillar1_up_2 = STRUCT( [pillar1_up_1, traslate([1], dist_pillar1_up_circle, pillar_circle_model),traslate([1], dist_pillar1_up_square, square_pillar_model)] );

var square_pillar_model_small = CUBOID([l_pillar1_small,l_pillar1_small,z_pillar0]);

var pillar1_up = STRUCT([pillar1_up_2, traslate([1],[dist_pillar1_small],square_pillar_model_small)]);

pillar1_up = traslate([2],[dist_pillar0_y],pillar1_up);


var pillars1 = traslate([3],[z_pillar0+first_floor_z],STRUCT([pillar1_below, pillar1_up]));


//Draw pillar2
var pillar2_up = traslate([2],[dist_pillar0_y],STRUCT([square_pillar_model, STRUCT(REPLICA(4)([traslateVector([1],[dist_pillar0_x]),square_pillar_model])) ]));

var pillar2_below = STRUCT([square_pillar_model, traslate([1],[dist_pillar0_x],square_pillar_model), traslate([1],[dist_pillar0_x*4],square_pillar_model) ]);

var pillars2_with_hole = traslate([3],[2*(z_pillar0+first_floor_z)],STRUCT([pillar2_up,pillar2_below]));

var pillars12_delta_model = CUBOID([l_pillar0,l_pillar0,first_floor_z]);

var pillars12_delta_below = traslate([3],[2*z_pillar0 + first_floor_z],STRUCT([pillars12_delta_model, traslateVector([1],[dist_pillar0_x]), pillars12_delta_model]));

var pillars12_delta_up = traslate([2],[dist_pillar0_y], pillars12_delta_below);

var pillars2 = STRUCT([pillars2_with_hole,pillars12_delta_below,pillars12_delta_up]);


//Draw pillar3
var pillars3_small = traslate([2],[dist_pillar0_y+(l_pillar0-l_pillar1_small)/2],STRUCT([square_pillar_model_small, traslate([1],[dist_pillar0_x+(l_pillar0-l_pillar1_small)/2],square_pillar_model_small)]));

var pillars3_big_part = traslate([1,2],[2*dist_pillar0_x,dist_pillar0_y],STRUCT([square_pillar_model, traslateVector([1],[dist_pillar0_x]),square_pillar_model,traslateVector([1],[dist_pillar0_x]),square_pillar_model]));

var pillars3_big_below = traslate([1], [2*dist_pillar0_x], STRUCT([square_pillar_model, traslate([1],[2*dist_pillar0_x],square_pillar_model)]));

var pillars3_big_up = traslate([1,2],[4*dist_pillar0_x,dist_pillar0_y+l_pillar0+1.18575],square_pillar_model);



var pillars3 = traslate([3],[3*z_pillar0 + 3*first_floor_z],STRUCT([pillars3_big_part,pillars3_small,pillars3_big_below,pillars3_big_up]));




var building = STRUCT([pillars0, pillars1, pillars2, pillars3]);

draw(building)