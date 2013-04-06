#Andrea Iuliano
from pyplasm import *

#Global variables
z_pillar0 = 2.5
r_pillar0 = 0.25/2
l_pillar0 = 0.25
dist_pillar0_x = 2.75
dist_circle_to_square_x = 1.46675
dist_pillar0_y = 5.32
dist_pillar0_square_1 = 1.067
dist_pillar0_square_2 = 2.79

first_floor_z = 0.3905
dist_pillar1_up_circle = 8.25
dist_pillar1_up_square = 11
l_pillar1_small = 0.2
dist_pillar1_small = 0.73


#Support functions
def circle(r):
	def ball(p):
 		a,r = p
		return [r*COS(a), r*SIN(a)]
	dom2D = PROD([INTERVALS(2*PI)(50), INTERVALS(1)(1)])
	return S([1,2])([r,r])(MAP(ball)(dom2D))

def extrude(obj,z):
	return PROD([obj, Q(z)])

def traslate(coord,values,obj):
	return T(coord)(values)(obj)

def traslateVector(coord,values):
	return T(coord)(values)

#Draw a first circle pillar
pillar_circle_model_2D = traslate([1,2],[r_pillar0, r_pillar0],circle(r_pillar0))
pillar_circle_model = extrude(pillar_circle_model_2D,z_pillar0) 

pillar0_below = STRUCT( [pillar_circle_model, STRUCT(NN(4)([ traslateVector( [1], [dist_pillar0_x]), pillar_circle_model ])) ])

square_pillar_model = CUBOID([l_pillar0,l_pillar0,z_pillar0])

pillar0_up_three_square = STRUCT(NN(3)([ traslateVector( [1], [dist_pillar0_x]), square_pillar_model]))

piller0_up_small = traslate([1],[dist_circle_to_square_x],square_pillar_model)

pillar0_up_centered = STRUCT( [pillar_circle_model,pillar0_up_three_square,piller0_up_small] )

pillars0 = STRUCT([pillar0_below, traslate([2],[dist_pillar0_y],pillar0_up_centered)])


#Draw pillar1
pillar1_below = STRUCT([square_pillar_model, STRUCT(NN(4)([traslateVector([1],[dist_pillar0_x]),square_pillar_model])) ])

pillar1_up_1 = STRUCT( [square_pillar_model, STRUCT(NN(2)([traslateVector([1],[dist_pillar0_x]),square_pillar_model]))] )
pillar1_up_2 = STRUCT( [pillar1_up_1, traslate([1], dist_pillar1_up_circle, pillar_circle_model),traslate([1], dist_pillar1_up_square, square_pillar_model)] )

square_pillar_model_small = CUBOID([l_pillar1_small,l_pillar1_small,z_pillar0])

pillar1_up = STRUCT([pillar1_up_2, traslate([1],[dist_pillar1_small],square_pillar_model_small)])

pillar1_up = traslate([2],[dist_pillar0_y],pillar1_up)


pillars1 = traslate([3],[z_pillar0+first_floor_z],STRUCT([pillar1_below, pillar1_up]))


#Draw pillar2
pillar2_up = traslate([2],[dist_pillar0_y],STRUCT([square_pillar_model, STRUCT(NN(4)([traslateVector([1],[dist_pillar0_x]),square_pillar_model])) ]))

pillar2_below = STRUCT([square_pillar_model, traslate([1],[dist_pillar0_x],square_pillar_model), traslate([1],[dist_pillar0_x*4],square_pillar_model) ])

pillars2_with_hole = traslate([3],[2*(z_pillar0+first_floor_z)],STRUCT([pillar2_up,pillar2_below]))

pillars12_delta_model = CUBOID([l_pillar0,l_pillar0,first_floor_z])

pillars12_delta_below = traslate([3],[2*z_pillar0 + first_floor_z],STRUCT([pillars12_delta_model, traslateVector([1],[dist_pillar0_x]), pillars12_delta_model]))

pillars12_delta_up = traslate([2],[dist_pillar0_y], pillars12_delta_below)

pillars2 = STRUCT([pillars2_with_hole,pillars12_delta_below,pillars12_delta_up])


#Draw pillar3
pillars3_small = traslate([2],[dist_pillar0_y+(l_pillar0-l_pillar1_small)/2],STRUCT([square_pillar_model_small, traslate([1],[dist_pillar0_x+(l_pillar0-l_pillar1_small)/2],square_pillar_model_small)]))

