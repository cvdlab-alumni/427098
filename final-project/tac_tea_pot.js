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

var beak_increase = 1.3;
var beak_profile_external = scalePointsX(scalePointsY(beak_profile,beak_increase), beak_increase)
var beak_profile2_external = scalePointsX(scalePointsY(beak_profile2,beak_increase), beak_increase)
var beak_profile3_external = scalePointsX(scalePointsY(beak_profile3,beak_increase), beak_increase)

beak_profile_external = traslaPointsY(traslaPointsX(beak_profile_external,0.46),-0.01);
beak_profile2_external = traslaPointsY(traslaPointsX(beak_profile2_external,0.46),-0.01);
beak_profile3_external = traslaPointsY(traslaPointsX(beak_profile3_external,0.46),-0.01);

drawBezier(beak_profile)
drawBezier(beak_profile2)
drawBezier(beak_profile3)
drawBezier(beak_profile_external)
drawBezier(beak_profile2_external)
drawBezier(beak_profile3_external)





var pot = STRUCT([ pot_central,base,top_obj ]);							

var pot = STRUCT([ COLOR(pot_color)(pot),
					COLOR(rgb([30,30,30]))(bezier_full_circle_not_centered(1.1*pot_r1,0,0,0.97*pot_central_profile[pot_central_profile.length-1][2])) 
					]);


draw(pot)

