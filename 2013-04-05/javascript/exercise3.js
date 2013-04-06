//Andrea Iuliano
/** Setup **/


/* Creo funzionalità per implementare hideAll */
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

/* Fine funzionalità hideAll */

//Funzione che mi permette di inserire i colori in rgb con range [0,255]
function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

//Funzione che mi permette di inserire i colori in rgba con range [0,255]
function rgba(color){
	return [color[0]/255, color[1]/255, color[2]/255, color[3]/100];
}


/* Figure pronte (parametriche) */
function arc_1D(alpha,r){
	var domain = function(alfa,fragments){
	   return DOMAIN([[0,alfa*PI]])([fragments]);
	}

	var circle = function (r) {
	  return function (v) {
	    return [r*COS(v[0]), r*SIN(v[0])];
	  };
	};

	var mapping = circle(r);
	var dom = domain(alpha,36);

	return model = MAP(mapping)(dom);
}

function arc_2D(alpha,r,R){
	var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);

	var mapping = function(v){
		var a = v[0];
		var r = v[1];

		return [r*COS(a), r*SIN(a)];
	}

	var model = MAP(mapping)(domain);

	return model;

}

/* Fine figure parametriche */



/* Utility per convertire da pyplasm a plasm.js */
function TPY(dimens,values,object){
	new_dim = dimens.map(function(item){
		return item-1;	
	}); 
	return T(new_dim)(values)(object);
}

function RPY(dimens,values,object){
	new_dim = dimens.map(function(item){
		return item-1;	
	}); 
	return R(new_dim)(values)(object);
}


function SPY(dimens,values,object){
	new_dim = dimens.map(function(item){
		return item-1;	
	}); 
	return S(new_dim)(values)(object);
}
/* Fine utility */



/** Fine setup */ 
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



function rotate(coord,values,obj){
	var new_coord = coord.map(function(item){
		return item-1;	
	}); 
	return R(new_coord)(values)(obj);
}

function scale(coord,values,obj){
	var new_coord = coord.map(function(item){
		return item-1;	
	}); 
	return S(new_coord)(values)(obj);
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
var semcirc_1_2D = circle(r_floor0_semcirc_1);
var semcirc_1 = traslate([2],[r_floor0_semcirc_1],rotate([1,2],-PI/2,extrude(semcirc_1_2D,floor_z)));
var floor0_semicirc1 = traslate([1,2],[r_floor0_semcirc_1_trasl_x,r_floor0_semcirc_1_trasl_y],semcirc_1);
var floor0_r4 = traslate([1,2],[floor0_r4_trasl_x,floor0_r4_trasl_y],CUBOID([floor0_r4_x,floor0_r4_y,floor_z]));

var semcirc_2_2D = circle(r_floor0_semcirc_2);
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

//Start exercise 3
wall_depth = 0.25

east_face_z = z_pillar0
east_face_y = wall_depth

east_face_r1_x = 5.8
east_face_r1_z = 6.593

east_face_r2_x = 2.7
east_face_r2_z = 8.889
east_face_r2_traslate_x = east_face_r1_x + 2.7

east_face_r3_x = 2.7
east_face_r3_z = 1.48
east_face_r3_traslate_x = east_face_r1_x
east_face_r3_traslate_z = 1.05

east_face_r4_x = 6.12
east_face_r4_z = 1.044
east_face_r4_traslate_z = 7.84

east_face_r5_x = 1.12
east_face_r5_z = 1.266
east_face_r5_traslate_z = east_face_r1_z

east_face_r6_x = east_face_r1_x+east_face_r2_x+east_face_r3_x
east_face_r6_z = 1
east_face_r6_traslate_z = 8.86


east_face_r1 = CUBOID([east_face_r1_x,east_face_y,east_face_r1_z])
east_face_r2 = traslate([1],[east_face_r2_traslate_x],CUBOID([east_face_r2_x,east_face_y,east_face_r2_z]))
east_face_r3_part1 = traslate([1],[east_face_r3_traslate_x],CUBOID([east_face_r3_x,east_face_y,east_face_r3_z]))

east_face_r3_part2 = STRUCT(REPLICA(3)([east_face_r3_part1, traslateVector([3],[east_face_r3_z+east_face_r3_traslate_z]) ]))
east_face_r3 = STRUCT([east_face_r3_part1, traslateVector([3],[east_face_r3_z+east_face_r3_traslate_z]), east_face_r3_part2])

east_face_r4 = traslate([3],[east_face_r4_traslate_z],CUBOID([east_face_r4_x,east_face_y,east_face_r4_z]))

east_face_r5 = traslate([3],[east_face_r5_traslate_z],CUBOID([east_face_r5_x,east_face_y,east_face_r5_z]))

east_face_r6 = traslate([3],[east_face_r6_traslate_z],CUBOID([east_face_r6_x,east_face_y,east_face_r6_z]))


east = traslate([3],[east_face_z],STRUCT([east_face_r1,east_face_r2,east_face_r3,east_face_r4,east_face_r5,east_face_r6 ]))


depth_walls = 0.25
h_windows_n = 0.9564
w_windows_n_part = 1.26
w_windows_n = w_windows_n_part*4

h_total_north_face = 8.06

h_little_windows_n_part = 1.055
h_little_windows_n = 2*h_little_windows_n_part
w_little_windows_n = 0.3

dist_btw_lwins = 0.3
dist_btw_lwin_top_boarder = 0.83
dist_btw_lboarder_win = 0.25
dist_btw_top_boarder_top_win = 1.0798
dist_btw_fst_snd_windows = 1.411
dist_btw_snd_trd_windows = 1.35
dist_btw_win_lwin = 0.9
dist_btw_lwin_lboarder = 0.25
n_1_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])

