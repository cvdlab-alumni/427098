#Andrea Iuliano
from pyplasm import *

z_pillar0 = 2.5
r_pillar0 = 0.25/2
l_pillar0 = 0.25
dist_pillar0_x = 2.75
dist_circle_to_square_x = 1.46675
dist_pillar0_y = 5.32
dist_pillar0_square_1 = 1.067
dist_pillar0_square_2 = 2.79


#Support functions
def circle(r):
	def ball(p):
 		a,r = p
		return [r*COS(a), r*SIN(a)]
	dom2D = PROD([INTERVALS(2*PI)(50), INTERVALS(1)(1)])
	return S([1,2])([r,r])(MAP(ball)(dom2D))

def extrude(obj,z):
	return PROD([obj, Q(z)])

def trasla(coord,values,obj):
	return T(coord)(values)(obj)

#Draw a first circle pillar
pillar_circle_model_2D = T([1,2])([r_pillar0, r_pillar0])(circle(r_pillar0))
pillar_circle_model = extrude(pillar_circle_model_2D,z_pillar0) 

pillar0_below = STRUCT([pillar_circle_model, STRUCT(NN(4)([T([1])([dist_pillar0_x]),pillar_circle_model])) ])

circolar_pillar_0_up = T([2])([dist_pillar0_y])(pillar_circle_model)

circolar_pillar_0 = STRUCT([circolar_pillar_0_up, pillar0_below])

square_pillar_model = CUBOID([l_pillar0,l_pillar0,z_pillar0])
square_pillars_part = STRUCT(NN(3)([square_pillar_model, T([1])([dist_pillar0_square_2])]))
square_pillars_centered = STRUCT([square_pillar_model, T([1])([dist_pillar0_square_1])(square_pillars_part)])
square_pillars0 = T([1,2])([dist_circle_to_square_x,dist_pillar0_y])(square_pillars_centered)

pillars0 = STRUCT([square_pillars0,circolar_pillar_0])




VIEW(pillars0)