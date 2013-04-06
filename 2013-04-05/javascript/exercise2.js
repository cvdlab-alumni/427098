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

var dist_pillar1_x = 0.73;

var first_floor_z = 0.3905;
var dist_pillar1_up_circle = 8.25;
var dist_pillar1_up_square = 11;
var l_pillar1_small = 0.2;
var dist_pillar1_small = 0.73;


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
var pillar1_up_2 = STRUCT( [pillar1_up_1, traslate([1], [dist_pillar1_up_circle], pillar_circle_model),traslate([1], [dist_pillar1_up_square], square_pillar_model)] );

var square_pillar_model_small = CUBOID([l_pillar1_small,l_pillar1_small,z_pillar0]);

var pillar1_up1 = STRUCT([pillar1_up_2, traslate([1],[dist_pillar1_small],square_pillar_model_small)]);

pillar1_up = traslate([2],[dist_pillar0_y],pillar1_up1);


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


//Start exercise 2

function semicircle(r){
	var domain = DOMAIN([0,PI])([36]);

	var circ = function (r) {
 		return function (v) {
  			return [r*COS(v[0]), r*SIN(v[0])];
  		};
	};

	var mapping = circ(r);

	return (MAP(mapping)(domain));
}

function rotate(coord,values,obj){
	var new_coord = coord.map(function(item){
		return item-1;	
	}); 
	return R(new_coord)(values)(obj);
}


var base_x = 11.25;
var base_y = 6.7557;
var base_z = 0.5;

var floor_z = 0.39;

var floor0_r1_x = 1.457;
var floor0_r1_y = 1.46;

var floor0_r2_x = 6.74;
var floor0_r2_y = 4.42;
var floor0_r2_trasl_x = floor0_r1_x;
var floor0_r2_trasl_y = 2.328;

var floor0_r3_x = 1.134;
var floor0_r3_y = 2.67;
var floor0_r3_trasl_x = floor0_r1_x+floor0_r2_x;
var floor0_r3_trasl_y = 4.1;

var r_floor0_semcirc_1 = 1.35;
var r_floor0_semcirc_1_trasl_x = floor0_r1_x+floor0_r2_x+floor0_r3_x;
var r_floor0_semcirc_1_trasl_y = floor0_r3_trasl_y;

var r_floor0_semcirc_2 = 0.54;
var r_floor0_semcirc_2_trasl_x = floor0_r2_trasl_x;
var r_floor0_semcirc_2_trasl_y = 1.2;

var floor0_r4_x = 2*r_floor0_semcirc_2;
var floor0_r4_y = floor0_r2_trasl_x - r_floor0_semcirc_2_trasl_x + r_floor0_semcirc_2 + 0.5;
var floor0_r4_trasl_x = r_floor0_semcirc_2_trasl_x;
var floor0_r4_trasl_y = r_floor0_semcirc_2_trasl_y + r_floor0_semcirc_2;

//Draw floor0
var model_base = CUBOID([base_x,base_y,base_z]);

var floor0_r1 = traslate([2],[dist_pillar0_y],CUBOID([floor0_r1_x,floor0_r1_y,floor_z]));
var floor0_r2 = traslate([1,2],[floor0_r2_trasl_x,floor0_r2_trasl_y],CUBOID([floor0_r2_x,floor0_r2_y,floor_z]));
var floor0_r3 = traslate([1,2],[floor0_r3_trasl_x,floor0_r3_trasl_y],CUBOID([floor0_r3_x,floor0_r3_y,floor_z]));
var semcirc_1_2D = semicircle(r_floor0_semcirc_1);
var semcirc_1 = traslate([2],[r_floor0_semcirc_1],rotate([1,2],-PI/2,extrude(semcirc_1_2D,floor_z)));
var floor0_semicirc1 = traslate([1,2],[r_floor0_semcirc_1_trasl_x,r_floor0_semcirc_1_trasl_y],semcirc_1);
var floor0_r4 = traslate([1,2],[floor0_r4_trasl_x,floor0_r4_trasl_y],CUBOID([floor0_r4_x,floor0_r4_y,floor_z]));

var semcirc_2_2D = semicircle(r_floor0_semcirc_2);
var semcirc_2_centered = rotate([1,2],PI,extrude(semcirc_2_2D,floor_z));
var semcirc_2 = traslate([1,2],[r_floor0_semcirc_2,r_floor0_semcirc_2],semcirc_2_centered);
var floor0_semicirc2 = traslate([1,2],[r_floor0_semcirc_2_trasl_x,r_floor0_semcirc_2_trasl_y],semcirc_2);

var floor0 = STRUCT([floor0_r1,floor0_r2,floor0_r3,floor0_semicirc1,floor0_semicirc2,floor0_r4]);


//Draw floor1

var floor1_z = z_pillar0;

var floor1_r1_x = 1.2;
var floor1_r1_y = 1.3;
var floor1_r1_trasl_y = 5.32 ;

var floor1_r2_x = 11.16;
var floor1_r2_y = floor1_r1_trasl_y+l_pillar0;