n_2_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_top_boarder_top_win])
n_3_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_fst_snd_windows])
n_4_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_snd_trd_windows])
n_5_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_snd_trd_windows])

n_6_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])

n_7_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_8_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_9_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_10_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])

n_11_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])

//Traslation of fragments#
n_2_fragment = traslate([1,3],[dist_btw_lboarder_win,2*dist_btw_snd_trd_windows+3*h_windows_n+dist_btw_fst_snd_windows],n_2_fragment)
n_3_fragment = traslate([1,3],[dist_btw_lboarder_win,2*dist_btw_snd_trd_windows+2*h_windows_n],n_3_fragment)
n_4_fragment = traslate([1,3],[dist_btw_lboarder_win,dist_btw_snd_trd_windows+h_windows_n],n_4_fragment)
n_5_fragment = traslate([1],[dist_btw_lboarder_win],n_5_fragment)
n_6_fragment = traslate([1],[dist_btw_lboarder_win+w_windows_n],n_6_fragment)
n_7_fragment = traslate([1,3],[dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,3*h_little_windows_n+3*dist_btw_lwins],n_7_fragment)
n_8_fragment = traslate([1,3],[dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,2*h_little_windows_n+2*dist_btw_lwins],n_8_fragment)
n_9_fragment = traslate([1,3],[dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,h_little_windows_n+dist_btw_lwins],n_9_fragment)
n_10_fragment = traslate([1],[dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin],n_10_fragment)
n_11_fragment = traslate([1],[dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin+w_little_windows_n],n_11_fragment)

north_face = STRUCT([n_1_fragment,n_2_fragment,n_3_fragment,n_4_fragment,n_5_fragment,n_6_fragment,n_7_fragment,n_8_fragment,n_9_fragment,n_10_fragment,n_11_fragment])

north = traslate([3],[z_pillar0- floor_z ],north_face)
north = scale([3],[1.2],north)
north = scale([1],[0.91],north)
north = rotate([1,2],PI/2,north)
north = traslate([1],[11.25],north)

//sud
wall_depth = 0.25

south_face_z = z_pillar0+floor_z
south_face_x = wall_depth

south_face_r1_y=0.3
south_face_r1_z=8.4
south_face_r1_transl_y=6.384

south_face_r2_y=6.604
south_face_r2_z= 2.5
south_face_r2_transl_z= 7

south_face_r3_y=0.237
south_face_r3_z= 5.9

south_face_r4_y= 6.648
south_face_r4_z= 0.307

south_face_r5_y= 1.25
south_face_r5_z= 3.58
south_face_r5_transl_y= 5.445
south_face_r5_transl_z= 2.32

south_face_r6_y= 4.944
south_face_r6_z= 1.124
south_face_r6_transl_y= 0.245
south_face_r6_transl_z= 4.76


south_face_r1 = traslate([2],[south_face_r1_transl_y] ,CUBOID([south_face_x,south_face_r1_y,south_face_r1_z]))
south_face_r2 = traslate([3],[south_face_r2_transl_z] ,CUBOID([south_face_x,south_face_r2_y,south_face_r2_z]))
south_face_r3 = CUBOID([south_face_x,south_face_r3_y,south_face_r3_z])
south_face_r4 = CUBOID([south_face_x,south_face_r4_y,south_face_r4_z])
south_face_r5 = traslate([2,3],[south_face_r5_transl_y,south_face_r5_transl_z] ,CUBOID([south_face_x,south_face_r5_y,south_face_r5_z]))
south_face_r6 = traslate([2,3],[south_face_r6_transl_y,south_face_r6_transl_z] ,CUBOID([south_face_x,south_face_r6_y,south_face_r6_z]))




south = traslate([3],[south_face_z],STRUCT([south_face_r1,south_face_r2,south_face_r3,south_face_r4,south_face_r5,south_face_r6]))


muro_princ = CUBOID([7.16,0.25,2.5])
muro_princ_trasl = traslate([2],[6.50],muro_princ)

muro_basso_finestra = CUBOID([0.84,0.25,1.66])
mbf_trasl = traslate([1,2],[7.16,6.50],muro_basso_finestra)

muro_lato_fin = CUBOID([0.5,0.25,2.5])
mlf_trasl = traslate([1,2],[8,6.50],muro_lato_fin)


muro_des = CUBOID([5.12,0.25,2.5])
muro_des_trasl= traslate([2,3],[6.50,2.5+0.39],muro_des)

