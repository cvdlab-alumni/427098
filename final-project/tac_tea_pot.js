var line_domain = INTERVALS(1)(32)
var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)])

var pot_color = rgb([300,300,300]);

var pot_central_profile = addYValue([[3.75, 1.68], [3.51, 2.47], [3.19, 2.55], [2.99, 2.62]],0);
var pot_bottom_profile = addYValue([[3.75, 1.68], [3.76, 1.61], [3.78, 1.49], [3, 1.41]],0);

var pot_r1 = 0.5;
var traslate_x = -(pot_central_profile[pot_central_profile.length-1][0]-pot_r1-0.01);
var traslate_z = -pot_bottom_profile[pot_bottom_profile.length-1][2];

pot_central_profile = traslaPointsX(pot_central_profile, traslate_x);
pot_bottom_profile = traslaPointsX(pot_bottom_profile, traslate_x);
pot_central_profile = traslaPointsZ(pot_central_profile, traslate_z);
pot_bottom_profile = traslaPointsZ(pot_bottom_profile, traslate_z);

var pot_r2 = 0.9;
var pot_central = STRUCT([ rotateProfileNoTraslate(pot_central_profile),
							rotateProfileNoTraslate(pot_bottom_profile),
							bezier_full_circle_not_centered(pot_r1,0,0,pot_central_profile[pot_central_profile.length-1][2]),
							bezier_full_circle(pot_r2)
						  ]);


var base_h = 0.05;
var base_incomplete = MAP(BEZIER(S1)([ bezier_circle_not_centered_map(pot_r2,0,0,base_h),
							bezier_circle_not_centered_map(1.05*pot_r2,0,0,base_h/2),
							bezier_circle_map(pot_r2)	]))(PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]));
var base = STRUCT([base_incomplete,bezier_full_circle(pot_r2)])


//Top part
var top_points = addYValue([[2.98, 3.02], [3.03, 2.98], [2.97, 2.75], [2.95, 2.6]],0);
var top_points_central = addYValue([[2.98, 3.05], [3.03, 2.98], [2.97, 2.75], [2.95, 2.6]],0.02);
top_points = traslaPointsX(top_points, traslate_x);
top_points = traslaPointsZ(top_points, traslate_z);
top_points_central = traslaPointsX(top_points_central, traslate_x);
top_points_central = traslaPointsZ(top_points_central, traslate_z);
var top_points_t = traslaPointsY(top_points,0.1);
var top_points_central_t = traslaPointsY(top_points_central,0.06);
var top_points_x = traslaPointsX(top_points,-0.02)
var top_points_t_x = traslaPointsX(top_points_t,-0.02)

var top_curve = BEZIER(S0)(top_points)
var top_curve_central = BEZIER(S0)(top_points_central)
var top_curve_t = BEZIER(S0)(top_points_t)
var top_curve_central_t = BEZIER(S0)(top_points_central_t)
var top_curve_x = BEZIER(S0)(top_points_x)
var top_curve_t_x = BEZIER(S0)(top_points_t_x)

var top_part1_back = MAP(BEZIER(S1)([ top_curve,top_curve_central,top_curve_central_t,top_curve_t ]))(area_domain);
var top_part1_front = MAP(BEZIER(S1)([ top_curve_x,top_curve_central,top_curve_central_t,top_curve_t_x ]))(area_domain);
var top_part1_conjuction1 = unifyBezierCurves(top_curve, top_curve_x);
var top_part1_conjuction2 = unifyBezierCurves(top_curve_t, top_curve_t_x);

// [[0.2,0,1.62]]
var top_part2_points1 = [[2.98,0,3.02],[2.98,0.02,3.05],[2.98,0.08,3.05],[2.98,0.1,3.02]];
var top_part2_points2 = [[2.995,0,2.98],[2.995,0.1,2.98]];
top_part2_points1 = traslaPointsX(top_part2_points1, traslate_x);
top_part2_points1 = traslaPointsZ(top_part2_points1, traslate_z);
top_part2_points2 = traslaPointsX(top_part2_points2, traslate_x);
top_part2_points2 = traslaPointsZ(top_part2_points2, traslate_z);
var top_part2_points3 = [[2.98,0,3.02],[2.995,0,2.98]];
var top_part2_points4 = [[2.98,0.1,3.02],[2.995,0.1,2.98]];
// var top_part2_points3 = [[2.98,0,3.02],[2.995,0,2.98]];
// var top_part2_points4 = [[2.98,0.1,3.02],[2.995,0.1,2.98]];
top_part2_points3 = traslaPointsX(top_part2_points3, traslate_x);
top_part2_points3 = traslaPointsZ(top_part2_points3, traslate_z);
top_part2_points4 = traslaPointsX(top_part2_points4, traslate_x);
top_part2_points4 = traslaPointsZ(top_part2_points4, traslate_z);

