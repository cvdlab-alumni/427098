// var line_domain = INTERVALS(1)(32)
// var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])

// var pot_color = rgb([300,300,300]);

// var pot_center_ray = 1.3;
// var pot_center_profile = addYValue([[3.75, 1.68], [3.51, 2.47], [3.19, 2.55], [2.99, 2.62]],0);
// pot_center_profile = traslaPointsX(pot_center_profile, -(pot_center_profile[0][0]-pot_center_ray-0.01) )

// var pot_center = rotateProfileNoTraslate(pot_center_profile);

// var pot_up_circle = bezier_full_circle_not_centered(pot_center_ray,0,0,pot_center_profile[0][2])


// var pot_bottom_profile = addYValue([[3.75, 1.68], [3.76, 1.61], [3.78, 1.49], [3, 1.41]],0);
// pot_bottom_profile = traslaPointsX(pot_bottom_profile, -pot_bottom_profile[0][0]+pot_center_ray )

// var pot_bottom = rotateProfileNoTraslate(pot_bottom_profile);

// var pot_base_h = 0.08;
// var pot_base_r = 0.8;
// var pot_base = MAP(BEZIER(S1)([ bezier_circle_not_centered_map(pot_base_r,0,0,pot_base_h),
// 							bezier_circle_not_centered_map(1.05*pot_base_r,0,0,pot_base_h/2),
// 							bezier_circle_map(pot_base_r)	]))(PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]));
// pot_base = STRUCT([pot_base, circle(pot_base_r)]);

// pot_base = TNC([2])([1.41])(pot_base);

// var pot = STRUCT([pot_center,pot_bottom,pot_base]);

// pot = STRUCT([ COLOR(pot_color)(pot),
// 					COLOR(rgb([30,30,30]))(bezier_full_circle_not_centered(1.2*pot_center_ray,0,0,0.97*pot_center_profile[0][2])) ]);

// draw(pot)
// // draw(pot_center)
// draw(pot_bottom)
// draw(pot_base)



var line_domain = INTERVALS(1)(32)
var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])

var pot_color = rgb([300,300,300]);

var pot_central_profile = addYValue([[3.75, 1.68], [3.51, 2.47], [3.19, 2.55], [2.99, 2.62]],0);
var pot_bottom_profile = addYValue([[3.75, 1.68], [3.76, 1.61], [3.78, 1.49], [3, 1.41]],0);

var pot_r1 = 0.5;
var pot_traslate_x = -(pot_central_profile[pot_central_profile.length-1][0]-pot_r1-0.01);

pot_central_profile = traslaPointsX(pot_central_profile, pot_traslate_x);
pot_bottom_profile = traslaPointsX(pot_bottom_profile, pot_traslate_x);
pot_central_profile = traslaPointsZ(pot_central_profile, -pot_bottom_profile[pot_bottom_profile.length-1][2]);
pot_bottom_profile = traslaPointsZ(pot_bottom_profile, -pot_bottom_profile[pot_bottom_profile.length-1][2]);


var pot_r2 = 0.9;
var pot_central = STRUCT([ rotateProfileNoTraslate(pot_central_profile),
							rotateProfileNoTraslate(pot_bottom_profile),
							bezier_full_circle_not_centered(pot_r1,0,0,pot_central_profile[pot_central_profile.length-1][2]),
							bezier_full_circle(pot_r2)
						  ]);


var base_h = 0.05;
var base_incomplete = MAP(BEZIER(S1)([ bezier_circle_not_centered_map(pot_r2,0,0,base_h),
							bezier_circle_not_centered_map(1.05*pot_r2,0,0,base_h/2),
							bezier_circle_map(pot_r2)	]))(area_domain);
var base = STRUCT([base_incomplete,bezier_full_circle(pot_r2)])


var pot = STRUCT([ pot_central,base ]);							

var pot = STRUCT([ COLOR(pot_color)(pot),
					COLOR(rgb([30,30,30]))(bezier_full_circle_not_centered(1.1*pot_r1,0,0,0.97*pot_central_profile[pot_central_profile.length-1][2])) 
					]);
draw(pot)

// var line_domain = INTERVALS(1)(32)
// var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])

// var pot_color = rgb([300,300,300]);

// var pot_central_profile = addYValue([[3.03, 2.62], [3.73, 2.5], [4.45, 1.14], [2.85, 0.98]],0);

// var pot_r1 = 0.5;
// pot_central_profile = traslaPointsX(pot_central_profile, -(pot_central_profile[0][0]-pot_r1-0.01));
// pot_central_profile = traslaPointsZ(pot_central_profile, -pot_central_profile[3][2]);
// var pot_r2 = pot_central_profile[3][0]+0.001;

// var pot_central = STRUCT([ rotateProfileNoTraslate(pot_central_profile),
// 							bezier_full_circle_not_centered(pot_r1,0,0,pot_central_profile[0][2]),
// 							bezier_full_circle(pot_r2)
// 						  ]);
// var base_h = 0.05;
// var base_incomplete = MAP(BEZIER(S1)([ bezier_circle_not_centered_map(pot_r1,0,0,base_h),
// 							bezier_circle_not_centered_map(1.05*pot_r1,0,0,base_h/2),
// 							bezier_circle_map(pot_r1)	]))(area_domain);
// var base = STRUCT([base_incomplete,bezier_full_circle(pot_r1)])


// var pot = STRUCT([ pot_central,TNC([2])([-base_h])(base) ]);							

// var pot = STRUCT([ COLOR(pot_color)(pot),
// 					COLOR(rgb([30,30,30]))(bezier_full_circle_not_centered(1.2*pot_r1,0,0,0.97*pot_central_profile[0][2])) ]);
// draw(pot)