pillars3_big_part = traslate([1,2],[2*dist_pillar0_x,dist_pillar0_y],STRUCT([square_pillar_model, traslateVector([1],[dist_pillar0_x]),square_pillar_model,traslateVector([1],[dist_pillar0_x]),square_pillar_model]))

pillars3_big_below = traslate([1], [2*dist_pillar0_x], STRUCT([square_pillar_model, traslate([1],[2*dist_pillar0_x],square_pillar_model)]))

pillars3_big_up = traslate([1,2],[4*dist_pillar0_x,dist_pillar0_y+l_pillar0+1.18575],square_pillar_model)



pillars3 = traslate([3],[3*z_pillar0 + 3*first_floor_z],STRUCT([pillars3_big_part,pillars3_small,pillars3_big_below,pillars3_big_up]))


#Start exercise 2

def semicircle(r):
	def ball(p):
 		a,r = p
		return [r*COS(a), r*SIN(a)]
	dom2D = PROD([INTERVALS(PI)(50), INTERVALS(1)(1)])
	return S([1,2])([r,r])(MAP(ball)(dom2D))

def rotate(coord,values,obj):
	return R(coord)(values)(obj)


base_x = 11.25
base_y = 6.7557
base_z = 0.5

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

#Draw floor0
model_base = CUBOID([base_x,base_y,base_z])

floor0_r1 = traslate([2],[dist_pillar0_y],CUBOID([floor0_r1_x,floor0_r1_y,floor_z]))
floor0_r2 = traslate([1,2],[floor0_r2_trasl_x,floor0_r2_trasl_y],CUBOID([floor0_r2_x,floor0_r2_y,floor_z]))
floor0_r3 = traslate([1,2],[floor0_r3_trasl_x,floor0_r3_trasl_y],CUBOID([floor0_r3_x,floor0_r3_y,floor_z]))
semcirc_1_2D = semicircle(r_floor0_semcirc_1)
semcirc_1 = traslate([2],[r_floor0_semcirc_1],rotate([1,2],-PI/2,extrude(semcirc_1_2D,floor_z)))
floor0_semicirc1 = traslate([1,2],[r_floor0_semcirc_1_trasl_x,r_floor0_semcirc_1_trasl_y],semcirc_1)
floor0_r4 = traslate([1,2],[floor0_r4_trasl_x,floor0_r4_trasl_y],CUBOID([floor0_r4_x,floor0_r4_y,floor_z]))

semcirc_2_2D = semicircle(r_floor0_semcirc_2)
semcirc_2_centered = rotate([1,2],PI,extrude(semcirc_2_2D,floor_z))
semcirc_2 = traslate([1,2],[r_floor0_semcirc_2,r_floor0_semcirc_2],semcirc_2_centered)
floor0_semicirc2 = traslate([1,2],[r_floor0_semcirc_2_trasl_x,r_floor0_semcirc_2_trasl_y],semcirc_2)

floor0 = STRUCT([floor0_r1,floor0_r2,floor0_r3,floor0_semicirc1,floor0_semicirc2,floor0_r4])

#Draw floor1

floor1_z = z_pillar0

floor1_r1_x = 1.2
floor1_r1_y = 1.3
floor1_r1_trasl_y = 5.32 

floor1_r2_x = 11.16
floor1_r2_y = floor1_r1_trasl_y+l_pillar0

floor1_r3_x = 5.16
floor1_r3_y = 1.27
floor1_r3_trasl_x = 5.99
floor1_r3_trasl_y = floor1_r1_trasl_y

floor1_balcony_x = 1.135
floor1_balcony_y = 1.067
floor1_balcony_trasl_y = floor1_r1_trasl_y

floor1_r1 = traslate([2],[floor1_r1_trasl_y], CUBOID([floor1_r1_x,floor1_r1_y,floor_z]))
floor1_r2 = CUBOID([floor1_r2_x,floor1_r2_y,floor_z])
floor1_r3 = traslate([1,2],[floor1_r3_trasl_x,floor1_r3_trasl_y], CUBOID([floor1_r3_x,floor1_r3_y,floor_z]))
floor1_balcony = traslate([1,2],[-floor1_balcony_x,floor1_balcony_trasl_y], CUBOID([floor1_balcony_x,floor1_balcony_y,floor_z]))


floor1 = traslate([3],[floor1_z],STRUCT([floor1_r1,floor1_r2,floor1_r3, floor1_balcony]))


#Draw floor2

floor2_z = 2*z_pillar0 + floor_z


