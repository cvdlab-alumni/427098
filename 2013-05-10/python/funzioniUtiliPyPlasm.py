from pyplasm import *
import sys
sys.path.append("/home/andrea/plasm/larpy")
from lar import *
from scipy import *

#		Funzioni Utili 		#

# def GRID(args):
# 	model = ([[]],)
# 	for (k,steps) in enumerate(args):
# 		model = larExtrude(model,steps*[1])
# 	V,cells = model
# 	verts = AA(list)(scipy.array(V)/AA(float)(args))
# 	return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])
def GRID(args):
	model = ([[]],[[0]])
	for k,steps in enumerate(args):
		model = larExtrude(model,steps*[1])
	V,cells = model
	verts = AA(list)(scipy.array(V)/AA(float)(args))
	return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])

def dom1D(val):
	return INTERVALS(1)(32)

def dom2D(val1,val2):
	return GRID([val1,val2])
	
#domain = GRID([25,25])

#Traslazione-Rotazione-Scala se si proviene da javascript
def TPJS(dimens,values,object):
	new_dim = map(lambda item: item+1, dimens)
	return T(new_dim)(values)(object)

def RPJS(dimens,values,object):
	new_dim = map(lambda item: item+1, dimens)
	return R(new_dim)(values)(object)

def SPJS(dimens,values,object):
	new_dim = map(lambda item: item+1, dimens)
	return S(new_dim)(values)(object)

#Funzione che mi permette di inserire i colori in rgb con range [0,255]
def rgb(color):
	return [color[0]/255, color[1]/255, color[2]/255]

#Funzione che disegna una griglia 2D
def grid2D(dimens,axis1,axis2):
	def semi_grid(ax1,ax2):
		def grid_object(point):

			start = [0,0,0]
			end = [0,0,0]
			start[ax2] = point
			end[ax2] = point
			end[ax1] = dimens
			if point==0:
					return POLYLINE([start,end])
			return STRUCT([POLYLINE([start,end]), grid_object(point-1)])
			
		return COLOR(rgb([200,200,200]))(grid_object(dimens))
	

	return STRUCT([semi_grid(axis1,axis2),semi_grid(axis2,axis1)])

#Funzione che disegna una griglia 2D centimetrata
def grid2Ddetailed(dimens,axis1,axis2):
	def semi_grid(ax1,ax2):
		def grid_object(point):
			start = [0,0,0]
			end = [0,0,0]
			start[ax2] = point
			end[ax2] = point
			end[ax1] = dimens
			if point < 0.01:
				return COLOR([1,0,0])(POLYLINE([start,end]))
			if isInt(point):
				return STRUCT([COLOR([1,0,0])(POLYLINE([start,end])), grid_object(point-0.1)])
			return STRUCT([COLOR(rgb([200,200,200]))(POLYLINE([start,end])), grid_object(point-0.1)])
			
		return grid_object(dimens)
	

	return STRUCT([semi_grid(axis1,axis2),semi_grid(axis2,axis1)])

def isInt(val):
	print val
	if val - int(val) < 0.01:
		print True
		return True
	return False

#Funzione che disegna una griglia 2D
def grid3D(dimens):

	grid_xy = grid2D(dimens,0,1)
	grid_xz = grid2D(dimens,0,2)

	grid_xy = STRUCT(NN(dimens+1)([grid_xy,T([3])([1])]))
	grid_xz = STRUCT(NN(dimens+1)([grid_xz,T([2])([1])]))

	return STRUCT([grid_xy,grid_xz])

#Funzione che disegna una griglia 3D piu leggera (3 griglie 2D)
def grid3DLight(dimens):
	return STRUCT([grid2D(dimens,0,1),grid2D(dimens,0,2),grid2D(dimens,1,2)])

#Funzione che disegna una griglia 3D piu leggera (3 griglie 2D) centimetrata
def grid3DLightDetailed(dimens):
	return STRUCT([grid2Ddetailed(dimens,0,1),grid2Ddetailed(dimens,0,2),grid2Ddetailed(dimens,1,2)])


#Funzione che disegna l'oggetto all'interno di una griglia 2D
def grill2D(obj,dimens,axis1,axis2):
	return STRUCT([obj,grid2D(dimens,axis1,axis2)])

#Funzione che disegna l'oggetto all'interno di una griglia 3D
def grill3D(obj,dimens):
	return STRUCT([obj,grid3D(dimens)])

