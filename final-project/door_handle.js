
var line_domain = INTERVALS(1)(32);
var area_domain = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]);

var depth = 0.5;

// Front background

var lock_left_profile1 = addYValue([[0.52, 1.26], [0.45, 1.33], [0.43, 1.46], [0.59, 1.49]],0);
var lock_left_profile2 = addYValue([[0.52, 1.26], [0.52, 1.12], [0.49, 1.02], [0.58, 1.03]],0);
var lock_right_profile1 = addYValue([[0.67, 1.27], [0.67, 1.12], [0.68, 1.01], [0.58, 1.03]],0);
var lock_right_profile2 = addYValue([[0.67, 1.27], [0.7, 1.29], [0.77, 1.46], [0.59, 1.49]],0);
var lock_up = addYValue([[0.69, 1.44], [0.64, 1.52], [0.54, 1.51], [0.5, 1.46]],0);
var lock_down = addYValue([[0.54, 1.04],[0.57, 1.01],[0.62, 1.01],[0.64, 1.04]],0);

var handle_left1 = [[0.27,0,1.26],[0.27,0,3.48]];
var handle_left2 = [[0.27,0,1.26],[0.27,0,0.35]];
var handle_right1 = [[0.91,0,1.26],[0.91,0,0.35]];
var handle_right2 = [[0.91,0,1.26],[0.91,0,3.48]];
var handle_up = [[0.91,0,3.48],[0.27,0,3.48]];
var handle_down = [[0.27,0,0.35],[0.91,0,0.35]];

var lock_left_profile1_curve = BEZIER(S0)(lock_left_profile1)
var lock_left_profile2_curve = BEZIER(S0)(lock_left_profile2)
var lock_right_profile1_curve = BEZIER(S0)(lock_right_profile1)
var lock_right_profile2_curve = BEZIER(S0)(lock_right_profile2)
var lock_down_curve = BEZIER(S0)(lock_down)
var lock_up_curve = BEZIER(S0)(lock_up)
var handle_left1_curve = BEZIER(S0)(handle_left1)
var handle_left2_curve = BEZIER(S0)(handle_left2)
var handle_right1_curve = BEZIER(S0)(handle_right1)
var handle_right2_curve = BEZIER(S0)(handle_right2)
var handle_up_curve = BEZIER(S0)(handle_up)
var handle_down_curve = BEZIER(S0)(handle_down)

var lock_left1 = MAP(BEZIER(S1)([ lock_left_profile1_curve, handle_left1_curve ]))(area_domain);
var lock_left2 = MAP(BEZIER(S1)([ lock_left_profile2_curve, handle_left2_curve ]))(area_domain);
var lock_right1 = MAP(BEZIER(S1)([ lock_right_profile1_curve, handle_right1_curve ]))(area_domain);
var lock_right2 = MAP(BEZIER(S1)([ lock_right_profile2_curve, handle_right2_curve ]))(area_domain);
var lock_up = MAP(BEZIER(S1)([ handle_up_curve, lock_up_curve ]))(area_domain);
var lock_down = MAP(BEZIER(S1)([ handle_down_curve, lock_down_curve ]))(area_domain);

var lock_front = STRUCT([ lock_left1,lock_left2,lock_right1,lock_right2,lock_up,lock_down]);

// Back background

var lock_left_profile1_t = traslaPointsY(lock_left_profile1, depth);
var lock_left_profile2_t = traslaPointsY(lock_left_profile2, depth);
var lock_right_profile1_t = traslaPointsY(lock_right_profile1, depth);
var lock_right_profile2_t = traslaPointsY(lock_right_profile2, depth);
var lock_up_t = traslaPointsY(lock_up, depth);
var lock_down_t = traslaPointsY(lock_down, depth);

var handle_left1_t = traslaPointsY(handle_left1, depth);
var handle_left2_t = traslaPointsY(handle_left2, depth);
var handle_right1_t = traslaPointsY(handle_right1, depth);
var handle_right2_t = traslaPointsY(handle_right2, depth);
var handle_up_t = traslaPointsY(handle_up, depth);
var handle_down_t = traslaPointsY(handle_down, depth);

