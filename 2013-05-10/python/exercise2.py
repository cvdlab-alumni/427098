from funzioniUtiliPyPlasm import *

#Non ho disegnato il parabrezza, in quanto non appartiene al profilo laterale, ma al frontale

def bezier(profilo):
	return BEZIER(S1)(profilo)

def bezMap(map,dom):
	return MAP(map)(dom)

def flipAux(coordinata):
	i = len(coordinata)-1
	out = []
	while i>=0:
		out.append(coordinata[i])
		i -= 1
	return out

def traslateZAllPoints(args,value):
	out = []
	for c in args:
		out.append(traslaPointsZ(c, value))
	return out

dominio_linea = dom1D(32)
dominio_area = dom2D(32, 32)
profilo_laterale_trasl_z = -4.5
profilo_frontale_trasl_z = -1

profilo_laterale_p1 = traslaPointsZ(addYValue([[0.33, 4.91], [0.28, 5.42], [0.21, 5.38], [0.7, 5.68], [1.41, 6.15], [2.26, 6.04],[3.16, 6.19]],0),profilo_laterale_trasl_z)
profilo_laterale_p2 = traslaPointsZ(addYValue([[3.15, 6.19], [3.32, 6.12], [3.52, 6.13], [3.65, 6.17]],0),profilo_laterale_trasl_z)
profilo_laterale_p2_1 = traslaPointsZ(addYValue([[3.65, 6.17], [5.14, 7.36], [6.98, 6.78], [8.81, 6.35]],0),profilo_laterale_trasl_z)
profilo_laterale_p3 = traslaPointsZ(addYValue([[8.81, 6.35], [9.12, 5.99], [8.86, 5.83], [9.11, 5.65], [8.96, 5.3], [9.05, 5.32], [9.01, 5.2]],0),profilo_laterale_trasl_z)
profilo_laterale_p4 = traslaPointsZ(addYValue([[9.03, 5.22], [9.07, 5.17], [9.01, 5.04], [8.89, 5.04], [8.85, 4.95], [8.57, 4.9], [7.83, 4.79]],0),profilo_laterale_trasl_z)
profilo_laterale_p5 = traslaPointsZ(addYValue([[7.82, 4.8], [8.02, 6.12], [6.37, 6.01], [6.4, 4.96]],0),profilo_laterale_trasl_z)
profilo_laterale_p6 = traslaPointsZ(addYValue([[6.4, 4.96], [5.05, 4.85], [4.57, 4.91], [2.57, 4.88]],0),profilo_laterale_trasl_z)
profilo_laterale_p7 = traslaPointsZ(addYValue([[2.55, 4.89], [2.72, 5.89], [1.02, 6.02], [1.14, 4.81]],0),profilo_laterale_trasl_z)
profilo_laterale_p8 = traslaPointsZ(addYValue([[1.14, 4.81], [0.59, 4.77], [0.5, 4.85], [0.33, 4.91]],0),profilo_laterale_trasl_z)
profilo_laterale_p9 = traslaPointsZ(addYValue([[3.84, 6.14], [5.08, 6.18], [6.27, 6.21], [6.93, 6.4]],0),profilo_laterale_trasl_z)
profilo_laterale_p10 = traslaPointsZ(addYValue([[3.84, 6.14], [5.3, 7.32], [6.9, 6.51], [6.95, 6.51], [6.93, 6.4]],0),profilo_laterale_trasl_z)
#Sportello
profilo_laterale_p11 = traslaPointsZ(addYValue([[6, 6.23], [6.36, 5.96], [5.92, 4.89], [5.35, 4.98], [5.16, 4.93], [4.06, 4.96], [3.59, 4.95]],0),profilo_laterale_trasl_z)
profilo_laterale_p12 = traslaPointsZ(addYValue([[3.59, 4.95], [3.6, 5.29], [3.45, 6.08], [3.82, 6.13], [4.42, 6.16], [5.35, 6.14], [6, 6.23]],0),profilo_laterale_trasl_z)
#Fari
profilo_laterale_p13 = traslaPointsZ(addYValue([[0.64, 5.59], [1.03, 5.63], [1.09, 5.74], [1.35, 5.9]],0),profilo_laterale_trasl_z)

#Traslo in basso la macchina