var top_part2_curve1 = BEZIER(S0)(top_part2_points1)
var top_part2_curve2 = BEZIER(S0)(top_part2_points2)
var top_part2_curve3 = BEZIER(S0)(top_part2_points3)
var top_part2_curve4 = BEZIER(S0)(top_part2_points4)

var top_part2_1 = MAP(BEZIER(S1)([ top_part2_curve1,[0.2,0.05,1.62],top_part2_curve2 ]))(area_domain);
var top_part2_2 = MAP(BEZIER(S1)([ top_part2_curve3,[0.37,0.025,1.61] ]))(area_domain); //**************************** Da sistemare
var top_part2_3 = MAP(BEZIER(S1)([ top_part2_curve4,[0.37,0.08,1.61] ]))(area_domain); //**************************** Da sistemare

var top_obj = STRUCT([ top_part1_back,top_part1_front,top_part1_conjuction1,top_part1_conjuction2,top_part2_1,top_part2_2,top_part2_3 ])

// Beak

var beak_profile = [[0.84,0.03 ,2.77], [0.89, 0.00,2.74], [0.94, -0.01,2.79], [1, 0,2.81]]
var beak_profile2 = [[0.84,0.03 ,2.77], [0.89, 0.05,2.74], [0.94, 0.07,2.79], [1, 0.06,2.81]]
var beak_profile3 = [[1, 0,2.81], [1.02,0.03,2.81],[1, 0.06,2.81]]
beak_profile = traslaPointsX(beak_profile, traslate_x);
beak_profile = traslaPointsZ(beak_profile, traslate_z);
beak_profile2 = traslaPointsX(beak_profile2, traslate_x);
beak_profile2 = traslaPointsZ(beak_profile2, traslate_z);
beak_profile3 = traslaPointsX(beak_profile3, traslate_x);
beak_profile3 = traslaPointsZ(beak_profile3, traslate_z);

var beak_increase1 = 1.3;
var beak_profile_external = scalePointsX(scalePointsY(beak_profile,beak_increase1), beak_increase1)
var beak_profile2_external = scalePointsX(scalePointsY(beak_profile2,beak_increase1), beak_increase1)
var beak_profile3_external = scalePointsX(scalePointsY(beak_profile3,beak_increase1), beak_increase1)

beak_profile_external = traslaPointsY(traslaPointsX(beak_profile_external,0.46),-0.01);
beak_profile2_external = traslaPointsY(traslaPointsX(beak_profile2_external,0.46),-0.01);
beak_profile3_external = traslaPointsY(traslaPointsX(beak_profile3_external,0.46),-0.01);

var beak_increase2 = 0.6;
var beak_centered = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered2 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered3 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile_external,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered2_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2_external,beak_increase2), -0.47), -0.02), 0.2);
var beak_centered3_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3_external,beak_increase2), -0.47), -0.02), 0.2);


// var beak_increase2 = 5;
// var beak_end = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
// var beak_end2 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
// var beak_end3 = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
// var beak_end_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
// var beak_end2_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile2_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);
// var beak_end3_external = traslaPointsZ(traslaPointsY(traslaPointsX(scalePoints(beak_profile3_external,beak_increase2), 0.8*9), -0.02*9), -0.7*9);

var beak_end = [[1.21, -0.05,1.42], [1.4, -0.15,1.9], [1.64, -0.2,2.14], [2.28, -0.3,2.43]];
var beak_end2 = [[1.21, 0.05,1.42], [1.4, 0.15,1.9], [1.64, 0.2,2.14], [2.28, 0.3,2.43]];
var beak_end3 = [[2.28, -0.3,2.43], [2.18,-0.1,2.43],[2.18,0.1,2.43],[2.28, 0.3,2.43]];
beak_end = traslaPointsX(beak_end, traslate_x+0.1);
beak_end = traslaPointsZ(beak_end, traslate_z+0.15);
beak_end2 = traslaPointsX(beak_end2, traslate_x+0.1);
beak_end2 = traslaPointsZ(beak_end2, traslate_z+0.15);
beak_end3 = traslaPointsX(beak_end3, traslate_x+0.1);
beak_end3 = traslaPointsZ(beak_end3, traslate_z+0.15);