#Funzione che disegna l'oggetto all'interno di una griglia 3D piu leggera (3 griglie 2D)
def grill3DLight(obj,dimens):
	return STRUCT([obj,grid3DLight(dimens)])

#Funzione che disegna l'oggetto all'interno di una griglia 3D piu leggera (3 griglie 2D) centimetrata
def grill3DLightDetailed(obj,dimens):
	return STRUCT([obj,grid3DLightDetailed(dimens)])

#Funzione che disegna un'array di oggetto
def view(args):
	VIEW(STRUCT(args))

#Funzione che estrude l'oggetto sull'asse z
def extrude(obj,z):
	return PROD([obj, Q(z)])


#Funzione che scala i punti su tutti gli assi
def scalePoints(points,values):
	return map(lambda item:\
		map(lambda elem: elem*values, item), points)

#Funzione che trasla i punti sull'asse z
def traslaPointsZ(points,value):
	return map(lambda item:\
		[item[0],item[1],item[2]+value], points)

#Funzione che trasla i punti sull'asse y
def traslaPointsY(points,value):
	return map(lambda item:\
		[item[0],item[1]+value,item[2]], points)

#Funzione che trasla i punti sull'asse x
def traslaPointsX(points,value):
	return map(lambda item:\
		[item[0]+value,item[1],item[2]], points)

#Funzione che riporta il valore minimo dell'asse scelto tra le coordinate
def minValueCoordinate(points,axis):
	minVal = points[0][axis]
	for i  in range(1,len(points)):
		if (points[i][axis]<minVal):
			minVal = points[i][axis]
	return minVal

#Funzione che riporta il valore massimo dell'asse scelto tra le coordinate
def maxValueCoordinate(points,axis):
	maxVal = points[0][axis]
	for i  in range(1,len(points)):
		if (points[i][axis]>maxVal):
			maxVal = points[i][axis]
	return maxVal

#Funzione che mi trasla i punti all'origine
def traslateToOrigin(points):
	minX = minValueCoordinate(points,0)
	minY = minValueCoordinate(points,1)
	minZ = minValueCoordinate(points,2)
	if (minX != 0):
		points = traslaPointsX(points,-minX)
	if (minY != 0):
		points = traslaPointsY(points,-minY)
	if (minZ != 0):
		points = traslaPointsZ(points,-minZ)
	return points

#Funzione che calcola la grandezza del cerchio inscritto alla figura (descritta dai punti)
def calcolateInscribedCircleRay(points,axis):
	return maxValueCoordinate(points,axis)-minValueCoordinate(points,axis)

#Funzione che inserisce un valore y ad un array di punti composto da x e z
def addYValue(points, y):
	return map(lambda item: [item[0],y,item[1]], points)

def addZValue(points, z):
	return map(lambda item: [item[0],item[1],z], points)

def addXValue(points, x):
	return map(lambda item: [x,item[0],item[1]], points)

#Funzione che ruota di 180 gradi (flippa) il profilo invertendo l'asse x
def flipX(points):
	def aux(item):
		newItem0 = (simmetry_x - item[0]) + simmetry_x
		return [newItem0, item[1], item[2]]
	simmetry_x = maxValueCoordinate(points,0)
	return map(aux, points)



#	Figure

#Funzione che riporta una cerchio (pieno)
def circle(r,dom2D):
	def ball(p):
 		a,r = p
		return [r*COS(a), r*SIN(a)]
	#dom2D = PROD([INTERVALS(2*PI)(50), INTERVALS(1)(1)])
	return S([1,2])([r,r])(MAP(ball)(dom2D))

#Funzione che riporta la mappatura di una circonferenza
def circle_mapping(r): 
	return lambda v: [r*COS(v[0]), r*SIN(v[0])]

#Funzione che riporta un circonferenza (vuota)
def circonference(r,dom2D):
	#dom2D = PROD([INTERVALS(2*PI)(50), INTERVALS(1)(1)])
	return MAP(circle_mapping(r))(dom2D)


#Funzione che riporta una semicirconferenza (pieno)
def semicircle(r,dom2D):
	def ball(p):
 		a,r = p
		return [r*COS(a), r*SIN(a)]
	#dom2D = PROD([INTERVALS(PI)(50), INTERVALS(1)(1)])
	return S([1,2])([r,r])(MAP(ball)(dom2D))

#Funzione che riporta un cilindro
def cilynder(r,h,dom2D):
	return extrude(circle(r,dom2D),h)

#Funzione che riporta un cilindro
def emptyCilynder(r,h,dom2D):
	return extrude(circonference(r,dom2D),h)