curva_1 = bezier(profilo_laterale_p1)
curva_2 = bezier(profilo_laterale_p2)
curva_2_1 = bezier(profilo_laterale_p2_1)
curva_3 = bezier(profilo_laterale_p3)
curva_4 = bezier(profilo_laterale_p4)
curva_5 = bezier(profilo_laterale_p5)
curva_6 = bezier(profilo_laterale_p6)
curva_7 = bezier(profilo_laterale_p7)
curva_8 = bezier(profilo_laterale_p8)
curva_9 = bezier(profilo_laterale_p9)
curva_10 = bezier(profilo_laterale_p10)
curva_11 = bezier(profilo_laterale_p11)
curva_12 = bezier(profilo_laterale_p12)
curva_13 = bezier(profilo_laterale_p13)

profilo_laterale = STRUCT([ bezMap(curva_1,dominio_linea),bezMap(curva_2,dominio_linea),bezMap(curva_2_1,dominio_linea),bezMap(curva_3,dominio_linea),bezMap(curva_4,dominio_linea), \
	 bezMap(curva_5,dominio_linea), bezMap(curva_6,dominio_linea),bezMap(curva_7,dominio_linea), bezMap(curva_8,dominio_linea), bezMap(curva_9,dominio_linea), \
	  bezMap(curva_10,dominio_linea), bezMap(curva_11,dominio_linea), bezMap(curva_12,dominio_linea), bezMap(curva_13,dominio_linea)  ])

#Profilo frontale
profilo_frontale_1 = traslaPointsZ(addXValue([[1.02, 1.38], [1.25, 1.36], [1.59, 1.37],[1.7, 1.35], [1.81, 1.51], [2.19, 1.37],[3.32, 1.45], [3.41, 1.37], [3.54, 1.37], [4.13, 1.38]],0),profilo_frontale_trasl_z)
pf_curva_1 = bezier(profilo_frontale_1)

profilo_frontale_2 = traslaPointsZ(addXValue([[1.02, 1.38], [0.93, 1.43], [0.86, 1.8], [0.84, 2.42], [0.94, 2.54], [1.06, 2.66], [1.21, 2.86]],0),profilo_frontale_trasl_z)
pf_curva_2 = bezier(profilo_frontale_2)

profilo_frontale_3 = traslaPointsZ(addXValue([[1.21, 2.86], [1.6, 3.54], [1.67, 3.36], [2.13, 3.43], [2.59, 3.45], [3.06, 3.46], [3.52, 3.39]],0),profilo_frontale_trasl_z)
pf_curva_3 = bezier(profilo_frontale_3)

profilo_frontale_4 = traslaPointsZ(addXValue([[3.52, 3.39], [3.95, 3.05], [4.01, 2.64], [4.18, 2.62], [4.45, 2.43], [4.26, 1.77], [4.13, 1.38]],0),profilo_frontale_trasl_z)
pf_curva_4 = bezier(profilo_frontale_4)

#Parabrezza
profilo_frontale_5 = traslaPointsZ(addXValue([[1.17, 2.67], [1.47, 2.71], [3.53, 2.71], [3.96, 2.69]],0),profilo_frontale_trasl_z)
pf_curva_5 = bezier(profilo_frontale_5)

profilo_frontale_6 = traslaPointsZ(addXValue([[1.17, 2.67], [1.24, 2.79], [1.3, 2.97], [1.58, 3.25]],0),profilo_frontale_trasl_z)
pf_curva_6 = bezier(profilo_frontale_6)

profilo_frontale_7 = traslaPointsZ(addXValue([[1.58, 3.25], [2.05, 3.4], [3.18, 3.36], [3.59, 3.27]],0),profilo_frontale_trasl_z)
pf_curva_7 = bezier(profilo_frontale_7)

profilo_frontale_8 = traslaPointsZ(addXValue([[3.59, 3.27], [3.8, 3.03], [3.93, 2.87], [3.97, 2.68]],0),profilo_frontale_trasl_z)
pf_curva_8 = bezier(profilo_frontale_8)


#Cofano
profilo_frontale_9 = traslaPointsZ(addXValue([[3.74, 2.66], [3.21, 2.1], [3.53, 2.18], [2.62, 2.19]],0),profilo_frontale_trasl_z)
pf_curva_9 = bezier(profilo_frontale_9)

profilo_frontale_10 = traslaPointsZ(addXValue([[1.4, 2.66], [1.89, 2.11], [1.59, 2.17], [2.62, 2.19]],0),profilo_frontale_trasl_z)
pf_curva_10 = bezier(profilo_frontale_10)