var beak_curve = BEZIER(S0)(beak_profile);
var beak_curve2 = BEZIER(S0)(beak_profile2);
var beak_curve3 = BEZIER(S0)(beak_profile3);
var beak_curve_external = BEZIER(S0)(beak_profile_external);
var beak_curve2_external = BEZIER(S0)(beak_profile2_external);
var beak_curve3_external = BEZIER(S0)(beak_profile3_external);
var beak_centered_curve = BEZIER(S0)(beak_centered);
var beak_centered2_curve = BEZIER(S0)(beak_centered2);
var beak_centered3_curve = BEZIER(S0)(beak_centered3);
var beak_centered_curve_external = BEZIER(S0)(beak_centered_external);
var beak_centered2_curve_external = BEZIER(S0)(beak_centered2_external);
var beak_centered3_curve_external = BEZIER(S0)(beak_centered3_external);
var beak_end_curve = BEZIER(S0)(beak_end);
var beak_end2_curve = BEZIER(S0)(beak_end2);
var beak_end3_curve = BEZIER(S0)(beak_end3);
// var beak_end_curve_external = BEZIER(S0)(beak_end_external);
// var beak_end2_curve_external = BEZIER(S0)(beak_end2_external);
// var beak_end3_curve_external = BEZIER(S0)(beak_end3_external);

var beak = STRUCT([ MAP(BEZIER(S1)([ beak_curve, beak_curve_external]))(area_domain),
					MAP(BEZIER(S1)([ beak_curve2, beak_curve2_external]))(area_domain),
					MAP(BEZIER(S1)([ beak_curve3, beak_curve3_external]))(area_domain),
					MAP(BEZIER(S1)([ beak_curve,beak_centered_curve,beak_end_curve ]))(area_domain),
					MAP(BEZIER(S1)([ beak_curve2,beak_centered2_curve,beak_end2_curve ]))(area_domain),
					MAP(BEZIER(S1)([ beak_curve3,beak_centered3_curve,beak_end3_curve ]))(area_domain),
					MAP(BEZIER(S1)([ beak_curve_external,beak_centered_curve_external,beak_end_curve ]))(area_domain),
					MAP(BEZIER(S1)([ beak_curve2_external,beak_centered2_curve_external,beak_end2_curve ]))(area_domain),
					MAP(BEZIER(S1)([ beak_curve3_external,beak_centered3_curve_external,beak_end3_curve ]))(area_domain)
					]);

// var beak = STRUCT([ MAP(BEZIER(S1)([ beak_curve, beak_curve_external]))(area_domain),
// 					MAP(BEZIER(S1)([ beak_curve2, beak_curve2_external]))(area_domain),
// 					MAP(BEZIER(S1)([ beak_curve3, beak_curve3_external]))(area_domain),
// 					MAP(BEZIER(S1)([ beak_curve,beak_centered_curve,beak_end_curve ]))(area_domain),
// 					MAP(BEZIER(S1)([ beak_curve2,beak_centered2_curve,beak_end2_curve ]))(area_domain),
// 					MAP(BEZIER(S1)([ beak_curve3,beak_centered3_curve,beak_end3_curve ]))(area_domain),
// 					MAP(BEZIER(S1)([ beak_curve_external,beak_centered_curve_external,beak_end_curve_external ]))(area_domain),
// 					MAP(BEZIER(S1)([ beak_curve2_external,beak_centered2_curve_external,beak_end2_curve_external ]))(area_domain),
// 					MAP(BEZIER(S1)([ beak_curve3_external,beak_centered3_curve_external,beak_end3_curve_external ]))(area_domain)
// 					]);

drawBezier(beak_profile)
drawBezier(beak_profile2)
drawBezier(beak_profile3)
drawBezier(beak_profile_external)
drawBezier(beak_profile2_external)
drawBezier(beak_profile3_external)
drawBezier(beak_centered)
drawBezier(beak_centered2)
drawBezier(beak_centered3)
drawBezier(beak_centered_external)
drawBezier(beak_centered2_external)
drawBezier(beak_centered3_external)
drawBezier(beak_end)
drawBezier(beak_end2)
drawBezier(beak_end3)
//drawBezier(beak_end_external)
//drawBezier(beak_end2_external)
//drawBezier(beak_end3_external)

//draw(beak)

