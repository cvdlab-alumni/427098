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
dist_pillar1_small = 1.46


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

building = STRUCT([pillars0, pillars1, pillars2])

VIEW(building)

#Draw pillar3