trapezium = extrude(MKPOL([[[5.47,0],[11.25,0],[11.25,6.75],[4.51,6.75],[4.51,5.32]],[[1,2,3,4,5]],None]),floor_z)


floor2_r_x = 0.816901408
floor2_r_y = 6.687

floor2_r = CUBOID([floor2_r_x,floor2_r_y,floor_z])



floor2 = traslate([3],[floor2_z],STRUCT([trapezium,floor2_r]))

#Draw floor3

floor3_z = 3*z_pillar0 + 2*floor_z

floor3_r1_x = 11.16
floor3_r1_y = 0.152
floor3_r1_trasl_y = 6.52

floor3_r2_y = 0.25
floor3_r2_trasl_x = 5.456
floor3_r2_x = floor3_r1_x - floor3_r2_trasl_x
floor3_r2_trasl_y = 6.39

floor3_r3_x = 0.244
floor3_r3_y = 6.412
floor3_r3_trasl_x =  floor3_r2_trasl_x

floor3_r4_x = 5.47
floor3_r4_y = 5.46
floor3_r4_trasl_x = floor3_r3_trasl_x + floor3_r3_x

floor3_r5_x = 2.418
floor3_r5_y = 0.934
floor3_r5_trasl_x = floor3_r3_trasl_x + 3.29
floor3_r5_trasl_y = floor3_r4_y

floor3_r6_x = floor3_r3_trasl_x
floor3_r6_y = floor3_r3_y+0.2

floor3_r1 = traslate([2],[floor3_r1_trasl_y], CUBOID([floor3_r1_x,floor3_r1_y,floor_z]))
floor3_r2 = traslate([1,2],[floor3_r2_trasl_x,floor3_r2_trasl_y], CUBOID([floor3_r2_x,floor3_r2_y,floor_z]))
floor3_r3 = traslate([1],[floor3_r3_trasl_x], CUBOID([floor3_r3_x,floor3_r3_y,floor_z]))
floor3_r4 = traslate([1],[floor3_r4_trasl_x], CUBOID([floor3_r4_x,floor3_r4_y,floor_z]))
floor3_r5 = traslate([1,2],[floor3_r5_trasl_x,floor3_r5_trasl_y], CUBOID([floor3_r5_x,floor3_r5_y,floor_z]))
floor3_r6 = CUBOID([floor3_r6_x,floor3_r6_y,floor_z])

floor3 = traslate([3],[floor3_z],STRUCT([floor3_r1,floor3_r2,floor3_r3,floor3_r4,floor3_r5,floor3_r6]))

#Draw floor4

floor4_trasl_z = 4*z_pillar0 + 3*first_floor_z

floor4_r1_x = 5.44
floor4_r1_y = 1.32
floor4_r1_trasl_y = 5.31

floor4_r2_x = 5.8
floor4_r2_y = 6.657
floor4_r2_trasl_x = floor4_r1_x

floor4_r1 = traslate([2],[floor4_r1_trasl_y],CUBOID([floor4_r1_x,floor4_r1_y,floor_z]))

floor4_r2 = traslate([1],[floor4_r2_trasl_x],CUBOID([floor4_r2_x,floor4_r2_y,floor_z]))

floor4 = STRUCT([floor4_r1, floor4_r2])


#Start exercise 3
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

east_face_r3_part2 = STRUCT(NN(3)([east_face_r3_part1, traslateVector([3],[east_face_r3_z+east_face_r3_traslate_z]) ]))
east_face_r3 = STRUCT([east_face_r3_part1, traslateVector([3],[east_face_r3_z+east_face_r3_traslate_z]), east_face_r3_part2])

east_face_r4 = traslate([3],[east_face_r4_traslate_z],CUBOID([east_face_r4_x,east_face_y,east_face_r4_z]))

east_face_r5 = traslate([3],[east_face_r5_traslate_z],CUBOID([east_face_r5_x,east_face_y,east_face_r5_z]))

east_face_r6 = traslate([3],[east_face_r6_traslate_z],CUBOID([east_face_r6_x,east_face_y,east_face_r6_z]))


east = traslate([3],[east_face_z],STRUCT([east_face_r1,east_face_r2,east_face_r3,east_face_r4,east_face_r5,east_face_r6 ]))


depth_walls = 0.25
#north_windows
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
###building north face###
n_1_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])
#
n_2_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_top_boarder_top_win])
n_3_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_fst_snd_windows])
n_4_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_snd_trd_windows])
n_5_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_snd_trd_windows])
#
n_6_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])
#
n_7_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_8_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_9_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_10_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
#
n_11_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])

