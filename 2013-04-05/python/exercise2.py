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





building = STRUCT([model_base, traslateVector([3],[base_z]), floor0, pillars0, floor1, pillars1, pillars2, pillars3, traslate([3],[floor4_trasl_z],floor4)])

VIEW(building)