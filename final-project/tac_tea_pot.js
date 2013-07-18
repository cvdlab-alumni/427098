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