#Traslation of fragments#
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
#n_face
north_face = STRUCT([n_1_fragment,n_2_fragment,n_3_fragment,n_4_fragment,n_5_fragment,n_6_fragment,n_7_fragment,n_8_fragment,n_9_fragment,n_10_fragment,n_11_fragment])
#z_translation
north = T([3])([z_pillar0- floor_z ])(north_face)
north = S([3])([1.2])(north)
north = S([1])([0.91])(north)
north = R([1,2])(PI/2)(north)
north = T([1])([11.25])(north)

#sud
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

floor1_balcony_x = 1.135
floor1_balcony_y = 1.067
floor1_balcony_trasl_y = floor1_r1_trasl_y


south_face_r1 = traslate([2],[south_face_r1_transl_y] ,CUBOID([south_face_x,south_face_r1_y,south_face_r1_z]))
south_face_r2 = traslate([3],[south_face_r2_transl_z] ,CUBOID([south_face_x,south_face_r2_y,south_face_r2_z]))
south_face_r3 = CUBOID([south_face_x,south_face_r3_y,south_face_r3_z])
south_face_r4 = CUBOID([south_face_x,south_face_r4_y,south_face_r4_z])
south_face_balcony = CUBOID([south_face_x,south_face_r4_y,south_face_r4_z])




south = traslate([3],[south_face_z],STRUCT([south_face_r1,south_face_r2,south_face_r3,south_face_r4]))


floor1_balcony_x = 1.135
floor1_balcony_y = 1.067
floor1_balcony_trasl_y = floor1_r1_trasl_y

floor1_r1 = traslate([2],[floor1_r1_trasl_y], CUBOID([floor1_r1_x,floor1_r1_y,floor_z]))
floor1_r2 = CUBOID([floor1_r2_x,floor1_r2_y,floor_z])
floor1_r3 = traslate([1,2],[floor1_r3_trasl_x,floor1_r3_trasl_y], CUBOID([floor1_r3_x,floor1_r3_y,floor_z]))
floor1_balcony = traslate([1,2],[-floor1_balcony_x,floor1_balcony_trasl_y], CUBOID([floor1_balcony_x,floor1_balcony_y,floor_z]))



#floor0 wall

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

#Draw floor0
model_base = CUBOID([base_x,base_y,base_z])

floor0_r1 = traslate([2],[dist_pillar0_y],CUBOID([floor0_r1_x,floor0_r1_y,z_pillar0]))
floor0_r2 = traslate([1,2],[floor0_r2_trasl_x,floor0_r2_trasl_y],CUBOID([floor0_r2_x,floor0_r2_y,z_pillar0]))
floor0_r3 = traslate([1,2],[floor0_r3_trasl_x,floor0_r3_trasl_y],CUBOID([floor0_r3_x,floor0_r3_y,z_pillar0]))
semcirc_1_2D = semicircle(r_floor0_semcirc_1)
semcirc_1 = traslate([2],[r_floor0_semcirc_1],rotate([1,2],-PI/2,extrude(semcirc_1_2D,z_pillar0)))
floor0_semicirc1 = traslate([1,2],[r_floor0_semcirc_1_trasl_x,r_floor0_semcirc_1_trasl_y],semcirc_1)
floor0_r4 = traslate([1,2],[floor0_r4_trasl_x,floor0_r4_trasl_y],CUBOID([floor0_r4_x,floor0_r4_y,z_pillar0]))

semcirc_2_2D = semicircle(r_floor0_semcirc_2)
semcirc_2_centered = rotate([1,2],PI,extrude(semcirc_2_2D,z_pillar0))
semcirc_2 = traslate([1,2],[r_floor0_semcirc_2,r_floor0_semcirc_2],semcirc_2_centered)
floor0_semicirc2 = traslate([1,2],[r_floor0_semcirc_2_trasl_x,r_floor0_semcirc_2_trasl_y],semcirc_2)

wall_floor0 = STRUCT([floor0_r1,floor0_r2,floor0_r3,floor0_semicirc1,floor0_semicirc2,floor0_r4]) 












building = STRUCT([model_base, traslateVector([3],[base_z]), wall_floor0,floor0, pillars0, floor1, pillars1, floor2, pillars2, floor3, pillars3, traslate([3],[floor4_trasl_z],floor4), east, north,south])

VIEW(building)