#Funzione che riporta un toro
#dom2D vuole solo l'intervallo
def torus(R,r,dom2D):
	return TORUS([R,r])(dom2D)
	#return TORUS([R,r])([20,20])

#Funziona che disegna un muro con un buco
def wallWithHole(wallDepht,pmin,pmax,l_wall,h_wall):
	p1 = CUBOID([pmin[0],wallDepht, h_wall])
	p2 = T([1])([pmin[0]])(CUBOID([pmax[0]-pmin[0],wallDepht,pmin[1]]))

	p3 = ""
	if l_wall-pmax[0]>0:
		p3 = T([1])([pmax[0]])(CUBOID([l_wall-pmax[0]+1,wallDepht, h_wall]))
	p4 = ""
	if h_wall-pmax[1]>0:
		p4 = T([1,3])([pmin[0],pmax[1]])(CUBOID([pmax[0]-pmin[0],wallDepht,h_wall-pmax[1]]))

	return STRUCT([p1,p3,p2,p4])

#Funziona che disegna una scala
def stairs(x_step,z_step,l_stairs,h_stairs):
	nstep = h_stairs/z_step
	y_step = l_stairs/nstep
	step = CUBOID([x_step,y_step,z_step])
	steps = STRUCT(NN(nstep)([step,T([2,3])([y_step,z_step])]))

	points = [ [0,y_step,0],[x_step,y_step,0],[x_step,l_stairs,h_stairs-z_step],[0,l_stairs,h_stairs-z_step],[0,y_step,0], \
	 			[0,y_step,z_step],[x_step,y_step,z_step],[x_step,l_stairs-y_step,h_stairs-z_step],[0,l_stairs-y_step,h_stairs-z_step] ]
	bottom = MKPOL([points, [[1,2,3,4,5,6,7,8,9]], None])
	return STRUCT([steps,bottom])

#TODO
def windowGen(height,width,depth):
	return 

#TODO
def arc_1D(alpha,r):
	return 

#TODO
def arc_2D(alpha,r,R):
	return 

#	Superfici Curve

#Funzione che mi permette di ruotare un profile attorno una circonferenza unitaria
def rotateProfile(points,dom2D):
	points = traslateToOrigin(points)
	curve_map = BEZIER(S1)(points)
	return MAP(PROFILEPRODSURFACE([curve_map,bezier_circle_map(1,S2)]))(dom2D)

#Funzione che mi permette di ruotare un profile attorno una circonferenza di raggio r
def rotateProfileWithR(points,r,dom2D):
	points = traslateToOrigin(points)
	curve_map = BEZIER(S1)(points)
	return MAP(PROFILEPRODSURFACE([curve_map,bezier_circle_map(r,S2)]))(dom2D)

#Funzione che mi permette di ruotare un profile attorno una circonferenza unitaria, senza traslare il profilo all'origine
def rotateProfileNoTraslate(points,dom2D):
	curve_map = BEZIER(S1)(points)
	return MAP(PROFILEPRODSURFACE([curve_map,bezier_circle_map(1,S2)]))(dom2D)

#Funzione che mi permette di ruotare un profile attorno una circonferenza di raggio r, senza traslare il profilo all'origine
def rotateProfileNoTraslateWithR(points,r,dom2D):
	curve_map = BEZIER(S1)(points)
	return MAP(PROFILEPRODSURFACE([curve_map,bezier_circle_map(r,S2)]))(dom2D)

#Funzione che mi permette di ruotare un profile attorno una semicirconferenza unitaria
def halfRotateProfile(points,dom2D):
	points = traslateToOrigin(points)
	curve_map = BEZIER(S1)(points)
	return MAP(PROFILEPRODSURFACE([curve_map,bezier_semicircle_map(1,S2)]))(dom2D)


#	Bezier - Funzioni di supporto

#Funzione che mi crea una superficie di bezier compresa tra le curve in input
def unifyBezierCurves(map_curve_1,map_curve_2,dom2D):
	return MAP(BEZIER(S2)([map_curve_1,map_curve_2]))(dom2D);

#Funzione che mi crea una struttura composta da le superfici di bezier create tra le coppie di curve in input
#NB: le coppie sono prese in ordine: (0,1),(1,2)...(n-1,n),(n,0)
def unifyAllBezierCurvers(curves,dom2D):
	output = STRUCT([unifyBezierCurves(curves[0],curves[1],dom2D)])
	for i in range(1, len(curves)):
		output = STRUCT([ output,unifyBezierCurves(curves[i],curves[(i+1)%curves.length],dom2D) ])
	return output