var lock_left_profile1_curve_t = BEZIER(S0)(lock_left_profile1_t)
var lock_left_profile2_curve_t = BEZIER(S0)(lock_left_profile2_t)
var lock_right_profile1_curve_t = BEZIER(S0)(lock_right_profile1_t)
var lock_right_profile2_curve_t = BEZIER(S0)(lock_right_profile2_t)
var lock_down_curve_t = BEZIER(S0)(lock_down_t)
var lock_up_curve_t = BEZIER(S0)(lock_up_t)
var handle_left1_curve_t = BEZIER(S0)(handle_left1_t)
var handle_left2_curve_t = BEZIER(S0)(handle_left2_t)
var handle_right1_curve_t = BEZIER(S0)(handle_right1_t)
var handle_right2_curve_t = BEZIER(S0)(handle_right2_t)
var handle_up_curve_t = BEZIER(S0)(handle_up_t)
var handle_down_curve_t = BEZIER(S0)(handle_down_t)

var lock_left1_t = MAP(BEZIER(S1)([ lock_left_profile1_curve_t, handle_left1_curve_t ]))(area_domain);
var lock_left2_t = MAP(BEZIER(S1)([ lock_left_profile2_curve_t, handle_left2_curve_t ]))(area_domain);
var lock_right1_t = MAP(BEZIER(S1)([ lock_right_profile1_curve_t, handle_right1_curve_t ]))(area_domain);
var lock_right2_t = MAP(BEZIER(S1)([ lock_right_profile2_curve_t, handle_right2_curve_t ]))(area_domain);

var lock_back = STRUCT([ lock_left1_t,lock_left2_t,lock_right1_t,lock_right2_t,lock_up_t,lock_down_t]);

// Conjuction background

var lock = STRUCT([ lock_front,lock_back, 
					unifyBezierCurves(lock_left_profile1_curve, lock_left_profile1_curve_t),
					unifyBezierCurves(lock_left_profile2_curve, lock_left_profile2_curve_t),
					unifyBezierCurves(lock_right_profile1_curve, lock_right_profile1_curve_t),
					unifyBezierCurves(lock_right_profile2_curve, lock_right_profile2_curve_t),
					unifyBezierCurves(handle_left1_curve, handle_left1_curve_t),
					unifyBezierCurves(handle_left2_curve, handle_left2_curve_t),
					unifyBezierCurves(handle_right1_curve, handle_right1_curve_t),
					unifyBezierCurves(handle_right2_curve, handle_right2_curve_t),
					unifyBezierCurves(handle_down_curve, handle_down_curve_t),
					unifyBezierCurves(handle_up_curve, handle_up_curve_t) ]);

// Screws - Da rendere spaccati

var screw_r = 0.035;
var screw_h = 0.02;
var screw = MAP(BEZIER(S1)([ bezier_circle_map(screw_r),
							 bezier_circle_not_centered_map(screw_r,0,0,screw_h/2), 
							 bezier_circle_not_centered_map(0.8*screw_r,0,0,0.9*screw_h), 
							 [0,0,screw_h]  ]))(area_domain);

screw = RNC([1,2])(PI/2)(screw)
var screws_front = STRUCT([ T([0,2])([0.82, 3.37])(screw),T([0,2])([0.37, 3.39])(screw),
						T([0,2])([0.81, 0.43])(screw),T([0,2])([0.38, 0.42])(screw) ]);

screw_bc = RNC([1,2])(PI)(screw)
var screws_back = STRUCT([ T([0,1,2])([0.82, depth, 3.37])(screw_bc),T([0,1,2])([0.37, depth, 3.39])(screw_bc),
						T([0,1,2])([0.81, depth, 0.43])(screw_bc),T([0,1,2])([0.38, depth, 0.42])(screw_bc) ]);

var screws = STRUCT([screws_back,screws_front])

draw(screws)












draw(lock)