// var beak_to_pot = [[1.14, 0.03, 1.52], [1.5, -0.01, 2.02], [1.54, -0.03, 2.03], [2.26, -0.05, 2.43]];
// var beak_to_pot2 = [[1.14, 0.03, 1.52], [1.5, 0.07, 2.02], [1.54, 0.09, 2.03], [2.26, 0.11, 2.43]];
// var beak_to_pot3 = [[2.26, -0.05, 2.43], [2.26,0.035,2.43], [2.26, 0.11, 2.43]];
// beak_to_pot = traslaPointsX(beak_to_pot, traslate_x+0.2);
// beak_to_pot = traslaPointsZ(beak_to_pot, traslate_z);
// beak_to_pot2 = traslaPointsX(beak_to_pot2, traslate_x+0.2);
// beak_to_pot2 = traslaPointsZ(beak_to_pot2, traslate_z);	
// beak_to_pot3 = traslaPointsX(beak_to_pot3, traslate_x+0.2);
// beak_to_pot3 = traslaPointsZ(beak_to_pot3, traslate_z);

// beak_curve = BEZIER(S0)(beak_profile)
// beak_curve2 = BEZIER(S0)(beak_profile2)
// beak_curve3 = BEZIER(S0)(beak_profile3)
// beak_curve_external = BEZIER(S0)(beak_profile_external)
// beak_curve2_external = BEZIER(S0)(beak_profile2_external)
// beak_curve3_external = BEZIER(S0)(beak_profile3_external)
// beak_to_pot_curve = BEZIER(S0)(beak_to_pot)
// beak_to_pot2_curve = BEZIER(S0)(beak_to_pot2)
// beak_to_pot3_curve = BEZIER(S0)(beak_to_pot3)


// var beak = STRUCT([ unifyBezierCurves(beak_curve,beak_curve_external),
// 					unifyBezierCurves(beak_curve2,beak_curve2_external),
// 					unifyBezierCurves(beak_curve3,beak_curve3_external),
// 					unifyBezierCurves(beak_curve,beak_to_pot_curve),
// 					unifyBezierCurves(beak_curve2,beak_to_pot2_curve),
// 					unifyBezierCurves(beak_curve3,beak_to_pot3_curve),
// 					unifyBezierCurves(beak_curve_external,beak_to_pot_curve),
// 					unifyBezierCurves(beak_curve2_external,beak_to_pot2_curve),
// 					unifyBezierCurves(beak_curve3_external,beak_to_pot3_curve) ]);


// Handle
var handle_points11 = addYValue([[3.73, 2.85], [3.01, 3.21], [3.09, 3.02], [3.02, 2.61]],0);
var handle_points12 = addYValue([[3.73, 2.85], [4.39, 2.55], [4.31, 2.32], [4.08, 2.08]],0);
var handle_points13 = addYValue([[3.66, 1.82], [3.84, 1.9], [3.94, 1.99], [4.08, 2.08]],0);

var handle_points21 = addYValue([[3.7, 2.77], [3.02, 3.09], [3.15, 2.84], [3.11, 2.56]],0);
var handle_points22 = addYValue([[3.7, 2.77], [4.24, 2.48], [4.21, 2.32], [3.96, 2.15]],0);
var handle_points23 = addYValue([[3.6, 1.97], [3.74, 2.01], [3.85, 2.08], [3.96, 2.15]],0);

handle_points11 = traslaPointsX(handle_points11, traslate_x);
handle_points11 = traslaPointsZ(handle_points11, traslate_z);
handle_points12 = traslaPointsX(handle_points12, traslate_x);
handle_points12 = traslaPointsZ(handle_points12, traslate_z);
handle_points13 = traslaPointsX(handle_points13, traslate_x);
handle_points13 = traslaPointsZ(handle_points13, traslate_z);
handle_points21 = traslaPointsX(handle_points21, traslate_x);
handle_points21 = traslaPointsZ(handle_points21, traslate_z);
handle_points22 = traslaPointsX(handle_points22, traslate_x);
handle_points22 = traslaPointsZ(handle_points22, traslate_z);
handle_points23 = traslaPointsX(handle_points23, traslate_x);
handle_points23 = traslaPointsZ(handle_points23, traslate_z);

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


draw(handle)


var pot = STRUCT([ pot_central,base,top_obj ]);							

var pot = STRUCT([ COLOR(pot_color)(pot),
					COLOR(rgb([30,30,30]))(bezier_full_circle_not_centered(1.1*pot_r1,0,0,0.97*pot_central_profile[pot_central_profile.length-1][2])) 
					]);


draw(pot)