profilo_frontale_11 = traslaPointsZ(addXValue([[3.69, 2.13], [3.55, 2.26], [3.77, 2.4], [3.91, 2.49], [4.25, 2.3], [4.02, 2.07], [3.69, 2.13]],0),profilo_frontale_trasl_z)
pf_curva_11 = bezier(profilo_frontale_11)

profilo_frontale_12 = traslaPointsZ(addXValue([[1.4, 2.1], [1.58, 2.15], [1.52, 2.34], [1.22, 2.48], [0.97, 2.32], [1.07, 2.08], [1.4, 2.1]],0),profilo_frontale_trasl_z)
pf_curva_12 = bezier(profilo_frontale_12)

#Specchietto - sinistra
profilo_frontale_13 = traslaPointsZ(addXValue([[1.14, 2.78],[1.07, 2.68]],0),profilo_frontale_trasl_z)
pf_curva_13 = bezier(profilo_frontale_13)

profilo_frontale_14 = traslaPointsZ(addXValue([[1.07, 2.8],[1.04, 2.69]],0),profilo_frontale_trasl_z)
pf_curva_14 = bezier(profilo_frontale_14)

profilo_frontale_15 = traslaPointsZ(addXValue([[1.04, 2.69],[1.07, 2.68]],0),profilo_frontale_trasl_z)
pf_curva_15 = bezier(profilo_frontale_15)

profilo_frontale_16 = traslaPointsZ(addXValue([[1.14, 2.78],[1.07, 2.8]],0),profilo_frontale_trasl_z)
pf_curva_16 = bezier(profilo_frontale_16)

profilo_frontale_17 = traslaPointsY(traslaPointsZ(addXValue([[0.75, 2.86], [0.65, 2.78], [0.8, 2.66], [1.04, 2.69], [1.15, 2.96], [0.88, 2.94], [0.75, 2.86]],0),profilo_frontale_trasl_z-0.06),0.08)
pf_curva_17 = bezier(profilo_frontale_17)

profilo_frontale_18 = traslaPointsY(traslaPointsZ(addXValue([[0.75, 2.86], [0.65, 2.78], [0.8, 2.66], [1.04, 2.69], [1.15, 2.96], [0.88, 2.94], [0.75, 2.86]],0),profilo_frontale_trasl_z-0.06),0.08)
pf_curva_18 = bezier(profilo_frontale_18)

#Specchietto - destra
profilo_frontale_19 = traslaPointsZ(addXValue([[4.08, 2.82], [4.01, 2.8]],0),profilo_frontale_trasl_z)
pf_curva_19 = bezier(profilo_frontale_19)

profilo_frontale_20 = traslaPointsZ(addXValue([[4.09, 2.69], [4.1, 2.73]],0),profilo_frontale_trasl_z)
pf_curva_20 = bezier(profilo_frontale_20)

profilo_frontale_21 = traslaPointsZ(addXValue([[4.08, 2.82], [4.1, 2.73]],0),profilo_frontale_trasl_z)
pf_curva_21 = bezier(profilo_frontale_21)

profilo_frontale_22 = traslaPointsZ(addXValue([[4.01, 2.8], [4.09, 2.69]],0),profilo_frontale_trasl_z)
pf_curva_22 = bezier(profilo_frontale_22)

profilo_frontale_23 = traslaPointsZ(addXValue([[4.1, 2.84], [4.04, 2.63], [4.45, 2.67],[4.41, 2.85], [4.38, 2.94], [4.1, 2.95], [4.1, 2.84]],0),profilo_frontale_trasl_z-0.025)
pf_curva_23 = bezier(profilo_frontale_23)

#Griglia
profilo_frontale_24 = traslaPointsZ(addXValue([[1.63, 1.82], [2.08, 1.86], [3.26, 1.83], [3.5, 1.84]],0),profilo_frontale_trasl_z-0.025)
pf_curva_24 = bezier(profilo_frontale_24)

profilo_frontale_25 = traslaPointsZ(addXValue([[1.63, 1.82], [1.69, 1.38], [2.36, 1.53],[2.58, 1.51], [2.76, 1.51], [3.38, 1.41], [3.5, 1.84]],0),profilo_frontale_trasl_z-0.025)
pf_curva_25 = bezier(profilo_frontale_25)