var floor1_r3_x = 5.16;
var floor1_r3_y = 1.27;
var floor1_r3_trasl_x = 5.99;
var floor1_r3_trasl_y = floor1_r1_trasl_y;

var floor1_balcony_x = 1.135;
var floor1_balcony_y = 1.067;
var floor1_balcony_trasl_y = floor1_r1_trasl_y;

var floor1_r1 = traslate([2],[floor1_r1_trasl_y], CUBOID([floor1_r1_x,floor1_r1_y,floor_z]));
var floor1_r2 = CUBOID([floor1_r2_x,floor1_r2_y,floor_z]);
var floor1_r3 = traslate([1,2],[floor1_r3_trasl_x,floor1_r3_trasl_y], CUBOID([floor1_r3_x,floor1_r3_y,floor_z]));
var floor1_balcony = traslate([1,2],[-floor1_balcony_x,floor1_balcony_trasl_y], CUBOID([floor1_balcony_x,floor1_balcony_y,floor_z]));


var floor1 = traslate([3],[floor1_z],STRUCT([floor1_r1,floor1_r2,floor1_r3, floor1_balcony]));


//Draw floor2

var floor2_z = 2*z_pillar0 + floor_z;


var trapezium = extrude(SIMPLICIAL_COMPLEX([[5.47,0],[11.25,0],[11.25,6.75],[4.51,6.75],[4.51,5.32]])([[0,2,4],[3,4,1],[3,2,4],[0,1,2]]),floor_z);

var floor2_r_x = 0.816901408;
var floor2_r_y = 6.687;

var floor2_r = CUBOID([floor2_r_x,floor2_r_y,floor_z]);



var floor2 = traslate([3],[floor2_z],STRUCT([trapezium,floor2_r]));

//Draw floor3

var floor3_z = 3*z_pillar0 + 2*floor_z;

var floor3_r1_x = 11.16;
var floor3_r1_y = 0.152;
var floor3_r1_trasl_y = 6.52;

var floor3_r2_y = 0.25;
var floor3_r2_trasl_x = 5.456;
var floor3_r2_x = floor3_r1_x - floor3_r2_trasl_x;
var floor3_r2_trasl_y = 6.39;

var floor3_r3_x = 0.244;
var floor3_r3_y = 6.412;
var floor3_r3_trasl_x =  floor3_r2_trasl_x;

var floor3_r4_x = 5.47;
var floor3_r4_y = 5.46;
var floor3_r4_trasl_x = floor3_r3_trasl_x + floor3_r3_x;

var floor3_r5_x = 2.418;
var floor3_r5_y = 0.934;
var floor3_r5_trasl_x = floor3_r3_trasl_x + 3.29;
var floor3_r5_trasl_y = floor3_r4_y;

var floor3_r6_x = floor3_r3_trasl_x;
var floor3_r6_y = floor3_r3_y+0.2;

var floor3_r1 = traslate([2],[floor3_r1_trasl_y], CUBOID([floor3_r1_x,floor3_r1_y,floor_z]));
var floor3_r2 = traslate([1,2],[floor3_r2_trasl_x,floor3_r2_trasl_y], CUBOID([floor3_r2_x,floor3_r2_y,floor_z]));
var floor3_r3 = traslate([1],[floor3_r3_trasl_x], CUBOID([floor3_r3_x,floor3_r3_y,floor_z]));
var floor3_r4 = traslate([1],[floor3_r4_trasl_x], CUBOID([floor3_r4_x,floor3_r4_y,floor_z]));
var floor3_r5 = traslate([1,2],[floor3_r5_trasl_x,floor3_r5_trasl_y], CUBOID([floor3_r5_x,floor3_r5_y,floor_z]));
var floor3_r6 = CUBOID([floor3_r6_x,floor3_r6_y,floor_z])

var floor3 = traslate([3],[floor3_z],STRUCT([floor3_r1,floor3_r2,floor3_r3,floor3_r4,floor3_r5, floor3_r6]));

//Draw floor4

var floor4_trasl_z = 4*z_pillar0 + 3*first_floor_z;

var floor4_r1_x = 5.44;
var floor4_r1_y = 1.32;
var floor4_r1_trasl_y = 5.31;

var floor4_r2_x = 5.8;
var floor4_r2_y = 6.657;
var floor4_r2_trasl_x = floor4_r1_x;

var floor4_r1 = traslate([2],[floor4_r1_trasl_y],CUBOID([floor4_r1_x,floor4_r1_y,floor_z]));

var floor4_r2 = traslate([1],[floor4_r2_trasl_x],CUBOID([floor4_r2_x,floor4_r2_y,floor_z]));

var floor4 = STRUCT([floor4_r1, floor4_r2]);









var building = STRUCT([model_base, traslateVector([3],[base_z]), floor0, pillars0, floor1, pillars1, floor2, pillars2, floor3, pillars3, traslate([3],[floor4_trasl_z],floor4)]);

draw(building)