#Date n funzioni di bezier, crea una superficie chiusa, collegandole in ordine
def bezierSurface(curves):
	bez_cur = []
	for c in curves:
		bez_cur.append(BEZIER(S1)(c))
	return BEZIER(S2)(bez_cur)

#Date n funzioni di bezier, crea una superficie chiusa (termina e parte con la prima), collegandole in ordine
def bezierClosedSurface(curves):
	bez_cur = []
	for c in curves:
		bez_cur.append(BEZIER(S1)(c))
	bez_cur.append(bez_cur[0])
	return BEZIER(S2)(bez_cur)



#Funzione che unisce piu' curve di bezier (riportando una curva)
def curves_union( curves ):
        def isin( u, a, b ):
                return u >= a and u < b
        def aux0( domains ):
                def aux1(u):
                        n = len( curves )
                        i = 0
                        j = 0
                        k = 0
                        while ( i < n ):
                                k += domains[i][1] - domains[i][0]
                                i += 1
                        i = 0
                        while ( i < n and not isin(u[0] * k, j, j + domains[i][1] - domains[i][0]) ):
                                j += domains[i][1] - domains[i][0]
                                i += 1
                        if ( i < n ):
                                return curves[i]([ domains[i][0] + u[0] * k - j ])
                        else:
                                return curves[n-1]([ domains[n-1][1] ])
                return aux1
        return aux0
# c1 = BEZIER(S1)([ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ] ])
# c2 = BEZIER(S1)([ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ] ])
# c3 = BEZIER(S1)([ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ] ]) 
# c123 = curves_union([ c1, c2, c3 ])([ [ 0, 1 ], [ 0, 1 ], [ 0, 1 ] ])
# VIEW(MAP(c123)(INTERVALS(1)(32 * 3)))



#	Bezier - Figure

#Funzione che riporta la mappatura di una circonferenza creata con Bezier
def bezier_circle_map(r,selector):

	base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];
	circle_points = scalePoints(base_points,r);
	return BEZIER(selector)(circle_points)

#Funzione che riporta una circonferenza creata con Bezier
def bezier_circle(r,dom2D):
	return MAP(bezier_circle_map(r,S1))(dom2D)

#Funzione che riporta la mappatura di una circonferenza creata con Bezier traslata con i valori passati in input
def bezier_circle_not_centered_map(r,x_value,y_value,z_value,selector):

	base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]]
	circle_points = scalePoints(base_points,r)

	if (x_value != 0):
		circle_points = traslaPointsX(circle_points,x_value)
	if (y_value != 0):
		circle_points = traslaPointsY(circle_points,y_value)
	if (z_value != 0):
		circle_points = traslaPointsZ(circle_points,z_value)

	return BEZIER(selector)(circle_points)

#Funzione che riporta una circonferenza creata con Bezier traslata con i valori passati in input
def bezier_circle_not_centered(r,x_value,y_value,z_value,dom2D):
	return MAP(bezier_circle_not_centered_map(r,x_value,y_value,z_value,S1))(dom2D)

#Funzione che riporta la mappatura di una semicirconferenza creata con Bezier
def bezier_semicircle_map(r,selector):
	base_points = [[0, 0, 0], [0, 1.3, 0], [2, 1.3, 0], [2, 0, 0]];
	circle_points_non_centered = scalePoints(base_points,r);
	circle_points = traslaPointsX(circle_points_non_centered,-r);
	return BEZIER(selector)(circle_points)

#Funzione che riporta una semicirconferenza creata con Bezier
def bezier_semicircle(r,dom2D):
	return MAP(bezier_semicircle_map(r,S1))(dom2D)




#	Funzioni NUBS

#Mi genera automaticamente i nodi
def nodes(points,degree):
  m = len(points)
  k = degree
  n = m+k+1
  l = n-3
  j = 1
  knots = []
  for i in range(n):
    if(i<=2):
      knots += [0]
    if(2<i<l):
      knots += [j]
      j= j+1
    if(i>=l):
      knots += [j]
  return knots

def nubs(degree,points):
	knots = nodes(points,degree)
	return NUBSPLINE(degree,len(knots))(knots)(points)

def displayNubsGrid(degree,points,grid_value):
	knots = nodes(points,degree)
	return STRUCT([DISPLAYNUBSPLINE([degree,knots,points]),grid3DLight(grid_value)])