profilo_frontale = STRUCT([ bezMap(pf_curva_1,dominio_linea), bezMap(pf_curva_2,dominio_linea), bezMap(pf_curva_3,dominio_linea),\
     bezMap(pf_curva_4,dominio_linea),bezMap(pf_curva_5,dominio_linea),bezMap(pf_curva_6,dominio_linea),bezMap(pf_curva_7,dominio_linea),\
     bezMap(pf_curva_8,dominio_linea),bezMap(pf_curva_9,dominio_linea),bezMap(pf_curva_10,dominio_linea),bezMap(pf_curva_11,dominio_linea),\
     bezMap(pf_curva_12,dominio_linea),bezMap(pf_curva_13,dominio_linea),bezMap(pf_curva_14,dominio_linea),bezMap(pf_curva_15,dominio_linea),\
     bezMap(pf_curva_16,dominio_linea),bezMap(pf_curva_17,dominio_linea),bezMap(pf_curva_18,dominio_linea),bezMap(pf_curva_19,dominio_linea),\
     bezMap(pf_curva_20,dominio_linea),bezMap(pf_curva_21,dominio_linea),bezMap(pf_curva_22,dominio_linea),bezMap(pf_curva_23,dominio_linea),\
     bezMap(pf_curva_24,dominio_linea),bezMap(pf_curva_25,dominio_linea) ])

#Profilo superiore

# profilo_superiore_1 = traslaPointsY(traslaPointsX(addZValue([[1.63, 1.82], [1.69, 1.38], [2.36, 1.53],[2.58, 1.51], [2.76, 1.51], [3.38, 1.41], [3.5, 1.84]],0),-1),-0.8)
profilo_superiore_1 = addZValue([[0.1, 4.29], [0.19, 4.49], [0.34, 4.62], [0.51, 4.68], [1.21, 4.74], [1.05, 4.63], [2.1, 4.66]],0)
ps_curva_1 = bezier(profilo_superiore_1)

profilo_superiore_2 = addZValue([[2.1, 4.66], [2.83, 4.67], [4.12, 4.74], [4.27, 4.68]],0)
ps_curva_2 = bezier(profilo_superiore_2)

profilo_superiore_3 = addZValue([[4.27, 4.68], [4.92, 4.51], [5.01, 4.64], [5.07, 4.09]],0)
ps_curva_3 = bezier(profilo_superiore_3)

profilo_superiore_4 = addZValue([[5.11, 4.09], [5.11, 2.89], [5.16, 2.68], [4.34, 2.62]],0)
ps_curva_4 = bezier(profilo_superiore_4)

profilo_superiore_5 = addZValue([[4.34, 2.62], [3.58, 2.51], [3.62, 2.67], [2.3, 2.63], [1.3, 2.62], [1.25, 2.58], [0.5, 2.58]],0)
ps_curva_5 = bezier(profilo_superiore_5)

profilo_superiore_6 = addZValue([[0.09, 3.09], [0.08, 2.91], [0.19, 2.73], [0.5, 2.58]],0)
ps_curva_6 = bezier(profilo_superiore_6)

profilo_superiore_7 = addZValue([[0.09, 3.09], [-0.04, 3.54], [0, 3.99], [0.12, 4.2]],0)
ps_curva_7 = bezier(profilo_superiore_7)

profilo_superiore_8 = addZValue([[0.55, 4.69], [0.36, 4.65], [0.05, 4.34], [0.12, 4.2]],0)
ps_curva_8 = bezier(profilo_superiore_8)


profilo_superiore = STRUCT([bezMap(ps_curva_1, dominio_linea),bezMap(ps_curva_2, dominio_linea),bezMap(ps_curva_3, dominio_linea),\
	bezMap(ps_curva_4, dominio_linea),bezMap(ps_curva_5, dominio_linea),bezMap(ps_curva_6, dominio_linea),bezMap(ps_curva_7, dominio_linea),\
	bezMap(ps_curva_8, dominio_linea)  ])

profilo_superiore = T([1,2])([0.2,-3])(S([1,2,3])([1.7,1.5,1.5])(profilo_superiore))



print flipAux([[2.3, 2.63], [3.62, 2.67], [3.58, 2.51], [4.34, 2.62]])

profili = STRUCT([profilo_laterale,profilo_frontale,profilo_superiore])

VIEW(grill3DLight(profili,10))