muro_s_fin = CUBOID([1.23*2,0.25,1.27])
msf_trasl = traslate([1,2,3],[5.12,6.50,2.5+0.39],muro_s_fin)

muro_sin = CUBOID([3.67,0.25,2.5])
ms_trasl = traslate([1,2,3],[7.58,6.50,2.5+0.39],muro_sin)

muro_des_2 = CUBOID([8.91,0.25,2.5])
md2_trasl = traslate([2,3],[6.50,(2.5+0.39)*2],muro_des_2)

muro_t = CUBOID([11.25,0.25,2.5])
mt_trasl = traslate([2,3],[6.50,(2.5+0.39)*3],muro_t)

muro_basso_fin2 = CUBOID([0.26,0.25,1.26])
mbf2_trasl = traslate([1,2,3],[8.91,6.50,(2.5+0.39)*2],muro_basso_fin2)

muro_tra_fin = CUBOID([0.25,0.25,2.5])
mtf_trasl = traslate([1,2,3],[9.17,6.50,(2.5+0.39)*2],muro_tra_fin)

mssf_trasl = traslate([1,2,3],[9.42,6.50,(2.5+0.39)*2],muro_basso_fin2)

muro_sin_fin = CUBOID([1.57,0.25,2.5])
msin_fin_trasl = traslate([1,2,3],[9.67,6.50,(2.5+0.39)*2],muro_sin_fin)

west = STRUCT([muro_princ_trasl,mbf_trasl, mlf_trasl, muro_des_trasl,msf_trasl,ms_trasl,md2_trasl,mbf2_trasl,mtf_trasl,mssf_trasl,msin_fin_trasl,mt_trasl])

west = traslate([2,3],[-0.08, 0.5],west)


//floor0 wall

floor_z = 0.39

floor0_r1_x = 1.457
floor0_r1_y = 1.46

floor0_r2_x = 6.74
floor0_r2_y = 4.42
floor0_r2_trasl_x = floor0_r1_x
floor0_r2_trasl_y = 2.328

floor0_r3_x = 1.134
floor0_r3_y = 2.67
floor0_r3_trasl_x = floor0_r1_x+floor0_r2_x
floor0_r3_trasl_y = 4.1

r_floor0_semcirc_1 = 1.35
r_floor0_semcirc_1_trasl_x = floor0_r1_x+floor0_r2_x+floor0_r3_x
r_floor0_semcirc_1_trasl_y = floor0_r3_trasl_y

r_floor0_semcirc_2 = 0.54
r_floor0_semcirc_2_trasl_x = floor0_r2_trasl_x
r_floor0_semcirc_2_trasl_y = 1.2

floor0_r4_x = 2*r_floor0_semcirc_2
floor0_r4_y = floor0_r2_trasl_x - r_floor0_semcirc_2_trasl_x + r_floor0_semcirc_2 + 0.5
floor0_r4_trasl_x = r_floor0_semcirc_2_trasl_x
floor0_r4_trasl_y = r_floor0_semcirc_2_trasl_y + r_floor0_semcirc_2

//Draw floor0
model_base = CUBOID([base_x,base_y,base_z])

floor0_r1 = traslate([2],[dist_pillar0_y],CUBOID([floor0_r1_x,floor0_r1_y,z_pillar0]))
floor0_r2 = traslate([1,2],[floor0_r2_trasl_x,floor0_r2_trasl_y],CUBOID([floor0_r2_x,floor0_r2_y,z_pillar0]))
floor0_r3 = traslate([1,2],[floor0_r3_trasl_x,floor0_r3_trasl_y],CUBOID([floor0_r3_x,floor0_r3_y,z_pillar0]))
semcirc_1_2D = circle(r_floor0_semcirc_1)
semcirc_1 = traslate([2],[r_floor0_semcirc_1],rotate([1,2],-PI/2,extrude(semcirc_1_2D,z_pillar0)))
floor0_semicirc1 = traslate([1,2],[r_floor0_semcirc_1_trasl_x,r_floor0_semcirc_1_trasl_y],semcirc_1)
floor0_r4 = traslate([1,2],[floor0_r4_trasl_x,floor0_r4_trasl_y],CUBOID([floor0_r4_x,floor0_r4_y,z_pillar0]))

semcirc_2_2D = circle(r_floor0_semcirc_2)
semcirc_2_centered = rotate([1,2],PI,extrude(semcirc_2_2D,z_pillar0))
semcirc_2 = traslate([1,2],[r_floor0_semcirc_2,r_floor0_semcirc_2],semcirc_2_centered)
floor0_semicirc2 = traslate([1,2],[r_floor0_semcirc_2_trasl_x,r_floor0_semcirc_2_trasl_y],semcirc_2)

wall_floor0 = STRUCT([floor0_r1,floor0_r2,floor0_r3,floor0_semicirc1,floor0_semicirc2,floor0_r4]) 












building = STRUCT([model_base, traslateVector([3],[base_z]), wall_floor0,floor0, pillars0, floor1, pillars1, floor2, pillars2, floor3, pillars3, traslate([3],[floor4_trasl_z],floor4), east, north,south, west])

draw(building)
